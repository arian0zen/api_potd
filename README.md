# Documentation
# Introduction

the api-potd is built with node.js. This API is simple yet useful and a very much easy to use. With different route end points this API can return 'problem of the day' from various problem solving sites including `leetcode` `Geeks for Geeks` `Coding Ninjas`. 
This can be very much useful for developers and mostly students who are wanting to create any personal project related to this problem solving sites, mainly this one is helpful cause there are currently no exclusive official API that provides the 'potd' data.
This API returns a JSON object with all the details of the problem including 'problem difficulty' and 'problem link' as well.

## Use Cases

There are many use cases are possible, such as
- You can get the data of potd each day and add the data to you personal todo list
- Create an webpage where users can get 'potd s' all at a same place, so that they don't have to visit each sites individually
- I made an chrome extension using this concept, check this repository: https://github.com/arian0zen/Chrome-Extension---Code-Reminder


## Requests and Response

The API is not an RESTful API, there are no CURD operation available, it just takes an simple and cute `get` requests and returns you your wanted data.
Though with differenct route points requests you can specify what data you want the API to fetch.


This is the main API endpoints, obviously with the http: `https://fetchpotdshere.herokuapp.com/`
```http
GET //fetchpotdshere.herokuapp.com/
```
Then you can go on and add your specific routes.
Here are all the endpoints you can fetch the API from:
```http
GET //fetchpotdshere.herokuapp.com/potds
```
- fetches only the `problem of the day` name for each of the sites and returs you a JSON
```http
GET //fetchpotdshere.herokuapp.com/leetcode
```
- fetches only the `leetcode` daily challeng prooblem along with all the details you will need to know.
```http
GET //fetchpotdshere.herokuapp.com/gfg
```
- fetches only the `Geeks for Geeks` daily challeng prooblem along with all the details you will need to know.
```http
GET //fetchpotdshere.herokuapp.com/codingninjas
```
- fetches only the `Coding Ninjas` daily challeng prooblem along with all the details you will need to know. As coding ninjas gives two [moderate and hard] coding challenges everyday it returns both of them as an JSON object

## Responses

Here is `JavaSript` request format

```javascript
fetch("https://fetchpotdshere.herokuapp.com/")
  .then(response => data.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
the `response` json will return so many things:


https://user-images.githubusercontent.com/68517592/187504508-4824c3d9-f4f7-4685-a45f-62565f6ffc61.mp4

if you have done `console.log(result)` it will be in console though.
```javascript
fetch("https://fetchpotdshere.herokuapp.com/potds")
  .then(response => data.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
![image](https://user-images.githubusercontent.com/68517592/187505042-c63e37f9-f9be-4be6-9c65-e3395a281511.png)
`potd` names only for that day `30th august`
```javascript
fetch("https://fetchpotdshere.herokuapp.com/leetcode")
  .then(response => data.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
![image](https://user-images.githubusercontent.com/68517592/187505196-89fffd29-fdc6-41f6-b0c8-a9c90b5a1960.png)

```javascript
fetch("https://fetchpotdshere.herokuapp.com/gfg")
  .then(response => data.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
![image](https://user-images.githubusercontent.com/68517592/187505414-f9390491-5a74-47bc-a2b0-e1079a9e2883.png)




## Status Codes

API-POTD returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |

## Here is one project made with the same concept and API
https://user-images.githubusercontent.com/68517592/187304807-e063917b-4aeb-49ae-a488-82ada7cdcfea.mp4
