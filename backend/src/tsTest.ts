


// function that gets array of sales and returns array in ascending order
const ascendingOrder = async () => {

    const hardCodedArray = ['1 Gameboy Advance SP Kuoret 10 € tänään 03:13 Päijät-Häme Myydään', '1 GBA Phantasy Star Collection peli Nintendo GameBoy 69 € eilen 21:04 Pirkanmaa Myydään', '1 Konsoleita, pelejä, ohjaimia, laatikoita, ohjeita eilen 17:04 Lappi Ostetaan', '3 Gameboy Micro 120 € eilen 16:55 Satakunta Myydään', '1 Mr. Driller 2 (GBA) 40 € eilen 14:25 Uusimaa Myydään', '1 Moto Racer Advance (GBA) 40 € eilen 14:21 Uusimaa Myydään', '1 Doom (GBA) 45 € eilen 13:41 Uusimaa Myydään', '1 Drill Dozer (GBA) 100 € eilen 13:37 Uusimaa Myydään', '1 Advance Guardian Heroes (GBA) 40 € eilen 13:27 Uusimaa Myydään', '2 Retro color Gameboy-konsoli iPhone 6 25 € eilen 12:56 Uusimaa Myydään', '6 Gameboy 108 in one pelikasetti gba gba sp 25 € eilen 10:58 Uusimaa Myydään', '3 Gameboy Pocket 40 € eilen 10:47 Uusimaa Myydään', '5 Gameboy advance IPS 3.0 Final Fantasy tactics 249 € 14 elo 22:06 Kanta-Häme Myydään', '1 Double dragon 15 € 14 elo 15:22 Uusimaa Myydään', '1 Dynablaster 15 € 14 elo 15:18 Uusimaa Myydään', '1 W&W fortress of fear 15 € 14 elo 15:16 Uusimaa Myydään', '1 Probotector 35 € 14 elo 15:14 Uusimaa Myydään', '1 Talespin 35 € 14 elo 15:11 Uusimaa Myydään', '5 Gameboy color ja 2 Pokémon peliä 170 € 14 elo 13:58 Kymenlaakso Myydään', '4 Gameboy Color punainen 60 € 14 elo 08:46 Uusimaa Myydään', '6 Ps1 pelit + nintendo ja ps2 pelejä 13 elo 23:35 Pirkanmaa Myydään', '2 Gameboy Advance 60 € 13 elo 16:21 Kainuu Myydään', '2 Gameboy Color, violetti 60 € 13 elo 16:19 Kainuu Myydään', '1 Pelikonsoli - Retro Freak 125 € 12 elo 20:19 Pirkanmaa Myydään', '2 alkuperäinen gameboy+4 peliä+ohjekirjat+kantolaukk 12 elo 17:07 Pohjois-Pohjanmaa Myydään', '4 Gameboy micro sininen 120 € 12 elo 14:26 Pirkanmaa Myydään', '3 Pokemon emerald 95 € 11 elo 14:14 Pirkanmaa Myydään', '1 Gameboy color + extra kuoret 50 € 11 elo 12:33 Pirkanmaa Myydään', '1 Gameboy simpsons peli 25 € 11 elo 09:31 Pirkanmaa Myydään', '6 Pokemon Sapphire CIB [USA], Gameboy Advance SP 345 € 10 elo 22:00 Etelä-Karjala Myydään', '1 Gameboy micro machines 20 € 10 elo 19:44 Pirkanmaa Myydään', '2 Pocahontas GameBoy 8 € 10 elo 15:24 Uusimaa Myydään', '1 Viimeiset GBA/GBC CIB/Boxed pelit 2 112 € 10 elo 15:17 Uusimaa Myydään', '2 Gameboy castlevania 2 belmonths revenge 60 € 10 elo 14:58 Pirkanmaa Myydään', '4 Gameboy color paketti 100 € 10 elo 14:57 Pirkanmaa Myydään', '1 Nintendo Game boy batman cib 90 € 10 elo 08:17 Päijät-Häme Myydään', '2 Gameboy Advance 60 € 9 elo 22:27 Etelä-Pohjanmaa Myydään', '1 Perfect Dark cib gameboy color 40 € 9 elo 21:19 Etelä-Pohjanmaa Myydään', '3 GameBoy Advance SP AGS-001 Näyttö 15 € 9 elo 16:18 Uusimaa Myydään', '2 O.stetaan Pelit ja Pelikonsolit 9 elo 12:02 Kanta-Häme Ostetaan']
  
    let count = 0
    let saleObject = {
      sale: String,
      price: Number
    }
  
    let arrayOfSaleObjects = []
  
    // loop through and take price and make and object
    while ( count < hardCodedArray.length) {
  
      const sale =  hardCodedArray[count].split(' ')
  
      // for loop to find €
      for (let i = 0; i < sale.length; i++) {

        console.log(sale[i].includes('€') === true)
        if (sale[i].includes('€')) {
          console.log(sale[i])
        }
      }
  
  
  
    }
  
  }

















