module.exports = {
  config: {
    name: "guessflag",
    version: "1.0",
    author: "JISHAN76",
    shortDescription: "Guess the country based on a flag image.",
    category: "fun",
    guide: "{prefix}guessflag"
  },
  onStart: async function ({ message, api }) {
    const fs = require("fs");
    const path = require("path");
    const axios = require("axios");
    
    // Comprehensive list of countries with their flag image URLs and names
    const countries = [
      { flag: "https://flagcdn.com/w320/af.png", name: "Afghanistan" },
      { flag: "https://flagcdn.com/w320/al.png", name: "Albania" },
      { flag: "https://flagcdn.com/w320/dz.png", name: "Algeria" },
      { flag: "https://flagcdn.com/w320/ad.png", name: "Andorra" },
      { flag: "https://flagcdn.com/w320/ao.png", name: "Angola" },
      { flag: "https://flagcdn.com/w320/ag.png", name: "Antigua and Barbuda" },
      { flag: "https://flagcdn.com/w320/ar.png", name: "Argentina" },
      { flag: "https://flagcdn.com/w320/am.png", name: "Armenia" },
      { flag: "https://flagcdn.com/w320/au.png", name: "Australia" },
      { flag: "https://flagcdn.com/w320/at.png", name: "Austria" },
      { flag: "https://flagcdn.com/w320/az.png", name: "Azerbaijan" },
      { flag: "https://flagcdn.com/w320/bs.png", name: "Bahamas" },
      { flag: "https://flagcdn.com/w320/bh.png", name: "Bahrain" },
      { flag: "https://flagcdn.com/w320/bd.png", name: "Bangladesh" },
      { flag: "https://flagcdn.com/w320/bb.png", name: "Barbados" },
      { flag: "https://flagcdn.com/w320/by.png", name: "Belarus" },
      { flag: "https://flagcdn.com/w320/be.png", name: "Belgium" },
      { flag: "https://flagcdn.com/w320/bz.png", name: "Belize" },
      { flag: "https://flagcdn.com/w320/bj.png", name: "Benin" },
      { flag: "https://flagcdn.com/w320/bt.png", name: "Bhutan" },
      { flag: "https://flagcdn.com/w320/bo.png", name: "Bolivia" },
      { flag: "https://flagcdn.com/w320/ba.png", name: "Bosnia and Herzegovina" },
      { flag: "https://flagcdn.com/w320/bw.png", name: "Botswana" },
      { flag: "https://flagcdn.com/w320/br.png", name: "Brazil" },
      { flag: "https://flagcdn.com/w320/bn.png", name: "Brunei" },
      { flag: "https://flagcdn.com/w320/bg.png", name: "Bulgaria" },
      { flag: "https://flagcdn.com/w320/bf.png", name: "Burkina Faso" },
      { flag: "https://flagcdn.com/w320/bi.png", name: "Burundi" },
      { flag: "https://flagcdn.com/w320/cv.png", name: "Cabo Verde" },
      { flag: "https://flagcdn.com/w320/kh.png", name: "Cambodia" },
      { flag: "https://flagcdn.com/w320/cm.png", name: "Cameroon" },
      { flag: "https://flagcdn.com/w320/ca.png", name: "Canada" },
      { flag: "https://flagcdn.com/w320/cf.png", name: "Central African Republic" },
      { flag: "https://flagcdn.com/w320/td.png", name: "Chad" },
      { flag: "https://flagcdn.com/w320/cl.png", name: "Chile" },
      { flag: "https://flagcdn.com/w320/cn.png", name: "China" },
      { flag: "https://flagcdn.com/w320/co.png", name: "Colombia" },
      { flag: "https://flagcdn.com/w320/km.png", name: "Comoros" },
      { flag: "https://flagcdn.com/w320/cg.png", name: "Congo" },
      { flag: "https://flagcdn.com/w320/cd.png", name: "Congo (Democratic Republic)" },
      { flag: "https://flagcdn.com/w320/cr.png", name: "Costa Rica" },
      { flag: "https://flagcdn.com/w320/ci.png", name: "Côte d'Ivoire" },
      { flag: "https://flagcdn.com/w320/hr.png", name: "Croatia" },
      { flag: "https://flagcdn.com/w320/cu.png", name: "Cuba" },
      { flag: "https://flagcdn.com/w320/cy.png", name: "Cyprus" },
      { flag: "https://flagcdn.com/w320/cz.png", name: "Czech Republic" },
      { flag: "https://flagcdn.com/w320/dk.png", name: "Denmark" },
      { flag: "https://flagcdn.com/w320/dj.png", name: "Djibouti" },
      { flag: "https://flagcdn.com/w320/dm.png", name: "Dominica" },
      { flag: "https://flagcdn.com/w320/do.png", name: "Dominican Republic" },
      { flag: "https://flagcdn.com/w320/ec.png", name: "Ecuador" },
      { flag: "https://flagcdn.com/w320/eg.png", name: "Egypt" },
      { flag: "https://flagcdn.com/w320/sv.png", name: "El Salvador" },
      { flag: "https://flagcdn.com/w320/gq.png", name: "Equatorial Guinea" },
      { flag: "https://flagcdn.com/w320/er.png", name: "Eritrea" },
      { flag: "https://flagcdn.com/w320/ee.png", name: "Estonia" },
      { flag: "https://flagcdn.com/w320/sz.png", name: "Eswatini" },
      { flag: "https://flagcdn.com/w320/et.png", name: "Ethiopia" },
      { flag: "https://flagcdn.com/w320/fj.png", name: "Fiji" },
      { flag: "https://flagcdn.com/w320/fi.png", name: "Finland" },
      { flag: "https://flagcdn.com/w320/fr.png", name: "France" },
      { flag: "https://flagcdn.com/w320/ga.png", name: "Gabon" },
      { flag: "https://flagcdn.com/w320/gm.png", name: "Gambia" },
      { flag: "https://flagcdn.com/w320/ge.png", name: "Georgia" },
      { flag: "https://flagcdn.com/w320/de.png", name: "Germany" },
      { flag: "https://flagcdn.com/w320/gh.png", name: "Ghana" },
      { flag: "https://flagcdn.com/w320/gr.png", name: "Greece" },
      { flag: "https://flagcdn.com/w320/gd.png", name: "Grenada" },
      { flag: "https://flagcdn.com/w320/gt.png", name: "Guatemala" },
      { flag: "https://flagcdn.com/w320/gn.png", name: "Guinea" },
      { flag: "https://flagcdn.com/w320/gw.png", name: "Guinea-Bissau" },
      { flag: "https://flagcdn.com/w320/gy.png", name: "Guyana" },
      { flag: "https://flagcdn.com/w320/ht.png", name: "Haiti" },
      { flag: "https://flagcdn.com/w320/hn.png", name: "Honduras" },
      { flag: "https://flagcdn.com/w320/hu.png", name: "Hungary" },
      { flag: "https://flagcdn.com/w320/is.png", name: "Iceland" },
      { flag: "https://flagcdn.com/w320/in.png", name: "India" },
      { flag: "https://flagcdn.com/w320/id.png", name: "Indonesia" },
      { flag: "https://flagcdn.com/w320/ir.png", name: "Iran" },
      { flag: "https://flagcdn.com/w320/iq.png", name: "Iraq" },
      { flag: "https://flagcdn.com/w320/ie.png", name: "Ireland" },
      { flag: "https://flagcdn.com/w320/il.png", name: "Israel" },
      { flag: "https://flagcdn.com/w320/it.png", name: "Italy" },
      { flag: "https://flagcdn.com/w320/jm.png", name: "Jamaica" },
      { flag: "https://flagcdn.com/w320/jp.png", name: "Japan" },
      { flag: "https://flagcdn.com/w320/jo.png", name: "Jordan" },
      { flag: "https://flagcdn.com/w320/kz.png", name: "Kazakhstan" },
      { flag: "https://flagcdn.com/w320/ke.png", name: "Kenya" },
      { flag: "https://flagcdn.com/w320/ki.png", name: "Kiribati" },
      { flag: "https://flagcdn.com/w320/kp.png", name: "North Korea" },
      { flag: "https://flagcdn.com/w320/kr.png", name: "South Korea" },
      { flag: "https://flagcdn.com/w320/kw.png", name: "Kuwait" },
      { flag: "https://flagcdn.com/w320/kg.png", name: "Kyrgyzstan" },
      { flag: "https://flagcdn.com/w320/la.png", name: "Laos" },
      { flag: "https://flagcdn.com/w320/lv.png", name: "Latvia" },
      { flag: "https://flagcdn.com/w320/lb.png", name: "Lebanon" },
      { flag: "https://flagcdn.com/w320/ls.png", name: "Lesotho" },
      { flag: "https://flagcdn.com/w320/lr.png", name: "Liberia" },
      { flag: "https://flagcdn.com/w320/ly.png", name: "Libya" },
      { flag: "https://flagcdn.com/w320/li.png", name: "Liechtenstein" },
      { flag: "https://flagcdn.com/w320/lt.png", name: "Lithuania" },
      { flag: "https://flagcdn.com/w320/lu.png", name: "Luxembourg" },
      { flag: "https://flagcdn.com/w320/mg.png", name: "Madagascar" },
      { flag: "https://flagcdn.com/w320/mw.png", name: "Malawi" },
      { flag: "https://flagcdn.com/w320/my.png", name: "Malaysia" },
      { flag: "https://flagcdn.com/w320/mv.png", name: "Maldives" },
      { flag: "https://flagcdn.com/w320/ml.png", name: "Mali" },
      { flag: "https://flagcdn.com/w320/mt.png", name: "Malta" },
      { flag: "https://flagcdn.com/w320/mh.png", name: "Marshall Islands" },
      { flag: "https://flagcdn.com/w320/mr.png", name: "Mauritania" },
      { flag: "https://flagcdn.com/w320/mu.png", name: "Mauritius" },
      { flag: "https://flagcdn.com/w320/mx.png", name: "Mexico" },
      { flag: "https://flagcdn.com/w320/fm.png", name: "Micronesia" },
      { flag: "https://flagcdn.com/w320/md.png", name: "Moldova" },
      { flag: "https://flagcdn.com/w320/mc.png", name: "Monaco" },
      { flag: "https://flagcdn.com/w320/mn.png", name: "Mongolia" },
      { flag: "https://flagcdn.com/w320/me.png", name: "Montenegro" },
      { flag: "https://flagcdn.com/w320/ma.png", name: "Morocco" },
      { flag: "https://flagcdn.com/w320/mz.png", name: "Mozambique" },
      { flag: "https://flagcdn.com/w320/mm.png", name: "Myanmar" },
      { flag: "https://flagcdn.com/w320/na.png", name: "Namibia" },
      { flag: "https://flagcdn.com/w320/nr.png", name: "Nauru" },
      { flag: "https://flagcdn.com/w320/np.png", name: "Nepal" },
      { flag: "https://flagcdn.com/w320/nl.png", name: "Netherlands" },
      { flag: "https://flagcdn.com/w320/nz.png", name: "New Zealand" },
      { flag: "https://flagcdn.com/w320/ni.png", name: "Nicaragua" },
      { flag: "https://flagcdn.com/w320/ne.png", name: "Niger" },
      { flag: "https://flagcdn.com/w320/ng.png", name: "Nigeria" },
      { flag: "https://flagcdn.com/w320/mk.png", name: "North Macedonia" },
      { flag: "https://flagcdn.com/w320/no.png", name: "Norway" },
      { flag: "https://flagcdn.com/w320/om.png", name: "Oman" },
      { flag: "https://flagcdn.com/w320/pk.png", name: "Pakistan" },
      { flag: "https://flagcdn.com/w320/pw.png", name: "Palau" },
      { flag: "https://flagcdn.com/w320/pa.png", name: "Panama" },
      { flag: "https://flagcdn.com/w320/pg.png", name: "Papua New Guinea" },
      { flag: "https://flagcdn.com/w320/py.png", name: "Paraguay" },
      { flag: "https://flagcdn.com/w320/pe.png", name: "Peru" },
      { flag: "https://flagcdn.com/w320/ph.png", name: "Philippines" },
      { flag: "https://flagcdn.com/w320/pl.png", name: "Poland" },
      { flag: "https://flagcdn.com/w320/pt.png", name: "Portugal" },
      { flag: "https://flagcdn.com/w320/qa.png", name: "Qatar" },
      { flag: "https://flagcdn.com/w320/ro.png", name: "Romania" },
      { flag: "https://flagcdn.com/w320/ru.png", name: "Russia" },
      { flag: "https://flagcdn.com/w320/rw.png", name: "Rwanda" },
      { flag: "https://flagcdn.com/w320/kn.png", name: "Saint Kitts and Nevis" },
      { flag: "https://flagcdn.com/w320/lc.png", name: "Saint Lucia" },
      { flag: "https://flagcdn.com/w320/vc.png", name: "Saint Vincent and the Grenadines" },
      { flag: "https://flagcdn.com/w320/ws.png", name: "Samoa" },
      { flag: "https://flagcdn.com/w320/sm.png", name: "San Marino" },
      { flag: "https://flagcdn.com/w320/st.png", name: "São Tomé and Príncipe" },
      { flag: "https://flagcdn.com/w320/sa.png", name: "Saudi Arabia" },
      { flag: "https://flagcdn.com/w320/sn.png", name: "Senegal" },
      { flag: "https://flagcdn.com/w320/rs.png", name: "Serbia" },
      { flag: "https://flagcdn.com/w320/sc.png", name: "Seychelles" },
      { flag: "https://flagcdn.com/w320/sl.png", name: "Sierra Leone" },
      { flag: "https://flagcdn.com/w320/sg.png", name: "Singapore" },
      { flag: "https://flagcdn.com/w320/sk.png", name: "Slovakia" },
      { flag: "https://flagcdn.com/w320/si.png", name: "Slovenia" },
      { flag: "https://flagcdn.com/w320/sb.png", name: "Solomon Islands" },
      { flag: "https://flagcdn.com/w320/so.png", name: "Somalia" },
      { flag: "https://flagcdn.com/w320/za.png", name: "South Africa" },
      { flag: "https://flagcdn.com/w320/ss.png", name: "South Sudan" },
      { flag: "https://flagcdn.com/w320/es.png", name: "Spain" },
      { flag: "https://flagcdn.com/w320/lk.png", name: "Sri Lanka" },
      { flag: "https://flagcdn.com/w320/sd.png", name: "Sudan" },
      { flag: "https://flagcdn.com/w320/sr.png", name: "Suriname" },
      { flag: "https://flagcdn.com/w320/se.png", name: "Sweden" },
      { flag: "https://flagcdn.com/w320/ch.png", name: "Switzerland" },
      { flag: "https://flagcdn.com/w320/sy.png", name: "Syria" },
      { flag: "https://flagcdn.com/w320/tj.png", name: "Tajikistan" },
      { flag: "https://flagcdn.com/w320/tz.png", name: "Tanzania" },
      { flag: "https://flagcdn.com/w320/th.png", name: "Thailand" },
      { flag: "https://flagcdn.com/w320/tl.png", name: "Timor-Leste" },
      { flag: "https://flagcdn.com/w320/tg.png", name: "Togo" },
      { flag: "https://flagcdn.com/w320/to.png", name: "Tonga" },
      { flag: "https://flagcdn.com/w320/tt.png", name: "Trinidad and Tobago" },
      { flag: "https://flagcdn.com/w320/tn.png", name: "Tunisia" },
      { flag: "https://flagcdn.com/w320/tr.png", name: "Turkey" },
      { flag: "https://flagcdn.com/w320/tm.png", name: "Turkmenistan" },
      { flag: "https://flagcdn.com/w320/tv.png", name: "Tuvalu" },
      { flag: "https://flagcdn.com/w320/ug.png", name: "Uganda" },
      { flag: "https://flagcdn.com/w320/ua.png", name: "Ukraine" },
      { flag: "https://flagcdn.com/w320/ae.png", name: "United Arab Emirates" },
      { flag: "https://flagcdn.com/w320/gb.png", name: "United Kingdom" },
      { flag: "https://flagcdn.com/w320/us.png", name: "United States" },
      { flag: "https://flagcdn.com/w320/uy.png", name: "Uruguay" },
      { flag: "https://flagcdn.com/w320/uz.png", name: "Uzbekistan" },
      { flag: "https://flagcdn.com/w320/vu.png", name: "Vanuatu" },
      { flag: "https://flagcdn.com/w320/va.png", name: "Vatican City" },
      { flag: "https://flagcdn.com/w320/ve.png", name: "Venezuela" },
      { flag: "https://flagcdn.com/w320/vn.png", name: "Vietnam" },
      { flag: "https://flagcdn.com/w320/ye.png", name: "Yemen" },
      { flag: "https://flagcdn.com/w320/zm.png", name: "Zambia" },
      { flag: "https://flagcdn.com/w320/zw.png", name: "Zimbabwe" }
    ];

    // Select a random country
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    
    // Create a temporary directory for storing the flag image if it doesn't exist
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    // Send a message indicating the game is starting
    await message.reply("🎮 **Guess the Country Game** 🎮\n\nI'll send you a flag image. Guess which country it belongs to!");
    
    // Download and send the flag image using axios and fs
    try {
      // Generate a unique filename for the flag image
      const flagFileName = path.join(tempDir, `flag_${Date.now()}.png`);
      
      // Download the flag image using axios
      const response = await axios({
        method: 'GET',
        url: randomCountry.flag,
        responseType: 'stream'
      });
      
      // Create a write stream to save the image
      const writer = fs.createWriteStream(flagFileName);
      
      // Pipe the image data to the file
      response.data.pipe(writer);
      
      // Wait for the download to complete
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
      
      // Read the file as a stream to send
      const flagImage = fs.createReadStream(flagFileName);
      
      // Send the image and prompt
      await api.sendMessage({
        body: "What country does this flag belong to? You have 30 seconds to answer!",
        attachment: flagImage
      }, message.threadID);
      
      // Create an array of acceptable answers (including common variations)
      const acceptableAnswers = [
        randomCountry.name.toLowerCase(),
        // Common abbreviations or alternate names
        ...getAlternateNames(randomCountry.name)
      ];
      
      // Wait for the user's response
      const messageCollector = new global.client.messageCollector({
        api,
        threadID: message.threadID,
        senderID: message.senderID,
        time: 30000  // 30 seconds timeout
      });
      
      // Set up the collector
      messageCollector.on("collect", (response) => {
        const userAnswer = response.body.toLowerCase().trim();
        
        // Check if the answer is correct or close
        if (acceptableAnswers.includes(userAnswer)) {
          message.reply(`🎉 Correct! That's the flag of ${randomCountry.name}!`);
          
          // Clean up the temporary file
          cleanupTempFile(flagFileName);
          
          return messageCollector.stop();
        } else if (acceptableAnswers.some(answer => 
          (answer.includes(userAnswer) && userAnswer.length > 3) || 
          (userAnswer.includes(answer) && answer.length > 3)
        )) {
          message.reply(`🎉 Close enough! That's the flag of ${randomCountry.name}!`);
          
          // Clean up the temporary file
          cleanupTempFile(flagFileName);
          
          return messageCollector.stop();
        }
      });
      
      // Handle when time runs out
      messageCollector.on("end", (collected) => {
        // Clean up the temporary file
        cleanupTempFile(flagFileName);
        
        if (collected.size === 0) {
          message.reply(`⏱️ Time's up! The correct answer was ${randomCountry.name}.`);
        }
      });
      
    } catch (error) {
      console.error(error);
      return message.reply("❌ An error occurred while running the game. Please try again later.");
    }
  }
};

// Helper function to get alternate names for countries
function getAlternateNames(countryName) {
  const alternateNames = {
    "United States": ["usa", "america", "us", "united states of america"],
    "United Kingdom": ["uk", "britain", "great britain", "england"],
    "Russia": ["russian federation"],
    "China": ["people's republic of china", "prc"],
    "South Korea": ["korea"],
    "North Korea": ["dprk", "democratic people's republic of korea"],
    "Congo (Democratic Republic)": ["drc", "dr congo", "congo"],
    "Congo": ["republic of congo", "congo-brazzaville"],
    "Côte d'Ivoire": ["ivory coast", "cote d'ivoire", "cote divoire"],
    "Czech Republic": ["czechia", "czech"],
    "United Arab Emirates": ["uae", "emirates"],
    "Vatican City": ["holy see", "vatican"],
    "South Africa": ["rsa"],
    "Iran": ["persia", "islamic republic of iran"],
    "Syria": ["syrian arab republic"],
    "Venezuela": ["bolivarian republic of venezuela"],
    "Bolivia": ["plurinational state of bolivia"],
    "Tanzania": ["united republic of tanzania"],
    "Vietnam": ["viet nam"],
    "Myanmar": ["burma"],
    "Eswatini": ["swaziland"],
    "North Macedonia": ["macedonia"],
    // Add more as needed
  };
  
  return alternateNames[countryName] || [];
}

// Helper function to clean up temporary files
function cleanupTempFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Error cleaning up temp file:", error);
  }
}
