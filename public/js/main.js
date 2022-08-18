var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function () {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();

  $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
  campo.on("input", () => {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    var qtdCaracteres = conteudo.length;

    $("#contador-palavras").text(qtdPalavras);
    $("#contador-caracteres").text(qtdCaracteres);
  });
}

function inicializaCronometro() {
  var tempoRestante = $("#tempo-digitacao").text();
  campo.one("focus", function () {
    $("#botao-reiniciar").attr("disabled", true);
    var cronometroID = setInterval(function () {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {       
        clearInterval(cronometroID);        
        $("#botao-reiniciar").attr("disabled", false);
        finalizaJogo();
      }
    }, 1000);
  });
}

function finalizaJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserePlacar();
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");
  campo.removeClass("campo-desativado");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();

  campo.removeClass("borda-vermelha"); //novo
  campo.removeClass("borda-verde");
}

function inicializaMarcadores() {
  var frase = $(".frase").text();
  campo.on("input", function () {
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);

    console.log(digitado);
    console.log(comparavel);

    if(digitado == comparavel){
      campo.removeClass("borda-vermelha");
      campo.addClass("borda-verde");
    } 
    else{
      campo.removeClass("borda-verde");
      campo.addClass("borda-vermelha");
    }
  });
}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Seu-nome"
  var numPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.append(linha);
}

function novaLinha(usuario, palavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone);

  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(event) {
  event.preventDefault();
  $(this).parent().parent().remove();
}