const mostrartema=(evento) => {
    const trocatema=evento.target
    console.log(trocatema)
 }
document.getElementById("tema").addEventListener('click',mostrartema)
