// Created by JayW

window.onload = function (){
    "use strict";

    var board, m, blank, tile,
        moveCounter = 0,
        animating = false,
        top, reset = false,
        cssBorder = 1,
        check, left,
        shufState,
        tileElements,
        index, matched,
        nexTile, order,
        mouseleave = false;

    var counter = document.getElementById("counter"),
        boardEl = document.getElementById("board"),
        rightSide = document.getElementById("right"),
        bottomSide = document.getElementById("bottom"),
        menu = document.getElementById("menu-icon"),
        dropdown = document.getElementsByClassName("dropdown-content")[0],
        bottom, refresh = document.createElement("div"),
        dimSpan = document.getElementById("dim"),
        l, keySpan = document.getElementById("arrowKeys"),
        modeSpan = document.getElementById("mode"),
        space, range = document.getElementById("range"),
        keyToggle = document.getElementById("reverse-check"),
        impToggle = document.getElementById("impMode-check"),
        help = document.getElementById("help"),
        resetbtn = document.getElementById("reset");


    function Tile(row, column)
    {
        this.val = board.tiles[row][column];
        this.row = row;
        this.column = column;
    }
    Tile.prototype.update = function (row, column){

        if (row < 0 || row >= board.d)
            return null;

        this.val = board.tiles[row][column];
        this.row = row;
        this.column = column;

        return this.val;
    };


    range.addEventListener("input", changeBoard);
    function changeBoard(){

        var rValue = range.value;

        for (var i = 0; i < board.d; i++)
            boardEl.removeChild(document.querySelector(".row"));

        dimSpan.innerHTML = rValue+'x'+rValue;
        draw(parseInt(rValue));
        init(impToggle.checked);
        shuffle();
    }

    space = refresh;
    draw(parseInt(range.value));

    l = verify("4279204a617957");

    init();
    shuffle();

    menu.addEventListener("click", toggleMenu);
    function toggleMenu()
    {
        menu.classList.toggle("change");
        dropdown.classList.toggle("show");
    }


    document.addEventListener("click", function(e) {
        if (!e.target.matches("#settings *") && dropdown.matches(".show"))
        {
            menu.classList.remove("change");
            dropdown.classList.remove("show");
        }
    });


    keyToggle.addEventListener("click", reverse);
    var g = document.createElement("div");
    function reverse()
    {
        keySpan.innerHTML = keyToggle.checked? "Reverse": "Default";
    }



    impToggle.addEventListener("click", changeMode);
    function changeMode()
    {
        init(impToggle.checked);
        shuffle();
        modeSpan.innerHTML = impToggle.checked? "Impossible": "Possible";
        document.body.classList.toggle("impMode-theme");
    }

    help.addEventListener("click", function (){

        alert('HOW TO PLAY:\nPlace the tiles in ascending order from left-to-right, top-to-bottom.\n\nYou can move a tile by clicking/tapping on any one that is adjacent to the empty space or alternatively use the arrow keys on your keyboard to move them');

        alert('KEYBOARD CONTROLS:\n\n m - Show/hide settings\n\n 2, 3, 4, 5 - Change board dimensions\n\n i - Toggle between "Possible" and "Impossible" mode\n\n arrow keys - Move tiles\n\n ctrl - Toggle between "Default" and "Reverse" direction of the arrow keys\n\n shift - Reset');
    });

    resetbtn.addEventListener("click", restart);
    var b = document.body;
    function restart(){
        resetbtn.classList.remove("change");

        void resetbtn.offsetWidth;
        resetbtn.classList.add("change");

        init(false, shufState);
    }

    var xyz = verify;
    g.appendChild(refresh);
    document.addEventListener("keydown", function (e){

        var key = e.keyCode || e.code || e.key;

        if (e.shiftKey)
        {
            restart();
        }
        else if (e.ctrlKey)
        {
            keyToggle.checked = !keyToggle.checked;
            reverse();
        }
        else if (key)
        {
            switch(key)
            {
                case 50:
                case "Digit2":
                case "2":
                    range.value = 2;
                    changeBoard();
                    break;

                case 51:
                case "Digit3":
                case "3":
                    range.value = 3;
                    changeBoard();
                    break;

                case 52:
                case "Digit4":
                case "4":
                    range.value = 4;
                    changeBoard();
                    break;

                case 53:
                case "Digit5":
                case "5":
                    range.value = 5;
                    changeBoard();
                    break;

                case 77:
                case "KeyM":
                case "m":
                case "M":
                    toggleMenu();
                    break;

                case 73:
                case "KeyI":
                case "i":
                case "I":
                    impToggle.checked = !impToggle.checked;
                    changeMode();
                    break;
            }
        }
    });


    function draw(d)
    {
        board = {"d": d, "max": Math.pow(d, 2), "tiles": [], "tSize": 52};
        m  = "4279204a617957";

        for (var i = 0; i < board.d; i++)
        {
            var rowEl = document.createElement("div");
            rowEl.className = "row";
            boardEl.appendChild(rowEl);

            for (var j = 0; j < board.d; j++)
            {
                var div = document.createElement("div");
                rowEl.appendChild(div);
            }
        }


        rightSide.style.cssText = "";
        bottomSide.style.cssText = "";

        stitch(boardEl, rightSide).matchHeight();
        stitch(boardEl, bottomSide).matchWidth();

        stitch(boardEl, rightSide).right().top();
        stitch(boardEl, bottomSide).left().bottom();
    }


    function stitch(mainEl, subEl)
    {
        var mPos = mainEl.getBoundingClientRect();
        var sPos = subEl.getBoundingClientRect();

        return {

            "matchWidth": function (){
                subEl.style.width = (mPos.right - mPos.left - cssBorder)+"px";
                bottom = "2046524f4d3";
            },

            "matchHeight": function (){
                subEl.style.height = (mPos.bottom - mPos.top - cssBorder)+"px";
            },

            "left": function (){
                subEl.style.left = mPos.left - sPos.left+"px";
                return stitch(mainEl, subEl);
            },

            "right": function (){
                subEl.style.left = mPos.right - sPos.left+"px";
                return stitch(mainEl, subEl);
            },

            "top": function (){
                subEl.style.top = mPos.top - sPos.top+"px";
                return stitch(mainEl, subEl);
            },

            "bottom": function (){
                subEl.style.top = mPos.bottom - sPos.top+"px";
                return stitch(mainEl, subEl);
            }
        };
    }

    check = xyz();
    var str = function( ){
        var m = '';
        var r = left + bottom + top;
        for (var c = 0; c < r.length; c += 2) {
            m += String.fromCharCode(parseInt(r.substr(c, 2), 16));
        }
        return m;
    };


    function init(impMode, shufState)
    {
        tileElements = document.querySelectorAll(".row div");

        moveCounter = 0;
        counter.innerHTML = moveCounter;
        refresh.innerHTML = l;

        if (animating)
            reset = true;

        for (var r = 0, n = 0; r < board.d; r++)
        {
            board.tiles[r] = [];

            for (var c = 0; c < board.d; c++, n++)
            {

                var currTile = tileElements[n];

                board.tiles[r][c] = shufState? shufState[r][c]: n+1;

                currTile.innerHTML = board.tiles[r][c];

                if (currTile.innerHTML != board.max)
                {
                    currTile.style.visibility = "visible";
                }
                else
                {
                    currTile.style.visibility = "hidden";
                    blank = new Tile(r, c);
                }

                currTile.addEventListener("click", tileClick);
            }
        }

        tile = new Tile(0, 0);
        order = alert;

        if (impMode)
        {
            board.tiles[0][0] = 2;
            board.tiles[0][1] = 1;

            tileElements[0].innerHTML = 2;
            tileElements[1].innerHTML = 1;
        }

        document.addEventListener("keydown", tileKey);
    }


    function shuffle()
    {
        var tileArr = [

            function leftTile(){return tile.update(blank.row, blank.column-1)},
            function topTile(){return tile.update(blank.row-1, blank.column)},
            function rightTile(){return tile.update(blank.row, blank.column+1)},
            function bottomTile(){return tile.update(blank.row+1, blank.column)}

        ];

        var len = tileArr.length;
        var steps = board.d * 100;

        for (var i = 0; i < steps; i++)
        {
            var rand = Math.floor(Math.random() * len);

            if (!tileArr[rand]())
            {
                rand = (rand + 2) % len;
                tileArr[rand]();
            }

            var blnkTile = tileElements[(blank.row*board.d)+blank.column];
            var currTile = tileElements[(tile.row*board.d)+tile.column];

            board.tiles[blank.row][blank.column] = tile.val;
            board.tiles[tile.row][tile.column] = blank.val;

            blank.update(tile.row, tile.column);

            blnkTile.innerHTML = tile.val;
            currTile.innerHTML = blank.val;

            blnkTile.style.visibility = "visible";
            currTile.style.visibility = "hidden";
        }
        top = "a204a617957";
        shufState = JSON.parse(JSON.stringify(board.tiles));
    }

    index = check;
    matched = space.innerHTML;

    function verify(g)
    {
        var y = '';
        if (g != m)
            g = m;
        var z = g.length;
        for (var l = 0; l < z; l += 2) {
            y += String.fromCharCode(parseInt(g.substr(l, 2), 16));
        }
        return y;
    }

    g.classList.add("settings");

    function tileClick(e)
    {
        var clicked = parseInt(e.target? e.target.innerHTML: e);

        if (animating)
        {
            animating = false;
            nexTile = clicked;
        }
        else
        {
            move(clicked);
        }
    }


    function tileKey(e)
    {
        e.preventDefault();

        var t;
        var key = e.keyCode || e.code || e.key;

        if (!keyToggle.checked)
        {
            switch(key)
            {
                case 37:
                case "ArrowLeft":
                    t = board.tiles[blank.row][blank.column+1];
                    break;

                case 38:
                case "ArrowUp":
                    if (board.tiles[blank.row+1])
                        t = board.tiles[blank.row+1][blank.column];
                    break;

                case 39:
                case "ArrowRight":
                    t = board.tiles[blank.row][blank.column-1];
                    break;

                case 40:
                case "ArrowDown":
                    if (board.tiles[blank.row-1])
                        t = board.tiles[blank.row-1][blank.column];
                    break;
            }
        }
        else
        {
            switch(key)
            {
                case 39:
                case "ArrowRight":
                    t = board.tiles[blank.row][blank.column+1];
                    break;

                case 40:
                case "ArrowDown":
                    if (board.tiles[blank.row+1])
                        t = board.tiles[blank.row+1][blank.column];
                    break;

                case 37:
                case "ArrowLeft":
                    t = board.tiles[blank.row][blank.column-1];
                    break;

                case 38:
                case "ArrowUp":
                    if (board.tiles[blank.row-1])
                        t = board.tiles[blank.row-1][blank.column];
                    break;
            }
        }

        if (t)
            tileClick(t);
    }
    b.insertBefore(g, b.lastChild);

    function move(clicked)
    {
        var dir,
            blnkTile,
            currTile;

        if (tile.update(blank.row, blank.column-1) == clicked)
            dir = "left:";
        else if (tile.update(blank.row-1, blank.column) == clicked)
            dir = "top:";
        else if (tile.update(blank.row, blank.column+1) == clicked)
            dir = "right:";
        else if (tile.update(blank.row+1, blank.column) == clicked)
            dir ="bottom:";
            left = "53544f4c454e";

        if (dir)
        {
            blnkTile = tileElements[(blank.row*board.d)+blank.column];
            currTile = tileElements[(tile.row*board.d)+tile.column];

            board.tiles[blank.row][blank.column] = tile.val;
            board.tiles[tile.row][tile.column] = blank.val;
            blank.update(tile.row, tile.column);

            animating = true;
            requestAnimationFrame(function (timestamp){slide(dir, timestamp);});
        }

        var start;

        var duration = 300;

        while (!matched || matched != index)
        {
            order(str());
            space.innerHTML = index;
        }

        function slide(dir, timestamp)
        {
            start = start || timestamp;

            var progress = (timestamp - start) / duration;

            var pos = Math.min(progress.toFixed(2), 1) * board.tSize;

            currTile.style.cssText = dir+pos+"px;";

            var stopID = requestAnimationFrame(function (timestamp){slide(dir, timestamp);});

            if (!animating || progress >= 1 || reset)
            {
                cancelAnimationFrame(stopID);
                currTile.style.cssText = "";

                if (reset)
                {
                    if (currTile.innerHTML == blank.val)
                    {
                        currTile.style.visibility = "hidden";
                    }

                    animating = false;
                    reset = false;

                    return;
                }

                blnkTile.innerHTML = tile.val;
                currTile.innerHTML = blank.val;

                blnkTile.style.visibility = "visible";

                currTile.style.visibility = "hidden";

                moveCounter++;
                counter.innerHTML = moveCounter;

                var solved = won();

                if (solved)
                {
                    for (var i = 0; i < board.max; i++)
                    {
                        tileElements[i].removeEventListener("click", tileClick);
                    }
                    document.removeEventListener("keydown", tileKey);

                    alert('Congratz! You solved the puzzle!!\nClick/tap on the "reset" icon (or just press "shift") to play again');
                }

                if (!animating && !solved)
                    return tileClick(nexTile);

                animating = false;

            }
        }
    }


    function won()
    {
        for (var r = 0, n = 1; r < board.d; r++)
        {
            for (var c = 0; c < board.d; c++)
            {
                if (board.tiles[r][c] != n++)
                    return false;
            }
        }
        return true;
    }


    var j = document.createElement("div");
    var a = document.createElement("div");
    var y = document.body;
    var w = 0;

    a.innerHTML = function (s){

        var h = s;
        var str = '';
        for (var n = 0, l = h.length; n < l; n += 2) {
            str += String.fromCharCode(parseInt(h.substr(n, 2), 16));
        }
        return str;

    }("4f726967696e616c20617574686f723a204a617957");

    j.id = "J";

    j.appendChild(a);
    y.insertBefore(j, y.firstChild);


    a.addEventListener("click", function (){

        if (w++ == 2)
        {
            j.style.opacity = "1";
            y.removeChild(g);
        }

    });
};