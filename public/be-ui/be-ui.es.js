var e = Object.defineProperty, t = Object.getOwnPropertySymbols, a = Object.prototype.hasOwnProperty,
    l = Object.prototype.propertyIsEnumerable,
    o = (t, a, l) => a in t ? e(t, a, {enumerable: !0, configurable: !0, writable: !0, value: l}) : t[a] = l,
    n = (e, n) => {
        for (var s in n || (n = {})) a.call(n, s) && o(e, s, n[s]);
        if (t) for (var s of t(n)) l.call(n, s) && o(e, s, n[s]);
        return e
    }, s = (e, t, a) => (o(e, "symbol" != typeof t ? t + "" : t, a), a);
import {
    defineComponent as i,
    getCurrentInstance as r,
    ref as c,
    reactive as d,
    computed as p,
    watch as u,
    onMounted as m,
    nextTick as v,
    onBeforeUnmount as h,
    resolveDirective as g,
    openBlock as w,
    createElementBlock as f,
    Fragment as y,
    createElementVNode as b,
    renderSlot as x,
    createBlock as C,
    Teleport as k,
    normalizeClass as D,
    createVNode as L,
    Transition as V,
    withCtx as S,
    withDirectives as B,
    normalizeStyle as T,
    createCommentVNode as P,
    resolveComponent as z,
    toDisplayString as E,
    watchEffect as M,
    mergeProps as I,
    toHandlers as G,
    useAttrs as N,
    onUnmounted as _,
    createTextVNode as H,
    render as O,
    inject as $,
    withModifiers as A,
    renderList as F,
    vShow as W,
    provide as U,
    h as Y
} from "vue";

function R() {
    return !0
}

const j = {
    beforeMount(e, t) {
        if ("object" == typeof t.value && t.value.isDisabled) return;
        const a = a => function (e, t, a) {
            const l = "function" == typeof a.value ? a.value : a.value.handler,
                o = "object" == typeof a.value && a.value.closeConditional || R;
            if (!e || !1 === o(e)) return;
            const n = ("object" == typeof a.value && a.value.include || (() => []))();
            n.push(t), !n.some((t => t.contains(e.target))) && setTimeout((() => {
                o(e) && l && l(e)
            }), 0)
        }(a, e, t);
        (document.querySelector("[data-app]") || document.body).addEventListener("click", a, !0), e._clickOutside = a
    }, unmounted(e) {
        if (!e._clickOutside) return;
        const t = document.querySelector("[data-app]") || document.body;
        t && t.removeEventListener("click", e._clickOutside, !0), delete e._clickOutside
    }
};
var q = "top", K = "bottom", X = "right", Z = "left", J = [q, K, X, Z], Q = J.reduce((function (e, t) {
        return e.concat([t + "-start", t + "-end"])
    }), []), ee = [].concat(J, ["auto"]).reduce((function (e, t) {
        return e.concat([t, t + "-start", t + "-end"])
    }), []),
    te = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

function ae(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}

function le(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
        var t = e.ownerDocument;
        return t && t.defaultView || window
    }
    return e
}

function oe(e) {
    return e instanceof le(e).Element || e instanceof Element
}

function ne(e) {
    return e instanceof le(e).HTMLElement || e instanceof HTMLElement
}

function se(e) {
    return "undefined" != typeof ShadowRoot && (e instanceof le(e).ShadowRoot || e instanceof ShadowRoot)
}

var ie = {
    name: "applyStyles", enabled: !0, phase: "write", fn: function (e) {
        var t = e.state;
        Object.keys(t.elements).forEach((function (e) {
            var a = t.styles[e] || {}, l = t.attributes[e] || {}, o = t.elements[e];
            ne(o) && ae(o) && (Object.assign(o.style, a), Object.keys(l).forEach((function (e) {
                var t = l[e];
                !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
            })))
        }))
    }, effect: function (e) {
        var t = e.state, a = {
            popper: {position: t.options.strategy, left: "0", top: "0", margin: "0"},
            arrow: {position: "absolute"},
            reference: {}
        };
        return Object.assign(t.elements.popper.style, a.popper), t.styles = a, t.elements.arrow && Object.assign(t.elements.arrow.style, a.arrow), function () {
            Object.keys(t.elements).forEach((function (e) {
                var l = t.elements[e], o = t.attributes[e] || {},
                    n = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : a[e]).reduce((function (e, t) {
                        return e[t] = "", e
                    }), {});
                ne(l) && ae(l) && (Object.assign(l.style, n), Object.keys(o).forEach((function (e) {
                    l.removeAttribute(e)
                })))
            }))
        }
    }, requires: ["computeStyles"]
};

function re(e) {
    return e.split("-")[0]
}

var ce = Math.round;

function de(e, t) {
    void 0 === t && (t = !1);
    var a = e.getBoundingClientRect(), l = 1, o = 1;
    if (ne(e) && t) {
        var n = e.offsetHeight, s = e.offsetWidth;
        s > 0 && (l = a.width / s || 1), n > 0 && (o = a.height / n || 1)
    }
    return {
        width: ce(a.width / l),
        height: ce(a.height / o),
        top: ce(a.top / o),
        right: ce(a.right / l),
        bottom: ce(a.bottom / o),
        left: ce(a.left / l),
        x: ce(a.left / l),
        y: ce(a.top / o)
    }
}

function pe(e) {
    var t = de(e), a = e.offsetWidth, l = e.offsetHeight;
    return Math.abs(t.width - a) <= 1 && (a = t.width), Math.abs(t.height - l) <= 1 && (l = t.height), {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: a,
        height: l
    }
}

function ue(e, t) {
    var a = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (a && se(a)) {
        var l = t;
        do {
            if (l && e.isSameNode(l)) return !0;
            l = l.parentNode || l.host
        } while (l)
    }
    return !1
}

function me(e) {
    return le(e).getComputedStyle(e)
}

function ve(e) {
    return ["table", "td", "th"].indexOf(ae(e)) >= 0
}

function he(e) {
    return ((oe(e) ? e.ownerDocument : e.document) || window.document).documentElement
}

function ge(e) {
    return "html" === ae(e) ? e : e.assignedSlot || e.parentNode || (se(e) ? e.host : null) || he(e)
}

function we(e) {
    return ne(e) && "fixed" !== me(e).position ? e.offsetParent : null
}

function fe(e) {
    for (var t = le(e), a = we(e); a && ve(a) && "static" === me(a).position;) a = we(a);
    return a && ("html" === ae(a) || "body" === ae(a) && "static" === me(a).position) ? t : a || function (e) {
        var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
        if (-1 !== navigator.userAgent.indexOf("Trident") && ne(e) && "fixed" === me(e).position) return null;
        for (var a = ge(e); ne(a) && ["html", "body"].indexOf(ae(a)) < 0;) {
            var l = me(a);
            if ("none" !== l.transform || "none" !== l.perspective || "paint" === l.contain || -1 !== ["transform", "perspective"].indexOf(l.willChange) || t && "filter" === l.willChange || t && l.filter && "none" !== l.filter) return a;
            a = a.parentNode
        }
        return null
    }(e) || t
}

function ye(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}

var be = Math.max, xe = Math.min, Ce = Math.round;

function ke(e, t, a) {
    return be(e, xe(t, a))
}

function De(e) {
    return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, e)
}

function Le(e, t) {
    return t.reduce((function (t, a) {
        return t[a] = e, t
    }), {})
}

var Ve = {
    name: "arrow", enabled: !0, phase: "main", fn: function (e) {
        var t, a = e.state, l = e.name, o = e.options, n = a.elements.arrow, s = a.modifiersData.popperOffsets,
            i = re(a.placement), r = ye(i), c = [Z, X].indexOf(i) >= 0 ? "height" : "width";
        if (n && s) {
            var d = function (e, t) {
                    return De("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {placement: t.placement})) : e) ? e : Le(e, J))
                }(o.padding, a), p = pe(n), u = "y" === r ? q : Z, m = "y" === r ? K : X,
                v = a.rects.reference[c] + a.rects.reference[r] - s[r] - a.rects.popper[c],
                h = s[r] - a.rects.reference[r], g = fe(n),
                w = g ? "y" === r ? g.clientHeight || 0 : g.clientWidth || 0 : 0, f = v / 2 - h / 2, y = d[u],
                b = w - p[c] - d[m], x = w / 2 - p[c] / 2 + f, C = ke(y, x, b), k = r;
            a.modifiersData[l] = ((t = {})[k] = C, t.centerOffset = C - x, t)
        }
    }, effect: function (e) {
        var t = e.state, a = e.options.element, l = void 0 === a ? "[data-popper-arrow]" : a;
        null != l && ("string" != typeof l || (l = t.elements.popper.querySelector(l))) && ue(t.elements.popper, l) && (t.elements.arrow = l)
    }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
};

function Se(e) {
    return e.split("-")[1]
}

var Be = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

function Te(e) {
    var t, a = e.popper, l = e.popperRect, o = e.placement, n = e.variation, s = e.offsets, i = e.position,
        r = e.gpuAcceleration, c = e.adaptive, d = e.roundOffsets, p = !0 === d ? function (e) {
            var t = e.x, a = e.y, l = window.devicePixelRatio || 1;
            return {x: Ce(Ce(t * l) / l) || 0, y: Ce(Ce(a * l) / l) || 0}
        }(s) : "function" == typeof d ? d(s) : s, u = p.x, m = void 0 === u ? 0 : u, v = p.y, h = void 0 === v ? 0 : v,
        g = s.hasOwnProperty("x"), w = s.hasOwnProperty("y"), f = Z, y = q, b = window;
    if (c) {
        var x = fe(a), C = "clientHeight", k = "clientWidth";
        x === le(a) && "static" !== me(x = he(a)).position && "absolute" === i && (C = "scrollHeight", k = "scrollWidth"), x = x, o !== q && (o !== Z && o !== X || "end" !== n) || (y = K, h -= x[C] - l.height, h *= r ? 1 : -1), o !== Z && (o !== q && o !== K || "end" !== n) || (f = X, m -= x[k] - l.width, m *= r ? 1 : -1)
    }
    var D, L = Object.assign({position: i}, c && Be);
    return r ? Object.assign({}, L, ((D = {})[y] = w ? "0" : "", D[f] = g ? "0" : "", D.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + h + "px)" : "translate3d(" + m + "px, " + h + "px, 0)", D)) : Object.assign({}, L, ((t = {})[y] = w ? h + "px" : "", t[f] = g ? m + "px" : "", t.transform = "", t))
}

var Pe = {
    name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (e) {
        var t = e.state, a = e.options, l = a.gpuAcceleration, o = void 0 === l || l, n = a.adaptive,
            s = void 0 === n || n, i = a.roundOffsets, r = void 0 === i || i, c = {
                placement: re(t.placement),
                variation: Se(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: o
            };
        null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, Te(Object.assign({}, c, {
            offsets: t.modifiersData.popperOffsets,
            position: t.options.strategy,
            adaptive: s,
            roundOffsets: r
        })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, Te(Object.assign({}, c, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: r
        })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {"data-popper-placement": t.placement})
    }, data: {}
}, ze = {passive: !0};
var Ee = {
    name: "eventListeners", enabled: !0, phase: "write", fn: function () {
    }, effect: function (e) {
        var t = e.state, a = e.instance, l = e.options, o = l.scroll, n = void 0 === o || o, s = l.resize,
            i = void 0 === s || s, r = le(t.elements.popper),
            c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
        return n && c.forEach((function (e) {
            e.addEventListener("scroll", a.update, ze)
        })), i && r.addEventListener("resize", a.update, ze), function () {
            n && c.forEach((function (e) {
                e.removeEventListener("scroll", a.update, ze)
            })), i && r.removeEventListener("resize", a.update, ze)
        }
    }, data: {}
}, Me = {left: "right", right: "left", bottom: "top", top: "bottom"};

function Ie(e) {
    return e.replace(/left|right|bottom|top/g, (function (e) {
        return Me[e]
    }))
}

var Ge = {start: "end", end: "start"};

function Ne(e) {
    return e.replace(/start|end/g, (function (e) {
        return Ge[e]
    }))
}

function _e(e) {
    var t = le(e);
    return {scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset}
}

function He(e) {
    return de(he(e)).left + _e(e).scrollLeft
}

function Oe(e) {
    var t = me(e), a = t.overflow, l = t.overflowX, o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(a + o + l)
}

function $e(e) {
    return ["html", "body", "#document"].indexOf(ae(e)) >= 0 ? e.ownerDocument.body : ne(e) && Oe(e) ? e : $e(ge(e))
}

function Ae(e, t) {
    var a;
    void 0 === t && (t = []);
    var l = $e(e), o = l === (null == (a = e.ownerDocument) ? void 0 : a.body), n = le(l),
        s = o ? [n].concat(n.visualViewport || [], Oe(l) ? l : []) : l, i = t.concat(s);
    return o ? i : i.concat(Ae(ge(s)))
}

function Fe(e) {
    return Object.assign({}, e, {left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height})
}

function We(e, t) {
    return "viewport" === t ? Fe(function (e) {
        var t = le(e), a = he(e), l = t.visualViewport, o = a.clientWidth, n = a.clientHeight, s = 0, i = 0;
        return l && (o = l.width, n = l.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = l.offsetLeft, i = l.offsetTop)), {
            width: o,
            height: n,
            x: s + He(e),
            y: i
        }
    }(e)) : ne(t) ? function (e) {
        var t = de(e);
        return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t
    }(t) : Fe(function (e) {
        var t, a = he(e), l = _e(e), o = null == (t = e.ownerDocument) ? void 0 : t.body,
            n = be(a.scrollWidth, a.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
            s = be(a.scrollHeight, a.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
            i = -l.scrollLeft + He(e), r = -l.scrollTop;
        return "rtl" === me(o || a).direction && (i += be(a.clientWidth, o ? o.clientWidth : 0) - n), {
            width: n,
            height: s,
            x: i,
            y: r
        }
    }(he(e)))
}

function Ue(e, t, a) {
    var l = "clippingParents" === t ? function (e) {
        var t = Ae(ge(e)), a = ["absolute", "fixed"].indexOf(me(e).position) >= 0 && ne(e) ? fe(e) : e;
        return oe(a) ? t.filter((function (e) {
            return oe(e) && ue(e, a) && "body" !== ae(e)
        })) : []
    }(e) : [].concat(t), o = [].concat(l, [a]), n = o[0], s = o.reduce((function (t, a) {
        var l = We(e, a);
        return t.top = be(l.top, t.top), t.right = xe(l.right, t.right), t.bottom = xe(l.bottom, t.bottom), t.left = be(l.left, t.left), t
    }), We(e, n));
    return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s
}

function Ye(e) {
    var t, a = e.reference, l = e.element, o = e.placement, n = o ? re(o) : null, s = o ? Se(o) : null,
        i = a.x + a.width / 2 - l.width / 2, r = a.y + a.height / 2 - l.height / 2;
    switch (n) {
        case q:
            t = {x: i, y: a.y - l.height};
            break;
        case K:
            t = {x: i, y: a.y + a.height};
            break;
        case X:
            t = {x: a.x + a.width, y: r};
            break;
        case Z:
            t = {x: a.x - l.width, y: r};
            break;
        default:
            t = {x: a.x, y: a.y}
    }
    var c = n ? ye(n) : null;
    if (null != c) {
        var d = "y" === c ? "height" : "width";
        switch (s) {
            case"start":
                t[c] = t[c] - (a[d] / 2 - l[d] / 2);
                break;
            case"end":
                t[c] = t[c] + (a[d] / 2 - l[d] / 2)
        }
    }
    return t
}

function Re(e, t) {
    void 0 === t && (t = {});
    var a = t, l = a.placement, o = void 0 === l ? e.placement : l, n = a.boundary,
        s = void 0 === n ? "clippingParents" : n, i = a.rootBoundary, r = void 0 === i ? "viewport" : i,
        c = a.elementContext, d = void 0 === c ? "popper" : c, p = a.altBoundary, u = void 0 !== p && p, m = a.padding,
        v = void 0 === m ? 0 : m, h = De("number" != typeof v ? v : Le(v, J)),
        g = "popper" === d ? "reference" : "popper", w = e.rects.popper, f = e.elements[u ? g : d],
        y = Ue(oe(f) ? f : f.contextElement || he(e.elements.popper), s, r), b = de(e.elements.reference),
        x = Ye({reference: b, element: w, strategy: "absolute", placement: o}), C = Fe(Object.assign({}, w, x)),
        k = "popper" === d ? C : b, D = {
            top: y.top - k.top + h.top,
            bottom: k.bottom - y.bottom + h.bottom,
            left: y.left - k.left + h.left,
            right: k.right - y.right + h.right
        }, L = e.modifiersData.offset;
    if ("popper" === d && L) {
        var V = L[o];
        Object.keys(D).forEach((function (e) {
            var t = [X, K].indexOf(e) >= 0 ? 1 : -1, a = [q, K].indexOf(e) >= 0 ? "y" : "x";
            D[e] += V[a] * t
        }))
    }
    return D
}

var je = {
    name: "flip", enabled: !0, phase: "main", fn: function (e) {
        var t = e.state, a = e.options, l = e.name;
        if (!t.modifiersData[l]._skip) {
            for (var o = a.mainAxis, n = void 0 === o || o, s = a.altAxis, i = void 0 === s || s, r = a.fallbackPlacements, c = a.padding, d = a.boundary, p = a.rootBoundary, u = a.altBoundary, m = a.flipVariations, v = void 0 === m || m, h = a.allowedAutoPlacements, g = t.options.placement, w = re(g), f = r || (w === g || !v ? [Ie(g)] : function (e) {
                if ("auto" === re(e)) return [];
                var t = Ie(e);
                return [Ne(e), t, Ne(t)]
            }(g)), y = [g].concat(f).reduce((function (e, a) {
                return e.concat("auto" === re(a) ? function (e, t) {
                    void 0 === t && (t = {});
                    var a = t, l = a.placement, o = a.boundary, n = a.rootBoundary, s = a.padding, i = a.flipVariations,
                        r = a.allowedAutoPlacements, c = void 0 === r ? ee : r, d = Se(l),
                        p = d ? i ? Q : Q.filter((function (e) {
                            return Se(e) === d
                        })) : J, u = p.filter((function (e) {
                            return c.indexOf(e) >= 0
                        }));
                    0 === u.length && (u = p);
                    var m = u.reduce((function (t, a) {
                        return t[a] = Re(e, {placement: a, boundary: o, rootBoundary: n, padding: s})[re(a)], t
                    }), {});
                    return Object.keys(m).sort((function (e, t) {
                        return m[e] - m[t]
                    }))
                }(t, {
                    placement: a,
                    boundary: d,
                    rootBoundary: p,
                    padding: c,
                    flipVariations: v,
                    allowedAutoPlacements: h
                }) : a)
            }), []), b = t.rects.reference, x = t.rects.popper, C = new Map, k = !0, D = y[0], L = 0; L < y.length; L++) {
                var V = y[L], S = re(V), B = "start" === Se(V), T = [q, K].indexOf(S) >= 0, P = T ? "width" : "height",
                    z = Re(t, {placement: V, boundary: d, rootBoundary: p, altBoundary: u, padding: c}),
                    E = T ? B ? X : Z : B ? K : q;
                b[P] > x[P] && (E = Ie(E));
                var M = Ie(E), I = [];
                if (n && I.push(z[S] <= 0), i && I.push(z[E] <= 0, z[M] <= 0), I.every((function (e) {
                    return e
                }))) {
                    D = V, k = !1;
                    break
                }
                C.set(V, I)
            }
            if (k) for (var G = function (e) {
                var t = y.find((function (t) {
                    var a = C.get(t);
                    if (a) return a.slice(0, e).every((function (e) {
                        return e
                    }))
                }));
                if (t) return D = t, "break"
            }, N = v ? 3 : 1; N > 0; N--) {
                if ("break" === G(N)) break
            }
            t.placement !== D && (t.modifiersData[l]._skip = !0, t.placement = D, t.reset = !0)
        }
    }, requiresIfExists: ["offset"], data: {_skip: !1}
};

function qe(e, t, a) {
    return void 0 === a && (a = {x: 0, y: 0}), {
        top: e.top - t.height - a.y,
        right: e.right - t.width + a.x,
        bottom: e.bottom - t.height + a.y,
        left: e.left - t.width - a.x
    }
}

function Ke(e) {
    return [q, X, K, Z].some((function (t) {
        return e[t] >= 0
    }))
}

var Xe = {
    name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function (e) {
        var t = e.state, a = e.name, l = t.rects.reference, o = t.rects.popper, n = t.modifiersData.preventOverflow,
            s = Re(t, {elementContext: "reference"}), i = Re(t, {altBoundary: !0}), r = qe(s, l), c = qe(i, o, n),
            d = Ke(r), p = Ke(c);
        t.modifiersData[a] = {
            referenceClippingOffsets: r,
            popperEscapeOffsets: c,
            isReferenceHidden: d,
            hasPopperEscaped: p
        }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-reference-hidden": d,
            "data-popper-escaped": p
        })
    }
};
var Ze = {
    name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (e) {
        var t = e.state, a = e.options, l = e.name, o = a.offset, n = void 0 === o ? [0, 0] : o,
            s = ee.reduce((function (e, a) {
                return e[a] = function (e, t, a) {
                    var l = re(e), o = [Z, q].indexOf(l) >= 0 ? -1 : 1,
                        n = "function" == typeof a ? a(Object.assign({}, t, {placement: e})) : a, s = n[0], i = n[1];
                    return s = s || 0, i = (i || 0) * o, [Z, X].indexOf(l) >= 0 ? {x: i, y: s} : {x: s, y: i}
                }(a, t.rects, n), e
            }), {}), i = s[t.placement], r = i.x, c = i.y;
        null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += r, t.modifiersData.popperOffsets.y += c), t.modifiersData[l] = s
    }
};
var Je = {
    name: "popperOffsets", enabled: !0, phase: "read", fn: function (e) {
        var t = e.state, a = e.name;
        t.modifiersData[a] = Ye({
            reference: t.rects.reference,
            element: t.rects.popper,
            strategy: "absolute",
            placement: t.placement
        })
    }, data: {}
};
var Qe = {
    name: "preventOverflow", enabled: !0, phase: "main", fn: function (e) {
        var t = e.state, a = e.options, l = e.name, o = a.mainAxis, n = void 0 === o || o, s = a.altAxis,
            i = void 0 !== s && s, r = a.boundary, c = a.rootBoundary, d = a.altBoundary, p = a.padding, u = a.tether,
            m = void 0 === u || u, v = a.tetherOffset, h = void 0 === v ? 0 : v,
            g = Re(t, {boundary: r, rootBoundary: c, padding: p, altBoundary: d}), w = re(t.placement),
            f = Se(t.placement), y = !f, b = ye(w), x = "x" === b ? "y" : "x", C = t.modifiersData.popperOffsets,
            k = t.rects.reference, D = t.rects.popper,
            L = "function" == typeof h ? h(Object.assign({}, t.rects, {placement: t.placement})) : h, V = {x: 0, y: 0};
        if (C) {
            if (n || i) {
                var S = "y" === b ? q : Z, B = "y" === b ? K : X, T = "y" === b ? "height" : "width", P = C[b],
                    z = C[b] + g[S], E = C[b] - g[B], M = m ? -D[T] / 2 : 0, I = "start" === f ? k[T] : D[T],
                    G = "start" === f ? -D[T] : -k[T], N = t.elements.arrow, _ = m && N ? pe(N) : {width: 0, height: 0},
                    H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }, O = H[S], $ = H[B], A = ke(0, k[T], _[T]), F = y ? k[T] / 2 - M - A - O - L : I - A - O - L,
                    W = y ? -k[T] / 2 + M + A + $ + L : G + A + $ + L, U = t.elements.arrow && fe(t.elements.arrow),
                    Y = U ? "y" === b ? U.clientTop || 0 : U.clientLeft || 0 : 0,
                    R = t.modifiersData.offset ? t.modifiersData.offset[t.placement][b] : 0, j = C[b] + F - R - Y,
                    J = C[b] + W - R;
                if (n) {
                    var Q = ke(m ? xe(z, j) : z, P, m ? be(E, J) : E);
                    C[b] = Q, V[b] = Q - P
                }
                if (i) {
                    var ee = "x" === b ? q : Z, te = "x" === b ? K : X, ae = C[x], le = ae + g[ee], oe = ae - g[te],
                        ne = ke(m ? xe(le, j) : le, ae, m ? be(oe, J) : oe);
                    C[x] = ne, V[x] = ne - ae
                }
            }
            t.modifiersData[l] = V
        }
    }, requiresIfExists: ["offset"]
};

function et(e, t, a) {
    void 0 === a && (a = !1);
    var l, o, n = ne(t), s = ne(t) && function (e) {
        var t = e.getBoundingClientRect(), a = t.width / e.offsetWidth || 1, l = t.height / e.offsetHeight || 1;
        return 1 !== a || 1 !== l
    }(t), i = he(t), r = de(e, s), c = {scrollLeft: 0, scrollTop: 0}, d = {x: 0, y: 0};
    return (n || !n && !a) && (("body" !== ae(t) || Oe(i)) && (c = (l = t) !== le(l) && ne(l) ? {
        scrollLeft: (o = l).scrollLeft,
        scrollTop: o.scrollTop
    } : _e(l)), ne(t) ? ((d = de(t, !0)).x += t.clientLeft, d.y += t.clientTop) : i && (d.x = He(i))), {
        x: r.left + c.scrollLeft - d.x,
        y: r.top + c.scrollTop - d.y,
        width: r.width,
        height: r.height
    }
}

function tt(e) {
    var t = new Map, a = new Set, l = [];

    function o(e) {
        a.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function (e) {
            if (!a.has(e)) {
                var l = t.get(e);
                l && o(l)
            }
        })), l.push(e)
    }

    return e.forEach((function (e) {
        t.set(e.name, e)
    })), e.forEach((function (e) {
        a.has(e.name) || o(e)
    })), l
}

var at = {placement: "bottom", modifiers: [], strategy: "absolute"};

function lt() {
    for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
    return !t.some((function (e) {
        return !(e && "function" == typeof e.getBoundingClientRect)
    }))
}

function ot(e) {
    void 0 === e && (e = {});
    var t = e, a = t.defaultModifiers, l = void 0 === a ? [] : a, o = t.defaultOptions, n = void 0 === o ? at : o;
    return function (e, t, a) {
        void 0 === a && (a = n);
        var o, s, i = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, at, n),
            modifiersData: {},
            elements: {reference: e, popper: t},
            attributes: {},
            styles: {}
        }, r = [], c = !1, d = {
            state: i, setOptions: function (a) {
                var o = "function" == typeof a ? a(i.options) : a;
                p(), i.options = Object.assign({}, n, i.options, o), i.scrollParents = {
                    reference: oe(e) ? Ae(e) : e.contextElement ? Ae(e.contextElement) : [],
                    popper: Ae(t)
                };
                var s, c, u = function (e) {
                    var t = tt(e);
                    return te.reduce((function (e, a) {
                        return e.concat(t.filter((function (e) {
                            return e.phase === a
                        })))
                    }), [])
                }((s = [].concat(l, i.options.modifiers), c = s.reduce((function (e, t) {
                    var a = e[t.name];
                    return e[t.name] = a ? Object.assign({}, a, t, {
                        options: Object.assign({}, a.options, t.options),
                        data: Object.assign({}, a.data, t.data)
                    }) : t, e
                }), {}), Object.keys(c).map((function (e) {
                    return c[e]
                }))));
                return i.orderedModifiers = u.filter((function (e) {
                    return e.enabled
                })), i.orderedModifiers.forEach((function (e) {
                    var t = e.name, a = e.options, l = void 0 === a ? {} : a, o = e.effect;
                    if ("function" == typeof o) {
                        var n = o({state: i, name: t, instance: d, options: l}), s = function () {
                        };
                        r.push(n || s)
                    }
                })), d.update()
            }, forceUpdate: function () {
                if (!c) {
                    var e = i.elements, t = e.reference, a = e.popper;
                    if (lt(t, a)) {
                        i.rects = {
                            reference: et(t, fe(a), "fixed" === i.options.strategy),
                            popper: pe(a)
                        }, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach((function (e) {
                            return i.modifiersData[e.name] = Object.assign({}, e.data)
                        }));
                        for (var l = 0; l < i.orderedModifiers.length; l++) if (!0 !== i.reset) {
                            var o = i.orderedModifiers[l], n = o.fn, s = o.options, r = void 0 === s ? {} : s,
                                p = o.name;
                            "function" == typeof n && (i = n({state: i, options: r, name: p, instance: d}) || i)
                        } else i.reset = !1, l = -1
                    }
                }
            }, update: (o = function () {
                return new Promise((function (e) {
                    d.forceUpdate(), e(i)
                }))
            }, function () {
                return s || (s = new Promise((function (e) {
                    Promise.resolve().then((function () {
                        s = void 0, e(o())
                    }))
                }))), s
            }), destroy: function () {
                p(), c = !0
            }
        };
        if (!lt(e, t)) return d;

        function p() {
            r.forEach((function (e) {
                return e()
            })), r = []
        }

        return d.setOptions(a).then((function (e) {
            !c && a.onFirstUpdate && a.onFirstUpdate(e)
        })), d
    }
}

ot();
var nt = ot({defaultModifiers: [Ee, Je, Pe, ie, Ze, je, Qe, Ve, Xe]});

function st(e, t) {
    const a = Object.create(null), l = e.split(",");
    for (let o = 0; o < l.length; o++) a[l[o]] = !0;
    return t ? e => !!a[e.toLowerCase()] : e => !!a[e]
}

st("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt");
const it = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
st(it), st(it + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"), st("animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width"), st("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"), st("xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan");
st("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), st("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), st("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");
const rt = e => null !== e && "object" == typeof e;
st(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const ct = () => {
    const e = [], t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let a = 0; a < 36; a++) e[a] = t.substr(Math.floor(16 * Math.random()), 1);
    return e[14] = "4", e[19] = t.substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", e.join("")
};

function dt(e, t) {
    let a;
    return function (...l) {
        const o = l;
        clearTimeout(a), a = setTimeout((function () {
            e.apply(this, o)
        }), t)
    }
}

const pt = e => !!/^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/.test(e),
    ut = e => JSON.parse(JSON.stringify(e)), mt = e => "boolean" == typeof e,
    vt = e => "string" == typeof e && e.constructor == String, ht = e => "number" == typeof e,
    gt = e => "[object Function]" === Object.prototype.toString.call(e);
var wt = i({
    name: "BePopover",
    directives: {ClickOutside: j},
    props: {
        placement: {type: String, default: "top"},
        raw: {type: Boolean, default: !0},
        customClass: {type: String, default: ""},
        x: {type: Number},
        y: {type: Number},
        width: {type: Number},
        disabled: {type: Boolean, default: !1},
        delay: {type: Number, default: 100},
        duration: {type: Number, default: 100},
        trigger: {type: String, default: "hover"},
        triggerElm: {type: String, default: ""}
    },
    emits: ["update"],
    setup(e, t) {
        const a = r();
        let l = c(!1);
        const o = a => {
            let o = 0;
            const n = "manual" === a ? !l.value : a;
            o = n ? e.delay : e.duration, setTimeout((() => {
                L.value && !n && "hover" === e.trigger || (l.value = n, v((() => {
                    l.value && i(e.placement), t.emit("update", l.value)
                })))
            }), o)
        };
        let n = d({left: "0px", top: "0px", zIndex: "2000"}), s = null;
        const i = (t, l = "") => {
            if ("update" === l) return void s.update();
            s && s.destroy && s.destroy();
            const o = document.getElementById(`be_popover_${a.uid}`);
            let n = {
                placement: t,
                modifiers: [{
                    name: "arrow",
                    options: {element: document.getElementById(`be_popover_arrow${a.uid}`)}
                }, {name: "flip", options: {fallbackPlacements: ["top", "right", "bottom"]}}, {
                    name: "offset",
                    options: {offset: [0, 10]}
                }],
                strategy: "fixed"
            };
            if (e.x && e.y) {
                let t = {getBoundingClientRect: g()};
                s = nt(t, o, n), t.getBoundingClientRect = g(e.x, e.y), s.update()
            } else s = nt(f, o, n)
        }, g = (e = 0, t = 0) => {
            const a = {width: 0, height: 0, top: t, right: e, bottom: t, left: e};
            return () => a
        };
        let w = null, f = null;
        const y = e => {
            for (let t = 0; t < e.childNodes.length; t++) {
                let a = e.childNodes[t];
                if (3 !== a.nodeType && 8 !== a.nodeType && "SCRIPT" !== a.nodeName) {
                    let e = Number(window.getComputedStyle(a).width.split("px")[0]),
                        t = a.getBoundingClientRect().height;
                    return 0 !== e || 0 !== t ? a : y(a)
                }
            }
        }, b = {
            click: o.bind(this, !0),
            mouseenter: o.bind(this, !0),
            mouseleave: o.bind(this, !1),
            manual: o.bind(this, "manual")
        }, x = l => {
            if (t.slots.trigger) {
                const t = l || e.triggerElm;
                t ? (w = vt(t) ? document.getElementById(t) : t, f = y(a.refs.bePopoverTrigger) || w || a.refs.bePopoverTrigger) : (w = y(a.refs.bePopoverTrigger) || a.refs.bePopoverTrigger, f = w || a.refs.bePopoverTrigger), w && "click" === e.trigger && w.addEventListener("click", b.click, !1), w && "hover" === e.trigger && (w.addEventListener("mouseenter", b.mouseenter, !1), w.addEventListener("mouseleave", b.mouseleave, !1)), w && "manual" === e.trigger && w.addEventListener("click", b.manual, !1)
            } else console.error("Please set the trigger element")
        }, C = p((() => e.disabled));
        u(C, (e => {
            e ? k() : x()
        }));
        const k = () => {
            w && (w.removeEventListener("click", b.click, !1), w.removeEventListener("mouseenter", b.mouseenter, !1), w.removeEventListener("mouseleave", b.mouseleave, !1), w.removeEventListener("mouseleave", b.manual, !1))
        };
        let D = c(!1);
        m((() => {
            "hover" !== e.trigger && "manual" !== e.trigger || (D.value = !0), e.disabled || (e.width && (n.width = e.width + "px"), v((() => {
                x()
            })))
        })), h((() => {
            k(), s && s.destroy && s.destroy()
        }));
        const L = c(!1);
        return {
            handlePopoverDomLeave: () => {
                "hover" === e.trigger && (L.value = !1, o(!1))
            }, handlePopoverDomEnter: () => {
                "hover" === e.trigger && (L.value = !0)
            }, uid: a.uid, addEvent: x, stylePopover: n, outsideDisabled: D, show: l, close: () => {
                setTimeout((() => {
                    l.value = !1, L.value = !1, t.emit("update", l.value)
                }), e.duration)
            }, changeDisplay: o, computePosition: i
        }
    }
});
const ft = ["id"], yt = ["id"], bt = ["id"], xt = ["id"];
wt.render = function (e, t, a, l, o, n) {
    const s = g("click-outside");
    return w(), f(y, null, [b("div", {
        id: `be_popover_trigger${e.uid}`,
        ref: "bePopoverTrigger",
        "aria-describedby": "tooltip"
    }, [x(e.$slots, "trigger")], 8, ft), (w(), C(k, {to: "body"}, [b("div", {
        class: D(e.customClass),
        onMouseenter: t[0] || (t[0] = (...t) => e.handlePopoverDomEnter && e.handlePopoverDomEnter(...t)),
        onMouseleave: t[1] || (t[1] = (...t) => e.handlePopoverDomLeave && e.handlePopoverDomLeave(...t))
    }, [L(V, {name: "be-fade-in-linear"}, {
        default: S((() => [e.show ? B((w(), f("div", {
            id: `be_popover_${e.uid}`,
            key: `be_popover_${e.uid}`,
            class: "be-popover",
            role: "tooltip",
            style: T(e.stylePopover)
        }, [b("div", {
            id: `be_popover_body${e.uid}`,
            class: "be-popover-body"
        }, [x(e.$slots, "default")], 8, bt), e.raw ? (w(), f("div", {
            key: 0,
            id: `be_popover_arrow${e.uid}`,
            class: D("be-popover-arrow")
        }, null, 8, xt)) : P("", !0)], 12, yt)), [[s, {
            handler: e.close,
            isDisabled: e.outsideDisabled
        }]]) : P("", !0)])), _: 3
    })], 34)]))], 64)
};
var Ct = i({
    name: "BeTooltip",
    components: {"be-popover": wt},
    props: {
        placement: {type: String, default: "top"},
        raw: {type: Boolean, default: !0},
        customClass: {type: String, default: ""},
        x: {type: Number},
        y: {type: Number},
        width: {type: String},
        disabled: {type: Boolean, default: !1},
        delay: {type: Number, default: 100},
        duration: {type: Number, default: 100},
        trigger: {type: String, default: "hover"},
        content: {type: String, default: ""}
    }
});
Ct.render = function (e, t, a, l, o, n) {
    const s = z("be-popover");
    return w(), C(s, {
        placement: e.placement,
        raw: e.raw,
        "custom-class": e.customClass,
        disabled: e.disabled,
        delay: e.delay,
        duration: e.duration,
        x: e.x,
        y: e.y,
        width: e.width,
        trigger: e.trigger
    }, {
        trigger: S((() => [x(e.$slots, "default")])),
        default: S((() => [b("span", null, E(e.content), 1)])),
        _: 3
    }, 8, ["placement", "raw", "custom-class", "disabled", "delay", "duration", "x", "y", "width", "trigger"])
};
var kt = i({
    name: "BeEllipsis",
    components: {"be-tooltip": Ct},
    props: {
        content: {type: String, default: ""},
        text: {type: String, default: ""},
        expandTrigger: {type: Boolean, default: !1},
        lineClamp: {type: Number, default: null},
        elpNum: {type: Number, default: 5},
        placement: {type: String, default: "left"}
    },
    setup(e) {
        const t = r(), a = d({isExpand: !1, textCache: "", textInner: e.text}), l = () => {
            if (0 !== e.elpNum) {
                if ("left" === e.placement && (a.textInner = e.text.slice(0, e.text.length - e.elpNum) + "..."), "center" === e.placement) {
                    let t = e.elpNum / 2, l = e.text.length / 2, o = e.text.substr(0, l - t),
                        n = e.text.substr(l + t, e.text.length);
                    a.textInner = o + "..." + n
                }
                "right" === e.placement && (a.textInner = "..." + e.text.substring(e.elpNum, e.text.length))
            }
        };
        M((() => {
            a.textCache = e.text, l()
        }));
        const o = c("");
        o.value = e.lineClamp ? `\n      -webkit-line-clamp:${e.lineClamp};\n      display:-webkit-inline-box;\n      -webkit-box-orient:vertical;\n      overflow:hidden;` : "";
        return {
            state: a, styleStr: o, handleText: l, expandTriggerFunc: () => {
                e.expandTrigger && (a.isExpand = !a.isExpand, o.value = a.isExpand ? "" : `\n      -webkit-line-clamp:${e.lineClamp};\n      display:-webkit-inline-box;\n      -webkit-box-orient:vertical;\n      overflow:hidden;`, a.isExpand && (a.textInner = a.textCache), !a.isExpand && l())
            }, attrs: t.attrs
        }
    }
});
const Dt = ["innerHTML"];
kt.render = function (e, t, a, l, o, n) {
    const s = z("be-tooltip");
    return w(), C(s, {
        content: e.content,
        placement: "top"
    }, {
        default: S((() => [b("span", I(e.attrs, {
            style: e.styleStr,
            onClick: t[0] || (t[0] = (...t) => e.expandTriggerFunc && e.expandTriggerFunc(...t)),
            innerHTML: e.state.textInner
        }), null, 16, Dt)])), _: 1
    }, 8, ["content"])
}, kt.install = e => {
    e.component(kt.name, kt)
};
const Lt = kt;
var Vt = i({
    name: "BeIcon",
    props: {
        width: {type: [Number, String], default: 18},
        height: {type: [Number, String], default: 18},
        color: {type: String, default: ""},
        icon: {type: String},
        customClass: {type: String, default: ""},
        spin: {type: Boolean, default: !1}
    },
    setup(e) {
        const t = p((() => `${e.icon}`)), a = p((() => e.spin ? "be-icon-spin " + e.customClass : "" + e.customClass));
        return {props: e, iconName: t, spinClass: a}
    }
});
const St = ["width", "height"], Bt = ["xlink:href", "fill"];
Vt.render = function (e, t, a, l, o, n) {
    return w(), f("div", I({class: ["be-icon-container", e.spinClass]}, G(e.$attrs)), [(w(), f("svg", {
        class: "be-icon",
        width: e.width,
        height: e.height,
        "aria-hidden": "true"
    }, [b("use", {"xlink:href": `#${e.iconName}`, fill: e.color}, null, 8, Bt)], 8, St))], 16)
};
var Tt = {
    accountBook: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="accountBook"  t="1623251462819" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9999"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M810.666667 64a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128v-128H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533333-8.533333H128V384H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533333-8.533333H128V192a128 128 0 0 1 128-128h554.666667z m0 64H256a64 64 0 0 0-63.893333 60.245333L192 192v640a64 64 0 0 0 60.245333 63.893333L256 896h554.666667a64 64 0 0 0 63.893333-60.245333L874.666667 832V192a64 64 0 0 0-60.245334-63.893333L810.666667 128z m-155.029334 132.202667l33.173334 33.194666a8.533333 8.533333 0 0 1 0 12.053334L588.906667 405.333333H716.8c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H576v64h140.8c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H576v140.8a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V597.333333h-140.8a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334H512v-64h-140.8a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h127.872l-99.882667-99.882666a8.533333 8.533333 0 0 1 0-12.053334l33.173334-33.194666a8.533333 8.533333 0 0 1 12.074666 0l99.562667 99.562666 99.562667-99.562666a8.533333 8.533333 0 0 1 12.074666 0z"          p-id="10000"></path></symbol>',
    addCircle: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="addCircle"  t="1623251308022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2718"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m34.133333 213.333333c4.693333 0 8.533333 3.84 8.533334 8.533333V469.333333h140.8c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H554.666667v140.8a8.533333 8.533333 0 0 1-8.533334 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533334V533.333333h-140.8a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334H490.666667v-140.8c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333z"          p-id="2719"></path></symbol>',
    add: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="add"  t="1623251395878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6976"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M524.8 64c4.693333 0 8.533333 3.84 8.533333 8.533333V490.666667h418.133334c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H533.333333v418.133333a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V554.666667H51.2a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H469.333333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h46.933333z"          p-id="6977"></path></symbol>',
    addressBook: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="addressBook"  t="1623251450397" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9171"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M518.72 85.333333a203.050667 203.050667 0 0 1 203.050667 203.050667v96.469333c0 56.298667-22.613333 110.229333-62.805334 149.674667l-42.794666 42.026667a3.562667 3.562667 0 0 0-1.066667 2.538666v6.016c0 0.405333 0.234667 0.768 0.597333 0.938667l295.808 139.413333a103.104 103.104 0 0 1 59.157334 93.269334v10.752A87.850667 87.850667 0 0 1 882.816 917.333333H141.184c-46.442667 0-84.8-36.16-87.722667-83.328l-0.128-4.522666v-10.752c0-37.717333 20.586667-72.362667 54.421334-90.88l4.736-2.389334 296.192-139.562666c0.085333 0.042667 0.128 0.256 0.085333 0.746666l0.128-1.536v-6.016c0-0.853333-0.298667-1.642667 0.213333-1.066666l-1.28-1.493334-42.794666-42.005333a210.112 210.112 0 0 1-62.698667-142.613333l-0.106667-7.061334v-96.469333c0-109.781333 87.253333-199.594667 197.226667-202.965333L505.28 85.333333z m0 64h-12.949333l-4.842667 0.064a139.050667 139.050667 0 0 0-134.698667 138.986667v95.872l0.085334 5.909333a145.770667 145.770667 0 0 0 43.562666 98.709334l43.904 43.157333 3.456 3.84c10.112 12.117333 15.658667 27.392 15.658667 43.221333l-0.042667 7.552-0.256 4.693334a65.024 65.024 0 0 1-37.013333 52.608L140.650667 782.912l-2.986667 1.514667a39.104 39.104 0 0 0-20.330667 34.304v9.749333l0.042667 2.538667A23.850667 23.850667 0 0 0 141.184 853.333333h741.632c13.162667 0 23.850667-10.666667 23.850667-23.850666v-10.752c0-15.146667-8.746667-28.928-22.442667-35.392l-295.808-139.392a65.024 65.024 0 0 1-37.312-58.837334v-6.016c0-18.133333 7.296-35.498667 20.224-48.213333l42.794667-42.026667a145.770667 145.770667 0 0 0 43.648-104v-96.469333c0-76.8-62.250667-139.050667-139.050667-139.050667zM951.466667 533.333333c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333h-89.6a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334h89.6z m0-128c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333h-153.6a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334h153.6z m0-128c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333h-153.6a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334h153.6z"          p-id="9172"></path></symbol>',
    address: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="address"  t="1623251503681" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="12202" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M455.338667 117.333333a193.557333 193.557333 0 0 1 193.557333 193.557334v90.752a200.042667 200.042667 0 0 1-60.330667 143.146666l-39.936 38.997334a3.562667 3.562667 0 0 0-1.066666 2.538666l-0.021334 4.224 278.421334 130.453334a103.104 103.104 0 0 1 59.264 88.597333l0.106666 4.778667v7.530666a84.757333 84.757333 0 0 1-84.757333 84.757334H95.424a84.757333 84.757333 0 0 1-84.586667-79.210667l-0.106666-2.517333L10.666667 820.693333l0.021333-6.336c0-37.76 20.629333-72.490667 53.76-90.538666l1.984-1.024 4.48-2.24 277.525333-130.005334 0.021334-4.245333a3.562667 3.562667 0 0 0-0.362667-1.6l-0.277333-0.384-0.704-0.789333-39.68-38.762667a200.490667 200.490667 0 0 1-59.797334-129.642667l-0.384-7.125333-0.128-6.997333v-90.133334c0-104.490667 82.986667-190.144 188.373334-193.493333l5.696-0.064z m0 64h-14.165334l-4.714666 0.064a129.557333 129.557333 0 0 0-125.354667 129.493334v90.133333l0.106667 5.845333a136.042667 136.042667 0 0 0 40.917333 92.117334l41.066667 40.149333 3.498666 3.84c10.154667 12.138667 15.744 27.477333 15.744 43.349333l-0.021333 6.336-0.256 4.522667a63.125333 63.125333 0 0 1-36.053333 51.093333L98.048 778.538667l-2.986667 1.493333c-12.544 6.826667-20.394667 20.010667-20.394666 34.346667v6.506666l0.042666 2.432a20.757333 20.757333 0 0 0 20.693334 19.349334h705.173333a20.757333 20.757333 0 0 0 20.757333-20.757334v-7.530666c0-15.168-8.768-28.992-22.528-35.413334L519.893333 648.277333a63.104 63.104 0 0 1-36.330666-57.152v-4.8c0-18.197333 7.338667-35.626667 20.352-48.341333l39.957333-38.997333a136.042667 136.042667 0 0 0 41.024-97.344v-90.752A129.557333 129.557333 0 0 0 455.338667 181.333333z m222.741333 0.149334a155.541333 155.541333 0 0 1 148.501333 150.186666l0.085334 5.205334V405.333333a159.786667 159.786667 0 0 1-45.546667 111.744l-4.48 4.394667-27.008 25.536 208.192 94.485333a94.613333 94.613333 0 0 1 55.061333 76.949334l0.341334 4.565333 0.106666 4.629333a72.341333 72.341333 0 0 1-64.746666 71.957334c-5.546667-29.077333-11.861333-50.282667-18.922667-63.637334l11.328 0.021334a8.32 8.32 0 0 0 8.341333-8.32c0-11.029333-5.909333-21.12-15.317333-26.517334l-2.645333-1.365333-62.933334-28.586667a167.125333 167.125333 0 0 0-15.317333-8.170666l-153.450667-71.893334A55.466667 55.466667 0 0 1 682.666667 551.168c0-16.917333 6.4-33.130667 17.770666-45.504l3.242667-3.264 29.013333-27.413333a95.786667 95.786667 0 0 0 29.824-64.362667L762.666667 405.333333v-68.48a91.562667 91.562667 0 0 0-56.469334-84.586666c-3.626667-15.616-13.013333-39.232-28.117333-70.805334z"          p-id="12203"></path></symbol>',
    anger: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="anger"  t="1623251369381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5202"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m0 448a425.066667 425.066667 0 0 1 187.242667 43.2 8.533333 8.533333 0 0 1 4.778666 7.68V666.048a4.266667 4.266667 0 0 1-6.464 3.669333c-4.629333-2.773333-8.341333-4.906667-11.136-6.464A361.045333 361.045333 0 0 0 512 618.666667a361.024 361.024 0 0 0-185.557333 51.029333 4.266667 4.266667 0 0 1-6.464-3.648v-60.544a8.533333 8.533333 0 0 1 4.8-7.658667A425.045333 425.045333 0 0 1 512 554.666667z m-149.333333-170.666667a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z m298.666666 0a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z"          p-id="5203"></path></symbol>',
    bankCard: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="bankCard"  t="1623251491705" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="11513" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M832 128a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h640z m64 256H128v384a64 64 0 0 0 60.245333 63.893333L192 832h640a64 64 0 0 0 63.893333-60.245333L896 768V384zM354.133333 682.666667c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334h-132.266666a8.533333 8.533333 0 0 1-8.533334-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533333h132.266666zM832 192H192a64 64 0 0 0-63.893333 60.245333L128 256v64h768v-64a64 64 0 0 0-60.245333-63.893333L832 192z"          p-id="11514"></path></symbol>',
    barChart: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="barChart"  t="1623251494494" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="11649" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M874.666667 277.333333a85.333333 85.333333 0 0 1 85.333333 85.333334v448a85.333333 85.333333 0 0 1-85.333333 85.333333h-85.333334a85.333333 85.333333 0 0 1-85.333333-85.333333V362.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h85.333334zM554.666667 128a85.333333 85.333333 0 0 1 85.333333 85.333333v597.333334a85.333333 85.333333 0 0 1-85.333333 85.333333h-85.333334a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h85.333334zM234.666667 490.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v234.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V576a85.333333 85.333333 0 0 1 85.333333-85.333333h85.333334z m640-149.333334h-85.333334a21.333333 21.333333 0 0 0-21.184 18.837334L768 362.666667v448a21.333333 21.333333 0 0 0 18.837333 21.184L789.333333 832h85.333334a21.333333 21.333333 0 0 0 21.184-18.837333L896 810.666667V362.666667a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 341.333333zM554.666667 192h-85.333334a21.333333 21.333333 0 0 0-21.184 18.837333L448 213.333333v597.333334a21.333333 21.333333 0 0 0 18.837333 21.184L469.333333 832h85.333334a21.333333 21.333333 0 0 0 21.184-18.837333L576 810.666667V213.333333a21.333333 21.333333 0 0 0-18.837333-21.184L554.666667 192zM234.666667 554.666667H149.333333a21.333333 21.333333 0 0 0-21.184 18.837333L128 576v234.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 832h85.333334a21.333333 21.333333 0 0 0 21.184-18.837333L256 810.666667V576a21.333333 21.333333 0 0 0-18.837333-21.184L234.666667 554.666667z"          p-id="11650"></path></symbol>',
    calculator: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="calculator"  t="1623251428297" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8069"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M789.333333 64a170.666667 170.666667 0 0 1 170.666667 170.666667v554.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h554.666666zM469.333333 533.333333H128v256a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h234.666666V533.333333zM789.333333 128H533.333333v768h256a106.666667 106.666667 0 0 0 106.56-102.037333L896 789.333333V234.666667a106.666667 106.666667 0 0 0-102.037333-106.56L789.333333 128zM396.8 682.666667c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334h-174.933333a8.533333 8.533333 0 0 1-8.533334-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533333h174.933333z m405.333333-149.333334c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333h-174.933333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h174.933333z m0-106.666666c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334h-174.933333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h174.933333zM469.333333 128H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v234.666666h341.333333V128z m-136.533333 85.333333c4.693333 0 8.533333 3.84 8.533333 8.533334V277.333333h55.466667c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H341.333333v55.466667a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V341.333333h-55.466666a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334H277.333333v-55.466666c0-4.693333 3.84-8.533333 8.533334-8.533334h46.933333z"          p-id="8070"></path></symbol>',
    calendar: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="calendar"  t="1623251443896" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8760"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M375.466667 64c4.693333 0 8.533333 3.84 8.533333 8.533333V128h256V72.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533333V128h106.666667a128 128 0 0 1 128 128v554.666667a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h106.666667V72.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334zM874.666667 405.333333H149.333333v405.333334a64 64 0 0 0 60.245334 63.893333L213.333333 874.666667h597.333334a64 64 0 0 0 63.893333-60.245334L874.666667 810.666667V405.333333zM810.666667 192H213.333333a64 64 0 0 0-63.893333 60.245333L149.333333 256v85.333333h725.333334v-85.333333a64 64 0 0 0-60.245334-63.893333L810.666667 192z"          p-id="8761"></path></symbol>',
    card: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="card"  t="1623251414062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7795"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M832 64a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h640zM501.333333 704a160.064 160.064 0 0 1-150.890666-106.666667H128v234.666667a64 64 0 0 0 60.245333 63.893333L192 896h640a64 64 0 0 0 63.893333-60.245333L896 832V597.333333H652.224a160.064 160.064 0 0 1-150.890667 106.666667z m-95.424-170.666667a96 96 0 1 0 190.826667 0H896v-170.666666H128v170.666666h277.909333zM832 128H192a64 64 0 0 0-63.893333 60.245333L128 192v106.666667h768V192a64 64 0 0 0-60.245333-63.893333L832 128z"          p-id="7796"></path></symbol>',
    chatAdd: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="chatAdd"  t="1623251454691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9447"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 64c259.2 0 469.333333 200.576 469.333333 448s-210.133333 448-469.333333 448a484.48 484.48 0 0 1-232.725333-58.88l-116.394667 50.645333a42.666667 42.666667 0 0 1-58.517333-49.002666l29.76-125.013334C76.629333 703.402667 42.666667 611.477333 42.666667 512 42.666667 264.576 252.8 64 512 64z m0 64C287.488 128 106.666667 300.586667 106.666667 512c0 79.573333 25.557333 155.434667 72.554666 219.285333l5.525334 7.317334 18.709333 24.192-26.965333 113.237333 105.984-46.08 27.477333 15.018667C370.858667 878.229333 439.978667 896 512 896c224.512 0 405.333333-172.586667 405.333333-384S736.512 128 512 128z m34.133333 213.333333c4.693333 0 8.533333 3.84 8.533334 8.533334V469.333333h119.466666c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H554.666667v119.466667a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333V533.333333h-119.466667a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334H490.666667v-119.466666c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933333z"          p-id="9448"></path></symbol>',
    chatRight: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="chatRight"  t="1623251465170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="10137" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 64c259.2 0 469.333333 200.576 469.333333 448s-210.133333 448-469.333333 448a484.48 484.48 0 0 1-232.725333-58.88l-116.394667 50.645333a42.666667 42.666667 0 0 1-58.517333-49.002666l29.76-125.013334C76.629333 703.402667 42.666667 611.477333 42.666667 512 42.666667 264.576 252.8 64 512 64z m0 64C287.488 128 106.666667 300.586667 106.666667 512c0 79.573333 25.557333 155.434667 72.554666 219.285333l5.525334 7.317334 18.709333 24.192-26.965333 113.237333 105.984-46.08 27.477333 15.018667C370.858667 878.229333 439.978667 896 512 896c224.512 0 405.333333-172.586667 405.333333-384S736.512 128 512 128z m218.602667 256a8.533333 8.533333 0 0 1 6.037333 14.570667L495.616 639.573333c-5.461333 5.461333-12.416 8.533333-19.562667 9.216l-3.050666 0.149334c-8.192 0-16.384-3.114667-22.634667-9.365334l-134.336-134.357333a8.533333 8.533333 0 0 1 6.037333-14.570667h66.346667a8.533333 8.533333 0 0 1 6.037333 2.496l78.528 78.528 185.216-185.173333a8.533333 8.533333 0 0 1 6.037334-2.517333h66.368z"          p-id="10138"></path></symbol>',
    chatWrong: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="chatWrong"  t="1623251474522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="10688" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 64c259.2 0 469.333333 200.576 469.333333 448s-210.133333 448-469.333333 448a484.48 484.48 0 0 1-232.725333-58.88l-116.394667 50.645333a42.666667 42.666667 0 0 1-58.517333-49.002666l29.76-125.013334C76.629333 703.402667 42.666667 611.477333 42.666667 512 42.666667 264.576 252.8 64 512 64z m0 64C287.488 128 106.666667 300.586667 106.666667 512c0 79.573333 25.557333 155.434667 72.554666 219.285333l5.525334 7.317334 18.709333 24.192-26.965333 113.237333 105.984-46.08 27.477333 15.018667C370.858667 878.229333 439.978667 896 512 896c224.512 0 405.333333-172.586667 405.333333-384S736.512 128 512 128z m-100.309333 234.666667a8.533333 8.533333 0 0 1 6.037333 2.496l93.909333 93.909333 93.866667-93.909333a8.533333 8.533333 0 0 1 6.058667-2.496h66.389333a8.533333 8.533333 0 0 1 6.037333 14.570666l-127.104 127.082667 121.109334 121.109333a8.533333 8.533333 0 0 1-6.037334 14.570667h-66.346666a8.533333 8.533333 0 0 1-6.037334-2.496l-87.936-87.936-87.957333 87.936a8.533333 8.533333 0 0 1-6.037333 2.496h-66.346667a8.533333 8.533333 0 0 1-6.016-14.570667l121.109333-121.109333-127.104-127.082667a8.533333 8.533333 0 0 1 6.037334-14.570666h66.368z"          p-id="10689"></path></symbol>',
    chat: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="chat"  t="1623251496673" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="11787" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 64c259.2 0 469.333333 200.576 469.333333 448s-210.133333 448-469.333333 448a484.48 484.48 0 0 1-232.725333-58.88l-116.394667 50.645333a42.666667 42.666667 0 0 1-58.517333-49.002666l29.76-125.013334C76.629333 703.402667 42.666667 611.477333 42.666667 512 42.666667 264.576 252.8 64 512 64z m0 64C287.488 128 106.666667 300.586667 106.666667 512c0 79.573333 25.557333 155.434667 72.554666 219.285333l5.525334 7.317334 18.709333 24.192-26.965333 113.237333 105.984-46.08 27.477333 15.018667C370.858667 878.229333 439.978667 896 512 896c224.512 0 405.333333-172.586667 405.333333-384S736.512 128 512 128z m-157.696 341.333333a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z m159.018667 0a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z m158.997333 0a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z"          p-id="11788"></path></symbol>',
    classification: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="classification"  t="1623251511091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="12752" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M160 682.666667a96 96 0 1 1 0 192 96 96 0 0 1 0-192z m0 64a32 32 0 1 0 0 64 32 32 0 0 0 0-64z m791.466667 0c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H328.533333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h622.933334zM160 405.333333a96 96 0 1 1 0 192 96 96 0 0 1 0-192z m0 64a32 32 0 1 0 0 64 32 32 0 0 0 0-64z m791.466667 0c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H328.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h622.933334zM160 128a96 96 0 1 1 0 192 96 96 0 0 1 0-192z m0 64a32 32 0 1 0 0 64 32 32 0 0 0 0-64z m791.466667 0c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533333 8.533333H328.533333a8.533333 8.533333 0 0 1-8.533333-8.533333V200.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h622.933334z"          p-id="12753"></path></symbol>',
    closeVolume: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="closeVolume"  t="1623251536264" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="14128" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M150.933333 170.666667a8.533333 8.533333 0 0 1 6.037334 2.496l708.266666 708.266666a8.533333 8.533333 0 0 1-6.037333 14.549334h-66.346667a8.533333 8.533333 0 0 1-6.037333-2.496l-189.504-189.504 0.021333 93.610666a85.333333 85.333333 0 0 1-129.237333 73.173334l-171.242667-102.784L192 768a85.333333 85.333333 0 0 1-85.333333-85.333333V341.333333a85.333333 85.333333 0 0 1 50.218666-77.802666l-78.314666-78.293334A8.533333 8.533333 0 0 1 84.608 170.666667h66.346667zM213.333333 320H192a21.333333 21.333333 0 0 0-21.184 18.837333L170.666667 341.333333v341.333334a21.333333 21.333333 0 0 0 18.837333 21.184L192 704h122.581333l186.453334 111.872a21.333333 21.333333 0 0 0 32.149333-15.786667l0.149333-2.496-0.021333-157.610666-320-320z m614.698667-108.906667l0.042667 0.085334a722.773333 722.773333 0 0 1 69.653333 310.442666 723.626667 723.626667 0 0 1-47.701333 259.242667l-50.069334-50.069333a660.650667 660.650667 0 0 0 33.770667-209.173334 658.986667 658.986667 0 0 0-63.296-282.602666 8.533333 8.533333 0 0 1 3.968-11.306667l14.293333-6.976 16.213334-7.872 11.712-5.717333a8.533333 8.533333 0 0 1 11.413333 3.946666z m-115.114667 56.042667l0.042667 0.085333a595.221333 595.221333 0 0 1 56.746667 254.4c0 54.634667-7.317333 107.562667-21.056 157.845334L695.466667 626.261333a535.893333 535.893333 0 0 0 10.24-104.64 531.541333 531.541333 0 0 0-50.432-226.581333 8.533333 8.533333 0 0 1 3.989333-11.306667c3.072-1.493333 5.546667-2.709333 7.509333-3.626666l27.349334-13.333334 7.381333-3.584a8.533333 8.533333 0 0 1 11.413333 3.946667zM585.173333 180.437333a85.333333 85.333333 0 0 1 12.16 43.904l-0.021333 303.786667-64-63.957333L533.333333 224.341333a21.333333 21.333333 0 0 0-1.706666-8.405333l-1.344-2.56a21.333333 21.333333 0 0 0-27.050667-8.490667l-2.218667 1.173334-141.141333 84.650666-46.656-46.634666 154.88-92.906667a85.333333 85.333333 0 0 1 117.077333 29.269333z"          p-id="14129"></path></symbol>',
    coin: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="coin"  t="1623251331052" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3408"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 64c247.424 0 448 200.576 448 448s-200.576 448-448 448S64 759.424 64 512 264.576 64 512 64z m0 64C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384S724.074667 128 512 128z m104.32 165.717333l33.173333 33.194667a8.533333 8.533333 0 0 1 0 12.053333L561.770667 426.666667H674.133333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334H554.666667v42.666666h119.466666c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H554.666667v119.466667a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333V597.333333h-119.466667a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334H490.666667v-42.666666h-119.466667a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h106.538667l-87.701334-87.68a8.533333 8.533333 0 0 1 0-12.074667l33.173334-33.194667a8.533333 8.533333 0 0 1 12.074666 0l84.48 84.48 84.48-84.48a8.533333 8.533333 0 0 1 12.053334 0z"          p-id="3409"></path></symbol>',
    collect: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="collect"  t="1623251426021" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7931"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M789.333333 64a128 128 0 0 1 128 128v607.488l32.64-7.744 1.493334-0.149333a8.533333 8.533333 0 0 1 8.362666 6.826666l0.170667 1.706667v46.464a8.533333 8.533333 0 0 1-4.992 7.765333l-1.557333 0.533334-439.466667 104.64a8.533333 8.533333 0 0 1-3.968 0l-439.466667-104.64A8.533333 8.533333 0 0 1 64 846.592v-46.464a8.533333 8.533333 0 0 1 10.517333-8.298667L106.666667 799.488V192a128 128 0 0 1 128-128h554.666666z m0 64H234.666667a64 64 0 0 0-63.893334 60.245333L170.666667 192v622.72l339.349333 80.810667a8.533333 8.533333 0 0 0 3.968 0L853.333333 814.72V192a64 64 0 0 0-60.245333-63.893333L789.333333 128z m-157.930666 131.456l33.173333 33.173333a8.533333 8.533333 0 0 1 0 12.074667L561.792 407.466667H695.466667c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H554.666667v42.666666h140.8c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H554.666667v162.133334a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333v-162.133334h-140.8a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334H490.666667v-42.666666h-140.8a8.533333 8.533333 0 0 1-8.533334-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533333h127.829333l-102.741333-102.762667a8.533333 8.533333 0 0 1 0-12.074667l33.173333-33.173333a8.533333 8.533333 0 0 1 12.074667 0l99.562666 99.541333 99.562667-99.541333a8.533333 8.533333 0 0 1 12.074667 0z"          p-id="7932"></path></symbol>',
    collection: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="collection"  t="1623251476401" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="10826" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M530.88 79.488a42.666667 42.666667 0 0 1 19.370667 19.370667l118.485333 240.064 264.96 38.506666a42.666667 42.666667 0 0 1 23.637333 72.768l-191.722666 186.88L810.88 900.906667a42.666667 42.666667 0 0 1-61.909333 44.992L512 821.333333l-236.970667 124.586667A42.666667 42.666667 0 0 1 213.12 900.906667l45.269333-263.850667-191.722666-186.88a42.666667 42.666667 0 0 1 23.658666-72.768l264.938667-38.506667 118.485333-240.064a42.666667 42.666667 0 0 1 57.130667-19.370666z m95.36 317.930667L512 165.909333l-114.24 231.509334L142.293333 434.56l184.853334 180.181333-43.648 254.421334L512 749.034667l228.48 120.106666-43.626667-254.421333 184.832-180.181333-255.445333-37.12z"          p-id="10827"></path></symbol>',
    compass: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="compass"  t="1623251346068" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3960"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m195.029333 235.818666a42.666667 42.666667 0 0 1 0 29.162667l-75.818666 208.512a85.333333 85.333333 0 0 1-51.050667 51.050667l-208.512 75.818666a42.666667 42.666667 0 0 1-54.677333-54.677333l75.818666-208.512a85.333333 85.333333 0 0 1 51.050667-51.050667l208.512-75.818666a42.666667 42.666667 0 0 1 54.677333 25.514666zM631.253333 392.746667l-165.546666 60.202666a21.333333 21.333333 0 0 0-11.690667 10.282667l-1.066667 2.474667-60.202666 165.546666 165.546666-60.202666a21.333333 21.333333 0 0 0 11.690667-10.282667l1.066667-2.474667 60.202666-165.546666z"          p-id="3961"></path></symbol>',
    content: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="content"  t="1623251499745" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="11925" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M426.666667 128c38.229333 0 72.533333 16.768 96 43.328a127.701333 127.701333 0 0 1 90.005333-43.2L618.666667 128h234.666666a128 128 0 0 1 127.914667 123.2L981.333333 256v512a128 128 0 0 1-123.2 127.914667L853.333333 896H613.162667a117.098667 117.098667 0 0 1-90.496 42.666667 117.098667 117.098667 0 0 1-90.496-42.666667H192a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h234.666667z m43.733333 704a53.333333 53.333333 0 0 0 104.533333 0H853.333333l3.754667-0.106667a64 64 0 0 0 60.138667-60.138666L917.333333 768V256l-0.106666-3.754667A64 64 0 0 0 853.333333 192H618.666667l-3.754667 0.106667a64 64 0 0 0-60.138667 60.138666L554.666667 256v460.8a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333V256a64 64 0 0 0-56.533334-63.573333l-3.712-0.32L426.666667 192H192a64 64 0 0 0-63.893333 60.245333L128 256v512a64 64 0 0 0 60.245333 63.893333L192 832h278.4z"          p-id="11926"></path>    <path d="M200.533333 405.333333h217.6c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H200.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334zM200.533333 533.333333h217.6c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H200.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334zM627.2 405.333333h217.6c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H627.2a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334zM627.2 533.333333h217.6c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H627.2a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334z"          p-id="11927"></path></symbol>',
    coupon: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="coupon"  t="1623251509023" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="12614" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M290.986667 128a8.533333 8.533333 0 0 1 8.469333 7.466667c0.789333 6.165333 1.792 10.88 2.965333 14.186666a64.021333 64.021333 0 0 0 120.341334 0.384 71.253333 71.253333 0 0 0 3.093333-14.592A8.533333 8.533333 0 0 1 434.346667 128H832a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128H434.346667a8.533333 8.533333 0 0 1-8.448-7.466667 69.76 69.76 0 0 0-2.688-13.333333 64.021333 64.021333 0 0 0-121.002667-0.256c-1.088 3.157333-2.026667 7.68-2.773333 13.589333a8.533333 8.533333 0 0 1-8.448 7.466667H192a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h98.986667z m-39.168 64H192a64 64 0 0 0-63.893333 60.245333L128 256v512a64 64 0 0 0 60.245333 63.893333L192 832h59.797333l1.109334-1.898667a127.957333 127.957333 0 0 1 104.96-62.016L362.666667 768a127.936 127.936 0 0 1 109.76 62.101333l1.088 1.898667H832a64 64 0 0 0 63.893333-60.245333L896 768V256a64 64 0 0 0-60.245333-63.893333L832 192H473.493333l-1.066666 1.898667A127.936 127.936 0 0 1 362.666667 256a127.936 127.936 0 0 1-109.76-62.101333L251.818667 192z m123.648 192c4.693333 0 8.533333 3.84 8.533333 8.533333v238.933334a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533333V392.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334z"          p-id="12615"></path></symbol>',
    deleteIc: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="deleteIc"  t="1623251392398" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6704"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M213.717333 173.162667l287.274667 287.232L788.202667 173.162667A8.533333 8.533333 0 0 1 794.24 170.666667h66.901333a8.533333 8.533333 0 0 1 6.037334 14.570666L546.496 505.898667l332.842667 332.864a8.533333 8.533333 0 0 1-6.037334 14.570666h-66.389333a8.533333 8.533333 0 0 1-6.037333-2.496L501.248 551.146667 201.514667 850.837333a8.533333 8.533333 0 0 1-6.016 2.496H128.64a8.533333 8.533333 0 0 1-6.037333-14.570666l333.12-333.12-320.426667-320.426667A8.533333 8.533333 0 0 1 141.333333 170.666667h66.346667a8.533333 8.533333 0 0 1 6.037333 2.496z"          p-id="6705"></path></symbol>',
    down2: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="down2"  t="1623251333701" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3546"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m162.133333 294.592c4.693333 0 8.533333 3.818667 8.533334 8.533333v66.346667a8.533333 8.533333 0 0 1-2.496 6.037333l-153.088 153.088-2.005334 1.770667a21.248 21.248 0 0 1-11.818666 4.437333h-2.517334a21.248 21.248 0 0 1-13.824-6.186667l-153.088-153.088a8.533333 8.533333 0 0 1-2.496-6.016v-66.389333a8.533333 8.533333 0 0 1 14.570667-6.037333l156.074667 156.074666 156.117333-156.074666a8.533333 8.533333 0 0 1 6.037333-2.496z"          p-id="3547"></path></symbol>',
    downland: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="downland"  t="1623251520805" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="13302" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M311.466667 64c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533333 8.533333H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v554.666666a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 789.333333V234.666667a106.666667 106.666667 0 0 0-102.037333-106.56L789.333333 128h-55.466666a8.533333 8.533333 0 0 1-8.533334-8.533333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333H789.333333a170.666667 170.666667 0 0 1 170.666667 170.666667v554.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h76.8z m234.666666 0c4.693333 0 8.533333 3.84 8.533334 8.533333v454.976l156.096-156.096a8.533333 8.533333 0 0 1 14.570666 6.037334v66.389333a8.533333 8.533333 0 0 1-2.496 6.016l-185.386666 185.408a21.226667 21.226667 0 0 1-11.328 5.909333l-2.517334 0.298667h-2.517333a21.248 21.248 0 0 1-13.824-6.186667l-184.746667-184.810666a8.533333 8.533333 0 0 1-2.517333-6.016v-66.368a8.533333 8.533333 0 0 1 14.570667-6.037334L490.666667 528.149333V72.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333z"          p-id="13303"></path></symbol>',
    edit: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="edit"  t="1623251434415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8345"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M816.277333 165.056a128 128 0 0 1 0 181.013333L309.653333 852.693333a21.333333 21.333333 0 0 1-15.082666 6.229334H165.056a42.666667 42.666667 0 0 1-42.666667-42.666667v-129.493333a21.333333 21.333333 0 0 1 6.229334-15.104L635.306667 165.056a128 128 0 0 1 180.992 0z m-45.226666 45.226667a64 64 0 0 0-87.786667-2.56l-2.752 2.56L188.885333 701.930667a8.533333 8.533333 0 0 0-2.496 6.037333v78.464c0 4.714667 3.818667 8.533333 8.533334 8.533333h78.421333a8.533333 8.533333 0 0 0 6.037333-2.517333l491.648-491.605333a64 64 0 0 0 2.581334-87.786667l-2.56-2.730667z"          p-id="8346"></path>    <path d="M590.016 210.304l181.013333 181.013333-45.248 45.248-181.013333-181.013333z" p-id="8347"></path>    <path d="M490.666667 795.733333m8.533333 0l345.6 0q8.533333 0 8.533333 8.533334l0 46.933333q0 8.533333-8.533333 8.533333l-345.6 0q-8.533333 0-8.533333-8.533333l0-46.933333q0-8.533333 8.533333-8.533334Z"          p-id="8348"></path>    <path d="M661.333333 667.733333m8.533334 0l174.933333 0q8.533333 0 8.533333 8.533334l0 46.933333q0 8.533333-8.533333 8.533333l-174.933333 0q-8.533333 0-8.533334-8.533333l0-46.933333q0-8.533333 8.533334-8.533334Z"          p-id="8349"></path></symbol>',
    error: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="error"  t="1623251317710" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2994"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m-104.746667 256a8.533333 8.533333 0 0 1 6.037334 2.496L512 463.850667l98.688-98.688a8.533333 8.533333 0 0 1 6.037333-2.496h66.346667a8.533333 8.533333 0 0 1 6.037333 14.570666l-131.84 131.861334 137.642667 137.664a8.533333 8.533333 0 0 1-6.037333 14.570666h-66.346667a8.533333 8.533333 0 0 1-6.037333-2.496L512 554.346667l-104.512 104.490666a8.533333 8.533333 0 0 1-6.037333 2.496h-66.346667a8.533333 8.533333 0 0 1-6.016-14.570666l137.664-137.664-131.861333-131.861334A8.533333 8.533333 0 0 1 340.906667 362.666667h66.346666z"          p-id="2995"></path></symbol>',
    express: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="express"  t="1623251448368" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9035"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M533.333333 128a85.333333 85.333333 0 0 1 85.333334 85.333333v21.312L839.317333 234.666667a85.333333 85.333333 0 0 1 56.832 21.674666l3.52 3.328 77.994667 77.994667a85.333333 85.333333 0 0 1 24.874667 55.509333l0.128 4.842667V725.333333a85.333333 85.333333 0 0 1-81.066667 85.226667L917.333333 810.666667h-25.749333a117.376 117.376 0 0 1-225.834667 0L618.666667 810.666667V810.666667l-196.416 0.021333a117.376 117.376 0 0 1-225.834667 0L106.666667 810.666667a85.333333 85.333333 0 0 1-85.333334-85.333334V213.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h426.666666zM309.333333 725.333333a53.333333 53.333333 0 1 0 0 106.666667 53.333333 53.333333 0 0 0 0-106.666667z m469.333334 0a53.333333 53.333333 0 1 0 0 106.666667 53.333333 53.333333 0 0 0 0-106.666667zM533.333333 192H106.666667a21.333333 21.333333 0 0 0-21.184 18.837333L85.333333 213.333333v512a21.333333 21.333333 0 0 0 18.837334 21.184L106.666667 746.666667h89.749333a117.376 117.376 0 0 1 225.834667 0H554.666667V213.333333a21.333333 21.333333 0 0 0-16.426667-20.778666l-2.410667-0.426667L533.333333 192z m305.984 106.666667H618.666667v448h47.082666a117.376 117.376 0 0 1 225.834667 0H917.333333l2.496-0.149334a21.333333 21.333333 0 0 0 18.688-18.688L938.666667 725.333333V398.016l-0.192-2.816a21.333333 21.333333 0 0 0-4.202667-10.154667l-1.856-2.133333-78.016-77.994667-2.112-1.856a21.333333 21.333333 0 0 0-10.154667-4.202666L839.317333 298.666667z"          p-id="9036"></path></symbol>',
    eye: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="eye"  t="1623251458455" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9723"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M511.978667 149.312c85.717333 0 164.202667 32.384 224.810666 86.058667l7.616 6.848c43.413333 39.552 111.936 110.229333 205.525334 212.053333a85.333333 85.333333 0 0 1 3.136 111.893333l-3.093334 3.562667-33.770666 36.586667c-82.133333 88.533333-142.229333 149.546667-180.352 183.061333-60.48 53.205333-138.581333 85.269333-223.872 85.269333-85.802667 0-164.352-32.448-224.981334-86.229333l-7.594666-6.826667c-43.370667-39.552-111.808-110.165333-205.333334-211.84a85.333333 85.333333 0 0 1-3.093333-111.978666l3.114667-3.562667 41.706666-45.098667c77.610667-83.328 134.677333-141.162667 171.157334-173.546666C347.584 181.76 426.154667 149.312 512 149.312z m0 64c-67.712 0-131.712 25.024-182.549334 70.122667l-7.253333 6.528c-37.674667 34.389333-96.725333 94.933333-176.384 180.906666l-24.597333 26.666667a21.333333 21.333333 0 0 0 0 28.885333L153.6 561.493333c80.938667 87.168 139.818667 147.072 175.850667 179.029334 50.837333 45.077333 114.794667 70.101333 182.506666 70.101333 67.285333 0 130.901333-24.725333 181.610667-69.333333l7.296-6.506667c37.952-34.389333 97.28-95.146667 177.237333-181.546667l24.704-26.816a21.333333 21.333333 0 0 0 0-28.864l-40.234666-43.498666c-77.013333-82.730667-133.333333-139.882667-168.256-170.794667-50.816-45.013333-114.730667-69.973333-182.357334-69.973333zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384z m0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z m0 42.666667a85.333333 85.333333 0 1 1-85.226667 89.6L426.666667 512h64a21.333333 21.333333 0 0 0 21.184-18.837333L512 490.666667v-64z"          p-id="9724"></path></symbol>',
    faceRecognition: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="faceRecognition"  t="1623251478210" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="10964" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M64 490.666667m8.533333 0l878.933334 0q8.533333 0 8.533333 8.533333l0 46.933333q0 8.533333-8.533333 8.533334l-878.933334 0q-8.533333 0-8.533333-8.533334l0-46.933333q0-8.533333 8.533333-8.533333Z"          p-id="10965"></path>    <path d="M128 669.866667v154.133333a72 72 0 0 0 67.776 71.893333l4.224 0.106667H354.133333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H205.482667A141.482667 141.482667 0 0 1 64 818.517333V669.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533334z m832 0v148.650666A141.482667 141.482667 0 0 1 818.517333 960H669.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533334-8.533333h154.133333a72 72 0 0 0 71.893333-67.776l0.106667-4.224V669.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533334z m-597.333333-597.333334v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H200a72 72 0 0 0-71.893333 67.776L128 200V354.133333a8.533333 8.533333 0 0 1-8.533333 8.533334H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533334V205.482667A141.482667 141.482667 0 0 1 205.482667 64H354.133333c4.693333 0 8.533333 3.84 8.533334 8.533333zM818.517333 64A141.482667 141.482667 0 0 1 960 205.482667V354.133333a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V200a72 72 0 0 0-67.776-71.893333L824 128H669.866667a8.533333 8.533333 0 0 1-8.533334-8.533333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h148.650666zM694.058667 618.688L748.074667 618.666667a4.970667 4.970667 0 0 1 4.906666 5.781333 243.669333 243.669333 0 0 1-234.666666 207.466667L512 832a243.669333 243.669333 0 0 1-240.618667-205.226667 7.082667 7.082667 0 0 1 7.04-8.106666h1.152a543233.92 543233.92 0 0 0 48.298667 0 8.533333 8.533333 0 0 1 8.341333 6.826666l0.362667 1.706667c17.621333 79.765333 87.317333 138.176 169.045333 140.714667l5.546667 0.085333 5.504-0.064a179.669333 179.669333 0 0 0 171.52-144.405333 5.973333 5.973333 0 0 1 5.866667-4.842667zM512 192c144.426667 0 261.482667 117.077333 261.482667 261.482667 0 11.562667-0.768 23.104-2.282667 34.56L762.304 554.666667h-64.576l10.026667-75.093334a197.482667 197.482667 0 1 0-392.192-5.674666l0.682666 5.696 9.984 75.072h-64.554666l-8.874667-66.624c-19.072-143.146667 81.493333-274.666667 224.64-293.76A261.482667 261.482667 0 0 1 512 192z"          p-id="10966"></path></symbol>',
    fillIn: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="fillIn"  t="1623251501631" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="12064" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M662.058667 64a8.533333 8.533333 0 0 1 6.037333 14.570667l-46.933333 46.933333a8.533333 8.533333 0 0 1-6.058667 2.496H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v554.666666a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 789.333333V408.874667a8.533333 8.533333 0 0 1 2.496-6.037334l46.933333-46.933333a8.533333 8.533333 0 0 1 14.570667 6.037333V789.333333a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h427.392zM926.933333 94.442667a105.685333 105.685333 0 0 1 3.2 146.133333l-3.882666 4.010667-310.4 304.661333a85.333333 85.333333 0 0 1-59.754667 24.448h-71.786667a42.666667 42.666667 0 0 1-42.666666-42.666667v-71.04a85.333333 85.333333 0 0 1 25.322666-60.672l308.693334-305.28a107.264 107.264 0 0 1 151.274666 0.426667z m-172.992 111.082666L511.957333 444.8a21.333333 21.333333 0 0 0-6.144 12.330667l-0.170666 2.837333v49.706667h50.453333a21.333333 21.333333 0 0 0 12.821333-4.309334l2.112-1.813333 242.709334-238.250667-59.797334-59.797333z m69.12-68.16l-2.389333 2.176-21.226667 20.992 59.968 59.946667 22.272-21.824c16.277333-16.277333 16.277333-42.666667 0-58.944a43.264 43.264 0 0 0-58.645333-2.346667z"          p-id="12065"></path></symbol>',
    folder: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="folder"  t="1623251507248" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="12478" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M810.666667 85.333333a85.333333 85.333333 0 0 1 85.333333 85.333334v152.021333c36.821333 9.493333 64 42.88 64 82.645333v405.333334a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V298.666667a85.376 85.376 0 0 1 64-82.645334V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h597.333334zM128.149333 296.170667L128 298.666667v512a64 64 0 0 0 60.245333 63.893333L192 874.666667h640a64 64 0 0 0 63.893333-60.245334L896 810.666667V405.333333a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 384H638.165333l-122.069333-101.717333a21.333333 21.333333 0 0 0-10.688-4.736l-2.986667-0.213334H149.333333a21.333333 21.333333 0 0 0-21.184 18.837334zM535.189333 213.333333l127.978667 106.666667H832V170.666667a21.333333 21.333333 0 0 0-18.837333-21.184L810.666667 149.333333H213.333333a21.333333 21.333333 0 0 0-21.184 18.837334L192 170.666667v42.666666h343.168z"          p-id="12479"></path></symbol>',
    friendDelete: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="friendDelete"  t="1623251472642" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="10549" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M518.72 96a203.050667 203.050667 0 0 1 203.050667 203.050667v96.469333c0 56.298667-22.613333 110.229333-62.805334 149.674667l-42.794666 42.026666a3.562667 3.562667 0 0 0-1.066667 2.538667v6.016c0 0.405333 0.234667 0.768 0.597333 0.938667l33.664 15.850666a224.64 224.64 0 0 0-37.909333 52.906667l-23.04-10.88a65.024 65.024 0 0 1-37.312-58.816v-6.016c0-18.133333 7.296-35.498667 20.224-48.213333l42.794667-42.026667a145.770667 145.770667 0 0 0 43.648-104v-96.469333c0-76.8-62.250667-139.050667-139.050667-139.050667h-12.949333l-4.842667 0.064a139.050667 139.050667 0 0 0-134.698667 138.986667v95.872l0.085334 5.909333a145.770667 145.770667 0 0 0 43.562666 98.709333l43.904 43.157334 3.456 3.84c10.112 12.117333 15.658667 27.392 15.658667 43.221333l-0.042667 7.552-0.256 4.693333a65.024 65.024 0 0 1-37.013333 52.608L140.650667 793.578667l-2.986667 1.514666a39.104 39.104 0 0 0-20.330667 34.304v9.749334l0.042667 2.538666A23.850667 23.850667 0 0 0 141.184 864h467.050667a224.576 224.576 0 0 0 45.674666 64H141.184c-46.442667 0-84.8-36.16-87.722667-83.328l-0.128-4.522667v-10.752c0-37.717333 20.586667-72.362667 54.421334-90.88l4.736-2.389333 296.192-139.562667c0.085333 0.042667 0.128 0.256 0.085333 0.746667l0.128-1.536v-6.016c0-0.853333-0.298667-1.642667 0.213333-1.066667l-1.28-1.493333-42.794666-42.005333a210.112 210.112 0 0 1-62.698667-142.613334l-0.106667-7.061333v-96.469333c0-109.781333 87.253333-199.594667 197.226667-202.965334l5.824-0.085333z"          p-id="10550"></path>    <path d="M810.666667 597.333333a170.666667 170.666667 0 1 1 0 341.333334 170.666667 170.666667 0 0 1 0-341.333334z m0 64a106.666667 106.666667 0 1 0 0 213.333334 106.666667 106.666667 0 0 0 0-213.333334z"          p-id="10551"></path>    <path d="M780.496777 692.575277m6.033978 6.033978l93.526657 93.526656q6.033978 6.033978 0 12.067956l-33.186878 33.186878q-6.033978 6.033978-12.067956 0l-93.526657-93.526656q-6.033978-6.033978 0-12.067956l33.186878-33.186878q6.033978-6.033978 12.067956 0Z"          p-id="10552"></path>    <path d="M840.834816 692.575998m-6.033978 6.033977l-93.526657 93.526657q-6.033978 6.033978 0 12.067956l33.186878 33.186878q6.033978 6.033978 12.067956 0l93.526657-93.526657q6.033978-6.033978 0-12.067955l-33.186878-33.186879q-6.033978-6.033978-12.067956 0Z"          p-id="10553"></path></symbol>',
    friendDelete2: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="friendDelete2"  t="1623251479873" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="11101" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M518.72 96a203.050667 203.050667 0 0 1 202.986667 197.269333l0.064 5.781334v96.469333c0 53.952-20.778667 105.749333-57.877334 144.682667l-4.906666 4.992-42.816 42.026666a3.562667 3.562667 0 0 0-0.938667 1.6l-0.128 0.938667v6.016c0 0.277333 0.106667 0.512 0.277333 0.704l0.32 0.213333 33.664 15.872a224.64 224.64 0 0 0-37.909333 52.906667l-23.04-10.88a65.024 65.024 0 0 1-37.162667-54.634667l-0.149333-4.181333v-6.016c0-16.64 6.122667-32.597333 17.109333-44.949333l3.114667-3.264 42.794667-42.026667a145.770667 145.770667 0 0 0 43.52-97.493333l0.128-6.506667v-96.469333a139.050667 139.050667 0 0 0-134.058667-138.965334l-4.992-0.085333h-12.949333l-4.842667 0.064a139.050667 139.050667 0 0 0-134.613333 133.994667l-0.085334 4.992v95.872l0.085334 5.909333a145.770667 145.770667 0 0 0 38.976 93.994667l4.586666 4.693333 43.904 43.178667 3.456 3.84c9.088 10.88 14.506667 24.384 15.488 38.485333l0.170667 4.736-0.042667 7.552-0.256 4.693333a65.024 65.024 0 0 1-33.194666 50.645334l-3.818667 1.962666-294.933333 138.965334-2.986667 1.514666a39.104 39.104 0 0 0-20.202667 31.018667l-0.128 3.285333v9.749334l0.042667 2.538666c0.725333 11.648 9.856 20.992 21.333333 22.186667l2.474667 0.128h467.050667a224.576 224.576 0 0 0 45.674666 64H141.184c-45.013333 0-82.389333-33.92-87.338667-78.933333l-0.384-4.394667-0.128-4.522667v-10.752c0-36.074667 18.837333-69.333333 50.090667-88.384l4.330667-2.496 4.736-2.389333 296.192-139.562667c0.064 0.021333 0.106667 0.128 0.106666 0.341334L408.746667 597.333333l0.128-1.536v-6.016c0-0.64-0.170667-1.237333-0.021334-1.28l0.256 0.213334-1.301333-1.493334-42.794667-42.005333a209.984 209.984 0 0 1-62.314666-135.552l-0.384-7.04-0.106667-7.082667v-96.469333c0-107.861333 84.224-196.437333 191.466667-202.709333l5.76-0.256 5.824-0.085334h13.44zM810.666667 608a160 160 0 1 1 0 320 160 160 0 0 1 0-320z m0 64a96 96 0 1 0 0 192 96 96 0 0 0 0-192z m44.8 64c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533333 8.533333h-89.6a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533334-8.533333h89.6z"          p-id="11102"></path></symbol>',
    friendSettings: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="friendSettings"  t="1623251436583" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8484"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M540.053333 96a203.050667 203.050667 0 0 1 202.986667 197.269333l0.064 5.781334v96.469333c0 53.952-20.778667 105.749333-57.877333 144.682667l-4.906667 4.992-42.816 42.026666a3.562667 3.562667 0 0 0-0.938667 1.6l-0.128 0.938667v6.016c0 0.277333 0.106667 0.512 0.277334 0.704l0.32 0.213333 35.413333 16.704a8.533333 8.533333 0 0 1 3.626667 12.16l-24.618667 40.277334a8.533333 8.533333 0 0 1-10.922667 3.264l-30.784-14.506667a65.024 65.024 0 0 1-37.162666-54.634667l-0.149334-4.181333v-6.016c0-16.64 6.122667-32.597333 17.109334-44.949333l3.114666-3.264 42.794667-42.026667a145.770667 145.770667 0 0 0 43.52-97.493333l0.128-6.506667v-96.469333a139.050667 139.050667 0 0 0-134.058667-138.965334l-4.992-0.085333h-12.949333l-4.842667 0.064a139.050667 139.050667 0 0 0-134.613333 133.994667l-0.085333 4.992v95.872l0.085333 5.909333a145.770667 145.770667 0 0 0 38.976 93.994667l4.586667 4.693333 43.904 43.178667 3.456 3.84c9.088 10.88 14.506667 24.384 15.488 38.485333l0.170666 4.736-0.042666 7.552-0.256 4.693333a65.024 65.024 0 0 1-33.194667 50.645334l-3.818667 1.962666-294.933333 138.965334-2.986667 1.514666a39.104 39.104 0 0 0-20.202666 31.018667l-0.128 3.285333v4.330667l0.042666 2.389333a18.517333 18.517333 0 0 0 16.085334 17.066667l2.389333 0.149333h448.96a8.533333 8.533333 0 0 1 7.488 4.416l25.813333 46.933334a8.533333 8.533333 0 0 1-7.466666 12.650666H157.162667c-42.069333 0-77.077333-31.573333-81.984-73.728l-0.405334-4.266666-0.128-4.522667v-5.418667c0-36.074667 18.837333-69.333333 50.090667-88.384l4.330667-2.496 4.736-2.389333 296.192-139.562667 0.085333 0.106667v0.64l0.128-1.536v-6.016l-0.085333-1.066667c0-0.106667 0-0.192 0.064-0.213333l0.256 0.213333-1.301334-1.493333-42.794666-42.005333a209.984 209.984 0 0 1-62.314667-135.552l-0.384-7.04-0.106667-7.082667v-96.469333c0-107.861333 84.224-196.437333 191.466667-202.709334l5.76-0.256 5.824-0.085333h13.44z m330.581334 565.312a8.533333 8.533333 0 0 1 7.402666 4.266667l67.712 117.653333a8.533333 8.533333 0 0 1 0.064 8.384l-67.072 121.301333a8.533333 8.533333 0 0 1-7.466666 4.394667h-140.074667a8.533333 8.533333 0 0 1-7.402667-4.266667l-70.272-121.301333a8.533333 8.533333 0 0 1 0.064-8.682667l70.933334-117.632a8.533333 8.533333 0 0 1 7.317333-4.117333z m-36.992 64h-65.664a8.533333 8.533333 0 0 0-7.317334 4.117333l-32.725333 54.272a8.533333 8.533333 0 0 0-0.064 8.682667l32.810667 56.682667a8.533333 8.533333 0 0 0 7.402666 4.245333h65.450667a8.533333 8.533333 0 0 0 7.466667-4.394667l31.338666-56.682666a8.533333 8.533333 0 0 0-0.085333-8.384L841.024 729.6a8.533333 8.533333 0 0 0-7.381333-4.266667z"          p-id="8485"></path></symbol>',
    friendsAdd: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="friendsAdd"  t="1623251531662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="13852" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M529.386667 85.333333a203.050667 203.050667 0 0 1 202.986666 197.269334l0.064 5.781333v96.469333c0 53.952-20.778667 105.749333-57.877333 144.682667l-4.906667 4.992-42.816 42.026667a3.562667 3.562667 0 0 0-0.938666 1.6l-0.128 0.938666v6.016c0 0.277333 0.106667 0.512 0.277333 0.704l0.32 0.213334 51.413333 24.234666a8.533333 8.533333 0 0 1 4.885334 7.722667V669.866667a8.533333 8.533333 0 0 1-12.16 7.722666l-71.424-33.642666a65.024 65.024 0 0 1-37.162667-54.656l-0.149333-4.181334v-6.016c0-16.64 6.122667-32.597333 17.109333-44.949333l3.114667-3.264 42.794666-42.026667a145.770667 145.770667 0 0 0 43.52-97.493333l0.128-6.506667v-96.469333a139.050667 139.050667 0 0 0-134.058666-138.965333L529.386667 149.333333h-12.949334l-4.842666 0.064a139.050667 139.050667 0 0 0-134.613334 133.994667l-0.085333 4.992v95.872l0.085333 5.909333a145.770667 145.770667 0 0 0 38.976 93.994667l4.586667 4.693333 43.904 43.178667 3.456 3.84c9.088 10.88 14.506667 24.384 15.488 38.485333l0.170667 4.736-0.042667 7.552-0.256 4.693334a65.024 65.024 0 0 1-33.194667 50.645333l-3.818666 1.962667-294.933334 138.965333-2.986666 1.514667a39.104 39.104 0 0 0-20.202667 31.018666L128 818.730667v9.749333l0.042667 2.538667c0.725333 11.648 9.856 20.992 21.333333 22.186666l2.474667 0.128H674.133333c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H151.850667c-45.013333 0-82.389333-33.92-87.338667-78.933333l-0.384-4.394667L64 829.482667v-10.752c0-36.074667 18.837333-69.333333 50.090667-88.384l4.330666-2.496 4.736-2.389334 296.192-139.562666 0.085334 0.106666v0.64l0.128-1.536v-6.016l-0.085334-1.066666c0-0.106667 0-0.192 0.064-0.213334l0.256 0.213334-1.301333-1.493334-42.794667-42.005333a209.984 209.984 0 0 1-62.314666-135.552l-0.384-7.04-0.106667-7.082667v-96.469333c0-107.861333 84.224-196.437333 191.466667-202.709333l5.76-0.256 5.824-0.085334h13.44z"          p-id="13853"></path>    <path d="M797.866667 682.666667h46.933333c4.693333 0 8.533333 3.84 8.533333 8.533333v217.6a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V691.2c0-4.693333 3.84-8.533333 8.533334-8.533333z"          p-id="13854"></path>    <path d="M712.533333 768h217.6c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H712.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533333-8.533333z"          p-id="13855"></path></symbol>',
    gift: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="gift"  t="1623251526474" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="13576" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M256 960a128 128 0 0 1-128-128V466.645333A85.376 85.376 0 0 1 64 384v-106.666667a85.333333 85.333333 0 0 1 85.333333-85.333333h290.901334l-68.629334-68.629333a8.533333 8.533333 0 0 1 0-12.074667l33.194667-33.173333a8.533333 8.533333 0 0 1 12.053333 0l84.48 84.48 84.48-84.48a8.533333 8.533333 0 0 1 12.053334 0l33.194666 33.173333a8.533333 8.533333 0 0 1 0 12.074667l-68.650666 68.608L874.666667 192a85.333333 85.333333 0 0 1 85.333333 85.333333v106.666667a85.376 85.376 0 0 1-64 82.645333V832a128 128 0 0 1-128 128H256z m213.333333-490.666667H192v362.666667a64 64 0 0 0 60.245333 63.893333L256 896h213.333333V469.333333z m362.666667 0H533.333333v426.666667h234.666667a64 64 0 0 0 63.893333-60.245333L832 832V469.333333zM469.333333 256H149.333333a21.333333 21.333333 0 0 0-21.184 18.837333L128 277.333333v106.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 405.333333h320v-149.333333z m405.333334 0H533.333333v149.333333h341.333334a21.333333 21.333333 0 0 0 21.184-18.837333L896 384v-106.666667a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 256z"          p-id="13577"></path></symbol>',
    good: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="good"  t="1623251529664" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="13714" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M192 938.666667a128 128 0 0 1-128-128V469.333333a128 128 0 0 1 128-128h83.797333l45.76-183.338666a85.333333 85.333333 0 0 1 102.784-62.293334l32.149334 7.744a128 128 0 0 1 98.005333 124.736L554.368 277.333333h200.170667a170.666667 170.666667 0 0 1 170.176 183.616l-21.333334 280.554667A213.333333 213.333333 0 0 1 690.645333 938.666667H192z m85.290667-533.333334H192a64 64 0 0 0-63.893333 60.245334L128 469.333333v341.333334a64 64 0 0 0 60.245333 63.893333L192 874.666667h85.312l-0.021333-469.333334z m107.093333-234.197333l-0.746667 2.346667L341.333333 342.954667V874.666667h349.312a149.333333 149.333333 0 0 0 148.437334-132.842667l0.469333-5.162667 21.333333-280.576a106.666667 106.666667 0 0 0-101.738666-114.645333L754.56 341.333333h-264.32l0.277333-113.28a64 64 0 0 0-45.312-61.376l-3.690666-1.002666-32.149334-7.744a21.333333 21.333333 0 0 0-24.96 13.205333z"          p-id="13715"></path></symbol>',
    home: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="home"  t="1623251630236" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="19616" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M149.333333 960a85.333333 85.333333 0 0 1-85.333333-85.333333V331.221333a85.333333 85.333333 0 0 1 48.64-77.056l362.666667-172.693333a85.333333 85.333333 0 0 1 73.386666 0l362.666667 172.693333A85.333333 85.333333 0 0 1 960 331.221333V874.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333zM505.386667 138.24l-2.56 1.024-362.666667 172.693333a21.333333 21.333333 0 0 0-11.989333 16.554667L128 331.221333V874.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 896h192V661.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h170.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v234.666667h192a21.333333 21.333333 0 0 0 21.184-18.837333L896 874.666667V331.221333a21.333333 21.333333 0 0 0-9.792-17.941333l-2.368-1.322667-362.666667-172.693333a21.333333 21.333333 0 0 0-15.786666-1.024zM597.333333 640h-170.666666a21.333333 21.333333 0 0 0-21.184 18.837333L405.333333 661.333333v234.666667h213.333334V661.333333a21.333333 21.333333 0 0 0-18.837334-21.184L597.333333 640z"          p-id="19617"></path></symbol>',
    huititle: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="huititle"  t="1623251618367" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="18930" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M596.693333 48.384l277.333334 158.485333A170.666667 170.666667 0 0 1 960 355.050667v313.898666a170.666667 170.666667 0 0 1-85.973333 148.181334l-277.333334 158.485333a170.666667 170.666667 0 0 1-169.386666 0l-277.333334-158.485333A170.666667 170.666667 0 0 1 64 668.949333V355.050667a170.666667 170.666667 0 0 1 85.973333-148.181334l277.333334-158.485333a170.666667 170.666667 0 0 1 169.386666 0zM463.786667 101.397333l-4.736 2.56-277.333334 158.464a106.666667 106.666667 0 0 0-53.632 87.637334L128 355.050667v313.898666a106.666667 106.666667 0 0 0 49.493333 90.048l4.266667 2.56 277.333333 158.506667a106.666667 106.666667 0 0 0 101.098667 2.538667l4.736-2.56 277.333333-158.464a106.666667 106.666667 0 0 0 53.632-87.637334l0.106667-4.992V355.050667a106.666667 106.666667 0 0 0-49.493333-90.048l-4.266667-2.56-277.333333-158.506667a106.666667 106.666667 0 0 0-101.098667-2.538667z m257.194666 229.077334a42.666667 42.666667 0 0 1 0 26.24l-75.562666 233.770666a85.333333 85.333333 0 0 1-54.954667 54.954667l-233.770667 75.562667a42.666667 42.666667 0 0 1-53.717333-53.717334l75.562667-233.770666a85.333333 85.333333 0 0 1 54.954666-54.954667l233.770667-75.562667a42.666667 42.666667 0 0 1 53.717333 27.477334z m-73.706666 46.229333l-194.112 62.741333a21.333333 21.333333 0 0 0-12.8 11.370667l-0.938667 2.368-62.72 194.090667 194.090667-62.72a21.333333 21.333333 0 0 0 12.8-11.370667l0.938666-2.368 62.741334-194.112zM512 469.333333a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z"          p-id="18931"></path></symbol>',
    info: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="info"  t="1623251367443" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5064"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m34.133333 320c4.693333 0 8.533333 3.84 8.533334 8.533333v281.6a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333V490.666667h-34.133334a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h89.6z m-23.466666-128a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z"          p-id="5065"></path></symbol>',
    informationAdd: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="informationAdd"  t="1623251599689" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="17698" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M546.133333 64c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v554.666666a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 789.333333V477.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533334V789.333333a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h311.466666z m234.666667 0c4.693333 0 8.533333 3.84 8.533333 8.533333V234.666667h162.133334c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H789.333333v162.133333a8.533333 8.533333 0 0 1-6.826666 8.362667L780.8 469.333333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V298.666667h-162.133333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H725.333333V72.533333a8.533333 8.533333 0 0 1 6.826667-8.362666L733.866667 64z"          p-id="17699"></path></symbol>',
    key: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="key"  t="1623251582106" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="16599" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M843.861333 176.789333c129.130667 129.130667 129.130667 338.496 0 467.626667-121.493333 121.493333-314.026667 128.682667-443.904 21.546667l-106.709333 106.666666 99.584 99.562667a8.533333 8.533333 0 0 1 0 12.074667l-33.194667 33.194666a8.533333 8.533333 0 0 1-12.053333 0l-99.584-99.584-99.541333 99.584a8.533333 8.533333 0 0 1-12.074667 0L103.189333 884.266667a8.533333 8.533333 0 0 1 0-12.074667l105.514667-105.493333a8.704 8.704 0 0 1 0.085333-0.085334l33.194667-33.194666 112.704-112.725334c-107.136-129.898667-99.946667-322.410667 21.546667-443.904 129.130667-129.130667 338.496-129.130667 467.626666 0z m-422.378666 45.248c-104.128 104.149333-104.128 272.981333 0 377.130667 104.149333 104.128 272.981333 104.128 377.130666 0 104.149333-104.149333 104.149333-272.981333 0-377.130667-104.149333-104.128-272.981333-104.128-377.130666 0z"          p-id="16600"></path></symbol>',
    left: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="left"  t="1623251376006" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5616"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M670.954667 86.826667L269.44 488.362667a32 32 0 0 0-2.090667 42.965333l2.090667 2.282667L670.933333 935.168a8.533333 8.533333 0 0 0 6.037334 2.496h66.368a8.533333 8.533333 0 0 0 6.037333-14.570667L337.28 511.018667 749.397333 98.901333a8.533333 8.533333 0 0 0-6.037333-14.570666h-66.346667a8.533333 8.533333 0 0 0-6.058666 2.496z"          p-id="5617"></path></symbol>',
    link: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="link"  t="1623251562728" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="15362" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M426.112 488.938667l-46.613333 46.570666a64.042667 64.042667 0 0 0-70.101334 9.92l-2.752 2.581334-120.661333 120.682666a64 64 0 0 0-2.602667 87.765334l2.602667 2.752 90.496 90.496a64 64 0 0 0 87.786667 2.581333l2.730666-2.56 120.682667-120.704c13.397333-13.397333 19.605333-31.253333 18.645333-48.789333l51.626667-51.648a128.042667 128.042667 0 0 1-25.024 145.706666l-120.682667 120.682667a128 128 0 0 1-181.013333 0l-90.517333-90.517333a128 128 0 0 1 0-181.013334l120.682666-120.682666a128.042667 128.042667 0 0 1 164.693334-13.824zM804.458667 140.714667l90.517333 90.517333a128 128 0 0 1 0 181.013333l-120.682667 120.682667a128.042667 128.042667 0 0 1-145.706666 25.024l51.648-51.626667a63.850667 63.850667 0 0 0 46.08-16.064l2.709333-2.581333 120.682667-120.682667a64 64 0 0 0 2.581333-87.786666l-2.56-2.730667-90.517333-90.496a64 64 0 0 0-87.786667-2.602667l-2.730667 2.602667-120.682666 120.661333a64.021333 64.021333 0 0 0-12.501334 72.853334l-46.570666 46.613333a128.042667 128.042667 0 0 1 13.824-164.714667l120.682666-120.682666a128 128 0 0 1 181.013334 0z"          p-id="15363"></path>    <path d="M624.938667 380.586667a8.533333 8.533333 0 0 1 12.074666 0l33.194667 33.173333a8.533333 8.533333 0 0 1 0 12.074667L425.813333 670.208a8.533333 8.533333 0 0 1-12.074666 0l-33.194667-33.194667a8.533333 8.533333 0 0 1 0-12.074666L624.938667 380.586667z"          p-id="15364"></path></symbol>',
    live: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="live"  t="1623251547494" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="14402" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M682.666667 106.666667a128 128 0 0 1 127.573333 117.397333l93.056-15.509333A85.333333 85.333333 0 0 1 1002.666667 292.736v438.528a85.333333 85.333333 0 0 1-99.370667 84.181333l-93.056-15.509333A128 128 0 0 1 682.666667 917.333333H149.333333a128 128 0 0 1-128-128V234.666667a128 128 0 0 1 128-128h533.333334z m0 64H149.333333a64 64 0 0 0-63.893333 60.245333L85.333333 234.666667v554.666666a64 64 0 0 0 60.245334 63.893334L149.333333 853.333333h533.333334a64 64 0 0 0 63.893333-60.245333L746.666667 789.333333V234.666667a64 64 0 0 0-60.245334-63.893334L682.666667 170.666667z m233.642666 100.757333l-2.474666 0.256-103.168 17.194667v446.229333l104.021333 17.322667 2.645333 0.170666a21.333333 21.333333 0 0 0 21.184-18.837333l0.149334-2.496V292.736a21.333333 21.333333 0 0 0-22.357334-21.333333zM650.666667 234.666667a32 32 0 1 1 0 64 32 32 0 0 1 0-64z"          p-id="14403"></path></symbol>',
    loading: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="loading"  t="1636076324730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3862"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M876.864 782.592c3.264 0 6.272-3.2 6.272-6.656 0-3.456-3.008-6.592-6.272-6.592-3.264 0-6.272 3.2-6.272 6.592 0 3.456 3.008 6.656 6.272 6.656z m-140.544 153.344c2.304 2.432 5.568 3.84 8.768 3.84a12.16 12.16 0 0 0 8.832-3.84 13.76 13.76 0 0 0 0-18.56 12.224 12.224 0 0 0-8.832-3.84 12.16 12.16 0 0 0-8.768 3.84 13.696 13.696 0 0 0 0 18.56zM552.32 1018.24c3.456 3.648 8.32 5.76 13.184 5.76a18.368 18.368 0 0 0 13.184-5.76 20.608 20.608 0 0 0 0-27.968 18.368 18.368 0 0 0-13.184-5.824 18.368 18.368 0 0 0-13.184 5.76 20.608 20.608 0 0 0 0 28.032z m-198.336-5.76c4.608 4.8 11.072 7.68 17.6 7.68a24.448 24.448 0 0 0 17.536-7.68 27.456 27.456 0 0 0 0-37.248 24.448 24.448 0 0 0-17.536-7.68 24.448 24.448 0 0 0-17.6 7.68 27.52 27.52 0 0 0 0 37.184z m-175.68-91.84c5.76 6.08 13.824 9.6 21.952 9.6a30.592 30.592 0 0 0 22.016-9.6 34.368 34.368 0 0 0 0-46.592 30.592 30.592 0 0 0-22.016-9.6 30.592 30.592 0 0 0-21.952 9.6 34.368 34.368 0 0 0 0 46.592z m-121.152-159.36c6.912 7.36 16.64 11.648 26.368 11.648a36.736 36.736 0 0 0 26.432-11.584 41.28 41.28 0 0 0 0-55.936 36.736 36.736 0 0 0-26.432-11.584 36.8 36.8 0 0 0-26.368 11.52 41.28 41.28 0 0 0 0 56zM12.736 564.672a42.88 42.88 0 0 0 30.784 13.44 42.88 42.88 0 0 0 30.784-13.44 48.128 48.128 0 0 0 0-65.216 42.88 42.88 0 0 0-30.72-13.44 42.88 42.88 0 0 0-30.848 13.44 48.128 48.128 0 0 0 0 65.216z m39.808-195.392a48.96 48.96 0 0 0 35.2 15.36 48.96 48.96 0 0 0 35.2-15.36 54.976 54.976 0 0 0 0-74.56 48.96 48.96 0 0 0-35.2-15.424 48.96 48.96 0 0 0-35.2 15.424 54.976 54.976 0 0 0 0 74.56zM168.32 212.48c10.368 11.008 24.96 17.408 39.68 17.408 14.592 0 29.184-6.4 39.552-17.408a61.888 61.888 0 0 0 0-83.84 55.104 55.104 0 0 0-39.616-17.408c-14.656 0-29.248 6.4-39.616 17.408a61.888 61.888 0 0 0 0 83.84zM337.344 124.8c11.52 12.16 27.712 19.264 43.968 19.264 16.256 0 32.448-7.04 43.968-19.264a68.672 68.672 0 0 0 0-93.184 61.248 61.248 0 0 0-43.968-19.264 61.248 61.248 0 0 0-43.968 19.264 68.736 68.736 0 0 0 0 93.184z m189.632-1.088c12.672 13.44 30.528 21.248 48.448 21.248s35.712-7.808 48.384-21.248a75.584 75.584 0 0 0 0-102.464A67.392 67.392 0 0 0 575.36 0c-17.92 0-35.776 7.808-48.448 21.248a75.584 75.584 0 0 0 0 102.464z m173.824 86.592c13.824 14.592 33.28 23.104 52.736 23.104 19.584 0 39.04-8.512 52.8-23.104a82.432 82.432 0 0 0 0-111.744 73.472 73.472 0 0 0-52.8-23.168c-19.52 0-38.912 8.512-52.736 23.168a82.432 82.432 0 0 0 0 111.744z m124.032 158.528c14.976 15.872 36.032 25.088 57.216 25.088 21.12 0 42.24-9.216 57.152-25.088a89.344 89.344 0 0 0 0-121.088 79.616 79.616 0 0 0-57.152-25.088c-21.184 0-42.24 9.216-57.216 25.088a89.344 89.344 0 0 0 0 121.088z m50.432 204.032c16.128 17.088 38.784 27.008 61.632 27.008 22.784 0 45.44-9.92 61.568-27.008a96.256 96.256 0 0 0 0-130.432 85.76 85.76 0 0 0-61.568-27.072c-22.848 0-45.44 9.984-61.632 27.072a96.192 96.192 0 0 0 0 130.432z"          p-id="3863"></path></symbol>',
    location: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="location"  t="1623251627752" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="19478" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 64c212.074667 0 384 170.282667 384 380.373333 0 93.866667-34.346667 179.84-91.306667 246.186667l-6.613333 7.616c-43.904 49.877333-124.586667 130.432-242.069333 241.664a64 64 0 0 1-84.864 2.816l-3.157334-2.816-36.544-34.752c-103.573333-98.901333-174.293333-170.389333-212.117333-214.485333A376.746667 376.746667 0 0 1 128 444.373333C128 234.282667 299.925333 64 512 64z m0 64C335.146667 128 192 269.781333 192 444.373333c0 76.010667 27.136 147.754667 75.882667 204.544l6.357333 7.296c39.957333 45.354667 113.450667 119.018667 219.669333 219.989334l18.090667 17.173333 52.224-49.749333c93.482667-89.664 157.674667-154.858667 191.914667-194.752A312.661333 312.661333 0 0 0 832 444.373333C832 269.781333 688.853333 128 512 128z m0 170.666667a149.333333 149.333333 0 1 1 0 298.666666 149.333333 149.333333 0 0 1 0-298.666666z m0 64a85.333333 85.333333 0 1 0 0 170.666666 85.333333 85.333333 0 0 0 0-170.666666z"          p-id="19479"></path></symbol>',
    lock: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="lock"  t="1623251573078" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="16049" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 64c153.173333 0 277.333333 124.16 277.333333 277.333333v128a128 128 0 0 1 128 128v234.666667a128 128 0 0 1-128 128H234.666667a128 128 0 0 1-128-128V597.333333a128 128 0 0 1 128-128v-128c0-153.173333 124.16-277.333333 277.333333-277.333333z m277.333333 469.333333H234.666667a64 64 0 0 0-63.893334 60.245334L170.666667 597.333333v234.666667a64 64 0 0 0 60.245333 63.893333L234.666667 896h554.666666a64 64 0 0 0 63.893334-60.245333L853.333333 832V597.333333a64 64 0 0 0-60.245333-63.893333L789.333333 533.333333z m-243.2 106.666667c4.693333 0 8.533333 3.84 8.533334 8.533333v110.933334a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333v-110.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333zM512 128c-115.84 0-210.090667 92.309333-213.248 207.36L298.666667 341.333333v128h426.666666v-128c0-115.84-92.309333-210.090667-207.36-213.248L512 128z"          p-id="16050"></path></symbol>',
    loop: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="loop"  t="1623251577984" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="16323" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M576 106.666667c223.850667 0 405.333333 181.482667 405.333333 405.333333 0 203.584-150.101333 372.138667-345.685333 400.981333l39.744 39.744a4.266667 4.266667 0 0 1-3.029333 7.274667h-71.488a8.533333 8.533333 0 0 1-6.037334-2.496L497.92 860.586667a4.266667 4.266667 0 0 1 3.029333-7.274667H576c188.522667 0 341.333333-152.810667 341.333333-341.333333 0-173.013333-128.725333-315.946667-295.616-338.304L554.666667 106.666667h21.333333z m-128 64C259.477333 170.666667 106.666667 323.477333 106.666667 512c0 173.013333 128.725333 315.946667 295.616 338.304L469.333333 917.333333h-21.333333C224.149333 917.333333 42.666667 735.850667 42.666667 512 42.666667 308.394667 192.768 139.861333 388.352 111.018667l-39.744-39.744A4.266667 4.266667 0 0 1 351.637333 64h71.488a8.533333 8.533333 0 0 1 6.037334 2.496L526.08 163.413333a4.266667 4.266667 0 0 1-3.029333 7.274667H448z"          p-id="16324"></path></symbol>',
    mail: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="mail"  t="1623251591904" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="17289" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M789.333333 128a170.666667 170.666667 0 0 1 170.666667 170.666667v426.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V298.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h554.666666z m106.666667 243.797333l-310.613333 147.925334a170.666667 170.666667 0 0 1-146.773334 0L128 371.797333V725.333333a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 832h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 725.333333V371.797333zM789.333333 192H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 300.928l338.133333 161.024a106.666667 106.666667 0 0 0 86.549334 2.282667l5.184-2.282667L896 300.906667V298.666667a106.666667 106.666667 0 0 0-102.037333-106.56L789.333333 192z"          p-id="17290"></path></symbol>',
    mark: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="mark"  t="1623251575072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="16187" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M917.333333 851.669333a85.333333 85.333333 0 0 1-105.322666 82.944l-290.005334-69.866666a42.666667 42.666667 0 0 0-20.010666 0L211.989333 934.613333A85.333333 85.333333 0 0 1 106.666667 851.669333V192a128 128 0 0 1 128-128h554.666666a128 128 0 0 1 128 128v659.669333zM853.333333 320H170.666667v531.669333a21.333333 21.333333 0 0 0 23.893333 21.184l2.432-0.448 290.026667-69.888a106.666667 106.666667 0 0 1 43.776-1.28l6.186666 1.28 290.026667 69.888a21.333333 21.333333 0 0 0 26.176-18.261333l0.149333-2.474667V320z m-64-192H234.666667a64 64 0 0 0-63.893334 60.245333L170.666667 192v64h682.666666V192a64 64 0 0 0-60.245333-63.893333L789.333333 128z"          p-id="16188"></path></symbol>',
    me: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="me"  t="1623251524691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="13440" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M500.928 160.064l4.842667-0.064h12.949333c76.8 0 139.050667 62.250667 139.050667 139.050667v96.469333a145.770667 145.770667 0 0 1-43.648 104.021333l-42.794667 42.026667a67.562667 67.562667 0 0 0-20.224 48.192v6.016c0 25.173333 14.549333 48.085333 37.312 58.837333l295.808 139.392a39.104 39.104 0 0 1 22.442667 35.392v10.752c0 13.162667-10.666667 23.850667-23.850667 23.850667H141.184c-12.586667 0-23.04-9.813333-23.808-22.314667l-0.064-2.538666 0.021333-9.749334c0-14.293333 7.808-27.456 20.309334-34.304l2.986666-1.493333 294.954667-138.986667a65.024 65.024 0 0 0 37.013333-52.608l0.256-4.693333 0.042667-7.552c0-15.829333-5.546667-31.104-15.658667-43.242667l-3.456-3.818666-43.904-43.157334a145.770667 145.770667 0 0 1-43.562666-98.709333l-0.106667-5.909333v-95.872a139.050667 139.050667 0 0 1 134.72-138.986667z m-92.032 435.712L408.746667 597.333333c0.042667-0.490667 0-0.704-0.085334-0.746666L112.490667 736.128l-4.736 2.389333c-33.834667 18.517333-54.421333 53.162667-54.421334 90.88v10.752l0.128 4.522667C56.384 891.84 94.72 928 141.184 928h741.632a87.850667 87.850667 0 0 0 87.850667-87.850667v-10.752a103.104 103.104 0 0 0-59.157334-93.269333L615.701333 596.693333a1.024 1.024 0 0 1-0.597333-0.938666v-6.016c0-0.96 0.384-1.877333 1.066667-2.56l42.794666-42.005334a209.770667 209.770667 0 0 0 62.805334-149.674666v-96.469334A203.050667 203.050667 0 0 0 518.72 96h-13.44l-5.824 0.085333c-109.973333 3.370667-197.226667 93.184-197.226667 202.965334v96.469333l0.106667 7.061333a210.112 210.112 0 0 0 62.698667 142.613334l42.794666 42.026666 1.28 1.472c-0.512-0.576-0.213333 0.213333-0.213333 1.066667v6.016z"          p-id="13441"></path></symbol>',
    minus: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="minus"  t="1623251311340" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2856"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m183.466667 362.666666c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H349.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334h345.6z"          p-id="2857"></path></symbol>',
    more: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="more"  t="1623251398268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7112"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M522.666667 522.666667m-53.333334 0a53.333333 53.333333 0 1 0 106.666667 0 53.333333 53.333333 0 1 0-106.666667 0Z"          p-id="7113"></path>    <path d="M266.666667 522.666667m-53.333334 0a53.333333 53.333333 0 1 0 106.666667 0 53.333333 53.333333 0 1 0-106.666667 0Z"          p-id="7114"></path>    <path d="M778.666667 522.666667m-53.333334 0a53.333333 53.333333 0 1 0 106.666667 0 53.333333 53.333333 0 1 0-106.666667 0Z"          p-id="7115"></path></symbol>',
    movie: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="movie"  t="1623251560514" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="15224" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333a467.84 467.84 0 0 1-136.064 330.453333l-2.858666 2.837334-5.824 5.674666a8.533333 8.533333 0 0 1-5.930667 2.389334H744.682667a4.266667 4.266667 0 0 1-2.389334-7.786667c2.197333-1.493333 4.053333-2.816 5.610667-3.904C850.496 768.106667 917.333333 647.850667 917.333333 512c0-223.850667-181.482667-405.333333-405.333333-405.333333S106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333h418.133333c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H520.533333l-0.810666-0.064L512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667z m0 576a106.666667 106.666667 0 1 1 0 213.333333 106.666667 106.666667 0 0 1 0-213.333333z m0 64a42.666667 42.666667 0 1 0 0 85.333333 42.666667 42.666667 0 0 0 0-85.333333zM298.666667 405.333333a106.666667 106.666667 0 1 1 0 213.333334 106.666667 106.666667 0 0 1 0-213.333334z m426.666666 0a106.666667 106.666667 0 1 1 0 213.333334 106.666667 106.666667 0 0 1 0-213.333334z m-426.666666 64a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m426.666666 0a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334zM512 192a106.666667 106.666667 0 1 1 0 213.333333 106.666667 106.666667 0 0 1 0-213.333333z m0 64a42.666667 42.666667 0 1 0 0 85.333333 42.666667 42.666667 0 0 0 0-85.333333z"          p-id="15225"></path></symbol>',
    network: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="network"  t="1623251354451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4512"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M522.666667 42.666667c3.776 0 7.530667 0.170667 11.242666 0.490666C782.954667 54.613333 981.333333 260.138667 981.333333 512c0 251.861333-198.4 457.386667-447.424 468.821333-3.712 0.341333-7.466667 0.512-11.242666 0.512l-3.285334-0.064C516.906667 981.333333 514.474667 981.333333 512 981.333333 252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667l7.658667 0.042666L522.666667 42.666667zM490.666667 533.333333h-149.056c4.842667 191.082667 74.069333 342.08 149.056 376.576V533.333333z m213.056 0H554.666667v376.576c74.986667-34.517333 144.213333-185.514667 149.056-376.554666z m-426.133334 0H107.221333c8.746667 168.853333 120.853333 310.4 274.261334 362.517334-60.16-81.109333-100.394667-212.650667-103.893334-362.496z m639.189334 0h-149.034667c-3.349333 143.104-40.170667 269.504-95.872 351.253334C810.048 825.216 908.586667 691.221333 916.778667 533.333333zM381.482667 128.128c-146.986667 50.069333-255.936 181.909333-272.597334 341.226667h169.450667c6.634667-140.970667 45.866667-263.978667 103.146667-341.226667zM342.4 469.333333H490.666667V114.090667C418.496 147.285333 351.637333 288.426667 342.4 469.333333zM554.666667 114.090667L554.666667 469.333333h148.266666C693.674667 288.448 626.837333 147.306667 554.666667 114.090667z m117.184 25.322666l1.834666 2.730667c51.904 77.674667 87.04 194.474667 93.290667 327.189333h148.117333c-15.530667-148.565333-111.317333-273.237333-243.242666-329.92z"          p-id="4513"></path></symbol>',
    noEye: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="noEye"  t="1623251470250" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="10413" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M93.866667 322.773333a8.533333 8.533333 0 0 1 6.613333 3.114667c5.589333 6.848 10.261333 12.373333 14.058667 16.64 97.664 109.056 239.552 177.706667 397.482666 177.706667 162.752 0 308.48-72.917333 406.314667-187.84 1.493333-1.792 3.242667-3.882667 5.184-6.272a8.533333 8.533333 0 0 1 15.146667 5.376v9.813333l0.021333 8.32v51.754667a8.533333 8.533333 0 0 1-2.517333 6.037333 599.893333 599.893333 0 0 1-99.584 81.002667l82.474666 98.261333a8.533333 8.533333 0 0 1-1.066666 12.010667l-35.946667 30.165333a8.533333 8.533333 0 0 1-12.010667-1.045333l-89.813333-107.050667a593.045333 593.045333 0 0 1-145.450667 50.837333l44.074667 121.024a8.533333 8.533333 0 0 1-5.098667 10.944l-44.096 16.042667a8.533333 8.533333 0 0 1-10.944-5.098667l-48.448-133.098666a604.586667 604.586667 0 0 1-130.88-1.557334L390.4 714.517333a8.533333 8.533333 0 0 1-10.944 5.12l-44.096-16.064a8.533333 8.533333 0 0 1-5.12-10.944l45.184-124.096a593.066667 593.066667 0 0 1-131.584-47.744l-89.813333 107.029334a8.533333 8.533333 0 0 1-12.032 1.066666L106.026667 598.677333a8.533333 8.533333 0 0 1-1.066667-12.010666l82.474667-98.261334a599.872 599.872 0 0 1-80.981334-62.976c-4.352-4.032-10.56-10.026667-18.602666-18.005333A8.533333 8.533333 0 0 1 85.333333 401.386667v-70.101334c0-4.693333 3.84-8.533333 8.533334-8.533333z"          p-id="10414"></path></symbol>',
    no: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="no"  t="1623251360916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4926"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m306.304 203.861333L246.528 818.304A403.754667 403.754667 0 0 0 512 917.333333c223.850667 0 405.333333-181.482667 405.333333-405.333333 0-101.546667-37.333333-194.346667-99.029333-265.472zM512 106.666667C288.149333 106.666667 106.666667 288.149333 106.666667 512c0 99.285333 35.690667 190.229333 94.954666 260.693333l571.093334-571.072A403.712 403.712 0 0 0 512 106.666667z"          p-id="4927"></path></symbol>',
    openMail: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="openMail"  t="1623251584003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="16737" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M768 106.666667a85.376 85.376 0 0 1 82.986667 65.408A128 128 0 0 1 960 298.666667v490.666666a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V298.666667a128.021333 128.021333 0 0 1 109.013333-126.592A85.333333 85.333333 0 0 1 256 106.666667h512z m128 265.130666l-347.306667 165.397334a85.333333 85.333333 0 0 1-73.386666 0L128 371.797333V789.333333a64 64 0 0 0 60.245333 63.893334L192 853.333333h640a64 64 0 0 0 63.893333-60.245333L896 789.333333V371.797333zM768 170.666667H256a21.333333 21.333333 0 0 0-21.184 18.837333L234.666667 192v152.448l267.797333 133.888a21.333333 21.333333 0 0 0 16.426667 1.109333l2.645333-1.109333L789.333333 344.426667V192a21.333333 21.333333 0 0 0-18.837333-21.184L768 170.666667zM128.106667 294.912L128 298.666667v2.261333l42.666667 20.288v-82.901333a64.042667 64.042667 0 0 0-42.56 56.597333z m725.248-56.597333L853.333333 321.194667l42.666667-20.288V298.666667a64.021333 64.021333 0 0 0-42.666667-60.352z"          p-id="16738"></path></symbol>',
    pageFirst: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="pageFirst"  t="1627224396877" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2731"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css">@font-face { font-family: feedback-iconfont; src:            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }        </style>    </defs>    <path d="M768 278.624l-45.248-45.248L444.128 512l278.624 278.624L768 745.376 534.624 512zM288 832h64V192H288z"          p-id="2732"></path></symbol>',
    pageLast: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="pageLast"  t="1627224408407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2863"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css">@font-face { font-family: feedback-iconfont; src:            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"),            url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }        </style>    </defs>    <path d="M256 278.624L489.376 512 256 745.376l45.248 45.248L579.872 512 301.248 233.376zM672 832h64V192h-64z"          p-id="2864"></path></symbol>',
    payCollect: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="payCollect"  t="1623251452625" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9309"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M72.533333 353.408a8.533333 8.533333 0 0 1 6.037334 2.496l132.266666 132.266667a8.533333 8.533333 0 0 1 2.496 6.037333v61.184a8.533333 8.533333 0 0 1-14.570666 6.037333L128 490.666667v333.333333a72 72 0 0 0 67.776 71.893333l4.224 0.106667h624a72 72 0 0 0 71.893333-67.776l0.106667-4.224v-99.413333a8.533333 8.533333 0 0 1 14.570667-6.016l46.933333 46.933333a8.533333 8.533333 0 0 1 2.496 6.037333v46.976A141.482667 141.482667 0 0 1 818.517333 960H205.482667A141.482667 141.482667 0 0 1 64 818.517333V361.941333c0-4.714667 3.84-8.533333 8.533333-8.533333z m540.437334-98.389333l33.173333 33.194666a8.533333 8.533333 0 0 1 0 12.074667L541.077333 405.333333H674.133333c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H533.333333v42.666667h140.8c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H533.333333v162.133333a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533334V576h-140.8a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533333-8.533333H469.333333v-42.666667h-140.8a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h133.034667l-105.045333-105.045333a8.533333 8.533333 0 0 1 0-12.074667l33.173333-33.194666a8.533333 8.533333 0 0 1 12.074667 0l99.562666 99.562666 99.562667-99.562666a8.533333 8.533333 0 0 1 12.074667 0zM818.517333 64A141.482667 141.482667 0 0 1 960 205.482667v456.576a8.533333 8.533333 0 0 1-14.570667 6.037333l-132.266666-132.266667a8.533333 8.533333 0 0 1-2.496-6.037333v-61.184a8.533333 8.533333 0 0 1 14.570666-6.037333L896 533.333333V200a72 72 0 0 0-67.776-71.893333L824 128H200a72 72 0 0 0-71.893333 67.776L128 200v99.413333a8.533333 8.533333 0 0 1-14.570667 6.016l-46.933333-46.933333A8.533333 8.533333 0 0 1 64 252.458667V205.482667A141.482667 141.482667 0 0 1 205.482667 64h613.034666z"          p-id="9310"></path></symbol>',
    pay: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="pay"  t="1623251406200" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7524"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M832 64a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h640z m0 64H192a64 64 0 0 0-63.893333 60.245333L128 192v640a64 64 0 0 0 60.245333 63.893333L192 896h640a64 64 0 0 0 63.893333-60.245333L896 832V192a64 64 0 0 0-60.245333-63.893333L832 128zM311.466667 341.333333c4.693333 0 8.533333 3.84 8.533333 8.533334v324.266666a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V349.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334z m149.333333 0c4.693333 0 8.533333 3.84 8.533333 8.533334v324.266666a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533334V349.866667c0-4.693333 3.84-8.533333 8.533334-8.533334h46.933333z m149.333333 0c4.693333 0 8.533333 3.84 8.533334 8.533334v324.266666a8.533333 8.533333 0 0 1-8.533334 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533334V349.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933333z m149.333334 0c4.693333 0 8.533333 3.84 8.533333 8.533334v324.266666a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V349.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334z"          p-id="7525"></path></symbol>',
    payment: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="payment"  t="1623251549615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="14538" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M565.333333 85.333333C747.946667 85.333333 896 233.386667 896 416c0 76.096-25.706667 146.197333-68.906667 202.069333A99.946667 99.946667 0 0 1 928 682.666667a90.624 90.624 0 0 1-48.832 114.965333l-4.693333 1.877333-265.642667 97.877334a192 192 0 0 1-110.357333 6.72L192 832H93.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933334a8.533333 8.533333 0 0 1 8.512-8.533333h105.6l313.685334 73.813333a128 128 0 0 0 67.626666-2.474666l5.952-2.005334 265.792-97.92c13.76-5.184 20.736-20.522667 15.573334-34.282666a35.989333 35.989333 0 0 0-40-22.784l-3.157334 0.704L669.909333 725.333333H477.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334h66.133333a32 32 0 0 0 3.072-63.850666L544 597.333333H93.845333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0.021333-4.693333 3.84-8.533333 8.554667-8.533334l162.24 0.021334A329.92 329.92 0 0 1 234.666667 416C234.666667 233.386667 382.72 85.333333 565.333333 85.333333z m0 64C418.048 149.333333 298.666667 268.714667 298.666667 416c0 42.112 9.770667 81.92 27.136 117.333333H533.333333v-42.666666H456.533333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h76.778667v-21.333334H456.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h65.386667l-56.149333-56.128a8.533333 8.533333 0 0 1 0-12.074666l33.194666-33.194667a8.533333 8.533333 0 0 1 12.053334 0l54.314666 54.314667 54.314667-54.314667a8.533333 8.533333 0 0 1 12.053333 0l33.194667 33.194667a8.533333 8.533333 0 0 1 0 12.074666L608.725333 341.333333H674.133333c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333h-76.821333v21.333334H674.133333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334h-76.821333v58.816a95.914667 95.914667 0 0 1 37.226667 111.872L661.333333 661.333333l21.397334-5.824A266.666667 266.666667 0 0 0 832 416C832 268.714667 712.618667 149.333333 565.333333 149.333333z"          p-id="14539"></path></symbol>',
    pepole: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="pepole"  t="1623251460088" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9861"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M455.338667 117.333333a193.557333 193.557333 0 0 1 193.557333 193.557334v90.752a200.042667 200.042667 0 0 1-60.330667 143.146666l-39.936 38.997334a3.562667 3.562667 0 0 0-1.066666 2.538666l-0.021334 4.224 278.421334 130.453334a103.104 103.104 0 0 1 59.264 88.597333l0.106666 4.778667v7.530666a84.757333 84.757333 0 0 1-84.757333 84.757334H95.424a84.757333 84.757333 0 0 1-84.586667-79.210667l-0.106666-2.517333L10.666667 820.693333l0.021333-6.336c0-37.76 20.629333-72.490667 53.76-90.538666l1.984-1.024 4.48-2.24 277.525333-130.005334 0.021334-4.245333a3.562667 3.562667 0 0 0-0.362667-1.6l-0.277333-0.384-0.704-0.789333-39.68-38.762667a200.490667 200.490667 0 0 1-59.797334-129.642667l-0.384-7.125333-0.128-6.997333v-90.133334c0-104.490667 82.986667-190.144 188.373334-193.493333l5.696-0.064z m0 64h-14.165334l-4.714666 0.064a129.557333 129.557333 0 0 0-125.354667 129.493334v90.133333l0.106667 5.845333a136.042667 136.042667 0 0 0 40.917333 92.117334l41.066667 40.149333 3.498666 3.84c10.154667 12.138667 15.744 27.477333 15.744 43.349333l-0.021333 6.336-0.256 4.522667a63.125333 63.125333 0 0 1-36.053333 51.093333L98.048 778.538667l-2.986667 1.493333c-12.544 6.826667-20.394667 20.010667-20.394666 34.346667v6.506666l0.042666 2.432a20.757333 20.757333 0 0 0 20.693334 19.349334h705.173333a20.757333 20.757333 0 0 0 20.757333-20.757334v-7.530666c0-15.168-8.768-28.992-22.528-35.413334L519.893333 648.277333a63.104 63.104 0 0 1-36.330666-57.152v-4.8c0-18.197333 7.338667-35.626667 20.352-48.341333l39.957333-38.997333a136.042667 136.042667 0 0 0 41.024-97.344v-90.752A129.557333 129.557333 0 0 0 455.338667 181.333333z m222.741333 0.149334a155.541333 155.541333 0 0 1 148.501333 150.186666l0.085334 5.205334V405.333333a159.786667 159.786667 0 0 1-45.546667 111.744l-4.48 4.394667-27.008 25.536 208.192 94.485333a94.613333 94.613333 0 0 1 55.061333 76.949334l0.341334 4.565333 0.106666 4.629333a72.341333 72.341333 0 0 1-64.746666 71.957334c-5.546667-29.077333-11.861333-50.282667-18.922667-63.637334l11.328 0.021334a8.32 8.32 0 0 0 8.341333-8.32c0-11.029333-5.909333-21.12-15.317333-26.517334l-2.645333-1.365333-62.933334-28.586667a167.125333 167.125333 0 0 0-15.317333-8.170666l-153.450667-71.893334A55.466667 55.466667 0 0 1 682.666667 551.168c0-16.917333 6.4-33.130667 17.770666-45.504l3.242667-3.264 29.013333-27.413333a95.786667 95.786667 0 0 0 29.824-64.362667L762.666667 405.333333v-68.48a91.562667 91.562667 0 0 0-56.469334-84.586666c-3.626667-15.616-13.013333-39.232-28.117333-70.805334z"          p-id="9862"></path></symbol>',
    personal: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="personal"  t="1623251352294" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4374"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 960c-102.464 0-196.906667-34.410667-272.384-92.288l-2.730667-2.133333-0.469333-0.341334a450.133333 450.133333 0 0 1-9.749333-7.829333l10.218666 8.192a450.154667 450.154667 0 0 1-51.2-46.634667l-2.517333-2.709333A446.4 446.4 0 0 1 64 512C64 264.576 264.576 64 512 64s448 200.576 448 448c0 117.461333-45.226667 224.362667-119.168 304.256l-2.517333 2.709333-0.426667 0.448c-2.602667 2.773333-5.248 5.504-7.936 8.192l8.362667-8.64a450.816 450.816 0 0 1-51.2 46.634667l-2.730667 2.133333A446.037333 446.037333 0 0 1 512 960z m6.72-682.666667h-12.949333l-4.842667 0.064a139.050667 139.050667 0 0 0-134.613333 133.994667l-0.085334 4.992v95.872l0.085334 5.909333a145.770667 145.770667 0 0 0 38.976 93.994667l4.586666 4.693333 43.904 43.178667 3.456 3.84c9.088 10.88 14.506667 24.384 15.488 38.485333l0.170667 4.736-0.042667 7.552-0.256 4.693334a65.024 65.024 0 0 1-33.194666 50.645333l-3.818667 1.962667-132.394667 62.378666A382.208 382.208 0 0 0 512 896c77.013333 0 148.693333-22.656 208.810667-61.674667l-132.394667-62.378666a65.024 65.024 0 0 1-37.162667-54.656l-0.149333-4.181334v-6.016c0-16.64 6.122667-32.597333 17.109333-44.949333l3.114667-3.264 42.794667-42.026667a145.770667 145.770667 0 0 0 43.52-97.493333l0.128-6.506667v-96.469333a139.050667 139.050667 0 0 0-134.058667-138.965333L518.72 277.333333zM512 128C299.925333 128 128 299.925333 128 512c0 109.376 45.738667 208.085333 119.125333 278.016l161.557334-76.117333c0.064 0.021333 0.106667 0.128 0.106666 0.341333l-0.021333 0.405333 0.128-1.536v-6.016c0-0.64-0.170667-1.237333-0.021333-1.28l0.256 0.213334-1.301334-1.493334-42.794666-42.005333a209.984 209.984 0 0 1-62.314667-135.552l-0.384-7.04-0.106667-7.082667v-96.469333c0-107.861333 84.224-196.437333 191.466667-202.709333l5.76-0.256 5.824-0.085334h13.44a203.050667 203.050667 0 0 1 202.986667 197.269334l0.064 5.781333v96.469333c0 53.952-20.778667 105.749333-57.877334 144.682667l-4.906666 4.992-42.816 42.026667a3.562667 3.562667 0 0 0-0.938667 1.6l-0.128 0.938666v6.016c0 0.277333 0.106667 0.512 0.277333 0.704l0.32 0.213334 161.194667 75.968A382.912 382.912 0 0 0 896 512c0-212.074667-171.925333-384-384-384z"          p-id="4375"></path></symbol>',
    picture: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="picture"  t="1623251624834" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="19340" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M640.469333 85.333333a64 64 0 0 1 58.816 38.784L728.384 192H832a128 128 0 0 1 128 128v490.666667a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V320a128 128 0 0 1 128-128h103.616l29.098667-67.882667A64 64 0 0 1 383.530667 85.333333h256.938666z m0 64H383.530667l-45.717334 106.666667H192a64 64 0 0 0-63.893333 60.245333L128 320v490.666667a64 64 0 0 0 60.245333 63.893333L192 874.666667h640a64 64 0 0 0 63.893333-60.245334L896 810.666667V320a64 64 0 0 0-60.245333-63.893333L832 256h-145.813333l-45.717334-106.666667zM512 341.333333c117.824 0 213.333333 95.509333 213.333333 213.333334s-95.509333 213.333333-213.333333 213.333333-213.333333-95.509333-213.333333-213.333333 95.509333-213.333333 213.333333-213.333334z m0 64a149.333333 149.333333 0 1 0 0 298.666667 149.333333 149.333333 0 0 0 0-298.666667z m288-85.333333a32 32 0 1 1 0 64 32 32 0 0 1 0-64z"          p-id="19341"></path></symbol>',
    pieChart1: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="pieChart1"  t="1623251347989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4098"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667zM106.666667 512c0 223.850667 181.482667 405.333333 405.333333 405.333333 100.416 0 192.298667-36.522667 263.104-96.981333L491.2 536.448a74.666667 74.666667 0 0 1-21.717333-48.234667L469.333333 483.669333V108.885333C265.514667 130.218667 106.666667 302.549333 106.666667 512z m810.112 21.333333H578.581333l241.770667 241.770667A403.584 403.584 0 0 0 916.778667 533.333333zM533.333333 107.221333V469.333333h381.802667C894.528 272.512 733.034667 117.546667 533.333333 107.242667z"          p-id="4099"></path></symbol>',
    pieChart2: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="pieChart2"  t="1623251350293" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4236"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M503.338667 42.773333a8.533333 8.533333 0 0 1 8.469333 6.698667l0.192 1.856V418.133333a93.866667 93.866667 0 0 0 93.866667 93.866667h366.805333c4.714667 0 8.533333 3.84 8.533333 8.533333v0.149334c-0.106667 5.674667-0.213333 10.176-0.384 13.504C969.237333 783.104 763.776 981.333333 512 981.333333 252.8 981.333333 42.666667 771.2 42.666667 512 42.666667 260.373333 240.682667 54.997333 489.386667 43.2l12.096-0.384 1.856-0.042667zM441.6 119.253333l-6.144 1.130667C251.434667 156.117333 113.066667 318.250667 113.066667 512c0 220.330667 178.602667 398.933333 398.933333 398.933333 193.984 0 355.626667-138.453333 391.509333-321.92l1.216-6.613333H605.866667a164.266667 164.266667 0 0 1-164.181334-159.061333L441.6 418.133333V119.253333z m149.333333-69.76h0.725334l9.130666 1.621334c2.56 0.469333 4.821333 0.896 6.826667 1.301333l2.858667 0.597333c182.229333 38.912 325.269333 183.594667 361.792 366.698667l2.154666 11.925333a8.533333 8.533333 0 0 1-6.954666 9.834667l-1.450667 0.128H629.333333a46.933333 46.933333 0 0 1-46.805333-43.584l-0.128-3.370667V58.026667a8.533333 8.533333 0 0 1 8.533333-8.533334z m62.144 93.802667a4.266667 4.266667 0 0 0-0.298666 1.557333v222.058667c0 2.346667 1.92 4.266667 4.266666 4.266667h222.08a4.266667 4.266667 0 0 0 3.968-5.824A400.512 400.512 0 0 0 658.602667 140.885333a4.266667 4.266667 0 0 0-5.546667 2.410667z"          p-id="4237"></path></symbol>',
    play: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="play"  t="1623251613654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="18654" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M213.333333 65.386667a85.333333 85.333333 0 0 1 43.904 12.16L859.370667 438.826667a85.333333 85.333333 0 0 1 0 146.346666L257.237333 946.453333A85.333333 85.333333 0 0 1 128 873.28V150.72a85.333333 85.333333 0 0 1 85.333333-85.333333z m0 64a21.333333 21.333333 0 0 0-21.184 18.837333L192 150.72v722.56a21.333333 21.333333 0 0 0 30.101333 19.456l2.197334-1.152L826.453333 530.282667a21.333333 21.333333 0 0 0 2.048-35.178667l-2.048-1.386667L224.298667 132.416A21.333333 21.333333 0 0 0 213.333333 129.386667z"          p-id="18655"></path></symbol>',
    query: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="query"  t="1623251358742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4788"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m10.666667 586.666666a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334zM512 277.333333a149.333333 149.333333 0 0 1 42.688 292.48L554.666667 652.8a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333v-132.266667c0-4.693333 3.84-8.533333 8.533333-8.533333H533.333333c37.013333-9.322667 64-45.44 64-85.333333a85.333333 85.333333 0 0 0-168.96-17.024c-0.469333 2.282667-0.853333 5.354667-1.194666 9.216a8.533333 8.533333 0 0 1-8.490667 7.808h-47.082667a8.533333 8.533333 0 0 1-8.533333-9.024 153.6 153.6 0 0 1 1.088-12.224A149.376 149.376 0 0 1 512 277.333333z"          p-id="4789"></path></symbol>',
    redPacket: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="redPacket"  t="1623251593967" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="17425" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M789.333333 42.666667a128 128 0 0 1 128 128v682.666666a128 128 0 0 1-128 128H234.666667a128 128 0 0 1-128-128V170.666667a128 128 0 0 1 128-128h554.666666z m0 64H234.666667a64 64 0 0 0-63.893334 60.245333L170.666667 170.666667v682.666666a64 64 0 0 0 60.245333 63.893334L234.666667 917.333333h554.666666a64 64 0 0 0 63.893334-60.245333L853.333333 853.333333V170.666667a64 64 0 0 0-60.245333-63.893334L789.333333 106.666667z"          p-id="17426"></path>    <path d="M512 405.333333c158.08 0 301.269333-63.658667 405.333333-166.762666v86.058666A637.354667 637.354667 0 0 1 512 469.333333a637.354667 637.354667 0 0 1-405.376-144.725333v-86.08A574.165333 574.165333 0 0 0 512 405.333333z"          p-id="17427"></path></symbol>',
    refresh: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="refresh"  t="1623251585854" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="16875" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M866.133333 85.333333c4.693333 0 8.533333 3.84 8.533334 8.533334v194.133333a32 32 0 0 1-28.928 31.850667L842.666667 320h-194.133334a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h120.341334A361.536 361.536 0 0 0 512 149.333333C311.701333 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667c185.813333 0 339.008-139.776 360.170667-319.914667 0.384-3.328 0.810667-7.829333 1.28-13.546667a8.533333 8.533333 0 0 1 8.512-7.850666h47.061333a8.533333 8.533333 0 0 1 8.533333 9.109333c-0.426667 5.696-0.789333 10.218667-1.130666 13.589333C914.346667 770.986667 732.778667 938.666667 512 938.666667 276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333c116.288 0 221.717333 46.506667 298.666667 121.984V93.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933333z"          p-id="16876"></path></symbol>',
    right: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="right"  t="1623251380193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5888"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M353.045333 86.826667L754.56 488.362667a32 32 0 0 1 2.090667 42.965333l-2.090667 2.282667L353.066667 935.168a8.533333 8.533333 0 0 1-6.037334 2.496h-66.368a8.533333 8.533333 0 0 1-6.037333-14.570667L686.72 511.018667 274.602667 98.901333a8.533333 8.533333 0 0 1 6.037333-14.570666h66.346667a8.533333 8.533333 0 0 1 6.058666 2.496z"          p-id="5889"></path></symbol>',
    scan: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="scan"  t="1623251404445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7388"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M128 669.866667v154.133333a72 72 0 0 0 67.776 71.893333l4.224 0.106667H354.133333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H205.482667A141.482667 141.482667 0 0 1 64 818.517333V669.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533334z m832 0v148.650666A141.482667 141.482667 0 0 1 818.517333 960H669.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533334-8.533333h154.133333a72 72 0 0 0 71.893333-67.776l0.106667-4.224V669.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533334z m0-170.666667v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h878.933334c4.693333 0 8.533333 3.84 8.533333 8.533333z m-597.333333-426.666667v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H200a72 72 0 0 0-71.893333 67.776L128 200V354.133333a8.533333 8.533333 0 0 1-8.533333 8.533334H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533334V205.482667A141.482667 141.482667 0 0 1 205.482667 64H354.133333c4.693333 0 8.533333 3.84 8.533334 8.533333zM818.517333 64A141.482667 141.482667 0 0 1 960 205.482667V354.133333a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V200a72 72 0 0 0-67.776-71.893333L824 128H669.866667a8.533333 8.533333 0 0 1-8.533334-8.533333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h148.650666z"          p-id="7389"></path></symbol>',
    search: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="search"  t="1623251568821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="15775" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M743.232 210.837333c144.896 144.896 149.781333 376.789333 14.656 527.573334l160.32 160.298666a8.533333 8.533333 0 0 1 0 12.074667l-33.173333 33.173333a8.533333 8.533333 0 0 1-12.074667 0l-161.557333-161.557333c-150.762667 120.746667-371.477333 111.253333-511.232-28.501333-149.973333-149.973333-149.973333-393.109333 0-543.061334 149.973333-149.973333 393.088-149.973333 543.061333 0z m-497.813333 45.248c-124.970667 124.970667-124.970667 327.594667 0 452.565334 124.970667 124.949333 327.594667 124.949333 452.565333 0 124.949333-124.970667 124.949333-327.594667 0-452.565334-124.970667-124.970667-327.594667-124.970667-452.565333 0z"          p-id="15776"></path></symbol>',
    select: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="select"  t="1623251394246" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6840"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M908.245333 213.952h65.706667a8.533333 8.533333 0 0 1 6.037333 14.570667L445.226667 763.306667a31.786667 31.786667 0 0 1-42.517334 2.176l-2.773333-2.56-343.04-343.04a8.533333 8.533333 0 0 1 6.037333-14.570667H130.133333a8.533333 8.533333 0 0 1 6.037334 2.496l287.338666 287.36 478.698667-478.72a8.533333 8.533333 0 0 1 6.037333-2.496z"          p-id="6841"></path></symbol>',
    send: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="send"  t="1623251558326" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="15088" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M555.392 64a8.533333 8.533333 0 0 1 6.037333 14.570667l-46.933333 46.933333a8.533333 8.533333 0 0 1-6.058667 2.496H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v554.666666a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 789.333333V515.541333a8.533333 8.533333 0 0 1 2.496-6.037333l46.933333-46.933333a8.533333 8.533333 0 0 1 14.570667 6.037333V789.333333a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h320.725333zM928 64A32 32 0 0 1 960 96v241.792a8.533333 8.533333 0 0 1-2.496 6.037333l-46.933333 46.933334a8.533333 8.533333 0 0 1-14.570667-6.037334V162.581333L547.2 511.381333a8.533333 8.533333 0 0 1-12.074667 0l-33.173333-33.194666a8.533333 8.533333 0 0 1 0-12.074667L840.064 128h-200.789333a8.533333 8.533333 0 0 1-6.037334-14.570667l46.933334-46.933333A8.533333 8.533333 0 0 1 686.208 64H928z"          p-id="15089"></path></symbol>',
    shop: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="shop"  t="1623251611769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="18518" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M938.666667 832a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h597.333334a128 128 0 0 1 128 128v640z m-64-64H149.333333v64a64 64 0 0 0 60.245334 63.893333L213.333333 896h597.333334a64 64 0 0 0 63.893333-60.245333L874.666667 832v-64zM810.666667 128H213.333333a64 64 0 0 0-63.893333 60.245333L149.333333 192v512h725.333334V192a64 64 0 0 0-60.245334-63.893333L810.666667 128z m-405.333334 93.866667V277.333333a106.666667 106.666667 0 0 0 102.037334 106.56L512 384a106.666667 106.666667 0 0 0 106.56-102.037333L618.666667 277.333333v-55.466666c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933333c4.693333 0 8.533333 3.84 8.533334 8.533334V277.333333a170.666667 170.666667 0 1 1-341.333334 0v-55.466666c0-4.693333 3.84-8.533333 8.533334-8.533334h46.933333c4.693333 0 8.533333 3.84 8.533333 8.533334z"          p-id="18519"></path></symbol>',
    slice: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="slice"  t="1623251606404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="18108" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M874.666667 64a85.333333 85.333333 0 0 1 85.333333 85.333333v192a85.333333 85.333333 0 0 1-85.333333 85.333334h-64v448a85.333333 85.333333 0 0 1-85.333334 85.333333H298.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V426.666667H149.333333a85.333333 85.333333 0 0 1-85.333333-85.333334V149.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h725.333334z m-128 234.666667H277.333333v576a21.333333 21.333333 0 0 0 18.837334 21.184L298.666667 896h426.666666a21.333333 21.333333 0 0 0 21.184-18.837333L746.666667 874.666667V298.666667z m-153.216 108.8l33.194666 33.194666a8.533333 8.533333 0 0 1 0 12.074667L567.36 512H642.133333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333h-98.133333v42.666667h98.133333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334h-98.133333v98.133333a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533333V682.666667h-98.133333a8.533333 8.533333 0 0 1-8.533334-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533333h98.133333v-42.666667h-98.133333a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533334-8.533333h74.752l-59.264-59.264a8.533333 8.533333 0 0 1 0-12.074667l33.194666-33.173333a8.533333 8.533333 0 0 1 12.053334 0L512 476.864l69.418667-69.376a8.533333 8.533333 0 0 1 12.053333 0zM874.666667 128H149.333333a21.333333 21.333333 0 0 0-21.184 18.837333L128 149.333333v192a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 362.666667h64v-106.666667a21.333333 21.333333 0 0 1 21.333334-21.333333h554.666666a21.333333 21.333333 0 0 1 21.333334 21.333333v106.666667h64a21.333333 21.333333 0 0 0 21.184-18.837334L896 341.333333V149.333333a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 128z"          p-id="18109"></path></symbol>',
    smile: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="smile"  t="1623251372049" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5340"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m187.733333 469.077333c2.368 0 4.266667 1.92 4.266667 4.266667l0.021333 44.288v16.234666a8.533333 8.533333 0 0 1-4.778666 7.68c-2.922667 1.408-5.269333 2.56-7.04 3.370667A425.045333 425.045333 0 0 1 512 691.392a425.109333 425.109333 0 0 1-187.2-43.2 8.533333 8.533333 0 0 1-4.8-7.68V580.053333a4.266667 4.266667 0 0 1 6.442667-3.669333A361.002667 361.002667 0 0 0 512 627.413333a361.002667 361.002667 0 0 0 185.557333-51.029333 4.266667 4.266667 0 0 1 2.197334-0.618667zM362.666667 384a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z m298.666666 0a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z"          p-id="5341"></path></symbol>',
    success: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="success"  t="1623251325290" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3132"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m236.714667 256a8.533333 8.533333 0 0 1 6.037333 14.570666L495.616 636.373333c-5.461333 5.461333-12.416 8.533333-19.562667 9.237334l-3.050666 0.149333c-8.192 0-16.384-3.136-22.634667-9.386667l-152.448-152.469333a8.533333 8.533333 0 0 1 6.037333-14.570667h66.346667a8.533333 8.533333 0 0 1 6.016 2.496l96.661333 96.64 203.349334-203.306666a8.533333 8.533333 0 0 1 6.037333-2.496h66.346667z"          p-id="3133"></path></symbol>',
    systemPhonebook: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="systemPhonebook"  t="1623251304273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M810.666667 64a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128v-21.333333H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H128v-192H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H128v-192H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H128V192a128 128 0 0 1 128-128h554.666667z m0 64H256a64 64 0 0 0-63.893333 60.245333L192 192v640a64 64 0 0 0 60.245333 63.893333L256 896h554.666667a64 64 0 0 0 63.893333-60.245333L874.666667 832V192a64 64 0 0 0-60.245334-63.893333L810.666667 128z m-387.648 149.333333c23.552 0 44.586667 10.026667 60.650666 26.304l0.768 0.64 6.08 5.909334 16.362667 16.490666 26.794667 26.709334c16.341333 16.277333 26.752 36.821333 26.752 61.013333 0 24.170667-10.410667 44.714667-26.752 60.970667l-5.952 5.973333 4.544 5.866667c16.704 20.501333 33.728 37.013333 52.117333 50.517333l1.152 0.832 6.272-6.229333c14.933333-14.848 33.898667-24.597333 55.466667-25.92l5.056-0.149334c26.176 0 46.442667 11.477333 61.653333 27.776l49.002667 48.64c34.048 33.877333 34.816 82.517333 4.522666 117.12l-3.242666 3.52c-4.117333 4.373333-8.106667 8.32-13.376 13.354667l-5.013334 4.864a175.168 175.168 0 0 0-5.44 5.546667l-4.757333 5.333333C713.749333 755.968 685.205333 768 652.8 768h-2.005333l-6.421334-0.298667c-33.152-2.112-61.952-11.584-96.106666-27.776a472.469333 472.469333 0 0 1-157.525334-122.794666c-35.754667-42.816-60.586667-83.946667-77.12-128.384-11.669333-31.018667-16.661333-58.624-14.421333-86.570667a108.074667 108.074667 0 0 1 31.957333-68.010667l32.042667-31.872c16.085333-15.466667 36.842667-24.96 59.797333-24.96z m0 64c-5.205333 0-10.581333 2.432-15.466667 7.104l-31.232 31.104a44.117333 44.117333 0 0 0-13.354667 28.416c-1.344 16.789333 1.92 35.264 10.581334 58.24 13.930667 37.461333 35.029333 72.384 66.346666 109.930667a408.256 408.256 0 0 0 136.149334 106.133333c19.242667 9.109333 44.864 19.818667 72.405333 21.568l4.373333 0.170667c14.869333 0 26.368-4.842667 36.053334-15.210667 5.546667-6.613333 11.648-12.458667 17.536-18.133333l5.76-5.546667 5.418666-5.568c10.24-10.624 10.325333-21.482667 0.256-31.509333l-52.181333-51.84c-3.264-3.029333-7.872-5.930667-13.333333-5.930667-5.226667 0-10.517333 2.602667-15.381334 7.445334l-31.424 31.253333c-1.408 1.429333-5.781333 5.696-12.501333 5.696a17.621333 17.621333 0 0 1-8.149333-2.090667l-3.797334-2.218666a149.077333 149.077333 0 0 0-6.378666-3.306667l-3.669334-1.856a81.472 81.472 0 0 1-7.402666-4.16c-29.226667-18.474667-55.786667-42.453333-80.981334-73.386667-14.016-17.557333-23.018667-32.256-29.482666-47.722666l-0.725334-2.218667c-1.344-4.8-1.6-10.752 4.693334-17.002667l8.256-7.637333c5.141333-4.906667 10.133333-9.941333 15.338666-15.189333l7.808-7.850667c5.205333-5.184 7.893333-10.453333 7.893334-15.637333s-2.688-10.453333-7.893334-15.616l-25.024-24.917334-8.746666-8.853333-11.093334-11.114667-5.546666-5.269333c-4.778667-4.842667-9.984-7.274667-15.104-7.274667z"          p-id="2581"></path></symbol>',
    systemQRcode: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="systemQRcode"  t="1623251294899" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2442"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M384 554.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v234.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V640a85.333333 85.333333 0 0 1 85.333333-85.333333h234.666667z m226.133333 277.333333c4.693333 0 8.533333 3.84 8.533334 8.533333V896h183.466666c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H563.2a8.533333 8.533333 0 0 1-8.533333-8.533333v-110.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333z m341.333334 0c4.693333 0 8.533333 3.84 8.533333 8.533333v110.933334a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533333v-110.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334zM384 618.666667H149.333333a21.333333 21.333333 0 0 0-21.184 18.837333L128 640v234.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 896h234.666667a21.333333 21.333333 0 0 0 21.184-18.837333L405.333333 874.666667V640a21.333333 21.333333 0 0 0-18.837333-21.184L384 618.666667z m418.133333 149.333333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333zM298.666667 704a21.333333 21.333333 0 0 1 21.333333 21.333333v64a21.333333 21.333333 0 0 1-21.333333 21.333334h-64a21.333333 21.333333 0 0 1-21.333334-21.333334v-64a21.333333 21.333333 0 0 1 21.333334-21.333333h64z m503.466666-149.333333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334H618.666667v64h119.466666c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334h-174.933333a8.533333 8.533333 0 0 1-8.533333-8.533334v-174.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h238.933333z m149.333334 128c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334h-132.266667a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h132.266667z m0-128c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334zM384 64a85.333333 85.333333 0 0 1 85.333333 85.333333v234.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V149.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h234.666667z m490.666667 0a85.333333 85.333333 0 0 1 85.333333 85.333333v234.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H640a85.333333 85.333333 0 0 1-85.333333-85.333333V149.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h234.666667zM384 128H149.333333a21.333333 21.333333 0 0 0-21.184 18.837333L128 149.333333v234.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 405.333333h234.666667a21.333333 21.333333 0 0 0 21.184-18.837333L405.333333 384V149.333333a21.333333 21.333333 0 0 0-18.837333-21.184L384 128z m490.666667 0H640a21.333333 21.333333 0 0 0-21.184 18.837333L618.666667 149.333333v234.666667a21.333333 21.333333 0 0 0 18.837333 21.184L640 405.333333h234.666667a21.333333 21.333333 0 0 0 21.184-18.837333L896 384V149.333333a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 128z m-576 85.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v64a21.333333 21.333333 0 0 1-21.333333 21.333333h-64a21.333333 21.333333 0 0 1-21.333334-21.333333v-64a21.333333 21.333333 0 0 1 21.333334-21.333334h64z m490.666666 0a21.333333 21.333333 0 0 1 21.333334 21.333334v64a21.333333 21.333333 0 0 1-21.333334 21.333333h-64a21.333333 21.333333 0 0 1-21.333333-21.333333v-64a21.333333 21.333333 0 0 1 21.333333-21.333334h64z"          p-id="2443"></path></symbol>',
    target: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="target"  t="1623251596201" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="17562" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M841.28 64a42.666667 42.666667 0 0 1 41.386667 53.077333L815.552 384l67.114667 266.922667A42.666667 42.666667 0 0 1 841.28 704H192v247.466667a8.533333 8.533333 0 0 1-8.533333 8.533333H136.533333a8.533333 8.533333 0 0 1-8.533333-8.533333V72.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h704.746667z m-27.370667 64H192v512h621.909333l-64.362666-256 64.362666-256z"          p-id="17563"></path></symbol>',
    textDeletion: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="textDeletion"  t="1623251587361" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="17013" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M832 128a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128H356.416a170.666667 170.666667 0 0 1-149.184-87.786667l-118.528-213.333333a170.666667 170.666667 0 0 1 0-165.76l118.528-213.333333A170.666667 170.666667 0 0 1 356.416 128H832z m0 64H356.416a106.666667 106.666667 0 0 0-90.688 50.517333l-2.56 4.352-118.506667 213.333334a106.666667 106.666667 0 0 0-2.56 98.709333l2.56 4.906667 118.506667 213.333333a106.666667 106.666667 0 0 0 88.213333 54.72l5.034667 0.128H832a64 64 0 0 0 63.893333-60.245333L896 768V256a64 64 0 0 0-60.245333-63.893333L832 192z m-356.309333 192a8.533333 8.533333 0 0 1 6.037333 2.496l82.026667 82.026667 82.026666-82.026667a8.533333 8.533333 0 0 1 6.037334-2.496h66.368a8.533333 8.533333 0 0 1 6.037333 14.570667l-115.221333 115.2 111.68 111.658666a8.533333 8.533333 0 0 1-6.037334 14.570667h-66.389333a8.533333 8.533333 0 0 1-6.037333-2.496l-78.464-78.464-78.485334 78.464a8.533333 8.533333 0 0 1-6.037333 2.496h-66.346667a8.533333 8.533333 0 0 1-6.016-14.570667l111.616-111.658666-115.2-115.2a8.533333 8.533333 0 0 1 6.058667-14.570667h66.346667z"          p-id="17014"></path></symbol>',
    text: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="text"  t="1623251579827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="16461" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M668.650667 64a85.333333 85.333333 0 0 1 60.352 25.002667l163.328 163.328A85.333333 85.333333 0 0 1 917.333333 312.682667V832a128 128 0 0 1-128 128H234.666667a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h433.984zM618.666667 128H234.666667a64 64 0 0 0-63.893334 60.245333L170.666667 192v640a64 64 0 0 0 60.245333 63.893333L234.666667 896h554.666666a64 64 0 0 0 63.893334-60.245333L853.333333 832V362.666667h-170.666666a64 64 0 0 1-64-64V128z m140.8 405.333333c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H264.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h494.933334z m-256-128c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H264.533333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h238.933334zM682.666667 133.312V298.666667h165.354666l-0.938666-1.066667-163.349334-163.349333-1.066666-0.938667z"          p-id="16462"></path></symbol>',
    trash: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="trash"  t="1623251570681" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="15913" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M640 64a64 64 0 0 1 64 64v85.333333h226.133333c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H874.666667v554.666667a128 128 0 0 1-128 128H277.333333a128 128 0 0 1-128-128V277.333333H93.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334H320V128a64 64 0 0 1 64-64h256z m170.666667 213.333333H213.333333v554.666667a64 64 0 0 0 60.245334 63.893333L277.333333 896h469.333334a64 64 0 0 0 63.893333-60.245333L810.666667 832V277.333333z m-392.533334 128c4.693333 0 8.533333 3.84 8.533334 8.533334v324.266666a8.533333 8.533333 0 0 1-8.533334 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533334V413.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933333z m234.666667 0c4.693333 0 8.533333 3.84 8.533333 8.533334v324.266666a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533334V413.866667c0-4.693333 3.84-8.533333 8.533334-8.533334h46.933333zM640 128H384v85.333333h256V128z"          p-id="15914"></path></symbol>',
    travel: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="travel"  t="1623251410298" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7662"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M128 669.866667v154.133333a72 72 0 0 0 67.776 71.893333l4.224 0.106667H354.133333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H205.482667A141.482667 141.482667 0 0 1 64 818.517333V669.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533334z m832 0v148.650666A141.482667 141.482667 0 0 1 818.517333 960H669.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533334-8.533333h154.133333a72 72 0 0 0 71.893333-67.776l0.106667-4.224V669.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533334z m-597.333333-597.333334v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H200a72 72 0 0 0-71.893333 67.776L128 200V354.133333a8.533333 8.533333 0 0 1-8.533333 8.533334H72.533333a8.533333 8.533333 0 0 1-8.533333-8.533334V205.482667A141.482667 141.482667 0 0 1 205.482667 64H354.133333c4.693333 0 8.533333 3.84 8.533334 8.533333zM818.517333 64A141.482667 141.482667 0 0 1 960 205.482667V354.133333a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V200a72 72 0 0 0-67.776-71.893333L824 128H669.866667a8.533333 8.533333 0 0 1-8.533334-8.533333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h148.650666z"          p-id="7663"></path>    <path d="M551.146667 780.629333a14.506667 14.506667 0 0 1-27.093334-1.28l-39.978666-125.781333a85.333333 85.333333 0 0 1 11.648-75.136l103.104-145.770667-160.213334 93.589334a85.333333 85.333333 0 0 1-71.744 6.677333l-122.709333-43.861333a14.464 14.464 0 0 1-0.597333-26.901334l447.808-186.666666a42.666667 42.666667 0 0 1 55.530666 56.448l-195.754666 448.682666z"          p-id="7664"></path></symbol>',
    type: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="type"  t="1623251556417" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="14952" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M149.333333 736a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z m748.8 10.666667c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334H275.2a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h622.933333zM149.333333 458.666667a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z m748.8 10.666666c4.693333 0 8.533333 3.84 8.533334 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533333H275.2a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h622.933333zM149.333333 181.333333a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z m748.8 10.666667c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H275.2a8.533333 8.533333 0 0 1-8.533333-8.533333V200.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h622.933333z"          p-id="14953"></path></symbol>',
    under: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="under"  t="1623251388381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6432"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M87.829333 352.021333L489.386667 753.578667a32 32 0 0 0 42.986666 2.069333l2.282667-2.069333 401.536-401.557334a8.533333 8.533333 0 0 0 2.496-6.037333v-66.346667a8.533333 8.533333 0 0 0-14.570667-6.037333L512.021333 685.674667 99.904 273.6a8.533333 8.533333 0 0 0-14.570667 6.037333v66.346667a8.533333 8.533333 0 0 0 2.496 6.037333z"          p-id="6433"></path></symbol>',
    up: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="up"  t="1623251390396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6568"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M936.170667 669.952L534.613333 268.394667a32 32 0 0 0-42.986666-2.069334l-2.282667 2.069334L87.829333 669.952a8.533333 8.533333 0 0 0-2.496 6.037333v66.346667a8.533333 8.533333 0 0 0 14.570667 6.058667l412.074667-412.096 412.117333 412.096a8.533333 8.533333 0 0 0 14.570667-6.037334v-66.346666a8.533333 8.533333 0 0 0-2.496-6.058667z"          p-id="6569"></path></symbol>',
    up2: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="up2"  t="1623251337729" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3684"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m1.258667 254.506666c4.202667 0.256 8.32 1.749333 11.818666 4.458667l2.005334 1.770667 153.088 153.088a8.533333 8.533333 0 0 1 2.496 6.016v66.368a8.533333 8.533333 0 0 1-14.570667 6.037333L512 442.837333l-156.074667 156.074667A8.533333 8.533333 0 0 1 341.333333 592.853333v-66.389333a8.533333 8.533333 0 0 1 2.496-6.016l153.088-153.066667a21.248 21.248 0 0 1 13.824-6.208h2.517334z"          p-id="3685"></path></symbol>',
    upload: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="upload"  t="1623251534092" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="13990" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M311.466667 64c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533333 8.533333H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v554.666666a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 789.333333V234.666667a106.666667 106.666667 0 0 0-102.037333-106.56L789.333333 128h-55.466666a8.533333 8.533333 0 0 1-8.533334-8.533333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333H789.333333a170.666667 170.666667 0 0 1 170.666667 170.666667v554.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h76.8z m212.138666 0l2.517334 0.298667c4.138667 0.746667 8.106667 2.709333 11.306666 5.909333l185.386667 185.386667a8.533333 8.533333 0 0 1 2.517333 6.058666v66.368a8.533333 8.533333 0 0 1-14.570666 6.037334L554.666667 177.962667V632.96a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333V177.322667l-156.096 156.096a8.533333 8.533333 0 0 1-14.570667-6.037334v-66.346666a8.533333 8.533333 0 0 1 2.496-6.037334l184.768-184.789333A21.248 21.248 0 0 1 521.088 64h2.517333z"          p-id="13991"></path></symbol>',
    voiceClose: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="voiceClose"  t="1623251445983" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8896"     xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M227.541333 533.354667a8.533333 8.533333 0 0 1 8.448 7.36 320 320 0 0 0 2.282667 14.570666C263.530667 688.554667 380.608 789.333333 521.237333 789.333333c78.762667 0 150.144-31.616 202.133334-82.858666l45.269333 45.248a350.869333 350.869333 0 0 1-215.424 100.181333V951.466667a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533333v-99.562667c-161.514667-14.570667-291.562667-138.24-315.904-296.746667a355.477333 355.477333 0 0 1-1.6-12.288 8.533333 8.533333 0 0 1 7.488-9.450666l0.512-0.042667h47.829333z m91.008-231.722667l64 64V501.333333a138.666667 138.666667 0 0 0 235.221334 99.52l45.269333 45.269334A202.666667 202.666667 0 0 1 318.570667 501.333333l-0.021334-199.701333z m543.722667 231.722667a8.533333 8.533333 0 0 1 8.469333 9.514666c-0.597333 5.162667-1.130667 9.301333-1.621333 12.394667a350.037333 350.037333 0 0 1-59.093333 147.349333l-46.122667-46.122666A286.293333 286.293333 0 0 0 804.309333 554.666667c0.64-3.392 1.344-8.021333 2.176-13.952a8.533333 8.533333 0 0 1 8.448-7.36h47.338667zM521.237333 64a202.666667 202.666667 0 0 1 202.666667 202.666667v234.666666a201.813333 201.813333 0 0 1-22.4 92.714667l-48.725333-48.704a138.282667 138.282667 0 0 0 7.04-39.04l0.085333-4.970667v-234.666666a138.666667 138.666667 0 0 0-277.248-4.970667l-0.085333 4.970667-0.021334 8.448-57.92-57.898667C346.709333 129.194667 426.346667 64 521.237333 64z"          p-id="8897"></path>    <path d="M199.637333 173.162667l708.266667 708.266666a8.533333 8.533333 0 0 1-6.037333 14.549334h-66.346667a8.533333 8.533333 0 0 1-6.037333-2.496l-708.266667-708.266667A8.533333 8.533333 0 0 1 127.296 170.666667h66.346667a8.533333 8.533333 0 0 1 6.016 2.496z"          p-id="8898"></path></symbol>',
    voice: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="voice"  t="1623251430978" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8207"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M207.637333 533.354667a8.533333 8.533333 0 0 1 8.448 7.36 320 320 0 0 0 2.282667 14.570666C243.626667 688.554667 360.746667 789.333333 501.333333 789.333333c140.842667 0 258.069333-101.098667 283.072-234.666666 0.64-3.392 1.365333-8.021333 2.176-13.952a8.533333 8.533333 0 0 1 8.448-7.36h47.338667a8.533333 8.533333 0 0 1 8.469333 9.514666c-0.597333 5.162667-1.130667 9.301333-1.6 12.394667C824.853333 713.728 694.826667 837.354667 533.333333 851.904V951.466667a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333l-0.021333-99.562667c-161.493333-14.570667-291.562667-138.24-315.882667-296.746667a355.477333 355.477333 0 0 1-1.6-12.288 8.533333 8.533333 0 0 1 7.466667-9.450666l0.512-0.042667h47.829333zM501.333333 64a202.666667 202.666667 0 0 1 202.666667 202.666667v234.666666a202.666667 202.666667 0 0 1-405.333333 0v-234.666666A202.666667 202.666667 0 0 1 501.333333 64z m0 64a138.666667 138.666667 0 0 0-138.581333 133.696L362.666667 266.666667v234.666666a138.666667 138.666667 0 0 0 277.248 4.970667L640 501.333333v-234.666666A138.666667 138.666667 0 0 0 501.333333 128z"          p-id="8208"></path></symbol>',
    volumeClose: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="volumeClose"  t="1623251467768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="10275" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M150.933333 170.666667a8.533333 8.533333 0 0 1 6.037334 2.496l708.266666 708.266666a8.533333 8.533333 0 0 1-6.037333 14.549334h-66.346667a8.533333 8.533333 0 0 1-6.037333-2.496l-189.504-189.504 0.021333 93.610666a85.333333 85.333333 0 0 1-129.237333 73.173334l-171.242667-102.784L192 768a85.333333 85.333333 0 0 1-85.333333-85.333333V341.333333a85.333333 85.333333 0 0 1 50.218666-77.802666l-78.314666-78.293334A8.533333 8.533333 0 0 1 84.608 170.666667h66.346667zM213.333333 320H192a21.333333 21.333333 0 0 0-21.184 18.837333L170.666667 341.333333v341.333334a21.333333 21.333333 0 0 0 18.837333 21.184L192 704h122.581333l186.453334 111.872a21.333333 21.333333 0 0 0 32.149333-15.786667l0.149333-2.496-0.021333-157.610666-320-320z m614.698667-108.906667l0.042667 0.085334a722.773333 722.773333 0 0 1 69.653333 310.442666 723.626667 723.626667 0 0 1-47.701333 259.242667l-50.069334-50.069333a660.650667 660.650667 0 0 0 33.770667-209.173334 658.986667 658.986667 0 0 0-63.296-282.602666 8.533333 8.533333 0 0 1 3.968-11.306667l14.293333-6.976 16.213334-7.872 11.712-5.717333a8.533333 8.533333 0 0 1 11.413333 3.946666z m-115.114667 56.042667l0.042667 0.085333a595.221333 595.221333 0 0 1 56.746667 254.4c0 54.634667-7.317333 107.562667-21.056 157.845334L695.466667 626.261333a535.893333 535.893333 0 0 0 10.24-104.64 531.541333 531.541333 0 0 0-50.432-226.581333 8.533333 8.533333 0 0 1 3.989333-11.306667c3.072-1.493333 5.546667-2.709333 7.509333-3.626666l27.349334-13.333334 7.381333-3.584a8.533333 8.533333 0 0 1 11.413333 3.946667zM585.173333 180.437333a85.333333 85.333333 0 0 1 12.16 43.904l-0.021333 303.786667-64-63.957333L533.333333 224.341333a21.333333 21.333333 0 0 0-1.706666-8.405333l-1.344-2.56a21.333333 21.333333 0 0 0-27.050667-8.490667l-2.218667 1.173334-141.141333 84.650666-46.656-46.634666 154.88-92.906667a85.333333 85.333333 0 0 1 117.077333 29.269333z"          p-id="10276"></path></symbol>',
    volume: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="volume"  t="1623251456745" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9585"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M585.173333 180.437333a85.333333 85.333333 0 0 1 12.16 43.904v573.226667a85.333333 85.333333 0 0 1-129.237333 73.173333L296.853333 768 192 768a85.333333 85.333333 0 0 1-85.333333-85.333333V341.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h101.376l174.72-104.832a85.333333 85.333333 0 0 1 117.077333 29.269333z m242.858667 30.656l0.042667 0.085334a722.773333 722.773333 0 0 1 69.653333 310.442666 722.773333 722.773333 0 0 1-69.653333 310.464 8.533333 8.533333 0 0 1-11.456 4.010667 31057561.877333 31057561.877333 0 0 1-27.818667-13.525333l-14.4-7.04a8.533333 8.533333 0 0 1-3.989333-11.306667 659.072 659.072 0 0 0 63.317333-282.602667 658.986667 658.986667 0 0 0-63.296-282.602666 8.533333 8.533333 0 0 1 3.968-11.306667l14.293333-6.976 16.213334-7.872 11.712-5.717333a8.533333 8.533333 0 0 1 11.413333 3.946666z m-324.8-6.186666l-2.218667 1.152-189.909333 113.92L192 320a21.333333 21.333333 0 0 0-21.184 18.837333L170.666667 341.333333v341.333334a21.333333 21.333333 0 0 0 18.837333 21.184L192 704h122.581333l186.453334 111.872a21.333333 21.333333 0 0 0 32.149333-15.786667l0.149333-2.496v-573.226666a21.333333 21.333333 0 0 0-1.706666-8.426667l-1.344-2.56a21.333333 21.333333 0 0 0-27.050667-8.490667z m209.685333 62.229333l0.042667 0.085333a595.221333 595.221333 0 0 1 56.746667 254.4c0 84.16-17.386667 164.245333-48.789334 236.864-1.856 4.266667-4.501333 10.112-7.978666 17.493334a8.533333 8.533333 0 0 1-11.456 4.053333l-14.890667-7.253333-16.576-8.064-10.752-5.226667a8.533333 8.533333 0 0 1-3.989333-11.285333c3.477333-7.466667 6.144-13.354667 7.978666-17.685334a531.626667 531.626667 0 0 0 42.453334-208.896 531.541333 531.541333 0 0 0-50.432-226.581333 8.533333 8.533333 0 0 1 3.989333-11.306667c3.072-1.493333 5.546667-2.709333 7.509333-3.626666l27.349334-13.333334 7.381333-3.584a8.533333 8.533333 0 0 1 11.413333 3.946667z"          p-id="9586"></path></symbol>',
    wallet: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="wallet"  t="1623251620667" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="19068" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M787.584 164.138667a85.333333 85.333333 0 0 1 1.493333 15.936v13.653333A128.042667 128.042667 0 0 1 896 320v88.021333c36.821333 9.493333 64 42.88 64 82.645334v149.333333a85.376 85.376 0 0 1-64 82.645333V810.666667a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V320a128 128 0 0 1 127.744-128v-1.429333L687.829333 96.213333a85.333333 85.333333 0 0 1 99.776 67.904zM768 256H192a64 64 0 0 0-63.893333 60.245333L128 320v490.666667a64 64 0 0 0 60.245333 63.893333L192 874.666667h576a64 64 0 0 0 63.893333-60.245334L832 810.666667v-85.333334h-181.333333a160 160 0 0 1 0-320H832v-85.333333a64 64 0 0 0-60.245333-63.893333L768 256z m106.666667 213.333333H650.666667a96 96 0 0 0-4.522667 191.893334L650.666667 661.333333H874.666667a21.333333 21.333333 0 0 0 21.184-18.837333L896 640v-149.333333a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 469.333333z m-224 64a32 32 0 1 1 0 64 32 32 0 0 1 0-64z m51.584-374.549333l-2.474667 0.341333-172.949333 32.853334h198.229333v-12.906667l-0.341333-2.986667a21.333333 21.333333 0 0 0-22.464-17.28z"          p-id="19069"></path></symbol>',
    warning: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="warning"  t="1623251328148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3270"     xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m10.666667 522.666666a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334zM546.133333 277.333333c4.693333 0 8.533333 3.84 8.533334 8.533334v281.6a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333V285.866667c0-4.693333 3.84-8.533333 8.533333-8.533334h46.933333z"          p-id="3271"></path></symbol>',
    zoomOut: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="zoomOut"  t="1623251609908" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="18380" xmlns:xlink="http://www.w3.org/1999/xlink"  >    <defs>        <style type="text/css"></style>    </defs>    <path d="M789.333333 64a170.666667 170.666667 0 0 1 170.581334 165.333333L960 234.666667v311.466666a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V234.666667l-0.106667-4.629334a106.666667 106.666667 0 0 0-101.802666-101.930666L789.333333 128H234.666667l-4.629334 0.106667a106.666667 106.666667 0 0 0-101.930666 101.802666L128 234.666667v554.666666l0.106667 4.629334a106.666667 106.666667 0 0 0 101.802666 101.930666L234.666667 896h311.466666c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H234.666667a170.666667 170.666667 0 0 1-170.581334-165.333333L64 789.333333V234.666667a170.666667 170.666667 0 0 1 165.333333-170.581334L234.666667 64h554.666666z m85.333334 554.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v170.666667a85.333333 85.333333 0 0 1-85.333333 85.333333h-170.666667a85.333333 85.333333 0 0 1-85.333333-85.333333v-170.666667a85.333333 85.333333 0 0 1 85.333333-85.333333z m0 64h-170.666667l-2.496 0.149333A21.333333 21.333333 0 0 0 682.666667 704v170.666667l0.149333 2.496A21.333333 21.333333 0 0 0 704 896h170.666667l2.496-0.149333A21.333333 21.333333 0 0 0 896 874.666667v-170.666667l-0.149333-2.496A21.333333 21.333333 0 0 0 874.666667 682.666667zM240.149333 194.901333L469.333333 424.064V264.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h46.933333c4.693333 0 8.533333 3.84 8.533333 8.533333V469.333333a64 64 0 0 1-60.245333 63.893334L469.333333 533.333333h-204.8a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533334h159.530667L194.901333 240.149333l45.248-45.248z"          p-id="18381"></path></symbol>',
    zoom: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><symbol id="zoom"  t="1623251608192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"     p-id="18244" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 200 200">    <defs>        <style type="text/css"></style>    </defs>    <path d="M789.333333 64a170.666667 170.666667 0 0 1 170.666667 170.666667v311.466666a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334V234.666667a106.666667 106.666667 0 0 0-102.037333-106.56L789.333333 128H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v554.666666a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h311.466666c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h554.666666z m85.333334 554.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v170.666667a85.333333 85.333333 0 0 1-85.333333 85.333333h-170.666667a85.333333 85.333333 0 0 1-85.333333-85.333333v-170.666667a85.333333 85.333333 0 0 1 85.333333-85.333333h170.666667z m0 64h-170.666667a21.333333 21.333333 0 0 0-21.184 18.837333L682.666667 704v170.666667a21.333333 21.333333 0 0 0 18.837333 21.184L704 896h170.666667a21.333333 21.333333 0 0 0 21.184-18.837333L896 874.666667v-170.666667a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 682.666667zM460.8 192c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533333 8.533333h-159.530667l229.162667 229.184-45.248 45.248L256 301.269333V460.8a8.533333 8.533333 0 0 1-8.533333 8.533333H200.533333a8.533333 8.533333 0 0 1-8.533333-8.533333V256a64 64 0 0 1 60.245333-63.893333L256 192h204.8z"          p-id="18245"></path></symbol>'
};

class Pt {
    constructor(e = !0) {
        s(this, "svgElm"), s(this, "isAllLoad", !0), this.svgElm = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svgElm.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.svgElm.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"), this.svgElm.style.position = "absolute", this.svgElm.style.width = "0", this.svgElm.style.height = "0", e && (this.isAllLoad = e, this.loadAllIconXML())
    }

    loadIconXML(e) {
        this.isAllLoad || (this.svgElm.innerHTML = this.svgElm.innerHTML + Tt[e], this.appendToBody())
    }

    loadAllIconXML() {
        Object.keys(Tt).forEach((e => {
            this.svgElm.innerHTML = this.svgElm.innerHTML + Tt[e]
        })), this.appendToBody()
    }

    appendToBody() {
        document.body.insertBefore(this.svgElm, document.body.firstElementChild)
    }
}

new Pt, Vt.install = e => {
    e.component(Vt.name, Vt)
};
const zt = Vt;
zt.BeIconComponets = (e, t) => {
    const a = t.template;
    if (!a) return void console.error("The ‘template’ field in the parameter ‘option’ is required");
    const l = i((o = a, {
        name: "BeCustomIcon", props: {spin: {type: Boolean, default: !1}}, setup(e) {
            const t = N(), a = e.customClass ? e.customClass : "", l = p((() => e.spin ? "be-icon-spin " + a : "" + a));
            return () => L("div", I({class: `be-icon-container ${l.value}`}, t), [o])
        }
    }));
    var o;
    return l.install = t => {
        t.component(e, l)
    }, l
};
const Et = new Set;
zt.createFromIconfontCN = e => {
    if ("undefined" != typeof document && "undefined" != typeof window && "function" == typeof document.createElement && "string" == typeof e && e.length && !Et.has(e)) {
        const t = document.createElement("script");
        t.setAttribute("src", e), t.setAttribute("data-namespace", e), Et.add(e), document.body.appendChild(t)
    }
}, zt.BeIconComponets, zt.createFromIconfontCN, wt.install = e => {
    e.component(wt.name, wt)
};
const Mt = wt;
Ct.install = e => {
    e.component(Ct.name, Ct)
};
const It = Ct;
var Gt = i({
    name: "BeButton",
    components: {BeIcon: Vt},
    props: {
        size: {type: String, default: "medium"},
        round: {type: [Number, String], default: 2},
        type: {type: String, default: "default"},
        bordered: {type: Boolean, default: !1},
        ghost: {type: Boolean, default: !1},
        dashed: {type: Boolean, default: !1},
        customClass: {type: String, default: ""},
        flex: {type: Boolean, default: !1},
        disabled: {type: Boolean, default: !1},
        prevIcon: {type: String, default: ""},
        nextIcon: {type: String, default: ""},
        loading: {type: Boolean, default: !1}
    },
    setup(e, t) {
        const a = r(), l = c(a.uid);
        const o = p((() => ({
                background: e.ghost ? "transparent !important" : "",
                cursor: e.disabled ? "not-allowed" : "pointer",
                "border-style": e.dashed ? "dashed" : "solid",
                "border-radius": `${e.round}px`,
                display: e.flex ? "flex" : ""
            }))), n = p((() => e.bordered ? "__border" : "")),
            s = p((() => e.disabled || e.loading ? "be-button__inner__disabled" : "")),
            i = p((() => e.loading ? "loading" : e.prevIcon ? e.prevIcon : "")),
            d = p((() => e.nextIcon ? e.loading ? "" : e.nextIcon : ""));
        return () => L("button", I({type: "button"}, t.attrs, {
            style: o.value,
            id: `be_button_${l.value}`,
            class: `\n                    be-button \n                    be-button__inner ${s.value} \n                    be-button__${e.size} \n                    be-button__${e.type}${n.value} \n                    ${e.customClass}`,
            disabled: e.disabled || e.loading
        }), [L("div", {
            class: "be-button-body",
            style: "margin: 0 auto;display: flex"
        }, [e.prevIcon || e.loading ? L(z("be-icon"), {
            icon: i.value,
            spin: e.loading,
            "custom-class": `be-button-prevIcon be-button-prevIcon__${e.type}`
        }, null) : "", L("div", {class: "be-button-slot"}, [t.slots.default && t.slots.default()]), e.nextIcon ? L(z("be-icon"), {
            icon: d.value,
            "custom-class": `be-button-nextIcon be-button-nextIcon__${e.type}`
        }, null) : ""])])
    }
});
const Nt = Gt;
Nt.install = e => {
    e.component(Nt.name || "", Nt)
};
const _t = Nt, Ht = {
    beforeMount(e, t) {
        const a = e;
        if (a.style.transform = "translate(0%, 0%)", a.style.position = "absolute", t.value && (!1 === t.value.isDrag || "false" === t.value.isDrag)) return;
        a.firstChild && (a.firstChild.style.cursor = "move");
        let l = null;
        const o = a.children;
        for (let n = 0; n < o.length; n++) if (o[n].className && o[n].className.indexOf("info-tag") > -1) {
            l = o[n];
            break
        }
        e.onmousedown = e => {
            let o = !1;
            const n = e;
            if (n.path) for (let t = 0; t < n.path.length; t++) {
                if (a.firstChild === n.path[t] || l === n.path[t]) {
                    o = !0;
                    break
                }
                if (a.firstChild === n.path[t]) {
                    o = !1;
                    break
                }
            } else o = !0;
            if (!o) return;
            const s = document.body.offsetWidth, i = document.body.offsetHeight;
            if (0 === s || 0 === i) return void console.error("Please set the width and height of the body element");
            const r = e.clientX - a.offsetLeft, c = e.clientY - a.offsetTop, d = e.currentTarget, p = d.offsetWidth,
                u = d.offsetHeight;
            let m = 0;
            document.onmousemove = e => {
                if (m > 1) {
                    let l = e.clientX - r, o = e.clientY - c;
                    const n = s - p, d = i - u;
                    o < 0 && (o = 0), l < 0 && (l = 0), o > d && (o = d), l > n && (l = n), a.style.left = l + "px", a.style.top = o + "px", a.style.transform = "translate(0%, 0%)", t.value && "[object Function]" === Object.prototype.toString.call(t.value) && t.value({
                        left: l,
                        top: o
                    })
                }
                m++
            }, document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null
            }
        }
    }
};
var Ot = i({
    name: "BeDialog",
    components: {BeIcon: Vt, BeButton: Gt},
    directives: {drag: Ht},
    props: {
        isDrag: {type: Boolean, default: !1},
        showFooter: {type: Boolean, default: !0},
        titles: {type: String, default: ""},
        isShow: {type: Boolean, default: !1},
        customClass: {type: String, default: ""},
        isOpenModal: {type: Boolean, default: !0},
        escExit: {type: Boolean, default: !1},
        layout: {type: String, default: "center"}
    },
    emits: ["confirm", "close", "update:isShow", "escEvt"],
    setup(e, t) {
        const a = p((() => e.customClass)), l = r(), o = e => {
            "btn" !== e && "keyboard" !== e || t.emit("close"), t.emit("update:isShow", !1)
        }, n = p((() => e.isShow));
        u(n, (e => {
            e ? v((() => {
                s()
            })) : i()
        }));
        const s = () => {
            e.escExit && (document.body.onkeydown = e => {
                e && "Escape" === e.key && (t.emit("escEvt"), o("keyboard"))
            })
        }, i = () => {
            document.body.onkeydown = null
        }, d = c("");
        return m((() => {
            e.isOpenModal && (d.value = "be-dialog-modal"), e.isShow && s()
        })), _((() => {
            i()
        })), {
            dialogModels: d, customClassStyle: a, handleClose: o, handleConfirm: () => {
                t.emit("confirm"), o()
            }, uid: l.uid
        }
    }
});
const $t = {key: 0, class: "be-dialog"}, At = ["id"], Ft = {class: "be-dialog-title"}, Wt = ["id"],
    Ut = {class: "be-dialog-close"}, Yt = {class: "be-dialog-body"}, Rt = {class: "be-dialog-body__inner"},
    jt = H("确定 ");
Ot.render = function (e, t, a, l, o, n) {
    const s = z("be-icon"), i = z("be-button"), r = g("drag");
    return w(), f(y, null, [e.isShow ? (w(), f("div", {
        key: 0,
        class: D(e.dialogModels)
    }, null, 2)) : P("", !0), L(V, {name: "dialog-fade"}, {
        default: S((() => [e.isShow ? (w(), f("div", $t, [B(b("div", {
            id: `be_dialog_container${e.uid}`,
            class: D(["be-dialog-container", e.customClassStyle])
        }, [b("div", Ft, [b("div", {
            id: `be_head${e.uid}`,
            class: "be-dialog-container-head"
        }, [b("span", null, E(e.titles), 1), b("div", Ut, [x(e.$slots, "headerIcon", {}, (() => [L(s, {
            icon: "deleteIc",
            "custom-class": "be-dialog-close-btn",
            onClick: t[0] || (t[0] = t => e.handleClose("btn"))
        })]))])], 8, Wt)]), b("div", Yt, [b("div", Rt, [x(e.$slots, "default")])]), e.showFooter ? (w(), f("div", {
            key: 0,
            class: D(`be-dialog-footer be-dialog-footer__${e.layout}`)
        }, [x(e.$slots, "footer", {}, (() => [L(i, {
            type: "primary",
            bordered: "",
            round: "3",
            "custom-class": "be-dialog-footer-btn",
            onClick: e.handleConfirm
        }, {
            default: S((() => [jt])),
            _: 1
        }, 8, ["onClick"])]))], 2)) : P("", !0)], 10, At), [[r, {isDrag: e.isDrag}]])])) : P("", !0)])), _: 3
    })], 64)
}, Ot.install = e => {
    e.component(Ot.name, Ot)
};
const qt = Ot;
var Kt = i({
    name: "BeLoadingAnimate", inject: ["$$BeLoading"], render() {
        const e = [];
        if (this.$$BeLoading.customRender()) e[0] = this.$$BeLoading.customRender(); else for (let a = 0; a <= 2; a++) e.push((t = this.$$BeLoading.color, L("div", {class: "circleBox"}, [L("span", {style: `background-color:${t}`}, null), L("span", {style: `background-color:${t}`}, null), L("span", {style: `background-color:${t}`}, null), L("span", {style: `background-color:${t}`}, null)])));
        var t;
        return L("div", {
            style: `border-radius: ${this.$$BeLoading.round}px;`,
            class: `be-loader be-loader__${this.$$BeLoading.sizeLoader} ${this.$$BeLoading.isBackgroundStyle}`
        }, [e])
    }
}), Xt = i({
    name: "BeLoading",
    components: {BeLoadingAnimate: Kt},
    provide() {
        return {$$BeLoading: this}
    },
    props: {
        delay: {type: Number, default: 0},
        show: {type: Boolean, default: !1},
        color: {type: String, default: "#4F60A7FF"},
        colorText: {type: String, default: "black"},
        text: {type: String, default: ""},
        round: {type: [Number, String], default: 5},
        size: {type: String, default: "default"},
        isBackground: {type: Boolean, default: !0},
        mdColor: {type: String, default: "rgba(255,255,255,.5)"},
        customClass: {type: String, default: ""},
        isFullScreen: {type: Boolean, default: !1},
        customRender: {type: Function, default: () => null}
    },
    setup(e) {
        const t = c("50%"), a = c("50%"), l = c(""), o = c(""), n = c(null), s = p((() => e.size)), i = c(""),
            d = c(""), m = c("50%"), h = c("50%"), g = p((() => e.isBackground ? "be-loader__bg" : "")), w = c(""),
            f = c(""), y = c(""), b = c(""), x = c(""), C = r(), k = l => {
                if (!l) return;
                const o = (e => {
                    if (!e) return null;
                    let t, a, l = e.offsetWidth, o = e.offsetHeight;
                    for (t = e.offsetTop, a = e.offsetLeft; e = e.offsetParent;) t += e.offsetTop, a += e.offsetLeft;
                    return {
                        width: l,
                        height: o,
                        top: t,
                        left: a,
                        right: document.body.offsetWidth - l - a,
                        bottom: document.body.offsetHeight - o - t
                    }
                })(l);
                d.value = window.getComputedStyle(l).width, i.value = window.getComputedStyle(l).height, o && (m.value = "0px", h.value = "0px"), e.text && v((() => {
                    let e = document.querySelector(".be-loader");
                    if (!e) return;
                    let l = Number(window.getComputedStyle(e).height.split("px")[0]);
                    b.value = t.value;
                    let o = null;
                    a.value.split("px").length > 1 ? (o = a.value.split("px"), x.value = Number(o[0]) + l / 2 + 20 + "px") : (o = a.value.split("%"), x.value = `calc(${Number(o[0])}% + ${l / 2 + 20}px)`)
                }))
            }, D = p((() => e.show)), L = c(!1), V = t => {
                t ? n.value = setTimeout((() => {
                    v((() => {
                        L.value = t, w.value = p((() => e.isFullScreen ? "be-load-container__fullScreen" : "")).value, e.isFullScreen || k(null == C ? void 0 : C.proxy.$el.parentElement)
                    }))
                }), e.delay) : (L.value = t, clearTimeout(n), n.value = null)
            };
        return M((() => {
            let t = e.show;
            V(t)
        })), u(D, (e => {
            V(e)
        })), {
            uid: C.uid,
            containerHeight: i,
            containerWidth: d,
            containerLeft: m,
            containerTop: h,
            isFullScreenStyle: w,
            leftLoader: l,
            topLoader: o,
            loaderWidth: f,
            loaderHeight: y,
            leftTxt: b,
            topTxt: x,
            left: t,
            top: a,
            sizeLoader: s,
            isShowLoader: D,
            isShowLoaderInner: L,
            isBackgroundStyle: g
        }
    }
});
const Zt = ["id"];
Xt.render = function (e, t, a, l, o, n) {
    const s = z("BeLoadingAnimate");
    return w(), f("div", {
        id: `be_load_${e.uid}`,
        style: T(`position: absolute;height: ${e.containerHeight};width: ${e.containerWidth};left: ${e.containerLeft};top: ${e.containerTop};`)
    }, [L(V, {name: "be-fade-in-linear"}, {
        default: S((() => [e.isShowLoaderInner ? (w(), f("div", {
            key: 0,
            class: D(["be-load-container flex-col", `${e.customClass} ${e.isFullScreenStyle}`]),
            style: T(`\n                 background-color: ${e.mdColor};\n                 left: ${e.leftLoader};\n                 top: ${e.topLoader};\n                 width:${e.loaderWidth};\n                 height:${e.loaderHeight}`)
        }, [L(s), e.text ? (w(), f("span", {
            key: 0,
            class: D(["be-loader-text", `be-loader-text__${e.sizeLoader}`]),
            style: T(`color:${e.colorText};`)
        }, E(e.text), 7)) : P("", !0)], 6)) : P("", !0)])), _: 1
    })], 12, Zt)
};
const Jt = {
    close: e => {
        O(null, e.beLoadingElm)
    }, init: (e = {}) => {
        const t = Object.assign({}, {
            isBackground: !0,
            bgColor: "rgba(255,255,255,.5)",
            customRender: () => null,
            text: "",
            size: "default",
            customClass: "",
            color: "#4F60A7FF",
            colorText: "black",
            delay: 0,
            round: 5,
            show: !1,
            isFullScreen: !0
        }, e), a = L(Xt, n({}, t));
        a.props.show = !0, a.props.isFullScreen = !0;
        const l = document.createElement("div");
        O(a, l);
        const o = document.querySelector("body");
        return o && o.append ? o.append(a.el) : o && o.appendChild(a.el), a.beLoadingElm = l, a
    }
};
const Qt = Xt;
Qt.install = e => {
    e.component(Qt.name || "", Qt)
};
const ea = Qt, ta = (e, t, a, l, o, n) => {
    if (e.isFront) {
        const s = new Map, i = p((() => {
            const i = t.pageNumVal ? Number(t.pageNumVal.split("/")[0]) : e.pageSize;
            a.value = Math.ceil(e.pageData.length / i), t.pageParamsFront.maxPageNum = a.value, e.pageData.length && 0 !== e.pageData.length || (s.set(1, []), t.pageParamsFront.maxPageNum = 1), n.emit("getPageCount", t.pageParamsFront);
            for (let t = 1; t <= a.value; t++) {
                const a = e.pageData.slice((t - 1) * i, t * i);
                s.set(t, a)
            }
            let r = e.pagerShowCount;
            const c = (r - 1) / 2;
            r = a.value <= r ? a.value : r;
            const d = Number(e.currentPage) > a.value ? a.value : Number(e.currentPage);
            1 === d && n.emit("updatePage", {data: s.get(1)});
            let p = !1, u = !1;
            a.value > r && (d > r - c && (p = !0), d < a.value - (r - 2) && (u = !0));
            const m = [];
            if (p && !u) {
                for (let e = a.value - (r - 2); e < a.value; e++) m.push(e)
            } else if (!p && u || !p && !u) for (let e = 2; e < r; e++) m.push(e); else if (p && u) {
                const e = Math.floor(r / 2) - 1;
                for (let t = d - e; t < d + e + 1; t++) m.push(t)
            }
            return l.value = p, o.value = u, m
        })), r = () => {
            let t = Number(e.currentPage) > a.value ? a.value : Number(e.currentPage);
            1 !== t && t > 0 && e.isFront && n.emit("updatePage", {data: s.get(--t)})
        }, c = () => {
            let l = Number(e.currentPage) > a.value ? a.value : Number(e.currentPage);
            l !== t.pageParamsFront.maxPageNum && e.isFront && n.emit("updatePage", {data: s.get(++l)})
        };
        return {sliceList: s, frontList: i.value, prePageFront: r, nextPageFront: c}
    }
    return {sliceList: void 0, frontList: void 0, prePageFront: void 0, nextPageFront: void 0}
};
var aa = i({
    name: "BePager", components: {BeIcon: zt}, emits: ["changePage", "updatePage"], setup(e, t) {
        const a = $("$$BePaginMix"), l = $("$$BePaginProps");
        let o = c(0), n = c(!1), s = c(!1), i = p((() => ((e, t, a, l) => {
                if (e.isFront || e.isDynamic) return [];
                let o = e.pagerShowCount;
                const n = (o - 1) / 2, s = Number(e.pageCount);
                t.value = Math.ceil(s / Number(e.pageSize));
                const i = Number(e.currentPage) > t.value ? t.value : Number(e.currentPage);
                o = t.value <= o ? t.value : o;
                let r = !1, c = !1;
                t.value > o && (i > o - n && (r = !0), i < t.value - (o - 2) && (c = !0));
                const d = [];
                if (r && !c) for (let p = t.value - (o - 2); p < t.value; p++) d.push(p); else if (!r && c || !r && !c) for (let p = 2; p < o; p++) d.push(p); else if (r && c) {
                    const e = Math.floor(o / 2) - 1;
                    for (let t = i - e; t < i + e + 1; t++) d.push(t)
                }
                return a.value = r, l.value = c, d
            })(l, o, n, s))), r = p((() => (e => {
                if (e.isDynamic) {
                    const t = [], a = Number(e.currentPage) >= 1 ? Number(e.currentPage) : 1, l = Number(e.pagerShowCount),
                        o = parseInt(String(l / 2));
                    if (a <= o) for (let e = 1; e <= l; e++) t.push(e);
                    if (a > o) {
                        const e = a - o;
                        for (let a = e; a < l + e; a++) t.push(a)
                    }
                    return t
                }
                return []
            })(l))), v = d(ta(l, a, o, n, s, t)), h = c(v ? v.sliceList : null), g = c(v ? v.frontList : null),
            w = c(v ? v.nextPageFront : null), f = c(v ? v.prePageFront : null);
        u(l, (e => {
            v = ta(e, a, o, n, s, t), g.value = v ? v.frontList : null, h.value = v ? v.sliceList : null, w.value = v ? v.nextPageFront : null, f.value = v ? v.prePageFront : null
        }));
        const y = (e, t, a) => {
            isNaN(e) || (e < 1 && (e = 1), e > t.value && !a.isDynamic && (e = t.value))
        }, b = e => {
            let n = 0;
            n = l.isDynamic ? Number(l.currentPage) : Number(l.currentPage) > o.value ? o.value : Number(l.currentPage);
            let s = 0;
            if ("next" === e ? s = l.isDynamic ? n + 1 : n >= o.value ? n : n + 1 : (s = n - 1, s = s <= 0 ? 1 : s), y(s, o, l), s !== n) {
                l.isFront && ("next" === e ? w.value && w.value() : f.value && f.value());
                const o = {
                    currentPage: s,
                    pageCount: l.isFront ? a.pageParamsFront.maxPageNum : l.pageCount,
                    pageSize: a.pageNumVal ? Number(a.pageNumVal.split("/")[0]) : l.pageSize
                };
                t.emit("changePage", o)
            }
        };
        let x = c("more"), C = c("more"), k = c("#303133"), D = c("#303133");
        M((() => {
            n.value || (C.value = "more")
        })), M((() => {
            s.value || (x.value = "more")
        })), u([s, n], (([e, t]) => {
            e || (x.value = "more"), t || (C.value = "more")
        }));
        return m((() => {
            if (l.isFront) {
                const e = a.pageNumVal ? Number(a.pageNumVal.split("/")[0]) : l.pageSize;
                o.value = Math.ceil(l.pageData.length / e)
            } else {
                const e = Number(l.pageCount);
                o.value = Math.ceil(e / Number(l.pageSize))
            }
        })), {
            pagerMix: a,
            pagerProps: l,
            frontList: g,
            quickprevIconClass: C,
            hoverprevIconClass: D,
            quicknextIconClass: x,
            hoverNextIconClass: k,
            pagers: i,
            pagersDynamic: r,
            showPrevMore: n,
            showNextMore: s,
            maxPageNum: o,
            prePage: () => {
                l.disabled || b("pre")
            },
            nextPage: () => {
                l.disabled || b("next")
            },
            onPagerClick: (e, n) => {
                let s = 0;
                s = l.isDynamic ? Number(l.currentPage) : Number(l.currentPage) > o.value ? o.value : Number(l.currentPage);
                let i = n;
                if (!n) {
                    let t = null == e ? void 0 : e.target;
                    if ("UL" === t.tagName || l.disabled) return;
                    i = Number(t.textContent);
                    const a = l.pagerShowCount;
                    if (t.className && "[object String]" === Object.prototype.toString.call(t.className) && (-1 !== t.className.indexOf("pageLast") || -1 !== t.className.indexOf("pageFirst"))) {
                        const e = t.childNodes[0];
                        -1 !== e.className.indexOf("quickprev") ? (i = s - a, i = i < 1 ? 1 : i) : -1 !== e.className.indexOf("quicknext") && (i = s + a, i = i > o.value ? o.value : i)
                    }
                    const n = null == e ? void 0 : e.target;
                    t.className && "[object SVGAnimatedString]" === Object.prototype.toString.call(t.className) && n.className.baseVal && -1 !== n.className.baseVal.toString().indexOf("be-icon") && (t.parentElement && -1 !== t.parentElement.className.indexOf("quickprev") ? (i = s - a, i = i < 1 ? 1 : i) : t.parentElement && -1 !== t.parentElement.className.indexOf("quicknext") && (i = s + a, i = i > o.value ? o.value : i))
                }
                if (y(Number(i), o, l), i !== s) {
                    l.isFront && h.value && t.emit("updatePage", {data: h.value.get(Number(i))});
                    const e = {
                        currentPage: Number(i),
                        pageCount: l.isFront ? a.pageParamsFront.maxPageNum : l.pageCount,
                        pageSize: a.pageNumVal ? Number(a.pageNumVal.split("/")[0]) : l.pageSize
                    };
                    t.emit("changePage", e)
                }
            },
            onMouseenter: e => {
                l.disabled || ("left" === e ? (D.value = "#409EFF", C.value = "pageFirst") : (k.value = "#409EFF", x.value = "pageLast"))
            }
        }
    }
});
const la = {style: {display: "flex"}};
aa.render = function (e, t, a, l, o, n) {
    const s = z("be-icon");
    return w(), f("div", la, [b("ul", {class: D(["be-pager", {"be-pager__disabled": e.pagerProps.disabled}])}, [b("li", {onClick: t[0] || (t[0] = (...t) => e.prePage && e.prePage(...t))}, [L(s, {icon: "left"})])], 2), e.pagerProps.isDynamic || e.pagerProps.isFront ? e.pagerProps.isDynamic && !e.pagerProps.isFront ? (w(), f("ul", {
        key: 1,
        class: D(["be-pager", {"be-pager__disabled": e.pagerProps.disabled}]),
        onClick: t[6] || (t[6] = (...t) => e.onPagerClick && e.onPagerClick(...t))
    }, [(w(!0), f(y, null, F(e.pagersDynamic, (t => (w(), f("li", {
        key: t,
        class: D([{active: e.pagerProps.currentPage === t, disabled: e.pagerProps.disabled}, "number"])
    }, E(t), 3)))), 128))], 2)) : !e.pagerProps.isDynamic && e.pagerProps.isFront ? (w(), f("ul", {
        key: 2,
        class: D(["be-pager", {"be-pager__disabled": e.pagerProps.disabled}]),
        onClick: t[11] || (t[11] = (...t) => e.onPagerClick && e.onPagerClick(...t))
    }, [e.pagerMix.pageParamsFront.maxPageNum > 0 ? (w(), f("li", {
        key: 0,
        class: D([{active: 1 === e.pagerProps.currentPage, disabled: e.pagerProps.disabled}, "number"])
    }, " 1 ", 2)) : P("", !0), e.showPrevMore ? (w(), f("li", {
        key: 1,
        class: D([e.quickprevIconClass, {disabled: e.pagerProps.disabled}]),
        onMouseenter: t[7] || (t[7] = t => e.onMouseenter("left")),
        onMouseleave: t[8] || (t[8] = () => {
            e.hoverprevIconClass = "#303133", e.quickprevIconClass = "more"
        })
    }, [L(s, {
        icon: e.quickprevIconClass,
        class: "more btn-quickprev",
        color: e.hoverprevIconClass,
        onClick: A(e.onPagerClick, ["stop"])
    }, null, 8, ["icon", "color", "onClick"])], 34)) : P("", !0), (w(!0), f(y, null, F(e.frontList, (t => (w(), f("li", {
        key: t,
        class: D([{active: e.pagerProps.currentPage === t, disabled: e.pagerProps.disabled}, "number"])
    }, E(t), 3)))), 128)), e.showNextMore ? (w(), f("li", {
        key: 2,
        class: D([e.quicknextIconClass, {disabled: e.pagerProps.disabled}]),
        onMouseenter: t[9] || (t[9] = t => e.onMouseenter("right")),
        onMouseleave: t[10] || (t[10] = () => {
            e.hoverNextIconClass = "#303133", e.quicknextIconClass = "more"
        })
    }, [L(s, {
        icon: e.quicknextIconClass,
        class: "more btn-quicknext",
        color: e.hoverNextIconClass,
        onClick: A(e.onPagerClick, ["stop"])
    }, null, 8, ["icon", "color", "onClick"])], 34)) : P("", !0), e.pagerMix.pageParamsFront.maxPageNum > 1 ? (w(), f("li", {
        key: 3,
        class: D([{
            active: e.pagerProps.currentPage < e.maxPageNum ? e.pagerProps.currentPage === e.pagerMix.pageParamsFront.maxPageNum : e.maxPageNum === e.pagerMix.pageParamsFront.maxPageNum,
            disabled: e.pagerProps.disabled
        }, "number"])
    }, E(e.pagerMix.pageParamsFront.maxPageNum), 3)) : P("", !0)], 2)) : P("", !0) : (w(), f("ul", {
        key: 0,
        class: D(["be-pager", {"be-pager__disabled": e.pagerProps.disabled}]),
        onClick: t[5] || (t[5] = (...t) => e.onPagerClick && e.onPagerClick(...t))
    }, [e.pagerProps.pageCount > 0 ? (w(), f("li", {
        key: 0,
        class: D([{active: 1 === e.pagerProps.currentPage, disabled: e.pagerProps.disabled}, "number"])
    }, " 1 ", 2)) : P("", !0), e.showPrevMore ? (w(), f("li", {
        key: 1,
        class: D([e.quickprevIconClass, {disabled: e.pagerProps.disabled}]),
        onMouseenter: t[1] || (t[1] = t => e.onMouseenter("left")),
        onMouseleave: t[2] || (t[2] = () => {
            e.hoverprevIconClass = "#303133", e.quickprevIconClass = "more"
        })
    }, [L(s, {
        icon: e.quickprevIconClass,
        class: "more btn-quickprev",
        color: e.hoverprevIconClass,
        onClick: A(e.onPagerClick, ["stop"])
    }, null, 8, ["icon", "color", "onClick"])], 34)) : P("", !0), (w(!0), f(y, null, F(e.pagers, (t => (w(), f("li", {
        key: t,
        class: D([{active: e.pagerProps.currentPage === t, disabled: e.pagerProps.disabled}, "number"])
    }, E(t), 3)))), 128)), e.showNextMore ? (w(), f("li", {
        key: 2,
        class: D([e.quicknextIconClass, {disabled: e.pagerProps.disabled}]),
        onMouseenter: t[3] || (t[3] = t => e.onMouseenter("right")),
        onMouseleave: t[4] || (t[4] = () => {
            e.hoverNextIconClass = "#303133", e.quicknextIconClass = "more"
        })
    }, [L(s, {
        icon: e.quicknextIconClass,
        class: "more btn-quicknext",
        color: e.hoverNextIconClass,
        onClick: A(e.onPagerClick, ["stop"])
    }, null, 8, ["icon", "color", "onClick"])], 34)) : P("", !0), e.maxPageNum > 1 ? (w(), f("li", {
        key: 3,
        class: D([{active: !(e.pagerProps.currentPage < e.maxPageNum), disabled: e.pagerProps.disabled}, "number"])
    }, E(e.maxPageNum), 3)) : P("", !0)], 2)), b("ul", {class: D(["be-pager", {"be-pager__disabled": e.pagerProps.disabled}])}, [b("li", {onClick: t[12] || (t[12] = (...t) => e.nextPage && e.nextPage(...t))}, [L(s, {icon: "right"})])], 2)])
};
var oa = i({
    name: "BeInputSelect",
    props: {
        selectList: {type: Object, default: () => ({})},
        selectStyle: {type: Object, default: () => ({left: "0px", top: "0px"})},
        isShow: {type: Boolean, default: !1},
        loading: {type: Boolean, default: !1},
        keyValue: {type: String, default: "id"},
        labelValue: {type: String, default: "label"}
    },
    emits: ["select"],
    setup(e, t) {
        const a = r(), l = p((() => e.selectList));
        return {
            uid: a.uid, handleSelect: (e, a) => {
                t.emit("select", e, a)
            }, list: l
        }
    }
});
const na = ["id"], sa = ["id"], ia = ["onClick"], ra = [b("li", {class: "be-input-select__line"}, null, -1), b("li", {
    class: "be-input-select__inner",
    style: {"text-align": "center"}
}, "载入中...", -1)], ca = [b("li", {class: "be-input-select__inner"}, "暂无数据", -1)];
oa.render = function (e, t, a, l, o, n) {
    return w(), C(V, {name: "be-zoom-in-top"}, {
        default: S((() => [b("div", {
            id: `be_input_select${e.uid}`,
            class: "be-input-select",
            style: T(e.selectStyle)
        }, [e.list.length > 0 ? B((w(), f("ul", {
            id: `be_input_select_ul${e.uid}`,
            key: `be_input_select_ul${e.uid}`,
            style: T(e.selectStyle)
        }, [(w(!0), f(y, null, F(e.list, ((t, a) => (w(), f("li", {
            key: t[e.keyValue],
            class: "be-input-select__inner",
            onClick: l => e.handleSelect(t, a)
        }, [x(e.$slots, "cus-temp", {item: t}, (() => [H(E(t[e.labelValue]), 1)]))], 8, ia)))), 128))], 12, sa)), [[W, !e.loading]]) : P("", !0), B((w(), f("ul", {key: `be-input-select${e.uid}-loading`}, ra, 512)), [[W, e.loading]]), B((w(), f("ul", {key: `be-input-select${e.uid}-loading`}, ca, 512)), [[W, e.loading && 0 === e.list.length]])], 12, na)])),
        _: 3
    })
};
var da = (e, t) => {
    const a = r(), l = a.uid, o = c([]), n = p((() => e.list)), s = c(!0);
    e.search && (s.value = !1);
    const i = e.disabled ? "not-allowed" : s.value ? "pointer" : "", u = d({width: "0px"}), m = N(),
        h = c(p((() => e.selectIcon)).value), g = c(""), w = t => {
            e.clear && e.modelValue && (h.value = t || "error")
        }, f = () => {
            t.emit("scroll")
        }, y = c(""), b = c("click");
    e.remote && gt(e.remoteFunc) && (b.value = "none");
    const x = c(!1), C = c([]);
    return {
        internalInstance: a,
        uid: l,
        dataList: o,
        list: n,
        listCache: [],
        readonlyInput: s,
        cursor: i,
        selectStyle: u,
        iconType: h,
        trigger: b,
        loading: x,
        addItemList: C,
        addItem: y,
        handleInput: e => {
            y.value = e
        },
        addItemToList: () => {
            if (y.value) {
                const t = {}, a = e.keyValue || "id", l = e.labelValue || "label";
                t[a] = ct(), t[l] = y.value, o.value.push(t), y.value = ""
            }
        },
        computedPosition: () => {
            const e = document.getElementById(`be-select-body${l}`);
            e && (u.width = Number(window.getComputedStyle(e).width.split("px")[0]) + "px")
        },
        updatePopover: () => {
            a.refs.beSelectPopover.computePosition(null, "update")
        },
        addScrollEvt: () => {
            const e = document.getElementById(`be_select_option_container_${l}`);
            null == e || e.addEventListener("scroll", f)
        },
        handleScroll: f,
        handleMouseLeave: a => {
            w(e.selectIcon), t.emit("MouseLeave", a)
        },
        handleMouseEnter: e => {
            w(void 0), t.emit("MouseEnter", e)
        },
        selectOpenChange: e => {
            g.value = e ? "be-select-body__focus" : "", e && m.onScroll && v((() => {
                const e = document.getElementById(`be_select_option_container_${l}`);
                null == e || e.addEventListener("scroll", f)
            })), t.emit("openChange", e)
        },
        handleBlur: e => {
            t.emit("blur", e)
        },
        handleFocus: e => {
            var a;
            null == (a = e.target.querySelector("input")) || a.focus(), t.emit("focus", e)
        },
        changeIcon: w,
        focusClass: g
    }
}, pa = i({
    name: "BeSelect",
    components: {BeInputSelect: oa, BePopover: wt, BeIcon: Vt},
    props: {
        disabled: {type: Boolean, default: !1},
        size: {type: String, default: "medium"},
        list: {type: Array, default: () => []},
        modelValue: {type: String},
        labelValue: {type: String, default: "label"},
        keyValue: {type: String},
        placeholder: {type: String, default: "请选择"},
        clear: {type: Boolean, default: !1},
        selectIcon: {type: String, default: "under"},
        group: {type: Boolean, default: !1},
        extend: {type: Boolean, default: !1},
        search: {type: Boolean, default: !1},
        searchFunc: {type: Function},
        sortFunc: {type: Function},
        remote: {type: Boolean, default: !1},
        remoteFunc: {type: Function},
        customClass: {type: String, default: ""}
    },
    emits: ["update:modelValue", "select", "focus", "blur", "openChange", "clear", "search", "MouseEnter", "MouseLeave", "scroll"],
    setup(e, t) {
        const {
            internalInstance: a,
            uid: l,
            dataList: o,
            list: s,
            readonlyInput: i,
            cursor: r,
            selectStyle: c,
            iconType: d,
            trigger: p,
            loading: v,
            addItem: h,
            handleInput: g,
            addItemToList: w,
            computedPosition: f,
            addScrollEvt: y,
            handleMouseLeave: b,
            handleMouseEnter: x,
            selectOpenChange: C,
            handleBlur: k,
            handleFocus: D,
            focusClass: V,
            changeIcon: S
        } = da(e, t);
        let {listCache: B} = da(e, t);
        u(s, ((t, a) => {
            t !== a && T(e.list)
        }));
        const T = t => {
            if (e.group) {
                const e = [];
                t.forEach((t => {
                    var a;
                    t.isSelect = !1;
                    const l = n({}, t);
                    delete l.children, e.push(l), (null == (a = t.children) ? void 0 : a.length) > 0 && t.children.forEach((t => {
                        e.push(t)
                    }))
                })), o.value = e
            } else e.keyValue || t.forEach((e => {
                e.isSelect = !1, e.id = ct()
            })), e.keyValue && t.forEach((t => {
                t.isSelect = !1, t[e.keyValue || "id"] || (t[e.keyValue || "id"] = ct())
            })), o.value = t;
            B = ut(o.value)
        }, P = a => {
            vt(a) ? t.emit("update:modelValue", a) : t.emit("update:modelValue", a[e.labelValue])
        }, E = () => {
            o.value.map((e => e.isSelect = !1))
        }, M = () => {
            if (e.extend && !e.group) return L("div", {class: "\n                        be-select-option__extend"}, [L(z("be-input"), {
                value: h.value,
                onInput: g
            }, null), L(z("be-icon"), {icon: "add", onClick: w}, null)])
        }, I = (a, l) => {
            const n = e.searchFunc ? e.searchFunc(a, l, e.labelValue) : ((e, t, a) => {
                const l = e ? t.filter((t => t[a].toString().toLowerCase().indexOf(e.toLowerCase()) >= 0)) : t;
                return l.length > 0 ? l : t
            })(a, l, e.labelValue);
            e.sortFunc && n.sort(e.sortFunc), t.emit("search", n), o.value = n
        }, G = t => {
            const l = t.target;
            P(l.value);
            const o = a.refs.beSelectPopover;
            if (e.remote && gt(e.remoteFunc) && e.remoteFunc) {
                return dt((function () {
                    l.value ? (o.changeDisplay(!0), v.value = !0, e.remoteFunc && e.remoteFunc((e => {
                        v.value = !1, T(e), I(l.value, B)
                    }))) : o.close()
                }), 300).call(this)
            }
            I(l.value, B)
        };
        m((() => {
            T(e.list), y()
        }));
        const N = () => {
            const l = (null == e ? void 0 : e.keyValue) || "id", n = [];
            return o.value.forEach(((o, s) => {
                e.modelValue === o[e.labelValue] && (o.isSelect = !0), n.push(L("div", {
                    class: `\n                        ellipsis\n                        ${"group" === o.type && 0 !== s ? "be-select-option__line" : ""}\n                        ${o.isSelect ? "be-select-option__choice" : ""}\n                        ${"group" === o.type ? "be-select-option__group" : "be-select-option"}\n                        ${o.disabled ? "be-select-option__disabled" : ""}`,
                    key: o[l],
                    onClick: () => {
                        o.disabled || "group" === o.type || ((e, l) => {
                            E(), P(e), t.emit("select", e, l), a.refs.beSelectPopover.close()
                        })(o, s)
                    }
                }, [a.slots.default ? a.slots.default(o, s) : o[e.labelValue]]))
            })), n
        };
        return () => L("div", {id: `be_select-${l}`, class: "be-select"}, [L(z("be-popover"), {
            onUpdate: C,
            trigger: p.value,
            placement: "bottom",
            ref: "beSelectPopover",
            "trigger-elm": `be_select-${l}`,
            "custom-class": "be-select-popover"
        }, {
            default: L("div", {
                style: c,
                class: "be-select-option-body"
            }, [L("div", {
                class: "\n                                    be-select-option-container \n                                    scroll-diy \n                                    " + (v.value ? "be-select-loading " : ""),
                id: `be_select_option_container_${l}`
            }, [v.value ? L(z("be-icon"), {
                icon: "loading",
                spin: !0,
                width: "25",
                height: "25",
                fill: "#606266"
            }, null) : N()]), M()]),
            trigger: L("div", {
                class: `be-select-body ${V.value} ${e.customClass}`,
                id: `be-select-body${l}`,
                style: {cursor: r},
                tabindex: "0",
                onMouseenter: e => x(e),
                onMouseleave: e => b(e),
                onFocus: e => D(e),
                onBlur: e => k(e)
            }, [L("input", {
                readonly: i.value,
                tabindex: "-1",
                onFocus: f,
                value: e.modelValue,
                placeholder: e.placeholder,
                disabled: e.disabled,
                onInput: e => G(e),
                style: {cursor: r},
                class: `be-select-input be-select-input__${e.size}`
            }, null), L(z("be-icon"), {
                icon: d.value, onClick: a => {
                    "error" === d.value && (P(""), t.emit("clear"), S(e.selectIcon), o.value = B, E(), a.stopPropagation())
                }, class: "be-select-icon"
            }, null)])
        })])
    }
}), ua = i({
    name: "BePagination",
    components: {Pager: aa, BeSelect: pa},
    props: {
        pageSize: {type: Number, default: 5, validator: e => !(e <= 0)},
        currentPage: {type: Number, default: 1, validator: e => !(e <= 0)},
        pageCount: {type: Number},
        disabled: Boolean,
        disabledJump: Boolean,
        pagerShowCount: {type: Number, validator: e => e > 2},
        pageNum: {type: Array, default: () => [{label: 100}, {label: 200}, {label: 300}, {label: 400}]},
        layout: {type: Array, default: () => ["prev", "page", "jump", "info", "next", "pNum"]},
        isOrdianry: {type: Boolean, default: !0},
        isDynamic: {type: Boolean, default: !1},
        isFront: {type: Boolean, default: !1},
        pageData: {type: Array, default: () => []},
        pageUnit: {type: String, default: "/页"}
    },
    emits: ["updateNum", "updatePage", "changePage"],
    setup(e, t) {
        const a = r();
        let l = d({maxPageNum: 0});
        const o = c(""), n = t => {
            if ("Enter" === t.key && null !== t.target) {
                const o = e.pageCount ? e.pageCount : 0, n = Math.ceil(o / Number(e.pageSize)),
                    s = e.isFront ? l.maxPageNum : n, i = t.target.value;
                /^\d+$/.test(i) && Number(i) <= s ? (e => {
                    a.refs.pager.onPagerClick(null, e)
                })(i) : t.target.value = ""
            }
        }, s = c(""), i = a => {
            const o = e.pageCount ? e.pageCount : 0, n = Math.ceil(o / Number(a.label)),
                i = e.isFront ? l.maxPageNum : n;
            s.value = a.label + e.pageUnit, t.emit("updateNum", {
                pageSize: a.label,
                currentPage: e.currentPage > i ? i : e.currentPage
            })
        }, p = c(e.pageNum);
        m((() => {
            s.value = e.pageSize + e.pageUnit, p.value = e.pageNum, p.value.unshift({label: e.pageSize})
        }));
        const u = e => {
            t.emit("updatePage", e)
        }, v = e => {
            l = e
        }, h = e => {
            t.emit("changePage", e)
        }, g = () => {
            if (e.isDynamic) return;
            const t = e.pageCount ? e.pageCount : 0, a = Math.ceil(t / Number(e.pageSize)),
                o = e.isFront ? l.maxPageNum : a;
            return L("span", {class: "be-pager-info"}, [H("第"), e.currentPage > o ? o : e.currentPage, H("页/共"), o, H("页")])
        }, w = () => {
            const t = !!e.disabled || !!e.disabledJump;
            return L("div", {class: "be-pager-jump"}, [H("跳至"), L("input", {
                disabled: t,
                class: "be-pager-jump-input",
                type: "text",
                value: o.value,
                onKeyup: n
            }, null), H("页")])
        };
        U("$$BePaginProps", e);
        const f = d({jumpPage: o.value, pageParamsFront: l, pageNumVal: s.value});
        return U("$$BePaginMix", f), () => {
            const t = {onUpdatePage: u, onChangePage: h, onGetPageCount: v}, l = a.slots.next ? a.slots.next : () => {
            }, o = a.slots.prev ? a.slots.prev : () => {
            }, n = {
                page: L(aa, I({ref: "pager"}, t), null),
                jump: w.call(this),
                info: g.call(this),
                next: l(),
                prev: o(),
                pNum: void 0
            };
            return e.isDynamic || (n.pNum = L(z("be-select"), {
                modelValue: s.value,
                "onUpdate:modelValue": e => s.value = e,
                keyValue: "id",
                disabled: e.disabled,
                labelValue: "label",
                "custom-class": "be-pager-select",
                list: p.value,
                onSelect: i
            }, null)), L("div", {class: "be-pager-container"}, [e.layout.map((e => Object(n)[e]))])
        }
    }
});
ua.install = e => {
    e.component(ua.name, ua)
};
const ma = ua;
let va;
const ha = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing"];

function ga(e, t = 1, a = null) {
    var l;
    va || (va = document.createElement("textarea"), document.body.appendChild(va));
    const {paddingSize: o, borderSize: n, boxSizing: s, contextStyle: i} = function (e) {
        const t = window.getComputedStyle(e), a = t.getPropertyValue("box-sizing"),
            l = parseFloat(t.getPropertyValue("padding-bottom")) + parseFloat(t.getPropertyValue("padding-top")),
            o = parseFloat(t.getPropertyValue("border-bottom-width")) + parseFloat(t.getPropertyValue("border-top-width"));
        return {
            contextStyle: ha.map((e => `${e}:${t.getPropertyValue(e)}`)).join(";"),
            paddingSize: l,
            borderSize: o,
            boxSizing: a
        }
    }(e);
    va.setAttribute("style", `${i};\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important;\n`), va.value = e.value || e.placeholder || "";
    let r = va.scrollHeight;
    const c = {};
    "border-box" === s ? r += n : "content-box" === s && (r -= o), va.value = "";
    const d = function (e, t) {
        return e - t
    }(va.scrollHeight, o);
    if (null !== t) {
        const e = function (e, t, a, l, o, n) {
            let s = t * a;
            return "border-box" === l && (s = s + o + n), s
        }(0, d, t, s, o, n);
        c.minHeight = `${e}px`
    }
    return null !== a && (r = function (e, t, a, l, o, n) {
        if (!a) return;
        let s = t * a;
        return "border-box" === l && (s = s + o + n), Math.min(s, e)
    }(r, d, a, s, o, n) || r), c.height = `${r}px`, null == (l = va.parentNode) || l.removeChild(va), va = null, c
}

var wa = i({
    name: "BeInput",
    components: {BeIcon: Vt},
    props: {
        id: String,
        modelValue: {type: [String, Number], default: ""},
        customClass: {type: String, default: ""},
        maxlength: {type: Number, default: null},
        placeholder: String,
        disabled: Boolean,
        clearable: {type: Boolean, default: !1},
        type: {type: String, default: "text"},
        showPassword: {type: Boolean, default: !1},
        size: {type: String, default: "medium"},
        prevIcon: {type: String, default: ""},
        nextIcon: {type: String, default: ""},
        label: {type: String},
        tabindex: {type: [Number, String]},
        inputStyle: {type: Object},
        rows: {type: Number, default: 3},
        autosize: {type: [Boolean, Object], default: !1},
        isInner: {type: Boolean, default: !1}
    },
    emits: ["prevIconClick", "nextIconClick", "update:modelValue", "input", "change", "clear", "focus", "blur", "keydown", "mouseleave", "mouseenter"],
    setup(e, t) {
        const a = N(), l = r(), o = c(e.type), s = c("password" === e.type), i = e => {
            t.emit("update:modelValue", e), t.emit("input", e)
        }, h = c("");
        let g = c(!1);
        const w = c({}), f = () => {
            const {autosize: t} = e;
            if ("textarea" === o.value) if (t) {
                const e = rt(t) ? t.minRows : void 0, a = rt(t) ? t.maxRows : void 0;
                w.value = n({}, ga(C, e, a))
            } else w.value = {minHeight: ga(C, e.rows).minHeight}
        }, y = p((() => n(n({}, e.inputStyle), w.value)));
        u((() => e.modelValue), (() => {
            v(f)
        }));
        const b = c(null);
        let x = null, C = null;
        v((() => {
            x = l.refs.beInputInner && d(l.refs.beInputInner), C = l.refs.beInputAreaInner && d(l.refs.beInputAreaInner), b.value = "textarea" === o.value ? C : x
        }));
        const k = p((() => b.value));
        return m((() => {
            v(f)
        })), {
            isFocusClass: h,
            uid: l.uid,
            attrs: a,
            beInputInner: b,
            inputOrTextarea: k,
            inputType: o,
            isPassWord: s,
            computedTextareaStyle: y,
            focus: () => {
                v((() => {
                    k.value.focus()
                }))
            },
            select: () => {
                k.value.select()
            },
            handleKeydown: e => {
                t.emit("keydown", e)
            },
            blur: () => {
                k.value.blur()
            },
            showClearIcon: g,
            handleChange: e => {
                const a = e.target;
                t.emit("change", a.value)
            },
            handlePassword: () => {
                s.value = !s.value, s.value ? o.value = e.type : o.value = "text"
            },
            handleInput: i,
            handleIcon: e => {
                "prev" === e ? t.emit("prevIconClick") : t.emit("nextIconClick")
            },
            handleClear: () => {
                i(""), t.emit("clear")
            },
            handleFocus: (e, a) => {
                h.value = "be-input__focus", t.emit("focus", e, a)
            },
            handleBlur: (e, a) => {
                h.value = "", t.emit("blur", e, a)
            },
            handleEnter: a => {
                "noInputElm" !== a && t.emit("mouseenter"), e.clearable && "noInputElm" === a && (g.value = !0)
            },
            handleLeave: a => {
                "noInputElm" !== a && t.emit("mouseleave"), e.clearable && "noInputElm" === a && (g.value = !1)
            }
        }
    }
});
const fa = ["id"], ya = ["id", "disabled", "placeholder", "value", "maxlength", "tabindex", "aria-label", "type"],
    ba = {key: 2, class: "be-input-close-body"}, xa = {class: "be-input-close-body"},
    Ca = {key: 1, class: "be-input-body"}, ka = ["tabindex", "aria-label", "value", "disabled", "placeholder"];
wa.render = function (e, t, a, l, o, n) {
    const s = z("be-icon");
    return w(), f("div", {
        id: `be_input_${e.uid}`,
        class: D(`\n        be-input\n        be-input__${e.size}\n        ${e.isFocusClass}\n        ${e.disabled ? "be-input__disabled " : ""}\n        ${"textarea" === e.inputType ? "be-input__textarea" : ""}\n        ${e.customClass}`)
    }, [x(e.$slots, "prev"), "textarea" !== e.inputType ? (w(), f("div", {
        key: 0,
        class: "be-input-body",
        onMouseenter: t[9] || (t[9] = t => e.handleEnter("noInputElm")),
        onMouseleave: t[10] || (t[10] = t => e.handleLeave("noInputElm"))
    }, [e.prevIcon ? (w(), C(s, {
        key: 0,
        icon: e.prevIcon,
        class: "be-input-prevIcon",
        onClick: t[0] || (t[0] = t => e.handleIcon("prev"))
    }, null, 8, ["icon"])) : P("", !0), b("input", I({
        id: e.id,
        ref: "beInputInner",
        disabled: e.disabled,
        placeholder: e.placeholder,
        value: e.modelValue,
        maxlength: e.maxlength,
        tabindex: e.tabindex,
        "aria-label": e.label,
        type: e.inputType,
        style: e.computedTextareaStyle
    }, e.attrs, {
        class: "be-input__inner " + (e.disabled ? "be-input__disabled" : ""),
        onFocus: t[1] || (t[1] = t => e.handleFocus(t.target.value, t)),
        onBlur: t[2] || (t[2] = t => e.handleBlur(t.target.value, t)),
        onChange: t[3] || (t[3] = (...t) => e.handleChange && e.handleChange(...t)),
        onKeydown: t[4] || (t[4] = (...t) => e.handleKeydown && e.handleKeydown(...t)),
        onMouseenter: t[5] || (t[5] = (...t) => e.handleEnter && e.handleEnter(...t)),
        onMouseleave: t[6] || (t[6] = (...t) => e.handleLeave && e.handleLeave(...t)),
        onInput: t[7] || (t[7] = t => e.handleInput(t.target.value))
    }), null, 16, ya), e.nextIcon ? (w(), C(s, {
        key: 1,
        icon: e.nextIcon,
        class: "be-input-nextIcon",
        onClick: t[8] || (t[8] = t => e.handleIcon("next"))
    }, null, 8, ["icon"])) : P("", !0), !e.isInner && e.showClearIcon ? (w(), f("div", ba, [L(s, {
        icon: "deleteIc",
        class: "be-input-icon be-input-close",
        onClick: e.handleClear
    }, null, 8, ["onClick"])])) : P("", !0), B(b("div", xa, [L(s, {
        icon: "" + (e.isPassWord ? "noEye" : "eye"),
        class: "be-input-icon be-input-password",
        onClick: e.handlePassword
    }, null, 8, ["icon", "onClick"])], 512), [[W, e.showPassword]])], 32)) : P("", !0), x(e.$slots, "next"), "textarea" === e.inputType ? (w(), f("div", Ca, [b("textarea", I({
        ref: "beInputAreaInner",
        class: "be-input__textarea__inner"
    }, e.attrs, {
        tabindex: e.tabindex,
        "aria-label": e.label,
        value: e.modelValue,
        style: e.computedTextareaStyle,
        disabled: e.disabled,
        placeholder: e.placeholder,
        onFocus: t[11] || (t[11] = t => e.handleFocus(t.target.value, t)),
        onBlur: t[12] || (t[12] = t => e.handleBlur(t.target.value, t)),
        onChange: t[13] || (t[13] = (...t) => e.handleChange && e.handleChange(...t)),
        onKeydown: t[14] || (t[14] = (...t) => e.handleKeydown && e.handleKeydown(...t)),
        onInput: t[15] || (t[15] = t => e.handleInput(t.target.value))
    }), "\r\n      ", 16, ka)])) : P("", !0)], 10, fa)
}, wa.install = e => {
    e.component(wa.name, wa)
};
const Da = wa;
var La = i({
    name: "BeAutocomplete",
    components: {BeInputSelect: oa, BeInput: wa, BePopover: wt},
    props: {
        modelValue: {type: [String, Number, Object], default: ""},
        focusTrigger: {type: Boolean, default: !0},
        suggestionList: {type: Array, default: () => []},
        labelValue: {type: String, default: "label"},
        keyValue: {type: String, default: "id"},
        fetchSuggestions: {type: Function}
    },
    emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "prevIconClick", "nextIconClick", "select"],
    setup(e, t) {
        const a = N(), l = r(), o = c(""), n = () => {
            t.emit("change", o.value)
        };
        let s = null;
        let i = d({width: "0px"}), h = c(e.suggestionList);
        const g = e => {
            e && (i.width = Number(window.getComputedStyle(e).width.split("px")[0]) + "px")
        }, w = (t, a) => {
            v((() => {
                h.value = t ? a.filter((a => a[e.labelValue].toString().toLowerCase().indexOf(t.toLowerCase()) >= 0)) : a
            }))
        }, f = () => {
            l.refs.beInputPopover.changeDisplay(!0)
        };
        let y = [];
        const b = c(!1), x = (t = (() => {
        })) => {
            v((() => {
                e.fetchSuggestions && (b.value = !0, e.fetchSuggestions((e => {
                    h.value = ut(e), y = ut(e), t && t(y), b.value = !1
                })))
            }))
        }, C = p((() => e.modelValue));
        u(C, (t => {
            vt(t) && (o.value = t), rt(t) && (o.value = Object(t[e.labelValue]))
        }));
        return m((() => {
            var t;
            t = e.modelValue, vt(t) && (o.value = t), rt(t) && (o.value = Object(t[e.labelValue]));
            g(s)
        })), {
            loading: b, selectList: h, handleSelect: (a, s) => {
                o.value = a[e.labelValue], t.emit("update:modelValue", a), n(), t.emit("select", a, s);
                l.refs.beInputPopover.close(), y = []
            }, selectStyle: i, uid: l.uid, attrs: a, valInner: o, handleChange: n, handleInput: () => {
                let a = e.suggestionList.length > 0 ? e.suggestionList : y;
                e.focusTrigger ? w(o.value, a) : e.fetchSuggestions ? x((e => {
                    w(o.value, e), f()
                })) : (w(o.value, a), f()), t.emit("update:modelValue", o.value), t.emit("input", o.value)
            }, handleBlur: () => {
                t.emit("blur", o.value)
            }, handleFocus: (a, l) => {
                const n = l.target.parentElement;
                s = n, g(n), t.emit("focus", o.value), e.fetchSuggestions && e.focusTrigger && x()
            }, handleIconClickPrev: () => {
                t.emit("prevIconClick")
            }, handleIconClickNext: () => {
                t.emit("nextIconClick")
            }, handleClear: () => {
                t.emit("clear")
            }
        }
    }
});
La.render = function (e, t, a, l, o, n) {
    const s = z("be-input"), i = z("be-input-select"), r = z("be-popover");
    return w(), C(r, {
        ref: "beInputPopover",
        trigger: e.focusTrigger ? "click" : "none",
        placement: "bottom",
        "trigger-elm": `be_input_select_inner_${e.uid}`,
        "custom-class": "be-input-select-popover"
    }, {
        trigger: S((() => [L(s, I({id: `be_input_select_inner_${e.uid}`}, e.attrs, {
            ref: "beInputInner",
            modelValue: e.valInner,
            "onUpdate:modelValue": t[0] || (t[0] = t => e.valInner = t),
            onChange: e.handleChange,
            onInput: e.handleInput,
            onFocus: e.handleFocus,
            onBlur: e.handleBlur,
            onClear: e.handleClear,
            onPrevIconClick: e.handleIconClickPrev,
            onNextIconClick: e.handleIconClickNext
        }), {
            prev: S((() => [x(e.$slots, "prev")])),
            next: S((() => [x(e.$slots, "next")])),
            _: 3
        }, 16, ["id", "modelValue", "onChange", "onInput", "onFocus", "onBlur", "onClear", "onPrevIconClick", "onNextIconClick"])])),
        default: S((() => [L(V, {name: "dialog-fade"}, {
            default: S((() => [L(i, {
                loading: e.loading,
                "key-value": e.keyValue,
                "label-value": e.labelValue,
                "select-style": e.selectStyle,
                "select-list": e.selectList,
                onSelect: e.handleSelect
            }, {
                "cus-temp": S((t => [x(e.$slots, "cus-temp", {item: t.item})])),
                _: 3
            }, 8, ["loading", "key-value", "label-value", "select-style", "select-list", "onSelect"])])), _: 3
        })])),
        _: 3
    }, 8, ["trigger", "trigger-elm"])
}, La.install = e => {
    e.component(La.name, La)
};
const Va = La;
var Sa = i({
    name: "BeTag",
    components: {BeIcon: Vt},
    props: {
        size: {type: String, default: "medium"},
        type: {type: String, default: "default"},
        disabled: {type: Boolean, default: !1},
        round: {type: [Number, String], default: 0},
        isClose: {type: Boolean, default: !1},
        option: {type: Object, default: () => ({})},
        customClass: {type: String, default: ""}
    },
    emits: ["close"],
    setup(e, t) {
        var a, l, o;
        let n = d({});
        return n = {
            borderRadius: `${e.round}px`,
            backgroundColor: (null == (a = e.option) ? void 0 : a.backgroundColor) || "",
            border: (null == (l = e.option) ? void 0 : l.border) || "",
            color: (null == (o = e.option) ? void 0 : o.color) || ""
        }, {
            handleClose: a => {
                a.stopPropagation(), e.disabled || t.emit("close", a)
            }, styleOption: n
        }
    }
});
Sa.render = function (e, t, a, l, o, n) {
    var s, i;
    const r = z("be-icon");
    return w(), f("div", {
        style: T(e.styleOption),
        class: D(`\n  be-tag\n  be-tag__${e.disabled ? "disabled" : ""}\n  be-tag__${e.type}\n  be-tag__${e.size}\n  ${e.customClass}\n  `)
    }, [b("span", {style: T({color: null == (s = e.styleOption) ? void 0 : s.color})}, [x(e.$slots, "default")], 4), e.isClose ? (w(), C(r, {
        key: 0,
        icon: "deleteIc",
        class: "be-tag_close",
        style: T({fill: null == (i = e.styleOption) ? void 0 : i.color}),
        onClick: t[0] || (t[0] = t => e.handleClose(t))
    }, null, 8, ["style"])) : P("", !0)], 6)
};
const Ba = Sa;
Ba.install = e => {
    e.component(Ba.name || "", Ba)
};
const Ta = Ba;
var Pa = i({
    name: "BeInputNumber",
    components: {beInput: Da, beIcon: zt},
    props: {
        modelValue: {type: [String, Number], default: ""},
        size: {type: String, default: "medium"},
        disabled: {type: Boolean, default: !1},
        keyboard: {type: Boolean, default: !1},
        parser: {type: Function, default: e => e},
        formatter: {type: Function, default: e => e},
        max: {type: [String, Number], default: ""},
        min: {type: [String, Number], default: ""},
        step: {type: Number, default: 1}
    },
    emits: ["update:modelValue", "change", "blur", "focus", "select", "step", "pressEnter"],
    setup(e, t) {
        const a = r(), l = a.uid, o = N(), n = c(1), s = c(""), i = e => {
            t.emit("update:modelValue", e)
        }, h = t => {
            if (!t) return {val: t, type: ""};
            const a = Number(t), l = "" !== e.max ? Number(e.max) : null, o = "" !== e.min ? Number(e.min) : null;
            return l && o && o <= a && a <= l && l && o || !l && !o || o && a >= o && !l || l && a <= l && !o ? {
                val: a,
                type: ""
            } : o && a < o ? {val: o, type: "limit"} : l && a > l ? {val: l, type: "limit"} : void 0
        }, g = () => {
            if (e.disabled) return;
            const a = (e => {
                let t = 0;
                const a = (e => {
                    let t = 0;
                    return e.forEach((e => {
                        const a = e.toString(), l = a.indexOf(".");
                        if (l > -1) {
                            const e = a.length - 1 - l;
                            e > t && (t = e)
                        }
                    })), t
                })(e);
                return e.forEach(((e, l) => {
                    const o = Math.round(e * Math.pow(10, a));
                    0 === l ? t = o : t -= o
                })), t / Math.pow(10, a)
            })([Number(e.modelValue), Number(e.step)]);
            i(h(a).val), t.emit("step", {value: a, type: "reduce"})
        }, w = () => {
            if (e.disabled) return;
            const a = ((e, t) => {
                let a, l, o = 0;
                try {
                    a = e.toString().split(".")[1].length
                } catch (n) {
                    a = 0
                }
                try {
                    l = t.toString().split(".")[1].length
                } catch (n) {
                    l = 0
                }
                return o = Math.pow(10, Math.max(a, l)), (e * o + t * o) / o
            })(Number(e.modelValue), Number(e.step));
            i(h(a).val), t.emit("step", {value: a, type: "increase"})
        }, f = c(null);
        v((() => {
            f.value = a.refs[`beInputInner${l}`] && d(a.refs[`beInputInner${l}`])
        }));
        const y = p((() => f.value)), b = p((() => e.modelValue));
        u(b, (t => {
            t && (s.value = e.formatter(t))
        }));
        const x = p((() => h(e.modelValue).type));
        return m((() => {
            (e.modelValue && pt(e.modelValue.toString()) || 0 === e.modelValue) && (s.value = e.formatter(e.modelValue))
        })), {
            uid: l,
            attrs: o,
            inputInnerVal: s,
            showLimit: x,
            tabindex: n,
            blur: () => {
                y.value.blur(), t.emit("blur")
            },
            select: () => {
                y.value.select(), t.emit("select")
            },
            focus: () => {
                v((() => {
                    y.value.focus(), t.emit("focus")
                }))
            },
            handleFocus: e => {
                t.emit("focus", e), n.value = -1
            },
            handleBlur: e => {
                t.emit("blur", e), n.value = 1
            },
            handleChange: a => {
                const l = e.parser(a);
                l || (s.value = e.formatter(l)), t.emit("change", l)
            },
            renderPreSlot: () => a.slots.pre ? L("div", {class: "be-input-number__pre"}, [a.slots.pre()]) : "",
            handleInput: t => {
                let a = e.parser(t), l = !1;
                a.split(".").forEach((e => {
                    e || (l = !0)
                })), l || pt(a) || (a = ""), s.value = "", v((() => {
                    if (l) s.value = e.formatter(a); else {
                        const t = h(a).val;
                        s.value = e.formatter(t), i(t)
                    }
                }))
            },
            handleIncrease: w,
            handleReduce: g,
            renderNextSlot: () => a.slots.next ? L("div", {class: "be-input-number__next"}, [a.slots.next()]) : "",
            handleKeyDown: a => {
                e.keyboard && ("ArrowUp" === a.key && w(), "ArrowDown" === a.key && g(), "Enter" === a.key && t.emit("pressEnter", e.modelValue))
            }
        }
    },
    render() {
        return L("div", {
            class: "\n                     be-input-number \n                     " + (this.disabled ? "be-input-number__disabled " : ""),
            id: `be_input_number${this.uid}`,
            onFocus: e => this.handleFocus(e),
            onBlur: e => this.handleBlur(e),
            onKeydown: e => this.handleKeyDown(e),
            tabindex: "0"
        }, [this.renderPreSlot(), L("div", {class: `be-input-number__${this.size} be-input-number__default`}, [L(z("be-input"), I({
            tabindex: this.tabindex,
            ref: `beInputInner${this.uid}`
        }, this.attrs, {
            size: this.size,
            isInner: !0,
            onChange: this.handleChange,
            disabled: this.disabled,
            onFocus: (e, t) => this.handleFocus(t),
            onBlur: e => this.handleBlur(e),
            "custom-class": `be-input-number__inner be-input-number__${this.showLimit}`,
            value: this.inputInnerVal,
            onInput: this.handleInput
        }), null), L("div", {
            class: "\n                         be-input-number__op \n                         " + (this.disabled ? "be-input-number__op__disabled " : ""),
            onBlur: e => this.handleBlur(e),
            onFocus: e => this.handleFocus(e),
            tabindex: "1"
        }, [L(z("be-icon"), {
            icon: "up",
            class: "be-input-number__up",
            tabindex: "2",
            onClick: this.handleIncrease,
            className: "be-input-number__up"
        }, null), L(z("be-icon"), {
            icon: "under",
            class: "be-input-number__down",
            tabindex: "2",
            onClick: this.handleReduce
        }, null)])]), this.renderNextSlot()])
    }
});
Pa.install = e => {
    e.component(Pa.name, Pa)
};
const za = Pa;
var Ea = i({
    name: "BeSelectMultiple",
    components: {BeInputSelect: oa, BePopover: wt, BeIcon: Vt, BeTag: Sa},
    props: {
        disabled: {type: Boolean, default: !1},
        size: {type: String, default: "medium"},
        list: {type: Array, default: () => []},
        modelValue: {type: Array, default: () => []},
        labelValue: {type: String, default: "label"},
        keyValue: {type: String},
        placeholder: {type: String, default: "请选择"},
        clear: {type: Boolean, default: !1},
        selectIcon: {type: String, default: "under"},
        group: {type: Boolean, default: !1},
        extend: {type: Boolean, default: !1},
        search: {type: Boolean, default: !1},
        searchFunc: {type: Function},
        sortFunc: {type: Function},
        remote: {type: Boolean, default: !1},
        remoteFunc: {type: Function},
        customClass: {type: String, default: ""},
        maxTag: {type: String},
        max: {type: String}
    },
    emits: ["update:modelValue", "select", "focus", "blur", "openChange", "clear", "search", "MouseEnter", "MouseLeave", "scroll", "closeTag", "Deselect", "change"],
    setup(e, t) {
        const {
            focusClass: a,
            internalInstance: l,
            uid: o,
            dataList: s,
            list: i,
            readonlyInput: r,
            cursor: d,
            selectStyle: p,
            iconType: v,
            trigger: h,
            loading: g,
            addItemList: w,
            addItem: f,
            handleInput: y,
            addItemToList: b,
            computedPosition: x,
            updatePopover: C,
            addScrollEvt: k,
            handleMouseLeave: D,
            handleMouseEnter: V,
            selectOpenChange: S,
            handleBlur: B,
            handleFocus: T,
            changeIcon: P
        } = da(e, t);
        let {listCache: E} = da(e, t);
        u(i, ((t, a) => {
            t !== a && M(e.list)
        }));
        const M = t => {
            const a = ut(t);
            if (e.group) {
                const e = [];
                a.forEach((t => {
                    var a;
                    t.isSelect = !1;
                    const l = n({}, t);
                    delete l.children, e.push(l), (null == (a = t.children) ? void 0 : a.length) > 0 && t.children.forEach((t => {
                        e.push(t)
                    }))
                })), s.value = e
            } else e.keyValue || a.forEach((e => {
                e.isSelect = !1, e.id = ct()
            })), e.keyValue && a.forEach((t => {
                t.isSelect = !1, t[e.keyValue || "id"] || (t[e.keyValue || "id"] = ct())
            })), s.value = a;
            E = ut(s.value)
        }, I = () => {
            if (e.extend && !e.group) return L("div", {class: "\n                        be-select-option__extend"}, [L(z("be-input"), {
                value: f.value,
                onInput: y
            }, null), L(z("be-icon"), {icon: "add", onClick: b}, null)])
        }, G = (a, l) => {
            if (_.value.length >= Number(e.max) && e.max) return;
            const o = ut(a), n = ut(l);
            let i = [];
            if (o) {
                const a = o.indexOf(",") >= 0;
                a && (H.value = "");
                let l = o.split(",").filter((e => e));
                l = Array.from(new Set(l));
                const r = _.value.map((e => e.label));
                l = [...new Set([...r, ...l])];
                let c = [];
                const d = [];
                l.forEach((e => {
                    const t = ((e, t, a) => {
                        const l = e ? t.filter((t => t[a].toString().toLowerCase().indexOf(e.toLowerCase()) >= 0)) : t;
                        return {data: l.length > 0 ? ut(l) : ut(t), isHas: l.length > 0}
                    })(e, n, $), l = {};
                    if (l[$] = e, t.isHas) {
                        if (a) {
                            let t = !1;
                            s.value.forEach((a => {
                                e === a[$] && (t = !0, F.has(a[A]) || F.set(a[A], a))
                            })), t || (l.isAutoAdd = !0, l[A] = ct(), F.set(l[A], l), d.push(l), n.push(l)), W()
                        }
                        c = ((e, t) => {
                            const a = {};
                            return e.reduce(((e, l) => (!a[l[t]] && (a[l[t]] = e.push(l)), e)), [])
                        })([...t.data, ...c], A)
                    } else l[A] = ct(), a && (l.isAutoAdd = !0, F.set(l[A], l), W(), w.value.push(l)), l.isAutoAdd = !0, d.push(l), n.push(l)
                })), i = c.concat(d), e.sortFunc && i.sort(e.sortFunc), t.emit("search", i), s.value = a ? n : i
            } else s.value = ut(l);
            _.value.forEach((e => {
                U(!0, e[A])
            }))
        }, N = a => {
            const o = a.target;
            H.value = o.value, O.value = Y(o.value), C(), t.emit("change", o);
            const n = l.refs.beSelectPopover;
            if (e.remote && gt(e.remoteFunc) && e.remoteFunc) {
                return dt((function () {
                    o.value ? (n.changeDisplay(!0), g.value = !0, e.remoteFunc && e.remoteFunc((e => {
                        g.value = !1, M(e), G(o.value, E)
                    }))) : n.close()
                }), 300).call(this)
            }
            G(o.value, E.concat(w.value))
        }, _ = c([]), H = c(""), O = c(0), $ = e.labelValue || "label", A = e.keyValue || "id";
        let F = new Map;
        const W = () => {
            const e = ut((a = F, Array.from(a)));
            var a;
            _.value = e, t.emit("update:modelValue", e)
        }, U = (e, t) => {
            s.value.forEach((a => {
                a[A] === t && (a.isSelect = e)
            }))
        }, Y = e => {
            const t = document.createElement("a");
            t.innerHTML = e;
            const a = document.getElementsByTagName("body")[0];
            a.appendChild(t);
            const l = t.offsetWidth;
            return a.removeChild(t), l
        };
        m((() => {
            M(e.list), k(), _.value = e.modelValue, _.value.forEach((e => {
                e.isSelect = !0, F.set(e[A], e), U(!0, e[A])
            }))
        }));
        const R = () => {
            var a;
            if (!_.value || 0 === (null == (a = _.value) ? void 0 : a.length)) return;
            let o = ut(_.value);
            if (e.maxTag && _.value.length > Number(e.maxTag)) {
                o = o.slice(0, Number(e.maxTag));
                const t = {};
                t[A] = ct(), t[$] = "+" + (_.value.length - Number(e.maxTag)), t.isNum = !0, o.push(t)
            }
            const n = [];
            return o.forEach(((e, a) => {
                n.push(L("div", {class: "be-select-tag"}, [l.slots.tag ? l.slots.tag({
                    data: e,
                    index: a
                }) : L(z("be-tag"), {
                    key: e.label + "tag",
                    isClose: !0,
                    type: "info",
                    size: "mini",
                    customClass: "ellipsis",
                    onClose: () => (e => {
                        const a = e.isNum ? _.value.pop() : e;
                        F.delete(a[A]), U(!1, a[A]), a.isAutoAdd && (w.value = w.value.filter((e => e[A] !== a[A])), s.value = E.concat(w.value)), W(), C(), t.emit("closeTag", a)
                    })(e)
                }, {default: () => [e[$]]})]))
            })), n
        }, j = () => {
            const a = (null == e ? void 0 : e.keyValue) || "id", o = [];
            return s.value.forEach(((n, i) => {
                o.push(L("div", {
                    class: `\n                        ellipsis\n                        ${"group" === n.type && 0 !== i ? "be-select-option__line" : ""}\n                         ${n.isSelect ? "be-select-option__choice" : ""}\n                        ${"group" === n.type ? "be-select-option__group" : "be-select-option"}\n                        ${n.disabled ? "be-select-option__disabled" : ""}`,
                    key: n[a],
                    onClick: () => {
                        n.disabled || "group" === n.type || ((a, l) => {
                            if (_.value.length >= Number(e.max) && e.max) return;
                            const o = a[A];
                            F.has(o) ? (a.isAutoAdd && (w.value = w.value.filter((e => e[A] !== a[A]))), F.delete(o), a.isSelect = !1, t.emit("Deselect", a, l)) : (a.isAutoAdd && w.value.push(a), F.set(o, a), a.isSelect = !0, t.emit("select", a, l)), t.emit("change", a), H.value = "", s.value = E.concat(w.value), W(), _.value.forEach((e => {
                                U(e.isSelect, e[A])
                            })), C()
                        })(n, i)
                    }
                }, [l.slots.default ? l.slots.default({
                    data: n,
                    index: i
                }) : n[e.labelValue], n.isSelect ? L(z("be-icon"), {
                    icon: "select",
                    "custom-class": "be-select-hook"
                }, null) : ""]))
            })), o
        };
        return () => L("div", {id: `be_select-${o}`, class: "be-select"}, [L(z("be-popover"), {
            onUpdate: S,
            trigger: h.value,
            placement: "bottom",
            ref: "beSelectPopover",
            "trigger-elm": `be_select-${o}`,
            "custom-class": "be-select-popover"
        }, {
            default: L("div", {
                style: p,
                class: "be-select-option-body"
            }, [L("div", {
                class: "\n                                    be-select-option-container \n                                    scroll-diy \n                                    " + (g.value ? "be-select-loading " : ""),
                id: `be_select_option_container_${o}`
            }, [g.value ? L(z("be-icon"), {
                icon: "loading",
                spin: !0,
                width: "25",
                height: "25",
                fill: "#606266"
            }, null) : j()]), I()]),
            trigger: L("div", {
                class: `be-select-body ${a.value} ${e.customClass}`,
                id: `be-select-body${o}`,
                style: {cursor: d},
                tabindex: "0",
                onMouseenter: e => V(e),
                onMouseleave: e => D(e),
                onFocus: e => T(e),
                onBlur: e => B(e)
            }, [R(), L("input", {
                readonly: r.value,
                tabindex: "-1",
                onFocus: x,
                value: H.value,
                disabled: e.disabled,
                onInput: e => N(e),
                style: {cursor: d, width: O.value + "px"},
                class: `be-select-input be-select-input__${e.size}`
            }, null), L(z("be-icon"), {
                icon: v.value, onClick: a => {
                    "error" === v.value && (F = new Map, _.value = [], H.value = "", O.value = 0, t.emit("clear"), W(), P(e.selectIcon), s.value = E, a.stopPropagation())
                }, class: "be-select-icon"
            }, null)])
        })])
    }
});
pa.install = e => {
    e.component(pa.name, pa)
};
const Ma = pa;
Ea.install = e => {
    e.component(Ea.name, Ea)
};
const Ia = Ea;
const Ga = i({
    name: "BeSwitch",
    components: {BeIcon: Vt},
    props: {
        modelValue: {type: [Boolean, String, Number], default: ""},
        disabled: {type: Boolean, default: !1},
        size: {type: String, default: "default"},
        customClass: {type: String, default: ""},
        isLoading: {type: Boolean, default: !1},
        checkedValue: {type: [String, Boolean, Number], default: ""},
        unCheckedValue: {type: [String, Boolean, Number], default: ""}
    },
    emits: ["update:modelValue", "change", "click"],
    setup(e, t) {
        const a = c(!1), l = c(""), o = r(), n = async o => {
            e.disabled || e.isLoading || (await (() => {
                if (l.value = "be-switching", setTimeout((() => {
                    l.value = ""
                }), 500), a.value) {
                    a.value = !1;
                    const l = {
                        newVal: !!e.unCheckedValue && e.unCheckedValue,
                        oldVal: !e.checkedValue || e.checkedValue
                    };
                    t.emit("change", l), t.emit("update:modelValue", !!e.unCheckedValue && e.unCheckedValue)
                } else {
                    a.value = !0;
                    const l = {
                        newVal: !e.checkedValue || e.checkedValue,
                        oldVal: !!e.unCheckedValue && e.unCheckedValue
                    };
                    t.emit("change", l), t.emit("update:modelValue", !e.checkedValue || e.checkedValue)
                }
            })(), t.emit("click", o))
        };
        return m((() => {
            void 0 !== e.unCheckedValue && "" !== e.unCheckedValue && (mt(e.unCheckedValue) || vt(e.unCheckedValue) || ht(e.unCheckedValue)) && e.modelValue === e.unCheckedValue && (a.value = !1), void 0 !== e.checkedValue && "" !== e.checkedValue && (mt(e.checkedValue) || vt(e.checkedValue) || ht(e.checkedValue)) && e.modelValue === e.checkedValue && (a.value = !0)
        })), () => {
            const t = o.slots.unCheckedRender ? L("div", {class: `be-switch__${e.size}_slot_un_checked`}, [" ", o.slots.unCheckedRender(a.value)]) : "",
                s = o.slots.checkedRender ? L("div", {class: `be-switch__${e.size}_slot_checked`}, [o.slots.checkedRender(a.value)]) : "";
            return L("div", {
                class: `\n                        be-switch\n                        be-switch__${e.size}\n                        ${e.disabled || e.isLoading ? "be-switch__disabled" : ""}\n                        ${a.value ? "be-switch__checked" : "be-switch__unChecked"}\n                        ${l.value}\n                        ${e.customClass}\n                    `,
                tabindex: "0",
                onClick: e => n(e)
            }, [a.value ? t : "", L("div", {class: "be-switch-circle"}, [e.isLoading ? L(z("be-icon"), {
                spin: !0,
                icon: "loading",
                customClass: "be-switch-circle-icon"
            }, null) : ""]), a.value ? "" : s])
        }
    }
});
Ga.install = e => {
    e.component(Ga.name || "", Ga)
};
const Na = Ga;
var _a = i({
    name: "BeBreadcrumb", setup() {
        const e = r(), t = e.slots.default ? e.slots.default() : [];
        return t.length > 0 && "BeBreadcrumbItem" === t[t.length - 1].type.name && (t[t.length - 1].beBreadcrumbIndex = "last"), () => L("div", {
            class: "be-breadcrumb",
            "aria-label": "BeBreadcrumb"
        }, [t])
    }
});
const Ha = "undefined" != typeof window ? window : null;
var Oa = i({
    name: "BeBreadcrumbItem",
    components: {"be-popover": Mt},
    props: {
        separator: {type: String, default: "/"},
        option: {type: Array, default: () => []},
        to: {type: String},
        disabled: {type: Boolean, default: !1},
        click: {type: Function},
        clickOption: {type: Function}
    },
    setup(e) {
        const t = r(), a = t.uid, l = ((e = Ha) => {
                const t = () => {
                    const {
                        hash: t,
                        host: a,
                        hostname: l,
                        href: o,
                        origin: n,
                        pathname: s,
                        port: i,
                        protocol: r,
                        search: c
                    } = (null == e ? void 0 : e.location) || {};
                    return {hash: t, host: a, hostname: l, href: o, origin: n, pathname: s, port: i, protocol: r, search: c}
                }, a = () => {
                    l.value = t()
                }, l = c(t());
                return m((() => {
                    e && (e.addEventListener("popstate", a), e.addEventListener("hashchange", a))
                })), _((() => {
                    e && (e.removeEventListener("popstate", a), e.removeEventListener("hashchange", a))
                })), l
            })(), o = p((() => e.to && !e.click ? "a" : "span")), n = p((() => l.value.href === e.to ? "location" : null)),
            s = p((() => e.option)), i = () => {
                const a = [];
                return s.value.forEach((l => {
                    a.push(L("li", {
                        key: l.id, class: "be-breadcrumb-item-li", onClick: () => (a => {
                            e.clickOption && e.clickOption(a), t.refs.beBreadcrumbPopover.close()
                        })(l)
                    }, [l.label]))
                })), a
            }, d = () => L("div", {
                class: "be-breadcrumb-item__content",
                ref: "BeBreadcrumbItem",
                id: `be_breadcrumb_item__content${a}`,
                onClick: a => {
                    return l = a, void ("last" === t.vnode.beBreadcrumbIndex || s.value.length > 0 || e.disabled ? l.preventDefault() : e.click && !e.disabled && (l.preventDefault(), e.click(l)));
                    var l
                }
            }, [Y(o.value, {"aria-current": n.value, href: e.to}, t.slots.default ? t.slots.default() : "")]);
        return m((() => {
            v((() => {
                const e = t.refs.beBreadcrumbPopover;
                s.value.length > 0 && e.addEvent(t.refs.BeBreadcrumbItem)
            }))
        })), () => L("div", {
            class: `\n                     be-breadcrumb-item\n                     ${e.disabled ? "be-breadcrumb-item__disabled" : ""} `,
            "aria-label": "BeBreadcrumbItem"
        }, [s.value.length > 0 ? L(z("be-popover"), {
            ref: "beBreadcrumbPopover",
            customClass: "be-breadcrumb-popover",
            placement: "bottom",
            trigger: e.disabled ? "none" : "click"
        }, {
            default: () => L("ul", null, [i()]),
            trigger: () => d()
        }) : d(), L("div", {class: "be-breadcrumb-item__separator"}, [t.slots.separator ? t.slots.separator() : e.separator])])
    }
});
const $a = _a;
$a.install = e => {
    e.component($a.name || "", $a)
};
const Aa = Oa, Fa = $a;
Aa.install = e => {
    e.component(Aa.name || "", Aa)
};
const Wa = Aa;
var Ua = i({
    name: "BeContextmenu",
    props: {
        eventType: {type: String, default: "contextmenu"},
        theme: {type: String, default: "default"},
        disabled: {type: Boolean, default: !1}
    },
    emits: ["show", "hide", "contextmenu"],
    setup(e, t) {
        const a = r(), l = a.uid;
        U("$$contextmenu", a);
        const o = p((() => ["be-contextmenu", `be-contextmenu__${e.theme}`])), n = c(!1), s = c([]);
        u(n, (e => {
            e ? (t.emit("show", a), document.body.addEventListener("click", y), document.body.addEventListener("mousedown", y), document.body.addEventListener("mousewheel", y)) : (t.emit("hide", a), document.body.removeEventListener("click", y), document.body.removeEventListener("mousedown", y), document.body.removeEventListener("mousewheel", y))
        })), m((() => {
            document.body.appendChild(a.vnode.el), v((() => {
                window.$BeContextmenu ? window.$BeContextmenu[l] = a : window.$BeContextmenu = {[l]: a}
            }))
        })), h((() => {
            document.body.removeChild(a.vnode.el), delete window.$BeContextmenu[l], s.value.forEach((t => {
                t.el.removeEventListener(e.eventType, g)
            })), document.body.removeEventListener("click", y), document.body.removeEventListener("mousedown", y), document.body.removeEventListener("scroll", y)
        }));
        let i = d({top: 0, left: 0});
        const g = l => {
            const o = l;
            if (o.preventDefault(), e.disabled) return;
            const n = o.target, r = document.getElementById("app") || document.body,
                c = s.value.find((e => (e.el.contains = r.contains, e.el.contains(n))));
            t.emit("contextmenu", c ? c.vnode : null);
            const d = o.pageX, p = o.pageY;
            w(), v((() => {
                let e = {top: p, left: d};
                const t = a.refs.contextmenu, l = t.clientWidth, o = t.clientHeight;
                o + p >= window.innerHeight && (e.top -= o), l + d >= window.innerWidth && (e.left -= l), i.top = `${e.top}px`, i.left = `${e.left + 3}px`
            }))
        }, w = e => {
            Object.keys(window.$BeContextmenu).forEach((e => {
                e !== l.toString() && window.$BeContextmenu[e].proxy.hide()
            })), e && (i.top = `${e.top}px`, i.left = `${e.left}px`), n.value = !0
        }, f = p((() => "click" === e.eventType)), y = e => {
            const t = e.target;
            a.vnode.el.contains(t) || f.value && s.value.some((e => e.el.contains(t))) || (n.value = !1)
        };
        return {
            addRef: t => {
                s.value.push(t), t.el.addEventListener(e.eventType, g)
            }, hide: () => {
                n.value = !1
            }, hideAll: () => {
                Object.keys(window.$BeContextmenu).forEach((e => {
                    window.$BeContextmenu[e].proxy.hide()
                }))
            }, beContextmenuId: l, visible: n, style: i, contextmenuCls: o, attrs: a.attrs
        }
    }
});
Ua.render = function (e, t, a, l, o, n) {
    return B((w(), f("ul", I({ref: "contextmenu"}, e.attrs, {
        class: e.contextmenuCls,
        style: e.style
    }), [x(e.$slots, "default")], 16)), [[W, e.visible]])
};
var Ya = i({
    name: "BeContextmenuItem",
    props: {
        divider: {type: Boolean, default: !1},
        disabled: {type: Boolean, default: !1},
        autoHide: {type: Boolean, default: !0}
    },
    emits: ["mouseenter", "mouseleave", "click"],
    setup(e, t) {
        const a = c(!1), l = r(), o = $("$$contextmenu");
        return {
            classname: p((() => ({
                "be-contextmenu-item": !e.divider,
                "be-contextmenu-item__hover": a.value,
                "be-contextmenu-item__disabled": e.disabled
            }))), handleClick: a => {
                e.disabled || (t.emit("click", l, a), e.autoHide && o.proxy.hide())
            }, handleMouseleave: o => {
                e.disabled || (a.value = !1, t.emit("mouseleave", l, o))
            }, handleMouseenter: o => {
                e.disabled || (a.value = !0, t.emit("mouseenter", l, o))
            }
        }
    }
});
const Ra = {key: 0, class: "be-contextmenu-divider"};
Ya.render = function (e, t, a, l, o, n) {
    return e.divider ? (w(), f("li", Ra)) : (w(), f("li", {
        key: 1,
        class: D(e.classname),
        onClick: t[0] || (t[0] = (...t) => e.handleClick && e.handleClick(...t)),
        onMouseenter: t[1] || (t[1] = (...t) => e.handleMouseenter && e.handleMouseenter(...t)),
        onMouseleave: t[2] || (t[2] = (...t) => e.handleMouseleave && e.handleMouseleave(...t))
    }, [x(e.$slots, "default")], 34))
};
var ja = i({
    name: "BeContextmenuSubMenu",
    props: {disabled: {type: Boolean, default: !1}, title: {type: String, default: ""}},
    emits: ["mouseenter", "mouseleave"],
    setup(e, t) {
        const a = c(!1), l = c([]), o = r(), n = p((() => ({
            "be-contextmenu-item": !0,
            "be-contextmenu-submenu": !0,
            "be-contextmenu-item__hover": a.value,
            "be-contextmenu-item__disabled": e.disabled
        }))), s = p((() => ["be-contextmenu", ...l.value]));
        return {
            hover: a, classname: n, submenuCls: s, handleMouseenter: n => {
                if (e.disabled) return;
                const {target: s} = n, i = s.getBoundingClientRect();
                a.value = !0, t.emit("mouseenter", o, n), v((() => {
                    const e = o.refs.submenu, t = e.clientWidth, a = e.clientHeight, n = [];
                    i.right + t >= window.innerWidth ? n.push("left") : n.push("right"), i.bottom + a >= window.innerHeight ? n.push("bottom") : n.push("top"), l.value = n
                }))
            }, handleMouseleave: l => {
                e.disabled || (a.value = !1, t.emit("mouseleave", o, l))
            }
        }
    }
});
const qa = {class: "be-contextmenu-submenu__title"};
ja.render = function (e, t, a, l, o, n) {
    return w(), f("li", {
        class: D(e.classname),
        onMouseenter: t[0] || (t[0] = (...t) => e.handleMouseenter && e.handleMouseenter(...t)),
        onMouseleave: t[1] || (t[1] = (...t) => e.handleMouseleave && e.handleMouseleave(...t))
    }, [b("span", qa, [x(e.$slots, "title", {}, (() => [H(E(e.title), 1)]))]), B(b("div", {
        ref: "submenu",
        class: D(e.submenuCls)
    }, [b("ul", null, [x(e.$slots, "default")])], 2), [[W, e.hover]])], 34)
};
Ua.install = e => {
    e.component(Ua.name || "", Ua)
};
const Ka = Ua;
Ya.install = e => {
    e.component(Ya.name || "", Ya)
};
const Xa = Ya;
ja.install = e => {
    e.component(ja.name || "", ja)
};
const Za = ja;
var Ja = i({
    name: "BeContainer",
    props: {direction: {type: String, default: ""}},
    setup: (e, {slots: t}) => ({
        isVertical: p((() => {
            if ("vertical" === e.direction) return !0;
            if ("horizontal" === e.direction) return !1;
            if (t && t.default) {
                return t.default().some((e => {
                    const t = e.type.name;
                    return "BeHeader" === t || "BeFooter" === t
                }))
            }
            return !1
        }))
    })
});
Ja.render = function (e, t, a, l, o, n) {
    return w(), f("section", {class: D(["be-container", {"be-container__vertical": e.isVertical}])}, [x(e.$slots, "default")], 2)
};
var Qa = i({
    name: "BeAside",
    props: {width: {type: String, default: null}},
    setup: e => ({style: p((() => e.width ? {width: e.width} : {}))})
});
Qa.render = function (e, t, a, l, o, n) {
    return w(), f("aside", {class: "be-aside", style: T(e.style)}, [x(e.$slots, "default")], 4)
};
var el = i({name: "BeMain"});
const tl = {class: "be-main"};
el.render = function (e, t, a, l, o, n) {
    return w(), f("main", tl, [x(e.$slots, "default")])
};
var al = i({
    name: "BeFooter",
    props: {height: {type: String, default: null}},
    setup: e => ({style: p((() => e.height ? {height: e.height} : {}))})
});
al.render = function (e, t, a, l, o, n) {
    return w(), f("footer", {class: "be-footer", style: T(e.style)}, [x(e.$slots, "default")], 4)
};
var ll = i({
    name: "BeHeader",
    props: {height: {type: String, default: null}},
    setup: e => ({style: p((() => e.height ? {height: e.height} : {}))})
});
ll.render = function (e, t, a, l, o, n) {
    return w(), f("header", {class: "be-header", style: T(e.style)}, [x(e.$slots, "default")], 4)
};
Ja.install = e => {
    e.component(Ja.name || "", Ja)
};
const ol = Ja;
Qa.install = e => {
    e.component(Qa.name || "", Qa)
};
const nl = Qa;
el.install = e => {
    e.component(el.name || "", el)
};
const sl = el;
al.install = e => {
    e.component(al.name || "", al)
};
const il = al;
ll.install = e => {
    e.component(ll.name || "", ll)
};
const rl = ll;
const cl = i({
    name: "BeProgress",
    props: {
        type: {type: String, default: "line"},
        trailColor: {type: String, default: ""},
        color: {type: [String, Object], default: ""},
        showInfo: {type: Boolean, default: !0},
        percent: {type: Number, default: 0},
        status: {type: String, default: "normal"},
        strokeLinecap: {type: String, default: "round"},
        strokeWidth: {type: Number},
        success: {type: Object},
        width: {type: Number, default: 132},
        gap: {type: Number, default: 75},
        gapPosition: {type: String, default: "bottom"}
    },
    setup(e) {
        const t = r(),
            a = p((() => "line" !== e.type || e.strokeWidth || 0 === e.strokeWidth ? "circle" !== e.type && "dashboard" !== e.type || e.strokeWidth || 0 === e.strokeWidth ? e.strokeWidth : 6 : 10)),
            l = p((() => o())), o = () => {
                const t = {};
                return rt(e.color) ? t.backgroundImage = `linear-gradient(to right, ${e.color.from} 0%, ${e.color.to} 100%)` : t.backgroundColor = e.color, t.width = `${e.percent >= 100 ? 100 : e.percent}%`, t.height = `${a.value}px`, t
            }, n = p((() => e.percent >= 100 ? "success" : e.status)),
            s = p((() => "circle" === e.type || "dashboard" === e.type ? {
                width: `${e.width}px`,
                height: `${e.width}px`
            } : {})), i = p((() => (a.value / e.width * 100).toFixed(1))),
            c = p((() => "circle" === e.type || "dashboard" === e.type ? parseInt("" + (50 - parseFloat(i.value) / 2), 10) : 0)),
            d = p((() => {
                const t = c.value, a = `a ${t} ${t} 0 1 1`;
                if ("dashboard" === e.type) {
                    if ("bottom" === e.gapPosition) return `M 50 50 m 0 ${t} ${a} 0 -${2 * t} ${a} 0 ${2 * t}`;
                    if ("left" === e.gapPosition) return `M 50 50 m -${t} 0 ${a} ${2 * t} 0 ${a} -${2 * t} 0`;
                    if ("right" === e.gapPosition) return `M 50 50 m ${t} 0 ${a} -${2 * t} 0 ${a} ${2 * t} 0`
                }
                return `M 50 50 m 0 -${t} ${a} 0 ${2 * t} ${a} 0 -${2 * t}`
            })), u = p((() => 2 * Math.PI * c.value)), m = p((() => "dashboard" === e.type ? e.gap / 100 : 1)),
            v = p((() => `${-1 * u.value * (1 - m.value) / 2}px`)),
            h = p((() => ({strokeDasharray: `${u.value * m.value}px, ${u.value}px`, strokeDashoffset: v.value}))),
            g = p((() => w(e.percent))), w = e => ({
                strokeDasharray: `${u.value * m.value * (e / 100)}px, ${u.value}px`,
                strokeDashoffset: v.value,
                transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease"
            }),
            f = p((() => "normal" === e.status && !e.color || rt(e.color) ? "rgba(64, 158, 255, .94)" : "error" !== e.status || e.color ? "success" !== e.status || e.color ? e.color : "#22C416FF" : "#F14E53FF")),
            y = () => rt(e.success) && e.success.color && e.success.percent && "line" === e.type ? L("div", {
                class: `\n                                            be-progress-line-path  \n                                            be-progress-line-path__success\n                                            ${"round" === e.strokeLinecap ? "be-progress-line-path__round" : ""}  \n                                            `,
                style: x.value
            }, null) : rt(e.success) && e.success.color && e.success.percent && ("circle" === e.type || "dashboard" === e.type) ? L("path", {
                class: "be-progress-circle__success",
                d: d.value,
                stroke: x.value.color,
                fill: "none",
                "stroke-linecap": e.strokeLinecap,
                "stroke-width": i.value,
                style: b.value
            }, null) : void 0, b = p((() => {
                var t;
                return w(null == (t = e.success) ? void 0 : t.percent)
            })), x = p((() => {
                var t, l, o, n;
                const s = {};
                return "line" === e.type ? (s.backgroundColor = null == (t = e.success) ? void 0 : t.color, s.width = `${(null == (l = e.success) ? void 0 : l.percent) >= 100 ? 100 : null == (o = e.success) ? void 0 : o.percent}%`, s.height = `${a.value}px`, s) : (s.color = null == (n = e.success) ? void 0 : n.color, s)
            }));
        return () => {
            const a = t.slots.default ? t.slots.default() : L("span", {class: "percent"}, [`${e.percent}%`]),
                o = t.slots.center ? t.slots.center() : L("span", {class: "percent"}, [`${e.percent}%`]);
            return L("div", {class: "" + ("line" === e.type ? "be-progress" : "be-progress be-progress-circle-dashboard")}, ["line" === e.type ? L("div", {class: "be-progress-body be-progress-line"}, [L("div", {
                class: "\n                                        be-progress-line--track\n                                        " + ("round" === e.strokeLinecap ? "be-progress-line-path__round" : ""),
                style: `background-color:${e.trailColor}`
            }, [L("div", {
                class: `\n                                            be-progress-line-path  \n                                            ${"round" === e.strokeLinecap ? "be-progress-line-path__round" : ""}  \n                                            be-progress__${n.value}`,
                style: l.value
            }, null), y()]), e.showInfo ? a : ""]) : "", "circle" === e.type || "dashboard" === e.type ? L("div", {
                class: "be-progress-body be-progress-circle",
                style: s.value
            }, [L("svg", {viewBox: "0 0 100 100"}, [L("path", {
                class: "be-progress-circle__track",
                d: d.value,
                "stroke-linecap": e.strokeLinecap,
                stroke: e.trailColor ? e.trailColor : "#f5f5f5",
                "stroke-width": i.value,
                fill: "none",
                style: h.value
            }, null), L("path", {
                class: "be-progress-circle__path",
                d: d.value,
                stroke: f.value,
                fill: "none",
                "stroke-linecap": e.strokeLinecap,
                "stroke-width": i.value,
                style: g.value
            }, null), y()]), L("div", {class: "be-progress-circle--text"}, [e.showInfo ? o : ""])]) : ""])
        }
    }
});
cl.install = e => {
    e.component(cl.name || "", cl)
};
const dl = cl;
var pl = i({
    name: "BeNotification",
    components: {BeIcon: Vt},
    props: {
        option: {
            type: Object,
            default: () => ({
                isShow: !1,
                style: {},
                close: !1,
                placementSelf: "",
                titles: "",
                customClass: "",
                msgType: "info",
                offsetTop: 0,
                offsetBottom: 0,
                placement: "topRight",
                bodyRender: null,
                iconPreRender: null,
                closeRender: null,
                description: "",
                duration: 4500,
                loading: !1,
                key: "",
                timer: 0,
                onClose: null,
                onClick: null
            })
        }, compType: {type: String, default: "notification"}
    },
    setup(e) {
        var t;
        const a = r(), l = c(e.option), o = c(null == (t = e.option) ? void 0 : t.loading),
            n = p((() => l.value.offsetTop));
        "topLeft" !== l.value.placementSelf && "topRight" !== l.value.placementSelf && "topCenter" !== l.value.placementSelf || (l.value.style = {top: n.value + "px"});
        const s = p((() => l.value.offsetBottom));
        "bottomLeft" !== l.value.placementSelf && "bottomRight" !== l.value.placementSelf || (l.value.style = {bottom: s.value + "px"});
        const i = p((() => l.value.placement));
        l.value.placementSelf = i.value, "bottomLeft" !== l.value.placementSelf && "bottomRight" !== l.value.placementSelf || (l.value.style = {bottom: l.value.offsetBottom + "px"}), "topLeft" !== l.value.placementSelf && "topRight" !== l.value.placementSelf && "topCenter" !== l.value.placementSelf || (l.value.style = {top: l.value.offsetTop + "px"});
        const u = d({onClose: e.option.onClose, onClick: e.option.onClick}), m = t => {
            t && t.stopPropagation(), e.option.closeNotify(a, !1, !0)
        }, v = () => {
            clearTimeout(l.value.timer), l.value.timer = 0
        }, h = c("");
        (() => {
            const t = `be-${e.compType} be-${e.compType}__${l.value.msgType} be-${e.compType}__${l.value.placement} ${l.value.customClass}`;
            h.value = t, ("bottomRight" === l.value.placement || "topRight" === l.value.placement && !l.value.isUpdate) && (h.value = t + ` be-${e.compType}-animation-right-in be-${e.compType}-bottom`), ("bottomLeft" === l.value.placement || "topLeft" === l.value.placement && !l.value.isUpdate) && (h.value = t + ` be-${e.compType}-animation-left-in be-${e.compType}-top`), "topCenter" !== l.value.placement || l.value.isUpdate || (h.value = t + ` be-${e.compType}-animation-top-center-in be-${e.compType}-top`)
        })();
        const g = a.uid, w = function (t) {
            const a = {
                onClick: e => (e => {
                    v(), m(e)
                })(e)
            };
            return t(L("div", {class: `be-${e.compType}-container be-${e.compType}-container__${l.value.placement}`}, [L("div", {class: `be-${e.compType}-title`}, [L("div", {
                class: `be-${e.compType}-head`,
                id: `be_${e.compType}_head${g}`
            }, [L("div", null, [o.value ? L(Vt, {
                icon: "loading",
                spin: !0,
                customClass: `icon-${l.value.msgType}`
            }, null) : l.value.iconPreRender ? l.value.iconPreRender : L(Vt, {
                icon: `${l.value.msgType}`,
                customClass: `icon-${l.value.msgType}`
            }, null), L("span", {class: `txt-${l.value.msgType}`}, [l.value.titles])]), L("div", {id: `be_${e.compType}_close_icon${g}`}, [l.value.closeRender ? l.value.closeRender : l.value.close ? L(Vt, I({icon: "deleteIc"}, a), null) : ""])])]), "notification" === e.compType ? L("div", {class: `be-${e.compType}-body`}, [l.value.bodyRender ? l.value.bodyRender() : L("p", {class: `be-${e.compType}-description`}, [l.value.description])]) : ""]))
        };
        return () => (v(), l.value.duration > 0 && (l.value.timer = setTimeout((() => {
            m(null)
        }), l.value.duration)), L("div", {
            style: l.value.style, onClick: e => {
                (e => {
                    u.onClick && u.onClick(e)
                })(e)
            }, class: h.value, id: `be_${e.compType}${g}`
        }, [l.value.isShow ? w.call(this, Y) : ""]))
    }
});
let ul = {topLeft: [], topRight: [], bottomLeft: [], topCenter: [], bottomRight: []}, ml = !1;
const vl = function (e, t = !1) {
    if (!e) return;
    let a = -1;
    const l = e.props && e.props.option.placement, o = e.component && e.component.uid || e.uid, n = e.el || e.proxy.$el,
        s = Object(ul)[l], i = /top/.test(l) ? "top" : "bottom", r = s.length;
    if (t) return void wl();
    try {
        s.forEach(((e, t) => {
            if (o === e.instance.component.uid) throw a = t, new Error("EndIterative")
        }))
    } catch (p) {
        if ("EndIterative" !== p.message) throw p
    }
    if (console.log(a), a < 0) return;
    const c = s[a];
    if (s.splice(a, 1), r < 1) return;
    const d = n.offsetHeight;
    for (let u = a; u < r - 1; u++) s[u].instance.el.style[i] = parseInt(s[u].instance.el.style[i], 10) - d - 35 + "px";
    Object(ul)[l] = Object(ul)[l].filter((e => e.instance.component.uid !== o)), e.props.option.onClose && e.props.option.onClose(), hl(n, c.elm)
}, hl = (e, t) => {
    e && e.parentNode && (gl(e), setTimeout((() => {
        O(null, t)
    }), 300))
}, gl = e => {
    let t = e.className;
    t.indexOf("be-message") < 0 || (t.indexOf("-in") >= 0 ? t = t.replace(/-in/, "-out") : t += " be-message-animation-top-center-out", e.className = t)
}, wl = () => {
    Object.keys(ul).forEach((e => {
        Object(ul)[e].forEach((e => {
            hl(e.instance.el, e.elm)
        }))
    })), fl()
}, fl = () => {
    ul = {topLeft: [], topRight: [], bottomLeft: [], topCenter: [], bottomRight: []}
}, yl = (e, t, a, l, o = !1) => {
    let n = null, s = l;
    if (s) {
        const a = e.placement || "topRight", l = Object(ul)[a];
        let o = null, n = null;
        if (l.forEach(((e, t) => {
            e.instance.component.uid === s.instance.component.uid && (o = e.elm, n = t)
        })), !o || !n && 0 !== n) return;
        l.splice(n, 1), O(null, o), s = yl(e, t, !1, null, !0)
    } else {
        e.isUpdate = o, s = L(pl, {
            option: e,
            compType: e.compType
        }), s.props.option.isShow = !0, n = document.createElement("div"), O(s, n);
        const t = document.querySelector("body");
        t && t.append ? t.append(s.el) : t && t.appendChild(s.el)
    }
    return a || t.push({instance: s, elm: n}), s
}, bl = function (e) {
    ml = !1;
    const t = {
        isShow: !1,
        close: !1,
        style: {},
        placementSelf: "",
        titles: "",
        customClass: "",
        msgType: "info",
        offsetTop: 0,
        offsetBottom: 0,
        placement: "topRight",
        bodyRender: null,
        iconPreRender: null,
        closeRender: null,
        description: "",
        duration: 4500,
        key: "",
        timer: 0,
        onClose: void 0,
        onClick: void 0,
        closeNotify: vl
    }, a = ut(e);
    let l = Object.assign({}, t, e), o = [];
    o = void 0 === l.placement ? ul.topRight : Object(ul)[l.placement];
    let n = null;
    return l.key && o.forEach((e => {
        e.instance.props.option.key === l.key && (ml = !0, l = Object.assign({}, e.instance.props.option, a), n = e)
    })), n = yl(l, o, ml, n), ((e, t, a, l) => {
        let o = 30, n = "";
        "topLeft" !== e.placement && "topRight" !== e.placement && "topCenter" !== e.placement || (o = e.offsetTop || 30, n = "top"), "bottomLeft" !== e.placement && "bottomRight" !== e.placement || (o = e.offsetBottom || 30, n = "bottom"), a || t.forEach(((t, a) => {
            if (o += (t.instance.el.childNodes[0].offsetHeight || 0) + 35, 0 === a && "message" === (null == e ? void 0 : e.compType)) {
                const t = /top/.test(String(e.placement)) ? e.offsetTop || 0 : e.offsetBottom || 0;
                o = 30 + t
            }
        })), l.el.style[n] = o + "px"
    })(l, o, ml, n), {notify: n, close: vl.bind(this, n)}
}, xl = e => bl(e);
var Cl = {service: xl}, kl = i({
    name: "BeMessageBox",
    directives: {drag: Ht},
    components: {BeIcon: zt},
    props: {
        titles: {type: String, default: ""},
        isShow: {type: Boolean, default: !1},
        customClass: {type: String, default: ""},
        isOpenModal: {type: Boolean, default: !0},
        msgType: {type: String, default: "info"},
        footerType: {type: String, default: "center"},
        footerRender: {type: Function, default: null},
        bodyRender: {type: Function, default: null},
        iconPreRender: {type: Function, default: null},
        iconNextRender: {type: Function, default: null},
        isDrag: {type: Boolean, default: !1},
        onConfirm: {type: Function, default: null},
        onClose: {type: Function, default: null}
    },
    setup(e) {
        const t = r().uid, a = c(e.isShow), l = () => {
            e.onClose && e.onClose()
        }, o = () => {
            e.onConfirm && e.onConfirm(), a.value = !1
        }, n = c(""), s = p((() => e.isOpenModal));
        u(s, (e => {
            n.value = e ? "be-modal" : ""
        }));
        const i = c(""), d = p((() => i.value));
        return m((() => {
            e.isOpenModal && (n.value = "be-modal"), (() => {
                const e = "be-message-box-container";
                i.value = e + " be-fadeOut", setTimeout((() => {
                    i.value = e + " be-fadeIn"
                }), 100)
            })()
        })), () => {
            if (a.value) return L("div", {class: `be-message-box be-message-box__${e.msgType} ${n.value} ${e.customClass}`}, [B(L("div", {
                class: d.value,
                id: `be_message_box_container${t}`
            }, [L("div", {class: "be-message-box-title"}, [L("div", {
                class: "be-message-box-head",
                id: `be_message_box_head${t}`
            }, [L("div", null, [e.iconPreRender ? e.iconPreRender() : L(z("be-icon"), {
                icon: `${e.msgType}`,
                class: `icon-${e.msgType}`
            }, null), L("span", {class: `text-${e.msgType}`}, [e.titles])]), L("div", {class: "be-message-box-head-close"}, [e.iconNextRender ? L("div", {onClick: () => l()}, [e.iconNextRender()]) : L(z("be-icon"), {
                icon: "deleteIc",
                onClick: () => l()
            }, null)])])]), L("div", {class: "be-message-box-body"}, [e.bodyRender ? e.bodyRender() : ""]), L("div", {class: `be-message-box-footer be-message-box-footer__${e.footerType}`}, [e.footerRender ? L("div", {onClick: () => o()}, [e.footerRender()]) : L("button", {
                class: `be-button be-button__mini be-button__${e.msgType} ${"info" === e.msgType ? "border" : ""}`,
                onClick: () => o()
            }, [H("知道了")])])]), [[g("drag"), {isDrag: e.isDrag}]])])
        }
    }
});
const Dl = e => ({
    msg: (e => {
        const t = document.createElement("div"), a = e.onClose;
        e.onClose = () => {
            O(null, t), a && a()
        };
        const l = L(kl, n({}, e));
        l.props && (l.props.isShow = !0), O(l, t);
        const o = document.querySelector("body");
        o && o.append ? o.append(l.el) : o && o.appendChild(l.el)
    })(Object.assign({}, {
        isDrag: !1,
        titles: "",
        customClass: "",
        msgType: "info",
        footerType: "center",
        footerRender: null,
        bodyRender: null,
        iconPreRender: null,
        iconNextRender: null,
        isOpenModal: !0
    }, e))
});
var Ll = {service: e => Dl(e)};
const Vl = {close: Jt.close, init: Jt.init};
var Sl = {
    service: e => function (e) {
        const t = {
            titles: e.titles || "message",
            msgType: e.msgType || "info",
            offsetTop: e.offsetTop,
            close: e.close || !1,
            placement: "topCenter",
            compType: "message",
            customClass: e.customClass,
            duration: e.duration || 4500,
            key: e.key,
            onClose: e.onClose,
            iconPreRender: e.iconPreRender,
            closeRender: e.closeRender,
            loading: e.loading
        }, a = xl(t);
        return {
            message: a.notify, close: a.close, update: e => {
                const t = {
                    titles: e.titles,
                    msgType: e.msgType,
                    offsetTop: e.offsetTop,
                    close: e.close,
                    placement: "topCenter",
                    compType: "message",
                    customClass: e.customClass,
                    duration: e.duration,
                    key: e.key,
                    onClose: e.onClose,
                    iconPreRender: e.iconPreRender,
                    closeRender: e.closeRender,
                    loading: e.loading
                };
                return xl(t)
            }
        }
    }(e)
};
const Bl = {
    mounted(e, t, a) {
        var l;
        const o = null == (l = t.instance) ? void 0 : l.$refs[t.arg || t.value];
        o && o.addRef({el: e, vnode: a})
    }
};
const Tl = Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    BeEllipsis: Lt,
    BeIcon: zt,
    BePopover: Mt,
    BeTooltip: It,
    BeButton: _t,
    BeDialog: qt,
    BeLoading: ea,
    BePagination: ma,
    BeInput: Da,
    BeAutocomplete: Va,
    BeTag: Ta,
    BeInputNumber: za,
    BeSelect: Ma,
    BeSelectMultiple: Ia,
    BeSwitch: Na,
    BeBreadcrumb: Fa,
    BeBreadcrumbItem: Wa,
    BeContextmenu: Ka,
    BeContextmenuItem: Xa,
    BeContextmenuSubMenu: Za,
    BeMain: sl,
    BeFooter: il,
    BeAside: nl,
    BeHeader: rl,
    BeContainer: ol,
    BeProgress: dl,
    BeNotification: Cl,
    BeMsg: Ll,
    BeLoadingSer: Vl,
    BeMessage: Sl,
    ClickOutside: j,
    contextmenu: Bl,
    dragDirective: Ht
}), Pl = function (e) {
    return Object.keys(Tl).forEach((t => {
        const a = Tl[t];
        a.install && e.use(a)
    })), e
}, zl = "1.0.2";
var El = {version: "1.0.2", install: Pl};
export {
    nl as BeAside,
    Va as BeAutocomplete,
    Fa as BeBreadcrumb,
    Wa as BeBreadcrumbItem,
    _t as BeButton,
    ol as BeContainer,
    Ka as BeContextmenu,
    Xa as BeContextmenuItem,
    Za as BeContextmenuSubMenu,
    qt as BeDialog,
    Lt as BeEllipsis,
    il as BeFooter,
    rl as BeHeader,
    zt as BeIcon,
    Da as BeInput,
    za as BeInputNumber,
    ea as BeLoading,
    Vl as BeLoadingSer,
    sl as BeMain,
    Sl as BeMessage,
    Ll as BeMsg,
    Cl as BeNotification,
    ma as BePagination,
    Mt as BePopover,
    dl as BeProgress,
    Ma as BeSelect,
    Ia as BeSelectMultiple,
    Na as BeSwitch,
    Ta as BeTag,
    It as BeTooltip,
    j as ClickOutside,
    Bl as contextmenu,
    El as default,
    Ht as dragDirective,
    Pl as install,
    zl as version
};
