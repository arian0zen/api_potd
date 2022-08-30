const fetch = require('node-fetch');
const express = require("express");
const { response } = require('express');
const app = express();

app.use(express.static("public"));

let today = new Date();
let date = today.getDate()+'-'+ (today.getMonth()+1)+'-'+today.getFullYear();



const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`;


/*Sync LeetCode daily coding challenge to Todoist*/


const syncLeetCodeCodingChallenge = async () => {
  const question = await fetchDailyCodingChallenge();
  const questionInfo = question.data.activeDailyCodingChallengeQuestion;

  return questionInfo;

};

const fetchDailyCodingChallenge = async () => {
  console.log(`Fetching daily coding challenge from LeetCode API.`);

  const init = {
    method: "POST",
	headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY })
  };

  const response = await fetch(LEETCODE_API_ENDPOINT, init);
  
  return response.json();
};

const CodingNinjas_API_ENDPOINT = `https://api.codingninjas.com/api/v3/public_section/potd/problem_list?date=${date}`;
const GFG_API_ENDPOINT =
  "https://practiceapi.geeksforgeeks.org/api/v1/problems-of-day/problem/today/";




/*Sync GFG daily coding challenge to Todoist*/

const fetchDailyCodingGFG = async () => {
	console.log(`Fetching daily coding challenge from GFG api.`);
  
	const init = {
	  method: "GET",
	  headers: { "Content-Type": "application/json" }
	};
  
	const response = await fetch(GFG_API_ENDPOINT, init);
  
	return response.json();
  };
  


  /*Sync Coding Ninjas daily coding challenge to Todoist*/

  const fetchDailyCodingCodingNinjas = async () => {
	console.log(`Fetching daily coding challenge from CN api.`);
  
	const init = {
	  method: "GET",
	  headers: { "Content-Type": "application/json" }
	};
  
	const response = await fetch(CodingNinjas_API_ENDPOINT, init);
  
	return response.json();
  };



app.get("/", async (req, res) => {
    const lc = await syncLeetCodeCodingChallenge();
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested, Content-Type, Accept Authorization"
	)
	const gfg = await fetchDailyCodingGFG();
	const cn = await fetchDailyCodingCodingNinjas();

	res.json({"leetcode": lc, "gfg": gfg, "codingNinjas": cn});
  });


  app.get("/potds", async (req, res) => {
    const lc = await syncLeetCodeCodingChallenge();
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested, Content-Type, Accept Authorization"
	)
	const lc_name = lc.question.title;
	const gfg = await fetchDailyCodingGFG();
	const gfg_name = gfg.problem_name;
	const cn = await fetchDailyCodingCodingNinjas();
	const cn_name_moderate = cn.data.details.MODERATE.problem.name;
	const cn_name_hard = cn.data.details.HARD.problem.name;

	res.json({"leetcode_potd": lc_name, "gfg_potd": gfg_name, "codingNinjas_potd": {
		"moderate": cn_name_moderate, "hard": cn_name_hard
	}});
  });

  app.get("/leetcode", async (req, res) => {
    const lc = await syncLeetCodeCodingChallenge();
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested, Content-Type, Accept Authorization"
	)
	res.json({"leetcode_potd_details": lc
	});
  });

  app.get("/gfg", async (req, res) => {
	const gfg = await fetchDailyCodingGFG();
	res.json({"gfg_potd_details": gfg
	});
  });

  app.get("/codingninjas", async (req, res) => {
	const cn = await fetchDailyCodingCodingNinjas();
	res.json({"codingNinjas_potd_details": {
		"moderate": cn.data.details.MODERATE,
		"hard": cn.data.details.HARD
	}
	});
  });
  





  let port = process.env.PORT;
  if (port == null || port == ""){
	port = 3000;
  }
  
  app.listen(port, () => {
	console.log("listening on port " + port);
  });
  


