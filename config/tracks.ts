// The Old Monk playlist. Add or remove tracks here — nothing else needs to change.
//
// `youtubeId` is the only required field for playback (it's fed straight into
// the hidden YouTube player). Everything else is display metadata.
// `cover` is optional — when omitted, the YouTube thumbnail for `youtubeId` is used.

export type Track = {
  youtubeId: string;
  title: string;
  artist: string;
  album?: string;
  cover?: string;
};

export const tracks: Track[] = [
  {
    youtubeId: "Q_cq8__k--M",
    title: "Barsaat Ke Mausam Mein",
    artist: "Kumar Sanu, Roop Kumar Rathod",
    album: "Naajayaz",
  },
  {
    youtubeId: "A9mB9tEFkfA",
    title: "Log Kehte Hain Main Sharabi Hoon",
    artist: "Kishore Kumar",
    album: "Sharabi",
  },
  {
    youtubeId: "nYXmSpgphpM",
    title: "Intehaa ho gai intezaar ki",
    artist: "Kishor Kumar, Asha Bhosle",
    album: "Sharabi",
  },
  {
    youtubeId: "_D7lzzD8l6M",
    title: "So Gaya Yeh Jahan",
    artist: "Nitin Mukesh, Shabbir Kumar, Alka Yagnik",
    album: "Tezaab",
  },
  {
    youtubeId: "N0jnLZxYwYc",
    title: "Mujhse Mohabbat Ka Izhaar Karta",
    artist: "Udit Narayan, Alka Yagnik",
    album: "Hum Hain Rahi Pyar Ke",
  },
  {
    youtubeId: "3NWMK2MRqIk",
    title: "Tumsa Koi Pyaara",
    artist: "Kumar Sanu, Alka Yagnik",
    album: "Khuddar",
  },
  {
    youtubeId: "bga_0ziOOfQ",
    title: "Woh Meri Neend Mera Chain",
    artist: "Sadhana Sargam",
    album: "Hum Hain Rahi Pyar Ke",
  },
  {
    youtubeId: "oFxbBeYhLqM",
    title: "Saaton Janam Main Tere",
    artist: "Kumar Sanu, Alka Yagnik",
    album: "Dilwale",
  },
  {
    youtubeId: "CTuvMubzXpU",
    title: "Jeeta Tha Jiske Liye",
    artist: "Kumar Sanu, Alka Yagnik",
    album: "Dilwale",
  },
  {
    youtubeId: "i1IsLVz6T9Q",
    title: "Dard Karaara",
    artist: "Kumar Sanu, Sadhana Sargam",
    album: "Dum Laga Ke Haisha",
  },
  {
    youtubeId: "5y_TCKNzAMI",
    title: "Tumse Milne Ko Dil Karta Hai",
    artist: "Alka Yagnik, Kumar Sanu",
    album: "Phool Aur Kaante",
  },
  {
    youtubeId: "fBylcT-TWZw",
    title: "Ek Sanam Chahiye",
    artist: "Kumar Sanu",
    album: "Aashiqui",
  },
  {
    youtubeId: "CTNgz5gb3D8",
    title: "Tu Pyar Hai Kisi Aur Ka",
    artist: "Anuradha Paudwal, Kumar Sanu",
    album: "Dil Hai Ke Manta Nahin",
  },
  {
    youtubeId: "lFdSi01tpYM",
    title: "Sochenge Tumhe Pyar",
    artist: "Kumar Sanu",
    album: "Deewana",
  },
  {
    youtubeId: "dDR4oiyjUBA",
    title: "Raah Mein Unse Mulaqat",
    artist: "Kumar Sanu, Alka Yagnik",
    album: "Vijaypath",
  },
  {
    youtubeId: "otQmzlm-s7Q",
    title: "Main Duniya Bhula Doonga",
    artist: "Anuradha Paudwal, Kumar Sanu",
    album: "Aashiqui",
  },
  {
    youtubeId: "tPNwGuu_rQ4",
    title: "Tumhein Apna Banane Ki Kasam",
    artist: "Anuradha Paudwal, Kumar Sanu",
    album: "Sadak",
  },
  {
    youtubeId: "1eSG6dLiYxY",
    title: "Chura Ke Dil Mera",
    artist: "Kumar Sanu, Alka Yagnik",
    album: "Main Khiladi Tu Anari",
  },
  {
    youtubeId: "FsNc7I33w60",
    title: "Mera Dil Bhi Kitna Pagal Hai",
    artist: "Kumar Sanu, Alka Yagnik",
    album: "Saajan",
  },
  {
    youtubeId: "H5sheEWfsOQ",
    title: "Ek Ladki Ko Dekha Toh Aisa Laga",
    artist: "Kumar Sanu",
    album: "1942: A Love Story",
  },
  {
    youtubeId: "ZYotlBxpM3Q",
    title: "Pehla Nasha",
    artist: "Udit Narayan, Sadhana Sargam",
    album: "Jo Jeeta Wohi Sikandar",
  },
  {
    youtubeId: "Gc8dqXVjfgg",
    title: "Tujhe Dekha To Yeh Jaana Sanam",
    artist: "Lata Mangeshkar, Kumar Sanu",
    album: "Dilwale Dulhania Le Jayenge",
  },
  {
    youtubeId: "acluPXcAsa0",
    title: "Yeh Kaali Kaali Aankhen",
    artist: "Kumar Sanu, Anu Malik",
    album: "Baazigar",
  },
  {
    youtubeId: "Xuq6a29AVxM",
    title: "Baazigar O Baazigar",
    artist: "Kumar Sanu, Alka Yagnik",
    album: "Baazigar",
  },
  {
    youtubeId: "mFNNKeunEeY",
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    artist: "Asha Bhosle, Mohammed Rafi",
    album: "Yaadon Ki Baaraat",
  },
  {
    youtubeId: "W6dKaCV-mJQ",
    title: "Kya Hua Tera Wada",
    artist: "Mohammed Rafi",
    album: "Hum Kisise Kum Naheen",
  },
  {
    youtubeId: "Lw7RQj6SE4Q",
    title: "Aane Wala Pal",
    artist: "Kishore Kumar",
    album: "Gol Maal",
  },
  {
    youtubeId: "JQoSSJDZxOo",
    title: "Rimjhim Gire Saawan",
    artist: "Kishore Kumar",
    album: "Manzil",
  },
  {
    youtubeId: "3IY-8rcC2Fk",
    title: "O Saathi Re",
    artist: "Kishore Kumar",
    album: "Muqaddar Ka Sikandar",
  },
  {
    youtubeId: "Ypyekxaj3gw",
    title: "Yeh Shaam Mastani",
    artist: "Kishore Kumar",
    album: "Kati Patang",
  },
  {
    youtubeId: "3OfIccV3AIg",
    title: "Tere Mere Milan Ki Yeh Raina",
    artist: "Lata Mangeshkar, Kishore Kumar",
    album: "Abhimaan",
  },
  {
    youtubeId: "efx6wVOWELI",
    title: "Mere Naina Sawan Bhadon",
    artist: "Kishore Kumar",
    album: "Mehbooba",
  },
  {
    youtubeId: "Mcs2xEZ6K8o",
    title: "Dheere Dheere Se Meri Zindagi Mein Aana",
    artist: "Kumar Sanu, Anuradha Paudwal",
    album: "Aashiqui",
  },
  {
    youtubeId: "Drfqwqkm4ho",
    title: "Dil Deewana Bin Sajna Ke",
    artist: "Lata Mangeshkar, S.P. Balasubrahmanyam",
    album: "Maine Pyar Kiya",
  },
  {
    youtubeId: "otSbGQIYgpQ",
    title: "Tere Bina Zindagi Se",
    artist: "Kishore Kumar, Lata Mangeshkar",
    album: "Aandhi",
  },
  {
    youtubeId: "sPiOMuvzSI8",
    title: "Gum Hai Kisi Ke Pyar Mein",
    artist: "Kishore Kumar, Lata Mangeshkar",
    album: "Rampur Ka Lakshman",
  },
  {
    youtubeId: "q6OnRBuM788",
    title: "Kahin Deep Jale Kahin Dil",
    artist: "Lata Mangeshkar",
    album: "Bees Saal Baad",
  },
  {
    youtubeId: "u0u7QznNFFI",
    title: "Woh Sham Kuch Ajeeb Thi",
    artist: "Kishore Kumar",
    album: "Khamoshi",
  },
  {
    youtubeId: "bqbf-QiP_2U",
    title: "Zindagi Pyar Ka Geet Hai",
    artist: "Kishore Kumar",
    album: "Souten",
  },
  {
    youtubeId: "6UiwXthbtZs",
    title: "Chandi Jaisa Rang Hai Tera",
    artist: "Pankaj Udhas",
    album: "Ek Hi Maqsad",
  },
];
