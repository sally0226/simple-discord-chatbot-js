import { MessageEmbed } from "discord.js";
import axois from "axios";

//js는 기본적으로 비동기 .. async 넣어서 동기로 바꿔주기 
async function onMessage(message) { 
  //console.log(message); // message안에 엄청나게 많은 정보가 들어있음. json 객체이다. 
  const prefix = "!"; // 원하는 기호 아무거나.. 

  if (message.author.bot === true || !message.content.startsWith(prefix)){  
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/); // 메세지 내용에서 prefix 자르고, string를 스페이스 기준으로 분할. 정규식(/ +/ = 스페이스)
  //trim : 앞뒤 스페이스 없애줌 
  const command = args.shift().toLowerCase(); // shift() : 배열 맨 앞에거를 자른 뒤 반환 

  if (command === "안녕") {
    message.reply("하이루");
  }
  
  if (command === "투표") {
    const voteEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣" ];
    const question = args.shift()+"💭";

    if (args.length < 1 || args.length > 5) {
      message.reply("보기 수는 1-5개 사이로 입력해주세요.");
      return;
    }

    const vote_embed = new MessageEmbed(); 
    let desc = "";
    args.forEach((arg, i) => {
      desc += `${voteEmojis[i]}: ${args[i]}\n`;
    });

    vote_embed.setTitle(question);
    vote_embed.setDescription(desc);

    const vote = await message.reply("투표하세요", {embed: vote_embed}); // 대답이 서버에 전송될 때 까지 기다린다 -> 동기적으로 동작하는 것처럼 보임
    args.forEach(async (arg, i)=> {
      await vote.react(voteEmojis[i]);
    });
  }
  
  if (command === "강아지") {
    // 응답을 기다리는 방법 : await or then (둘의 차이는? )
    const response = await axois.get("https://dog.ceo/api/breeds/image/random");
    //console.log(response.data);
    message.reply(response.data.message);
  }
}


export default onMessage;
