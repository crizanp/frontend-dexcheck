const asciiMap = {
    H: [
      "░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░",
      "░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░",
      "░▒▓████████▓▒░▒▓█▓▒░",
      "░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░",
      "░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░",
    ],
    I: [
      "░▒▓█████▓▒░",
      "   ▒▓█▓▒   ",
      "   ▒▓█▓▒   ",
      "   ▒▓█▓▒   ",
      "░▒▓█████▓▒░",
    ],
    " ": ["  ", "  ", "  ", "  ", "  "], // For spaces
    "?": [
      "░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░",
      "     ▒▓█▓▒      ",
      "░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░",
      "       ▒▓█▓▒   ",
      "░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░",
    ],
  };
  
  const AsciiArt = (text) => {
    const lines = ["", "", "", "", ""]; // Prepare 5 empty lines for the ASCII art
  
    text.toUpperCase().split("").forEach((char) => {
      const charArt = asciiMap[char] || asciiMap["?"];
      charArt.forEach((line, index) => {
        lines[index] += line + " "; // Append each line of the character to the corresponding line
      });
    });
  
    return lines.join("\n"); // Join all lines with a newline character
  };
  
  export default AsciiArt;
  