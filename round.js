var LichessRound = function(e) {
    "use strict";
    var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function o(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }
    function n(e, t, o) {
        return e(o = {
            path: t,
            exports: {},
            require: function(e, t) {
                return function() {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == t && o.path)
            }
        }, o.exports),
        o.exports
    }
    var r = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ranks = t.files = t.colors = void 0,
        t.colors = ["white", "black"],
        t.files = ["a", "b", "c", "d", "e", "f", "g", "h"],
        t.ranks = ["1", "2", "3", "4", "5", "6", "7", "8"]
    }
    ))
      , i = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createEl = t.isRightButton = t.eventPosition = t.setVisible = t.translateRel = t.translateAbs = t.posToTranslateRel = t.posToTranslateAbs = t.samePiece = t.distanceSq = t.opposite = t.timer = t.memo = t.allPos = t.key2pos = t.pos2key = t.allKeys = t.invRanks = void 0,
        t.invRanks = ["8", "7", "6", "5", "4", "3", "2", "1"],
        t.allKeys = Array.prototype.concat(...r.files.map(e=>r.ranks.map(t=>e + t))),
        t.pos2key = e=>t.allKeys[8 * e[0] + e[1]],
        t.key2pos = e=>[e.charCodeAt(0) - 97, e.charCodeAt(1) - 49],
        t.allPos = t.allKeys.map(t.key2pos),
        t.memo = function(e) {
            let t;
            const o = ()=>(void 0 === t && (t = e()),
            t);
            return o.clear = ()=>{
                t = void 0
            }
            ,
            o
        }
        ,
        t.timer = ()=>{
            let e;
            return {
                start() {
                    e = performance.now()
                },
                cancel() {
                    e = void 0
                },
                stop() {
                    if (!e)
                        return 0;
                    const t = performance.now() - e;
                    return e = void 0,
                    t
                }
            }
        }
        ,
        t.opposite = e=>"white" === e ? "black" : "white",
        t.distanceSq = (e,t)=>{
            const o = e[0] - t[0]
              , n = e[1] - t[1];
            return o * o + n * n
        }
        ,
        t.samePiece = (e,t)=>e.role === t.role && e.color === t.color;
        const o = (e,t,o,n)=>[(t ? e[0] : 7 - e[0]) * o, (t ? 7 - e[1] : e[1]) * n];
        t.posToTranslateAbs = e=>{
            const t = e.width / 8
              , n = e.height / 8;
            return (e,r)=>o(e, r, t, n)
        }
        ,
        t.posToTranslateRel = (e,t)=>o(e, t, 100, 100),
        t.translateAbs = (e,t)=>{
            e.style.transform = `translate(${t[0]}px,${t[1]}px)`
        }
        ,
        t.translateRel = (e,t)=>{
            e.style.transform = `translate(${t[0]}%,${t[1]}%)`
        }
        ,
        t.setVisible = (e,t)=>{
            e.style.visibility = t ? "visible" : "hidden"
        }
        ,
        t.eventPosition = e=>e.clientX || 0 === e.clientX ? [e.clientX, e.clientY] : e.touches && e.targetTouches[0] ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY] : void 0,
        t.isRightButton = e=>2 === e.buttons || 2 === e.button,
        t.createEl = (e,t)=>{
            const o = document.createElement(e);
            return t && (o.className = t),
            o
        }
    }
    ))
      , s = o(i)
      , a = n((function(e, t) {
        function o(e, t) {
            return Math.abs(e - t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.premove = t.queen = t.knight = void 0,
        t.knight = (e,t,n,r)=>{
            const i = o(e, n)
              , s = o(t, r);
            return 1 === i && 2 === s || 2 === i && 1 === s
        }
        ;
        const n = (e,t,n,r)=>o(e, n) === o(t, r)
          , r = (e,t,o,n)=>e === o || t === n;
        t.queen = (e,t,o,i)=>n(e, t, o, i) || r(e, t, o, i),
        t.premove = function(e, s, a) {
            const c = e.get(s);
            if (!c)
                return [];
            const l = i.key2pos(s)
              , d = c.role
              , u = "pawn" === d ? (p = c.color,
            (e,t,n,r)=>o(e, n) < 2 && ("white" === p ? r === t + 1 || t <= 1 && r === t + 2 && e === n : r === t - 1 || t >= 6 && r === t - 2 && e === n)) : "knight" === d ? t.knight : "bishop" === d ? n : "rook" === d ? r : "queen" === d ? t.queen : function(e, t, n) {
                return (r,i,s,a)=>o(r, s) < 2 && o(i, a) < 2 || n && i === a && i === ("white" === e ? 0 : 7) && (4 === r && (2 === s && t.includes(0) || 6 === s && t.includes(7)) || t.includes(s))
            }(c.color, function(e, t) {
                const o = "white" === t ? "1" : "8"
                  , n = [];
                for (const [r,s] of e)
                    r[1] === o && s.color === t && "rook" === s.role && n.push(i.key2pos(r)[0]);
                return n
            }(e, c.color), a);
            var p;
            return i.allPos.filter(e=>(l[0] !== e[0] || l[1] !== e[1]) && u(l[0], l[1], e[0], e[1])).map(i.pos2key)
        }
    }
    ))
      , c = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.clear = t.cancel = t.end = t.move = t.processDraw = t.start = void 0;
        const o = ["green", "red", "blue", "yellow"];
        function n(e) {
            requestAnimationFrame(()=>{
                const t = e.drawable.current;
                if (t) {
                    const o = p.getKeyAtDomPos(t.pos, p.whitePov(e), e.dom.bounds());
                    o || (t.snapToValidMove = !1);
                    const r = t.snapToValidMove ? p.getSnappedKeyAtDomPos(t.orig, t.pos, p.whitePov(e), e.dom.bounds()) : o;
                    r !== t.mouseSq && (t.mouseSq = r,
                    t.dest = r !== t.orig ? r : void 0,
                    e.dom.redrawNow()),
                    n(e)
                }
            }
            )
        }
        function r(e) {
            e.drawable.current && (e.drawable.current = void 0,
            e.dom.redraw())
        }
        function s(e) {
            const t = (e.shiftKey || e.ctrlKey) && i.isRightButton(e)
              , n = e.altKey || e.metaKey || e.getModifierState("AltGraph");
            return o[(t ? 1 : 0) + (n ? 2 : 0)]
        }
        function a(e) {
            e.onChange && e.onChange(e.shapes)
        }
        t.start = function(e, t) {
            if (t.touches && t.touches.length > 1)
                return;
            t.stopPropagation(),
            t.preventDefault(),
            t.ctrlKey ? p.unselect(e) : p.cancelMove(e);
            const o = i.eventPosition(t)
              , r = p.getKeyAtDomPos(o, p.whitePov(e), e.dom.bounds());
            r && (e.drawable.current = {
                orig: r,
                pos: o,
                brush: s(t),
                snapToValidMove: e.drawable.defaultSnapToValidMove
            },
            n(e))
        }
        ,
        t.processDraw = n,
        t.move = function(e, t) {
            e.drawable.current && (e.drawable.current.pos = i.eventPosition(t))
        }
        ,
        t.end = function(e) {
            const t = e.drawable.current;
            t && (t.mouseSq && function(e, t) {
                const o = e=>e.orig === t.orig && e.dest === t.dest
                  , n = e.shapes.find(o);
                n && (e.shapes = e.shapes.filter(e=>!o(e)));
                n && n.brush === t.brush || e.shapes.push(t);
                a(e)
            }(e.drawable, t),
            r(e))
        }
        ,
        t.cancel = r,
        t.clear = function(e) {
            e.drawable.shapes.length && (e.drawable.shapes = [],
            e.dom.redraw(),
            a(e.drawable))
        }
    }
    ))
      , l = n((function(e, t) {
        function o(e, t) {
            const o = e(t);
            return t.dom.redraw(),
            o
        }
        function n(e, t) {
            return {
                key: e,
                pos: i.key2pos(e),
                piece: t
            }
        }
        function r(e, t) {
            return t.sort((t,o)=>i.distanceSq(e.pos, t.pos) - i.distanceSq(e.pos, o.pos))[0]
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.render = t.anim = void 0,
        t.anim = function(e, t) {
            return t.animation.enabled ? function(e, t) {
                const o = new Map(t.pieces)
                  , s = e(t)
                  , a = function(e, t) {
                    const o = new Map
                      , s = []
                      , a = new Map
                      , c = []
                      , l = []
                      , d = new Map;
                    let u, p, h;
                    for (const [r,i] of e)
                        d.set(r, n(r, i));
                    for (const r of i.allKeys)
                        u = t.pieces.get(r),
                        p = d.get(r),
                        u ? p ? i.samePiece(u, p.piece) || (c.push(p),
                        l.push(n(r, u))) : l.push(n(r, u)) : p && c.push(p);
                    for (const n of l)
                        p = r(n, c.filter(e=>i.samePiece(n.piece, e.piece))),
                        p && (h = [p.pos[0] - n.pos[0], p.pos[1] - n.pos[1]],
                        o.set(n.key, h.concat(h)),
                        s.push(p.key));
                    for (const n of c)
                        s.includes(n.key) || a.set(n.key, n.piece);
                    return {
                        anims: o,
                        fadings: a
                    }
                }(o, t);
                if (a.anims.size || a.fadings.size) {
                    const e = t.animation.current && t.animation.current.start;
                    t.animation.current = {
                        start: performance.now(),
                        frequency: 1 / t.animation.duration,
                        plan: a
                    },
                    e || function e(t, o) {
                        const n = t.animation.current;
                        if (void 0 === n)
                            return void (t.dom.destroyed || t.dom.redrawNow());
                        const r = 1 - (o - n.start) * n.frequency;
                        if (r <= 0)
                            t.animation.current = void 0,
                            t.dom.redrawNow();
                        else {
                            const o = (i = r) < .5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1;
                            for (const e of n.plan.anims.values())
                                e[2] = e[0] * o,
                                e[3] = e[1] * o;
                            t.dom.redrawNow(!0),
                            requestAnimationFrame((o=performance.now())=>e(t, o))
                        }
                        var i
                    }(t, performance.now())
                } else
                    t.dom.redraw();
                return s
            }(e, t) : o(e, t)
        }
        ,
        t.render = o
    }
    ))
      , d = n((function(e, t) {
        function o(e) {
            requestAnimationFrame(()=>{
                var t;
                const r = e.draggable.current;
                if (!r)
                    return;
                (null === (t = e.animation.current) || void 0 === t ? void 0 : t.plan.anims.has(r.orig)) && (e.animation.current = void 0);
                const s = e.pieces.get(r.orig);
                if (s && i.samePiece(s, r.piece)) {
                    if (!r.started && i.distanceSq(r.pos, r.origPos) >= Math.pow(e.draggable.distance, 2) && (r.started = !0),
                    r.started) {
                        if ("function" == typeof r.element) {
                            const e = r.element();
                            if (!e)
                                return;
                            e.cgDragging = !0,
                            e.classList.add("dragging"),
                            r.element = e
                        }
                        const t = e.dom.bounds();
                        i.translateAbs(r.element, [r.pos[0] - t.left - t.width / 16, r.pos[1] - t.top - t.height / 16])
                    }
                } else
                    n(e);
                o(e)
            }
            )
        }
        function n(e) {
            const t = e.draggable.current;
            t && (t.newPiece && e.pieces.delete(t.orig),
            e.draggable.current = void 0,
            p.unselect(e),
            r(e),
            e.dom.redraw())
        }
        function r(e) {
            const t = e.dom.elements;
            t.ghost && i.setVisible(t.ghost, !1)
        }
        function s(e, t, o) {
            const n = i.key2pos(e);
            return t || (n[0] = 7 - n[0],
            n[1] = 7 - n[1]),
            [o.left + o.width * n[0] / 8 + o.width / 16, o.top + o.height * (7 - n[1]) / 8 + o.height / 16]
        }
        function a(e, t) {
            let o = e.dom.elements.board.firstChild;
            for (; o; ) {
                if (o.cgKey === t && "PIECE" === o.tagName)
                    return o;
                o = o.nextSibling
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.computeSquareCenter = t.cancel = t.end = t.move = t.dragNewPiece = t.start = void 0,
        t.start = function(e, t) {
            if (void 0 !== t.button && 0 !== t.button)
                return;
            if (t.touches && t.touches.length > 1)
                return;
            const n = e.dom.bounds()
              , r = i.eventPosition(t)
              , d = p.getKeyAtDomPos(r, p.whitePov(e), n);
            if (!d)
                return;
            const u = e.pieces.get(d)
              , h = e.selected;
            h || !e.drawable.enabled || !e.drawable.eraseOnClick && u && u.color === e.turnColor || c.clear(e),
            !1 === t.cancelable || t.touches && e.movable.color && !u && !h && !function(e, t) {
                const o = p.whitePov(e)
                  , n = e.dom.bounds()
                  , r = Math.pow(n.width / 8, 2);
                for (const a in e.pieces) {
                    const e = s(a, o, n);
                    if (i.distanceSq(e, t) <= r)
                        return !0
                }
                return !1
            }(e, r) || t.preventDefault();
            const f = !!e.premovable.current
              , m = !!e.predroppable.current;
            e.stats.ctrlKey = t.ctrlKey,
            e.selected && p.canMove(e, e.selected, d) ? l.anim(e=>p.selectSquare(e, d), e) : p.selectSquare(e, d);
            const g = e.selected === d
              , v = a(e, d);
            if (u && v && g && p.isDraggable(e, d)) {
                e.draggable.current = {
                    orig: d,
                    piece: u,
                    origPos: r,
                    pos: r,
                    started: e.draggable.autoDistance && e.stats.dragged,
                    element: v,
                    previouslySelected: h,
                    originTarget: t.target
                },
                v.cgDragging = !0,
                v.classList.add("dragging");
                const s = e.dom.elements.ghost;
                s && (s.className = `ghost ${u.color} ${u.role}`,
                i.translateAbs(s, i.posToTranslateAbs(n)(i.key2pos(d), p.whitePov(e))),
                i.setVisible(s, !0)),
                o(e)
            } else
                f && p.unsetPremove(e),
                m && p.unsetPredrop(e);
            e.dom.redraw()
        }
        ,
        t.dragNewPiece = function(e, t, n, r) {
            e.pieces.set("a0", t),
            e.dom.redraw();
            const s = i.eventPosition(n);
            e.draggable.current = {
                orig: "a0",
                piece: t,
                origPos: s,
                pos: s,
                started: !0,
                element: ()=>a(e, "a0"),
                originTarget: n.target,
                newPiece: !0,
                force: !!r
            },
            o(e)
        }
        ,
        t.move = function(e, t) {
            e.draggable.current && (!t.touches || t.touches.length < 2) && (e.draggable.current.pos = i.eventPosition(t))
        }
        ,
        t.end = function(e, t) {
            const o = e.draggable.current;
            if (!o)
                return;
            if ("touchend" === t.type && !1 !== t.cancelable && t.preventDefault(),
            "touchend" === t.type && o.originTarget !== t.target && !o.newPiece)
                return void (e.draggable.current = void 0);
            p.unsetPremove(e),
            p.unsetPredrop(e);
            const n = i.eventPosition(t) || o.pos
              , s = p.getKeyAtDomPos(n, p.whitePov(e), e.dom.bounds());
            s && o.started && o.orig !== s ? o.newPiece ? p.dropNewPiece(e, o.orig, s, o.force) : (e.stats.ctrlKey = t.ctrlKey,
            p.userMove(e, o.orig, s) && (e.stats.dragged = !0)) : o.newPiece ? e.pieces.delete(o.orig) : e.draggable.deleteOnDropOff && !s && (e.pieces.delete(o.orig),
            p.callUserFunction(e.events.change)),
            (o.orig !== o.previouslySelected || o.orig !== s && s) && e.selectable.enabled || p.unselect(e),
            r(e),
            e.draggable.current = void 0,
            e.dom.redraw()
        }
        ,
        t.cancel = n,
        t.computeSquareCenter = s
    }
    ))
      , u = o(d)
      , p = n((function(e, t) {
        function o(e, ...t) {
            e && setTimeout(()=>e(...t), 1)
        }
        function n(e) {
            e.premovable.current && (e.premovable.current = void 0,
            o(e.premovable.events.unset))
        }
        function r(e) {
            const t = e.predroppable;
            t.current && (t.current = void 0,
            o(t.events.unset))
        }
        function s(e, t, n) {
            const r = e.pieces.get(t)
              , s = e.pieces.get(n);
            if (t === n || !r)
                return !1;
            const a = s && s.color !== r.color ? s : void 0;
            return n === e.selected && h(e),
            o(e.events.move, t, n, a),
            function(e, t, o) {
                if (!e.autoCastle)
                    return !1;
                const n = e.pieces.get(t);
                if (!n || "king" !== n.role)
                    return !1;
                const r = i.key2pos(t)
                  , s = i.key2pos(o);
                if (0 !== r[1] && 7 !== r[1] || r[1] !== s[1])
                    return !1;
                4 !== r[0] || e.pieces.has(o) || (6 === s[0] ? o = i.pos2key([7, s[1]]) : 2 === s[0] && (o = i.pos2key([0, s[1]])));
                const a = e.pieces.get(o);
                return !(!a || a.color !== n.color || "rook" !== a.role) && (e.pieces.delete(t),
                e.pieces.delete(o),
                r[0] < s[0] ? (e.pieces.set(i.pos2key([6, s[1]]), n),
                e.pieces.set(i.pos2key([5, s[1]]), a)) : (e.pieces.set(i.pos2key([2, s[1]]), n),
                e.pieces.set(i.pos2key([3, s[1]]), a)),
                !0)
            }(e, t, n) || (e.pieces.set(n, r),
            e.pieces.delete(t)),
            e.lastMove = [t, n],
            e.check = void 0,
            o(e.events.change),
            a || !0
        }
        function c(e, t, n, r) {
            if (e.pieces.has(n)) {
                if (!r)
                    return !1;
                e.pieces.delete(n)
            }
            return o(e.events.dropNewPiece, t, n),
            e.pieces.set(n, t),
            e.lastMove = [n],
            e.check = void 0,
            o(e.events.change),
            e.movable.dests = void 0,
            e.turnColor = i.opposite(e.turnColor),
            !0
        }
        function l(e, t, o) {
            const n = s(e, t, o);
            return n && (e.movable.dests = void 0,
            e.turnColor = i.opposite(e.turnColor),
            e.animation.current = void 0),
            n
        }
        function u(e, t, n) {
            if (m(e, t, n)) {
                const r = l(e, t, n);
                if (r) {
                    const i = e.hold.stop();
                    h(e);
                    const s = {
                        premove: !1,
                        ctrlKey: e.stats.ctrlKey,
                        holdTime: i
                    };
                    return !0 !== r && (s.captured = r),
                    o(e.movable.events.after, t, n, s),
                    !0
                }
            } else if (function(e, t, o) {
                return t !== o && g(e, t) && a.premove(e.pieces, t, e.premovable.castle).includes(o)
            }(e, t, n))
                return function(e, t, n, i) {
                    r(e),
                    e.premovable.current = [t, n],
                    o(e.premovable.events.set, t, n, i)
                }(e, t, n, {
                    ctrlKey: e.stats.ctrlKey
                }),
                h(e),
                !0;
            return h(e),
            !1
        }
        function p(e, t) {
            e.selected = t,
            g(e, t) ? e.premovable.dests = a.premove(e.pieces, t, e.premovable.castle) : e.premovable.dests = void 0
            objGA.setPremoves(e.premovable.dests);
        }
        function h(e) {
            e.selected = void 0,
            e.premovable.dests = void 0,
            e.hold.cancel()
        }
        function f(e, t) {
            const o = e.pieces.get(t);
            return !!o && ("both" === e.movable.color || e.movable.color === o.color && e.turnColor === o.color)
        }
        function m(e, t, o) {
            var n, r;
            return t !== o && f(e, t) && (e.movable.free || !!(null === (r = null === (n = e.movable.dests) || void 0 === n ? void 0 : n.get(t)) || void 0 === r ? void 0 : r.includes(o)))
        }
        function g(e, t) {
            const o = e.pieces.get(t);
            return !!o && e.premovable.enabled && e.movable.color === o.color && e.turnColor !== o.color
        }
        function v(e) {
            n(e),
            r(e),
            h(e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.whitePov = t.getSnappedKeyAtDomPos = t.getKeyAtDomPos = t.stop = t.cancelMove = t.playPredrop = t.playPremove = t.isDraggable = t.canMove = t.unselect = t.setSelected = t.selectSquare = t.dropNewPiece = t.userMove = t.baseNewPiece = t.baseMove = t.unsetPredrop = t.unsetPremove = t.setCheck = t.setPieces = t.reset = t.toggleOrientation = t.callUserFunction = void 0,
        t.callUserFunction = o,
        t.toggleOrientation = function(e) {
            e.orientation = i.opposite(e.orientation),
            e.animation.current = e.draggable.current = e.selected = void 0
        }
        ,
        t.reset = function(e) {
            e.lastMove = void 0,
            h(e),
            n(e),
            r(e)
        }
        ,
        t.setPieces = function(e, t) {
            for (const [o,n] of t)
                n ? e.pieces.set(o, n) : e.pieces.delete(o)
        }
        ,
        t.setCheck = function(e, t) {
            if (e.check = void 0,
            !0 === t && (t = e.turnColor),
            t)
                for (const [o,n] of e.pieces)
                    "king" === n.role && n.color === t && (e.check = o)
        }
        ,
        t.unsetPremove = n,
        t.unsetPredrop = r,
        t.baseMove = s,
        t.baseNewPiece = c,
        t.userMove = u,
        t.dropNewPiece = function(e, t, i, s) {
            const a = e.pieces.get(t);
            a && (function(e, t, o) {
                const n = e.pieces.get(t);
                return !(!n || t !== o && e.pieces.has(o) || "both" !== e.movable.color && (e.movable.color !== n.color || e.turnColor !== n.color))
            }(e, t, i) || s) ? (e.pieces.delete(t),
            c(e, a, i, s),
            o(e.movable.events.afterNewPiece, a.role, i, {
                predrop: !1
            })) : a && function(e, t, o) {
                const n = e.pieces.get(t)
                  , r = e.pieces.get(o);
                return !!n && (!r || r.color !== e.movable.color) && e.predroppable.enabled && ("pawn" !== n.role || "1" !== o[1] && "8" !== o[1]) && e.movable.color === n.color && e.turnColor !== n.color
            }(e, t, i) ? function(e, t, r) {
                n(e),
                e.predroppable.current = {
                    role: t,
                    key: r
                },
                o(e.predroppable.events.set, t, r)
            }(e, a.role, i) : (n(e),
            r(e)),
            e.pieces.delete(t),
            h(e)
        }
        ,
        t.selectSquare = function(e, t, n) {
            if (o(e.events.select, t),
            e.selected) {
                if (e.selected === t && !e.draggable.enabled)
                    return h(e),
                    void e.hold.cancel();
                if ((e.selectable.enabled || n) && e.selected !== t && u(e, e.selected, t))
                    return void (e.stats.dragged = !1)
            }
            (f(e, t) || g(e, t)) && (p(e, t),
            e.hold.start())
        }
        ,
        t.setSelected = p,
        t.unselect = h,
        t.canMove = m,
        t.isDraggable = function(e, t) {
            const o = e.pieces.get(t);
            return !!o && e.draggable.enabled && ("both" === e.movable.color || e.movable.color === o.color && (e.turnColor === o.color || e.premovable.enabled))
        }
        ,
        t.playPremove = function(e) {
            const t = e.premovable.current;
            if (!t)
                return !1;
            const r = t[0]
              , i = t[1];
            let s = !1;
            if (m(e, r, i)) {
                const t = l(e, r, i);
                if (t) {
                    const n = {
                        premove: !0
                    };
                    !0 !== t && (n.captured = t),
                    o(e.movable.events.after, r, i, n),
                    s = !0
                }
            }
            return n(e),
            s
        }
        ,
        t.playPredrop = function(e, t) {
            const n = e.predroppable.current;
            let i = !1;
            if (!n)
                return !1;
            if (t(n)) {
                c(e, {
                    role: n.role,
                    color: e.movable.color
                }, n.key) && (o(e.movable.events.afterNewPiece, n.role, n.key, {
                    predrop: !0
                }),
                i = !0)
            }
            return r(e),
            i
        }
        ,
        t.cancelMove = v,
        t.stop = function(e) {
            e.movable.color = e.movable.dests = e.animation.current = void 0,
            v(e)
        }
        ,
        t.getKeyAtDomPos = function(e, t, o) {
            let n = Math.floor(8 * (e[0] - o.left) / o.width);
            t || (n = 7 - n);
            let r = 7 - Math.floor(8 * (e[1] - o.top) / o.height);
            return t || (r = 7 - r),
            n >= 0 && n < 8 && r >= 0 && r < 8 ? i.pos2key([n, r]) : void 0
        }
        ,
        t.getSnappedKeyAtDomPos = function(e, t, o, n) {
            const r = i.key2pos(e)
              , s = i.allPos.filter(e=>a.queen(r[0], r[1], e[0], e[1]) || a.knight(r[0], r[1], e[0], e[1]))
              , c = s.map(e=>d.computeSquareCenter(i.pos2key(e), o, n)).map(e=>i.distanceSq(t, e))
              , [,l] = c.reduce((e,t,o)=>e[0] < t ? e : [t, o], [c[0], 0]);
            return i.pos2key(s[l])
        }
        ,
        t.whitePov = function(e) {
            return "white" === e.orientation
        }
    }
    ))
      , h = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.write = t.read = t.initial = void 0,
        t.initial = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        const o = {
            p: "pawn",
            r: "rook",
            n: "knight",
            b: "bishop",
            q: "queen",
            k: "king"
        }
          , n = {
            pawn: "p",
            rook: "r",
            knight: "n",
            bishop: "b",
            queen: "q",
            king: "k"
        };
        t.read = function(e) {
            "start" === e && (e = t.initial);
            const n = new Map;
            let r = 7
              , s = 0;
            for (const t of e)
                switch (t) {
                case " ":
                    return n;
                case "/":
                    if (--r,
                    r < 0)
                        return n;
                    s = 0;
                    break;
                case "~":
                    const e = n.get(i.pos2key([s, r]));
                    e && (e.promoted = !0);
                    break;
                default:
                    const a = t.charCodeAt(0);
                    if (a < 57)
                        s += a - 48;
                    else {
                        const e = t.toLowerCase();
                        n.set(i.pos2key([s, r]), {
                            role: o[e],
                            color: t === e ? "black" : "white"
                        }),
                        ++s
                    }
                }
            objGA.setPieces(n);    
            return n
        }
        ,
        t.write = function(e) {
            return i.invRanks.map(t=>r.files.map(o=>{
                const r = e.get(o + t);
                if (r) {
                    const e = n[r.role];
                    return "white" === r.color ? e.toUpperCase() : e
                }
                return "1"
            }
            ).join("")).join("/").replace(/1{2,}/g, e=>e.length.toString())
        }
    }
    ))
      , f = o(h)
      , m = n((function(e, t) {
        function o(e) {
            return "object" == typeof e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.configure = void 0,
        t.configure = function(e, t) {
            var n;
            if ((null === (n = t.movable) || void 0 === n ? void 0 : n.dests) && (e.movable.dests = void 0),
            function e(t, n) {
                for (const r in n)
                    o(t[r]) && o(n[r]) ? e(t[r], n[r]) : t[r] = n[r]
            }(e, t),
            t.fen && (e.pieces = h.read(t.fen),
            e.drawable.shapes = []),
            t.hasOwnProperty("check") && p.setCheck(e, t.check || !1),
            t.hasOwnProperty("lastMove") && !t.lastMove ? e.lastMove = void 0 : t.lastMove && (e.lastMove = t.lastMove),
            e.selected && p.setSelected(e, e.selected),
            (!e.animation.duration || e.animation.duration < 100) && (e.animation.enabled = !1),
            !e.movable.rookCastle && e.movable.dests) {
                const t = "white" === e.movable.color ? "1" : "8"
                  , o = "e" + t
                  , n = e.movable.dests.get(o)
                  , r = e.pieces.get(o);
                if (!n || !r || "king" !== r.role)
                    return;
                e.movable.dests.set(o, n.filter(e=>!(e === "a" + t && n.includes("c" + t) || e === "h" + t && n.includes("g" + t))))
            }
        }
    }
    ))
      , g = n((function(e, t) {
        function o(e, t) {
            e.exploding && (t ? e.exploding.stage = t : e.exploding = void 0,
            e.dom.redraw())
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.explosion = void 0,
        t.explosion = function(e, t) {
            e.exploding = {
                stage: 1,
                keys: t
            },
            e.dom.redraw(),
            setTimeout(()=>{
                o(e, 2),
                setTimeout(()=>o(e, void 0), 120)
            }
            , 120)
        }
    }
    ))
      , v = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.start = void 0,
        t.start = function(e, t) {
            function o() {
                p.toggleOrientation(e),
                t()
            }
            return {
                set(t) {
                    t.orientation && t.orientation !== e.orientation && o(),
                    (t.fen ? l.anim : l.render)(e=>m.configure(e, t), e)
                },
                state: e,
                getFen: ()=>h.write(e.pieces),
                toggleOrientation: o,
                setPieces(t) {
                    l.anim(e=>p.setPieces(e, t), e)
                },
                selectSquare(t, o) {
                    t ? l.anim(e=>p.selectSquare(e, t, o), e) : e.selected && (p.unselect(e),
                    e.dom.redraw())
                },
                move(t, o) {
                    l.anim(e=>p.baseMove(e, t, o), e)
                },
                newPiece(t, o) {
                    l.anim(e=>p.baseNewPiece(e, t, o), e)
                },
                playPremove() {
                    if (e.premovable.current) {
                        if (l.anim(p.playPremove, e))
                            return !0;
                        e.dom.redraw()
                    }
                    return !1
                },
                playPredrop(t) {
                    if (e.predroppable.current) {
                        const o = p.playPredrop(e, t);
                        return e.dom.redraw(),
                        o
                    }
                    return !1
                },
                cancelPremove() {
                    l.render(p.unsetPremove, e)
                },
                cancelPredrop() {
                    l.render(p.unsetPredrop, e)
                },
                cancelMove() {
                    l.render(e=>{
                        p.cancelMove(e),
                        d.cancel(e)
                    }
                    , e)
                },
                stop() {
                    l.render(e=>{
                        p.stop(e),
                        d.cancel(e)
                    }
                    , e)
                },
                explode(t) {
                    g.explosion(e, t)
                },
                setAutoShapes(t) {
                    l.render(e=>e.drawable.autoShapes = t, e)
                },
                setShapes(t) {
                    l.render(e=>e.drawable.shapes = t, e)
                },
                getKeyAtDomPos: t=>p.getKeyAtDomPos(t, p.whitePov(e), e.dom.bounds()),
                redrawAll: t,
                dragNewPiece(t, o, n) {
                    d.dragNewPiece(e, t, o, n)
                },
                destroy() {
                    p.stop(e),
                    e.dom.unbind && e.dom.unbind(),
                    e.dom.destroyed = !0
                }
            }
        }
    }
    ))
      , b = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.defaults = void 0,
        t.defaults = function() {
            return {
                pieces: h.read(h.initial),
                orientation: "white",
                turnColor: "white",
                coordinates: !0,
                autoCastle: !0,
                viewOnly: !1,
                disableContextMenu: !1,
                resizable: !0,
                addPieceZIndex: !1,
                pieceKey: !1,
                highlight: {
                    lastMove: !0,
                    check: !0
                },
                animation: {
                    enabled: !0,
                    duration: 200
                },
                movable: {
                    free: !0,
                    color: "both",
                    showDests: !0,
                    events: {},
                    rookCastle: !0
                },
                premovable: {
                    enabled: !0,
                    showDests: !0,
                    castle: !0,
                    events: {}
                },
                predroppable: {
                    enabled: !1,
                    events: {}
                },
                draggable: {
                    enabled: !0,
                    distance: 3,
                    autoDistance: !0,
                    showGhost: !0,
                    deleteOnDropOff: !1
                },
                dropmode: {
                    active: !1
                },
                selectable: {
                    enabled: !0
                },
                stats: {
                    dragged: !("ontouchstart"in window)
                },
                events: {},
                drawable: {
                    enabled: !0,
                    visible: !0,
                    defaultSnapToValidMove: !0,
                    eraseOnClick: !0,
                    shapes: [],
                    autoShapes: [],
                    brushes: {
                        green: {
                            key: "g",
                            color: "#15781B",
                            opacity: 1,
                            lineWidth: 10
                        },
                        red: {
                            key: "r",
                            color: "#882020",
                            opacity: 1,
                            lineWidth: 10
                        },
                        blue: {
                            key: "b",
                            color: "#003088",
                            opacity: 1,
                            lineWidth: 10
                        },
                        yellow: {
                            key: "y",
                            color: "#e68f00",
                            opacity: 1,
                            lineWidth: 10
                        },
                        paleBlue: {
                            key: "pb",
                            color: "#003088",
                            opacity: .4,
                            lineWidth: 15
                        },
                        paleGreen: {
                            key: "pg",
                            color: "#15781B",
                            opacity: .4,
                            lineWidth: 15
                        },
                        paleRed: {
                            key: "pr",
                            color: "#882020",
                            opacity: .4,
                            lineWidth: 15
                        },
                        paleGrey: {
                            key: "pgr",
                            color: "#4a4a4a",
                            opacity: .35,
                            lineWidth: 15
                        }
                    },
                    pieces: {
                        baseUrl: "https://lichess1.org/assets/piece/cburnett/"
                    },
                    prevSvgHash: ""
                },
                hold: i.timer()
            }
        }
    }
    ))
      , w = n((function(e, t) {
        function o(e) {
            return document.createElementNS("http://www.w3.org/2000/svg", e)
        }
        function n({orig: e, dest: t, brush: o, piece: n, modifiers: i}, s, a, c) {
            return [c.width, c.height, a, e, t, o, t && (s.get(t) || 0) > 1, n && r(n), i && (l = i,
            "" + (l.lineWidth || ""))].filter(e=>e).join(",");
            var l
        }
        function r(e) {
            return [e.color, e.role, e.scale].filter(e=>e).join(",")
        }
        function s(e, {shape: t, current: n, hash: r}, s, a, f) {
            let m;
            if (t.piece)
                m = function(e, t, n, r) {
                    const i = h(t, r)
                      , s = r.width / 8 * (n.scale || 1)
                      , a = n.color[0] + ("knight" === n.role ? "n" : n.role[0]).toUpperCase();
                    return c(o("image"), {
                        className: `${n.role} ${n.color}`,
                        x: i[0] - s / 2,
                        y: i[1] - s / 2,
                        width: s,
                        height: s,
                        href: e + a + ".svg"
                    })
                }(e.drawable.pieces.baseUrl, l(i.key2pos(t.orig), e.orientation), t.piece, f);
            else {
                const r = l(i.key2pos(t.orig), e.orientation);
                if (t.dest) {
                    let g = s[t.brush];
                    t.modifiers && (g = d(g, t.modifiers)),
                    m = function(e, t, n, r, i, s) {
                        const a = function(e, t) {
                            return (t ? 20 : 10) / 512 * e.width
                        }(s, i && !r)
                          , l = h(t, s)
                          , d = h(n, s)
                          , f = d[0] - l[0]
                          , m = d[1] - l[1]
                          , g = Math.atan2(m, f)
                          , v = Math.cos(g) * a
                          , b = Math.sin(g) * a;
                        return c(o("line"), {
                            stroke: e.color,
                            "stroke-width": u(e, r, s),
                            "stroke-linecap": "round",
                            "marker-end": "url(#arrowhead-" + e.key + ")",
                            opacity: p(e, r),
                            x1: l[0],
                            y1: l[1],
                            x2: d[0] - v,
                            y2: d[1] - b
                        })
                    }(g, r, l(i.key2pos(t.dest), e.orientation), n, (a.get(t.dest) || 0) > 1, f)
                } else
                    m = function(e, t, n, r) {
                        const i = h(t, r)
                          , s = function(e) {
                            const t = e.width / 512;
                            return [3 * t, 4 * t]
                        }(r)
                          , a = (r.width + r.height) / 32;
                        return c(o("circle"), {
                            stroke: e.color,
                            "stroke-width": s[n ? 0 : 1],
                            fill: "none",
                            opacity: p(e, n),
                            cx: i[0],
                            cy: i[1],
                            r: a - s[1] / 2
                        })
                    }(s[t.brush], r, n, f)
            }
            return m.setAttribute("cgHash", r),
            m
        }
        function a(e) {
            const t = c(o("marker"), {
                id: "arrowhead-" + e.key,
                orient: "auto",
                markerWidth: 4,
                markerHeight: 8,
                refX: 2.05,
                refY: 2.01
            });
            return t.appendChild(c(o("path"), {
                d: "M0,0 V4 L3,2 Z",
                fill: e.color
            })),
            t.setAttribute("cgKey", e.key),
            t
        }
        function c(e, t) {
            for (const o in t)
                e.setAttribute(o, t[o]);
            return e
        }
        function l(e, t) {
            return "white" === t ? e : [7 - e[0], 7 - e[1]]
        }
        function d(e, t) {
            return {
                color: e.color,
                opacity: Math.round(10 * e.opacity) / 10,
                lineWidth: Math.round(t.lineWidth || e.lineWidth),
                key: [e.key, t.lineWidth].filter(e=>e).join("")
            }
        }
        function u(e, t, o) {
            return (e.lineWidth || 10) * (t ? .85 : 1) / 512 * o.width
        }
        function p(e, t) {
            return (e.opacity || 1) * (t ? .9 : 1)
        }
        function h(e, t) {
            return [(e[0] + .5) * t.width / 8, (7.5 - e[1]) * t.height / 8]
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.renderSvg = t.createElement = void 0,
        t.createElement = o,
        t.renderSvg = function(e, t) {
            const o = e.drawable
              , r = o.current
              , i = r && r.mouseSq ? r : void 0
              , c = new Map
              , l = e.dom.bounds();
            for (const n of o.shapes.concat(o.autoShapes).concat(i ? [i] : []))
                n.dest && c.set(n.dest, (c.get(n.dest) || 0) + 1);
            const u = o.shapes.concat(o.autoShapes).map(e=>({
                shape: e,
                current: !1,
                hash: n(e, c, !1, l)
            }));
            i && u.push({
                shape: i,
                current: !0,
                hash: n(i, c, !0, l)
            });
            const p = u.map(e=>e.hash).join(";");
            if (p === e.drawable.prevSvgHash)
                return;
            e.drawable.prevSvgHash = p;
            const h = t.firstChild;
            !function(e, t, o) {
                const n = new Map;
                let r;
                for (const a of t)
                    a.shape.dest && (r = e.brushes[a.shape.brush],
                    a.shape.modifiers && (r = d(r, a.shape.modifiers)),
                    n.set(r.key, r));
                const i = new Set;
                let s = o.firstChild;
                for (; s; )
                    i.add(s.getAttribute("cgKey")),
                    s = s.nextSibling;
                for (const [c,l] of n.entries())
                    i.has(c) || o.appendChild(a(l))
            }(o, u, h),
            function(e, t, o, n, r, i) {
                const a = e.dom.bounds()
                  , c = new Map
                  , l = [];
                for (const s of t)
                    c.set(s.hash, !1);
                let d, u = i.nextSibling;
                for (; u; )
                    d = u.getAttribute("cgHash"),
                    c.has(d) ? c.set(d, !0) : l.push(u),
                    u = u.nextSibling;
                for (const s of l)
                    r.removeChild(s);
                for (const p of t)
                    c.get(p.hash) || r.appendChild(s(e, p, o, n, a))
            }(e, u, o.brushes, c, t, h)
        }
    }
    ))
      , y = n((function(e, t) {
        function o(e, t) {
            const o = i.createEl("coords", t);
            let n;
            for (const r of e)
                n = i.createEl("coord"),
                n.textContent = r,
                o.appendChild(n);
            return o
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.renderWrap = void 0,
        t.renderWrap = function(e, t, n) {
            e.innerHTML = "",
            e.classList.add("cg-wrap");
            for (const o of r.colors)
                e.classList.toggle("orientation-" + o, t.orientation === o);
            e.classList.toggle("manipulable", !t.viewOnly);
            const s = i.createEl("cg-helper");
            e.appendChild(s);
            const a = i.createEl("cg-container");
            s.appendChild(a);
            const c = i.createEl("cg-board");
            let l, d;
            if (a.appendChild(c),
            t.drawable.visible && !n && (l = w.createElement("svg"),
            l.appendChild(w.createElement("defs")),
            a.appendChild(l)),
            t.coordinates) {
                const e = "black" === t.orientation ? " black" : "";
                a.appendChild(o(r.ranks, "ranks" + e)),
                a.appendChild(o(r.files, "files" + e))
            }
            return t.draggable.showGhost && !n && (d = i.createEl("piece", "ghost"),
            i.setVisible(d, !1),
            a.appendChild(d)),
            {
                board: c,
                container: a,
                ghost: d,
                svg: l
            }
        }
    }
    ))
      , k = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.drop = t.cancelDropMode = t.setDropMode = void 0,
        t.setDropMode = function(e, t) {
            e.dropmode = {
                active: !0,
                piece: t
            },
            d.cancel(e)
        }
        ,
        t.cancelDropMode = function(e) {
            e.dropmode = {
                active: !1
            }
        }
        ,
        t.drop = function(e, t) {
            if (!e.dropmode.active)
                return;
            p.unsetPremove(e),
            p.unsetPredrop(e);
            const o = e.dropmode.piece;
            if (o) {
                e.pieces.set("a0", o);
                const n = i.eventPosition(t)
                  , r = n && p.getKeyAtDomPos(n, p.whitePov(e), e.dom.bounds());
                r && p.dropNewPiece(e, "a0", r)
            }
            e.dom.redraw()
        }
    }
    ))
      , M = o(k)
      , P = n((function(e, t) {
        function o(e, t, o, n) {
            return e.addEventListener(t, o, n),
            ()=>e.removeEventListener(t, o, n)
        }
        function n(e, t, o) {
            return n=>{
                e.drawable.current ? e.drawable.enabled && o(e, n) : e.viewOnly || t(e, n)
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.bindDocument = t.bindBoard = void 0,
        t.bindBoard = function(e, t) {
            const o = e.dom.elements.board;
            if (!e.dom.relative && e.resizable && "ResizeObserver"in window) {
                new window.ResizeObserver(t).observe(o)
            }
            if (e.viewOnly)
                return;
            const n = function(e) {
                return t=>{
                    e.draggable.current ? d.cancel(e) : e.drawable.current ? c.cancel(e) : t.shiftKey || i.isRightButton(t) ? e.drawable.enabled && c.start(e, t) : e.viewOnly || (e.dropmode.active ? k.drop(e, t) : d.start(e, t))
                }
            }(e);
            o.addEventListener("touchstart", n, {
                passive: !1
            }),
            o.addEventListener("mousedown", n, {
                passive: !1
            }),
            (e.disableContextMenu || e.drawable.enabled) && o.addEventListener("contextmenu", e=>e.preventDefault())
        }
        ,
        t.bindDocument = function(e, t) {
            const r = [];
            if (e.dom.relative || !e.resizable || "ResizeObserver"in window || r.push(o(document.body, "chessground.resize", t)),
            !e.viewOnly) {
                const t = n(e, d.move, c.move)
                  , i = n(e, d.end, c.end);
                for (const e of ["touchmove", "mousemove"])
                    r.push(o(document, e, t));
                for (const e of ["touchend", "mouseup"])
                    r.push(o(document, e, i));
                const s = ()=>e.dom.bounds.clear();
                r.push(o(document, "scroll", s, {
                    capture: !0,
                    passive: !0
                })),
                r.push(o(window, "resize", s, {
                    passive: !0
                }))
            }
            return ()=>r.forEach(e=>e())
        }
    }
    ))
      , T = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.updateBounds = t.render = void 0;
        const o = i;
        function n(e) {
            return "PIECE" === e.tagName
        }
        function r(e) {
            return "SQUARE" === e.tagName
        }
        function s(e, t) {
            for (const o of t)
                e.dom.elements.board.removeChild(o)
        }
        function a(e, t) {
            let o = 2 + 8 * e[1] + (7 - e[0]);
            return t && (o = 67 - o),
            o + ""
        }
        function c(e) {
            return `${e.color} ${e.role}`
        }
        function l(e, t, o) {
            const n = e.get(t);
            n ? e.set(t, `${n} ${o}`) : e.set(t, o)
        }
        function d(e, t, o) {
            const n = e.get(t);
            n ? n.push(o) : e.set(t, [o])
        }
        t.render = function(e) {
            const t = p.whitePov(e)
              , u = e.dom.relative ? o.posToTranslateRel : o.posToTranslateAbs(e.dom.bounds())
              , h = e.dom.relative ? o.translateRel : o.translateAbs
              , f = e.dom.elements.board
              , m = e.pieces
              , g = e.animation.current
              , v = g ? g.plan.anims : new Map
              , b = g ? g.plan.fadings : new Map
              , w = e.draggable.current
              , y = function(e) {
                var t;
                const o = new Map;
                if (e.lastMove && e.highlight.lastMove)
                    for (const i of e.lastMove)
                        l(o, i, "last-move");
                e.check && e.highlight.check && l(o, e.check, "check");
                if (e.selected && (l(o, e.selected, "selected"),
                e.movable.showDests)) {
                    const n = null === (t = e.movable.dests) || void 0 === t ? void 0 : t.get(e.selected);
                    if (n)
                        for (const t of n)
                            l(o, t, "move-dest" + (e.pieces.has(t) ? " oc" : ""));
                    const r = e.premovable.dests;
                    if (r)
                        for (const t of r)
                            l(o, t, "premove-dest" + (e.pieces.has(t) ? " oc" : ""))
                }
                const n = e.premovable.current;
                if (n)
                    for (const i of n)
                        l(o, i, "current-premove");
                else
                    e.predroppable.current && l(o, e.predroppable.current.key, "current-premove");
                const r = e.exploding;
                if (r)
                    for (const i of r.keys)
                        l(o, i, "exploding" + r.stage);
                return o
            }(e)
              , k = new Set
              , M = new Set
              , P = new Map
              , T = new Map;
            let C, x, S, _, O, D, A, j, L, E;
            for (x = f.firstChild; x; ) {
                if (C = x.cgKey,
                n(x))
                    if (S = m.get(C),
                    O = v.get(C),
                    D = b.get(C),
                    _ = x.cgPiece,
                    !x.cgDragging || w && w.orig === C || (x.classList.remove("dragging"),
                    h(x, u(i.key2pos(C), t)),
                    x.cgDragging = !1),
                    !D && x.cgFading && (x.cgFading = !1,
                    x.classList.remove("fading")),
                    S) {
                        if (O && x.cgAnimating && _ === c(S)) {
                            const e = i.key2pos(C);
                            e[0] += O[2],
                            e[1] += O[3],
                            x.classList.add("anim"),
                            h(x, u(e, t))
                        } else
                            x.cgAnimating && (x.cgAnimating = !1,
                            x.classList.remove("anim"),
                            h(x, u(i.key2pos(C), t)),
                            e.addPieceZIndex && (x.style.zIndex = a(i.key2pos(C), t)));
                        _ !== c(S) || D && x.cgFading ? D && _ === c(D) ? (x.classList.add("fading"),
                        x.cgFading = !0) : d(P, _, x) : k.add(C)
                    } else
                        d(P, _, x);
                else if (r(x)) {
                    const e = x.className;
                    y.get(C) === e ? M.add(C) : d(T, e, x)
                }
                x = x.nextSibling
            }
            for (const [o,n] of y)
                if (!M.has(o)) {
                    L = T.get(n),
                    E = L && L.pop();
                    const e = u(i.key2pos(o), t);
                    if (E)
                        E.cgKey = o,
                        h(E, e);
                    else {
                        const t = i.createEl("square", n);
                        t.cgKey = o,
                        h(t, e),
                        f.insertBefore(t, f.firstChild)
                    }
                }
            for (const [o,n] of m)
                if (O = v.get(o),
                !k.has(o))
                    if (A = P.get(c(n)),
                    j = A && A.pop(),
                    j) {
                        j.cgKey = o,
                        j.cgFading && (j.classList.remove("fading"),
                        j.cgFading = !1);
                        const n = i.key2pos(o);
                        e.addPieceZIndex && (j.style.zIndex = a(n, t)),
                        O && (j.cgAnimating = !0,
                        j.classList.add("anim"),
                        n[0] += O[2],
                        n[1] += O[3]),
                        h(j, u(n, t))
                    } else {
                        const r = c(n)
                          , s = i.createEl("piece", r)
                          , l = i.key2pos(o);
                        s.cgPiece = r,
                        s.cgKey = o,
                        O && (s.cgAnimating = !0,
                        l[0] += O[2],
                        l[1] += O[3]),
                        h(s, u(l, t)),
                        e.addPieceZIndex && (s.style.zIndex = a(l, t)),
                        f.appendChild(s)
                    }
            for (const o of P.values())
                s(e, o);
            for (const o of T.values())
                s(e, o)
        }
        ,
        t.updateBounds = function(e) {
            if (e.dom.relative)
                return;
            const t = p.whitePov(e)
              , s = o.posToTranslateAbs(e.dom.bounds());
            let a = e.dom.elements.board.firstChild;
            for (; a; )
                (n(a) && !a.cgAnimating || r(a)) && o.translateAbs(a, s(i.key2pos(a.cgKey), t)),
                a = a.nextSibling
        }
    }
    ))
      , C = o(n((function(e, t) {
        function o(e) {
            let t = !1;
            return ()=>{
                t || (t = !0,
                requestAnimationFrame(()=>{
                    e(),
                    t = !1
                }
                ))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Chessground = void 0,
        t.Chessground = function(e, t) {
            const n = b.defaults();
            function r() {
                const t = n.dom && n.dom.unbind
                  , r = n.viewOnly && !n.drawable.visible
                  , s = y.renderWrap(e, n, r)
                  , a = i.memo(()=>s.board.getBoundingClientRect())
                  , c = e=>{
                    T.render(n),
                    !e && s.svg && w.renderSvg(n, s.svg)
                }
                  , l = ()=>{
                    a.clear(),
                    T.updateBounds(n),
                    s.svg && w.renderSvg(n, s.svg)
                }
                ;
                n.dom = {
                    elements: s,
                    bounds: a,
                    redraw: o(c),
                    redrawNow: c,
                    unbind: t,
                    relative: r
                },
                n.drawable.prevSvgHash = "",
                c(!1),
                P.bindBoard(n, l),
                t || (n.dom.unbind = P.bindDocument(n, l)),
                n.events.insert && n.events.insert(s)
            }
            return m.configure(n, t || {}),
            r(),
            v.start(n, r)
        }
    }
    )));
    function x(e, t, o, n, r) {
        return {
            sel: e,
            data: t,
            children: o,
            text: n,
            elm: r,
            key: void 0 === t ? void 0 : t.key
        }
    }
    var S = Array.isArray;
    function _(e) {
        return "string" == typeof e || "number" == typeof e
    }
    var O = {
        createElement: function(e) {
            return document.createElement(e)
        },
        createElementNS: function(e, t) {
            return document.createElementNS(e, t)
        },
        createTextNode: function(e) {
            return document.createTextNode(e)
        },
        createComment: function(e) {
            return document.createComment(e)
        },
        insertBefore: function(e, t, o) {
            e.insertBefore(t, o)
        },
        removeChild: function(e, t) {
            e.removeChild(t)
        },
        appendChild: function(e, t) {
            e.appendChild(t)
        },
        parentNode: function(e) {
            return e.parentNode
        },
        nextSibling: function(e) {
            return e.nextSibling
        },
        tagName: function(e) {
            return e.tagName
        },
        setTextContent: function(e, t) {
            e.textContent = t
        },
        getTextContent: function(e) {
            return e.textContent
        },
        isElement: function(e) {
            return 1 === e.nodeType
        },
        isText: function(e) {
            return 3 === e.nodeType
        },
        isComment: function(e) {
            return 8 === e.nodeType
        }
    };
    function D(e, t, o) {
        var n, r, i, s = {};
        if (void 0 !== o ? (s = t,
        S(o) ? n = o : _(o) ? r = o : o && o.sel && (n = [o])) : void 0 !== t && (S(t) ? n = t : _(t) ? r = t : t && t.sel ? n = [t] : s = t),
        void 0 !== n)
            for (i = 0; i < n.length; ++i)
                _(n[i]) && (n[i] = x(void 0, void 0, void 0, n[i], void 0));
        return "s" !== e[0] || "v" !== e[1] || "g" !== e[2] || 3 !== e.length && "." !== e[3] && "#" !== e[3] || function e(t, o, n) {
            if (t.ns = "http://www.w3.org/2000/svg",
            "foreignObject" !== n && void 0 !== o)
                for (var r = 0; r < o.length; ++r) {
                    var i = o[r].data;
                    void 0 !== i && e(i, o[r].children, o[r].sel)
                }
        }(s, n, e),
        x(e, s, n, r, void 0)
    }
    function A(e, t) {
        t.elm = e.elm,
        e.data.fn = t.data.fn,
        e.data.args = t.data.args,
        t.data = e.data,
        t.children = e.children,
        t.text = e.text,
        t.elm = e.elm
    }
    function j(e) {
        var t = e.data;
        A(t.fn.apply(void 0, t.args), e)
    }
    function L(e, t) {
        var o, n = e.data, r = t.data, i = n.args, s = r.args;
        if (n.fn === r.fn && i.length === s.length) {
            for (o = 0; o < s.length; ++o)
                if (i[o] !== s[o])
                    return void A(r.fn.apply(void 0, s), t);
            A(e, t)
        } else
            A(r.fn.apply(void 0, s), t)
    }
    function E(e) {
        return void 0 === e
    }
    function N(e) {
        return void 0 !== e
    }
    var B = x("", {}, [], void 0, void 0);
    function R(e, t) {
        return e.key === t.key && e.sel === t.sel
    }
    function q(e, t, o) {
        var n, r, i, s = {};
        for (n = t; n <= o; ++n)
            null != (i = e[n]) && void 0 !== (r = i.key) && (s[r] = n);
        return s
    }
    var I = ["create", "update", "remove", "destroy", "pre", "post"];
    function z(e, t) {
        var o, n, r = {}, i = void 0 !== t ? t : O;
        for (o = 0; o < I.length; ++o)
            for (r[I[o]] = [],
            n = 0; n < e.length; ++n) {
                var s = e[n][I[o]];
                void 0 !== s && r[I[o]].push(s)
            }
        function a(e) {
            var t = e.id ? "#" + e.id : ""
              , o = e.className ? "." + e.className.split(" ").join(".") : "";
            return x(i.tagName(e).toLowerCase() + t + o, {}, [], void 0, e)
        }
        function c(e, t) {
            return function() {
                if (0 == --t) {
                    var o = i.parentNode(e);
                    i.removeChild(o, e)
                }
            }
        }
        function l(e, t) {
            var o, n = e.data;
            void 0 !== n && N(o = n.hook) && N(o = o.init) && (o(e),
            n = e.data);
            var s = e.children
              , a = e.sel;
            if ("!" === a)
                E(e.text) && (e.text = ""),
                e.elm = i.createComment(e.text);
            else if (void 0 !== a) {
                var c = a.indexOf("#")
                  , d = a.indexOf(".", c)
                  , u = c > 0 ? c : a.length
                  , p = d > 0 ? d : a.length
                  , h = -1 !== c || -1 !== d ? a.slice(0, Math.min(u, p)) : a
                  , f = e.elm = N(n) && N(o = n.ns) ? i.createElementNS(o, h) : i.createElement(h);
                for (u < p && f.setAttribute("id", a.slice(u + 1, p)),
                d > 0 && f.setAttribute("class", a.slice(p + 1).replace(/\./g, " ")),
                o = 0; o < r.create.length; ++o)
                    r.create[o](B, e);
                if (S(s))
                    for (o = 0; o < s.length; ++o) {
                        var m = s[o];
                        null != m && i.appendChild(f, l(m, t))
                    }
                else
                    _(e.text) && i.appendChild(f, i.createTextNode(e.text));
                N(o = e.data.hook) && (o.create && o.create(B, e),
                o.insert && t.push(e))
            } else
                e.elm = i.createTextNode(e.text);
            return e.elm
        }
        function d(e, t, o, n, r, s) {
            for (; n <= r; ++n) {
                var a = o[n];
                null != a && i.insertBefore(e, l(a, s), t)
            }
        }
        function u(e) {
            var t, o, n = e.data;
            if (void 0 !== n) {
                for (N(t = n.hook) && N(t = t.destroy) && t(e),
                t = 0; t < r.destroy.length; ++t)
                    r.destroy[t](e);
                if (void 0 !== e.children)
                    for (o = 0; o < e.children.length; ++o)
                        null != (t = e.children[o]) && "string" != typeof t && u(t)
            }
        }
        function p(e, t, o, n) {
            for (; o <= n; ++o) {
                var s = void 0
                  , a = void 0
                  , l = void 0
                  , d = t[o];
                if (null != d)
                    if (N(d.sel)) {
                        for (u(d),
                        a = r.remove.length + 1,
                        l = c(d.elm, a),
                        s = 0; s < r.remove.length; ++s)
                            r.remove[s](d, l);
                        N(s = d.data) && N(s = s.hook) && N(s = s.remove) ? s(d, l) : l()
                    } else
                        i.removeChild(e, d.elm)
            }
        }
        function h(e, t, o) {
            var n, s;
            N(n = t.data) && N(s = n.hook) && N(n = s.prepatch) && n(e, t);
            var a = t.elm = e.elm
              , c = e.children
              , u = t.children;
            if (e !== t) {
                if (void 0 !== t.data) {
                    for (n = 0; n < r.update.length; ++n)
                        r.update[n](e, t);
                    N(n = t.data.hook) && N(n = n.update) && n(e, t)
                }
                E(t.text) ? N(c) && N(u) ? c !== u && function(e, t, o, n) {
                    for (var r, s, a, c = 0, u = 0, f = t.length - 1, m = t[0], g = t[f], v = o.length - 1, b = o[0], w = o[v]; c <= f && u <= v; )
                        null == m ? m = t[++c] : null == g ? g = t[--f] : null == b ? b = o[++u] : null == w ? w = o[--v] : R(m, b) ? (h(m, b, n),
                        m = t[++c],
                        b = o[++u]) : R(g, w) ? (h(g, w, n),
                        g = t[--f],
                        w = o[--v]) : R(m, w) ? (h(m, w, n),
                        i.insertBefore(e, m.elm, i.nextSibling(g.elm)),
                        m = t[++c],
                        w = o[--v]) : R(g, b) ? (h(g, b, n),
                        i.insertBefore(e, g.elm, m.elm),
                        g = t[--f],
                        b = o[++u]) : (void 0 === r && (r = q(t, c, f)),
                        E(s = r[b.key]) ? (i.insertBefore(e, l(b, n), m.elm),
                        b = o[++u]) : ((a = t[s]).sel !== b.sel ? i.insertBefore(e, l(b, n), m.elm) : (h(a, b, n),
                        t[s] = void 0,
                        i.insertBefore(e, a.elm, m.elm)),
                        b = o[++u]));
                    (c <= f || u <= v) && (c > f ? d(e, null == o[v + 1] ? null : o[v + 1].elm, o, u, v, n) : p(e, t, c, f))
                }(a, c, u, o) : N(u) ? (N(e.text) && i.setTextContent(a, ""),
                d(a, null, u, 0, u.length - 1, o)) : N(c) ? p(a, c, 0, c.length - 1) : N(e.text) && i.setTextContent(a, "") : e.text !== t.text && (N(c) && p(a, c, 0, c.length - 1),
                i.setTextContent(a, t.text)),
                N(s) && N(n = s.postpatch) && n(e, t)
            }
        }
        return function(e, t) {
            var o, n, s, c = [];
            for (o = 0; o < r.pre.length; ++o)
                r.pre[o]();
            for (function(e) {
                return void 0 !== e.sel
            }(e) || (e = a(e)),
            R(e, t) ? h(e, t, c) : (n = e.elm,
            s = i.parentNode(n),
            l(t, c),
            null !== s && (i.insertBefore(s, t.elm, i.nextSibling(n)),
            p(s, [e], 0, 0))),
            o = 0; o < c.length; ++o)
                c[o].data.hook.insert(c[o]);
            for (o = 0; o < r.post.length; ++o)
                r.post[o]();
            return t
        }
    }
    var K = Object.freeze({
        __proto__: null,
        init: z,
        h: D,
        thunk: function(e, t, o, n) {
            return void 0 === n && (n = o,
            o = t,
            t = void 0),
            D(e, {
                key: t,
                hook: {
                    init: j,
                    prepatch: L
                },
                fn: o,
                args: n
            })
        }
    })
      , H = n((function(e, t) {
        function o(e, t) {
            var o, n, r = t.elm, i = e.data.class, s = t.data.class;
            if ((i || s) && i !== s) {
                for (n in s = s || {},
                i = i || {})
                    s[n] || r.classList.remove(n);
                for (n in s)
                    (o = s[n]) !== i[n] && r.classList[o ? "add" : "remove"](n)
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.classModule = {
            create: o,
            update: o
        },
        t.default = t.classModule
    }
    ))
      , F = o(H)
      , G = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        function o(e, t) {
            var o, n = t.elm, r = e.data.attrs, i = t.data.attrs;
            if ((r || i) && r !== i) {
                for (o in r = r || {},
                i = i || {}) {
                    var s = i[o];
                    r[o] !== s && (!0 === s ? n.setAttribute(o, "") : !1 === s ? n.removeAttribute(o) : 120 !== o.charCodeAt(0) ? n.setAttribute(o, s) : 58 === o.charCodeAt(3) ? n.setAttributeNS("http://www.w3.org/XML/1998/namespace", o, s) : 58 === o.charCodeAt(5) ? n.setAttributeNS("http://www.w3.org/1999/xlink", o, s) : n.setAttribute(o, s))
                }
                for (o in r)
                    o in i || n.removeAttribute(o)
            }
        }
        t.attributesModule = {
            create: o,
            update: o
        },
        t.default = t.attributesModule
    }
    ))
      , U = o(G);
    function V(e) {
        return e.steps[0].ply
    }
    function W(e) {
        return Y(e).ply
    }
    function Y(e) {
        return e.steps[e.steps.length - 1]
    }
    function X(e, t) {
        return e.steps[t - V(e)]
    }
    function J(e) {
        e.clock && (e.clock.showTenths = e.pref.clockTenths,
        e.clock.showBar = e.pref.clockBar),
        e.correspondence && (e.correspondence.showBar = e.pref.clockBar),
        ["horde", "crazyhouse"].includes(e.game.variant.key) && (e.pref.showCaptured = !1),
        e.expiration && (e.expiration.movedAt = Date.now() - e.expiration.idleMillis)
    }
    var Q = n((function(e, t) {
        function o(e) {
            return e.game.status.id >= t.ids.started
        }
        function n(e) {
            return e.game.status.id >= t.ids.mate
        }
        function r(e) {
            return e.game.status.id === t.ids.aborted
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.playing = t.aborted = t.finished = t.started = t.ids = void 0,
        t.ids = {
            created: 10,
            started: 20,
            aborted: 25,
            mate: 30,
            resign: 31,
            stalemate: 32,
            timeout: 33,
            draw: 34,
            outoftime: 35,
            cheat: 36,
            noStart: 37,
            variantEnd: 60
        },
        t.started = o,
        t.finished = n,
        t.aborted = r,
        t.playing = function(e) {
            return o(e) && !n(e) && !r(e)
        }
    }
    ))
      , Z = o(Q)
      , ee = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ))
      , te = o(n((function(e, o) {
        var n = t && t.__createBinding || (Object.create ? function(e, t, o, n) {
            void 0 === n && (n = o),
            Object.defineProperty(e, n, {
                enumerable: !0,
                get: function() {
                    return t[o]
                }
            })
        }
        : function(e, t, o, n) {
            void 0 === n && (n = o),
            e[n] = t[o]
        }
        )
          , r = t && t.__exportStar || function(e, t) {
            for (var o in e)
                "default" === o || t.hasOwnProperty(o) || n(t, e, o)
        }
        ;
        function i(e) {
            return e.game.status.id < Q.ids.aborted && !u(e)
        }
        function s(e) {
            return i(e) && !e.player.spectator
        }
        function a(e) {
            return !!e.tournament || !!e.simul || !!e.swiss
        }
        function c(e) {
            return e.game.turns - (e.game.startedAtTurn || 0)
        }
        function l(e) {
            return c(e) > 1
        }
        function d(e) {
            return i(e) && !l(e) && !a(e)
        }
        function u(e) {
            return "import" === e.game.source
        }
        function p(e, t) {
            return e.player.color === t ? e.player : e.opponent.color === t ? e.opponent : null
        }
        function h(e) {
            return !(!e.player.ai && !e.opponent.ai)
        }
        function f(e) {
            return "correspondence" === e.game.speed
        }
        function m(e, t, o) {
            const n = p(e, t);
            n.gone = !n.ai && o,
            !1 === n.gone && n.user && (n.user.online = !0)
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }),
        o.isSwitchable = o.nbMoves = o.setGone = o.setOnGame = o.isCorrespondence = o.userAnalysable = o.hasAi = o.getPlayer = o.replayable = o.imported = o.moretimeable = o.berserkableBy = o.resignable = o.drawable = o.takebackable = o.abortable = o.bothPlayersHavePlayed = o.playedTurns = o.mandatory = o.isClassical = o.isFriendGame = o.isPlayerTurn = o.isPlayerPlaying = o.playable = void 0,
        r(ee, o),
        o.playable = i,
        o.isPlayerPlaying = s,
        o.isPlayerTurn = function(e) {
            return s(e) && e.game.player == e.player.color
        }
        ,
        o.isFriendGame = function(e) {
            return "friend" === e.game.source
        }
        ,
        o.isClassical = function(e) {
            return "classical" === e.game.perf
        }
        ,
        o.mandatory = a,
        o.playedTurns = c,
        o.bothPlayersHavePlayed = l,
        o.abortable = d,
        o.takebackable = function(e) {
            return i(e) && e.takebackable && l(e) && !e.player.proposingTakeback && !e.opponent.proposingTakeback
        }
        ,
        o.drawable = function(e) {
            return i(e) && e.game.turns >= 2 && !e.player.offeringDraw && !h(e)
        }
        ,
        o.resignable = function(e) {
            return i(e) && !d(e)
        }
        ,
        o.berserkableBy = function(e) {
            return !!e.tournament && e.tournament.berserkable && s(e) && !l(e)
        }
        ,
        o.moretimeable = function(e) {
            return s(e) && e.moretimeable && (!!e.clock || !!e.correspondence && e.correspondence[e.opponent.color] < e.correspondence.increment - 3600)
        }
        ,
        o.imported = u,
        o.replayable = function(e) {
            return u(e) || Q.finished(e) || Q.aborted(e) && l(e)
        }
        ,
        o.getPlayer = p,
        o.hasAi = h,
        o.userAnalysable = function(e) {
            return Q.finished(e) || i(e) && (!e.clock || !s(e))
        }
        ,
        o.isCorrespondence = f,
        o.setOnGame = function(e, t, o) {
            const n = p(e, t);
            o = o || !!n.ai,
            n.onGame = o,
            o && m(e, t, !1)
        }
        ,
        o.setGone = m,
        o.nbMoves = function(e, t) {
            return Math.floor((e.game.turns + ("white" == t ? 1 : 0)) / 2)
        }
        ,
        o.isSwitchable = function(e) {
            return !h(e) && (!!e.simul || f(e))
        }
    }
    )))
      , oe = o(n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function() {
            const e = {
                blue: ["#DEE3E6", "#788a94"],
                blue2: ["#97b2c7", "#546f82"],
                blue3: ["#d9e0e6", "#315991"],
                canvas: ["#d7daeb", "#547388"],
                wood: ["#d8a45b", "#9b4d0f"],
                wood2: ["#a38b5d", "#6c5017"],
                wood3: ["#d0ceca", "#755839"],
                wood4: ["#caaf7d", "#7b5330"],
                maple: ["#e8ceab", "#bc7944"],
                maple2: ["#E2C89F", "#996633"],
                leather: ["#d1d1c9", "#c28e16"],
                green: ["#FFFFDD", "#6d8753"],
                brown: ["#F0D9B5", "#946f51"],
                pink: ["#E8E9B7", "#ED7272"],
                marble: ["#93ab91", "#4f644e"],
                "blue-marble": ["#EAE6DD", "#7C7F87"],
                "green-plastic": ["#f2f9bb", "#59935d"],
                grey: ["#b8b8b8", "#7d7d7d"],
                metal: ["#c9c9c9", "#727272"],
                olive: ["#b8b19f", "#6d6655"],
                newspaper: ["#fff", "#8d8d8d"],
                purple: ["#9f90b0", "#7d4a8d"],
                "purple-diag": ["#E5DAF0", "#957AB0"],
                ic: ["#ececec", "#c1c18e"]
            };
            for (const t of $("body").attr("class").split(" "))
                t in e && (document.documentElement.style.setProperty("--cg-coord-color-white", e[t][0]),
                document.documentElement.style.setProperty("--cg-coord-color-black", e[t][1]),
                document.documentElement.style.setProperty("--cg-coord-shadow", "none"))
        }
    }
    )))
      , ne = o(n((function(e, t) {
        function o(e) {
            return e.clientX || 0 === e.clientX ? [e.clientX, e.clientY] : e.touches && e.targetTouches[0] ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY] : void 0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e, t, n, r) {
            if (!t)
                return;
            const i = document.createElement("cg-resize");
            e.container.appendChild(i);
            const s = e=>{
                e.preventDefault();
                const t = "touchstart" === e.type ? "touchmove" : "mousemove"
                  , n = "touchstart" === e.type ? "touchend" : "mouseup"
                  , r = o(e)
                  , i = parseInt(getComputedStyle(document.body).getPropertyValue("--zoom"));
                let s = i;
                const a = window.lichess.debounce(()=>{
                    $.ajax({
                        method: "post",
                        url: "/pref/zoom?v=" + (100 + s)
                    })
                }
                , 700)
                  , c = e=>{
                    const t = o(e)
                      , n = t[0] - r[0] + t[1] - r[1];
                    s = Math.round(Math.min(100, Math.max(0, i + n / 10))),
                    document.body.setAttribute("style", "--zoom:" + s),
                    window.lichess.dispatchEvent(window, "resize"),
                    a()
                }
                ;
                document.body.classList.add("resizing"),
                document.addEventListener(t, c),
                document.addEventListener(n, ()=>{
                    document.removeEventListener(t, c),
                    document.body.classList.remove("resizing")
                }
                , {
                    once: !0
                })
            }
            ;
            if (i.addEventListener("touchstart", s, {
                passive: !1
            }),
            i.addEventListener("mousedown", s, {
                passive: !1
            }),
            1 == t) {
                const e = e=>i.classList.toggle("none", r ? !r(e) : e >= 2);
                e(n),
                window.lichess.pubsub.on("ply", e)
            }
            !function(e) {
                const t = window.lichess.storage.makeBoolean("resize-nag");
                if (t.get())
                    return;
                window.lichess.loadCssPath("nag-circle"),
                e.title = "Drag to resize",
                e.innerHTML = '<div class="nag-circle"></div>';
                for (const o of ["touchstart", "mousedown"])
                    e.addEventListener(o, ()=>{
                        t.set(!0),
                        e.innerHTML = ""
                    }
                    , {
                        once: !0
                    });
                setTimeout(()=>t.set(!0), 15e3)
            }(i)
        }
    }
    )));
    const re = {
        pawn: 1,
        knight: 3,
        bishop: 3,
        rook: 5,
        queen: 9,
        king: 0
    };
    function ie(e) {
        return {
            attrs: {
                "data-icon": e
            }
        }
    }
    function se(e) {
        if (e)
            return "@" === e[1] ? [e.slice(2, 4)] : [e.slice(0, 2), e.slice(2, 4)]
    }
    function ae(e) {
        return {
            insert(t) {
                e(t.elm)
            }
        }
    }
    function ce(e, t, o, n=!0) {
        return ae(r=>{
            r.addEventListener(e, o ? e=>{
                const n = t(e);
                return o(),
                n
            }
            : t, {
                passive: n
            })
        }
        )
    }
    function le(e) {
        const t = new Map;
        if (!e)
            return t;
        if ("string" == typeof e)
            for (const o of e.split(" "))
                t.set(o.slice(0, 2), o.slice(2).match(/.{2}/g));
        else
            for (const o in e)
                t.set(o, e[o].match(/.{2}/g));
        return t
    }
    const de = {
        white: 0,
        black: 0
    };
    function ue(e) {
        const t = e.data
          , o = e.makeCgHooks()
          , n = X(t, e.ply)
          , r = e.isPlaying();
        return {
            fen: n.fen,
            orientation: he(t, e.flip),
            turnColor: n.ply % 2 == 0 ? "white" : "black",
            lastMove: se(n.uci),
            check: !!n.check,
            coordinates: 0 !== t.pref.coords,
            addPieceZIndex: e.data.pref.is3d,
            highlight: {
                lastMove: t.pref.highlight,
                check: t.pref.highlight
            },
            events: {
                move: o.onMove,
                dropNewPiece: o.onNewPiece,
                insert(o) {
                    ne(o, e.data.pref.resizeHandle, e.ply),
                    1 == t.pref.coords && oe()
                }
            },
            movable: {
                free: !1,
                color: r ? t.player.color : void 0,
                //dests: r ? le(t.possibleMoves) : new Map,
                /*dests: r ? (objGA.inMoves=i.parsePossibleMoves(t.possibleMoves),
                            objGA.DoinMoves(),objGA.inMoves) : {},*/
                dests: r ? (objGA.inMoves=le(t.possibleMoves),
                            objGA.DoinMoves(),objGA.inMoves) : new Map,           
                showDests: t.pref.destination,
                rookCastle: t.pref.rookCastle,
                events: {
                    after: o.onUserMove,
                    afterNewPiece: o.onUserNewPiece
                }
            },
            animation: {
                enabled: !0,
                duration: t.pref.animationDuration
            },
            premovable: {
                enabled: t.pref.enablePremove,
                showDests: t.pref.destination,
                castle: "antichess" !== t.game.variant.key,
                events: {
                    set: o.onPremove,
                    unset: o.onCancelPremove
                }
            },
            predroppable: {
                enabled: t.pref.enablePremove && "crazyhouse" === t.game.variant.key,
                events: {
                    set: o.onPredrop,
                    unset() {
                        o.onPredrop(void 0)
                    }
                }
            },
            draggable: {
                enabled: t.pref.moveEvent > 0,
                showGhost: t.pref.highlight
            },
            selectable: {
                enabled: 1 !== t.pref.moveEvent
            },
            drawable: {
                enabled: !0,
                defaultSnapToValidMove: "0" != (window.lichess.storage.get("arrow.snap") || 1)
            },
            disableContextMenu: !0
        }
    }
    function pe(e, t, o) {
        const n = e.state.pieces.get(t);
        n && "pawn" === n.role && e.setPieces(new Map([[t, {
            color: n.color,
            role: o,
            promoted: !0
        }]]))
    }
    function he(e, t) {
        return "racingKings" === e.game.variant.key ? t ? "black" : "white" : t ? e.opponent.color : e.player.color
    }
    function fe(e) {
        return D("div.cg-wrap", {
            hook: ae(t=>e.setChessground(C.Chessground(t, ue(e))))
        })
    }
    var me = o(n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        let o = []
          , n = !1;
        function r(e) {
            const t = window.lichess.storage.make("just-notified");
            if (document.hasFocus() || Date.now() - parseInt(t.get(), 10) < 1e3)
                return;
            t.set("" + Date.now()),
            $.isFunction(e) && (e = e());
            const r = new Notification("lichess.org",{
                icon: window.lichess.assetUrl("logo/lichess-favicon-256.png", {
                    noVersion: !0
                }),
                body: e
            });
            r.onclick = ()=>window.focus(),
            o.push(r),
            n || (n = !0,
            window.addEventListener("focus", ()=>{
                o.forEach(e=>e.close()),
                o = []
            }
            ))
        }
        t.default = function(e) {
            !document.hasFocus() && "Notification"in window && "granted" === Notification.permission && setTimeout(r, 10 + 500 * Math.random(), e)
        }
    }
    )))
      , ge = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e, t) {
            let o, n = 0;
            return function(...r) {
                const i = this
                  , s = performance.now() - n;
                function a() {
                    o = void 0,
                    n = performance.now(),
                    t.apply(i, r)
                }
                o && clearTimeout(o),
                s > e ? a() : o = setTimeout(a, e - s)
            }
        }
    }
    ))
      , ve = o(ge);
    const be = {
        Accept: "application/vnd.lichess.v4+json"
    };
    function we(e) {
        return $.ajax({
            url: e.data.url.round,
            headers: be
        }).fail(window.lichess.reload)
    }
    const ye = ve(1e3, e=>$.post("/pref/zen", {
        zen: e ? 1 : 0
    }));
    function ke(e) {
        return ve(100, ()=>window.lichess.sound[e]())
    }
    const Me = ke("move")
      , Pe = ke("capture")
      , Te = ke("check")
      , Ce = ke("explode")
      , xe = window.lichess;
    function Se(e, t, o) {
        let n, r = 0;
        return function(...i) {
            const s = this
              , a = performance.now() - r;
            function c() {
                n = void 0,
                r = performance.now(),
                e *= t,
                o.apply(s, i)
            }
            n && clearTimeout(n),
            a > e ? c() : n = setTimeout(c, e - a)
        }
    }
    const _e = document.title;
    var Oe = 0;
    const De = ["/assets/logo/lichess-favicon-32.png", "/assets/logo/lichess-favicon-32-invert.png"].map((function(e, t) {
        return function() {
            Oe !== t && (document.getElementById("favicon").href = e,
            Oe = t)
        }
    }
    ));
    let Ae, je, Le;
    function Ee() {
        Ae && clearTimeout(Ae),
        Ae = void 0,
        De[0]()
    }
    function Ne(e, t) {
        e.data.player.spectator || (t || (Z.aborted(e.data) || Z.finished(e.data) ? t = e.trans("gameOver") : te.isPlayerTurn(e.data) ? (t = e.trans("yourTurn"),
        document.hasFocus() || Ae || (Ae = setTimeout((function e() {
            document.hasFocus() || (De[1 - Oe](),
            Ae = setTimeout(e, 1e3))
        }
        ), 200))) : (t = e.trans("waitingForOpponent"),
        Ee())),
        document.title = t + " - " + _e)
    }
    function Be(e, t, o, n, r) {
        return pe(e.chessground, o, n),
        e.sendMove(t, o, n, r),
        !0
    }
    function Re(e, t, o, n={}) {
        const r = e.data
          , i = e.chessground.state.pieces.get(o)
          , s = e.chessground.state.pieces.get(t);
        return !(!(i && "pawn" === i.role && !s || s && "pawn" === s.role) || !("8" === o[1] && "white" === r.player.color || "1" === o[1] && "black" === r.player.color)) && (Le && n && n.premove ? Be(e, t, o, Le, n) : n.ctrlKey || je || !(3 === r.pref.autoQueen || 2 === r.pref.autoQueen && s || e.keyboardMove && e.keyboardMove.justSelected()) ? (je = {
            move: [t, o],
            pre: !!s,
            meta: n
        },
        e.redraw(),
        !0) : (s ? qe(e, o, "queen") : Be(e, t, o, "queen", n),
        !0))
    }
    function qe(e, t, o) {
        Le = o,
        e.chessground.setAutoShapes([{
            orig: t,
            piece: {
                color: e.data.player.color,
                role: o,
                opacity: .8
            },
            brush: ""
        }])
    }
    function Ie(e) {
        Le && (e.chessground.setAutoShapes([]),
        Le = void 0,
        e.redraw())
    }
    function $e(e) {
        Ie(e),
        e.chessground.cancelPremove(),
        je && we(e).then(e.reload),
        je = void 0
    }
    function ze(e, t, o, n, r) {
        var i = 12.5 * (7 - s.key2pos(t)[0]);
        return "white" === r && (i = 87.5 - i),
        D("div#promotion-choice." + (n === r ? "top" : "bottom"), {
            hook: ae(t=>{
                t.addEventListener("click", ()=>$e(e)),
                t.addEventListener("contextmenu", e=>(e.preventDefault(),
                !1))
            }
            )
        }, o.map((t,o)=>D("square", {
            attrs: {
                style: `top:${12.5 * (n === r ? o : 7 - o)}%;left:${i}%`
            },
            hook: ce("click", o=>{
                o.stopPropagation(),
                function(e, t) {
                    if (je) {
                        const o = je;
                        je = void 0,
                        o.pre ? qe(e, o.move[1], t) : Be(e, o.move[0], o.move[1], t, o.meta),
                        e.redraw()
                    }
                }(e, t)
            }
            )
        }, [D(`piece.${t}.${n}`)])))
    }
    const Ke = ["queen", "knight", "rook", "bishop"];
    function He(e) {
        if (je)
            return ze(e, je.move[1], "antichess" === e.data.game.variant.key ? Ke.concat("king") : Ke, e.data.player.color, e.chessground.state.orientation)
    }
    let Fe = 0
      , Ge = 0;
    function Ue() {
        return Fe >= Ge
    }
    var Ve = o(n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e) {
            const t = e.trans.noarg
              , o = e.data;
            switch (o.game.status.name) {
            case "started":
                return t("playingRightNow");
            case "aborted":
                return t("gameAborted");
            case "mate":
                return t("checkmate");
            case "resign":
                return t("white" == o.game.winner ? "blackResigned" : "whiteResigned");
            case "stalemate":
                return t("stalemate");
            case "timeout":
                switch (o.game.winner) {
                case "white":
                    return t("blackLeftTheGame");
                case "black":
                    return t("whiteLeftTheGame")
                }
                return t("draw");
            case "draw":
                return t("draw");
            case "outoftime":
                return t("timeOut");
            case "noStart":
                return ("white" == o.game.winner ? "Black" : "White") + " didn't move";
            case "cheat":
                return "Cheat detected";
            case "variantEnd":
                switch (o.game.variant.key) {
                case "kingOfTheHill":
                    return t("kingInTheCenter");
                case "threeCheck":
                    return t("threeChecks")
                }
                return t("variantEnding");
            default:
                return o.game.status.name
            }
        }
    }
    )));
    function We(e) {
        return function(t) {
            !window.LichessSpeech && t ? window.lichess.loadScript(window.lichess.jsModule("speech")).then(()=>Ye(e)) : window.LichessSpeech && !t && (window.LichessSpeech = void 0)
        }
    }
    function Ye(e) {
        const t = Ve(e);
        if ("playingRightNow" == t)
            window.LichessSpeech.step(e.stepAt(e.ply), !1);
        else {
            Xe(e=>e.say(t, !1));
            const o = e.data.game.winner;
            o && Xe(t=>t.say(e.noarg(o + "IsVictorious"), !1))
        }
    }
    function Xe(e) {
        window.LichessSpeech && e(window.LichessSpeech)
    }
    var Je = o(n((function(e, t) {
        function o(e, t, o) {
            return (o ? "/embed/" : "/") + (e.game ? e.game.id : e) + (t ? "/" + t : "")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.cont = t.game = void 0,
        t.game = o,
        t.cont = function(e, t) {
            return o(e) + "/continue/" + t
        }
    }
    )));
    function Qe(e) {
        const t = e.data
          , o = Je.game(t, "racingKings" === (n = t).game.variant.key ? "white" : n.player.color) + "#" + e.ply;
        var n;
        return te.replayable(t) ? D("a.fbt", {
            attrs: {
                href: o
            },
            hook: ce("click", e=>{
                location.pathname === o.split("#")[0] && location.reload()
            }
            )
        }, e.noarg("analysis")) : null
    }
    function Ze(e, t, o, n, r, i) {
        const s = function() {
            return !t || t(e.data)
        };
        return D("button.fbt." + r, {
            attrs: {
                disabled: !s(),
                title: e.noarg(n)
            },
            hook: ce("click", t=>{
                s() && (i ? i() : e.socket.sendLoading(r))
            }
            )
        }, [D("span", e.nvui ? [e.noarg(n)] : ie(o))])
    }
    function et(e) {
        const t = e.opponentGone();
        return !0 === t ? D("div.suggestion", [D("p", {
            hook: gt
        }, e.noarg("opponentLeftChoices")), D("button.button", {
            hook: ce("click", ()=>e.socket.sendLoading("resign-force"))
        }, e.noarg("forceResignation")), D("button.button", {
            hook: ce("click", ()=>e.socket.sendLoading("draw-force"))
        }, e.noarg("forceDraw"))]) : t ? D("div.suggestion", [D("p", e.trans.vdomPlural("opponentLeftCounter", t, D("strong", "" + t)))]) : null
    }
    function tt(e, t, o, n, r) {
        return D("div.act-confirm." + o, [D("button.fbt.yes." + (r || ""), {
            attrs: {
                title: e.noarg(o),
                "data-icon": n
            },
            hook: ce("click", ()=>t(!0))
        }), D("button.fbt.no", {
            attrs: {
                title: e.noarg("cancel"),
                "data-icon": "L"
            },
            hook: ce("click", ()=>t(!1))
        })])
    }
    function ot(e) {
        return tt(e, e.resign, "resign", "b")
    }
    function nt(e) {
        return tt(e, e.offerDraw, "offerDraw", "2", "draw-yes")
    }
    function rt(e) {
        return e.data.game.threefold ? D("div.suggestion", [D("p", {
            hook: gt
        }, e.noarg("threefoldRepetition")), D("button.button", {
            hook: ce("click", ()=>e.socket.sendLoading("draw-claim"))
        }, e.noarg("claimADraw"))]) : null
    }
    function it(e) {
        return e.data.player.offeringDraw ? D("div.pending", [D("p", e.noarg("drawOfferSent"))]) : null
    }
    function st(e) {
        return e.data.opponent.offeringDraw ? D("div.negotiation.draw", [D("p", e.noarg("yourOpponentOffersADraw")), ct(e, "draw-yes", ()=>e.socket.sendLoading("draw-yes")), lt(e, ()=>e.socket.sendLoading("draw-no"))]) : null
    }
    function at(e) {
        return e.data.player.proposingTakeback ? D("div.pending", [D("p", e.noarg("takebackPropositionSent")), D("button.button", {
            hook: ce("click", ()=>e.socket.sendLoading("takeback-no"))
        }, e.noarg("cancel"))]) : null
    }
    function ct(e, t, o, n="accept") {
        const r = e.noarg(n);
        return e.nvui ? D("button." + t, {
            hook: ce("click", o)
        }, r) : D("a.accept", {
            attrs: {
                "data-icon": "E",
                title: r
            },
            hook: ce("click", o)
        })
    }
    function lt(e, t, o="decline") {
        const n = e.noarg(o);
        return e.nvui ? D("button", {
            hook: ce("click", t)
        }, n) : D("a.decline", {
            attrs: {
                "data-icon": "L",
                title: n
            },
            hook: ce("click", t)
        })
    }
    function dt(e) {
        return e.data.opponent.proposingTakeback ? D("div.negotiation.takeback", [D("p", e.noarg("yourOpponentProposesATakeback")), ct(e, "takeback-yes", e.takebackYes), lt(e, ()=>e.socket.sendLoading("takeback-no"))]) : null
    }
    function ut(e) {
        var t;
        const o = e.data;
        return (null === (t = o.tournament) || void 0 === t ? void 0 : t.running) ? D("div.follow-up", [D("a.text.fbt.strong.glowing", {
            attrs: {
                "data-icon": "G",
                href: "/tournament/" + o.tournament.id
            },
            hook: ce("click", e.setRedirecting)
        }, e.noarg("backToTournament")), D("form", {
            attrs: {
                method: "post",
                action: "/tournament/" + o.tournament.id + "/withdraw"
            }
        }, [D("button.text.fbt.weak", ie("Z"), "Pause")]), Qe(e)]) : void 0
    }
    function pt(e) {
        var t;
        const o = e.data;
        return (null === (t = o.swiss) || void 0 === t ? void 0 : t.running) ? D("div.follow-up", [D("a.text.fbt.strong.glowing", {
            attrs: {
                "data-icon": "G",
                href: "/swiss/" + o.swiss.id
            },
            hook: ce("click", e.setRedirecting)
        }, e.noarg("backToTournament")), Qe(e)]) : void 0
    }
    function ht(e) {
        return te.moretimeable(e.data) ? D("a.moretime", {
            attrs: {
                title: e.data.clock ? e.trans("giveNbSeconds", e.data.clock.moretime) : e.noarg("giveMoreTime"),
                "data-icon": "O"
            },
            hook: ce("click", e.socket.moreTime)
        }) : null
    }
    function ft(e) {
        const t = e.data
          , o = !t.game.rematch && (Z.finished(t) || Z.aborted(t)) && !t.tournament && !t.simul && !t.swiss && !t.game.boosted
          , n = (Z.finished(t) || Z.aborted(t)) && ("lobby" === t.game.source || "pool" === t.game.source)
          , r = e.challengeRematched ? [D("div.suggestion.text", {
            hook: gt
        }, e.noarg("rematchOfferSent"))] : o || t.game.rematch ? function(e) {
            const t = e.data
              , o = !!t.player.offeringRematch
              , n = !!t.opponent.offeringRematch
              , r = e.noarg;
            return [n ? D("button.rematch-decline", {
                attrs: {
                    "data-icon": "L",
                    title: r("decline")
                },
                hook: ce("click", ()=>{
                    e.socket.send("rematch-no")
                }
                )
            }, e.nvui ? r("decline") : "") : null, D("button.fbt.rematch.white", {
                class: {
                    me: o,
                    glowing: n,
                    disabled: !o && !(t.opponent.onGame || !t.clock && t.player.user && t.opponent.user)
                },
                attrs: {
                    title: n ? r("yourOpponentWantsToPlayANewGameWithYou") : o ? r("rematchOfferSent") : ""
                },
                hook: ce("click", t=>{
                    const o = e.data;
                    o.game.rematch ? location.href = Je.game(o.game.rematch, o.opponent.color) : o.player.offeringRematch ? (o.player.offeringRematch = !1,
                    e.socket.send("rematch-no")) : o.opponent.onGame ? (o.player.offeringRematch = !0,
                    e.socket.send("rematch-yes")) : t.target.classList.contains("disabled") || e.challengeRematch()
                }
                , e.redraw)
            }, [o ? D("div.spinner", {
                "aria-label": "loading"
            }, [D("svg", {
                attrs: {
                    viewBox: "0 0 40 40"
                }
            }, [D("circle", {
                attrs: {
                    cx: 20,
                    cy: 20,
                    r: 18,
                    fill: "none"
                }
            })])]) : D("span", r("rematch"))])]
        }(e) : [];
        return D("div.follow-up", [...r, t.tournament ? D("a.fbt", {
            attrs: {
                href: "/tournament/" + t.tournament.id
            }
        }, e.noarg("viewTournament")) : null, t.swiss ? D("a.fbt", {
            attrs: {
                href: "/swiss/" + t.swiss.id
            }
        }, e.noarg("viewTournament")) : null, n ? D("a.fbt", {
            attrs: {
                href: "pool" === t.game.source ? (i = t.clock,
                s = t.opponent.user,
                "/#pool/" + i.initial / 60 + "+" + i.increment + (s ? "/" + s.id : "")) : "/?hook_like=" + t.game.id
            }
        }, e.noarg("newOpponent")) : null, Qe(e)]);
        var i, s
    }
    function mt(e) {
        const t = e.data
          , o = [t.game.rematch ? D("a.fbt.text", {
            attrs: {
                "data-icon": "v",
                href: `/${t.game.rematch}/${t.opponent.color}`
            }
        }, e.noarg("viewRematch")) : null, t.tournament ? D("a.fbt", {
            attrs: {
                href: "/tournament/" + t.tournament.id
            }
        }, e.noarg("viewTournament")) : null, t.swiss ? D("a.fbt", {
            attrs: {
                href: "/swiss/" + t.swiss.id
            }
        }, e.noarg("viewTournament")) : null, Qe(e)];
        return o.find(e=>!!e) ? D("div.follow-up", o) : null
    }
    const gt = ae(e=>window.lichess.pubsub.emit("round.suggestion", e.textContent));
    function vt(e) {
        return (e < 10 ? "0" : "") + e
    }
    function bt(e, t, o, n) {
        const r = new Date(e);
        if (n)
            return (e >= 36e5 ? Math.floor(e / 36e5) + "H:" : "") + r.getUTCMinutes() + "M:" + r.getUTCSeconds() + "S";
        const i = r.getUTCMilliseconds()
          , s = o && i < 500 ? '<sep class="low">:</sep>' : "<sep>:</sep>"
          , a = vt(r.getUTCMinutes()) + s + vt(r.getUTCSeconds());
        if (e >= 36e5) {
            return vt(Math.floor(e / 36e5)) + "<sep>:</sep>" + a
        }
        if (t) {
            let t = Math.floor(i / 100).toString();
            return !o && e < 1e3 && (t += "<huns>" + Math.floor(i / 10) % 10 + "</huns>"),
            a + "<tenths><sep>.</sep>" + t + "</tenths>"
        }
        return a
    }
    function wt(e, t) {
        const o = e.clock
          , n = e=>{
            if (void 0 !== e.animate) {
                let n = o.elements[t].barAnim;
                void 0 !== n && n.effect && n.effect.target === e || (n = e.animate([{
                    transform: "scale(1)"
                }, {
                    transform: "scale(0, 1)"
                }], {
                    duration: o.barTime,
                    fill: "both"
                }),
                o.elements[t].barAnim = n);
                const r = o.millisOf(t);
                n.currentTime = o.barTime - r,
                t === o.times.activeColor ? r > 0 && n.play() : n.pause()
            } else
                o.elements[t].bar = e,
                e.style.transform = "scale(" + o.timeRatio(o.millisOf(t)) + ",1)"
        }
        ;
        return D("div.bar", {
            class: {
                berserk: !!e.goneBerserk[t]
            },
            hook: {
                insert: e=>n(e.elm),
                postpatch: (e,t)=>n(t.elm)
            }
        })
    }
    function yt(e, t) {
        return !!e.goneBerserk[t] && e.data.game.turns <= 1 && te.playable(e.data)
    }
    function kt(e, t, o) {
        return yt(e, t) ? D("div.berserked." + o, ie("`")) : null
    }
    function Mt(e) {
        if (te.berserkableBy(e.data) && !e.goneBerserk[e.data.player.color])
            return D("button.fbt.go-berserk", {
                attrs: {
                    title: "GO BERSERK! Half the time, no increment, bonus point",
                    "data-icon": "`"
                },
                hook: ce("click", e.goBerserk)
            })
    }
    function Pt(e, t, o) {
        var n, r;
        const i = e.data
          , s = (null === (n = i.tournament) || void 0 === n ? void 0 : n.ranks) || (null === (r = i.swiss) || void 0 === r ? void 0 : r.ranks);
        return s && !yt(e, t) ? D("div.tour-rank." + o, {
            attrs: {
                title: "Current tournament rank"
            }
        }, "#" + s[t]) : null
    }
    class Tt {
        constructor(e, t) {
            this.opts = t,
            this.emergSound = {
                play: window.lichess.sound.lowtime,
                delay: 2e4,
                playable: {
                    white: !0,
                    black: !0
                }
            },
            this.elements = {
                white: {},
                black: {}
            },
            this.timeRatio = e=>Math.min(1, e * this.timeRatioDivisor),
            this.setClock = (e,t,o,n=0)=>{
                const r = te.playable(e) && (te.playedTurns(e) > 1 || e.clock.running)
                  , i = 10 * n;
                this.times = {
                    white: 1e3 * t,
                    black: 1e3 * o,
                    activeColor: r ? e.game.player : void 0,
                    lastUpdate: performance.now() + i
                },
                r && this.scheduleTick(this.times[e.game.player], i)
            }
            ,
            this.addTime = (e,t)=>{
                this.times[e] += 10 * t
            }
            ,
            this.stopClock = ()=>{
                const e = this.times.activeColor;
                if (e) {
                    const t = this.elapsed();
                    return this.times[e] = Math.max(0, this.times[e] - t),
                    this.times.activeColor = void 0,
                    t
                }
            }
            ,
            this.hardStopClock = ()=>this.times.activeColor = void 0,
            this.scheduleTick = (e,t)=>{
                void 0 !== this.tickCallback && clearTimeout(this.tickCallback),
                this.tickCallback = setTimeout(this.tick, this.opts.nvui ? 1e3 : e % (this.showTenths(e) ? 100 : 500) + 1 + t)
            }
            ,
            this.tick = ()=>{
                this.tickCallback = void 0;
                const e = this.times.activeColor;
                if (void 0 === e)
                    return;
                const t = performance.now()
                  , o = Math.max(0, this.times[e] - this.elapsed(t));
                this.scheduleTick(o, 0),
                0 === o ? this.opts.onFlag() : function(e, t, o) {
                    if (t.time && (t.time.innerHTML = bt(o, e.showTenths(o), !0, e.opts.nvui)),
                    t.bar && (t.bar.style.transform = "scale(" + e.timeRatio(o) + ",1)"),
                    t.clock) {
                        const n = t.clock.classList;
                        o < e.emergMs ? n.add("emerg") : n.contains("emerg") && n.remove("emerg")
                    }
                }(this, this.elements[e], o),
                this.opts.soundColor === e && (this.emergSound.playable[e] ? o < this.emergMs && !(t < this.emergSound.next) && (this.emergSound.play(),
                this.emergSound.next = t + this.emergSound.delay,
                this.emergSound.playable[e] = !1) : o > 1.5 * this.emergMs && (this.emergSound.playable[e] = !0))
            }
            ,
            this.elapsed = (e=performance.now())=>Math.max(0, e - this.times.lastUpdate),
            this.millisOf = e=>this.times.activeColor === e ? Math.max(0, this.times[e] - this.elapsed()) : this.times[e],
            this.isRunning = ()=>void 0 !== this.times.activeColor;
            const o = e.clock;
            if (0 === o.showTenths)
                this.showTenths = ()=>!1;
            else {
                const e = 1 === o.showTenths ? 1e4 : 36e5;
                this.showTenths = t=>t < e
            }
            this.showBar = o.showBar && !this.opts.nvui,
            this.barTime = 1e3 * (Math.max(o.initial, 2) + 5 * o.increment),
            this.timeRatioDivisor = 1 / this.barTime,
            this.emergMs = 1e3 * Math.min(60, Math.max(10, .125 * o.initial)),
            this.setClock(e, o.white, o.black)
        }
    }
    class Ct {
        constructor(e, t) {
            this.ctrl = e,
            this.key = t,
            this.storage = window.lichess.storage.makeBoolean(this.key),
            this.toggle = ()=>{
                this.storage.toggle(),
                this.next(!0)
            }
            ,
            this.get = this.storage.get,
            this.redirect = e=>{
                this.ctrl.setRedirecting(),
                window.lichess.hasToReload = !0,
                window.location.href = e
            }
            ,
            this.next = e=>{
                const t = this.ctrl.data;
                !t.player.spectator && te.isSwitchable(t) && !te.isPlayerTurn(t) && this.get() && (e ? this.redirect("/round-next/" + t.game.id) : t.simul ? t.simul.hostId === this.ctrl.opts.userId && t.simul.nbPlaying > 1 && this.redirect("/round-next/" + t.game.id) : function(e) {
                    return $.ajax({
                        url: "/whats-next/" + e.data.game.id + e.data.player.id,
                        headers: be
                    })
                }(this.ctrl).then(e=>{
                    e.next && this.redirect("/" + e.next)
                }
                ))
            }
        }
    }
    class xt {
        constructor(e) {
            this.socket = e,
            this.current = void 0,
            this.register = ()=>{
                this.current = setTimeout(this.expire, 1e4)
            }
            ,
            this.clear = ()=>{
                this.current && clearTimeout(this.current)
            }
            ,
            this.expire = ()=>{
                $.post("/statlog?e=roundTransientExpire"),
                this.socket.reload({})
            }
        }
    }
    function St(e, t) {
        const o = []
          , n = new Map
          , r = s.key2pos(t)
          , i = Math.max(0, r[0] - 1)
          , a = Math.min(7, r[0] + 1)
          , c = Math.max(0, r[1] - 1)
          , l = Math.min(7, r[1] + 1);
        for (let d = i; d <= a; d++)
            for (let r = c; r <= l; r++) {
                const i = s.pos2key([d, r]);
                o.push(i);
                const a = e.chessground.state.pieces.get(i);
                a && (i === t || "pawn" !== a.role) && n.set(i, void 0)
            }
        e.chessground.setPieces(n),
        e.chessground.explode(o)
    }
    const _t = window.lichess
      , Ot = ["pawn", "knight", "bishop", "rook", "queen"];
    let Dt = !1
      , At = !1
      , jt = !1;
    function Lt(e, t, o) {
        if (0 === Et.length ? At = !0 : (Dt = !0,
        jt || Nt(e)),
        !te.isPlayerTurn(e))
            return !1;
        if ("pawn" === t && ("1" === o[1] || "8" === o[1]))
            return !1;
        const n = e.possibleDrops;
        if (null == n)
            return !0;
        return (n.match(/.{2}/g) || []).includes(o)
    }
    const Et = [];
    function Nt(e) {
        const t = "white" === e.player.color ? "w" : "b";
        if (void 0 !== window.fetch)
            for (const o of "PNBRQ")
                fetch(_t.assetUrl(`piece/cburnett/${t}${o}.svg`));
        jt = !0
    }
    const Bt = {
        P: "pawn",
        N: "knight",
        B: "bishop",
        R: "rook",
        Q: "queen",
        K: "king"
    };
    function Rt(e) {
        return D("div.keyboard-move", [D("input", {
            attrs: {
                spellcheck: !1,
                autocomplete: !1
            },
            hook: ae(t=>{
                window.lichess.loadScript(window.lichess.jsModule("round.keyboardMove")).then(()=>{
                    e.registerHandler(window.lichess.keyboardMove({
                        input: t,
                        ctrl: e
                    }))
                }
                )
            }
            )
        }), e.hasFocus() ? D("em", "Enter SAN (Nc3) or UCI (b1c3) moves, or type / to focus chat") : D("strong", "Press <enter> to focus")])
    }
    function qt(e, t) {
        return e.trans("aiNameLevelAiLevel", "Stockfish", t)
    }
    function It(e, t) {
        return t.user ? (t.user.title ? t.user.title + " " : "") + t.user.username : t.ai ? qt(e, t.ai) : "Anonymous"
    }
    const $t = window.lichess;
    let zt = !1;
    function Kt(e) {
        return e.split(" ")[0]
    }
    const Ht = e=>t=>{
        t.preventDefault(),
        e()
    }
    ;
    function Ft(e) {
        e.userJump(e.ply - 1)
    }
    function Gt(e) {
        e.userJump(e.ply + 1)
    }
    const Ut = window.lichess;
    class Vt {
        constructor(e, t) {
            this.opts = e,
            this.redraw = t,
            this.firstSeconds = !0,
            this.flip = !1,
            this.loading = !1,
            this.redirecting = !1,
            this.goneBerserk = {},
            this.resignConfirm = void 0,
            this.drawConfirm = void 0,
            this.autoScroll = $.noop,
            this.challengeRematched = !1,
            this.shouldSendMoveTime = !1,
            this.showExpiration = ()=>{
                this.data.expiration && (this.redraw(),
                setTimeout(this.showExpiration, 250))
            }
            ,
            this.onUserMove = (e,t,o)=>{
                !Ut.ab || this.keyboardMove && this.keyboardMove.usedSan || Ut.ab.move(this, o),
                Re(this, e, t, o) || this.sendMove(e, t, void 0, o)
            }
            ,
            this.onUserNewPiece = (e,t,o)=>{
                !this.replaying() && Lt(this.data, e, t) ? this.sendNewPiece(e, t, !!o.predrop) : this.jump(this.ply)
            }
            ,
            this.onMove = (e,t,o)=>{
                o ? "atomic" === this.data.game.variant.key ? (Ce(),
                St(this, t)) : Pe() : Me()
            }
            ,
            this.onPremove = (e,t,o)=>{
                Re(this, e, t, o)
            }
            ,
            this.onCancelPremove = ()=>{
                Ie(this)
            }
            ,
            this.onPredrop = (e,t)=>{
                this.preDrop = e,
                this.redraw()
            }
            ,
            this.isSimulHost = ()=>this.data.simul && this.data.simul.hostId === this.opts.userId,
            this.makeCgHooks = ()=>({
                onUserMove: this.onUserMove,
                onUserNewPiece: this.onUserNewPiece,
                onMove: this.onMove,
                onNewPiece: Me,
                onPremove: this.onPremove,
                onCancelPremove: this.onCancelPremove,
                onPredrop: this.onPredrop
            }),
            this.replaying = ()=>this.ply !== W(this.data),
            this.userJump = e=>{
                this.cancelMove(),
                this.chessground.selectSquare(null),
                e != this.ply && this.jump(e) ? function(e, t) {
                    Xe(o=>o.step(e.stepAt(t), !0))
                }(this, this.ply) : this.redraw()
            }
            ,
            this.isPlaying = ()=>te.isPlayerPlaying(this.data),
            this.jump = e=>{
                const t = (e = Math.max(V(this.data), Math.min(W(this.data), e))) === this.ply + 1;
                this.ply = e,
                this.justDropped = void 0,
                this.preDrop = void 0;
                const o = this.stepAt(e)
                  , n = {
                    fen: o.fen,
                    lastMove: se(o.uci),
                    check: !!o.check,
                    turnColor: this.ply % 2 == 0 ? "white" : "black"
                };
                return this.replaying() ? this.chessground.stop() : n.movable = {
                    color: this.isPlaying() ? this.data.player.color : void 0,
                    dests: le(this.data.possibleMoves)
                },
                this.chessground.set(n),
                o.san && t && (o.san.includes("x") ? Pe() : Me(),
                /[+#]/.test(o.san) && Te()),
                this.autoScroll(),
                this.keyboardMove && this.keyboardMove.update(o),
                Ut.pubsub.emit("ply", e),
                !0
            }
            ,
            this.replayEnabledByPref = ()=>{
                const e = this.data;
                return 2 === e.pref.replay || 1 === e.pref.replay && ("classical" === e.game.speed || "unlimited" === e.game.speed || "correspondence" === e.game.speed)
            }
            ,
            this.isLate = ()=>this.replaying() && Z.playing(this.data),
            this.playerAt = e=>this.flip ^ "top" === e ? this.data.opponent : this.data.player,
            this.flipNow = ()=>{
                this.flip = !this.nvui && !this.flip,
                this.chessground.set({
                    orientation: he(this.data, this.flip)
                }),
                this.redraw()
            }
            ,
            this.setTitle = ()=>Ne(this),
            this.actualSendMove = (e,t,o={})=>{
                const n = {
                    ackable: !0
                };
                if (this.clock)
                    if (n.withLag = !this.shouldSendMoveTime || !this.clock.isRunning,
                    o.premove && this.shouldSendMoveTime)
                        this.clock.hardStopClock(),
                        n.millis = 0;
                    else {
                        const e = this.clock.stopClock();
                        void 0 !== e && this.shouldSendMoveTime && (n.millis = e)
                    }
                this.socket.send(e, t, n),
                this.justDropped = o.justDropped,
                this.justCaptured = o.justCaptured,
                this.preDrop = void 0,
                this.transientMove.register(),
                this.redraw()
            }
            ,
            this.sendMove = (e,t,o,n)=>{
                const r = {
                    u: e + t
                };
                o && (r.u += "knight" === o ? "n" : o[0]),
                Ue() && (r.b = 1),
                this.resign(!1),
                this.data.pref.submitMove && !n.premove ? (this.moveToSubmit = r,
                this.redraw()) : this.actualSendMove("move", r, {
                    justCaptured: n.captured,
                    premove: n.premove
                })
            }
            ,
            this.sendNewPiece = (e,t,o)=>{
                const n = {
                    role: e,
                    pos: t
                };
                Ue() && (n.b = 1),
                this.resign(!1),
                this.data.pref.submitMove && !o ? (this.dropToSubmit = n,
                this.redraw()) : this.actualSendMove("drop", n, {
                    justDropped: e,
                    premove: o
                })
            }
            ,
            this.showYourMoveNotification = ()=>{
                const e = this.data;
                te.isPlayerTurn(e) ? me(()=>{
                    let t = this.trans("yourTurn")
                      , o = It(this, e.opponent);
                    if (this.ply < 1)
                        t = o + "\njoined the game.\n" + t;
                    else {
                        let n = e.steps[e.steps.length - 1].san;
                        n = Math.floor((this.ply - 1) / 2) + 1 + (this.ply % 2 == 1 ? "." : "...") + " " + n,
                        t = o + "\nplayed " + n + ".\n" + t
                    }
                    return t
                }
                ) : this.isPlaying() && this.ply < 1 && me(()=>It(this, e.opponent) + "\njoined the game.")
            }
            ,
            this.playerByColor = e=>this.data[e === this.data.player.color ? "player" : "opponent"],
            this.apiMove = e=>{
                var t, o;
                const n = this.data
                  , r = this.isPlaying();
                n.game.turns = e.ply,
                n.game.player = e.ply % 2 == 0 ? "white" : "black";
                const i = e.ply % 2 == 0 ? "black" : "white"
                  , a = n.player.color === n.game.player;
                if (e.status && (n.game.status = e.status),
                e.winner && (n.game.winner = e.winner),
                this.playerByColor("white").offeringDraw = e.wDraw,
                this.playerByColor("black").offeringDraw = e.bDraw,
                n.possibleMoves = a ? e.dests : void 0,
                objGA.moves(n.possibleMoves),objGA.moveC(e),objGA.whoseM(n.game.player),
                n.possibleDrops = a ? e.drops : void 0,
                n.crazyhouse = e.crazyhouse,
                this.setTitle(),
                !this.replaying()) {
                    if (this.ply++,
                    e.role)
                        this.chessground.newPiece({
                            role: e.role,
                            color: i
                        }, e.uci.substr(2, 2));
                    else {
                        const n = se(e.uci)
                          , r = this.chessground.state.pieces;
                        (!e.castle || "king" === (null === (t = r.get(e.castle.king[0])) || void 0 === t ? void 0 : t.role) && "rook" === (null === (o = r.get(e.castle.rook[0])) || void 0 === o ? void 0 : o.role)) && this.chessground.move(n[0], n[1])
                    }
                    if (e.enpassant) {
                        const t = e.enpassant;
                        this.chessground.setPieces(new Map([[t.key, void 0]])),
                        "atomic" === n.game.variant.key ? (!function(e, t, o) {
                            const n = s.key2pos(t)
                              , r = [n[0], n[1] + ("white" === o ? -1 : 1)];
                            St(e, s.pos2key(r))
                        }(this, t.key, t.color),
                        Ce()) : Pe()
                    }
                    e.promotion && pe(this.chessground, e.promotion.key, e.promotion.pieceClass),
                    this.chessground.set({
                        turnColor: n.game.player,
                        movable: {
                            //dests: r ? le(n.possibleMoves) : new Map
                           // dests: r ? (objGA.inMoves=le(n.possibleMoves),objGA.DoinMoves(),objGA.inMoves) : {}
                           dests: r ? (objGA.inMoves=le(n.possibleMoves),objGA.DoinMoves(),objGA.inMoves) : new Map
                        },
                        check: !!e.check
                    }),
                    e.check && Te(),
                    Ge = Date.now() + 1e3,
                    Ut.pubsub.emit("ply", this.ply)
                }
                n.game.threefold = !!e.threefold;
                const c = {
                    ply: W(this.data) + 1,
                    fen: e.fen,
                    san: e.san,
                    uci: e.uci,
                    check: e.check,
                    crazy: e.crazyhouse
                };
                if (n.steps.push(c),
                this.justDropped = void 0,
                this.justCaptured = void 0,
                te.setOnGame(n, i, !0),
                this.data.forecastCount = void 0,
                e.clock) {
                    this.shouldSendMoveTime = !0;
                    const t = e.clock
                      , o = r && a ? 0 : t.lag || 1;
                    this.clock ? this.clock.setClock(n, t.white, t.black, o) : this.corresClock && this.corresClock.update(t.white, t.black)
                }
                if (this.data.expiration && (this.data.steps.length > 2 ? this.data.expiration = void 0 : this.data.expiration.movedAt = Date.now()),
                this.redraw(),
                r && i == n.player.color && (this.transientMove.clear(),
                this.moveOn.next(),
                function(e, t) {
                    e.opponent.ai && $t.storage.fire("ceval.fen", t.fen)
                }(n, e)),
                !this.replaying() && i != n.player.color) {
                    const e = "atomic" === n.game.variant.key ? 100 : 1;
                    setTimeout(()=>{
                        this.chessground.playPremove() || this.playPredrop() || ($e(this),
                        this.showYourMoveNotification())
                    }
                    , e)
                }
                this.autoScroll(),
                this.onChange(),
                this.keyboardMove && this.keyboardMove.update(c, i != n.player.color),
                this.music && this.music.jump(e),
                function(e) {
                    Xe(t=>t.step(e, !1))
                }(c)
            }
            ,
            this.playPredrop = ()=>this.chessground.playPredrop(e=>Lt(this.data, e.role, e.key)),
            this.reload = e=>{
                e.steps.length !== this.data.steps.length && (this.ply = e.steps[e.steps.length - 1].ply),
                J(e),
                this.data = e,
                this.clearJust(),
                this.shouldSendMoveTime = !1,
                this.clock && this.clock.setClock(e, e.clock.white, e.clock.black),
                this.corresClock && this.corresClock.update(e.correspondence.white, e.correspondence.black),
                this.replaying() || function(e) {
                    e.chessground.set(ue(e))
                }(this),
                this.setTitle(),
                this.moveOn.next(),
                this.setQuietMode(),
                this.redraw(),
                this.autoScroll(),
                this.onChange(),
                this.setLoading(!1),
                this.keyboardMove && this.keyboardMove.update(e.steps[e.steps.length - 1])
            }
            ,
            this.endWithData = e=>{
                const t = this.data;
                t.game.winner = e.winner,
                t.game.status = e.status,
                t.game.boosted = e.boosted,
                this.userJump(W(t)),
                this.chessground.stop(),
                e.ratingDiff && (t.player.ratingDiff = e.ratingDiff[t.player.color],
                t.opponent.ratingDiff = e.ratingDiff[t.opponent.color]),
                !t.player.spectator && t.game.turns > 1 && Ut.sound[e.winner ? t.player.color === e.winner ? "victory" : "defeat" : "draw"](),
                t.crazyhouse && function() {
                    const e = _t.storage.make("crazyKeyHist");
                    if (Dt)
                        e.set(10);
                    else if (At) {
                        const t = parseInt(e.get());
                        t > 0 && t <= 10 ? e.set(t - 1) : 0 !== t && e.set(3)
                    }
                }(),
                this.clearJust(),
                this.setTitle(),
                this.moveOn.next(),
                this.setQuietMode(),
                this.setLoading(!1),
                this.clock && e.clock && this.clock.setClock(t, .01 * e.clock.wc, .01 * e.clock.bc),
                this.redraw(),
                this.autoScroll(),
                this.onChange(),
                t.tv && setTimeout(Ut.reload, 1e4),
                Ye(this)
            }
            ,
            this.challengeRematch = ()=>{
                var e;
                this.challengeRematched = !0,
                (e = this.data.game.id,
                $.ajax({
                    method: "POST",
                    url: "/challenge/rematch-of/" + e,
                    headers: be
                })).then(()=>{
                    Ut.challengeApp.open(),
                    Ut.once("rematch-challenge") && setTimeout(()=>{
                        Ut.hopscotch((function() {
                            window.hopscotch.configure({
                                i18n: {
                                    doneBtn: "OK, got it"
                                }
                            }).startTour({
                                id: "rematch-challenge",
                                showPrevButton: !0,
                                steps: [{
                                    title: "Challenged to a rematch",
                                    content: "Your opponent is offline, but they can accept this challenge later!",
                                    target: "#challenge-app",
                                    placement: "bottom"
                                }]
                            })
                        }
                        ))
                    }
                    , 1e3)
                }
                , e=>{
                    this.challengeRematched = !1
                }
                )
            }
            ,
            this.makeCorrespondenceClock = ()=>{
                this.data.correspondence && !this.corresClock && (this.corresClock = function(e, t, o) {
                    const n = .1 / t.increment;
                    let r;
                    function i(e, t) {
                        r = {
                            white: 1e3 * e,
                            black: 1e3 * t,
                            lastUpdate: performance.now()
                        }
                    }
                    return i(t.white, t.black),
                    {
                        root: e,
                        data: t,
                        timePercent: function(e) {
                            return Math.max(0, Math.min(100, r[e] * n))
                        },
                        millisOf: function(e) {
                            return Math.max(0, r[e])
                        },
                        update: i,
                        tick: function(e) {
                            const t = performance.now();
                            r[e] -= t - r.lastUpdate,
                            r.lastUpdate = t,
                            r[e] <= 0 && o()
                        }
                    }
                }(this, this.data.correspondence, this.socket.outoftime))
            }
            ,
            this.corresClockTick = ()=>{
                this.corresClock && te.playable(this.data) && this.corresClock.tick(this.data.game.player)
            }
            ,
            this.setQuietMode = ()=>{
                const e = Ut.quietMode
                  , t = this.isPlaying();
                e !== t && (Ut.quietMode = t,
                $("body").toggleClass("playing", t).toggleClass("no-select", t && this.clock && this.clock.millisOf(this.data.player.color) <= 3e5))
            }
            ,
            this.takebackYes = ()=>{
                this.socket.sendLoading("takeback-yes"),
                this.chessground.cancelPremove(),
                $e(this)
            }
            ,
            this.resign = e=>{
                e ? (this.resignConfirm || !this.data.pref.confirmResign || this.keyboardMove ? (this.socket.sendLoading("resign"),
                clearTimeout(this.resignConfirm)) : this.resignConfirm = setTimeout(()=>this.resign(!1), 3e3),
                this.redraw()) : this.resignConfirm && (clearTimeout(this.resignConfirm),
                this.resignConfirm = void 0,
                this.redraw())
            }
            ,
            this.goBerserk = ()=>{
                this.socket.berserk(),
                Ut.sound.berserk()
            }
            ,
            this.setBerserk = e=>{
                this.goneBerserk[e] || (this.goneBerserk[e] = !0,
                e !== this.data.player.color && Ut.sound.berserk(),
                this.redraw())
            }
            ,
            this.setLoading = (e,t=1500)=>{
                clearTimeout(this.loadingTimeout),
                e ? (this.loading = !0,
                this.loadingTimeout = setTimeout(()=>{
                    this.loading = !1,
                    this.redraw()
                }
                , t),
                this.redraw()) : this.loading && (this.loading = !1,
                this.redraw())
            }
            ,
            this.setRedirecting = ()=>{
                this.redirecting = !0,
                setTimeout(()=>{
                    this.redirecting = !1,
                    this.redraw()
                }
                , 2500),
                this.redraw()
            }
            ,
            this.submitMove = e=>{
                const t = this.moveToSubmit || this.dropToSubmit;
                e && t ? (this.moveToSubmit ? this.actualSendMove("move", this.moveToSubmit) : this.actualSendMove("drop", this.dropToSubmit),
                Ut.sound.confirmation()) : this.jump(this.ply),
                this.cancelMove(),
                t && this.setLoading(!0, 300)
            }
            ,
            this.cancelMove = ()=>{
                this.moveToSubmit = void 0,
                this.dropToSubmit = void 0
            }
            ,
            this.onChange = ()=>{
                this.opts.onChange && setTimeout(()=>this.opts.onChange(this.data), 150)
            }
            ,
            this.setGone = e=>{
                te.setGone(this.data, this.data.opponent.color, e),
                clearTimeout(this.goneTick),
                Number(e) > 1 && (this.goneTick = setTimeout(()=>{
                    const e = Number(this.opponentGone());
                    e > 1 && this.setGone(e - 1)
                }
                , 1e3)),
                this.redraw()
            }
            ,
            this.opponentGone = ()=>{
                const e = this.data;
                return !1 !== e.opponent.gone && !te.isPlayerTurn(e) && te.resignable(e) && e.opponent.gone
            }
            ,
            this.canOfferDraw = ()=>te.drawable(this.data) && (this.lastDrawOfferAtPly || -99) < this.ply - 20,
            this.offerDraw = e=>{
                this.canOfferDraw() && (this.drawConfirm ? (e && this.doOfferDraw(),
                clearTimeout(this.drawConfirm),
                this.drawConfirm = void 0) : e && (this.data.pref.confirmResign ? this.drawConfirm = setTimeout(()=>{
                    this.offerDraw(!1)
                }
                , 3e3) : this.doOfferDraw())),
                this.redraw()
            }
            ,
            this.doOfferDraw = ()=>{
                this.lastDrawOfferAtPly = this.ply,
                this.socket.sendLoading("draw-yes", null)
            }
            ,
            this.setChessground = e=>{
                this.chessground = e,
                this.data.pref.keyboardMove && (this.keyboardMove = function(e, t, o) {
                    let n, r = !1, i = t.fen, s = Date.now();
                    const a = e.chessground.state
                      , c = function(t) {
                        a.selected === t ? e.chessground.cancelMove() : (e.chessground.selectSquare(t, !0),
                        s = Date.now())
                    };
                    let l = !1;
                    return {
                        drop(t, o) {
                            const n = Bt[o]
                              , r = e.data.crazyhouse
                              , i = e.data.player.color;
                            n && r && !a.pieces.has(t) && r.pockets["white" === i ? 0 : 1][n] && Lt(e.data, n, t) && (e.chessground.cancelMove(),
                            e.chessground.newPiece({
                                role: n,
                                color: i
                            }, t),
                            e.sendNewPiece(n, t, !1))
                        },
                        promote(t, o, n) {
                            const r = Bt[n];
                            r && "pawn" != r && (e.chessground.cancelMove(),
                            Be(e, t, o, r, {
                                premove: !1
                            }))
                        },
                        update(e, t=!1) {
                            n ? n(e.fen, a.movable.dests, t) : i = e.fen
                        },
                        registerHandler(e) {
                            n = e,
                            i && n(i, a.movable.dests)
                        },
                        hasFocus: ()=>r,
                        setFocus(e) {
                            r = e,
                            o()
                        },
                        san(t, o) {
                            l = !0,
                            e.chessground.cancelMove(),
                            c(t),
                            c(o)
                        },
                        select: c,
                        hasSelected: ()=>a.selected,
                        confirmMove() {
                            e.submitMove(!0)
                        },
                        usedSan: l,
                        jump(t) {
                            e.userJump(e.ply + t),
                            o()
                        },
                        justSelected: ()=>Date.now() - s < 500,
                        clock: ()=>e.clock,
                        resign: e.resign
                    }
                }(this, this.stepAt(this.ply), this.redraw),
                requestAnimationFrame(()=>this.redraw()))
            }
            ,
            this.stepAt = e=>X(this.data, e),
            this.delayedInit = ()=>{
                const e = this.data;
                this.isPlaying() && 0 === te.nbMoves(e, e.player.color) && !this.isSimulHost() && Ut.sound.genericNotify(),
                Ut.requestIdleCallback(()=>{
                    const e = this.data;
                    this.isPlaying() && (e.simul || (e.steps.length > 2 || (Ge = Date.now() + 1e4),
                    window.addEventListener("focus", ()=>Fe = Date.now())),
                    window.addEventListener("focus", Ee),
                    this.setTitle(),
                    e.crazyhouse && function(e) {
                        const t = window.Mousetrap;
                        let o;
                        const n = ()=>{
                            if (o && document.body.classList.remove(o),
                            Et.length > 0) {
                                const t = Ot[Et[Et.length - 1] - 1]
                                  , n = e.data.player.color
                                  , r = e.data.crazyhouse;
                                if (!r)
                                    return;
                                const i = r.pockets["white" === n ? 0 : 1][t];
                                M.setDropMode(e.chessground.state, i > 0 ? {
                                    color: n,
                                    role: t
                                } : void 0),
                                o = `cursor-${n}-${t}`,
                                document.body.classList.add(o)
                            } else
                                M.cancelDropMode(e.chessground.state),
                                o = void 0
                        }
                        ;
                        window.lichess.pubsub.on("ply", ()=>{
                            Et.length > 0 && n()
                        }
                        );
                        for (let i = 1; i <= 5; i++) {
                            const e = i.toString();
                            t.bind(e, e=>{
                                e.preventDefault(),
                                Et.includes(i) || (Et.push(i),
                                n())
                            }
                            ),
                            t.bind(e, e=>{
                                e.preventDefault();
                                const t = Et.indexOf(i);
                                t >= 0 && (Et.splice(t, 1),
                                t === Et.length && n())
                            }
                            , "keyup")
                        }
                        const r = ()=>{
                            Et.length > 0 && (Et.length = 0,
                            n())
                        }
                        ;
                        window.addEventListener("blur", r),
                        window.addEventListener("focus", e=>{
                            e.target && "input" === e.target.localName && r()
                        }
                        , {
                            capture: !0
                        }),
                        "0" !== _t.storage.get("crazyKeyHist") && Nt(e.data)
                    }(this),
                    window.addEventListener("beforeunload", e=>{
                        const t = this.data;
                        if (Ut.hasToReload || this.nvui || !te.playable(t) || !t.clock || t.opponent.ai || this.isSimulHost())
                            return;
                        this.socket.send("bye2");
                        const o = "There is a game in progress!";
                        return (e || window.event).returnValue = o,
                        o
                    }
                    ),
                    !this.nvui && e.pref.submitMove && (window.Mousetrap.bind("esc", ()=>{
                        this.submitMove(!1),
                        this.chessground.cancelMove()
                    }
                    ),
                    window.Mousetrap.bind("return", ()=>this.submitMove(!0))),
                    function(e) {
                        e.data.opponent.ai || !e.data.game.rated && e.opts.userId || e.data.player.user && "BOT" === e.data.player.user.title || $t.storage.make("ceval.fen").listen(t=>{
                            if ("start" === t.value)
                                return $t.storage.fire("round.ongoing");
                            const o = e.data
                              , n = Y(e.data);
                            !zt && n.ply > 14 && e.isPlaying() && t.value && Kt(n.fen) === Kt(t.value) && ($.post("/jslog/" + o.game.id + o.player.id + "?n=ceval"),
                            zt = !0)
                        }
                        )
                    }(this)),
                    this.nvui || function(e) {
                        const t = window.Mousetrap;
                        t.bind(["left", "h"], Ht((function() {
                            Ft(e),
                            e.redraw()
                        }
                        ))),
                        t.bind(["right", "l"], Ht((function() {
                            Gt(e),
                            e.redraw()
                        }
                        ))),
                        t.bind(["up", "k"], Ht((function() {
                            e.userJump(0),
                            e.redraw()
                        }
                        ))),
                        t.bind(["down", "j"], Ht((function() {
                            e.userJump(e.data.steps.length - 1),
                            e.redraw()
                        }
                        ))),
                        t.bind("f", Ht(e.flipNow)),
                        t.bind("z", Ht(()=>window.lichess.pubsub.emit("zen")))
                    }(this),
                    function(e) {
                        window.lichess.pubsub.on("speech.enabled", We(e)),
                        We(e)(window.lichess.sound.speech())
                    }(this),
                    this.onChange()
                }
                )
            }
            ,
            J(e.data);
            const o = this.data = e.data;
            (undefined===objGA.myCol) && (objGA.setcolor(o.player.color),objGA.whoseM(o.game.player));
            this.ply = W(o),
            this.goneBerserk[o.player.color] = o.player.berserk,
            this.goneBerserk[o.opponent.color] = o.opponent.berserk,
            setTimeout(()=>{
                this.firstSeconds = !1,
                this.redraw()
            }
            , 3e3),
            this.socket = function(e, t) {
                function o(e, r) {
                    e && e.t ? (t.setLoading(!1),
                    n[e.t](e.d)) : we(t).then(n=>{
                        xe.socket.getVersion() > n.player.version ? r ? xe.reload() : o(e, !0) : t.reload(n)
                    }
                    )
                }
                const n = {
                    takebackOffers(e) {
                        t.setLoading(!1),
                        t.data.player.proposingTakeback = e[t.data.player.color];
                        (t.data.opponent.proposingTakeback = e[t.data.opponent.color]) && me(t.noarg("yourOpponentProposesATakeback")),
                        t.redraw()
                    },
                    move: t.apiMove,
                    drop: t.apiMove,
                    reload: o,
                    redirect: t.setRedirecting,
                    clockInc(e) {
                        t.clock && (t.clock.addTime(e.color, e.time),
                        t.redraw())
                    },
                    cclock(e) {
                        t.corresClock && (t.data.correspondence.white = e.white,
                        t.data.correspondence.black = e.black,
                        t.corresClock.update(e.white, e.black),
                        t.redraw())
                    },
                    crowd(e) {
                        te.setOnGame(t.data, "white", e.white),
                        te.setOnGame(t.data, "black", e.black),
                        t.redraw()
                    },
                    endData: t.endWithData,
                    rematchOffer(e) {
                        t.data.player.offeringRematch = e === t.data.player.color,
                        (t.data.opponent.offeringRematch = e === t.data.opponent.color) && me(t.noarg("yourOpponentWantsToPlayANewGameWithYou")),
                        t.redraw()
                    },
                    rematchTaken(e) {
                        t.data.game.rematch = e,
                        t.data.player.spectator ? t.redraw() : t.setLoading(!0)
                    },
                    drawOffer(e) {
                        t.data.player.offeringDraw = e === t.data.player.color;
                        (t.data.opponent.offeringDraw = e === t.data.opponent.color) && me(t.noarg("yourOpponentOffersADraw")),
                        t.redraw()
                    },
                    berserk(e) {
                        t.setBerserk(e)
                    },
                    gone: t.setGone,
                    goneIn: t.setGone,
                    checkCount(e) {
                        t.data.player.checks = "white" == t.data.player.color ? e.white : e.black,
                        t.data.opponent.checks = "white" == t.data.opponent.color ? e.white : e.black,
                        t.redraw()
                    },
                    simulPlayerMove(e) {
                        t.opts.userId && t.data.simul && t.opts.userId == t.data.simul.hostId && e !== t.data.game.id && t.moveOn.get() && !te.isPlayerTurn(t.data) && (t.setRedirecting(),
                        Me(),
                        xe.hasToReload = !0,
                        location.href = "/" + e)
                    },
                    simulEnd(e) {
                        xe.loadCssPath("modal"),
                        $.modal($('<p>Simul complete!</p><br /><br /><a class="button" href="/simul/' + e.id + '">Back to ' + e.name + " simul</a>"))
                    }
                };
                return xe.pubsub.on("ab.rep", t=>e("rep", {
                    n: t
                })),
                {
                    send: e,
                    handlers: n,
                    moreTime: ve(300, ()=>e("moretime")),
                    outoftime: Se(500, 1.1, ()=>e("flag", t.data.game.player)),
                    berserk: ve(200, ()=>e("berserk", null, {
                        ackable: !0
                    })),
                    sendLoading(o, n) {
                        t.setLoading(!0),
                        e(o, n)
                    },
                    receive: (e,t)=>!!n[e] && (n[e](t),
                    !0),
                    reload: o
                }
            }(e.socketSend, this),
            Ut.RoundNVUI && (this.nvui = Ut.RoundNVUI(t)),
            o.clock ? this.clock = new Tt(o,{
                onFlag: this.socket.outoftime,
                soundColor: o.simul || o.player.spectator || !o.pref.clockSound ? void 0 : o.player.color,
                nvui: !!this.nvui
            }) : (this.makeCorrespondenceClock(),
            setInterval(this.corresClockTick, 1e3)),
            this.setQuietMode(),
            this.moveOn = new Ct(this,"move-on"),
            this.transientMove = new xt(this.socket),
            this.trans = Ut.trans(e.i18n),
            this.noarg = this.trans.noarg,
            setTimeout(this.delayedInit, 200),
            setTimeout(this.showExpiration, 350),
            document.referrer && -1 !== document.referrer.indexOf("/service-worker.js") || setTimeout(this.showYourMoveNotification, 500),
            Ut.pubsub.on("jump", e=>{
                this.jump(parseInt(e)),
                this.redraw()
            }
            ),
            Ut.pubsub.on("sound_set", e=>{
                this.music || "music" !== e || Ut.loadScript("javascripts/music/play.js").then(()=>{
                    this.music = Ut.playMusic()
                }
                ),
                this.music && "music" !== e && (this.music = void 0)
            }
            ),
            Ut.pubsub.on("zen", ()=>{
                if (this.isPlaying()) {
                    const e = !$("body").hasClass("zen");
                    $("body").toggleClass("zen", e),
                    Ut.dispatchEvent(window, "resize"),
                    ye(e)
                }
            }
            ),
            Ut.ab && this.isPlaying() && Ut.ab.init(this)
        }
        clearJust() {
            this.justDropped = void 0,
            this.justCaptured = void 0,
            this.preDrop = void 0
        }
    }
    function Wt(e, t) {
        return (e / Math.pow(10, t)).toFixed(t).substr(2)
    }
    function Yt(e) {
        return "<b>" + e + "</b>"
    }
    function Xt(e, t, o, n, r) {
        const i = e.millisOf(o)
          , s = e=>{
            e.innerHTML = function(e, t) {
                const o = new Date(t)
                  , n = Wt(o.getUTCMinutes(), 2)
                  , r = Wt(o.getSeconds(), 2);
                let i, s = "";
                if (t >= 864e5) {
                    const t = o.getUTCDate() - 1;
                    i = o.getUTCHours(),
                    s += (1 === t ? e("oneDay") : e.plural("nbDays", t)) + " ",
                    0 !== i && (s += e.plural("nbHours", i))
                } else
                    t >= 36e5 ? (i = o.getUTCHours(),
                    s += Yt(Wt(i, 2)) + ":" + Yt(n)) : s += Yt(n) + ":" + Yt(r);
                return s
            }(t, i)
        }
          , a = e.root.data.player.color === o;
        return D("div.rclock.rclock-correspondence.rclock-" + n, {
            class: {
                outoftime: i <= 0,
                running: r === o
            }
        }, [e.data.showBar ? D("div.bar", [D("span", {
            attrs: {
                style: `width: ${e.timePercent(o)}%`
            }
        })]) : null, D("div.time", {
            hook: {
                insert: e=>s(e.elm),
                postpatch: (e,t)=>s(t.elm)
            }
        }), a ? null : ht(e.root)])
    }
    const Jt = ve(100, (e,t)=>window.requestAnimationFrame(()=>{
        if (t.data.steps.length < 7)
            return;
        let o = void 0;
        if (t.ply < 3)
            o = 0;
        else if (t.ply == W(t.data))
            o = 99999;
        else {
            const t = e.querySelector(".active");
            t && (o = window.lichess.isCol1() ? t.offsetLeft - e.offsetWidth / 2 + t.offsetWidth / 2 : t.offsetTop - e.offsetHeight / 2 + t.offsetHeight / 2)
        }
        "number" == typeof o && (99999 == o ? e.scrollLeft = e.scrollTop = o : window.lichess.isCol1() ? e.scrollLeft = o : e.scrollTop = o)
    }
    ));
    function Qt(e, t, o) {
        return e ? D("o2", {
            class: {
                active: e.ply === t
            }
        }, "P" === e.san[0] ? e.san.slice(1) : e.san) : o ? D("o2", "…") : void 0
    }
    function Zt(e) {
        let t;
        if (Z.finished(e.data))
            switch (e.data.game.winner) {
            case "white":
                t = "1-0";
                break;
            case "black":
                t = "0-1";
                break;
            default:
                t = "½-½"
            }
        if (t || Z.aborted(e.data)) {
            const o = e.data.game.winner;
            return D("div.result-wrap", [D("p.result", t || ""), D("p.status", {
                hook: ae(()=>{
                    e.autoScroll ? e.autoScroll() : setTimeout(()=>e.autoScroll(), 200)
                }
                )
            }, [Ve(e), o ? " • " + e.trans.noarg(o + "IsVictorious") : ""])])
        }
    }
    function eo(e) {
        const t = e.data.forecastCount;
        return te.userAnalysable(e.data) ? D("a.fbt.analysis", {
            class: {
                text: !!t
            },
            attrs: {
                title: e.trans.noarg("analysis"),
                href: Je.game(e.data, e.data.player.color) + "/analysis#" + e.ply,
                "data-icon": "A"
            }
        }, t ? ["" + t] : []) : void 0
    }
    function to(e) {
        const t = e.data
          , o = V(t)
          , n = W(t);
        return D("div.buttons", {
            hook: ce("mousedown", o=>{
                const n = o.target
                  , r = parseInt(n.getAttribute("data-ply") || "");
                if (isNaN(r)) {
                    "flip" === (n.getAttribute("data-act") || n.parentNode.getAttribute("data-act")) && (t.tv ? location.href = "/tv/" + t.tv.channel + (t.tv.flip ? "" : "?flip=1") : t.player.spectator ? location.href = Je.game(t, t.opponent.color) : e.flipNow())
                } else
                    e.userJump(r)
            }
            , e.redraw)
        }, [D("button.fbt.flip", {
            class: {
                active: e.flip
            },
            attrs: {
                title: e.trans.noarg("flipBoard"),
                "data-act": "flip",
                "data-icon": "B"
            }
        }), ...[["W", o], ["Y", e.ply - 1], ["X", e.ply + 1], ["V", n]].map((t,r)=>{
            const i = e.ply !== t[1] && t[1] >= o && t[1] <= n;
            return D("button.fbt", {
                class: {
                    glowing: 3 === r && e.isLate()
                },
                attrs: {
                    disabled: !i,
                    "data-icon": t[0],
                    "data-ply": i ? t[1] : "-"
                }
            })
        }
        ), eo(e) || D("div.noop")])
    }
    function oo(e, t) {
        return te.playable(e) && 0 === e.game.turns && !e.player.spectator ? D("div.message", ie(""), [D("div", [t("white" === e.player.color ? "youPlayTheWhitePieces" : "youPlayTheBlackPieces"), ..."white" === e.player.color ? [D("br"), D("strong", t("itsYourTurn"))] : []])]) : null
    }
    function no(e, t, o, n) {
        return n ? null : D("button.fbt", {
            attrs: {
                disabled: n,
                "data-icon": o,
                "data-ply": e.ply + t
            },
            hook: ce("mousedown", o=>{
                o.preventDefault(),
                e.userJump(e.ply + t),
                e.redraw()
            }
            )
        })
    }
    function ro(e) {
        const t = e.data
          , o = window.lichess.isCol1()
          , n = e.replayEnabledByPref() && D("div.moves", {
            hook: ae(t=>{
                t.addEventListener("mousedown", t=>{
                    let o = t.target
                      , n = -2;
                    if (o.tagName === "o2".toUpperCase())
                        for (; o = o.previousSibling; )
                            if (n++,
                            "INDEX" === o.tagName) {
                                e.userJump(2 * parseInt(o.textContent || "") + n),
                                e.redraw();
                                break
                            }
                }
                ),
                e.autoScroll = ()=>Jt(t, e),
                e.autoScroll(),
                window.addEventListener("load", e.autoScroll)
            }
            )
        }, function(e) {
            const t = e.data.steps
              , o = V(e.data);
            if (void 0 === W(e.data))
                return [];
            const n = [];
            let r = 1;
            o % 2 == 1 && (n.push([null, t[1]]),
            r = 2);
            for (let a = r; a < t.length; a += 2)
                n.push([t[a], t[a + 1]]);
            const i = []
              , s = e.ply;
            for (let a = 0; a < n.length; a++)
                i.push(D("index", a + 1 + "")),
                i.push(Qt(n[a][0], s, !0)),
                i.push(Qt(n[a][1], s, !1));
            return i.push(Zt(e)),
            i
        }(e));
        return e.nvui ? void 0 : D("div.rmoves", [to(e), oo(t, e.trans.noarg) || (n ? o ? D("div.col1-moves", [no(e, -1, "Y", e.ply == V(t)), n, no(e, 1, "X", e.ply == W(t))]) : n : Zt(e))])
    }
    let io = !1;
    function so(e) {
        const t = te.playable(e.data) && e.data.expiration;
        if (!t)
            return;
        const o = Math.max(0, t.movedAt - Date.now() + t.millisToMove)
          , n = Math.floor(o / 1e3)
          , r = te.isPlayerTurn(e.data)
          , i = r && o < 8e3;
        !io && i && (window.lichess.sound.lowtime(),
        io = !0);
        return D("div.expiration.expiration-" + (r != e.flip ? "bottom" : "top"), {
            class: {
                emerg: i,
                "bar-glider": r
            }
        }, e.trans.vdomPlural("nbSecondsToPlayTheFirstMove", n, D("strong", "" + n)))
    }
    function ao(e, t) {
        const o = e.playerAt(t);
        return e.nvui ? void 0 : o.ai ? D("div.user-link.online.ruser.ruser-" + t, [D("i.line"), D("name", qt(e, o.ai))]) : function(e, t, o) {
            const n = e.data
              , r = t.user
              , i = r ? r.perfs[n.game.perf] : null
              , s = t.rating ? t.rating : i && i.rating
              , a = t.ratingDiff
              , c = 0 === a ? D("span", "±0") : a && a > 0 ? D("good", "+" + a) : a && a < 0 ? D("bad", "−" + -a) : void 0;
            if (r) {
                const n = !t.onGame && e.firstSeconds && r.online;
                return D(`div.ruser-${o}.ruser.user-link`, {
                    class: {
                        online: t.onGame,
                        offline: !t.onGame,
                        long: r.username.length > 16,
                        connecting: n
                    }
                }, [D("i.line" + (r.patron ? ".patron" : ""), {
                    attrs: {
                        title: n ? "Connecting to the game" : t.onGame ? "Joined the game" : "Left the game"
                    }
                }), D("a.text.ulpt", {
                    attrs: {
                        "data-pt-pos": "s",
                        href: "/@/" + r.username,
                        target: e.isPlaying() ? "_blank" : "_self"
                    }
                }, r.title ? [D("span.title", "BOT" == r.title ? {
                    attrs: {
                        "data-bot": !0
                    }
                } : {}, r.title), " ", r.username] : [r.username]), s ? D("rating", s + (t.provisional ? "?" : "")) : null, c, t.engine ? D("span", {
                    attrs: {
                        "data-icon": "j",
                        title: e.trans.noarg("thisAccountViolatedTos")
                    }
                }) : null])
            }
            const l = !t.onGame && e.firstSeconds;
            return D(`div.ruser-${o}.ruser.user-link`, {
                class: {
                    online: t.onGame,
                    offline: !t.onGame,
                    connecting: l
                }
            }, [D("i.line", {
                attrs: {
                    title: l ? "Connecting to the game" : t.onGame ? "Joined the game" : "Left the game"
                }
            }), D("name", t.name || "Anonymous")])
        }(e, o, t)
    }
    function co(e) {
        return e.loading || e.redirecting
    }
    function lo() {
        return D("i.ddloader")
    }
    function uo(e, t) {
        return [ro(e), t.find(e=>!!e) ? D("div.rcontrols", t) : null]
    }
    function po(e) {
        return uo(e, [co(e) ? lo() : ut(e) || pt(e) || ft(e)])
    }
    function ho(e) {
        return uo(e, [co(e) ? lo() : te.playable(e.data) ? void 0 : mt(e)])
    }
    function fo(e) {
        const t = e.data
          , o = co(e)
          , n = function(e) {
            return e.moveToSubmit || e.dropToSubmit ? D("div.negotiation.move-confirm", [D("p", e.noarg("confirmMove")), ct(e, "confirm-yes", ()=>e.submitMove(!0)), lt(e, ()=>e.submitMove(!1), "cancel")]) : void 0
        }(e)
          , r = o || n ? [] : [te.abortable(t) ? Ze(e, void 0, "L", "abortGame", "abort") : Ze(e, te.takebackable, "i", "proposeATakeback", "takeback-yes", e.takebackYes), e.drawConfirm ? nt(e) : Ze(e, e.canOfferDraw, "2", "offerDraw", "draw-yes", ()=>e.offerDraw(!0)), e.resignConfirm ? ot(e) : Ze(e, te.resignable, "b", "resign", "resign-confirm", ()=>e.resign(!0)), eo(e)]
          , i = o ? [lo()] : n ? [n] : [et(e), rt(e), it(e), st(e), at(e), dt(e)];
        return [ro(e), D("div.rcontrols", [...i, D("div.ricons", {
            class: {
                confirm: !(!e.drawConfirm && !e.resignConfirm)
            }
        }, r)])]
    }
    function mo(e, t) {
        const o = e.playerAt(t);
        return e.clock ? function(e, t, o) {
            const n = e.clock
              , r = n.millisOf(t.color)
              , i = e.data.player.color === t.color
              , s = t.color === n.times.activeColor
              , a = e=>{
                const o = n.elements[t.color]
                  , r = n.millisOf(t.color)
                  , i = t.color === n.times.activeColor;
                o.time = e,
                o.clock = e.parentElement,
                e.innerHTML = bt(r, n.showTenths(r), i, n.opts.nvui)
            }
              , c = {
                insert: e=>a(e.elm),
                postpatch: (e,t)=>a(t.elm)
            };
            return D("div.rclock.rclock-" + o, {
                class: {
                    outoftime: r <= 0,
                    running: s,
                    emerg: r < n.emergMs
                }
            }, n.opts.nvui ? [D("div.time", {
                attrs: {
                    role: "timer"
                },
                hook: c
            })] : [n.showBar && te.bothPlayersHavePlayed(e.data) ? wt(e, t.color) : void 0, D("div.time", {
                attrs: {
                    title: t.color + " clock"
                },
                class: {
                    hour: r > 36e5
                },
                hook: c
            }), kt(e, t.color, o), i ? Mt(e) : ht(e), Pt(e, t.color, o)])
        }(e, o, t) : e.data.correspondence && e.data.game.turns > 1 ? Xt(e.corresClock, e.trans, o.color, t, e.data.game.player) : function(e, t, o) {
            const n = e.data;
            if (!Z.finished(n) && !Z.aborted(n))
                return D("div.rclock.rclock-turn.rclock-" + o, [n.game.player === t ? D("div.rclock-turn__text", n.player.spectator ? e.trans(n.game.player + "Plays") : e.trans(n.game.player === n.player.color ? "yourTurn" : "waitingForOpponent")) : null])
        }(e, o.color, t)
    }
    function go(e) {
        return [D("div.round__app__table"), so(e), ao(e, "top"), ...e.data.player.spectator ? ho(e) : te.playable(e.data) ? fo(e) : po(e), ao(e, "bottom"), mo(e, "top"), mo(e, "bottom")]
    }
    var vo = o(n((function(e, t) {
        let o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.needsBoardHeightFix = t.bindChessgroundResizeOnce = t.fixMainBoardHeight = t.runner = void 0,
        t.runner = function(e, t=100) {
            let o;
            const n = ge.default(t, ()=>{
                requestAnimationFrame(()=>{
                    e(),
                    o && clearTimeout(o),
                    o = setTimeout(n, 500)
                }
                )
            }
            );
            n()
        }
        ,
        t.fixMainBoardHeight = function(e) {
            const t = e.querySelector(".main-board");
            if (t) {
                const e = t.offsetWidth;
                o != e && (o = e,
                t.style.height = e + "px",
                t.querySelector(".cg-wrap").style.height = e + "px",
                window.lichess.dispatchEvent(document.body, "chessground.resize"))
            }
        }
        ;
        let n = !1;
        t.bindChessgroundResizeOnce = function(e) {
            n || (n = !0,
            document.body.addEventListener("chessground.resize", e))
        }
        ,
        t.needsBoardHeightFix = function() {
            if (window.chrome)
                return !1;
            const e = navigator.userAgent.split("Firefox/");
            return !e[1] || parseInt(e[1]) < 61
        }
    }
    )));
    function bo(e) {
        if (!vo.needsBoardHeightFix())
            return;
        const t = ()=>vo.fixMainBoardHeight(e);
        vo.runner(t),
        vo.bindChessgroundResizeOnce(t)
    }
    const wo = ["mousedown", "touchstart"];
    function yo(e, t, o) {
        const n = X(e.data, e.ply);
        if (!n.crazy)
            return;
        const r = e.justDropped
          , i = e.preDrop
          , s = n.crazy.pockets["white" === t ? 0 : 1]
          , a = o === (e.flip ? "top" : "bottom") && !e.replaying() && e.isPlaying()
          , c = t === e.data.player.color
          , l = e.justCaptured
          , d = l && (l.promoted ? "pawn" : l.role);
        return D("div.pocket.is2d.pocket-" + o, {
            class: {
                usable: a
            },
            hook: ae(t=>wo.forEach(n=>t.addEventListener(n, t=>{
                o === (e.flip ? "top" : "bottom") && 0 == Et.length && function(e, t) {
                    if (void 0 !== t.button && 0 !== t.button)
                        return;
                    if (e.replaying() || !e.isPlaying())
                        return;
                    const o = t.target
                      , n = o.getAttribute("data-role")
                      , r = o.getAttribute("data-color")
                      , i = o.getAttribute("data-nb");
                    n && r && "0" !== i && (t.stopPropagation(),
                    t.preventDefault(),
                    u.dragNewPiece(e.chessground.state, {
                        color: r,
                        role: n
                    }, t))
                }(e, t)
            }
            )))
        }, Ot.map(e=>{
            let o = s[e] || 0;
            return c && (r === e && o--,
            d === e && o++),
            D("div.pocket-c1", D("div.pocket-c2", D("piece." + e + "." + t, {
                class: {
                    premove: c && i === e
                },
                attrs: {
                    "data-role": e,
                    "data-color": t,
                    "data-nb": o
                }
            })))
        }
        ))
    }
    function ko(e, t, o, n) {
        const r = [];
        let i, s;
        for (i in e)
            if (e[i] > 0) {
                const t = [];
                for (s = 0; s < e[i]; s++)
                    t.push(D("mpiece." + i));
                r.push(D("div", t))
            }
        if (n)
            for (s = 0; s < n; s++)
                r.push(D("div", D("mpiece.king")));
        return t > 0 && r.push(D("score", "+" + t)),
        D("div.material.material-" + o, r)
    }
    const Mo = {
        white: {},
        black: {}
    };
    function Po(e) {
        const t = e.data
          , o = e.chessground && e.chessground.state
          , n = t[e.flip ? "player" : "opponent"].color
          , r = t[e.flip ? "opponent" : "player"].color;
        let i, a = 0;
        if (t.pref.showCaptured) {
            //const t = o ? o.pieces : f.read(X(e.data, e.ply).fen);
            const t = o ? (objGA.setPieces(o.pieces),o.pieces) : f.read(X(e.data, e.ply).fen);
            i = function(e) {
                const t = {
                    white: {
                        king: 0,
                        queen: 0,
                        rook: 0,
                        bishop: 0,
                        knight: 0,
                        pawn: 0
                    },
                    black: {
                        king: 0,
                        queen: 0,
                        rook: 0,
                        bishop: 0,
                        knight: 0,
                        pawn: 0
                    }
                };
                for (const o of e.values()) {
                    const e = t[s.opposite(o.color)];
                    e[o.role] > 0 ? e[o.role]-- : t[o.color][o.role]++
                }
                return t
            }(t),
            a = function(e) {
                let t = 0;
                for (const o of e.values())
                    t += re[o.role] * ("white" === o.color ? 1 : -1);
                return t
            }(t) * ("white" === r ? 1 : -1)
        } else
            i = Mo;
        const c = t.player.checks || t.opponent.checks ? function(e, t) {
            const o = Object.assign({}, de);
            for (let n of e) {
                if (t < n.ply)
                    break;
                n.check && (n.ply % 2 == 1 ? o.white++ : o.black++)
            }
            return o
        }(e.data.steps, e.ply) : de;
        return e.nvui ? e.nvui.render(e) : D("div.round__app.variant-" + t.game.variant.key, {
            class: {
                "move-confirm": !(!e.moveToSubmit && !e.dropToSubmit)
            },
            hook: ae(bo)
        }, [D("div.round__app__board.main-board" + (e.data.pref.blindfold ? ".blindfold" : ""), {
            hook: window.lichess.hasTouchEvents ? void 0 : ce("wheel", t=>function(e, t) {
                return !!e.isPlaying() || (t.preventDefault(),
                t.deltaY > 0 ? Gt(e) : t.deltaY < 0 && Ft(e),
                e.redraw(),
                !1)
            }(e, t), void 0, !1)
        }, [fe(e), He(e)]), yo(e, n, "top") || ko(i[n], -a, "top", c[n]), ...go(e), yo(e, r, "bottom") || ko(i[r], a, "bottom", c[r]), e.keyboardMove ? Rt(e.keyboardMove) : null])
    }
    var To = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.bind = t.spinner = t.userLink = void 0,
        t.userLink = function(e, t) {
            const o = e.substring(0, 14);
            return K.h("a", {
                class: {
                    "user-link": !0,
                    ulpt: !0
                },
                attrs: {
                    href: "/@/" + e
                }
            }, t && "BOT" != t ? [K.h("span.title", t), o] : [o])
        }
        ,
        t.spinner = function() {
            return K.h("div.spinner", [K.h("svg", {
                attrs: {
                    viewBox: "0 0 40 40"
                }
            }, [K.h("circle", {
                attrs: {
                    cx: 20,
                    cy: 20,
                    r: 18,
                    fill: "none"
                }
            })])])
        }
        ,
        t.bind = function(e, t) {
            return {
                insert: o=>{
                    o.elm.addEventListener(e, t)
                }
            }
        }
    }
    ))
      , Co = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.presetView = t.presetCtrl = void 0;
        const o = {
            start: ["hi/Hello", "gl/Good luck", "hf/Have fun!", "u2/You too!"].map(n),
            end: ["gg/Good game", "wp/Well played", "ty/Thank you", "gtg/I've got to go", "bye/Bye!"].map(n)
        };
        function n(e) {
            const t = e.split("/");
            return {
                key: t[0],
                text: t[1]
            }
        }
        t.presetCtrl = function(e) {
            let t = e.initialGroup
              , n = [];
            return {
                group: ()=>t,
                said: ()=>n,
                setGroup(o) {
                    o !== t && (t = o,
                    o || (n = []),
                    e.redraw())
                },
                post(r) {
                    if (!t)
                        return;
                    o[t] && (n.includes(r.key) || (e.post(r.text),
                    n.push(r.key)))
                }
            }
        }
        ,
        t.presetView = function(e) {
            const t = e.group();
            if (!t)
                return;
            const n = o[t]
              , r = e.said();
            return n && r.length < 2 ? K.h("div.mchat__presets", n.map(t=>{
                const o = r.includes(t.key);
                return K.h("span", {
                    class: {
                        disabled: o
                    },
                    attrs: {
                        title: t.text,
                        disabled: o
                    },
                    hook: To.bind("click", ()=>{
                        !o && e.post(t)
                    }
                    )
                }, t.key)
            }
            )) : void 0
        }
    }
    ))
      , xo = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.form = t.text = t.json = void 0,
        t.json = function(e, t={}) {
            return fetch(e, Object.assign({
                headers: {
                    Accept: "application/vnd.lichess.v5+json"
                },
                cache: "no-cache",
                credentials: "same-origin"
            }, t)).then(e=>{
                if (e.ok)
                    return e.json();
                throw e.statusText
            }
            )
        }
        ,
        t.text = function(e, t={}) {
            return fetch(e, Object.assign({
                cache: "no-cache",
                credentials: "same-origin"
            }, t)).then(e=>{
                if (e.ok)
                    return e.text();
                throw e.statusText
            }
            )
        }
        ,
        t.form = function(e) {
            const t = new FormData;
            for (const o of Object.keys(e))
                t.append(o, e[o]);
            return t
        }
    }
    ))
      , So = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setNote = t.getNote = t.flag = t.userModInfo = void 0,
        t.userModInfo = e=>xo.json("/mod/chat-user/" + e),
        t.flag = (e,t,o)=>xo.json("/report/flag", {
            method: "post",
            body: xo.form({
                username: t,
                resource: e,
                text: o
            })
        }),
        t.getNote = e=>xo.text(o(e)),
        t.setNote = (e,t)=>xo.json(o(e), {
            method: "post",
            body: xo.form({
                text: t
            })
        });
        const o = e=>`/${e}/note`
    }
    ))
      , _o = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.noteView = t.noteCtrl = void 0,
        t.noteCtrl = function(e) {
            let t = e.text;
            const o = window.lichess.debounce(()=>{
                So.setNote(e.id, t || "")
            }
            , 1e3);
            return {
                id: e.id,
                trans: e.trans,
                text: ()=>t,
                fetch() {
                    So.getNote(e.id).then(o=>{
                        t = o || "",
                        e.redraw()
                    }
                    )
                },
                post(e) {
                    t = e,
                    o()
                }
            }
        }
        ,
        t.noteView = function(e) {
            const t = e.text();
            return null == t ? K.h("div.loading", {
                hook: {
                    insert: e.fetch
                }
            }, [To.spinner()]) : K.h("textarea", {
                attrs: {
                    placeholder: e.trans("typePrivateNotesHere")
                },
                hook: {
                    insert(o) {
                        const n = $(o.elm);
                        n.val(t).on("change keyup paste", ()=>{
                            e.post(n.val())
                        }
                        )
                    }
                }
            })
        }
    }
    ))
      , Oo = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.moderationView = t.lineAction = t.moderationCtrl = void 0,
        t.moderationCtrl = function(e) {
            let t, o = !1;
            const n = ()=>{
                t = void 0,
                o = !1,
                e.redraw()
            }
            ;
            return {
                loading: ()=>o,
                data: ()=>t,
                reasons: e.reasons,
                permissions: ()=>e.permissions,
                open: n=>{
                    const r = n.querySelector("a.user-link")
                      , i = n.querySelector("t").innerText
                      , s = r.href.split("/")[4];
                    e.permissions.timeout ? (o = !0,
                    So.userModInfo(s).then(n=>{
                        t = Object.assign(Object.assign({}, n), {
                            text: i
                        }),
                        o = !1,
                        e.redraw()
                    }
                    )) : t = {
                        id: s,
                        username: s,
                        text: i
                    },
                    e.redraw()
                }
                ,
                close: n,
                timeout(o, r) {
                    t && window.lichess.pubsub.emit("socket.send", "timeout", {
                        userId: t.id,
                        reason: o.key,
                        text: r
                    }),
                    n(),
                    e.redraw()
                }
            }
        }
        ,
        t.lineAction = ()=>K.h("i.mod", {
            attrs: {
                "data-icon": ""
            }
        }),
        t.moderationView = function(e) {
            if (!e)
                return;
            if (e.loading())
                return [K.h("div.loading", To.spinner())];
            const t = e.data();
            if (!t)
                return;
            const o = e.permissions()
              , n = t.history ? K.h("div.infos.block", [window.lichess.numberFormat(t.games || 0) + " games", t.troll ? "TROLL" : void 0, t.engine ? "ENGINE" : void 0, t.booster ? "BOOSTER" : void 0].map(e=>e && K.h("span", e)).concat([K.h("a", {
                attrs: {
                    href: "/@/" + t.username + "?mod"
                }
            }, "profile")]).concat(o.shadowban ? [K.h("a", {
                attrs: {
                    href: "/mod/" + t.username + "/communication"
                }
            }, "coms")] : [])) : void 0
              , r = o.timeout ? K.h("div.timeout.block", [K.h("strong", "Timeout 10 minutes for"), ...e.reasons.map(o=>K.h("a.text", {
                attrs: {
                    "data-icon": "p"
                },
                hook: To.bind("click", ()=>e.timeout(o, t.text))
            }, o.name))]) : K.h("div.timeout.block", [K.h("strong", "Moderation"), K.h("a.text", {
                attrs: {
                    "data-icon": "p"
                },
                hook: To.bind("click", ()=>e.timeout(e.reasons[0], t.text))
            }, "Timeout 10 minutes")])
              , i = t.history ? K.h("div.history.block", [K.h("strong", "Timeout history"), K.h("table", K.h("tbody.slist", {
                hook: {
                    insert: ()=>window.lichess.pubsub.emit("content_loaded")
                }
            }, t.history.map((function(e) {
                return K.h("tr", [K.h("td.reason", e.reason), K.h("td.mod", e.mod), K.h("td", K.h("time.timeago", {
                    attrs: {
                        datetime: e.date
                    }
                }))])
            }
            ))))]) : void 0;
            return [K.h("div.top", {
                key: "mod-" + t.id
            }, [K.h("span.text", {
                attrs: {
                    "data-icon": ""
                }
            }, [To.userLink(t.username)]), K.h("a", {
                attrs: {
                    "data-icon": "L"
                },
                hook: To.bind("click", e.close)
            })]), K.h("div.mchat__content.moderation", [K.h("i.line-text.block", ['"', t.text, '"']), n, r, i])]
        }
    }
    ))
      , Do = n((function(e, t) {
        function o(e) {
            return void 0 !== e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.prop = t.empty = t.defined = void 0,
        t.defined = o,
        t.empty = function(e) {
            return !e || 0 === e.length
        }
        ,
        t.prop = function(e) {
            let t = e;
            return function(e) {
                return o(e) && (t = e),
                t
            }
        }
    }
    ))
      , Ao = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const o = window.lichess;
        t.default = function(e, t) {
            const n = e.data;
            n.domVersion = 1;
            const r = {
                instance: void 0,
                loaded: !1,
                enabled: Do.prop(!!n.palantir)
            }
              , i = ["discussion"];
            e.noteId && i.push("note"),
            e.plugin && i.push(e.plugin.tab.key);
            const s = o.storage.make("chat.tab")
              , a = s.get();
            let c;
            const l = {
                tab: i.find(e=>e === a) || i[0],
                enabled: e.alwaysEnabled || !o.storage.get("nochat"),
                placeholderKey: "talkInChat",
                loading: !1,
                timeout: e.timeout,
                writeable: e.writeable
            };
            i.length > 1 && "discussion" === l.tab && o.storage.get("nochat") && (l.tab = i[1]);
            const d = function(e) {
                (e = e.trim()) && (e.length > 140 ? alert("Max length: 140 chars. " + e.length + " chars used.") : o.pubsub.emit("socket.send", "talk", e))
            }
              , u = o.trans(e.i18n);
            function p() {
                (e.permissions.timeout || e.permissions.local) && (c = Oo.moderationCtrl({
                    reasons: e.timeoutReasons || [{
                        key: "other",
                        name: "Inappropriate behavior"
                    }],
                    permissions: e.permissions,
                    redraw: t
                }),
                e.loadCss("chat.mod"))
            }
            p();
            const h = e.noteId ? _o.noteCtrl({
                id: e.noteId,
                text: e.noteText,
                trans: u,
                redraw: t
            }) : void 0
              , f = Co.presetCtrl({
                initialGroup: e.preset,
                post: d,
                redraw: t
            })
              , m = [["socket.in.message", function(e) {
                n.lines.push(e);
                const o = n.lines.length;
                o > 200 && (n.lines.splice(0, o - 200 + 50),
                n.domVersion++),
                t()
            }
            ], ["socket.in.chat_timeout", function(e) {
                n.lines.forEach(t=>{
                    t.u && t.u.toLowerCase() == e && (t.d = !0)
                }
                ),
                e == n.userId && (l.timeout = !0),
                n.domVersion++,
                t()
            }
            ], ["socket.in.chat_reinstate", function(e) {
                e == n.userId && (l.timeout = !1,
                t())
            }
            ], ["chat.writeable", function(e) {
                l.writeable = e,
                t()
            }
            ], ["chat.permissions", function(o) {
                let n;
                for (n in o)
                    e.permissions[n] = o[n];
                p(),
                t()
            }
            ], ["palantir.toggle", r.enabled]];
            m.forEach(([e,t])=>o.pubsub.on(e, t));
            const g = ()=>o.pubsub.emit("chat.enabled", l.enabled);
            return g(),
            {
                data: n,
                opts: e,
                vm: l,
                allTabs: i,
                setTab(e) {
                    l.tab = e,
                    s.set(e),
                    "discussion" === e && o.requestIdleCallback(()=>$(".mchat__say").focus()),
                    t()
                },
                moderation: ()=>c,
                note: h,
                preset: f,
                post: d,
                trans: u,
                plugin: e.plugin,
                setEnabled(e) {
                    l.enabled = e,
                    g(),
                    e ? o.storage.remove("nochat") : o.storage.set("nochat", "1"),
                    t()
                },
                redraw: t,
                palantir: r,
                destroy: ()=>{
                    m.forEach(([e,t])=>o.pubsub.off(e, t))
                }
            }
        }
    }
    ))
      , jo = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.report = t.hasTeamUrl = t.skip = void 0,
        t.skip = function(e) {
            return n(e) && "1" != window.lichess.storage.get("chat-spam")
        }
        ,
        t.hasTeamUrl = function(e) {
            return !!e.match(r)
        }
        ,
        t.report = function(e) {
            n(e) && ($.post("/jslog/" + window.location.href.substr(-12) + "?n=spam"),
            window.lichess.storage.set("chat-spam", "1"))
        }
        ;
        const o = new RegExp(["xcamweb.com", "(^|[^i])chess-bot", "chess-cheat", "coolteenbitch", "letcafa.webcam", "tinyurl.com/", "wooga.info/", "bit.ly/", "wbt.link/", "eb.by/", "001.rs/", "shr.name/", "u.to/", ".3-a.net", ".ssl443.org", ".ns02.us", ".myftp.info", ".flinkup.com", ".serveusers.com", "badoogirls.com", "hide.su", "wyon.de", "sexdatingcz.club"].map(e=>e.replace(/\./g, "\\.").replace(/\//g, "\\/")).join("|"));
        function n(e) {
            return !!e.match(o)
        }
        const r = /lichess\.org\/team\//
    }
    ))
      , Lo = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isMoreThanText = t.enhance = void 0,
        t.enhance = function(e, t) {
            const o = window.lichess.escapeHtml(e)
              , n = o.replace(s, c).replace(r, i);
            return t && n === o ? function(e) {
                return e.replace(l, d)
            }(n) : n
        }
        ;
        const o = /[&<>"@]/
          , n = /\.\w/;
        t.isMoreThanText = function(e) {
            return o.test(e) || n.test(e)
        }
        ;
        const r = /\b(https?:\/\/|lichess\.org\/)[-–—\w+&'@#\/%?=()~|!:,.;]+[\w+&@#\/%=~|]/gi;
        function i(e, t) {
            if (e.includes("&quot;"))
                return e;
            return '<a target="_blank" rel="nofollow noopener noreferrer" href="' + ("lichess.org/" === t ? "https://" + e : e) + '">' + e.replace(/^https:\/\//, "") + "</a>"
        }
        const s = /(^|[^\w@#/])@([\w-]{2,})/g
          , a = /^[a-h][2-7]$/;
        function c(e, t, o) {
            return o.length > 20 || o.match(a) ? e : t + '<a href="/@/' + o + '">@' + o + "</a>"
        }
        const l = /\b(\d+)\s*(\.+)\s*(?:[o0-]+[o0]|[NBRQKP]?[a-h]?[1-8]?[x@]?[a-z][1-8](?:=[NBRQK])?)\+?\#?[!\?=]{0,5}/gi;
        function d(e, t, o) {
            if (t < 1 || t > 200)
                return e;
            return '<a class="jump" data-ply="' + (2 * t - (o.length > 1 ? 0 : 1)) + '">' + e + "</a>"
        }
    }
    ))
      , Eo = n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const o = /^\/w(?:hisper)?\s/;
        function n(e) {
            if (!e.vm.writeable)
                return;
            if (e.data.loginRequired && !e.data.userId || e.data.restricted)
                return K.h("input.mchat__say", {
                    attrs: {
                        placeholder: e.trans("loginToChat"),
                        disabled: !0
                    }
                });
            let t;
            return t = e.vm.timeout ? e.trans("youHaveBeenTimedOut") : e.opts.blind ? "Chat" : e.trans.noarg(e.vm.placeholderKey),
            K.h("input.mchat__say", {
                attrs: {
                    placeholder: t,
                    autocomplete: "off",
                    maxlength: 140,
                    disabled: e.vm.timeout || !e.vm.writeable
                },
                hook: {
                    insert(t) {
                        i(e, t.elm)
                    }
                }
            })
        }
        let r;
        t.default = function(e) {
            if (!e.vm.enabled)
                return [];
            const t = t=>{
                const o = t.elm;
                if (e.data.lines.length > 5) {
                    (0 === o.scrollTop || o.scrollTop > o.scrollHeight - o.clientHeight - 100) && (o.scrollTop = 999999,
                    setTimeout(e=>o.scrollTop = 999999, 300))
                }
            }
              , o = e.moderation()
              , r = [K.h("ol.mchat__messages.chat-v-" + e.data.domVersion, {
                attrs: {
                    role: "log",
                    "aria-live": "polite",
                    "aria-atomic": !1
                },
                hook: {
                    insert(n) {
                        const r = $(n.elm).on("click", "a.jump", e=>{
                            window.lichess.pubsub.emit("jump", e.target.getAttribute("data-ply"))
                        }
                        );
                        o ? r.on("click", ".mod", e=>o.open(e.target.parentNode)) : r.on("click", ".flag", t=>function(e, t) {
                            const o = t.querySelector("a.user-link")
                              , n = t.querySelector("t").innerText;
                            o && confirm(`Report "${n}" to moderators?`) && So.flag(e.data.resourceId, o.href.split("/")[4], n)
                        }(e, t.target.parentNode)),
                        t(n)
                    },
                    postpatch: (e,o)=>t(o)
                }
            }, s(e).map(t=>function(e, t) {
                const o = function(e, t) {
                    if (Lo.isMoreThanText(e)) {
                        const o = function(e) {
                            return (t,o)=>{
                                o.data.lichessChat !== t.data.lichessChat && (o.elm.innerHTML = Lo.enhance(o.data.lichessChat, e))
                            }
                        }(t);
                        return K.h("t", {
                            lichessChat: e,
                            hook: {
                                create: o,
                                update: o
                            }
                        })
                    }
                    return K.h("t", e)
                }(t.t, e.opts.parseMoves);
                if ("lichess" === t.u)
                    return K.h("li.system", o);
                if (t.c)
                    return K.h("li", [K.h("span.color", "[" + t.c + "]"), o]);
                const n = K.thunk("a", t.u, To.userLink, [t.u, t.title]);
                return K.h("li", e.moderation() ? [t.u ? Oo.lineAction() : null, n, o] : [e.data.userId && t.u && e.data.userId != t.u ? K.h("i.flag", {
                    attrs: {
                        "data-icon": "!",
                        title: "Report"
                    }
                }) : null, n, o])
            }(e, t))), n(e)]
              , i = Co.presetView(e.preset);
            return i && r.push(i),
            r
        }
        ;
        const i = (e,t)=>{
            const n = window.lichess.tempStorage.make("chatInput");
            n.get() && (t.value = n.get(),
            n.remove(),
            t.focus()),
            t.addEventListener("keypress", t=>setTimeout(()=>{
                const r = t.target
                  , i = r.value
                  , s = e.opts.public;
                n.set(r.value),
                10 == t.which || 13 == t.which ? "" === i ? $(".keyboard-move input").focus() : (jo.report(i),
                s && jo.hasTeamUrl(i) ? alert("Please don't advertise teams in the chat.") : e.post(i),
                r.value = "",
                n.remove(),
                s || r.classList.remove("whisper")) : (r.removeAttribute("placeholder"),
                s || r.classList.toggle("whisper", !!i.match(o)))
            }
            )),
            window.Mousetrap.bind("c", ()=>(t.focus(),
            !1)),
            window.Mousetrap(t).bind("esc", ()=>t.blur());
            const i = ["touchstart", "mousedown"];
            r && i.forEach(e=>document.body.removeEventListener(e, r, {
                capture: !0
            })),
            r = e=>{
                e.shiftKey || 2 === e.buttons || 2 === e.button || t.blur()
            }
            ,
            t.onfocus = ()=>i.forEach(e=>document.body.addEventListener(e, r, {
                passive: !0,
                capture: !0
            })),
            t.onblur = ()=>i.forEach(e=>document.body.removeEventListener(e, r, {
                capture: !0
            }))
        }
        ;
        function s(e) {
            let t, o = [];
            return e.data.lines.forEach(n=>{
                var r, i;
                n.d || t && (i = n,
                (r = t).d && i.d && r.u === i.u) || n.r && (n.u || "").toLowerCase() != e.data.userId || jo.skip(n.t) || o.push(n),
                t = n
            }
            ),
            o
        }
    }
    ))
      , No = n((function(e, t) {
        function o(e) {
            const t = e.palantir;
            if (t.enabled())
                return t.instance ? t.instance.render(K.h) : K.h("div.mchat__tab.palantir.palantir-slot", {
                    attrs: {
                        "data-icon": "",
                        title: "Voice chat"
                    },
                    hook: To.bind("click", ()=>{
                        if (!t.loaded) {
                            t.loaded = !0;
                            const o = window.lichess;
                            o.loadScript("javascripts/vendor/peerjs.min.js").then(()=>{
                                o.loadScript(o.jsModule("palantir")).then(()=>{
                                    t.instance = window.Palantir.palantir({
                                        uid: e.data.userId,
                                        redraw: e.redraw
                                    }),
                                    e.redraw()
                                }
                                )
                            }
                            )
                        }
                    }
                    )
                })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e) {
            const t = e.moderation();
            return K.h("section.mchat" + (e.opts.alwaysEnabled ? "" : ".mchat-optional"), {
                class: {
                    "mchat-mod": !!t
                },
                hook: {
                    destroy: e.destroy
                }
            }, Oo.moderationView(t) || function(e) {
                const t = e.vm.tab;
                return [K.h("div.mchat__tabs.nb_" + e.allTabs.length, [...e.allTabs.map(o=>function(e, t, o) {
                    return K.h("div.mchat__tab." + t, {
                        class: {
                            "mchat__tab-active": t === o
                        },
                        hook: To.bind("click", ()=>e.setTab(t))
                    }, function(e, t) {
                        return "discussion" === t ? [K.h("span", e.data.name), e.opts.alwaysEnabled ? void 0 : K.h("input", {
                            attrs: {
                                type: "checkbox",
                                title: e.trans.noarg("toggleTheChat"),
                                checked: e.vm.enabled
                            },
                            hook: To.bind("change", t=>{
                                e.setEnabled(t.target.checked)
                            }
                            )
                        })] : "note" === t ? [K.h("span", e.trans.noarg("notes"))] : e.plugin && t === e.plugin.tab.key ? [K.h("span", e.plugin.tab.name)] : []
                    }(e, t))
                }(e, o, t)), o(e)]), K.h("div.mchat__content." + t, "note" === t && e.note ? [_o.noteView(e.note)] : e.plugin && t === e.plugin.tab.key ? [e.plugin.view()] : Eo.default(e))]
            }(e))
        }
    }
    ))
      , Bo = o(n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e, t) {
            const o = K.init([H.default, G.default]);
            let n, r;
            r = Ao.default(t, (function() {
                n = o(n, No.default(r))
            }
            ));
            const i = No.default(r);
            return e.innerHTML = "",
            n = o(e, i),
            r
        }
    }
    )));
    var Ro = o(n((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.menuHover = void 0,
        t.menuHover = ()=>requestAnimationFrame((function() {
            if (window.lichess.hasTouchEvents)
                return;
            let e, t;
            const o = o=>{
                e = o.pageX,
                t = o.pageY
            }
            ;
            let n = {};
            $("#topnav.hover").each((function() {
                const r = $(this).removeClass("hover")
                  , i = ()=>r.toggleClass("hover")
                  , s = function() {
                    Math.sqrt((n.pX - e) * (n.pX - e) + (n.pY - t) * (n.pY - t)) < 10 ? (r.off(n.event, o),
                    delete n.timeoutId,
                    n.isActive = !0,
                    i()) : (n.pX = e,
                    n.pY = t,
                    n.timeoutId = setTimeout(s, 100))
                };
                var a = function(e) {
                    n.timeoutId && (n.timeoutId = clearTimeout(n.timeoutId));
                    var t = n.event = "mousemove";
                    if ("mouseenter" == e.type) {
                        if (n.isActive || e.originalEvent.buttons)
                            return;
                        n.pX = e.pageX,
                        n.pY = e.pageY,
                        r.off(t, o).on(t, o),
                        n.timeoutId = setTimeout(s, 100)
                    } else {
                        if (!n.isActive)
                            return;
                        r.off(t, o),
                        n = {},
                        i()
                    }
                };
                r.on("mouseenter", a).on("mouseleave", a)
            }
            ))
        }
        ))
    }
    )));
    return window.LichessChat = Bo,
    window.Chessground = C.Chessground,
    e.app = function(e) {
        const t = z([F, U]);
        let o, n;
        function r() {
            o = t(o, Po(n))
        }
        n = new Vt(e,r);
        const i = Po(n);
        return e.element.innerHTML = "",
        o = t(e.element, i),
        window.addEventListener("resize", r),
        n.isPlaying() && Ro.menuHover(),
        {
            socketReceive: n.socket.receive,
            moveOn: n.moveOn
        }
    }
    ,
    e.boot = function(e) {
        var t;
        const o = window.lichess
          , n = document.querySelector(".round__app")
          , r = e.data;
        let i, s;
        function a() {
            r.tournament && $(".game__tournament .clock").each((function() {
                $(this).clock({
                    time: parseFloat($(this).data("time"))
                })
            }
            ))
        }
        function c(e) {
            if (!e.player.spectator)
                return e.steps.length < 4 ? "start" : e.game.status.id >= 30 ? "end" : void 0
        }
        r.tournament && $("body").data("tournament-id", r.tournament.id),
        o.socket = o.StrongSocket(r.url.socket, r.player.version, {
            options: {
                name: "round"
            },
            params: {
                userTv: r.userTv && r.userTv.id
            },
            receive(e, t) {
                i.socketReceive(e, t)
            },
            events: {
                tvSelect(e) {
                    r.tv && r.tv.channel == e.channel ? o.reload() : $(".tv-channels ." + e.channel + " .champion").html(e.player ? [e.player.title, e.player.name, e.player.rating].filter(e=>e).join("&nbsp") : "Anonymous")
                },
                end() {
                    $.ajax({
                        url: [r.tv ? "/tv" : "", r.game.id, r.player.color, "sides"].join("/"),
                        success: function(e) {
                            const t = $(e)
                              , n = t.find(".game__meta");
                            n.length && $(".game__meta").replaceWith(n),
                            $(".crosstable").replaceWith(t.find(".crosstable")),
                            a(),
                            o.pubsub.emit("content_loaded")
                        }
                    })
                },
                tourStanding(t) {
                    e.chat && e.chat.plugin && s && (e.chat.plugin.set(t),
                    s.redraw())
                }
            }
        }),
        e.element = n,
        e.socketSend = o.socket.send,
        r.tournament || r.simul || r.swiss || (e.onChange = e=>{
            s && s.preset.setGroup(c(e))
        }
        ),
        i = window.LichessRound.app(e);
        const l = e.chat;
        var d, u;
        l && ((null === (t = r.tournament) || void 0 === t ? void 0 : t.top) ? (l.plugin = (d = r.tournament.top,
        u = r.tournament.team,
        {
            set(e) {
                d = e
            },
            tab: {
                key: "tourStanding",
                name: e.i18n.standing
            },
            view: ()=>D("div", {
                hook: ae(e=>{
                    window.lichess.loadCssPath("round.tour-standing")
                }
                )
            }, [u ? D("h3.text", {
                attrs: {
                    "data-icon": "f"
                }
            }, u.name) : null, D("table.slist", [D("tbody", d.map((e,t)=>D("tr." + e.n, [D("td.name", [D("span.rank", "" + (t + 1)), D("a.user-link.ulpt", {
                attrs: {
                    href: "/@/" + e.n
                }
            }, (e.t ? e.t + " " : "") + e.n)]), D("td.total", e.f ? {
                class: {
                    "is-gold": !0
                },
                attrs: {
                    "data-icon": "Q"
                }
            } : {}, "" + e.s)])))])])
        }),
        l.alwaysEnabled = !0) : r.simul || r.swiss || (l.preset = c(r),
        l.parseMoves = !0),
        l.noteId && (l.noteAge || 0) < 10 && (l.noteText = ""),
        o.makeChat(l, e=>{
            s = e
        }
        )),
        a(),
        $(".round__now-playing .move-on input").change(i.moveOn.toggle).prop("checked", i.moveOn.get()).on("click", "a", (function() {
            return o.hasToReload = !0,
            !0
        }
        )),
        0 === location.pathname.lastIndexOf("/round-next/", 0) && history.replaceState(null, "", "/" + r.game.id),
        $("#zentog").click(()=>o.pubsub.emit("zen")),
        o.storage.make("reload-round-tabs").listen(o.reload)
    }
    ,
    e
}({});



const objGA= {

   PieceKeys:[
   'q', //pawn to left
   'w', //pawn up
   'e', //pawn to right
   '*', //king
   ' ', //bishop
   '-', //rook
   '+', //rook with a square
   '0', //knight
   't', //knight with a square
   'r'  //queen
   ],
   /*setKeys: () => {
   objGA.PieceKeys.forEach((key)=>{objGA.PieceNames[key]=})
   }*/
   PremoveDirections:
   {
   //pawn:
   },
   
   setKeys: () => {
   objGA.PieceNames={
      [objGA.PieceKeys[0]]:{p:'pawn',d:'l'},
      [objGA.PieceKeys[1]]:{p:'pawn',d:'u'},
      [objGA.PieceKeys[2]]:{p:'pawn',d:'r'},
      [objGA.PieceKeys[3]]:{p:'king'},
      [objGA.PieceKeys[4]]:{p:'bishop'},
      [objGA.PieceKeys[5]]:{p:'rook',d:'l'},
      [objGA.PieceKeys[6]]:{p:'rook',d:'r'},
      [objGA.PieceKeys[7]]:{p:'knight',d:'l'},
      [objGA.PieceKeys[8]]:{p:'knight',d:'r'},
      [objGA.PieceKeys[9]]:{p:'queen'}
   }
   console.log(objGA.PieceNames);
   },
   //console.log(objGA.PieceNames),
   moves(moves) {
   objGA.legalmoves = moves;
   
   console.log(objGA.legalmoves)
   },
   moveC(moveC) {
   objGA.justplayed = moveC;
   console.log(objGA.justplayed)
   },
   whoseM(color) {
   objGA.player = color;
   console.log(objGA.player)
   },
   keys: [],
   keysT: [],
   //objGA.keys = objGA.keysT = []1,
   FixDests: ()=> {
   try
   {
       objGA.beginning=false;
   /*
   for (const square in objGA.inMoves)
   {
   objGA.PieceMoves[square]=[objGA.inMoves[square],objGA.pieces[square]];
   }*/
   
   //})
   /*
   for (const square in objGA.inMoves)
   {
   objGA.MovePiece[objGA.PieceMoves[square][1].role]=objGA.MovePiece[objGA.PieceMoves[square][1].role]||[];
   objGA.inMoves[square].forEach((dest)=>{
   objGA.MovePiece[objGA.PieceMoves[square][1].role].push(dest);
   })
   }*/
   
   /*for (const square in objGA.inMoves)
   {
   //objGA.DestPiece[objGA.PieceMoves[square][1].role]=objGA.MovePiece[objGA.PieceMoves[square][1].role]||[];
   objGA.inMoves[square].forEach((dest)=>{
   objGA.DestPiece[dest]=objGA.DestPiece[dest]||{};
   objGA.DestPiece[dest][objGA.PieceMoves[square][1].role]=objGA.DestPiece[dest][objGA.PieceMoves[square][1].role]||[];
   objGA.DestPiece[dest][objGA.PieceMoves[square][1].role].push(square);
   })
   }*/
   
   for (const square in objGA.inMoves)
   {
   //objGA.DestPiece[objGA.PieceMoves[square][1].role]=objGA.MovePiece[objGA.PieceMoves[square][1].role]||[];
   objGA.inMoves[square].forEach((dest)=>{
   objGA.DestPiece[dest]=objGA.DestPiece[dest]||{};
   objGA.DestPiece[dest][objGA.pieces[square].role]=objGA.DestPiece[dest][objGA.pieces[square].role]||[];
   objGA.DestPiece[dest][objGA.pieces[square].role].push(square);
   })
   }
   /*for (const square in objGA.legalmoves)
   {
   objGA.legalmoves[square]['piece']=objGA.pieces[square];
   
   }*/
   //console.log(objGA.MovePiece);
   console.log(objGA.DestPiece);
   //console.log(objGA.PieceMoves);
   console.log(objGA.pieces);
   } catch {console.log('firstCall')}
   
   },
   ConvertToDigits: {
   a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8
   },
   ConvertToLetters: {
   1:'a',2:'b',3:'c',4:'d',5:'e',6:'f',7:'g',8:'h'
   },
   allSquares:[ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 1, 6 ], [ 1, 7 ], [ 1, 8 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 2, 6 ], [ 2, 7 ], [ 2, 8 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 3, 6 ], [ 3, 7 ], [ 3, 8 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 4, 6 ], [ 4, 7 ], [ 4, 8 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 5, 6 ], [ 5, 7 ], [ 5, 8 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 6, 6 ], [ 6, 7 ], [ 6, 8 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 7, 6 ], [ 7, 7 ], [ 7, 8 ], [ 8, 1 ], [ 8, 2 ], [ 8, 3 ], [ 8, 4 ], [ 8, 5 ], [ 8, 6 ], [ 8, 7 ], [ 8, 8 ] ],
   
   CalculatePrem: (e,t,o=true)=>{
   let destsReturn=[];
   
   
   },
   Pawn: (c,d)=>{
         console.log(d);
         let wherePieces = [];
         for (const coord in objGA.pieces)
         {
         if(objGA.pieces[coord].role === "pawn" && objGA.pieces[coord].color === objGA.myCol)
           {
               let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
               //wherePieces.push(coordDigits);
              objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
              wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
   
           }
         }
    console.log(wherePieces);
        let possibles=[];
        if (c[1]===4&&d==='u') {
        //possibles[0] = [c[0],c[1]-2];
       // console.log(possibles);
   possibles = wherePieces.filter(coord => (coord[0]===c[0])&&(coord[1]===2||coord[1]===3));
   console.log(possibles);
   if (possibles.length>1)
   {objGA.executeMove(c,[c[0],2]);
                                   } else if
    (possibles.length===1) {objGA.executeMove(c,possibles[0]);
                           }
                 }
                 else if (c[1]>2)
                 {
   switch(d) {
     case 'l':
       possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(c[0]-coord[0]===-1));
       console.log(possibles);
       if (possibles.length!==0)
       {objGA.executeMove(c,possibles[0]);  }
       break;
     case 'u':
       possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(c[0]===coord[0]));
       console.log(possibles);
       if (possibles.length!==0)
       {objGA.executeMove(c,possibles[0]); }
       break;
     case 'r':
       possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(c[0]-coord[0]===1));
       console.log(possibles);
           if (possibles.length!==0)
      { objGA.executeMove(c,possibles[0]); }
       break;
       default:
   }
   
                 //if (c[0]===1)
                   //{possibles.push([c[0],c[1]-1],[c[0]+1,c[1]-1])} else if (c[0]===8) {possibles.push([c[0],c[1]-1],[c[0]-1,c[1]-1])} else {possibles.push([c[0]-1,c[1]-1],[c[0],c[1]-1],[c[0]+1,c[1]-1])}
                // possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(Math.abs(c[0]-coord[0])<2));
                 //console.log(possibles);
                        } ;
   },
   Knight: (c,d=void 0)=>{
         //let possibles=[];
         let wherePieces = [];
         for (const coord in objGA.pieces)
         {
         if(objGA.pieces[coord].role === "knight" && objGA.pieces[coord].color === objGA.myCol)
           {
               let coordDigits;
       if (objGA.myCol==='white'){
                   coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
               } else {
                   coordDigits=Number((9-objGA.ConvertToDigits[coord[0]])*10+(9-coord[1]));
               }
              //wherePieces.push(coordDigits);
               //objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
              //wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
              wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]);
           }
         }
          console.log(wherePieces);
         let possibles = wherePieces.filter(coord => ((Math.abs(coord[0]-c[0])===1&&Math.abs(coord[1]-c[1])===2)||(Math.abs(coord[1]-c[1])===1&&Math.abs(coord[0]-c[0])===2))&&(coord[0]!==c[0]||coord[1]!==c[1]));
         console.log(possibles);
         if (possibles.length===1) {
           objGA.executeMove(c,possibles[0]);
                                   } else if (possibles.length>1) {
   let rKcoord=objGA.ifTwoPieces('rightKnight');
   if (d==='r') {
     objGA.executeMove(c,rKcoord);
   }
       else {
     (possibles[0][0]===rKcoord[0]&&possibles[0][1]===rKcoord[1]) ? objGA.executeMove(c,possibles[1]) : objGA.executeMove(c,possibles[0]);
       }
   
   
   
   
   
                                   }
   },
   Bishop: (c)=>{
         let wherePieces = [];
         for (const coord in objGA.pieces)
         {
         if(objGA.pieces[coord].role === "bishop" && objGA.pieces[coord].color === objGA.myCol)
           {
               let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
              //wherePieces.push(coordDigits);
               objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
              wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
           }
         }
    console.log(wherePieces);
         let possibles = wherePieces.filter(coord => (Math.abs(coord[0]-c[0])===Math.abs(coord[1]-c[1]))&&(coord[0]!==c[0]||coord[1]!==c[1]));
         console.log(possibles);
         if (possibles.length!==0)
         {objGA.executeMove(c,possibles[0]);   }
   },
   Rook: (c,d=void 0)=>{
       let wherePieces = [];
         for (const coord in objGA.pieces)
         {
         if(objGA.pieces[coord].role === "rook" && objGA.pieces[coord].color === objGA.myCol)
           {
              let coordDigits;
       if (objGA.myCol==='white'){
                   coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
               } else {
                   coordDigits=Number((9-objGA.ConvertToDigits[coord[0]])*10+(9-coord[1]));
               }
               //wherePieces.push(coordDigits);
               //objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
             // wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
             wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]);
           }
         }
          console.log(wherePieces);
         let possibles = wherePieces.filter(coord => (coord[0]===c[0]||coord[1]===c[1])&&(coord[0]!==c[0]||coord[1]!==c[1]));
         console.log(possibles);
         if (possibles.length===1) {
           objGA.executeMove(c,possibles[0]);
                                   } else if (possibles.length>1) {
   
   let rRcoord=objGA.ifTwoPieces('rightRook');
   if (d==='r') {
      objGA.executeMove(c,rRcoord);
   }
       else {
     (possibles[0][0]===rRcoord[0]&&possibles[0][1]===rRcoord[1]) ? objGA.executeMove(c,possibles[1]) : objGA.executeMove(c,possibles[0]);
       }
   
   
   
   
                                   }
   },
   Queen: (c)=>{
         let wherePieces = [];
         for (const coord in objGA.pieces)
         {
         if(objGA.pieces[coord].role === "queen" && objGA.pieces[coord].color === objGA.myCol)
           {
               let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
               //wherePieces.push(coordDigits);
               objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
              wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
           }
         }
          console.log(wherePieces);
         let possibles = wherePieces.filter(coord => ((coord[0]===c[0]||coord[1]===c[1])||(Math.abs(coord[0]-c[0])===Math.abs(coord[1]-c[1]))&&(Math.abs(coord[1]-c[1])===Math.abs(coord[0]-c[0])))&&(coord[0]!==c[0]||coord[1]!==c[1]));
         console.log(possibles);
         if (possibles.length===1) {
           objGA.executeMove(c,possibles[0]);
                                   } else {
                                   objGA.executeMove(c,possibles,void 0,true)
                                   }
   },
   King: (c)=>{
         let wherePieces = [];
         for (const coord in objGA.pieces)
         {
         if(objGA.pieces[coord].role === "king" && objGA.pieces[coord].color === objGA.myCol)
           {
               let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
               //wherePieces.push(coordDigits);
               objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
              wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
           }
         }
          console.log(wherePieces);
         let possibles = wherePieces.filter(coord => (Math.abs(coord[0]-c[0])===1&&Math.abs(coord[1]-c[1])===1)||(((coord[1]===1&&c[1]===1)||(Math.abs(coord[0]-c[0])<2&&Math.abs(coord[1]-c[1])<2))&&(coord[0]!==c[0]||coord[1]!==c[1])));
         console.log(possibles);
         if (possibles.length!==0)
         {objGA.executeMove(c,possibles[0]);  }
   },
   
   
   
   FixPremoves: (x,y)=> {
   console.log('oppmove');
   const coord=[x,y];
   let ExistingKeys;
   //let direction;
   let Fixedlength=objGA.keysT.length;
   for (let i=0;i<Fixedlength;i++)
   {
       ExistingKeys=objGA.PieceNames[objGA.keysT[0]];
   
       if (ExistingKeys){
   let whatpiece=ExistingKeys.p||void 0;
   
   
   console.log(whatpiece);
   let direction;
   switch(whatpiece) {
     case 'pawn':
       direction=ExistingKeys.d||void 0;
       objGA.Pawn(coord,direction);
       break;
     case 'knight':
     direction=ExistingKeys.d||void 0;
       objGA.Knight(coord,direction);
       break;
     case 'bishop':
       objGA.Bishop(coord);
       break;
     case 'rook':
     direction=ExistingKeys.d||void 0;
       objGA.Rook(coord,direction);
       break;
     case 'queen':
       objGA.Queen(coord);
       break;
     case 'king':
       objGA.King(coord);
       break;
     default:
       // code block
   }
   
   }
   objGA.keysT.splice(0, 1);
   }
                     },
   
   
   KnightAndRooks: () => {
     let KnightClass=document.getElementsByClassName(objGA.myCol+" knight");
     let RookClass=document.getElementsByClassName(objGA.myCol+" rook");
     let n0,n1;
     (objGA.myCol === 'white' && (objGA.n0=n0=0, objGA.n1=n1=1)) || (objGA.n0=n0=1, objGA.n1=n1=0);
   
   if (KnightClass.length>0) {
       objGA.leftKnight=KnightClass[n0]; objGA.rightKnight=KnightClass[n1];
       if (objGA.rightKnight) {
           if (n1===1) {
   objGA.rightKnight.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MXtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MntmaWxsOiMzRUFGNEU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMTgyMTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fTwvc3R5bGU+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTIyLDEwYzEwLjUsMSwxNi41LDgsMTYsMjlIMTVjMC05LDEwLTYuNSw4LTIxIi8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTI0LDE4YzAuNCwyLjktNS41LDcuNC04LDljLTMsMi0yLjgsNC4zLTUsNGMtMS0wLjksMS40LTMsMC0zYy0xLDAsMC4yLDEuMi0xLDJjLTEsMC00LDEtNC00YzAtMiw2LTEyLDYtMTJzMS45LTEuOSwyLTMuNWMtMC43LTEtMC41LTItMC41LTNjMS0xLDMsMi41LDMsMi41aDJjMCwwLDAuOC0yLDIuNS0zYzEsMCwxLDMsMSwzIi8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTkuNSwyNS41QzkuNSwyNS44LDkuMywyNiw5LDI2cy0wLjUtMC4yLTAuNS0wLjVTOC43LDI1LDksMjVTOS41LDI1LjIsOS41LDI1LjV6IE0xNC45LDE1LjdjLTAuNCwwLjctMC45LDEuMi0xLjIsMS4xYy0wLjItMC4xLTAuMS0wLjgsMC4zLTEuNWMwLDAsMCwwLDAsMGMwLjQtMC43LDAuOS0xLjIsMS4yLTEuMUMxNS41LDE0LjMsMTUuNCwxNSwxNC45LDE1LjdDMTQuOSwxNS43LDE0LjksMTUuNywxNC45LDE1Ljd6Ii8+PHJlY3QgeD0iMjguOCIgeT0iMjgiIGNsYXNzPSJzdDIiIHdpZHRoPSIxMy44IiBoZWlnaHQ9IjEzLjgiLz48L2c+PC9zdmc+')";
   
           } else {
   objGA.rightKnight.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uc3Qxe2ZpbGw6I0VDRUNFQztzdHJva2U6I0VDRUNFQztzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MntmaWxsOiNFQ0VDRUM7fS5zdDN7ZmlsbDojM0VBRjRFO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoxLjE4MjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMiwxMGMxMC41LDEsMTYuNSw4LDE2LDI5SDE1YzAtOSwxMC02LjUsOC0yMSIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNCwxOGMwLjQsMi45LTUuNSw3LjQtOCw5Yy0zLDItMi44LDQuMy01LDRjLTEtMC45LDEuNC0zLDAtM2MtMSwwLDAuMiwxLjItMSwyYy0xLDAtNCwxLTQtNGMwLTIsNi0xMiw2LTEyczEuOS0xLjksMi0zLjVjLTAuNy0xLTAuNS0yLTAuNS0zYzEtMSwzLDIuNSwzLDIuNWgyYzAsMCwwLjgtMiwyLjUtM2MxLDAsMSwzLDEsMyIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05LjUsMjUuNUM5LjUsMjUuOCw5LjMsMjYsOSwyNnMtMC41LTAuMi0wLjUtMC41UzguNywyNSw5LDI1UzkuNSwyNS4yLDkuNSwyNS41eiBNMTQuOSwxNS43Yy0wLjQsMC43LTAuOSwxLjItMS4yLDEuMWMtMC4yLTAuMS0wLjEtMC44LDAuMy0xLjVjMCwwLDAsMCwwLDBjMC40LTAuNywwLjktMS4yLDEuMi0xLjFDMTUuNSwxNC4zLDE1LjQsMTUsMTQuOSwxNS43QzE0LjksMTUuNywxNC45LDE1LjcsMTQuOSwxNS43eiIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yNC41LDEwLjRsLTAuNSwxLjRsMC41LDAuMWMzLjEsMSw1LjYsMi41LDcuOSw2LjhzMy4zLDEwLjMsMi44LDIwLjJsMCwwLjVoMi4zbDAtMC41YzAuNS0xMC4xLTAuOS0xNi44LTMuMy0yMS4zcy01LjgtNi42LTkuMi03LjJDMjUuMSwxMC41LDI0LjYsMTAuNCwyNC41LDEwLjR6Ii8+PC9nPjxyZWN0IHg9IjI4LjgiIHk9IjI4IiBjbGFzcz0ic3QzIiB3aWR0aD0iMTMuOCIgaGVpZ2h0PSIxMy44Ii8+PC9zdmc+')";
   
           }
       }
   }
    if (RookClass.length>0) {
       objGA.leftRook=RookClass[n0]; objGA.rightRook=RookClass[n1];
       if (objGA.rightRook) {
           if (n1===1) {
   objGA.rightRook.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MXtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fS5zdDJ7ZmlsbDojRkZGRkZGO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7fS5zdDN7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fS5zdDR7ZmlsbDojM0VBRjRFO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjE4MjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LDM5aDI3di0zSDlWMzl6IE0xMiwzNnYtNGgyMXY0SDEyeiBNMTEsMTRWOWg0djJoNVY5aDV2Mmg1VjloNHY1Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTM0LDE0bC0zLDNIMTRsLTMtMyIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zMSwxN3YxMi41SDE0VjE3Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTMxLDI5LjVsMS41LDIuNWgtMjBsMS41LTIuNSIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMSwxNGgyMyIvPjwvZz48cmVjdCB4PSIyOC44IiB5PSIyOCIgY2xhc3M9InN0NCIgd2lkdGg9IjEzLjgiIGhlaWdodD0iMTMuOCIvPjwvc3ZnPg==')";
   
           } else {
   objGA.rightRook.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uc3Qxe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7fS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojRUNFQ0VDO3N0cm9rZS1saW5lY2FwOnJvdW5kO30uc3Qze2ZpbGw6IzNFQUY0RTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MS4xODIxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9PC9zdHlsZT48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSwzOWgyN3YtM0g5VjM5eiBNMTIuNSwzMmwxLjUtMi41aDE3bDEuNSwyLjVIMTIuNXogTTEyLDM2di00aDIxdjRIMTJ6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LDI5LjV2LTEzaDE3djEzSDE0eiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNCwxNi41TDExLDE0aDIzbC0zLDIuNUgxNHogTTExLDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIsMzUuNWgyMSBNMTMsMzEuNWgxOSBNMTQsMjkuNWgxNyBNMTQsMTYuNWgxNyBNMTEsMTRoMjMiLz48L2c+PHJlY3QgeD0iMjguOCIgeT0iMjgiIGNsYXNzPSJzdDMiIHdpZHRoPSIxMy44IiBoZWlnaHQ9IjEzLjgiLz48L3N2Zz4=')";
   
           }
       }
     }
     objGA.ppawn=document.getElementsByClassName(objGA.myCol+' pawn');
     objGA.pking=document.getElementsByClassName(objGA.myCol+' king')[0];
     objGA.pqueen=document.getElementsByClassName(objGA.myCol+' queen')[0];
     objGA.pbishop=document.getElementsByClassName(objGA.myCol+' bishop');
   },
   
   ifTwoPieces: (name) => {
     let transform=objGA[name].style.transform;
     let extraction=transform.split(',');
     extraction[0]=extraction[0].replace(/\D/g,'');
     extraction[1]=extraction[1].replace(/\D/g,'');
     return [extraction[0]/objGA.squareS+1,8-extraction[1]/objGA.squareS];
   },
   
   
   PlayAMove: (x,y) => {
   console.log('mymove');
   const coord=[x,y];
   let ExistingKeys;
   let Fixedlength=objGA.keysT.length;
   for (let i=0;i<Fixedlength;i++)
   {
       ExistingKeys=objGA.PieceNames[objGA.keysT[0]];
       if (ExistingKeys){
   let whatpiece=ExistingKeys.p||void 0;
   let letter;
   objGA.myCol==='white' ? letter = objGA.ConvertToLetters[x]+String(y) : letter = objGA.ConvertToLetters[9-x]+String(9-y);
   //let legalJump;
   //objGA.myCol==='white' ? legalJumps=objGA.DestPiece[letter];
   //legalJumps=objGA.DestPiece["x*10+y"];
   let destCurrent=objGA.DestPiece[letter];
   let FromWhere;
   if (destCurrent) {
   FromWhere=destCurrent[whatpiece]||void 0;
   if (FromWhere) {
   let toNumber=[];
   
   if(objGA.myCol==='white') {
   for (let i=0;i<FromWhere.length;i++)
   {
       toNumber.push([objGA.ConvertToDigits[FromWhere[i][0]],Number(FromWhere[i][1])]);
   }
   } else {
   for (let i=0;i<FromWhere.length;i++)
   {
        toNumber.push([9-objGA.ConvertToDigits[FromWhere[i][0]],9-Number(FromWhere[i][1])]);
   }
   }
   let sames=toNumber.length;
   console.log(whatpiece,destCurrent,FromWhere,toNumber);
   if (sames===1) {objGA.executeMove(coord,toNumber[0])}
        else if (sames>1)    {
           let direction=ExistingKeys.d||void 0;
   switch(whatpiece) {
     case 'pawn':
   if (direction==='l') {
   objGA.executeMove(coord,[coord[0]+1,coord[1]-1])
   } else if (direction==='u') {
   objGA.executeMove(coord,[coord[0],coord[1]-1])
   } else {
   objGA.executeMove(coord,[coord[0]-1,coord[1]-1])
   }
       break;
     case 'knight':
   let rKcoord=objGA.ifTwoPieces('rightKnight');
   if (direction==='r') {
     objGA.executeMove(coord,rKcoord);
   }
       else {
     (toNumber[0][0]===rKcoord[0]&&toNumber[0][1]===rKcoord[1]) ? objGA.executeMove(coord,toNumber[1]) : objGA.executeMove(coord,toNumber[0]);
       }
       break;
     case 'rook':
   let rRcoord=objGA.ifTwoPieces('rightRook');
   if (direction==='r') {
      objGA.executeMove(coord,rRcoord);
   }
       else {
     (toNumber[0][0]===rRcoord[0]&&toNumber[0][1]===rRcoord[1]) ? objGA.executeMove(coord,toNumber[1]) : objGA.executeMove(coord,toNumber[0]);
       }
       break;
     case 'queen':
   objGA.executeMove(coord,toNumber,void 0,true)
       break;
     default:
       // code block
   }
   
                             }
   
   
   
   }}
   
   
   
   
   }
   objGA.keysT.splice(0, 1);
   }
   
   },
   
   executeMove: (to,from,dir=void 0,queens=false) => {
   
   if (queens) {
     console.log(to,from);
     for (let i = 0; i < from.length; i++) {
       let theCoord = from[i].concat(to);
       for (let i = 0; i < theCoord.length; i++) {
         if (i%2 === 0) { theCoord[i]=theCoord[i]*objGA.sqsize-objGA.sqsize/2;}
         else  theCoord[i]=(9-theCoord[i])*objGA.sqsize-objGA.sqsize/2;
       }
       objGA.DoubleData([theCoord[0],theCoord[1]],[theCoord[2],theCoord[3]]);
         }
   }
       else {
   console.log(to,from)
   let theCoord = from.concat(to);
   for (let i = 0; i < theCoord.length; i++) {
     if (i%2 === 0) { theCoord[i]=theCoord[i]*objGA.sqsize-objGA.sqsize/2;}
     else  {theCoord[i]=(9-theCoord[i])*objGA.sqsize-objGA.sqsize/2;}
   }
   objGA.DoubleData([theCoord[0],theCoord[1]],[theCoord[2],theCoord[3]]);
   }
   
                                          },
   
   DoinMoves()             {
   setTimeout(()=>{ if (objGA.player !== objGA.myCol){objGA.keysT = objGA.keys.slice(0); objGA.makemoves(123);} },0)
     //consoleBackUp('onChange')
   objGA.PieceMoves={};
   objGA.MovePiece={};
   objGA.DestPiece={};
   //console.log(objGA.inMoves);
   
   
                                         // objGA.inMoves!=={}?(
                                         Object.entries(objGA.inMoves).length !== 0 ?(
                       objGA.pieces ?
                                (
                           ()=>{
                       objGA.FixDests();
                               })()
                                    :
                           (()=>{
                       objGA.beginning=true;
                                })()
                                                          ) : objGA.FixPremoves();
   
                          },
   MouseMoves(e) {
   objGA.cx = e.clientX;
   objGA.cy = e.clientY;
   objGA.boardx = objGA.cx - objGA.x0;
   objGA.boardy = objGA.cy - objGA.y0;
   objGA.horiz = Math.ceil(objGA.boardx/objGA.sqsize);
   objGA.vertic = 9-Math.ceil(objGA.boardy/objGA.sqsize);
       if (objGA.horiz != objGA.horiz2 || objGA.vertic != objGA.vertic2)
         {
           objGA.keysT = objGA.keys.slice(0);
            objGA.horiz0 = objGA.horiz;
             objGA.vertic0 = objGA.vertic;
              objGA.makemoves();
         }
               objGA.horiz2 = objGA.horiz;
               objGA.vertic2 = objGA.vertic;
                 },
   setHighlights: (k,t) => {
   /*objGA.ppawn=document.getElementsByClassName(objGA.myCol+' pawn');
   objGA.pking=document.getElementsByClassName(objGA.myCol+' king')[0];
   objGA.pqueen=document.getElementsByClassName(objGA.myCol+' queen')[0];
   objGA.pbishop=document.getElementsByClassName(objGA.myCol+' bishop');
   objGA.leftKnight=document.getElementsByClassName(objGA.myCol+' knight')[objGA.n0];
   objGA.rightKnight=document.getElementsByClassName(objGA.myCol+' knight')[objGA.n1];
   objGA.leftRook=document.getElementsByClassName(objGA.myCol+' rook')[objGA.n0];
   objGA.rightRook=document.getElementsByClassName(objGA.myCol+' rook')[objGA.n1];*/
   let color;let length;
   if (t===true) {color = 'blue';} else {color = '';}
   switch (k)
   {
   case (objGA.PieceKeys[0]):  //pawns
   case (objGA.PieceKeys[1]):
   case (objGA.PieceKeys[2]):
   length = objGA.ppawn.length;
   if (length>0) {
     for (let i = 0; i < length; i++) {
     objGA.ppawn[i].style.backgroundColor=color;
     }
   }
   break;
   case (objGA.PieceKeys[3]):  //king
   if (objGA.pking) {objGA.pking.style.backgroundColor=color;}
   break;
   case (objGA.PieceKeys[4]):  //bishop
   length = objGA.pbishop.length;
   if (length>0) {
     for (let y = 0; y < length; y++) {
     objGA.pbishop[y].style.backgroundColor=color;
     }
   }
   break;
   case (objGA.PieceKeys[5]):  //left rook
   if (objGA.leftRook) {objGA.leftRook.style.backgroundColor=color;}
   break;
   case (objGA.PieceKeys[6]):  //right rook
   if (objGA.rightRook) {objGA.rightRook.style.backgroundColor=color;}
   break;
   case (objGA.PieceKeys[7]):  //left knight
   if (objGA.leftKnight) {objGA.leftKnight.style.backgroundColor=color;}
   break;
   case (objGA.PieceKeys[8]):  //right knight
   if (objGA.rightKnight) {objGA.rightKnight.style.backgroundColor=color;}
   break;
   case (objGA.PieceKeys[9]):  //queen
   if (objGA.pqueen) {objGA.pqueen.style.backgroundColor=color;}
   break;
   
   }
   },
   setBoard: () => {
       //setTimeout(()=>{
    objGA.board = document.querySelectorAll("cg-board")[0];
       objGA.rect = objGA.board.getBoundingClientRect();
           objGA.x0 = objGA.rect.left;
           objGA.y0 = objGA.rect.top;
           objGA.w = objGA.rect.width;
           objGA.sqsize = objGA.w / 8;
           objGA.squareS= Math.round(objGA.sqsize);
           objGA.board.addEventListener('mousemove',objGA.MouseMoves);
           document.addEventListener('keydown', objGA.KeyD);
           document.addEventListener('keyup', objGA.KeyU);
           objGA.KnightAndRooks();
           console.log('event');
   
      //},300)
   },
   setcolor: (color) => {
   objGA.myCol=color;
   //objGA.player=color;
   },
   setPieces: (pieces) => {
   objGA.pieces=pieces;
   objGA.beginning===true && objGA.inMoves && objGA.FixDests();
   //(()=>{
   
   },
   setPremoves: (premoves) => {
   objGA.premoves=premoves;
   console.log(objGA.premoves);
   },
   
   KeyD(e) {
       let key = event.key;
       if (!objGA.keys.includes(key) && key != 'Control' && key != 'Alt')
       {
       objGA.keys.unshift(key);
         objGA.keysT.unshift(key);
           objGA.makemoves();
       }
       objGA.setHighlights(key,true);
   },
   KeyU(e) {
       let key = event.key;
               for( let i = 0; i < objGA.keys.length; i++){
      if ( objGA.keys[i] === key) {
        objGA.keys.splice(i, 1);
      }
   }
           for( let j = 0; j < objGA.keysT.length; j++){
      if ( objGA.keysT[j] === key) {
        objGA.keysT.splice(j, 1);
      }
   }
      objGA.setHighlights(key,false);
   },
   makemoves(l=void 0) {
   //console.log(objGA.horiz,objGA.vertic,objGA.keys,objGA.player)
   if (objGA.keys.length!==0){
   console.log(objGA.horiz,objGA.vertic,objGA.keys,objGA.player)
   //if (l) consoleBackUp(l,objGA.horiz,objGA.vertic,objGA.myCol,objGA.legalmoves,objGA.DestPiece);
   //try {consoleBackUp(objGA.DestPiece['f2']['knight'][0]=='h3')} catch {}
   //try {if (objGA.DestPiece['f2']['knight'][0]=='h3'){console.warn('debugger')}}catch(e){console.warn(e)}
   objGA.player === objGA.myCol ? objGA.PlayAMove(objGA.horiz,objGA.vertic) : objGA.FixPremoves(objGA.horiz,objGA.vertic);
   
   }
   
   },
   ApplyData: (a,b) => {
     let ev = new MouseEvent("mousedown", {
               "view": window,
               "bubbles": true,
               "cancelable": false,
               "clientX": a
               +objGA.x0,
               "clientY": b
               +objGA.y0
           });
           objGA.board.dispatchEvent(ev);
   },
   DataTransition: (a,b,c=false) => {
     let ev = new MouseEvent("mouseup", {
               "view": window,
               "bubbles": true,
               "cancelable": false,
               "clientX": a
               +objGA.x0,
               "clientY": b
               +objGA.y0
           });
           objGA.board.dispatchEvent(ev);
           if (c===true) {objGA.Unselect(a,b);}
   },
   DoubleData: (a,b) => {
   objGA.ApplyData(a[0],a[1]);
   objGA.DataTransition(a[0],a[1]);
   objGA.ApplyData(b[0],b[1]);
   objGA.DataTransition(b[0],b[1],true);
   window.setTimeout(()=>{
               // objGA.Unselect(b[0],b[1]);
              },15)
   },
   Unselect:(tx,ty) => {
          let ds = objGA.board.children;
          let length=ds.length;
                  //console.log(c);
                  for (let i = 0; i < length; ++i) {
                      if (ds[i].className.includes("selected")) {
                        objGA.ApplyData(tx,ty);
                        objGA.DataTransition(tx,ty);
                          return;
                      }
                  }
      }
   
   }
   
   
   setTimeout(objGA.setBoard, 300);
   objGA.setKeys();
   //console.log(objGA.PieceNames,objGA.PieceNames[' '])
   
   
   
   let consoleBackUp=console.log;
   console.log = function(){}
   