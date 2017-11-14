const singleChatJoiner='SINGLECHAT';

const singleChat=function(user1,user2){
	return user1+singleChatJoiner+user2;
}
module.exports.singleChat=singleChat;