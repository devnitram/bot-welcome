require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { roleName, welcomeChannelName } = require("./config.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  const role = member.guild.roles.cache.find((r) => r.name === roleName);

  if (role) {
    try {
      await member.roles.add(role);
      console.log(`Cargo "${roleName}" atribuído a ${member.user.tag}`);
    } catch (error) {
      console.error("Erro ao atribuir cargo:", error);
    }
  } else {
    console.log(`Cargo "${roleName}" não encontrado.`);
  }

  const channel = member.guild.channels.cache.find(
    (c) => c.name === welcomeChannelName && c.isTextBased()
  );

  if (channel) {
    channel.send(
      `Olá grande 🐵 macaco ${member.user.username}, bem-vindo(a) ao servidor da galera!`
    );
  } else {
    console.log(`❌ Canal "${welcomeChannelName}" não encontrado.`);
  }
});

client.on("guildMemberRemove", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "🐒-boas-vindas"
  );

  if (!channel) return;

  channel.send(
    `Alá, o macaco ${member.user.username} quitando, ja tiltou. É foda, pode falar nada com a princesa que ja fica "aiai vou dar meu cu ali".`
  );
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    const answers = [
      "Quer atenção princesa?",
      "Não tenho certeza, mas me parece que tu ou quer pau ou quer mel, sério mermo",
      "Cuidado que o macaco ta puto ai galerakkkkkkkkkkkkkkkkk",
      "Viado?",
      "Macaco?",
      "Puta?",
      "Vc quer é pau",
    ];

    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

    setTimeout(() => {
      message.channel.send(randomAnswer);
    }, 2500);
  }
});

client.login(process.env.TOKEN);