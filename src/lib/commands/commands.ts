import { sendVMixCommand } from "../utils";

export const banVMixImageNames = [
  "Fill 1 Kiri.Fill.Bitmap",
  "Fill 2 Kiri.Fill.Bitmap",
  "Fill 3 Kiri.Fill.Bitmap",
  "Fill 4 Kiri1.Fill.Bitmap",
  "Fill 5 Kiri1.Fill.Bitmap",
  "Fill 5 Kanan1.Fill.Bitmap",
  "Fill 4 Kanan1.Fill.Bitmap",
  "Fill 3 Kanan.Fill.Bitmap",
  "Fill 2 kanan.Fill.Bitmap",
  "Fill 1 kanan.Fill.Bitmap",
];

export const pickVMixImageNames = [
  "PLAYER 5 KANAN3.Source",
  "PLAYER 4 KANAN3.Source",
  "PLAYER 3 KANAN3.Source",
  "PLAYER 2 KANAN3.Source",
  "PLAYER 1 KANAN3.Source",
  "PLAYER 1 KIRI2.Source",
  "PLAYER 2 KIRI2.Source",
  "PLAYER 3 KIRI2.Source",
  "PLAYER 4 KIRI2.Source",
  "PLAYER 5 KIRI2.Source",
];

const heroIconVMixImageNames = [
  "5thherokanan.Source",
  "4thherokanan.Source",
  "3rdherokanan.Source",
  "2ndherokanan.Source",
  "1stherokanan.Source",
  "1stherokiri.Source",
  "2ndherokiri.Source",
  "3rdherokiri.Source",
  "4thherokiri.Source",
  "5thherokiri.Source",
];

export const logoTimDraft = ["LOGO KANAN.Source", "LOGO KIRI.Source"];

const banVMixImageInputs = ["DRAFT2.gtzip", "DRAFT3.gtzip"];

const pickVMixImageInput = "DRAFT4.gtzip";

const assetPath = {
  ban: import.meta.env.VITE_HERO_BAN_PATH,
  pick: import.meta.env.VITE_HERO_PICK_PATH,
};

export const senBanHeroCommand = (team: "blue" | "red", hero: string, index: number) => {
  const teamSide = team === "blue" ? "kiri" : "kanan";

  const filteredNames = banVMixImageNames.filter((name) =>
    name.toLowerCase().includes(teamSide.toLowerCase()),
  );

  const [, number] = filteredNames[index].split(" ");

  const input = parseInt(number) <= 3 ? banVMixImageInputs[0] : banVMixImageInputs[1];

  // filter hero name form ' char
  let heroName = hero.replace("'", "_");
  heroName = heroName.replace("-", " ");
  heroName = heroName.replace(".", "");

  sendVMixCommand([
    {
      Function: "SetImage",
      Input: input,
      Value: `${assetPath.ban}${heroName.toLocaleUpperCase()}.png`,
      SelectedName: filteredNames[index],
    },
  ]);
};

export const sendClearBanHeroCommand = () => {
  banVMixImageNames.forEach((name) => {
    const [, number] = name.split(" ");
    const input = parseInt(number) <= 3 ? banVMixImageInputs[0] : banVMixImageInputs[1];

    sendVMixCommand([
      {
        Function: "SetImage",
        Input: input,
        Value: "",
        SelectedName: name,
      },
    ]);
  });
};

export const sendPickHeroCommand = (team: "blue" | "red", hero: string, index: number) => {
  const teamSide = team === "blue" ? "kiri" : "kanan";

  const filteredNames = pickVMixImageNames.filter((name) =>
    name.toLowerCase().includes(teamSide.toLowerCase()),
  );

  const fileteredHeroIconNames = heroIconVMixImageNames.filter((name) =>
    name.toLowerCase().includes(teamSide.toLowerCase()),
  );

  // filter hero name form ' char
  const heroName = hero.replace("'", "_");

  sendVMixCommand([
    {
      Function: "SetImage",
      Input: pickVMixImageInput,
      Value: `${assetPath.pick}${heroName}.png`,
      SelectedName: filteredNames[index],
    },
    {
      Function: "SetImage",
      Input: import.meta.env.VITE_ITEM_GTZIP,
      Value: `${import.meta.env.VITE_LOGO_HERO_PATH}${heroName}.png`,
      SelectedName: fileteredHeroIconNames[index],
    },
  ]);
};

export const sendSwitchPickHeroCommand = (bluePick, redPick) => {
  bluePick.forEach((hero, index) => {
    sendPickHeroCommand("blue", hero, index);
  });

  redPick.forEach((hero, index) => {
    sendPickHeroCommand("red", hero, index);
  });
};

export const sendClearPickHeroCommand = () => {
  pickVMixImageNames.forEach((name) => {
    sendVMixCommand([
      {
        Function: "SetImage",
        Input: pickVMixImageInput,
        Value: "",
        SelectedName: name,
      },
    ]);
  });
};

export const sendChangeJudulMatch = (judulMatch: string) => {
  // judul game draft
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_DRAFT1_GTZIP,
    Value: judulMatch,
    SelectedName: import.meta.env.VITE_JUDUL_MATCH_TEXT,
  });

  // judul game ingame
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_INGAME_GTZIP,
    Value: judulMatch,
    SelectedName: "judul game.Text",
  });

  // judul game draft count down
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_DRAFTCOUNTDOWN_GTZIP,
    Value: judulMatch,
    SelectedName: "judul game.Text",
  });

  // judul game caster headline
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_CASTERHEADLINE_GTZIP,
    Value: `KOMINFO KARNAVAL 2024 MLBB | ${judulMatch}`,
    SelectedName: "HEADLINE.Text",
  });

  // judul game waiting
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_WAITING_GTZIP,
    Value: `KOMINFO KARNAVAL 2024 MLBB | ${judulMatch}`,
    SelectedName: "JUDUL HEADLINE.Text",
  });
};

export const sendChangeGameBerapa = (gameBerapa: string) => {
  // game berapa in Game
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_INGAME_GTZIP,
    Value: gameBerapa,
    SelectedName: "game.Text",
  });

  // game berapa draft count down
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_DRAFTCOUNTDOWN_GTZIP,
    Value: gameBerapa,
    SelectedName: "game.Text",
  });
};

export const sendChangeTextBerjalan = (text: string) => {
  // game berapa waiting
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_WAITING_GTZIP,
    Value: text,
    SelectedName: "RUNNING TEKS.Text",
  });

  // game berapa caster headline
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_CASTERHEADLINE_GTZIP,
    Value: text,
    SelectedName: "RUNNINGTEKS.Text",
  });
};

export const sendTurtleCommand = (team: "blue" | "red", value) => {
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_INGAME_GTZIP,
    Value: value,
    SelectedName: team === "blue" ? "turtlekiri.Text" : "turtle kanan.Text",
  });
};

const bluePlayersText = [
  "1STNICKKIRI.Text",
  "2NDNICKKIRI.Text",
  "3RDNICKKIRI.Text",
  "4THNICKKIRI.Text",
  "5THNICKKIRI.Text",
];

const redPlayersText = [
  "5THNICKKANAN.Text",
  "4THNICKKANAN.Text",
  "3RDNICKKANAN.Text",
  "2NDNICKKANAN.Text",
  "1STNICKKANAN.Text",
];

export const sendSyncCommandGeneral = (blueTeam, redTeam) => {
  // NAMA TIM DRAFT
  sendVMixCommand([
    {
      Function: "SetText",
      Value: blueTeam?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: "NAMA TIM KIRI.Text",
    },
    {
      Function: "SetText",
      Value: redTeam?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: "NAMA TIM KANAN.Text",
    },
  ]);

  // NAMA TIM INGAME
  sendVMixCommand([
    {
      Function: "SetText",
      Value: blueTeam?.name,
      Input: import.meta.env.VITE_INGAME_GTZIP,
      SelectedName: "NAMA TIM KIRI.Text",
    },
    {
      Function: "SetText",
      Value: redTeam?.name,
      Input: import.meta.env.VITE_INGAME_GTZIP,
      SelectedName: "NAMA TIM KANAN.Text",
    },
  ]);

  // NAMA TIM CAM INGAME
  sendVMixCommand([
    {
      Function: "SetText",
      Value: blueTeam?.name,
      Input: import.meta.env.VITE_CAMINGAME_GTZIP,
      SelectedName: "NAMATIMKIRI.Text",
    },
    {
      Function: "SetText",
      Value: redTeam?.name,
      Input: import.meta.env.VITE_CAMINGAME_GTZIP,
      SelectedName: "NAMATIMKANAN.Text",
    },
  ]);

  // result
  sendVMixCommand([
    {
      Function: "SetText",
      Value: blueTeam?.name,
      Input: import.meta.env.VITE_RESULT_GTZIP,
      SelectedName: "namatimkiri.Text",
    },
    {
      Function: "SetText",
      Value: redTeam?.name,
      Input: import.meta.env.VITE_RESULT_GTZIP,
      SelectedName: "namatimkanan.Text",
    },
  ]);

  sendVMixCommand(
    bluePlayersText.map((text, index) => ({
      Function: "SetText",
      Value: blueTeam?.players[index]?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );

  sendVMixCommand(
    redPlayersText.map((text, index) => ({
      Function: "SetText",
      Value: redTeam?.players[index]?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );

  // Logo Draft
  sendVMixCommand([
    {
      Function: "SetImage",
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      Value: `${import.meta.env.VITE_LOGO_TIM_PATH}${blueTeam?.name}.png`,
      SelectedName: logoTimDraft[1],
    },
    {
      Function: "SetImage",
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      Value: `${import.meta.env.VITE_LOGO_TIM_PATH}${redTeam?.name}.png`,
      SelectedName: logoTimDraft[0],
    },
  ]);

  // Logo In Game
  sendVMixCommand([
    {
      Function: "SetImage",
      Input: import.meta.env.VITE_INGAME_GTZIP,
      Value: `${import.meta.env.VITE_LOGO_TIM_PATH}${blueTeam?.name}.png`,
      SelectedName: logoTimDraft[1],
    },
    {
      Function: "SetImage",
      Input: import.meta.env.VITE_INGAME_GTZIP,
      Value: `${import.meta.env.VITE_LOGO_TIM_PATH}${redTeam?.name}.png`,
      SelectedName: logoTimDraft[0],
    },
  ]);

  // Logo caster headline

  sendVMixCommand([
    {
      Function: "SetImage",
      Input: import.meta.env.VITE_CASTERHEADLINE_GTZIP,
      Value: `${import.meta.env.VITE_LOGO_TIM_PATH}${blueTeam?.name}.png`,
      SelectedName: "LOGO KIRI.Source",
    },
    {
      Function: "SetImage",
      Input: import.meta.env.VITE_CASTERHEADLINE_GTZIP,
      Value: `${import.meta.env.VITE_LOGO_TIM_PATH}${redTeam?.name}.png`,
      SelectedName: "LOGO KANAN.Source",
    },
  ]);
};

export const sendSyncCommandDraft = (blueTeamPlayers, redTeamPlayers) => {
  sendVMixCommand(
    bluePlayersText.map((text, index) => ({
      Function: "SetText",
      Value: blueTeamPlayers[index],
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );

  sendVMixCommand(
    redPlayersText.map((text, index) => ({
      Function: "SetText",
      Value: redTeamPlayers[index],
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );
};

const redColorScores = ["BO3KANAN.Fill.Color", "KANAN.Fill.Color", "BO5KANAN.Fill.Color"];

const blueColorScores = ["BO3KIRI.Fill.Color", "KIRI.Fill.Color", "BO5KIRI.Fill.Color"];

const blueColorScoresResult = [
  "SKOR 1 KIRI.Fill.Color",
  "SKOR 2 KIRI.Fill.Color",
  "SKOR 3 KIRI.Fill.Color",
];

const redColorScoresResult = [
  "SKOR 1 KANAN.Fill.Color",
  "SKOR 2 KANAN.Fill.Color",
  "SKOR 3 KANAN.Fill.Color",
];

const inGameBlueScore = ["bo5kiri.Fill.Color", "bo3kiri.Fill.Color"];
const inGameRedScore = ["bo5kanan.Fill.Color", "bo3kanan.Fill.Color"];

const defaultColorValue = "#C0C0C0";
const defaultColorResultValue = "#FFFFFF";

const redScoreColor = "#FF0000";
const blueScoreColor = "#00FFFF";

export const sendChangeScore = (scores: { blue: number; red: number }) => {
  sendVMixCommand(
    blueColorScores.map((color, index) => ({
      Function: "SetColor",
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      Value: scores.blue > index ? blueScoreColor : defaultColorValue,
      SelectedName: color,
    })),
  );

  sendVMixCommand(
    redColorScores.map((color, index) => ({
      Function: "SetColor",
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      Value: scores.red > index ? redScoreColor : defaultColorValue,
      SelectedName: color,
    })),
  );

  sendVMixCommand(
    blueColorScoresResult.map((color, index) => ({
      Function: "SetColor",
      Input: import.meta.env.VITE_RESULT_GTZIP,
      Value: scores.blue > index ? blueScoreColor : defaultColorResultValue,
      SelectedName: color,
    })),
  );

  sendVMixCommand(
    redColorScoresResult.map((color, index) => ({
      Function: "SetColor",
      Input: import.meta.env.VITE_RESULT_GTZIP,
      Value: scores.red > index ? redScoreColor : defaultColorResultValue,
      SelectedName: color,
    })),
  );

  sendVMixCommand(
    inGameBlueScore.map((color, index) => ({
      Function: "SetColor",
      Input: import.meta.env.VITE_INGAME_GTZIP,
      Value: scores.blue > index ? blueScoreColor : defaultColorValue,
      SelectedName: color,
    })),
  );

  sendVMixCommand(
    inGameRedScore.map((color, index) => ({
      Function: "SetColor",
      Input: import.meta.env.VITE_INGAME_GTZIP,
      Value: scores.red > index ? redScoreColor : defaultColorValue,
      SelectedName: color,
    })),
  );

  // CASTER HEADLIEN
  sendVMixCommand([
    {
      Function: "SetText",
      Input: import.meta.env.VITE_CASTERHEADLINE_GTZIP,
      Value: scores.blue.toString(),
      SelectedName: "SKORKIRI.Text",
    },
    {
      Function: "SetText",
      Input: import.meta.env.VITE_CASTERHEADLINE_GTZIP,
      Value: scores.red.toString(),
      SelectedName: "SKORKANAN.Text",
    },
  ]);
};

export const sendChangeWaktuMatch = (waktuMatch: string) => {
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_RESULT_GTZIP,
    Value: waktuMatch,
    SelectedName: import.meta.env.VITE_WAKTU_MATCH_RESULT_TEXT,
  });
};

export const sendChangePointKill = (pointKill: { blue: number; red: number }) => {
  sendVMixCommand([
    {
      Function: "SetText",
      Input: import.meta.env.VITE_RESULT_GTZIP,
      Value: pointKill.blue.toString(),
      SelectedName: "skor kiri.Text",
    },
    {
      Function: "SetText",
      Input: import.meta.env.VITE_RESULT_GTZIP,
      Value: pointKill.red.toString(),
      SelectedName: "skor kanan.Text",
    },
  ]);
};

export const sendChangeMVP = (value, text) => {
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_MVP_GTZIP,
    Value: value,
    SelectedName: text,
  });
};

export const itemImageNames = [
  "ITEM1.Source",
  "ITEM2.Source",
  "ITEM3.Source",
  "ITEM4.Source",
  "ITEM5.Source",
  "ITEM6.Source",
];

export const sendChangeMVPImage = (value, image, type) => {
  let imagePath = "";

  switch (type) {
    case "hero":
      imagePath = `${import.meta.env.VITE_HERO_MVP_PATH}${value}.png`;
      imagePath = imagePath.replace("'", "_");
      break;
    case "emblem":
      imagePath = `${import.meta.env.VITE_EMBLEM_MVP_PATH}${value}`;
      break;
    case "spell":
      imagePath = `${import.meta.env.VITE_SPELL_MVP_PATH}${value}`;
      break;
    case "role":
      imagePath = `${import.meta.env.VITE_ROLE_MVP_PATH}${value}`;
      break;
    case "tim":
      imagePath = `${import.meta.env.VITE_LOGO_TIM_PATH}${value}.png`;
      break;
    case "item":
      imagePath = `${import.meta.env.VITE_ITEM_MVP_PATH}${value}`;
      if (value === "empty") {
        imagePath = "";
      }
      break;

    default:
      break;
  }

  sendVMixCommand({
    Function: "SetImage",
    Input: import.meta.env.VITE_MVP_GTZIP,
    Value: imagePath,
    SelectedName: image,
  });
};

export const sendWaitingText = (value, text) => {
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_WAITING_GTZIP,
    Value: value,
    SelectedName: text,
  });
};

export const sendWaitingImage = (value, image) => {
  sendVMixCommand({
    Function: "SetImage",
    Input: import.meta.env.VITE_WAITING_GTZIP,
    Value: `${import.meta.env.VITE_LOGO_TIM_PATH}${value}.png`,
    SelectedName: image,
  });
};
