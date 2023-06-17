const express = require('express');
const { Database } = require('st.db');
const db = new Database(`database.json`)
const dd = new Database(`bank.json`)
const ddb = require("pro.db")
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
const ms = require('ms')
app.listen(3000, () => {
  console.log('server started');
});
const { QuickDB } = require('quick.db')
const db1 = new QuickDB()
require(`better-sqlite3`)
//البريفيكس واي دي الاونرات
const prefix = ""
const owner = ["1050627404839792640", "572902535342325762"];
const {Discord , Client,Intents,MessageEmbed,Collection,MessageSelectMenu,MessageButton, MessageActionRow} = require('discord.js')
const client = new Client({intents: 3243773})
client.setMaxListeners(0)

//------------------------------------------------------------------------------------

//راتب البنك
client.on('messageCreate', async msg => {
  if(msg.content === prefix + "راتب"){
     let time = "300000"
    let daily =  await db1.get(`daily_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
       let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكن استخدام الامر بعد **${duration}**`})
    }else {
    let amount = Math.floor(Math.random() * 100) + 100;
    let work = [ "دكتور نفسي", "هاكر", "مغني", "نادل", "راقص", ]
    dd.add(`money_${msg.author.id}`, amount)
    db1.set(`daily_${msg.author.id}`, Date.now())
        
    let v = work[Math.floor(Math.random() * work.length)];
    let money = db.fetch(`money_${msg.author.id}`)
    if(money == null)money=0;
     msg.reply({embeds: [
       new MessageEmbed()
       .setAuthor(msg.author.username)
       .setFooter(msg.guild.name)
       .setTimestamp()
       .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110290466567622708/1630669.png')
       .setColor(`#acabcd`)
       .setDescription(`
اشعار ايداع
المبلغ: **$${amount}**
العمل: **${v}**  
`)
     ]})
    }
  }
})
//------------------------------------------------------------------------------------

//ايداع
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "ايداع")){
  
  let member = msg.mentions.members.first()
 
      if(member == client.user)return msg.reply({content: `**لا يمكنك الايداع للبوت**`})
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
  if(!args[1])return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
  if(isNaN(args[1]))return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
      
    
    const mymoney = db.get(`money_${msg.author.id}`)
    if(mymoney < args[1])return msg.reply({content: `**ليس لديك مبلغ كافي**`})
    db.subtract(`money_${msg.author.id}`, Number(args[1]) )
    dd.add(`money_${msg.author.id}`, Number(args[1]))
    
    msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
         .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110290586092720158/1331227.png')
        .setColor(`#acabcd`)
        .setDescription(`
عمليه ايداع ناجحه
الشخص: ${msg.author}
المبلغ: **$${args[1]}** `)
]})
  }
})
//------------------------------------------------------------------------------------

//سحب
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "سحب")){
  
  let member = msg.mentions.members.first()
 
      if(member == client.user)return msg.reply({content: `**لا يمكن سحب فلوس البوت**`})
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
  if(!args[1])return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
  if(isNaN(args[1]))return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
      
    
    const mymoney = dd.get(`money_${msg.author.id}`)
    if(mymoney < args[1])return msg.reply({content: `**ليس لديك مبلغ كافي**`})
    dd.subtract(`money_${msg.author.id}`, Number(args[1]) )
    db.add(`money_${msg.author.id}`, Number(args[1]))
    
    msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110290679634067557/1331199.png')
        .setColor(`#acabcd`)
        .setDescription(`
عمليه سحب ناجحه
الشخص: ${msg.author}
المبلغ: **$${args[1]}** `)
]})
  }
})
//------------------------------------------------------------------------------------
//تحويل بنكي
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "تحويل-بنكي")){
  
  let member = msg.mentions.members.first()
  if(!member)return msg.reply({content: `**الرجاء منشن الشخص**`})
  if(member.id == msg.author.id)return msg.reply({content: `**لا يمكنك التحويل لنفسك**`})
  if(member.id == client.user.id)return msg.reply({content: `**لا يمكنك التحويل للبوت**`})
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
  if(!args[2])return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
  if(isNaN(args[2]))return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
      
    const membermoney = db.get(`money_${member.id}`)
    const mymoney = dd.get(`money_${msg.author.id}`)
    if(mymoney < args[2])return msg.reply({content: `**ليس لديك مبلغ كافي**`})
    dd.subtract(`money_${msg.author.id}`, args[2])
    dd.add(`money_${member.id}`, args[2])
      let newcash = dd.fetch(`money_${msg.author.id}`)
    msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110291328513876141/1331232.png')
        .setColor(`#acabcd`)
        .setDescription(`
عمليه تحويل ناجحه
الشخص: ${member}
المبلغ: **$${args[2]}**
رصيدك في البنك: **$${newcash}**`)
]})
  }
})
//------------------------------------------------------------------------------------
//ضمان

client.on('messageCreate', async msg => {
  if(msg.content === prefix + "ضمان"){
     let time = "420000"
    let daily =  await db1.get(`ضمان_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
       let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكن استخدام الامر بعد **${duration}**`})
    }else {
    let amount = Math.floor(Math.random() * 100) + 100;
    let work = [ "الدين", "العقاري", "كفالة", "اجتماعي", ]
    dd.add(`money_${msg.author.id}`, amount)
    db1.set(`ضمان_${msg.author.id}`, Date.now())
        
    let v = work[Math.floor(Math.random() * work.length)];
    let money = dd.fetch(`money_${msg.author.id}`)
    if(money == null)money=0;
     msg.reply({embeds: [
       new MessageEmbed()
       .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
       .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110291912214204477/1630682.png')
       .setColor(`#acabcd`)
       .setDescription(`
ضمان
المبلغ: **$${amount}**
الضمان: **${v}**
رصيدك الحالي: **$${money}** `)
     ]})
    }
  }
})
//------------------------------------------------------------------------------------

//الفلوس
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "حساب") || msg.content.startsWith(prefix + "حسابي")){
    let member = msg.mentions.members.first()
      
  if(!member){
     let newcash = db.fetch(`money_${msg.author.id}`)
     let bank1 = dd.fetch(`money_${msg.author.id}`)
    msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110293091669246083/1331157.png')
        .setColor(`#acabcd`)
        .setDescription(`
     فلوسك
رصيدك في المحفظة: **$${newcash}**
رصيدك في البنك: **$${bank1}**
`)   
    ]})
  }else if(member){
     let newcash = db.fetch(`money_${member.id}`)
    msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(member.user.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setColor(`#acabcd`)
        .setDescription(`
   فلوس ${member}  
رصيده في المحفظة: **$${newcash}**
`)    
    ]})
  }
   
  }
})
//------------------------------------------------------------------------------------

//توب
client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'top') || message.content.startsWith(prefix + "توب"))
{
  let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data) 
            money.length = 10 
            var finalLb = ""
            for(var i in money) {
         finalLb += `**${money.indexOf(money[i])+1}st |** <@${money[i].ID.slice(6)}>  \`${money[i].data.toLocaleString()}\`\n`  
            }
            const embed = new MessageEmbed()
            .setAuthor(`اغنى الاشخاص في بنك الرياض`, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110293224460923000/762467.png')
            .setColor(`#acabcd`)
            .setColor('#000000')
            .setDescription(`
${finalLb}
            `)
            message.channel.send({embeds:[embed]})
}
})
//------------------------------------------------------------------------------------

//بخشيش
client.on('messageCreate', async msg => {
   if(msg.content.startsWith(prefix + "بخشيش")){
        let time = "300000"
        let daily = await db1.get(`بخشيش_${msg.author.id}`)
        
        if(daily !== null  && time - (Date.now() - daily) > 0){
       let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكن استخدام الامر بعد **${duration}**`})
            
    }else {
        
        const moneyspi = Math.floor(Math.random() * 300); + 50
        db.add(`money_${msg.author.id}`, moneyspi)
           
        const smallcash = db.fetch(`money_${msg.author.id}`)
        msg.reply({embeds: [
            new MessageEmbed()
            .setAuthor(msg.author.username)
            .setFooter(msg.guild.name)
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110293614988369920/1331174.png')
            .setColor(`#acabcd`)
            .setDescription(`
  **ما نقص مال من صدقه**
امسك يا فقير **$${moneyspi}**
رصيدك الحالي: **$${smallcash}**
`)
        ]})
        db1.set(`بخشيش_${msg.author.id}`, Date.now())
    }
   }
})
//------------------------------------------------------------------------------------

//قمار
client.on('messageCreate', async msg => {
    if(msg.content.startsWith(prefix + "قمار")){
        let time = "300000"
        let daily = await db1.get(`قمار_${msg.author.id}`)
        
        if(daily !== null  && time - (Date.now() - daily) > 0){
 let duration = ms(time - (Date.now() - daily), {long: true});
     msg.reply({content: ` يمكنك استخدام الامر مجددا بعد **${duration}**`})
            
    }else {
         const botChoice = Math.floor(Math.random() * 100); + 100
        const userChoice = Math.floor(Math.random() * 10); + 100
       let numbertoclaim = Math.floor(Math.random() * 1); + 10
      if(numbertoclaim < 1)numbertoclaim=1;
        
        let args = msg.content.slice(prefix.length).trim().split(/ +/g);
        if(!args[1])return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
        if(isNaN(args[1]))return  msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
        if(args[1] < 1000)return msg.reply({content: `**اقل مبلغ قمار 1000**`})
        
        let amount = Math.floor(Math.random() * args[1]) + 200;
    let userMoney = db.fetch(`money_${msg.author.id}`)
    if(userMoney < args[1])return msg.reply({content: `**مبلغ القمار فوق ميزانيتك اسحب من البنك والعب**`})
        
         if(botChoice > userChoice){
      db.subtract(`money_${msg.author.id}`, amount)
      const smallcash = db.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
        new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110293775114305657/1630650.png')
        .setColor(`#acabcd`)
        .setDescription(`
للاسف قمار فاشل
مبلغ الخسارة: **$${amount}**
رصيدك الحالى: **$${smallcash}**`)

]})
      db1.set(`قمار_${msg.author.id}`, Date.now())
             
    }else if(botChoice < userChoice){
       db.add(`money_${msg.author.id}`, amount)
       const newcash = db.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setColor(`#acabcd`)
        .setDescription(`
كفو قمار ناجح
مبلغ الفوز: **$${amount}**
رصيدك الحالي: **$${newcash}**`)
          
      ]})
      db1.set(`قمار_${msg.author.id}`, Date.now())
    }
    }
  }
})
//------------------------------------------------------------------------------------

//مخاطره كل الفلوس
client.on('messageCreate', async msg => {
    if(msg.content.startsWith(prefix + "مخاطره")){
        let time = "0"
        let daily = await db1.get(`مخاطره_${msg.author.id}`)
        
        if(daily !== null  && time - (Date.now() - daily) > 0){
            let duration = ms(time - (Date.now() - daily), {long: true});
            msg.reply({content: ` يمكنك استخدام الامر مجددا بعد **${duration}**`})
        } else {
            const botChoice = Math.floor(Math.random() * 100) + 100;
            const userChoice = Math.floor(Math.random() * 10) + 100;
            let numbertoclaim = Math.floor(Math.random() * 1) + 10;
            if(numbertoclaim < 1) numbertoclaim = 1;
            
            let userMoney = db.fetch(`money_${msg.author.id}`);
            if(userMoney < 1000) return msg.reply({content: `**المبلغ فوق ميزانيتك اسحب من البنك والعب**`});

            let amount = userMoney;

            if(botChoice > userChoice){
                db.subtract(`money_${msg.author.id}`, amount);

                const smallcash = db.fetch(`money_${msg.author.id}`);
                msg.reply({embeds: [
                    new MessageEmbed()
                    .setAuthor(msg.author.username)
                    .setFooter(msg.guild.name)
                    .setTimestamp()
                    .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110968893180223558/1331173.png')
                    .setColor(`#acabcd`)
                    .setDescription(`
                        للاسف خسرت
                        مبلغ الخسارة: **$${amount}**
                        رصيدك الحالى: **$${smallcash}**
                    `)
                ]});
                db1.set(`قمار_${msg.author.id}`, Date.now());
            } else if(botChoice < userChoice){
                db.add(`money_${msg.author.id}`, amount);

                const newcash = db.fetch(`money_${msg.author.id}`);
                msg.reply({embeds: [
                    new MessageEmbed()
                    .setAuthor(msg.author.username)
                    .setFooter(msg.guild.name)
                    .setTimestamp()
                    .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110968876486897774/1331166.png')
                    .setColor(`#acabcd`)
                    .setDescription(`
                        كفو فزت 
                        مبلغ الفوز: **$${amount}**
                        رصيدك الحالي: **$${newcash}**
                    `)
                ]});
                db1.set(`مخاطره_${msg.author.id}`, Date.now());
            }
        }
    }
});
//------------------------------------------------------------------------------------
//نرد
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "نرد")){
     let time = "300000"
    let daily =  await db1.get(`nerd_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
       let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكنك استخدام الامر مجددا بعد **${duration}**`})
    }else {
            const botChoice = Math.floor(Math.random() * 100);
        const userChoice = Math.floor(Math.random() * 100);
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if(!args[1])return msg.reply({content: `**اكتب الامر صح**`})
    if(isNaN(args[1]))return  msg.reply({content: `**اكتب الامر صح**`})
      
      if(args[1] < 800)return msg.reply({content: `**اقل مبلغ للعب 800**`})
      
    let userMoney = db.fetch(`money_${msg.author.id}`)
    if(userMoney < args[1])return msg.reply({content: `**فلوسك ما تكفي اسحب من البنك والعب**`})
    if(botChoice > userChoice){
      db.subtract(`money_${msg.author.id}`, args[1])

      
      const smallcash = db.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
        new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110296435745902652/2033596.png')
        .setDescription(`
        القم فزت عليك
انا اخترت: ${botChoice}
وانت اخترت: ${userChoice}
مبلغ الخسارة: **$${args[1]}**
رصيدك الحالي: **$${smallcash}**
        
        
        `)
      ]})
      db1.set(`nerd_${msg.author.id}`, Date.now())
    }else if(botChoice < userChoice){
       db.add(`money_${msg.author.id}`, args[1])
       const newcash = db.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
        new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setColor(`#acabcd`)
        .setDescription(`
         لقد فزت علي مبروك
انا اخترت: ${botChoice}
وانت اخترت: ${userChoice}
مبلغ الفوز: **$${args[1]}**
رصيدك الحالي: **$${newcash}**
        
        
        `)
      ]})
      db1.set(`nerd_${msg.author.id}`, Date.now())
    }
    }
  }
})
//------------------------------------------------------------------------------------

//حافز
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "حافز")){
     let time = "480000"
    let daily =  await db1.get(`حافز_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
  let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكنك استخدام الامر مجددا بعد **${duration}**`})
    }else {
            
  
   
            const moneyspi = Math.floor(Math.random() * 1000); + 100
dd.add(`money_${msg.author.id}`, moneyspi)
      const smallcash = dd.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
        new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110297289953656863/1331161.png')
        .setColor(`#acabcd`)
        .setDescription(`
حافز من منظمة Riyadh عشان تستمر
المبلغ: **$${moneyspi}**
رصيدك الحالي: **$${smallcash}**`)
      ]})
      db1.set(`حافز_${msg.author.id}`, Date.now())
  
    }
  }
})
//------------------------------------------------------------------------------------

//تداول
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "تداول")){
     let time = "300000"
    let daily =  await db1.get(`love_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
 let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكنك استخدام الامر مجددا بعد **${duration}**`})
    }else {
            const botChoice = Math.floor(Math.random() * 100);
        const userChoice = Math.floor(Math.random() * 100);
       let numbertoclaim = Math.floor(Math.random() * 10);
      if(numbertoclaim < 1)numbertoclaim=1;
      
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if(!args[1])return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
    if(isNaN(args[1]))return  msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
        
      if(args[1] < 1200)return msg.reply({content: `**اقل مبلغ للتداول 1200**`})
      let amount = Math.floor(Math.random() * args[1]) + 200;
    let userMoney = dd.fetch(`money_${msg.author.id}`)
    if(userMoney < args[1])return msg.reply({content: `**مبلغ التداول فوق ميزانيتك اودع بالبنك وتداول معنا**`})
        
    if(botChoice > userChoice){
      dd.subtract(`money_${msg.author.id}`, amount)
      const smallcash = dd.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
        new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110298006575665193/763207.png')
        .setDescription(`
للاسف تداول فاشل
مبلغ الخسارة: **$${amount}**
رصيدك الحالي: **$${smallcash}**`)
      ]})
      db1.set(`love_${msg.author.id}`, Date.now())
    }else if(botChoice < userChoice){
       dd.add(`money_${msg.author.id}`, amount)
       const newcash = dd.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110298022392381531/763209.png')
        .setColor(`#acabcd`)
        .setDescription(`
كفو تداول ناجح
مبلغ الفوز: **$${amount}**
رصيدك الحالي: **$${newcash}**`)
      ]})
      db1.set(`love_${msg.author.id}`, Date.now())
    }
    }
  }
})
//------------------------------------------------------------------------------------

//استثمار
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "استثمار")){
     let time = "300000"
    let daily =  await db1.get(`ytv_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
  let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكنك استخدام الامر مجددا بعد **${duration}**`})
    }else {
            const botChoice = Math.floor(Math.random() * 100);
        const userChoice = Math.floor(Math.random() * 100);
      let numbertoclaim = Math.floor(Math.random() * 7);
      if(numbertoclaim < 1)numbertoclaim=1;
      
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if(!args[1])return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
    if(isNaN(args[1]))return  msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
      if(args[1] < 700)return msg.reply({content: `**اقل مبلغ للاستثمار 700**`})
      let amount = Math.floor(Math.random() * args[1]) + 200;
    let userMoney = dd.fetch(`money_${msg.author.id}`)
    if(userMoney < args[1])return msg.reply({content: `**فلوسك ما تكفي للاستثمار اودع في البنك واستثمر**`})
    if(botChoice > userChoice){
      dd.subtract(`money_${msg.author.id}`, amount)
      const smallcash = db.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
        new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110299174047600802/1328313.png')
        .setDescription(`
استثمار فاشل
مبلغ الخسارة: **${amount}** 
رصيدك الحالي: **$${smallcash}**`)
      ]})
      db1.set(`ytv_${msg.author.id}`, Date.now())
    }else if(botChoice < userChoice){
       dd.add(`money_${msg.author.id}`, amount)
        
       const newcash = dd.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110299161275940885/1328311.png')
        .setColor(`#acabcd`)
        .setDescription(`
استثمار ناجح
مبلغ الفوز: **$${amount}** 
رصيدك الحالي: **$${newcash}**`)
      ]})
      db1.set(`ytv_${msg.author.id}`, Date.now())
    }
    }
  }
})
//------------------------------------------------------------------------------------

//طاولة
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "طاولة")){
     let time = "300000"
    let daily =  await db1.get(`table_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكنك استخدام الامر مجددا بعد **${duration}**`})
    }else {
            const botChoice = Math.floor(Math.random() * 100);
        const userChoice = Math.floor(Math.random() * 100);
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if(!args[1])return msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
    if(isNaN(args[1]))return  msg.reply({content: `**الرجاء كتابة الامر بشكل صحيح**`})
      
      if(args[1] < 500)return msg.reply({content: `**اقل مبلغ للعب 500**`})
      
    let userMoney = db.fetch(`money_${msg.author.id}`)
    if(userMoney < args[1])return msg.reply({content: `**فلوسك ما تكفي بيبي جمع والعب**`})
    if(botChoice > userChoice){
      db.subtract(`money_${msg.author.id}`, args[1])
      const smallcash = db.fetch(`money_${msg.author.id}`)
      
      msg.reply({embeds: [
        new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110299752656015370/762953.png')
        .setDescription(`
طاولة خاسرة للاسف
مبلغ الخسارة: **$${args[1]}**
رصيدك السابق:**$${userMoney}**
رصيدك الحالي: **$${smallcash}**`)
      ]})
      db1.set(`table_${msg.author.id}`, Date.now())
    }else if(botChoice < userChoice){
       db.add(`money_${msg.author.id}`, args[1])
       const newcash = db.fetch(`money_${msg.author.id}`)
      msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110299752656015370/762953.png')
        .setColor(`#acabcd`)
        .setDescription(`
مبروك فزت
مبلغ الفوز: **$${args[1]}**
رصيدك السابق: **$${userMoney}**
رصيدك الحالي: **$${newcash}**`)
      ]})
      db1.set(`table_${msg.author.id}`, Date.now())
    }
    }
  }
})
//------------------------------------------------------------------------------------

//نهب
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "نهب")){
     let time = "720000"
    let daily =  await db1.get(`scam_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
  let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكنك استخدام الامر مجددا بعد **${duration}**`})
        
    }else {
    let member = msg.mentions.members.first()
    if(!member)return msg.reply({content: `**الرجاء منشن شخص**`})
      if(member.id == msg.author.id)return msg.reply({content: `**لا يمكنك نهب نفسك**`})
      if(member.id == client.id)return msg.reply({content: `**لا يمكنك نهب البوت**`})
    let amount = Math.floor(Math.random() * 100) + 1;
    let membermoney = db.fetch(`money_${member.id}`)
    if(membermoney < 3000)return msg.reply({content: `**لا يمكنك نهب شخص معاه اقل من 3000**`})
    if(membermoney < 0)return msg.reply({content: `**لا يمكنك نهب شخص معاه اقل من 0**`})
    db.subtract(`money_${member.id}`, amount)
    db.add(`money_${msg.author.id}`, amount)
    db.add(`badmoney_${msg.author.id}`, amount)
       db1.set(`scam_${msg.author.id}`, Date.now())
    let newcash = db.fetch(`money_${msg.author.id}`)
      member.send({embeds: [
        new MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110301049039880364/763039.png')
        .setDescription(`
        الحق الحق حلالك!!
        ذا ${msg.author} سرق منك $**${amount}**
        لا تقول اني علمتك 
        
`)
      ]})
      msg.author.send({embeds: [
        new MessageEmbed()
        .setThumbnail('https://cdn.discordapp.com/attachments/1085491202922651738/1110300340953288714/762454.png')
        .setDescription(`
        كفو عليك يل حرامي   
       عمليه نهب ${member} تمت بنجاح
       المبلغ: **$${amount}**
       بس هااه انتبه احد يدري او تعلم احد!
انا عن نفسي ما بعلم 🤔
`)
      ]})
    msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setColor(`#acabcd`)
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110300865585221722/1331154.png')
        .setDescription(`
 عمليه نهب ناجحه
الشخص : ${member}
المبلغ : **$${amount}**
رصيدك الحالي: **$${newcash}**
 
 `)
    ]})
    }
  }
})
//------------------------------------------------------------------------------------

//حراميه
client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'scammers') || message.content.startsWith(prefix + "حراميه"))
{
  let money = db.all().filter(data => data.ID.startsWith(`badmoney`)).sort((a, b) => b.data - a.data) 
            money.length = 10 
            var finalLb = ""
            for(var i in money) {
                finalLb += `**#${money.indexOf(money[i])+1} |** <@${money[i].ID.slice(9)}>   \`${money[i].data.toLocaleString()}\`\n` 
            }
            const embed = new MessageEmbed()
            .setAuthor(`الحراميه`, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110304022214213692/1331165.png')
            .setColor(`#acabcd`)
            .setDescription(`
${finalLb}
 `)
            message.channel.send({embeds:[embed]})
}
})
//------------------------------------------------------------------------------------

//اغتيال
client.on('messageCreate', async msg => {
  if(msg.content.startsWith(prefix + "اغتيال")){
     let time = "3600000"
    let daily =  await db1.get(`scam_${msg.author.id}`)
    
    if(daily !== null  && time - (Date.now() - daily) > 0){
  let duration = ms(time - (Date.now() - daily), {long: true});
  msg.reply({content: `يمكنك استخدام الامر مجددا بعد **${duration}**`})
    }else {
    let member = msg.mentions.members.first()
    if(!member)return msg.reply({content: `**الرجاء منشن شخص**`})
      if(member.id == msg.author.id)return msg.reply({content: `**لا يمكنك اغتيال نفسك**`})
      if(member.id == client.id)return msg.reply({content: `**لا يمكنك اغتيال البوت**`})
    let amount = Math.floor(Math.random() * 5000);
    let membermoney = db.fetch(`money_${member.id}`)
    if(membermoney < 5000)return msg.reply({content: `**لا يمكنك اغتيال شخص معاه اقل من 5000**`})
    db.subtract(`money_${member.id}`, amount)
    dd.add(`money_${msg.author.id}`, amount)
    dd.add(`badmoney_${msg.author.id}`, amount)
       db1.set(`scam_${msg.author.id}`, Date.now())
      
  let newcash = dd.fetch(`money_${msg.author.id}`)
    msg.reply({embeds: [
       new MessageEmbed()
        .setAuthor(msg.author.username)
        .setFooter(msg.guild.name)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110304492127273084/762030.png')
        .setColor(`#acabcd`)
        .setDescription(`
لقد تم اغتيال ${member} من قبل قاتل متسلسل
تم تسليمك: **$${amount}**
رصيدك الحالي: **$${newcash}**`) 
    ]})
    }
  }
})
//------------------------------------------------------------------------------------

//اضافه فلوس
client.on("messageCreate", async message => {
    if(message.content.startsWith(prefix + 'اضافه')) {
    if (!owner.includes(message.author.id)) return;
       var users = message.mentions.members.first();
      if(!users) return message.channel.send({ content: `**Usage : ${prefix}اضافه \`[user] [amount]\`**` });
      
        let user = message.mentions.members.first() || message.author;
        const args = message.content.split(' ').slice(1);
        const reason = message.content.split(' ').slice(2).join(' ')
        if(!reason) return;
        if (isNaN(args[1])) return;
        dd.add(`money_${user.id}`, args[1])
        let bal = await dd.fetch(`money_${user.id}`)
       user.send({ content: `:atm:  |  Transfer Receipt\n\`\`\`You have received $${args[1]} from user ${message.author.username} (ID: ${message.author.id})\`\`\``})
        message.channel.send({ content: `تمت إضافة مبلغ : \`${args[1]}\` لـ${user} \n رصيده الأن : \`$${bal}\`` })
    }
})
//------------------------------------------------------------------------------------

//لعبه

//------------------------------------------------------------------------------------

//اوامر
client.on('messageCreate', async msg => {
  if(msg.content === prefix + "اوامر"){
    let embed = new MessageEmbed()
    .setDescription(`**
${prefix}راتب
${prefix}تحويل-بنكي
${prefix}حسابي
${prefix}ايداع
${prefix}سحب
${prefix}توب
${prefix}بخشيش
${prefix}قمار
${prefix}مخاطره
${prefix}نرد
${prefix}حافز
${prefix}تداول
${prefix}استثمار
${prefix}طاولة
${prefix}نهب
${prefix}حراميه
${prefix}اغتيال
${prefix}ضمان
    **`)
    .setTitle(`**اوامر بنك الرياض**`)
    .setThumbnail('https://media.discordapp.net/attachments/1085491202922651738/1110305170644013156/763795.png')
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic: true}))
    .setColor(`#acabcd`)
    msg.reply({embeds: [embed]})
  }
})
//------------------------------------------------------------------------------------
client.login(process.env.token)