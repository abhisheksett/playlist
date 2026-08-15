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
    youtubeId: "x-qxMr_kHkU",
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
];
