const db=require('../config/db');
const github=require('../services/githubService');

exports.analyze=async(req,res)=>{
try{
const {username}=req.params;
const {user,totalStars}=await github(username);
const age=Math.floor((Date.now()-new Date(user.created_at))/86400000);
const score=user.public_repos*2+user.followers*3+totalStars*5;

await db.query(`INSERT INTO github_profiles
(username,name,bio,followers,following,public_repos,public_gists,account_age_days,total_stars,profile_score,profile_url,avatar_url)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
ON DUPLICATE KEY UPDATE followers=VALUES(followers),profile_score=VALUES(profile_score)`,
[user.login,user.name,user.bio,user.followers,user.following,user.public_repos,user.public_gists,age,totalStars,score,user.html_url,user.avatar_url]);

res.json({username:user.login,followers:user.followers,publicRepos:user.public_repos,totalStars,profileScore:score});
}catch(e){res.status(500).json({error:e.message});}
};

exports.getAll=async(req,res)=>{
const [rows]=await db.query('SELECT * FROM github_profiles ORDER BY analyzed_at DESC');
res.json(rows);
};

exports.getOne=async(req,res)=>{
const [rows]=await db.query('SELECT * FROM github_profiles WHERE username=?',[req.params.username]);
res.json(rows[0]||{});
};