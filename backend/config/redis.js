const Redis=require('ioredis')
require('dotenv').config()

let configuration={
    host:"redis-14223.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    port:14223,
    username:"default",
    password:process.env.redispassword
}
const client=new Redis(configuration)

module.exports={client}