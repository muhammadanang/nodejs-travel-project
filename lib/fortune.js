const fortunes = [
    "Ada sama dimakan, tak ada sama ditahan",
    "Bersatu kita teguh, bercerai kita runtuh",
    "Cepat kaki ringan tangan",
    "Dimana bumi dipijak, disana langit dijunjung",
    "Fajar menyingsing elang menyongsong",
    "Jauh berjalan banyak dilihat",
    "Jauh di mata, dekat di hati"
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortunes.length)
    return fortunes[idx]
}