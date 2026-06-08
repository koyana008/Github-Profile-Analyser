const axios=require('axios');
module.exports=async(username)=>{
const headers=process.env.GITHUB_TOKEN?{Authorization:`Bearer ${process.env.GITHUB_TOKEN}`}:{}
const user=(await axios.get(`https://api.github.com/users/${username}`,{headers})).data;
const repos=(await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`,{headers})).data;
const totalStars=repos.reduce((a,r)=>a+r.stargazers_count,0);
return {user,totalStars};
};