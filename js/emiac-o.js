////////////////////////////////////
// variables y funciones globales //
////////////////////////////////////

var puntos = [];

var estadoRecta = false,
    estadoParabola = false,
    estadoExponencial = false,
    estadoPotencial = false,
    estadoHiperbola = false;

var board,
    f, 
    graficoRecta = null,
    graficoParabola = null,
    graficoExponencial = null,
    graficoPotencial = null,
    graficoHiperbola = null;

var tablaDiscreta, 
    filaTablaDiscreta,
    contador = 0;

var tablaRecta, 
    filaTablaRecta;

var tablaParabola, 
    filaTablaParabola;

var tablaExponencial, 
    filaTablaExponencial;

var tablaPotencial, 
    filaTablaPotencial;

var tablaHiperbola,
    filaTablaHiperbola;

var inlinePuntoX, 
    inlinePuntoY,
    inputPrecision;
    
var losX,
    losY;

var xPorYs,
    xCuadrados;

var xCuartas,
    xCubos,
    yPorXCuadrados;

var sumaXCuadrado,
    sumaXPorY,
    sumaX,
    sumaY,
    aRecta,
    bRecta,
    ysRayaRecta,
    diferenciasCuadradasRecta,
    sumaYRayaRecta,
    errorCuadraticoRecta;

var sumaXCuarta,
    sumaXCubo,
    sumaYPorXCuadrado,
    aParabola,
    bParabola,
    cParabola,
    ysRayaParabola,
    diferenciasCuadradasParabola,
    sumaYRayaParabola,
    errorCuadraticoParabola;
    
var xPorLnYs,
    lnYs,
    sumaXPorLnY,
    sumaLnY,
    bMayusculaExponencial,
    aExponencial,
    bExponencial,
    ysRayaExponencial,
    diferenciasCuadradasExponencial,
    sumaYRayaExponencial,
    errorCuadraticoExponencial;

var lnXCuadrados,
    lnXs,
    lnXPorLnYs,
    sumaLnXCuadrados,
    sumaLnX,
    sumaLnXPorLnY,
    bMayusculaPotencial,
    aPotencial,
    bPotencial,
    ysRayaPotencial,
    diferenciasCuadradasPotencial,
    sumaYRayaPotencial,
    errorCuadraticoPotencial;

var XPorUnoDivididoYs,
    unoDivididoYs,
    sumaXPorUnoDivididoY,
    sumaUnoDivididoY,
    bMayusculaHiperbola,
    aMayusculaHiperbola,
    aHiperbola,
    bHiperbola,
    ysRayaHiperbolas,
    diferenciasCuadradasHiperbola,
    sumaYRayaHiperbola,
    errorCuadraticoHiperbola;

var precision = function() { return inputPrecision.value || 0 }

var redondear = function(numero) {
  var re = new RegExp("(\\d+\\.\\d{" + precision() + "})(\\d)"),
    m = numero.toString().match(re);
  return m ? parseFloat(m[1]) : numero.valueOf();
};

var n = function() { return puntos.length; }
var x = function(punto) { return redondear(punto[0]); }
var y = function(punto) { return redondear(punto[1]); }
var xElevadoA = function(exponente) { return function(punto) { return redondear(Math.pow(x(punto), exponente)) } };
var xCuadrado = xElevadoA(2);
var xCubo = xElevadoA(3);
var xCuarta = xElevadoA(4);
var xPorY = function(punto) { return redondear(x(punto) * y(punto)); }
var xCuadradoPorY = function(punto) { return redondear(x(punto) * x(punto) * y(punto)); }
var lnY = function(punto) { return redondear(Math.log(y(punto))); }
var lnX = function(punto) { return redondear(Math.log(x(punto))); }
var lnXPorLnY = function(punto) { return redondear(lnX(punto) * lnY(punto)); }
var xPorLnY = function(punto) { return redondear(x(punto) * lnY(punto)); }
var unoDivididoY = function(punto) { return redondear(1/y(punto)); }
var lnXCuadrado = function(punto) { return redondear(Math.pow(lnX(punto), 2)); }
var XPorUnoDivididoY = function(punto) { return redondear(unoDivididoY(punto) * x(punto)); }

var yRayaRecta = function(x) { return redondear( (aRecta*x)+bRecta ); }
var yRayaParabola = function(x) { return redondear( (aParabola*Math.pow(x,2))+(bParabola*x)+cParabola ); }
var yRayaExponencial = function(x) { return redondear( bExponencial*Math.exp(aExponencial*x) ); }
var yRayaPotencial = function(x) { return redondear( bPotencial*Math.pow(x,aPotencial) ); }
var yRayaHiperbola = function(x) { return redondear( aHiperbola/(bHiperbola+x) ); }

var diferenciaCuadrada = function(punto, yRaya) { return redondear( Math.pow(yRaya(x(punto)) - y(punto), 2) ); }

var diferenciaCuadradaRecta = function(punto) { return redondear( Math.pow(yRayaRecta(x(punto)) - y(punto), 2) ); }
var diferenciaCuadradaParabola = function(punto) { return diferenciaCuadrada(punto, yRayaParabola); }
var diferenciaCuadradaExponencial = function(punto) { return diferenciaCuadrada(punto, yRayaExponencial); }
var diferenciaCuadradaPotencial = function(punto) { return diferenciaCuadrada(punto, yRayaPotencial); }
var diferenciaCuadradaHiperbola = function(punto) { return diferenciaCuadrada(punto, yRayaHiperbola); }

// Determinante de una matriz 3x3
var determinante = function(a) {
  return (
    (a[0][0] * a[1][1] * a[2][2]) +
    (a[0][1] * a[1][2] * a[2][0]) +
    (a[0][2] * a[1][0] * a[2][1]) -
    (a[0][2] * a[1][1] * a[2][0]) -
    (a[0][1] * a[1][0] * a[2][2]) -
    (a[0][0] * a[1][2] * a[2][1])
  )
}

// Recibe una matriz 3x4 y devuelve una 3x3 con las primeras 3 columnas
var d = function(a) {
  return [
    [ a[0][0], a[0][1], a[0][2] ],
    [ a[1][0], a[1][1], a[1][2] ],
    [ a[2][0], a[2][1], a[2][2] ]
  ]
}

// Recibe una matriz 3x4 y devuelve una 3x3 con la 4ta columna en lugar de la 1ra
var d1 = function(a) {
  return [
    [ a[0][3], a[0][1], a[0][2] ],
    [ a[1][3], a[1][1], a[1][2] ],
    [ a[2][3], a[2][1], a[2][2] ]
  ]
}

// Recibe una matriz 3x4 y devuelve una 3x3 con la 4ta columna en lugar de la 2da
var d2 = function(a) {
  return [
    [ a[0][0], a[0][3], a[0][2] ],
    [ a[1][0], a[1][3], a[1][2] ],
    [ a[2][0], a[2][3], a[2][2] ]
  ]
}

// Recibe una matriz 3x4 y devuelve una 3x3 con la 4ta columna en lugar de la 3ra
var d3 = function(a) {
  return [
    [ a[0][0], a[0][1], a[0][3] ],
    [ a[1][0], a[1][1], a[1][3] ],
    [ a[2][0], a[2][1], a[2][3] ]
  ]
}

function mejorAproximacion() {
  var datos = [errorCuadraticoRecta, errorCuadraticoParabola, errorCuadraticoExponencial, errorCuadraticoPotencial, errorCuadraticoHiperbola];
  var resultado = Math.min.apply(null, datos);
  var str;
  switch(resultado)
  {
    case errorCuadraticoRecta:
        str = "Mejor aproximación: Recta";
        break;
    case errorCuadraticoParabola:
        str = "Mejor aproximación: Parábola";
        break;
    case errorCuadraticoExponencial:
        str = "Mejor aproximación: Exponencial";
        break;
    case errorCuadraticoPotencial:
        str = "Mejor aproximación: Potencial";
        break;
    case errorCuadraticoHiperbola:
        str = "Mejor aproximación: Hiperbola";
        break;
    default:
        str = "Mejor aproximación: ninguna";
  }
  document.getElementById('resultado').innerHTML = str;
}

var nuevaFilaTablaDiscreta = function(punto) {
  var nuevaCelda = function(texto) {
    var celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }
  var fila = document.createElement('tr');
  fila.appendChild(nuevaCelda(x(punto)));
  fila.appendChild(nuevaCelda(y(punto)));
  return fila;
}

var nuevaFilaTablaRecta = function(punto) {
  var nuevaCelda = function(texto) {
    var celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }
  var fila = document.createElement('tr');
  fila.appendChild(nuevaCelda(n()));
  fila.appendChild(nuevaCelda(x(punto)));
  fila.appendChild(nuevaCelda(y(punto)));
  fila.appendChild(nuevaCelda(xCuadrado(punto)));
  fila.appendChild(nuevaCelda(xPorY(punto)));
  fila.appendChild(nuevaCelda(yRayaRecta(x(punto))));
  fila.appendChild(nuevaCelda(diferenciaCuadrada(punto, yRayaRecta)));
  return fila;
}

var nuevaFilaTablaParabola = function(punto) {
  var nuevaCelda = function(texto) {
    var celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }
  var fila = document.createElement('tr');
  fila.appendChild(nuevaCelda(n()));
  fila.appendChild(nuevaCelda(x(punto)));
  fila.appendChild(nuevaCelda(y(punto)));
  fila.appendChild(nuevaCelda(xCuadrado(punto)));
  fila.appendChild(nuevaCelda(xCubo(punto)));
  fila.appendChild(nuevaCelda(xCuarta(punto)));
  fila.appendChild(nuevaCelda(xPorY(punto)));
  fila.appendChild(nuevaCelda(xCuadradoPorY(punto)));
  fila.appendChild(nuevaCelda(yRayaParabola(x(punto))));
  fila.appendChild(nuevaCelda(diferenciaCuadrada(punto, yRayaParabola)));
  return fila;
}

var nuevaFilaTablaExponencial = function(punto) {
  var nuevaCelda = function(texto) {
    var celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }
  var fila = document.createElement('tr');
  fila.appendChild(nuevaCelda(n()));
  fila.appendChild(nuevaCelda(x(punto)));
  fila.appendChild(nuevaCelda(y(punto)));
  fila.appendChild(nuevaCelda(xCuadrado(punto)));
  fila.appendChild(nuevaCelda(lnY(punto)));
  fila.appendChild(nuevaCelda(xPorLnY(punto)));
  fila.appendChild(nuevaCelda(yRayaExponencial(x(punto))));
  fila.appendChild(nuevaCelda(diferenciaCuadrada(punto, yRayaExponencial)));
  return fila;
}

var nuevaFilaTablaPotencial = function(punto) {
  var nuevaCelda = function(texto) {
    var celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }
  var fila = document.createElement('tr');
  fila.appendChild(nuevaCelda(n()));
  fila.appendChild(nuevaCelda(x(punto)));
  fila.appendChild(nuevaCelda(y(punto)));
  fila.appendChild(nuevaCelda(lnX(punto)));
  fila.appendChild(nuevaCelda(lnXCuadrado(punto)));
  fila.appendChild(nuevaCelda(lnY(punto)));
  fila.appendChild(nuevaCelda(lnXPorLnY(punto)));
  fila.appendChild(nuevaCelda(yRayaPotencial(x(punto))));
  fila.appendChild(nuevaCelda(diferenciaCuadrada(punto, yRayaPotencial)));
  return fila;
}

var nuevaFilaTablaHiperbola = function(punto) { 
  var nuevaCelda = function(texto) {
    var celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }
  var fila = document.createElement('tr');
  fila.appendChild(nuevaCelda(n()));
  fila.appendChild(nuevaCelda(x(punto)));
  fila.appendChild(nuevaCelda(y(punto)));
  fila.appendChild(nuevaCelda(xCuadrado(punto)));
  fila.appendChild(nuevaCelda(unoDivididoY(punto)));
  fila.appendChild(nuevaCelda(XPorUnoDivididoY(punto)));
  fila.appendChild(nuevaCelda(yRayaHiperbola(x(punto))));
  fila.appendChild(nuevaCelda(diferenciaCuadrada(punto, yRayaHiperbola)));
  return fila;
}

var graficarPunto = function(punto) {
  board.create('point', [x(punto),y(punto)], {fixed: true});
}

var agregarPuntoTablas = function(punto) {
  ultimaFilaTablaRecta.parentElement.insertBefore(nuevaFilaTablaRecta(punto), ultimaFilaTablaRecta);
  ultimaFilaTablaParabola.parentElement.insertBefore(nuevaFilaTablaParabola(punto), ultimaFilaTablaParabola);
  ultimaFilaTablaExponencial.parentElement.insertBefore(nuevaFilaTablaExponencial(punto), ultimaFilaTablaExponencial);
  ultimaFilaTablaPotencial.parentElement.insertBefore(nuevaFilaTablaPotencial(punto), ultimaFilaTablaPotencial);
  ultimaFilaTablaHiperbola.parentElement.insertBefore(nuevaFilaTablaHiperbola(punto), ultimaFilaTablaHiperbola);
}

var agregarPuntoApretado = function() {
    if(inlinePuntoX.value != '' && inlinePuntoY.value != '' && inputPrecision.value != '') {
        var punto = [parseFloat(inlinePuntoX.value), parseFloat(inlinePuntoY.value)];
        puntos.push(punto);
        contador++;
        ultimaFilaTablaDiscreta.parentElement.insertBefore(nuevaFilaTablaDiscreta(punto), ultimaFilaTablaDiscreta);
        inlinePuntoX.value = '';
        inlinePuntoY.value = '';
    }
}

var quitarUltimoPunto = function() {
  if(contador > 0) {
    document.getElementById('tablaDiscreta').deleteRow(contador);
    puntos.pop();
    contador--;
  }
}

var procesarDatos = function() {
  
  document.getElementById('cositoX').style.display = 'none';
  document.getElementById('cositoY').style.display = 'none';
  document.getElementById('inlinePuntoX').style.display = 'none';
  document.getElementById('inlinePuntoY').style.display = 'none';
  document.getElementById('agregarPunto').style.display = 'none';
  document.getElementById('quitarPunto').style.display = 'none';;
  document.getElementById('procesarDatos').style.display = 'none';
  document.getElementById('reiniciarSistema').style.display = '';

  procesarCalculos(puntos);

  puntos.forEach(function(punto) {
    agregarPuntoTablas(punto);
    graficarPunto(punto);  
  });

  mejorAproximacion();
}

var reiniciarSistema = function() {
  location.reload();
}

var ecuacionLineal = function(componentes) {
  return ["\\begin{equation} \\begin{cases} &", componentes[0][0], componentes[0][1], " + ", componentes[0][2], componentes[0][3], " = ", componentes[0][4]," \\\\ ",
  "&", componentes[1][0], componentes[1][1], " + ", componentes[1][2], componentes[1][3], " = ", componentes[1][4], " \\end{cases} \\end{equation}"].join("")
}

var ecuacionCuadratica = function(componentes) {
  return ["\\begin{equation} \\begin{cases} &", componentes[0][0], componentes[0][1], " + ", componentes[0][2], componentes[0][3], "+", componentes[0][4], componentes[0][5], " = ", componentes[0][6]," \\\\ ",
  "&", componentes[1][0], componentes[1][1], " + ", componentes[1][2], componentes[1][3], "+", componentes[1][4], componentes[1][5], " = ", componentes[1][6]," \\\\ ",
  "&", componentes[2][0], componentes[2][1], " + ", componentes[2][2], componentes[2][3], "+", componentes[2][4], componentes[2][5], " = ", componentes[2][6], " \\end{cases} \\end{equation}"].join("")
}

var escribirSistemaDeEcuaciones = function(markupDeEcuaciones, id) {
  document.getElementById(id).textContent = markupDeEcuaciones;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

var funcionLineal = function(componentes) {
  return "`y = " + componentes[0] + "x + " + componentes[1] + "`";
}

var funcionCuadratica = function(componentes) {
  return "`y = " + componentes[0] + "x^2 + " + componentes[1] + "x + " + componentes[2]  + "`";
}

var funcionExponencial = function(componentes) {
  return "`y = " + componentes[1] + "e^(" + componentes[0] + "x)`";
}

var funcionPotencial = function(componentes) {
  return "`y = " + componentes[1] + "x^" + componentes[0] + "`";
}

var funcionHiperbola = function(componentes) {
  return "`y = " + componentes[0] + "/(" + componentes[1] + "+ x)`";
}

var escribirFuncion = function(markupDeEcuaciones, id) {
  document.getElementById(id).textContent = markupDeEcuaciones;
}

var graficarModelo = function(ecuacion, curva, color) {
    if(curva == null) {
        f = board.jc.snippet(ecuacion, true, 'x', true);
        return board.create('functiongraph',[f,
            function() {
                var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],board);
                return c.usrCoords[1];
            },
            function() {
                var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
                return c.usrCoords[1];
            }
        ], {name:ecuacion, withLabel:true, strokeColor: color});
    } else {
        curva.remove();
        return null;
    }
}

var mostrarModelo = function (estado, id) {
  etiquetaCorrespondiente = document.getElementById(id);
  if(estado) {
    etiquetaCorrespondiente.style.display = 'none';
    return false;
  }
  else {
    etiquetaCorrespondiente.style.display = '';
    return true;
  }
}

////////////////////////////
// PROCESADOR DE CALCULOS //
////////////////////////////

function procesarCalculos(puntos) {

    ////////////
    // listas //
    ////////////

    // uso general
    losX = _.map(puntos, x);
    losY = _.map(puntos, y);

    // uso de recta, parabola e hiperbola
    xPorYs = _.map(puntos, xPorY);
    xCuadrados = _.map(puntos, xElevadoA(2));

    // solo parabolas
    xCuartas = _.map(puntos, xElevadoA(4));
    xCubos = _.map(puntos, xElevadoA(3));

    // solo exponenciales y potencial
    xPorLnYs = redondear(_.map(puntos, xPorLnY));
    lnYs = redondear(_.map(puntos, lnY));

    // solo potencial
    lnXCuadrados = _.map(puntos, lnXCuadrado);
    lnXs = _.map(puntos, lnX);
    lnXPorLnYs = _.map(puntos, lnXPorLnY);

    // solo hiperbola
    XPorUnoDivididoYs = _.map(puntos, XPorUnoDivididoY);
    unoDivididoYs = _.map(puntos, unoDivididoY);

    //////////////////////
    // metodo por recta //
    //////////////////////

    sumaX = redondear(_.sum(losX));
    sumaY = redondear(_.sum(losY));
    sumaXPorY = redondear(_.sum(xPorYs));
    sumaXCuadrado = redondear(_.sum(xCuadrados));

    bRecta = redondear((sumaXPorY - (sumaXCuadrado * sumaY / sumaX)) / (- (sumaXCuadrado * n() / sumaX) + sumaX));
    aRecta = redondear((sumaY - (n() * bRecta)) / sumaX);

    ysRayaRecta = _.map(losX, yRayaRecta);
    diferenciasCuadradasRecta = _.map(puntos, diferenciaCuadradaRecta);
    sumaYRayaRecta = redondear(_.sum(ysRayaRecta));
    errorCuadraticoRecta = redondear(_.sum(diferenciasCuadradasRecta));

    escribirFuncion(funcionLineal([aRecta, bRecta]), 'funcionRecta');

    escribirSistemaDeEcuaciones(
        ecuacionLineal([
            [sumaXCuadrado, 'a', sumaX, 'b', sumaXPorY], 
            [sumaX, 'a', n(), 'b', sumaY]
        ]),
        'sistemaRecta'
    );

    /////////////////////////
    // metodo por parabola //
    /////////////////////////

    sumaXCuarta = _.sum(xCuartas);
    sumaXCubo = _.sum(xCubos);
    sumaYPorXCuadrado = _.sum(yPorXCuadrados);

    var coeficientes = [
        [ sumaXCuarta, sumaXCubo, sumaXCuadrado, sumaYPorXCuadrado ],
        [ sumaXCubo, sumaXCuadrado, sumaX, sumaXPorY ],
        [ sumaXCuadrado, sumaX, n(), sumaY ]
    ];

    aParabola = redondear(determinante(d1(coeficientes)) / determinante(d(coeficientes)));
    bParabola = redondear(determinante(d2(coeficientes)) / determinante(d(coeficientes)));
    cParabola = redondear(determinante(d3(coeficientes)) / determinante(d(coeficientes)));

    yPorXCuadrados = _.map(puntos, xCuadradoPorY);
    diferenciasCuadradasParabola = _.map(puntos, diferenciaCuadradaParabola);
    sumaYRayaParabola = redondear(_.sum(ysRayaParabola));
    errorCuadraticoParabola = redondear(_.sum(diferenciasCuadradasParabola));

    escribirFuncion(funcionCuadratica([aParabola, bParabola, cParabola]), 'funcionParabola');
    
    escribirSistemaDeEcuaciones(
        ecuacionCuadratica([
            [sumaXCuarta, 'a', sumaXCubo, 'b', sumaXCuadrado, 'c', sumaYPorXCuadrado], 
            [sumaXCubo, 'a', sumaXCuadrado, 'b', sumaX, 'c', sumaXPorY],
            [sumaXCuadrado, 'a', sumaX, 'b', n(), 'c', sumaY]
        ]),
        'sistemaParabola'
    );
    
    ////////////////////////////
    // metodo por exponencial //
    ////////////////////////////

    sumaXPorLnY = redondear(_.sum(xPorLnYs));
    sumaLnY = redondear(_.sum(lnYs));

    bMayusculaExponencial = redondear((sumaXPorLnY - (sumaXCuadrado * sumaLnY / sumaX)) / (- (sumaXCuadrado * n() / sumaX) + sumaX));
    aExponencial = redondear((sumaLnY - (n() * bMayusculaExponencial)) / sumaX);
    bExponencial = redondear(Math.exp(bMayusculaExponencial));

    ysRayaExponencial = _.map(losX, yRayaExponencial);
    diferenciasCuadradasExponencial = _.map(puntos, diferenciaCuadradaExponencial);
    sumaYRayaExponencial = redondear(_.sum(ysRayaExponencial));
    errorCuadraticoExponencial = redondear(_.sum(diferenciasCuadradasExponencial));

    escribirFuncion(funcionExponencial([aExponencial, bExponencial]), 'funcionExponencial');
    
    escribirSistemaDeEcuaciones(
      ecuacionLineal([
        [sumaXCuadrado, 'a', sumaX, 'b', sumaXPorLnY], 
        [sumaX, 'a', n(), 'b', sumaLnY]
      ]),
      'sistemaExponencial'
    );
    
    //////////////////////////
    // metodo por potencial //
    //////////////////////////

    sumaLnXCuadrados = redondear(_.sum(lnXCuadrados));
    sumaLnX = redondear(_.sum(lnXs));
    sumaLnXPorLnY = redondear(_.sum(lnXPorLnYs));

    bMayusculaPotencial = redondear((sumaLnXPorLnY - (sumaLnXCuadrados * sumaLnY / sumaLnX)) / (- (sumaLnXCuadrados * n() / sumaLnX) + sumaLnX));
    aPotencial = redondear((sumaLnY - (n() * bMayusculaPotencial)) / sumaLnX);
    bPotencial = redondear(Math.exp(bMayusculaPotencial));

    ysRayaPotencial = _.map(losX, yRayaPotencial);
    diferenciasCuadradasPotencial = _.map(puntos, diferenciaCuadradaPotencial);
    sumaYRayaPotencial = redondear(_.sum(ysRayaPotencial));
    errorCuadraticoPotencial = redondear(_.sum(diferenciasCuadradasPotencial));

    escribirFuncion(funcionPotencial([aPotencial, bPotencial]), 'funcionPotencial');
  
    escribirSistemaDeEcuaciones(
      ecuacionLineal([
        [sumaLnXCuadrados, 'a', sumaLnX, 'b', sumaLnXPorLnY], 
        [sumaLnX, 'a', n(), 'b', sumaLnY]
      ]),
      'sistemaPotencial'
    );
    
    //////////////////////////
    // metodo por hiperbola //
    //////////////////////////

    sumaXPorUnoDivididoY = redondear(_.sum(XPorUnoDivididoYs));
    sumaUnoDivididoY = redondear(_.sum(unoDivididoYs));

    bMayusculaHiperbola = (sumaXPorUnoDivididoY - (sumaXCuadrado * sumaUnoDivididoY / sumaX)) / (-(sumaXCuadrado * n()) / sumaX + sumaX) ;
    aMayusculaHiperbola = (sumaUnoDivididoY - (n() * bMayusculaHiperbola)) / sumaX;
    aHiperbola = redondear(1/aMayusculaHiperbola);
    bHiperbola = redondear(bMayusculaHiperbola * aHiperbola);

    ysRayaHiperbola = _.map(losX, yRayaHiperbola);
    diferenciasCuadradasHiperbola = _.map(puntos, diferenciaCuadradaHiperbola);
    sumaYRayaHiperbola = redondear(_.sum(ysRayaHiperbolas));
    errorCuadraticoHiperbola = redondear(_.sum(diferenciasCuadradasHiperbola));

    escribirFuncion(funcionHiperbola([aHiperbola, bHiperbola]), 'funcionHiperbola');
    
    escribirSistemaDeEcuaciones(
      ecuacionLineal([
        [sumaXCuadrado, 'a', sumaX, 'b', sumaXPorUnoDivididoY], 
        [sumaX, 'a', n(), 'b', sumaUnoDivididoY]
      ]),
      'sistemaHiperbola'
    );
}

//////////////////////////
// EJECUCION DEL MODELO //
//////////////////////////

var aproximarLineal = function() {
    var ecuacion = "(" + aRecta + " * x) + " + bRecta;
    graficoRecta = graficarModelo(ecuacion, graficoRecta, 'black');
    estadoRecta = mostrarModelo(estadoRecta, 'divTablaRecta');
}

var aproximarCuadratico = function() {
    var ecuacion = "(" + aParabola + " * x^2) + (" + bParabola + " * x) + " + cParabola;
    graficoParabola = graficarModelo(ecuacion, graficoParabola, 'green');
    estadoParabola = mostrarModelo(estadoParabola, 'divTablaParabola');
}

var aproximarExponencial = function() {
    var ecuacion = bExponencial  + " * " + Math.E + "^(" + aExponencial + " * x)";
    graficoExponencial = graficarModelo(ecuacion, graficoExponencial, 'blue');
    estadoExponencial = mostrarModelo(estadoExponencial, 'divTablaExponencial');
}

var aproximarPotencial = function() {
    var ecuacion = bPotencial  + " * x^" + aPotencial;
    graficoPotencial = graficarModelo(ecuacion, graficoPotencial, 'purple');
    estadoPotencial = mostrarModelo(estadoPotencial, 'divTablaPotencial');
}

var aproximarHiperbola = function() {
    var ecuacion = aHiperbola + "/" + "(" + bHiperbola +" + x)";
    graficoHiperbola = graficarModelo(ecuacion, graficoHiperbola, 'gray');
    estadoHiperbola = mostrarModelo(estadoHiperbola, 'divTablaHiperbola');
}

/////////////
// Eventos //
/////////////

window.addEventListener("load", function() {
	board = JXG.JSXGraph.initBoard('grafico', {boundingbox:[-5,8,8,-5], axis:true});

	var botonAgregarPunto = document.getElementById('agregarPunto');
	botonAgregarPunto.addEventListener('click', agregarPuntoApretado);

	var botonQuitarPunto = document.getElementById('quitarPunto');
	botonQuitarPunto.addEventListener('click', quitarUltimoPunto);

	var botonProcesarDatos = document.getElementById('procesarDatos');
	botonProcesarDatos.addEventListener('click', procesarDatos);

	var botonReiniciarSistema = document.getElementById('reiniciarSistema');
	botonReiniciarSistema.addEventListener('click', reiniciarSistema);

	tablaDiscreta = document.getElementById('tablaDiscreta');
	ultimaFilaTablaDiscreta = document.getElementById('filaTablaDiscreta');

	tablaRecta = document.getElementById('tablaRecta');
	ultimaFilaTablaRecta = document.getElementById('filaTablaRecta');

	tablaParabola = document.getElementById('tablaParabola');
	ultimaFilaTablaParabola = document.getElementById('filaTablaParabola');

	tablaExponencial = document.getElementById('tablaExponencial');
	ultimaFilaTablaExponencial = document.getElementById('filaTablaExponencial');
    
  tablaPotencial = document.getElementById('tablaPotencial');
  ultimaFilaTablaPotencial = document.getElementById('filaTablaPotencial');

  tablaHiperbola = document.getElementById('tablaHiperbola');
  ultimaFilaTablaHiperbola = document.getElementById('filaTablaHiperbola');

	inlinePuntoX = document.getElementById('inlinePuntoX');
	inlinePuntoY = document.getElementById('inlinePuntoY');

	inputPrecision = document.getElementById('precision');

	document.getElementById('botonAproximarLineal').addEventListener('click', aproximarLineal);
	document.getElementById('botonAproximarCuadrado').addEventListener('click', aproximarCuadratico);
	document.getElementById('botonAproximarExponencial').addEventListener('click', aproximarExponencial);
	document.getElementById('botonAproximarPotencial').addEventListener('click', aproximarPotencial);
	document.getElementById('botonAproximarHiperbola').addEventListener('click', aproximarHiperbola);
});