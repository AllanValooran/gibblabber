const singleChatJoiner='SINGLECHAT';

const singleChat=function(user1,user2){
	let first='';
	let second='';
	if(user1>user2){
		first=user2;
		second=user1;
	}
	else if(user1<user2){
		first=user1;
		second=user2;
	}
	return first+singleChatJoiner+second;
}
module.exports.singleChat=singleChat;