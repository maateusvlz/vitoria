confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
           // case "6/9": titulo = "06 de Setembro de 2017"; mensagem = "<p>Esse foi o dia que você foi me visitar no hospital</p><p>Foi bem rápido</p><p>E você estava nervosa, naquele momento queria tanto te dizer que eu queria passar o resto da aminha vida com você!</p>";break;
            case "8/9": titulo = "08 de Setembro de 2017"; mensagem = "<p>Foi o primeiro dia que gente revelou oque sentiamos um pelo outro.<br>Você estava nervosa pela manhã, me chamou pra conversamos, então eu fui, eu estava nervoso, sentamos na frente da sua casa e conversamos,</p><p>foi a melhor conversa da minha vida ❤️</p>";break;
            case "13/9": titulo = "13 de Setembro de 2017"; mensagem = "<p>Foi o dia que começamos a orar, foi um dos dias mais felizes da minha vida, iriamos passar 3 meses orando para saber oque no fundo ja sabiamos, pelo menos eu já sabia que </p><p> era você o amor da minha vida</p>";break;
            case "29/9": titulo = "29 de Setembro de 2017"; mensagem = "<p>Lembro que eu estava indo te deixar em casa depois da célula, nesse dia eu te beijei, estava com tanta vontade de te beijar, </p><p>Foi o Melhor Beijo de todos🤷</p>";break;
           // case "3/12": titulo = "03 de Dezembro de 2017"; mensagem = "<p>E🤣<br>Chegamos </p><p>Ness<small><del>eu pegava</del></small>.</p>";break;
          //  case "5/12": titulo = "05 de Dezembro de 2017"; mensagem = "<p>A minha ideia de nos vermos mais alguma vez na semana foi ótima!</p><p>Foi uma tarde sensacional com você. Sentamos nos banco da escola do Francisco e ficamos por ali até anoitecer, conversando, brincando e rindo. Me dá uma ansiedade muito grande em pensar que podemos fazer isso de novo tantas e tantas vezes ainda...</p>";break;
            case "13/12": titulo = "13 de Dezembro de 2017"; mensagem = "<p>Esse foi o melhor dia de nossas vidas, pelo menos da minha, nesse dia acordei bem cedinho para te fazer uma surpresa, era o dia que iriamos poder namorar, estava tão ansioso, te deixei esperando na praça enquanto eu enfeitava o seu quarto para te pedir em namoro, comprei um boque de flores para te dar, nesse dia foi uma onda por que josé atrasou e agente ficou esperando ele lá kkk mais foi o melhor dia da minha vida.</p>";break;
            case "24/12": titulo = "24 de Dezembro de 2017"; mensagem = "<p>Ai ai... o que dizer desse dia? Acho que foi tão intenso e sensacional, que reciprocamente eu nem precisaria escrever mais nada aqui, você saberia exatamente o momento único que tivemos juntos.</p><p> eu errei nesse dia com você, mais oque eu e você vivemos antes desse meu erro foi os melhores momentos da minha vida,  \"São os momentos mais simples que marcam nossa vida.\"</p>";break;
            //case "13/6": titulo = "13 de Junho de 2021"; mensagem = "<p>Acordar e ver você ali, certamente é uma das coisas que nunca vou esquecer na minha vida. São tantos momentos que eu consigo lembrar de todos em mínimos detalhes. Você saindo do banho toda perfumada; a gente assistindo Naruto juntos; nosso momento de intimidade de uma forma incrível; tomamos sorvete juntos; a viagem de volta a Guaíra enquanto eu segurava sua mão...</p><p>De fato, nunca esquecerei.</p>";break;
            case "2/9": titulo = "02 de Setembro de 2023"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>Este momento está sendo escrito agora...</strong></p></section>";break;
            case "final": titulo = "02 de Setembro de 2023"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}