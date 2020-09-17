import figlet from "figlet";

export const initBanner = (isAdminCreated: boolean) => {
  const colors = [
    "\u001b[32m",
    "\u001b[32m",
    "\u001b[33m",
    "\u001b[36m",
    "\u001b[37m",
  ];
  const separator = String("#").repeat(40);
  const width = String(" ").repeat(2);
  let currentColor = colors[Math.round(Math.random() * 5)];
  let adminCreated = "";

  if (isAdminCreated) {
    adminCreated = "DEFAULT ADMIN USER CREATED";
  } else {
    adminCreated = "DEFAULT ADMIN USER NOT CREATED";
  }

  figlet.text(
    "Library",
    { font: "Doom", horizontalLayout: "universal smushing" },
    (err, banner) => {
      if (err) {
        console.clear();
        console.log("EXPRESS SERVER UP");
        console.log("DB CONNECTION SUCCESS");
        console.log(`${adminCreated}`);
        return;
      } else {
        console.clear();
        console.log(`${currentColor}${separator}`);
        console.log(`${currentColor}${banner}`);
        console.log(`${currentColor}${separator}`);
        console.log(`${colors[2]}${width}[✓] SERVER UP`);
        console.log(`${colors[2]}${width}[✓] DB CONNECTION SUCCES`);
        console.log(`${colors[2]}${width}[✓] ${adminCreated}`);
        console.log(`${currentColor}${separator}`);
      }
    }
  );
};

export const displayError = (
  name: string,
  message?: string,
  code?: string | number
) => {
  const separator = String("#").repeat(40);
  const yellow = "\u001b[33m";
  const red = "\u001b[31m";

  figlet.text("Error", { font: "Doom" }, (err, Error) => {
    if (err) {
      console.clear();
      console.log(`[*] ERROR NAME: ${name}`);
      return;
    } else {
      console.log(`${red}${separator}`);
      console.log(`${yellow}${Error}`);
      console.log(`${red}${separator}`);
      console.log(`${yellow}[*] ERROR NAME: ${name}`);
      console.log(`${yellow}[*] ERROR MESSAGE: ${message}`);
      console.log(`${yellow}[*] ERROR CODE: ${code}`);
      console.log(`${red}${separator}`);
    }
  });
};
