import figlet from "figlet";

export const initBanner = async () => {
  const colors = [
    "\u001b[31m",
    "\u001b[32m",
    "\u001b[33m",
    "\u001b[34m",
    "\u001b[36m",
    "\u001b[37m",
  ];

  let currentColor = colors[Math.round(Math.random() * 6)];

  await figlet.text("Library", (err, banner) => {
    if (err) {
      console.log("EXPRESS SERVER UP");
      console.log("DB CONNECTION SUCCESS");
      return;
    }
    console.log(`${currentColor}${banner}`);
    console.log("[✓] SERVER UP");
    console.log("[✓] DB CONNECTION SUCCES");
  });
};
