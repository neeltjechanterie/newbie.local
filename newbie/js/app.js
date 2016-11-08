! function(e, t, n) {
    var i = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = n(i) :
        "function" == typeof define && define.amd ? define(function() {
            return t[e] = n(i)
        }) : t[e] = n(i)
}("enquire", this, function(e) {
    "use strict";

    function t(e, t) {
        var n, i = 0,
            o = e.length;
        for (i; o > i && (n = t(e[i], i), n !== !1); i++);
    }

    function n(e) {
        return "[object Array]" === Object.prototype.toString.apply(e)
    }

    function i(e) {
        return "function" == typeof e
    }

    function o(e) {
        this.options = e, !e.deferSetup && this.setup()
    }

    function r(t, n) {
        this.query = t, this.isUnconditional = n, this.handlers = [],
            this.mql = e(t);
        var i = this;
        this.listener = function(e) {
            i.mql = e, i.assess()
        }, this.mql.addListener(this.listener)
    }

    function s() {
        if (!e) throw new Error(
            "matchMedia not present, legacy browsers require a polyfill"
        );
        this.queries = {}, this.browserIsIncapable = !e("only all").matches
    }
    return o.prototype = {
        setup: function() {
            this.options.setup && this.options.setup(), this.initialised = !
                0
        },
        on: function() {
            !this.initialised && this.setup(), this.options.match &&
                this.options.match()
        },
        off: function() {
            this.options.unmatch && this.options.unmatch()
        },
        destroy: function() {
            this.options.destroy ? this.options.destroy() : this.off()
        },
        equals: function(e) {
            return this.options === e || this.options.match === e
        }
    }, r.prototype = {
        addHandler: function(e) {
            var t = new o(e);
            this.handlers.push(t), this.matches() && t.on()
        },
        removeHandler: function(e) {
            var n = this.handlers;
            t(n, function(t, i) {
                return t.equals(e) ? (t.destroy(), !n.splice(
                    i, 1)) : void 0
            })
        },
        matches: function() {
            return this.mql.matches || this.isUnconditional
        },
        clear: function() {
            t(this.handlers, function(e) {
                    e.destroy()
                }), this.mql.removeListener(this.listener), this.handlers
                .length = 0
        },
        assess: function() {
            var e = this.matches() ? "on" : "off";
            t(this.handlers, function(t) {
                t[e]()
            })
        }
    }, s.prototype = {
        register: function(e, o, s) {
            var a = this.queries,
                l = s && this.browserIsIncapable;
            return a[e] || (a[e] = new r(e, l)), i(o) && (o = {
                match: o
            }), n(o) || (o = [o]), t(o, function(t) {
                i(t) && (t = {
                    match: t
                }), a[e].addHandler(t)
            }), this
        },
        unregister: function(e, t) {
            var n = this.queries[e];
            return n && (t ? n.removeHandler(t) : (n.clear(),
                delete this.queries[e])), this
        }
    }, new s
}),
function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports =
        e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error(
                "jQuery requires a window with a document");
            return t(e)
        } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length,
            n = re.type(e);
        return "function" === n || re.isWindow(e) ? !1 : "array" === n ||
            0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function i(e, t, n) {
        if (re.isFunction(t)) return re.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType) return re.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (me.test(t)) return re.filter(t, e, n);
            t = re.filter(t, e)
        }
        return re.grep(e, function(e) {
            return K.call(t, e) > -1 !== n
        })
    }

    function o(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function r(e) {
        var t = {};
        return re.each(e.match(we) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function s() {
        Z.removeEventListener("DOMContentLoaded", s), e.removeEventListener(
            "load", s), re.ready()
    }

    function a() {
        this.expando = re.expando + a.uid++
    }

    function l(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)
            if (i = "data-" + t.replace(Pe, "-$&").toLowerCase(), n = e
                .getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" ===
                        n ? null : +n + "" === n ? +n : Ie.test(n) ? re
                        .parseJSON(n) : n
                } catch (o) {}
                Ee.set(e, t, n)
            } else n = void 0;
        return n
    }

    function u(e, t, n, i) {
        var o, r = 1,
            s = 20,
            a = i ? function() {
                return i.cur()
            } : function() {
                return re.css(e, t, "")
            },
            l = a(),
            u = n && n[3] || (re.cssNumber[t] ? "" : "px"),
            c = (re.cssNumber[t] || "px" !== u && +l) && Le.exec(re.css(
                e, t));
        if (c && c[3] !== u) {
            u = u || c[3], n = n || [], c = +l || 1;
            do r = r || ".5", c /= r, re.style(e, t, c + u); while (r !==
                (r = a() / l) && 1 !== r && --s)
        }
        return n && (c = +c || +l || 0, o = n[1] ? c + (n[1] + 1) * n[2] :
            +n[2], i && (i.unit = u, i.start = c, i.end = o)), o
    }

    function c(e, t) {
        var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(
                t || "*") : "undefined" != typeof e.querySelectorAll ?
            e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], n) :
            n
    }

    function d(e, t) {
        for (var n = 0, i = e.length; i > n; n++) Ce.set(e[n],
            "globalEval", !t || Ce.get(t[n], "globalEval"))
    }

    function p(e, t, n, i, o) {
        for (var r, s, a, l, u, p, f = t.createDocumentFragment(), h = [],
            m = 0, g = e.length; g > m; m++)
            if (r = e[m], r || 0 === r)
                if ("object" === re.type(r)) re.merge(h, r.nodeType ? [
                    r
                ] : r);
                else if (_e.test(r)) {
            for (s = s || f.appendChild(t.createElement("div")), a = (
                    De.exec(r) || ["", ""])[1].toLowerCase(), l = He[a] ||
                He._default, s.innerHTML = l[1] + re.htmlPrefilter(r) +
                l[2], p = l[0]; p--;) s = s.lastChild;
            re.merge(h, s.childNodes), s = f.firstChild, s.textContent =
                ""
        } else h.push(t.createTextNode(r));
        for (f.textContent = "", m = 0; r = h[m++];)
            if (i && re.inArray(r, i) > -1) o && o.push(r);
            else if (u = re.contains(r.ownerDocument, r), s = c(f.appendChild(
            r), "script"), u && d(s), n)
            for (p = 0; r = s[p++];) ze.test(r.type || "") && n.push(r);
        return f
    }

    function f() {
        return !0
    }

    function h() {
        return !1
    }

    function m() {
        try {
            return Z.activeElement
        } catch (e) {}
    }

    function g(e, t, n, i, o, r) {
        var s, a;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (a in t) g(e, a, n, i, t[a], r);
            return e
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null ==
            o && ("string" == typeof n ? (o = i, i = void 0) : (o = i,
                i = n, n = void 0)), o === !1) o = h;
        else if (!o) return this;
        return 1 === r && (s = o, o = function(e) {
            return re().off(e), s.apply(this, arguments)
        }, o.guid = s.guid || (s.guid = re.guid++)), e.each(
            function() {
                re.event.add(this, t, o, i, n)
            })
    }

    function y(e, t) {
        return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ?
            t : t.firstChild, "tr") ? e.getElementsByTagName(
            "tbody")[0] || e : e
    }

    function v(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
            e
    }

    function b(e) {
        var t = Be.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function x(e, t) {
        var n, i, o, r, s, a, l, u;
        if (1 === t.nodeType) {
            if (Ce.hasData(e) && (r = Ce.access(e), s = Ce.set(t, r), u =
                r.events)) {
                delete s.handle, s.events = {};
                for (o in u)
                    for (n = 0, i = u[o].length; i > n; n++) re.event.add(
                        t, o, u[o][n])
            }
            Ee.hasData(e) && (a = Ee.access(e), l = re.extend({}, a),
                Ee.set(t, l))
        }
    }

    function w(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && $e.test(e.type) ? t.checked = e.checked : (
            "input" === n || "textarea" === n) && (t.defaultValue =
            e.defaultValue)
    }

    function S(e, t, n, i) {
        t = G.apply([], t);
        var o, r, s, a, l, u, d = 0,
            f = e.length,
            h = f - 1,
            m = t[0],
            g = re.isFunction(m);
        if (g || f > 1 && "string" == typeof m && !ie.checkClone && We.test(
            m)) return e.each(function(o) {
            var r = e.eq(o);
            g && (t[0] = m.call(this, o, r.html())), S(r, t,
                n, i)
        });
        if (f && (o = p(t, e[0].ownerDocument, !1, e, i), r = o.firstChild,
            1 === o.childNodes.length && (o = r), r || i)) {
            for (s = re.map(c(o, "script"), v), a = s.length; f > d; d++)
                l = o, d !== h && (l = re.clone(l, !0, !0), a && re.merge(
                    s, c(l, "script"))), n.call(e[d], l, d);
            if (a)
                for (u = s[s.length - 1].ownerDocument, re.map(s, b), d =
                    0; a > d; d++) l = s[d], ze.test(l.type || "") && !
                    Ce.access(l, "globalEval") && re.contains(u, l) &&
                    (l.src ? re._evalUrl && re._evalUrl(l.src) : re.globalEval(
                        l.textContent.replace(Ve, "")))
        }
        return e
    }

    function T(e, t, n) {
        for (var i, o = t ? re.filter(t, e) : e, r = 0; null != (i = o[
            r]); r++) n || 1 !== i.nodeType || re.cleanData(c(i)), i.parentNode &&
            (n && re.contains(i.ownerDocument, i) && d(c(i, "script")),
                i.parentNode.removeChild(i));
        return e
    }

    function k(e, t) {
        var n = re(t.createElement(e)).appendTo(t.body),
            i = re.css(n[0], "display");
        return n.detach(), i
    }

    function C(e) {
        var t = Z,
            n = Ye[e];
        return n || (n = k(e, t), "none" !== n && n || (Xe = (Xe || re(
                "<iframe frameborder='0' width='0' height='0'/>"
            )).appendTo(t.documentElement), t = Xe[0].contentDocument,
            t.write(), t.close(), n = k(e, t), Xe.detach()), Ye[
            e] = n), n
    }

    function E(e, t, n) {
        var i, o, r, s, a = e.style;
        return n = n || Qe(e), n && (s = n.getPropertyValue(t) || n[t],
                "" !== s || re.contains(e.ownerDocument, e) || (s = re.style(
                    e, t)), !ie.pixelMarginRight() && Ze.test(s) && Ue.test(
                    t) && (i = a.width, o = a.minWidth, r = a.maxWidth,
                    a.minWidth = a.maxWidth = a.width = s, s = n.width,
                    a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !==
            s ? s + "" : s
    }

    function I(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(
                    this, arguments)
            }
        }
    }

    function P(e) {
        if (e in it) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)
            if (e = nt[n] + t, e in it) return e
    }

    function O(e, t, n) {
        var i = Le.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function L(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" ===
            t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += re
            .css(e, n + Ae[r], !0, o)), i ? ("content" === n && (s -=
                re.css(e, "padding" + Ae[r], !0, o)), "margin" !==
            n && (s -= re.css(e, "border" + Ae[r] + "Width", !0, o))
        ) : (s += re.css(e, "padding" + Ae[r], !0, o), "padding" !==
            n && (s += re.css(e, "border" + Ae[r] + "Width", !0, o))
        );
        return s
    }

    function A(t, n, i) {
        var o = !0,
            r = "width" === n ? t.offsetWidth : t.offsetHeight,
            s = Qe(t),
            a = "border-box" === re.css(t, "boxSizing", !1, s);
        if (Z.msFullscreenElement && e.top !== e && t.getClientRects().length &&
            (r = Math.round(100 * t.getBoundingClientRect()[n])), 0 >=
            r || null == r) {
            if (r = E(t, n, s), (0 > r || null == r) && (r = t.style[n]),
                Ze.test(r)) return r;
            o = a && (ie.boxSizingReliable() || r === t.style[n]), r =
                parseFloat(r) || 0
        }
        return r + L(t, n, i || (a ? "border" : "content"), o, s) +
            "px"
    }

    function j(e, t) {
        for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++) i =
            e[s], i.style && (r[s] = Ce.get(i, "olddisplay"), n = i.style
                .display, t ? (r[s] || "none" !== n || (i.style.display =
                    ""), "" === i.style.display && je(i) && (r[s] =
                    Ce.access(i, "olddisplay", C(i.nodeName)))) : (o =
                    je(i), "none" === n && o || Ce.set(i, "olddisplay",
                        o ? n : re.css(i, "display"))));
        for (s = 0; a > s; s++) i = e[s], i.style && (t && "none" !== i
            .style.display && "" !== i.style.display || (i.style.display =
                t ? r[s] || "" : "none"));
        return e
    }

    function $(e, t, n, i, o) {
        return new $.prototype.init(e, t, n, i, o)
    }

    function D() {
        return e.setTimeout(function() {
            ot = void 0
        }), ot = re.now()
    }

    function z(e, t) {
        var n, i = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Ae[i], o["margin" +
            n] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function H(e, t, n) {
        for (var i, o = (N.tweeners[t] || []).concat(N.tweeners["*"]),
            r = 0, s = o.length; s > r; r++)
            if (i = o[r].call(n, t, e)) return i
    }

    function _(e, t, n) {
        var i, o, r, s, a, l, u, c, d = this,
            p = {},
            f = e.style,
            h = e.nodeType && je(e),
            m = Ce.get(e, "fxshow");
        n.queue || (a = re._queueHooks(e, "fx"), null == a.unqueued &&
                (a.unqueued = 0, l = a.empty.fire, a.empty.fire =
                    function() {
                        a.unqueued || l()
                    }), a.unqueued++, d.always(function() {
                    d.always(function() {
                        a.unqueued--, re.queue(e, "fx").length ||
                            a.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) &&
            (n.overflow = [f.overflow, f.overflowX, f.overflowY], u =
                re.css(e, "display"), c = "none" === u ? Ce.get(e,
                    "olddisplay") || C(e.nodeName) : u, "inline" === c &&
                "none" === re.css(e, "float") && (f.display =
                    "inline-block")), n.overflow && (f.overflow =
                "hidden", d.always(function() {
                    f.overflow = n.overflow[0], f.overflowX = n.overflow[
                        1], f.overflowY = n.overflow[2]
                }));
        for (i in t)
            if (o = t[i], st.exec(o)) {
                if (delete t[i], r = r || "toggle" === o, o === (h ?
                    "hide" : "show")) {
                    if ("show" !== o || !m || void 0 === m[i]) continue;
                    h = !0
                }
                p[i] = m && m[i] || re.style(e, i)
            } else u = void 0;
        if (re.isEmptyObject(p)) "inline" === ("none" === u ? C(e.nodeName) :
            u) && (f.display = u);
        else {
            m ? "hidden" in m && (h = m.hidden) : m = Ce.access(e,
                    "fxshow", {}), r && (m.hidden = !h), h ? re(e).show() :
                d.done(function() {
                    re(e).hide()
                }), d.done(function() {
                    var t;
                    Ce.remove(e, "fxshow");
                    for (t in p) re.style(e, t, p[t])
                });
            for (i in p) s = H(h ? m[i] : 0, i, d), i in m || (m[i] = s
                .start, h && (s.end = s.start, s.start = "width" ===
                    i || "height" === i ? 1 : 0))
        }
    }

    function q(e, t) {
        var n, i, o, r, s;
        for (n in e)
            if (i = re.camelCase(n), o = t[i], r = e[n], re.isArray(r) &&
                (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r,
                    delete e[n]), s = re.cssHooks[i], s && "expand" in
                s) {
                r = s.expand(r), delete e[i];
                for (n in r) n in e || (e[n] = r[n], t[n] = o)
            } else t[i] = o
    }

    function N(e, t, n) {
        var i, o, r = 0,
            s = N.prefilters.length,
            a = re.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var t = ot || D(), n = Math.max(0, u.startTime + u
                        .duration - t), i = n / u.duration || 0, r =
                    1 - i, s = 0, l = u.tweens.length; l > s; s++) u.tweens[
                    s].run(r);
                return a.notifyWith(e, [u, r, n]), 1 > r && l ? n : (a.resolveWith(
                    e, [u]), !1)
            },
            u = a.promise({
                elem: e,
                props: re.extend({}, t),
                opts: re.extend(!0, {
                    specialEasing: {},
                    easing: re.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: ot || D(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = re.Tween(e, u.opts, t, n, u.opts.specialEasing[
                        t] || u.opts.easing);
                    return u.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? u.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i > n; n++) u.tweens[n].run(1);
                    return t ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(
                            e, [u, t])) : a.rejectWith(e, [u, t]),
                        this
                }
            }),
            c = u.props;
        for (q(c, u.opts.specialEasing); s > r; r++)
            if (i = N.prefilters[r].call(u, e, c, u.opts)) return re.isFunction(
                i.stop) && (re._queueHooks(u.elem, u.opts.queue)
                .stop = re.proxy(i.stop, i)), i;
        return re.map(c, H, u), re.isFunction(u.opts.start) && u.opts.start
            .call(e, u), re.fx.timer(re.extend(l, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete)
            .fail(u.opts.fail).always(u.opts.always)
    }

    function M(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function R(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0,
                r = t.toLowerCase().match(we) || [];
            if (re.isFunction(n))
                for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) ||
                    "*", (e[i] = e[i] || []).unshift(n)) : (e[i] =
                    e[i] || []).push(n)
        }
    }

    function F(e, t, n, i) {
        function o(a) {
            var l;
            return r[a] = !0, re.each(e[a] || [], function(e, a) {
                var u = a(t, n, i);
                return "string" != typeof u || s || r[u] ?
                    s ? !(l = u) : void 0 : (t.dataTypes.unshift(
                        u), o(u), !1)
            }), l
        }
        var r = {},
            s = e === Ct;
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }

    function W(e, t) {
        var n, i, o = re.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] =
            t[n]);
        return i && re.extend(!0, e, i), e
    }

    function B(e, t, n) {
        for (var i, o, r, s, a = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType ||
            t.getResponseHeader("Content-Type"));
        if (i)
            for (o in a)
                if (a[o] && a[o].test(i)) {
                    l.unshift(o);
                    break
                }
        if (l[0] in n) r = l[0];
        else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    r = o;
                    break
                }
                s || (s = o)
            }
            r = r || s
        }
        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
    }

    function V(e, t, n, i) {
        var o, r, s, a, l, u = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
        for (r = c.shift(); r;)
            if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l &&
                i && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                l = r, r = c.shift())
                if ("*" === r) r = l;
                else if ("*" !== l && l !== r) {
            if (s = u[l + " " + r] || u["* " + r], !s)
                for (o in u)
                    if (a = o.split(" "), a[1] === r && (s = u[l + " " +
                        a[0]] || u["* " + a[0]])) {
                        s === !0 ? s = u[o] : u[o] !== !0 && (r = a[0],
                            c.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && e["throws"]) t = s(t);
                else try {
                    t = s(t)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: s ? d : "No conversion from " + l +
                            " to " + r
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function X(e, t, n, i) {
        var o;
        if (re.isArray(t)) re.each(t, function(t, o) {
            n || Ot.test(e) ? i(e, o) : X(e + "[" + ("object" ==
                    typeof o && null != o ? t : "") + "]",
                o, n, i)
        });
        else if (n || "object" !== re.type(t)) i(e, t);
        else
            for (o in t) X(e + "[" + o + "]", t[o], n, i)
    }

    function Y(e) {
        return re.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var U = [],
        Z = e.document,
        Q = U.slice,
        G = U.concat,
        J = U.push,
        K = U.indexOf,
        ee = {},
        te = ee.toString,
        ne = ee.hasOwnProperty,
        ie = {},
        oe = "2.2.0",
        re = function(e, t) {
            return new re.fn.init(e, t)
        },
        se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ae = /^-ms-/,
        le = /-([\da-z])/gi,
        ue = function(e, t) {
            return t.toUpperCase()
        };
    re.fn = re.prototype = {
        jquery: oe,
        constructor: re,
        selector: "",
        length: 0,
        toArray: function() {
            return Q.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[
                e] : Q.call(this)
        },
        pushStack: function(e) {
            var t = re.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e) {
            return re.each(this, e)
        },
        map: function(e) {
            return this.pushStack(re.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(Q.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: J,
        sort: U.sort,
        splice: U.splice
    }, re.extend = re.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++),
            "object" == typeof s || re.isFunction(s) || (s = {}), a ===
            l && (s = this, a--); l > a; a++)
            if (null != (e = arguments[a]))
                for (t in e) n = s[t], i = e[t], s !== i && (u && i &&
                    (re.isPlainObject(i) || (o = re.isArray(i))) ?
                    (o ? (o = !1, r = n && re.isArray(n) ? n : []) :
                        r = n && re.isPlainObject(n) ? n : {}, s[t] =
                        re.extend(u, r, i)) : void 0 !== i && (s[t] =
                        i));
        return s
    }, re.extend({
        expando: "jQuery" + (oe + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === re.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !re.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isPlainObject: function(e) {
            return "object" !== re.type(e) || e.nodeType || re.isWindow(
                e) ? !1 : e.constructor && !ne.call(e.constructor
                .prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e ||
                "function" == typeof e ? ee[te.call(e)] ||
                "object" : typeof e
        },
        globalEval: function(e) {
            var t, n = eval;
            e = re.trim(e), e && (1 === e.indexOf("use strict") ?
                (t = Z.createElement("script"), t.text = e,
                    Z.head.appendChild(t).parentNode.removeChild(
                        t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(ae, "ms-").replace(le, ue)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t
                .toLowerCase()
        },
        each: function(e, t) {
            var i, o = 0;
            if (n(e))
                for (i = e.length; i > o && t.call(e[o], o, e[o]) !==
                    !1; o++);
            else
                for (o in e)
                    if (t.call(e[o], o, e[o]) === !1) break; return
                e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(se, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? re.merge(i,
                "string" == typeof e ? [e] : e) : J.call(
                i, e)), i
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : K.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; n > i; i++)
                e[o++] = t[i];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var i, o = [], r = 0, s = e.length, a = !n; s >
                r; r++) i = !t(e[r], r), i !== a && o.push(e[r]);
            return o
        },
        map: function(e, t, i) {
            var o, r, s = 0,
                a = [];
            if (n(e))
                for (o = e.length; o > s; s++) r = t(e[s], s, i),
                    null != r && a.push(r);
            else
                for (s in e) r = t(e[s], s, i), null != r && a.push(
                    r);
            return G.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, o;
            return "string" == typeof t && (n = e[t], t = e, e =
                    n), re.isFunction(e) ? (i = Q.call(
                    arguments, 2), o = function() {
                    return e.apply(t || this, i.concat(Q.call(
                        arguments)))
                }, o.guid = e.guid = e.guid || re.guid++, o) :
                void 0
        },
        now: Date.now,
        support: ie
    }), "function" == typeof Symbol && (re.fn[Symbol.iterator] = U[
        Symbol.iterator]), re.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol"
        .split(" "), function(e, t) {
            ee["[object " + t + "]"] = t.toLowerCase()
        });
    var ce = function(e) {
        function t(e, t, n, i) {
            var o, r, s, a, l, u, d, f, h = t && t.ownerDocument,
                m = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== m &&
                9 !== m && 11 !== m) return n;
            if (!i && ((t ? t.ownerDocument || t : M) !== j && A(t),
                t = t || j, D)) {
                if (11 !== m && (u = ye.exec(e)))
                    if (o = u[1]) {
                        if (9 === m) {
                            if (!(s = t.getElementById(o))) return n;
                            if (s.id === o) return n.push(s), n
                        } else if (h && (s = h.getElementById(o)) &&
                            q(t, s) && s.id === o) return n.push(s),
                            n
                    } else {
                        if (u[2]) return J.apply(n, t.getElementsByTagName(
                            e)), n;
                        if ((o = u[3]) && w.getElementsByClassName &&
                            t.getElementsByClassName) return J.apply(
                                n, t.getElementsByClassName(o)),
                            n
                    }
                if (w.qsa && !V[e + " "] && (!z || !z.test(e))) {
                    if (1 !== m) h = t, f = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(
                                be, "\\$&") : t.setAttribute("id",
                                a = N), d = C(e), r = d.length, l =
                            pe.test(a) ? "#" + a : "[id='" + a +
                            "']"; r--;) d[r] = l + " " + p(d[r]);
                        f = d.join(","), h = ve.test(e) && c(t.parentNode) ||
                            t
                    }
                    if (f) try {
                        return J.apply(n, h.querySelectorAll(f)),
                            n
                    } catch (g) {} finally {
                        a === N && t.removeAttribute("id")
                    }
                }
            }
            return I(e.replace(ae, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > S.cacheLength &&
                    delete e[t.shift()], e[n + " "] = i
            }
            var t = [];
            return e
        }

        function i(e) {
            return e[N] = !0, e
        }

        function o(e) {
            var t = j.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t =
                    null
            }
        }

        function r(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) S.attrHandle[
                n[i]] = t
        }

        function s(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~
                    t.sourceIndex || Y) - (~e.sourceIndex || Y);
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type ===
                    e
            }
        }

        function u(e) {
            return i(function(t) {
                return t = +t, i(function(n, i) {
                    for (var o, r = e([], n.length,
                        t), s = r.length; s--;) n[o =
                        r[s]] && (n[o] = !(i[o] =
                        n[o]))
                })
            })
        }

        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName &&
                e
        }

        function d() {}

        function p(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++) i +=
                e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir,
                o = n && "parentNode" === i,
                r = F++;
            return t.first ? function(t, n, r) {
                for (; t = t[i];)
                    if (1 === t.nodeType || o) return e(t, n, r)
            } : function(t, n, s) {
                var a, l, u, c = [R, r];
                if (s) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || o) && e(t, n,
                            s)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || o) {
                            if (u = t[N] || (t[N] = {}), l = u[
                                    t.uniqueID] || (u[t.uniqueID] = {}), (
                                    a = l[i]) && a[0] === R &&
                                a[1] === r) return c[2] = a[2];
                            if (l[i] = c, c[2] = e(t, n, s))
                                return !0
                        }
            }
        }

        function h(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function m(e, n, i) {
            for (var o = 0, r = n.length; r > o; o++) t(e, n[o], i);
            return i
        }

        function g(e, t, n, i, o) {
            for (var r, s = [], a = 0, l = e.length, u = null != t; l >
                a; a++)(r = e[a]) && (!n || n(r, i, o)) && (s.push(
                r), u && t.push(a));
            return s
        }

        function y(e, t, n, o, r, s) {
            return o && !o[N] && (o = y(o)), r && !r[N] && (r = y(r,
                s)), i(function(i, s, a, l) {
                var u, c, d, p = [],
                    f = [],
                    h = s.length,
                    y = i || m(t || "*", a.nodeType ? [a] :
                        a, []),
                    v = !e || !i && t ? y : g(y, p, e, a, l),
                    b = n ? r || (i ? e : h || o) ? [] : s :
                    v;
                if (n && n(v, b, a, l), o)
                    for (u = g(b, f), o(u, [], a, l), c = u
                        .length; c--;)(d = u[c]) && (b[f[c]] = !
                        (v[f[c]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (u = [], c = b.length; c--;)
                                (d = b[c]) && u.push(v[c] =
                                    d);
                            r(null, b = [], u, l)
                        }
                        for (c = b.length; c--;)(d = b[c]) &&
                            (u = r ? ee(i, d) : p[c]) > -1 &&
                            (i[u] = !(s[u] = d))
                    }
                } else b = g(b === s ? b.splice(h, b.length) :
                    b), r ? r(null, s, b, l) : J.apply(
                    s, b)
            })
        }

        function v(e) {
            for (var t, n, i, o = e.length, r = S.relative[e[0].type],
                s = r || S.relative[" "], a = r ? 1 : 0, l = f(
                    function(e) {
                        return e === t
                    }, s, !0), u = f(function(e) {
                    return ee(t, e) > -1
                }, s, !0), c = [
                    function(e, n, i) {
                        var o = !r && (i || n !== P) || ((t = n)
                            .nodeType ? l(e, n, i) : u(e, n,
                                i));
                        return t = null, o
                    }
                ]; o > a; a++)
                if (n = S.relative[e[a].type]) c = [f(h(c), n)];
                else {
                    if (n = S.filter[e[a].type].apply(null, e[a].matches),
                        n[N]) {
                        for (i = ++a; o > i && !S.relative[e[i].type]; i++)
                        ;
                        return y(a > 1 && h(c), a > 1 && p(e.slice(
                                0, a - 1).concat({
                                value: " " === e[a - 2]
                                    .type ? "*" : ""
                            })).replace(ae, "$1"), n, i > a &&
                            v(e.slice(a, i)), o > i && v(e = e.slice(
                                i)), o > i && p(e))
                    }
                    c.push(n)
                }
            return h(c)
        }

        function b(e, n) {
            var o = n.length > 0,
                r = e.length > 0,
                s = function(i, s, a, l, u) {
                    var c, d, p, f = 0,
                        h = "0",
                        m = i && [],
                        y = [],
                        v = P,
                        b = i || r && S.find.TAG("*", u),
                        x = R += null == v ? 1 : Math.random() || .1,
                        w = b.length;
                    for (u && (P = s === j || s || u); h !== w &&
                        null != (c = b[h]); h++) {
                        if (r && c) {
                            for (d = 0, s || c.ownerDocument === j ||
                                (A(c), a = !D); p = e[d++];)
                                if (p(c, s || j, a)) {
                                    l.push(c);
                                    break
                                }
                            u && (R = x)
                        }
                        o && ((c = !p && c) && f--, i && m.push(c))
                    }
                    if (f += h, o && h !== f) {
                        for (d = 0; p = n[d++];) p(m, y, s, a);
                        if (i) {
                            if (f > 0)
                                for (; h--;) m[h] || y[h] || (y[h] =
                                    Q.call(l));
                            y = g(y)
                        }
                        J.apply(l, y), u && !i && y.length > 0 && f +
                            n.length > 1 && t.uniqueSort(l)
                    }
                    return u && (R = x, P = v), m
                };
            return o ? i(s) : s
        }
        var x, w, S, T, k, C, E, I, P, O, L, A, j, $, D, z, H, _, q, N =
            "sizzle" + 1 * new Date,
            M = e.document,
            R = 0,
            F = 0,
            W = n(),
            B = n(),
            V = n(),
            X = function(e, t) {
                return e === t && (L = !0), 0
            },
            Y = 1 << 31,
            U = {}.hasOwnProperty,
            Z = [],
            Q = Z.pop,
            G = Z.push,
            J = Z.push,
            K = Z.slice,
            ee = function(e, t) {
                for (var n = 0, i = e.length; i > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" +
            ne +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
            ie + "))|)" + ne + "*\\]",
            re = ":(" + ie +
            ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            oe + ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
                ne + "+$", "g"),
            le = new RegExp("^" + ne + "*," + ne + "*"),
            ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]",
                "g"),
            de = new RegExp(re),
            pe = new RegExp("^" + ie + "$"),
            fe = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + re),
                CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne +
                    "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne +
                    "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    ne + "*((?:-\\d)?\\d*)" + ne +
                    "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ge = /^[^{]+\{\s*\[native \w/,
            ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ve = /[+~]/,
            be = /'|\\/g,
            xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne +
                ")|.)", "ig"),
            we = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : 0 > i ? String.fromCharCode(i +
                    65536) : String.fromCharCode(i >> 10 | 55296,
                    1023 & i | 56320)
            },
            Se = function() {
                A()
            };
        try {
            J.apply(Z = K.call(M.childNodes), M.childNodes), Z[M.childNodes
                .length].nodeType
        } catch (Te) {
            J = {
                apply: Z.length ? function(e, t) {
                    G.apply(e, K.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];)
                    ;
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, k = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, A = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : M;
            return i !== j && 9 === i.nodeType && i.documentElement ?
                (j = i, $ = j.documentElement, D = !k(j), (n = j.defaultView) &&
                    n.top !== n && (n.addEventListener ? n.addEventListener(
                        "unload", Se, !1) : n.attachEvent && n.attachEvent(
                        "onunload", Se)), w.attributes = o(function(
                        e) {
                        return e.className = "i", !e.getAttribute(
                            "className")
                    }), w.getElementsByTagName = o(function(e) {
                        return e.appendChild(j.createComment("")), !
                            e.getElementsByTagName("*").length
                    }), w.getElementsByClassName = ge.test(j.getElementsByClassName),
                    w.getById = o(function(e) {
                        return $.appendChild(e).id = N, !j.getElementsByName ||
                            !j.getElementsByName(N).length
                    }), w.getById ? (S.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById &&
                            D) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }, S.filter.ID = function(e) {
                        var t = e.replace(xe, we);
                        return function(e) {
                            return e.getAttribute("id") ===
                                t
                        }
                    }) : (delete S.find.ID, S.filter.ID = function(
                        e) {
                        var t = e.replace(xe, we);
                        return function(e) {
                            var n = "undefined" != typeof e
                                .getAttributeNode && e.getAttributeNode(
                                    "id");
                            return n && n.value === t
                        }
                    }), S.find.TAG = w.getElementsByTagName ?
                    function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ?
                            t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(
                                e) : void 0
                    } : function(e, t) {
                        var n, i = [],
                            o = 0,
                            r = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = r[o++];) 1 === n.nodeType &&
                                i.push(n);
                            return i
                        }
                        return r
                    }, S.find.CLASS = w.getElementsByClassName &&
                    function(e, t) {
                        return "undefined" != typeof t.getElementsByClassName &&
                            D ? t.getElementsByClassName(e) : void 0
                    }, H = [], z = [], (w.qsa = ge.test(j.querySelectorAll)) &&
                    (o(function(e) {
                        $.appendChild(e).innerHTML =
                            "<a id='" + N +
                            "'></a><select id='" + N +
                            "-\r\\' msallowcapture=''><option selected=''></option></select>",
                            e.querySelectorAll(
                                "[msallowcapture^='']").length &&
                            z.push("[*^$]=" + ne +
                                "*(?:''|\"\")"), e.querySelectorAll(
                                "[selected]").length || z.push(
                                "\\[" + ne + "*(?:value|" +
                                te + ")"), e.querySelectorAll(
                                "[id~=" + N + "-]").length ||
                            z.push("~="), e.querySelectorAll(
                                ":checked").length || z.push(
                                ":checked"), e.querySelectorAll(
                                "a#" + N + "+*").length ||
                            z.push(".#.+[+~]")
                    }), o(function(e) {
                        var t = j.createElement("input");
                        t.setAttribute("type", "hidden"), e
                            .appendChild(t).setAttribute(
                                "name", "D"), e.querySelectorAll(
                                "[name=d]").length && z.push(
                                "name" + ne + "*[*^$|!~]?="
                            ), e.querySelectorAll(
                                ":enabled").length || z.push(
                                ":enabled", ":disabled"), e
                            .querySelectorAll("*,:x"), z.push(
                                ",.*:")
                    })), (w.matchesSelector = ge.test(_ = $.matches ||
                        $.webkitMatchesSelector || $.mozMatchesSelector ||
                        $.oMatchesSelector || $.msMatchesSelector
                    )) && o(function(e) {
                        w.disconnectedMatch = _.call(e, "div"),
                            _.call(e, "[s!='']:x"), H.push("!=",
                                re)
                    }), z = z.length && new RegExp(z.join("|")), H =
                    H.length && new RegExp(H.join("|")), t = ge.test(
                        $.compareDocumentPosition), q = t || ge.test(
                        $.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement :
                            e,
                            i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType ||
                            !(n.contains ? n.contains(i) : e.compareDocumentPosition &&
                                16 & e.compareDocumentPosition(
                                    i)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, X = t ? function(e, t) {
                        if (e === t) return L = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) ===
                            (t.ownerDocument || t) ? e.compareDocumentPosition(
                                t) : 1, 1 & n || !w.sortDetached &&
                            t.compareDocumentPosition(e) === n ?
                            e === j || e.ownerDocument === M &&
                            q(M, e) ? -1 : t === j || t.ownerDocument ===
                            M && q(M, t) ? 1 : O ? ee(O, e) -
                            ee(O, t) : 0 : 4 & n ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return L = !0, 0;
                        var n, i = 0,
                            o = e.parentNode,
                            r = t.parentNode,
                            a = [e],
                            l = [t];
                        if (!o || !r) return e === j ? -1 : t === j ?
                            1 : o ? -1 : r ? 1 : O ? ee(O, e) -
                            ee(O, t) : 0;
                        if (o === r) return s(e, t);
                        for (n = e; n = n.parentNode;) a.unshift(n);
                        for (n = t; n = n.parentNode;) l.unshift(n);
                        for (; a[i] === l[i];) i++;
                        return i ? s(a[i], l[i]) : a[i] === M ? -1 :
                            l[i] === M ? 1 : 0
                    }, j) : j
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== j && A(e), n = n.replace(
                ce, "='$1']"), w.matchesSelector && D && !V[n +
                " "] && (!H || !H.test(n)) && (!z || !z.test(n)))
                try {
                    var i = _.call(e, n);
                    if (i || w.disconnectedMatch || e.document &&
                        11 !== e.document.nodeType) return i
                } catch (o) {}
            return t(n, j, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== j && A(e), q(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== j && A(e);
            var n = S.attrHandle[t.toLowerCase()],
                i = n && U.call(S.attrHandle, t.toLowerCase()) ? n(
                    e, t, !D) : void 0;
            return void 0 !== i ? i : w.attributes || !D ? e.getAttribute(
                    t) : (i = e.getAttributeNode(t)) && i.specified ?
                i.value : null
        }, t.error = function(e) {
            throw new Error(
                "Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                i = 0,
                o = 0;
            if (L = !w.detectDuplicates, O = !w.sortStable && e.slice(
                0), e.sort(X), L) {
                for (; t = e[o++];) t === e[o] && (i = n.push(o));
                for (; i--;) e.splice(n[i], 1)
            }
            return O = null, e
        }, T = t.getText = function(e) {
            var t, n = "",
                i = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n +=
                        T(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[i++];) n += T(t);
            return n
        }, S = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xe, we), e[3] =
                        (e[3] || e[4] || e[5] || "").replace(xe,
                            we), "~=" === e[2] && (e[3] = " " +
                            e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" ===
                        e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                            e[4] = +(e[4] ? e[5] + (e[6] || 1) :
                                2 * ("even" === e[3] || "odd" ===
                                    e[3])), e[5] = +(e[7] + e[8] ||
                                "odd" === e[3])) : e[3] && t.error(
                            e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ?
                        e[2] = e[4] || e[5] || "" : n && de
                        .test(n) && (t = C(n, !0)) && (t =
                            n.indexOf(")", n.length - t) -
                            n.length) && (e[0] = e[0].slice(
                            0, t), e[2] = n.slice(0, t)), e
                        .slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(xe, we).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() ===
                            t
                    }
                },
                CLASS: function(e) {
                    var t = W[e + " "];
                    return t || (t = new RegExp("(^|" + ne +
                        ")" + e + "(" + ne + "|$)")) && W(e,
                        function(e) {
                            return t.test("string" ==
                                typeof e.className && e
                                .className ||
                                "undefined" != typeof e
                                .getAttribute && e.getAttribute(
                                    "class") || "")
                        })
                },
                ATTR: function(e, n, i) {
                    return function(o) {
                        var r = t.attr(o, e);
                        return null == r ? "!=" === n : n ?
                            (r += "", "=" === n ? r === i :
                                "!=" === n ? r !== i : "^=" ===
                                n ? i && 0 === r.indexOf(i) :
                                "*=" === n ? i && r.indexOf(
                                    i) > -1 : "$=" === n ?
                                i && r.slice(-i.length) ===
                                i : "~=" === n ? (" " + r.replace(
                                    se, " ") + " ").indexOf(
                                    i) > -1 : "|=" === n ?
                                r === i || r.slice(0, i.length +
                                    1) === i + "-" : !1) :
                            !0
                    }
                },
                CHILD: function(e, t, n, i, o) {
                    var r = "nth" !== e.slice(0, 3),
                        s = "last" !== e.slice(-4),
                        a = "of-type" === t;
                    return 1 === i && 0 === o ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var u, c, d, p, f, h, m = r !== s ?
                            "nextSibling" :
                            "previousSibling",
                            g = t.parentNode,
                            y = a && t.nodeName.toLowerCase(),
                            v = !l && !a,
                            b = !1;
                        if (g) {
                            if (r) {
                                for (; m;) {
                                    for (p = t; p = p[m];)
                                        if (a ? p.nodeName.toLowerCase() ===
                                            y : 1 === p.nodeType
                                        ) return !1;
                                    h = m = "only" === e &&
                                        !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [s ? g.firstChild : g.lastChild],
                                s && v) {
                                for (p = g, d = p[N] || (p[
                                        N] = {}), c = d[p.uniqueID] ||
                                    (d[p.uniqueID] = {}), u =
                                    c[e] || [], f = u[0] ===
                                    R && u[1], b = f && u[2],
                                    p = f && g.childNodes[f]; p = ++
                                    f && p && p[m] || (b =
                                        f = 0) || h.pop();)
                                    if (1 === p.nodeType &&
                                        ++b && p === t) {
                                        c[e] = [R, f, b];
                                        break
                                    }
                            } else if (v && (p = t, d = p[N] ||
                                    (p[N] = {}), c = d[p.uniqueID] ||
                                    (d[p.uniqueID] = {}), u =
                                    c[e] || [], f = u[0] ===
                                    R && u[1], b = f), b ===
                                !1)
                                for (;
                                    (p = ++f && p && p[m] ||
                                        (b = f = 0) || h.pop()
                                    ) && ((a ? p.nodeName.toLowerCase() !==
                                        y : 1 !== p.nodeType
                                    ) || !++b || (v &&
                                        (d = p[N] || (p[
                                                N] = {}),
                                            c = d[p.uniqueID] ||
                                            (d[p.uniqueID] = {}),
                                            c[e] = [R,
                                                b
                                            ]), p !== t
                                    )););
                            return b -= o, b === i || b % i ===
                                0 && b / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var o, r = S.pseudos[e] || S.setFilters[e.toLowerCase()] ||
                        t.error("unsupported pseudo: " + e);
                    return r[N] ? r(n) : r.length > 1 ? (o = [e,
                            e, "", n
                        ], S.setFilters.hasOwnProperty(e.toLowerCase()) ?
                        i(function(e, t) {
                            for (var i, o = r(e, n), s =
                                o.length; s--;) i = ee(
                                e, o[s]), e[i] = !(
                                t[i] = o[s])
                        }) : function(e) {
                            return r(e, 0, o)
                        }) : r
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        o = E(e.replace(ae, "$1"));
                    return o[N] ? i(function(e, t, n, i) {
                        for (var r, s = o(e, null,
                            i, []), a = e.length; a--;)
                            (r = s[a]) && (e[a] = !
                                (t[a] = r))
                    }) : function(e, i, r) {
                        return t[0] = e, o(t, null, r,
                            n), t[0] = null, !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(xe, we),
                        function(t) {
                            return (t.textContent || t.innerText ||
                                T(t)).indexOf(e) > -1
                        }
                }),
                lang: i(function(e) {
                    return pe.test(e || "") || t.error(
                            "unsupported lang: " + e), e =
                        e.replace(xe, we).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = D ? t.lang : t.getAttribute(
                                    "xml:lang") || t.getAttribute(
                                    "lang")) return n = n.toLowerCase(),
                                    n === e || 0 === n.indexOf(
                                        e + "-");
                            while ((t = t.parentNode) && 1 ===
                                t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === $
                },
                focus: function(e) {
                    return e === j.activeElement && (!j.hasFocus ||
                        j.hasFocus()) && !!(e.type || e.href ||
                        ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked ||
                        "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                        e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !S.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type ||
                        "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() &&
                        "text" === e.type && (null == (t = e.getAttribute(
                            "type")) || "text" === t.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: u(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: u(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >=
                        0;) e.push(i);
                    return e
                }),
                gt: u(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;)
                        e.push(i);
                    return e
                })
            }
        }, S.pseudos.nth = S.pseudos.eq;
        for (x in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) S.pseudos[x] = a(x);
        for (x in {
            submit: !0,
            reset: !0
        }) S.pseudos[x] = l(x);
        return d.prototype = S.filters = S.pseudos, S.setFilters = new d,
            C = t.tokenize = function(e, n) {
                var i, o, r, s, a, l, u, c = B[e + " "];
                if (c) return n ? 0 : c.slice(0);
                for (a = e, l = [], u = S.preFilter; a;) {
                    (!i || (o = le.exec(a))) && (o && (a = a.slice(o[0]
                        .length) || a), l.push(r = [])), i = !1, (o =
                        ue.exec(a)) && (i = o.shift(), r.push({
                        value: i,
                        type: o[0].replace(ae, " ")
                    }), a = a.slice(i.length));
                    for (s in S.filter)!(o = fe[s].exec(a)) || u[s] &&
                        !(o = u[s](o)) || (i = o.shift(), r.push({
                            value: i,
                            type: s,
                            matches: o
                        }), a = a.slice(i.length));
                    if (!i) break
                }
                return n ? a.length : a ? t.error(e) : B(e, l).slice(0)
            }, E = t.compile = function(e, t) {
                var n, i = [],
                    o = [],
                    r = V[e + " "];
                if (!r) {
                    for (t || (t = C(e)), n = t.length; n--;) r = v(t[n]),
                        r[N] ? i.push(r) : o.push(r);
                    r = V(e, b(o, i)), r.selector = e
                }
                return r
            }, I = t.select = function(e, t, n, i) {
                var o, r, s, a, l, u = "function" == typeof e && e,
                    d = !i && C(e = u.selector || e);
                if (n = n || [], 1 === d.length) {
                    if (r = d[0] = d[0].slice(0), r.length > 2 && "ID" ===
                        (s = r[0]).type && w.getById && 9 === t.nodeType &&
                        D && S.relative[r[1].type]) {
                        if (t = (S.find.ID(s.matches[0].replace(xe, we),
                            t) || [])[0], !t) return n;
                        u && (t = t.parentNode), e = e.slice(r.shift().value
                            .length)
                    }
                    for (o = fe.needsContext.test(e) ? 0 : r.length; o--
                        && (s = r[o], !S.relative[a = s.type]);)
                        if ((l = S.find[a]) && (i = l(s.matches[0].replace(
                                xe, we), ve.test(r[0].type) &&
                            c(t.parentNode) || t))) {
                            if (r.splice(o, 1), e = i.length && p(r), !
                                e) return J.apply(n, i), n;
                            break
                        }
                }
                return (u || E(e, d))(i, t, !D, n, !t || ve.test(e) &&
                    c(t.parentNode) || t), n
            }, w.sortStable = N.split("").sort(X).join("") === N, w.detectDuplicates = !
            !L, A(), w.sortDetached = o(function(e) {
                return 1 & e.compareDocumentPosition(j.createElement(
                    "div"))
            }), o(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild
                    .getAttribute("href")
            }) || r("type|href|height|width", function(e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ?
                    1 : 2)
            }), w.attributes && o(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute(
                    "value", ""), "" === e.firstChild.getAttribute(
                    "value")
            }) || r("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ?
                    void 0 : e.defaultValue
            }), o(function(e) {
                return null == e.getAttribute("disabled")
            }) || r(te, function(e, t, n) {
                var i;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() :
                    (i = e.getAttributeNode(t)) && i.specified ? i.value :
                    null
            }), t
    }(e);
    re.find = ce, re.expr = ce.selectors, re.expr[":"] = re.expr.pseudos,
        re.uniqueSort = re.unique = ce.uniqueSort, re.text = ce.getText, re
        .isXMLDoc = ce.isXML, re.contains = ce.contains;
    var de = function(e, t, n) {
            for (var i = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && re(e).is(n)) break;
                    i.push(e)
                }
            return i
        },
        pe = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !==
                t && n.push(e);
            return n
        },
        fe = re.expr.match.needsContext,
        he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        me = /^.[^:#\[\.,]*$/;
    re.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ?
            re.find.matchesSelector(i, e) ? [i] : [] : re.find.matches(
                e, re.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
    }, re.fn.extend({
        find: function(e) {
            var t, n = this.length,
                i = [],
                o = this;
            if ("string" != typeof e) return this.pushStack(re(
                e).filter(function() {
                for (t = 0; n > t; t++)
                    if (re.contains(o[t], this))
                        return !0
            }));
            for (t = 0; n > t; t++) re.find(e, o[t], i);
            return i = this.pushStack(n > 1 ? re.unique(i) : i),
                i.selector = this.selector ? this.selector +
                " " + e : e, i
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && fe.test(e) ?
                re(e) : e || [], !1).length
        }
    });
    var ge, ye = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ve = re.fn.init = function(e, t, n) {
            var i, o;
            if (!e) return this;
            if (n = n || ge, "string" == typeof e) {
                if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >=
                    3 ? [null, e, null] : ye.exec(e), !i || !i[1] && t)
                    return !t || t.jquery ? (t || n).find(e) : this.constructor(
                        t).find(e);
                if (i[1]) {
                    if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(
                        i[1], t && t.nodeType ? t.ownerDocument ||
                        t : Z, !0)), he.test(i[1]) && re.isPlainObject(
                        t))
                        for (i in t) re.isFunction(this[i]) ? this[i](t[i]) :
                            this.attr(i, t[i]);
                    return this
                }
                return o = Z.getElementById(i[2]), o && o.parentNode && (
                        this.length = 1, this[0] = o), this.context = Z,
                    this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length =
                1, this) : re.isFunction(e) ? void 0 !== n.ready ? n.ready(
                e) : e(re) : (void 0 !== e.selector && (this.selector =
                e.selector, this.context = e.context), re.makeArray(
                e, this))
        };
    ve.prototype = re.fn, ge = re(Z);
    var be = /^(?:parents|prev(?:Until|All))/,
        xe = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    re.fn.extend({
        has: function(e) {
            var t = re(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++)
                    if (re.contains(this, t[e])) return
                        !0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0, o = this.length, r = [], s = fe.test(
                e) || "string" != typeof e ? re(e, t ||
                this.context) : 0; o > i; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? s.index(n) > -1 :
                        1 === n.nodeType && re.find.matchesSelector(
                            n, e))) {
                        r.push(n);
                        break
                    }
            return this.pushStack(r.length > 1 ? re.uniqueSort(
                r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? K.call(re(e),
                    this[0]) : K.call(this, e.jquery ? e[0] : e) :
                this[0] && this[0].parentNode ? this.first().prevAll()
                .length : -1
        },
        add: function(e, t) {
            return this.pushStack(re.uniqueSort(re.merge(this.get(),
                re(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject
                .filter(e))
        }
    }), re.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return de(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return de(e, "parentNode", n)
        },
        next: function(e) {
            return o(e, "nextSibling")
        },
        prev: function(e) {
            return o(e, "previousSibling")
        },
        nextAll: function(e) {
            return de(e, "nextSibling")
        },
        prevAll: function(e) {
            return de(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return de(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return de(e, "previousSibling", n)
        },
        siblings: function(e) {
            return pe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return pe(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || re.merge([], e.childNodes)
        }
    }, function(e, t) {
        re.fn[e] = function(n, i) {
            var o = re.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i &&
                "string" == typeof i && (o = re.filter(i, o)),
                this.length > 1 && (xe[e] || re.uniqueSort(o),
                    be.test(e) && o.reverse()), this.pushStack(
                    o)
        }
    });
    var we = /\S+/g;
    re.Callbacks = function(e) {
        e = "string" == typeof e ? r(e) : re.extend({}, e);
        var t, n, i, o, s = [],
            a = [],
            l = -1,
            u = function() {
                for (o = e.once, i = t = !0; a.length; l = -1)
                    for (n = a.shift(); ++l < s.length;) s[l].apply(n[0],
                        n[1]) === !1 && e.stopOnFalse && (l = s.length,
                        n = !1);
                e.memory || (n = !1), t = !1, o && (s = n ? [] : "")
            },
            c = {
                add: function() {
                    return s && (n && !t && (l = s.length - 1, a.push(
                        n)), function i(t) {
                        re.each(t, function(t, n) {
                            re.isFunction(n) ? e.unique &&
                                c.has(n) || s.push(
                                    n) : n && n.length &&
                                "string" !== re.type(
                                    n) && i(n)
                        })
                    }(arguments), n && !t && u()), this
                },
                remove: function() {
                    return re.each(arguments, function(e, t) {
                        for (var n;
                            (n = re.inArray(t, s, n)) > -1;
                        ) s.splice(n, 1), l >= n && l--
                    }), this
                },
                has: function(e) {
                    return e ? re.inArray(e, s) > -1 : s.length > 0
                },
                empty: function() {
                    return s && (s = []), this
                },
                disable: function() {
                    return o = a = [], s = n = "", this
                },
                disabled: function() {
                    return !s
                },
                lock: function() {
                    return o = a = [], n || (s = n = ""), this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(e, n) {
                    return o || (n = n || [], n = [e, n.slice ? n.slice() :
                        n
                    ], a.push(n), t || u()), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return c
    }, re.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", re.Callbacks(
                        "once memory"), "resolved"],
                    ["reject", "fail", re.Callbacks(
                        "once memory"), "rejected"],
                    ["notify", "progress", re.Callbacks(
                        "memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(
                            arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return re.Deferred(function(n) {
                            re.each(t, function(t,
                                r) {
                                var s = re.isFunction(
                                    e[t]
                                ) && e[
                                    t];
                                o[r[1]](
                                    function() {
                                        var
                                            e =
                                            s &&
                                            s
                                            .apply(
                                                this,
                                                arguments
                                            );
                                        e
                                            &&
                                            re
                                            .isFunction(
                                                e
                                                .promise
                                            ) ?
                                            e
                                            .promise()
                                            .progress(
                                                n
                                                .notify
                                            )
                                            .done(
                                                n
                                                .resolve
                                            )
                                            .fail(
                                                n
                                                .reject
                                            ) :
                                            n[
                                                r[
                                                    0
                                                ] +
                                                "With"
                                            ]
                                            (
                                                this ===
                                                i ?
                                                n
                                                .promise() :
                                                this,
                                                s ? [
                                                    e
                                                ] :
                                                arguments
                                            )
                                    })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? re.extend(e, i) :
                            i
                    }
                },
                o = {};
            return i.pipe = i.then, re.each(t, function(e, r) {
                var s = r[2],
                    a = r[3];
                i[r[1]] = s.add, a && s.add(function() {
                        n = a
                    }, t[1 ^ e][2].disable, t[2][2]
                    .lock), o[r[0]] = function() {
                    return o[r[0] + "With"](this ===
                        o ? i : this, arguments
                    ), this
                }, o[r[0] + "With"] = s.fireWith
            }), i.promise(o), e && e.call(o, o), o
        },
        when: function(e) {
            var t, n, i, o = 0,
                r = Q.call(arguments),
                s = r.length,
                a = 1 !== s || e && re.isFunction(e.promise) ?
                s : 0,
                l = 1 === a ? e : re.Deferred(),
                u = function(e, n, i) {
                    return function(o) {
                        n[e] = this, i[e] = arguments.length >
                            1 ? Q.call(arguments) : o, i ===
                            t ? l.notifyWith(n, i) : --a ||
                            l.resolveWith(n, i)
                    }
                };
            if (s > 1)
                for (t = new Array(s), n = new Array(s), i =
                    new Array(s); s > o; o++) r[o] && re.isFunction(
                        r[o].promise) ? r[o].promise().progress(
                        u(o, n, t)).done(u(o, i, r)).fail(l.reject) :
                    --a;
            return a || l.resolveWith(i, r), l.promise()
        }
    });
    var Se;
    re.fn.ready = function(e) {
        return re.ready.promise().done(e), this
    }, re.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? re.readyWait++ : re.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --re.readyWait : re.isReady) || (re.isReady = !
                0, e !== !0 && --re.readyWait > 0 || (Se.resolveWith(
                    Z, [re]), re.fn.triggerHandler && (re(Z)
                    .triggerHandler("ready"), re(Z).off(
                        "ready"))))
        }
    }), re.ready.promise = function(t) {
        return Se || (Se = re.Deferred(), "complete" === Z.readyState ||
            "loading" !== Z.readyState && !Z.documentElement.doScroll ?
            e.setTimeout(re.ready) : (Z.addEventListener(
                "DOMContentLoaded", s), e.addEventListener(
                "load", s))), Se.promise(t)
    }, re.ready.promise();
    var Te = function(e, t, n, i, o, r, s) {
            var a = 0,
                l = e.length,
                u = null == n;
            if ("object" === re.type(n)) {
                o = !0;
                for (a in n) Te(e, t, a, n[a], !0, r, s)
            } else if (void 0 !== i && (o = !0, re.isFunction(i) || (s = !0),
                u && (s ? (t.call(e, i), t = null) : (u = t, t =
                    function(e, t, n) {
                        return u.call(re(e), n)
                    })), t))
                for (; l > a; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a],
                    n)));
            return o ? e : u ? t.call(e) : l ? t(e[0], n) : r
        },
        ke = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    a.uid = 1, a.prototype = {
        register: function(e, t) {
            var n = t || {};
            return e.nodeType ? e[this.expando] = n : Object.defineProperty(
                e, this.expando, {
                    value: n,
                    writable: !0,
                    configurable: !0
                }), e[this.expando]
        },
        cache: function(e) {
            if (!ke(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, ke(e) && (e.nodeType ? e[this.expando] =
                t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
        },
        set: function(e, t, n) {
            var i, o = this.cache(e);
            if ("string" == typeof t) o[t] = n;
            else
                for (i in t) o[i] = t[i];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] &&
                e[this.expando][t]
        },
        access: function(e, t, n) {
            var i;
            return void 0 === t || t && "string" == typeof t &&
                void 0 === n ? (i = this.get(e, t), void 0 !== i ?
                    i : this.get(e, re.camelCase(t))) : (this.set(e,
                    t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, i, o, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 === t) this.register(e);
                else {
                    re.isArray(t) ? i = t.concat(t.map(re.camelCase)) :
                        (o = re.camelCase(t), t in r ? i = [t, o] :
                            (i = o, i = i in r ? [i] : i.match(we) || [])
                        ), n = i.length;
                    for (; n--;) delete r[i[n]]
                }(void 0 === t || re.isEmptyObject(r)) && (e.nodeType ?
                    e[this.expando] = void 0 : delete e[this.expando]
                )
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !re.isEmptyObject(t)
        }
    };
    var Ce = new a,
        Ee = new a,
        Ie = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Pe = /[A-Z]/g;
    re.extend({
        hasData: function(e) {
            return Ee.hasData(e) || Ce.hasData(e)
        },
        data: function(e, t, n) {
            return Ee.access(e, t, n)
        },
        removeData: function(e, t) {
            Ee.remove(e, t)
        },
        _data: function(e, t, n) {
            return Ce.access(e, t, n)
        },
        _removeData: function(e, t) {
            Ce.remove(e, t)
        }
    }), re.fn.extend({
        data: function(e, t) {
            var n, i, o, r = this[0],
                s = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (o = Ee.get(r), 1 === r.nodeType &&
                    !Ce.get(r, "hasDataAttrs"))) {
                    for (n = s.length; n--;) s[n] && (i = s[n].name,
                        0 === i.indexOf("data-") && (i = re
                            .camelCase(i.slice(5)), l(r, i,
                                o[i])));
                    Ce.set(r, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function() {
                Ee.set(this, e)
            }) : Te(this, function(t) {
                var n, i;
                if (r && void 0 === t) {
                    if (n = Ee.get(r, e) || Ee.get(r, e
                        .replace(Pe, "-$&").toLowerCase()
                    ), void 0 !== n) return n;
                    if (i = re.camelCase(e), n = Ee.get(
                        r, i), void 0 !== n) return n;
                    if (n = l(r, i, void 0), void 0 !==
                        n) return n
                } else i = re.camelCase(e), this.each(
                    function() {
                        var n = Ee.get(this, i);
                        Ee.set(this, i, t), e.indexOf(
                                "-") > -1 && void 0 !==
                            n && Ee.set(this, e, t)
                    })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Ee.remove(this, e)
            })
        }
    }), re.extend({
        queue: function(e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue", i = Ce.get(e,
                    t), n && (!i || re.isArray(n) ? i = Ce.access(
                    e, t, re.makeArray(n)) : i.push(n)), i || []) :
                void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = re.queue(e, t),
                i = n.length,
                o = n.shift(),
                r = re._queueHooks(e, t),
                s = function() {
                    re.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), i--), o && (
                    "fx" === t && n.unshift("inprogress"),
                    delete r.stop, o.call(e, s, r)), !i && r &&
                r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Ce.get(e, n) || Ce.access(e, n, {
                empty: re.Callbacks("once memory").add(
                    function() {
                        Ce.remove(e, [t + "queue",
                            n
                        ])
                    })
            })
        }
    }), re.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--),
                arguments.length < n ? re.queue(this[0], e) :
                void 0 === t ? this : this.each(function() {
                    var n = re.queue(this, e, t);
                    re._queueHooks(this, e), "fx" === e &&
                        "inprogress" !== n[0] && re.dequeue(
                            this, e)
                })
        },
        dequeue: function(e) {
            return this.each(function() {
                re.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1,
                o = re.Deferred(),
                r = this,
                s = this.length,
                a = function() {
                    --i || o.resolveWith(r, [r])
                };
            for ("string" != typeof e && (t = e, e = void 0), e =
                e || "fx"; s--;) n = Ce.get(r[s], e +
                "queueHooks"), n && n.empty && (i++, n.empty
                .add(a));
            return a(), o.promise(t)
        }
    });
    var Oe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Le = new RegExp("^(?:([+-])=|)(" + Oe + ")([a-z%]*)$", "i"),
        Ae = ["Top", "Right", "Bottom", "Left"],
        je = function(e, t) {
            return e = t || e, "none" === re.css(e, "display") || !re.contains(
                e.ownerDocument, e)
        },
        $e = /^(?:checkbox|radio)$/i,
        De = /<([\w:-]+)/,
        ze = /^$|\/(?:java|ecma)script/i,
        He = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    He.optgroup = He.option, He.tbody = He.tfoot = He.colgroup = He.caption =
        He.thead, He.th = He.td;
    var _e = /<|&#?\w+;/;
    ! function() {
        var e = Z.createDocumentFragment(),
            t = e.appendChild(Z.createElement("div")),
            n = Z.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked",
                "checked"), n.setAttribute("name", "t"), t.appendChild(n),
            ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
            t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t
            .cloneNode(!0).lastChild.defaultValue
    }();
    var qe = /^key/,
        Ne = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Me = /^([^.]*)(?:\.(.+)|)/;
    re.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, s, a, l, u, c, d, p, f, h, m, g = Ce.get(e);
            if (g)
                for (n.handler && (r = n, n = r.handler, o = r.selector),
                    n.guid || (n.guid = re.guid++), (l = g.events) ||
                    (l = g.events = {}), (s = g.handle) || (s = g.handle =
                        function(t) {
                            return "undefined" != typeof re && re.event
                                .triggered !== t.type ? re.event.dispatch
                                .apply(e, arguments) : void 0
                        }), t = (t || "").match(we) || [""], u = t.length; u--;
                ) a = Me.exec(t[u]) || [], f = m = a[1], h = (a[2] ||
                    "").split(".").sort(), f && (d = re.event.special[
                        f] || {}, f = (o ? d.delegateType : d.bindType) ||
                    f, d = re.event.special[f] || {}, c = re.extend({
                        type: f,
                        origType: m,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && re.expr.match.needsContext
                            .test(o),
                        namespace: h.join(".")
                    }, r), (p = l[f]) || (p = l[f] = [], p.delegateCount =
                        0, d.setup && d.setup.call(e, i, h, s) !==
                        !1 || e.addEventListener && e.addEventListener(
                            f, s)), d.add && (d.add.call(e, c),
                        c.handler.guid || (c.handler.guid = n.guid)
                    ), o ? p.splice(p.delegateCount++, 0, c) :
                    p.push(c), re.event.global[f] = !0)
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, u, c, d, p, f, h, m, g = Ce.hasData(e) &&
                Ce.get(e);
            if (g && (l = g.events)) {
                for (t = (t || "").match(we) || [""], u = t.length; u--;)
                    if (a = Me.exec(t[u]) || [], f = m = a[1], h =
                        (a[2] || "").split(".").sort(), f) {
                        for (d = re.event.special[f] || {}, f = (i ?
                                d.delegateType : d.bindType) || f,
                            p = l[f] || [], a = a[2] && new RegExp(
                                "(^|\\.)" + h.join("\\.(?:.*\\.|)") +
                                "(\\.|$)"), s = r = p.length; r--;)
                            c = p[r], !o && m !== c.origType || n &&
                            n.guid !== c.guid || a && !a.test(c.namespace) ||
                            i && i !== c.selector && ("**" !== i ||
                                !c.selector) || (p.splice(r, 1), c.selector &&
                                p.delegateCount--, d.remove && d.remove
                                .call(e, c));
                        s && !p.length && (d.teardown && d.teardown
                            .call(e, h, g.handle) !== !1 || re.removeEvent(
                                e, f, g.handle), delete l[f])
                    } else
                        for (f in l) re.event.remove(e, f + t[u], n,
                            i, !0);
                re.isEmptyObject(l) && Ce.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            e = re.event.fix(e);
            var t, n, i, o, r, s = [],
                a = Q.call(arguments),
                l = (Ce.get(this, "events") || {})[e.type] || [],
                u = re.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !u.preDispatch ||
                u.preDispatch.call(this, e) !== !1) {
                for (s = re.event.handlers.call(this, e, l), t = 0;
                    (o = s[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = o.elem, n = 0;
                        (r = o.handlers[n++]) && !e.isImmediatePropagationStopped();
                    )(!e.rnamespace || e.rnamespace.test(r.namespace)) &&
                        (e.handleObj = r, e.data = r.data, i = ((re
                                .event.special[r.origType] || {}
                            ).handle || r.handler).apply(o.elem, a),
                            void 0 !== i && (e.result = i) === !1 &&
                            (e.preventDefault(), e.stopPropagation())
                        );
                return u.postDispatch && u.postDispatch.call(this,
                    e), e.result
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, s = [],
                a = t.delegateCount,
                l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) ||
                e.button < 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 ||
                        "click" !== e.type)) {
                        for (i = [], n = 0; a > n; n++) r = t[n], o =
                            r.selector + " ", void 0 === i[o] && (i[
                                o] = r.needsContext ? re(o,
                                this).index(l) > -1 : re.find(o,
                                this, null, [l]).length), i[o] && i
                            .push(r);
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return a < t.length && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which"
            .split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ?
                    t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement"
                .split(" "),
            filter: function(e, t) {
                var n, i, o, r = t.button;
                return null == e.pageX && null != t.clientX && (n =
                    e.target.ownerDocument || Z, i = n.documentElement,
                    o = n.body, e.pageX = t.clientX + (i && i.scrollLeft ||
                        o && o.scrollLeft || 0) - (i && i.clientLeft ||
                        o && o.clientLeft || 0), e.pageY = t.clientY +
                    (i && i.scrollTop || o && o.scrollTop || 0) -
                    (i && i.clientTop || o && o.clientTop || 0)
                ), e.which || void 0 === r || (e.which = 1 & r ?
                    1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[re.expando]) return e;
            var t, n, i, o = e.type,
                r = e,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Ne.test(o) ? this.mouseHooks :
                    qe.test(o) ? this.keyHooks : {}), i = s.props ?
                this.props.concat(s.props) : this.props, e = new re
                .Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
            return e.target || (e.target = Z), 3 === e.target.nodeType &&
                (e.target = e.target.parentNode), s.filter ? s.filter(
                    e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== m() && this.focus ? (this.focus(), !
                        1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === m() && this.blur ? (this.blur(), !
                        1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click &&
                        re.nodeName(this, "input") ? (this.click(), !
                            1) : void 0
                },
                _default: function(e) {
                    return re.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent
                        .returnValue = e.result)
                }
            }
        }
    }, re.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, re.Event = function(e, t) {
        return this instanceof re.Event ? (e && e.type ? (this.originalEvent =
                e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented ||
                void 0 === e.defaultPrevented && e.returnValue ===
                !1 ? f : h) : this.type = e, t && re.extend(this, t),
            this.timeStamp = e && e.timeStamp || re.now(), void(
                this[re.expando] = !0)) : new re.Event(e, t)
    }, re.Event.prototype = {
        constructor: re.Event,
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = f, e && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = f, e && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = f, e && e.stopImmediatePropagation(),
                this.stopPropagation()
        }
    }, re.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        re.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                    o = e.relatedTarget,
                    r = e.handleObj;
                return (!o || o !== i && !re.contains(i, o)) &&
                    (e.type = r.origType, n = r.handler.apply(
                        this, arguments), e.type = t), n
            }
        }
    }), re.fn.extend({
        on: function(e, t, n, i) {
            return g(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return g(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i =
                e.handleObj, re(e.delegateTarget).off(i.namespace ?
                    i.origType + "." + i.namespace : i.origType,
                    i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n =
                t, t = void 0), n === !1 && (n = h), this.each(
                function() {
                    re.event.remove(this, e, n, t)
                })
        }
    });
    var Re =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        Fe = /<script|<style|<link/i,
        We = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Be = /^true\/(.*)/,
        Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    re.extend({
        htmlPrefilter: function(e) {
            return e.replace(Re, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var i, o, r, s, a = e.cloneNode(!0),
                l = re.contains(e.ownerDocument, e);
            if (!(ie.noCloneChecked || 1 !== e.nodeType && 11 !==
                e.nodeType || re.isXMLDoc(e)))
                for (s = c(a), r = c(e), i = 0, o = r.length; o >
                    i; i++) w(r[i], s[i]);
            if (t)
                if (n)
                    for (r = r || c(e), s = s || c(a), i = 0, o =
                        r.length; o > i; i++) x(r[i], s[i]);
                else x(e, a);
            return s = c(a, "script"), s.length > 0 && d(s, !l &&
                c(e, "script")), a
        },
        cleanData: function(e) {
            for (var t, n, i, o = re.event.special, r = 0; void 0 !==
                (n = e[r]); r++)
                if (ke(n)) {
                    if (t = n[Ce.expando]) {
                        if (t.events)
                            for (i in t.events) o[i] ? re.event
                                .remove(n, i) : re.removeEvent(
                                    n, i, t.handle);
                        n[Ce.expando] = void 0
                    }
                    n[Ee.expando] && (n[Ee.expando] = void 0)
                }
        }
    }), re.fn.extend({
        domManip: S,
        detach: function(e) {
            return T(this, e, !0)
        },
        remove: function(e) {
            return T(this, e)
        },
        text: function(e) {
            return Te(this, function(e) {
                return void 0 === e ? re.text(this) :
                    this.empty().each(function() {
                        (1 === this.nodeType || 11 ===
                            this.nodeType || 9 ===
                            this.nodeType) && (this
                            .textContent = e)
                    })
            }, null, e, arguments.length)
        },
        append: function() {
            return S(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType ||
                    9 === this.nodeType) {
                    var t = y(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return S(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType ||
                    9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return S(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(
                    e, this)
            })
        },
        after: function() {
            return S(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(
                    e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 ===
                e.nodeType && (re.cleanData(c(e, !1)), e.textContent =
                    "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e :
                t, this.map(function() {
                    return re.clone(this, e, t)
                })
        },
        html: function(e) {
            return Te(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !Fe.test(e) &&
                    !He[(De.exec(e) || ["", ""])[1].toLowerCase()]
                ) {
                    e = re.htmlPrefilter(e);
                    try {
                        for (; i > n; n++) t = this[n] || {},
                            1 === t.nodeType && (re.cleanData(
                                    c(t, !1)), t.innerHTML =
                                e);
                        t = 0
                    } catch (o) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return S(this, arguments, function(t) {
                var n = this.parentNode;
                re.inArray(this, e) < 0 && (re.cleanData(
                    c(this)), n && n.replaceChild(
                    t, this))
            }, e)
        }
    }), re.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        re.fn[e] = function(e) {
            for (var n, i = [], o = re(e), r = o.length - 1, s =
                0; r >= s; s++) n = s === r ? this : this.clone(!
                0), re(o[s])[t](n), J.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Xe, Ye = {
            HTML: "block",
            BODY: "block"
        },
        Ue = /^margin/,
        Ze = new RegExp("^(" + Oe + ")(?!px)[a-z%]+$", "i"),
        Qe = function(t) {
            var n = t.ownerDocument.defaultView;
            return n.opener || (n = e), n.getComputedStyle(t)
        },
        Ge = function(e, t, n, i) {
            var o, r, s = {};
            for (r in t) s[r] = e.style[r], e.style[r] = t[r];
            o = n.apply(e, i || []);
            for (r in t) e.style[r] = s[r];
            return o
        },
        Je = Z.documentElement;
    ! function() {
        function t() {
            a.style.cssText =
                "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                a.innerHTML = "", Je.appendChild(s);
            var t = e.getComputedStyle(a);
            n = "1%" !== t.top, r = "2px" === t.marginLeft, i = "4px" ===
                t.width, a.style.marginRight = "50%", o = "4px" === t.marginRight,
                Je.removeChild(s)
        }
        var n, i, o, r, s = Z.createElement("div"),
            a = Z.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0)
            .style.backgroundClip = "", ie.clearCloneStyle =
            "content-box" === a.style.backgroundClip, s.style.cssText =
            "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
            s.appendChild(a), re.extend(ie, {
                pixelPosition: function() {
                    return t(), n
                },
                boxSizingReliable: function() {
                    return null == i && t(), i
                },
                pixelMarginRight: function() {
                    return null == i && t(), o
                },
                reliableMarginLeft: function() {
                    return null == i && t(), r
                },
                reliableMarginRight: function() {
                    var t, n = a.appendChild(Z.createElement(
                        "div"));
                    return n.style.cssText = a.style.cssText =
                        "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                        n.style.marginRight = n.style.width =
                        "0", a.style.width = "1px", Je.appendChild(
                            s), t = !parseFloat(e.getComputedStyle(
                            n).marginRight), Je.removeChild(s),
                        a.removeChild(n), t
                }
            }))
    }();
    var Ke = /^(none|table(?!-c[ea]).+)/,
        et = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        tt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        nt = ["Webkit", "O", "Moz", "ms"],
        it = Z.createElement("div").style;
    re.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = E(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, s, a = re.camelCase(t),
                    l = e.style;
                return t = re.cssProps[a] || (re.cssProps[a] =
                        P(a) || a), s = re.cssHooks[t] || re.cssHooks[
                        a], void 0 === n ? s && "get" in s &&
                    void 0 !== (o = s.get(e, !1, i)) ? o : l[t] :
                    (r = typeof n, "string" === r && (o = Le.exec(
                            n)) && o[1] && (n = u(e, t, o), r =
                            "number"), null != n && n === n &&
                        ("number" === r && (n += o && o[3] || (
                                re.cssNumber[a] ? "" : "px"
                            )), ie.clearCloneStyle || "" !== n ||
                            0 !== t.indexOf("background") || (l[
                                t] = "inherit"), s && "set" in
                            s && void 0 === (n = s.set(e, n, i)) ||
                            (l[t] = n)), void 0)
            }
        },
        css: function(e, t, n, i) {
            var o, r, s, a = re.camelCase(t);
            return t = re.cssProps[a] || (re.cssProps[a] = P(a) ||
                    a), s = re.cssHooks[t] || re.cssHooks[a], s &&
                "get" in s && (o = s.get(e, !0, n)), void 0 ===
                o && (o = E(e, t, i)), "normal" === o && t in
                tt && (o = tt[t]), "" === n || n ? (r =
                    parseFloat(o), n === !0 || isFinite(r) ? r ||
                    0 : o) : o
        }
    }), re.each(["height", "width"], function(e, t) {
        re.cssHooks[t] = {
            get: function(e, n, i) {
                return n ? Ke.test(re.css(e, "display")) &&
                    0 === e.offsetWidth ? Ge(e, et,
                        function() {
                            return A(e, t, i)
                        }) : A(e, t, i) : void 0
            },
            set: function(e, n, i) {
                var o, r = i && Qe(e),
                    s = i && L(e, t, i, "border-box" === re
                        .css(e, "boxSizing", !1, r), r);
                return s && (o = Le.exec(n)) && "px" !== (o[
                    3] || "px") && (e.style[t] = n, n =
                    re.css(e, t)), O(e, n, s)
            }
        }
    }), re.cssHooks.marginLeft = I(ie.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(E(e, "marginLeft")) || e.getBoundingClientRect()
            .left - Ge(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px" : void 0
    }), re.cssHooks.marginRight = I(ie.reliableMarginRight, function(e,
        t) {
        return t ? Ge(e, {
            display: "inline-block"
        }, E, [e, "marginRight"]) : void 0
    }), re.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        re.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" ==
                        typeof n ? n.split(" ") : [n]; 4 >
                    i; i++) o[e + Ae[i] + t] = r[i] || r[i -
                    2] || r[0];
                return o
            }
        }, Ue.test(e) || (re.cssHooks[e + t].set = O)
    }), re.fn.extend({
        css: function(e, t) {
            return Te(this, function(e, t, n) {
                var i, o, r = {},
                    s = 0;
                if (re.isArray(t)) {
                    for (i = Qe(e), o = t.length; o > s; s++)
                        r[t[s]] = re.css(e, t[s], !1, i);
                    return r
                }
                return void 0 !== n ? re.style(e, t, n) :
                    re.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return j(this, !0)
        },
        hide: function() {
            return j(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() :
                this.hide() : this.each(function() {
                    je(this) ? re(this).show() : re(this).hide()
                })
        }
    }), re.Tween = $, $.prototype = {
        constructor: $,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || re.easing
                ._default, this.options = t, this.start = this.now =
                this.cur(), this.end = i, this.unit = r || (re.cssNumber[
                    n] ? "" : "px")
        },
        cur: function() {
            var e = $.propHooks[this.prop];
            return e && e.get ? e.get(this) : $.propHooks._default.get(
                this)
        },
        run: function(e) {
            var t, n = $.propHooks[this.prop];
            return this.options.duration ? this.pos = t = re.easing[
                    this.easing](e, this.options.duration * e, 0, 1,
                    this.options.duration) : this.pos = t = e, this
                .now = (this.end - this.start) * t + this.start,
                this.options.step && this.options.step.call(this.elem,
                    this.now, this), n && n.set ? n.set(this) : $.propHooks
                ._default.set(this), this
        }
    }, $.prototype.init.prototype = $.prototype, $.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] &&
                    null == e.elem.style[e.prop] ? e.elem[e.prop] :
                    (t = re.css(e.elem, e.prop, ""), t && "auto" !==
                        t ? t : 0)
            },
            set: function(e) {
                re.fx.step[e.prop] ? re.fx.step[e.prop](e) : 1 !==
                    e.elem.nodeType || null == e.elem.style[re.cssProps[
                        e.prop]] && !re.cssHooks[e.prop] ? e.elem[e
                        .prop] = e.now : re.style(e.elem, e.prop, e
                        .now + e.unit)
            }
        }
    }, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] =
                e.now)
        }
    }, re.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, re.fx = $.prototype.init, re.fx.step = {};
    var ot, rt, st = /^(?:toggle|show|hide)$/,
        at = /queueHooks$/;
    re.Animation = re.extend(N, {
            tweeners: {
                "*": [
                    function(e, t) {
                        var n = this.createTween(e, t);
                        return u(n.elem, e, Le.exec(t), n), n
                    }
                ]
            },
            tweener: function(e, t) {
                re.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(
                    we);
                for (var n, i = 0, o = e.length; o > i; i++) n = e[
                    i], N.tweeners[n] = N.tweeners[n] || [], N.tweeners[
                    n].unshift(t)
            },
            prefilters: [_],
            prefilter: function(e, t) {
                t ? N.prefilters.unshift(e) : N.prefilters.push(e)
            }
        }), re.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? re.extend({}, e) : {
                complete: n || !n && t || re.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !re.isFunction(t) && t
            };
            return i.duration = re.fx.off ? 0 : "number" == typeof i.duration ?
                i.duration : i.duration in re.fx.speeds ? re.fx.speeds[i.duration] :
                re.fx.speeds._default, (null == i.queue || i.queue === !0) &&
                (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    re.isFunction(i.old) && i.old.call(this), i.queue && re
                        .dequeue(this, i.queue)
                }, i
        }, re.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(je).css("opacity", 0).show().end()
                    .animate({
                        opacity: t
                    }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var o = re.isEmptyObject(e),
                    r = re.speed(t, n, i),
                    s = function() {
                        var t = N(this, re.extend({}, e), r);
                        (o || Ce.get(this, "finish")) && t.stop(!0)
                    };
                return s.finish = s, o || r.queue === !1 ? this.each(
                    s) : this.queue(r.queue, s)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e =
                    void 0), t && e !== !1 && this.queue(e ||
                    "fx", []), this.each(function() {
                    var t = !0,
                        o = null != e && e + "queueHooks",
                        r = re.timers,
                        s = Ce.get(this);
                    if (o) s[o] && s[o].stop && i(s[o]);
                    else
                        for (o in s) s[o] && s[o].stop &&
                            at.test(o) && i(s[o]);
                    for (o = r.length; o--;) r[o].elem !==
                        this || null != e && r[o].queue !==
                        e || (r[o].anim.stop(n), t = !1, r.splice(
                            o, 1));
                    (t || !n) && re.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(
                    function() {
                        var t, n = Ce.get(this),
                            i = n[e + "queue"],
                            o = n[e + "queueHooks"],
                            r = re.timers,
                            s = i ? i.length : 0;
                        for (n.finish = !0, re.queue(this, e, []),
                            o && o.stop && o.stop.call(this, !0),
                            t = r.length; t--;) r[t].elem ===
                            this && r[t].queue === e && (r[t].anim
                                .stop(!0), r.splice(t, 1));
                        for (t = 0; s > t; t++) i[t] && i[t].finish &&
                            i[t].finish.call(this);
                        delete n.finish
                    })
            }
        }), re.each(["toggle", "show", "hide"], function(e, t) {
            var n = re.fn[t];
            re.fn[t] = function(e, i, o) {
                return null == e || "boolean" == typeof e ? n.apply(
                    this, arguments) : this.animate(z(t, !0), e,
                    i, o)
            }
        }), re.each({
            slideDown: z("show"),
            slideUp: z("hide"),
            slideToggle: z("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            re.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), re.timers = [], re.fx.tick = function() {
            var e, t = 0,
                n = re.timers;
            for (ot = re.now(); t < n.length; t++) e = n[t], e() || n[t] !==
                e || n.splice(t--, 1);
            n.length || re.fx.stop(), ot = void 0
        }, re.fx.timer = function(e) {
            re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
        }, re.fx.interval = 13, re.fx.start = function() {
            rt || (rt = e.setInterval(re.fx.tick, re.fx.interval))
        }, re.fx.stop = function() {
            e.clearInterval(rt), rt = null
        }, re.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, re.fn.delay = function(t, n) {
            return t = re.fx ? re.fx.speeds[t] || t : t, n = n || "fx",
                this.queue(n, function(n, i) {
                    var o = e.setTimeout(n, t);
                    i.stop = function() {
                        e.clearTimeout(o)
                    }
                })
        },
        function() {
            var e = Z.createElement("input"),
                t = Z.createElement("select"),
                n = t.appendChild(Z.createElement("option"));
            e.type = "checkbox", ie.checkOn = "" !== e.value, ie.optSelected =
                n.selected, t.disabled = !0, ie.optDisabled = !n.disabled,
                e = Z.createElement("input"), e.value = "t", e.type =
                "radio", ie.radioValue = "t" === e.value
        }();
    var lt, ut = re.expr.attrHandle;
    re.fn.extend({
        attr: function(e, t) {
            return Te(this, re.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                re.removeAttr(this, e)
            })
        }
    }), re.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return
                "undefined" == typeof e.getAttribute ? re.prop(
                    e, t, n) : (1 === r && re.isXMLDoc(e) ||
                    (t = t.toLowerCase(), o = re.attrHooks[
                        t] || (re.expr.match.bool.test(
                        t) ? lt : void 0)), void 0 !== n ?
                    null === n ? void re.removeAttr(e, t) :
                    o && "set" in o && void 0 !== (i = o.set(
                        e, n, t)) ? i : (e.setAttribute(t,
                        n + ""), n) : o && "get" in o &&
                    null !== (i = o.get(e, t)) ? i : (i =
                        re.find.attr(e, t), null == i ?
                        void 0 : i))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ie.radioValue && "radio" === t && re.nodeName(
                        e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n &&
                            (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i, o = 0,
                r = t && t.match(we);
            if (r && 1 === e.nodeType)
                for (; n = r[o++];) i = re.propFix[n] || n, re.expr
                    .match.bool.test(n) && (e[i] = !1), e.removeAttribute(
                        n)
        }
    }), lt = {
        set: function(e, t, n) {
            return t === !1 ? re.removeAttr(e, n) : e.setAttribute(
                n, n), n
        }
    }, re.each(re.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = ut[t] || re.find.attr;
        ut[t] = function(e, t, i) {
            var o, r;
            return i || (r = ut[t], ut[t] = o, o = null != n(e,
                    t, i) ? t.toLowerCase() : null, ut[t] =
                r), o
        }
    });
    var ct = /^(?:input|select|textarea|button)$/i,
        dt = /^(?:a|area)$/i;
    re.fn.extend({
        prop: function(e, t) {
            return Te(this, re.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[re.propFix[e] || e]
            })
        }
    }), re.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r &&
                re.isXMLDoc(e) || (t = re.propFix[t] || t,
                    o = re.propHooks[t]), void 0 !== n ? o &&
                "set" in o && void 0 !== (i = o.set(e, n, t)) ?
                i : e[t] = n : o && "get" in o && null !==
                (i = o.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = re.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ct.test(e.nodeName) ||
                        dt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), ie.optSelected || (re.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
                null
        }
    }), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing",
        "cellPadding", "rowSpan", "colSpan", "useMap",
        "frameBorder", "contentEditable"
    ], function() {
        re.propFix[this.toLowerCase()] = this
    });
    var pt = /[\t\r\n\f]/g;
    re.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (re.isFunction(e)) return this.each(function(t) {
                re(this).addClass(e.call(this, t, M(
                    this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(we) || []; n = this[l++];)
                    if (o = M(n), i = 1 === n.nodeType && (" " +
                        o + " ").replace(pt, " ")) {
                        for (s = 0; r = t[s++];) i.indexOf(" " +
                            r + " ") < 0 && (i += r + " ");
                        a = re.trim(i), o !== a && n.setAttribute(
                            "class", a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (re.isFunction(e)) return this.each(function(t) {
                re(this).removeClass(e.call(this, t,
                    M(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(we) || []; n = this[l++];)
                    if (o = M(n), i = 1 === n.nodeType && (" " +
                        o + " ").replace(pt, " ")) {
                        for (s = 0; r = t[s++];)
                            for (; i.indexOf(" " + r + " ") > -
                                1;) i = i.replace(" " + r + " ",
                                " ");
                        a = re.trim(i), o !== a && n.setAttribute(
                            "class", a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ?
                this.addClass(e) : this.removeClass(e) : re.isFunction(
                    e) ? this.each(function(n) {
                    re(this).toggleClass(e.call(this, n, M(
                        this), t), t)
                }) : this.each(function() {
                    var t, i, o, r;
                    if ("string" === n)
                        for (i = 0, o = re(this), r = e.match(
                            we) || []; t = r[i++];) o.hasClass(
                            t) ? o.removeClass(t) : o.addClass(
                            t);
                    else(void 0 === e || "boolean" === n) &&
                        (t = M(this), t && Ce.set(this,
                                "__className__", t), this.setAttribute &&
                            this.setAttribute("class", t ||
                                e === !1 ? "" : Ce.get(this,
                                    "__className__") || "")
                        )
                })
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && (" " + M(n) + " ").replace(
                    pt, " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var ft = /\r/g;
    re.fn.extend({
        val: function(e) {
            var t, n, i, o = this[0]; {
                if (arguments.length) return i = re.isFunction(
                    e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = i ?
                        e.call(this, n, re(this)
                            .val()) : e, null ==
                        o ? o = "" : "number" ==
                        typeof o ? o += "" : re
                        .isArray(o) && (o = re.map(
                            o, function(e) {
                                return null ==
                                    e ? "" :
                                    e + ""
                            })), t = re.valHooks[
                            this.type] || re.valHooks[
                            this.nodeName.toLowerCase()
                        ], t && "set" in t &&
                        void 0 !== t.set(this,
                            o, "value") || (
                            this.value = o))
                });
                if (o) return t = re.valHooks[o.type] || re.valHooks[
                        o.nodeName.toLowerCase()], t &&
                    "get" in t && void 0 !== (n = t.get(o,
                        "value")) ? n : (n = o.value,
                        "string" == typeof n ? n.replace(ft,
                            "") : null == n ? "" : n)
            }
        }
    }), re.extend({
        valHooks: {
            option: {
                get: function(e) {
                    return re.trim(e.value)
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, o = e.selectedIndex,
                            r = "select-one" === e.type || 0 >
                            o, s = r ? null : [], a = r ? o + 1 :
                            i.length, l = 0 > o ? a : r ? o : 0; a >
                        l; l++)
                        if (n = i[l], (n.selected || l === o) &&
                            (ie.optDisabled ? !n.disabled :
                                null === n.getAttribute(
                                    "disabled")) && (!n.parentNode
                                .disabled || !re.nodeName(n.parentNode,
                                    "optgroup"))) {
                            if (t = re(n).val(), r) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = re.makeArray(
                        t), s = o.length; s--;) i = o[s], (i.selected =
                        re.inArray(re.valHooks.option.get(i),
                            r) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), re.each(["radio", "checkbox"], function() {
        re.valHooks[this] = {
            set: function(e, t) {
                return re.isArray(t) ? e.checked = re.inArray(
                    re(e).val(), t) > -1 : void 0
            }
        }, ie.checkOn || (re.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" :
                e.value
        })
    });
    var ht = /^(?:focusinfocus|focusoutblur)$/;
    re.extend(re.event, {
        trigger: function(t, n, i, o) {
            var r, s, a, l, u, c, d, p = [i || Z],
                f = ne.call(t, "type") ? t.type : t,
                h = ne.call(t, "namespace") ? t.namespace.split(
                    ".") : [];
            if (s = a = i = i || Z, 3 !== i.nodeType && 8 !== i
                .nodeType && !ht.test(f + re.event.triggered) &&
                (f.indexOf(".") > -1 && (h = f.split("."), f =
                        h.shift(), h.sort()), u = f.indexOf(":") <
                    0 && "on" + f, t = t[re.expando] ? t : new re
                    .Event(f, "object" == typeof t && t), t.isTrigger =
                    o ? 2 : 3, t.namespace = h.join("."), t.rnamespace =
                    t.namespace ? new RegExp("(^|\\.)" + h.join(
                        "\\.(?:.*\\.|)") + "(\\.|$)") : null, t
                    .result = void 0, t.target || (t.target = i),
                    n = null == n ? [t] : re.makeArray(n, [t]),
                    d = re.event.special[f] || {}, o || !d.trigger ||
                    d.trigger.apply(i, n) !== !1)) {
                if (!o && !d.noBubble && !re.isWindow(i)) {
                    for (l = d.delegateType || f, ht.test(l + f) ||
                        (s = s.parentNode); s; s = s.parentNode
                    ) p.push(s), a = s;
                    a === (i.ownerDocument || Z) && p.push(a.defaultView ||
                        a.parentWindow || e)
                }
                for (r = 0;
                    (s = p[r++]) && !t.isPropagationStopped();)
                    t.type = r > 1 ? l : d.bindType || f, c = (
                        Ce.get(s, "events") || {})[t.type] &&
                    Ce.get(s, "handle"), c && c.apply(s, n), c =
                    u && s[u], c && c.apply && ke(s) && (t.result =
                        c.apply(s, n), t.result === !1 && t.preventDefault()
                    );
                return t.type = f, o || t.isDefaultPrevented() ||
                    d._default && d._default.apply(p.pop(), n) !==
                    !1 || !ke(i) || u && re.isFunction(i[f]) &&
                    !re.isWindow(i) && (a = i[u], a && (i[u] =
                            null), re.event.triggered = f, i[f]
                        (), re.event.triggered = void 0, a && (
                            i[u] = a)), t.result
            }
        },
        simulate: function(e, t, n) {
            var i = re.extend(new re.Event, n, {
                type: e,
                isSimulated: !0
            });
            re.event.trigger(i, null, t), i.isDefaultPrevented() &&
                n.preventDefault()
        }
    }), re.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                re.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? re.event.trigger(e, t, n, !0) : void 0
        }
    }), re.each(
        "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu"
        .split(" "), function(e, t) {
            re.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) :
                    this.trigger(t)
            }
        }), re.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), ie.focusin = "onfocusin" in e, ie.focusin || re.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            re.event.simulate(t, e.target, re.event.fix(e))
        };
        re.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    o = Ce.access(i, t);
                o || i.addEventListener(e, n, !0), Ce.access(
                    i, t, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    o = Ce.access(i, t) - 1;
                o ? Ce.access(i, t, o) : (i.removeEventListener(
                    e, n, !0), Ce.remove(i, t))
            }
        }
    });
    var mt = e.location,
        gt = re.now(),
        yt = /\?/;
    re.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, re.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (i) {
            n = void 0
        }
        return (!n || n.getElementsByTagName("parsererror").length) &&
            re.error("Invalid XML: " + t), n
    };
    var vt = /#.*$/,
        bt = /([?&])_=[^&]*/,
        xt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        wt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        St = /^(?:GET|HEAD)$/,
        Tt = /^\/\//,
        kt = {},
        Ct = {},
        Et = "*/".concat("*"),
        It = Z.createElement("a");
    It.href = mt.href, re.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: mt.href,
            type: "GET",
            isLocal: wt.test(mt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Et,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": re.parseJSON,
                "text xml": re.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? W(W(e, re.ajaxSettings), t) : W(re.ajaxSettings,
                e)
        },
        ajaxPrefilter: R(kt),
        ajaxTransport: R(Ct),
        ajax: function(t, n) {
            function i(t, n, i, a) {
                var u, d, v, b, w, T = n;
                2 !== x && (x = 2, l && e.clearTimeout(l),
                    o = void 0, s = a || "", S.readyState =
                    t > 0 ? 4 : 0, u = t >= 200 && 300 >
                    t || 304 === t, i && (b = B(p, S, i)),
                    b = V(p, b, S, u), u ? (p.ifModified &&
                        (w = S.getResponseHeader(
                                "Last-Modified"), w &&
                            (re.lastModified[r] = w), w =
                            S.getResponseHeader("etag"),
                            w && (re.etag[r] = w)), 204 ===
                        t || "HEAD" === p.type ? T =
                        "nocontent" : 304 === t ? T =
                        "notmodified" : (T = b.state, d =
                            b.data, v = b.error, u = !v
                        )) : (v = T, (t || !T) && (T =
                        "error", 0 > t && (t = 0))), S.status =
                    t, S.statusText = (n || T) + "", u ?
                    m.resolveWith(f, [d, T, S]) : m.rejectWith(
                        f, [S, T, v]), S.statusCode(y),
                    y = void 0, c && h.trigger(u ?
                        "ajaxSuccess" : "ajaxError", [S,
                            p, u ? d : v
                        ]), g.fireWith(f, [S, T]), c &&
                    (h.trigger("ajaxComplete", [S, p]), --
                        re.active || re.event.trigger(
                            "ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var o, r, s, a, l, u, c, d, p = re.ajaxSetup({}, n),
                f = p.context || p,
                h = p.context && (f.nodeType || f.jquery) ? re(
                    f) : re.event,
                m = re.Deferred(),
                g = re.Callbacks("once memory"),
                y = p.statusCode || {},
                v = {},
                b = {},
                x = 0,
                w = "canceled",
                S = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === x) {
                            if (!a)
                                for (a = {}; t = xt.exec(s);)
                                    a[t[1].toLowerCase()] =
                                    t[2];
                            t = a[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === x ? s : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return x || (e = b[n] = b[n] || e,
                            v[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return x || (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > x)
                                for (t in e) y[t] = [y[t],
                                    e[t]
                                ];
                            else S.always(e[S.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || w;
                        return o && o.abort(t), i(0, t),
                            this
                    }
                };
            if (m.promise(S).complete = g.add, S.success = S.done,
                S.error = S.fail, p.url = ((t || p.url || mt.href) +
                    "").replace(vt, "").replace(Tt, mt.protocol +
                    "//"), p.type = n.method || n.type || p.method ||
                p.type, p.dataTypes = re.trim(p.dataType || "*")
                .toLowerCase().match(we) || [""], null == p.crossDomain
            ) {
                u = Z.createElement("a");
                try {
                    u.href = p.url, u.href = u.href, p.crossDomain =
                        It.protocol + "//" + It.host != u.protocol +
                        "//" + u.host
                } catch (T) {
                    p.crossDomain = !0
                }
            }
            if (p.data && p.processData && "string" != typeof p
                .data && (p.data = re.param(p.data, p.traditional)),
                F(kt, p, n, S), 2 === x) return S;
            c = re.event && p.global, c && 0 === re.active++ &&
                re.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(),
                p.hasContent = !St.test(p.type), r = p.url, p.hasContent ||
                (p.data && (r = p.url += (yt.test(r) ? "&" :
                        "?") + p.data, delete p.data), p.cache ===
                    !1 && (p.url = bt.test(r) ? r.replace(bt,
                        "$1_=" + gt++) : r + (yt.test(r) ?
                        "&" : "?") + "_=" + gt++)), p.ifModified &&
                (re.lastModified[r] && S.setRequestHeader(
                    "If-Modified-Since", re.lastModified[r]
                ), re.etag[r] && S.setRequestHeader(
                    "If-None-Match", re.etag[r])), (p.data && p
                    .hasContent && p.contentType !== !1 || n.contentType
                ) && S.setRequestHeader("Content-Type", p.contentType),
                S.setRequestHeader("Accept", p.dataTypes[0] &&
                    p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[
                        0]] + ("*" !== p.dataTypes[0] ? ", " +
                        Et + "; q=0.01" : "") : p.accepts["*"]);
            for (d in p.headers) S.setRequestHeader(d, p.headers[
                d]);
            if (p.beforeSend && (p.beforeSend.call(f, S, p) ===
                !1 || 2 === x)) return S.abort();
            w = "abort";
            for (d in {
                success: 1,
                error: 1,
                complete: 1
            }) S[d](p[d]);
            if (o = F(Ct, p, n, S)) {
                if (S.readyState = 1, c && h.trigger("ajaxSend", [
                    S, p
                ]), 2 === x) return S;
                p.async && p.timeout > 0 && (l = e.setTimeout(
                    function() {
                        S.abort("timeout")
                    }, p.timeout));
                try {
                    x = 1, o.send(v, i)
                } catch (T) {
                    if (!(2 > x)) throw T;
                    i(-1, T)
                }
            } else i(-1, "No Transport");
            return S
        },
        getJSON: function(e, t, n) {
            return re.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return re.get(e, void 0, t, "script")
        }
    }), re.each(["get", "post"], function(e, t) {
        re[t] = function(e, n, i, o) {
            return re.isFunction(n) && (o = o || i, i = n, n =
                void 0), re.ajax(re.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            }, re.isPlainObject(e) && e))
        }
    }), re._evalUrl = function(e) {
        return re.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, re.fn.extend({
        wrapAll: function(e) {
            var t;
            return re.isFunction(e) ? this.each(function(t) {
                re(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = re(e, this[0].ownerDocument)
                .eq(0).clone(!0), this[0].parentNode &&
                t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;)
                        e = e.firstElementChild;
                    return e
                }).append(this)), this)
        },
        wrapInner: function(e) {
            return re.isFunction(e) ? this.each(function(t) {
                re(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = re(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = re.isFunction(e);
            return this.each(function(n) {
                re(this).wrapAll(t ? e.call(this, n) :
                    e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                re.nodeName(this, "body") || re(this).replaceWith(
                    this.childNodes)
            }).end()
        }
    }), re.expr.filters.hidden = function(e) {
        return !re.expr.filters.visible(e)
    }, re.expr.filters.visible = function(e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects()
            .length > 0
    };
    var Pt = /%20/g,
        Ot = /\[\]$/,
        Lt = /\r?\n/g,
        At = /^(?:submit|button|image|reset|file)$/i,
        jt = /^(?:input|select|textarea|keygen)/i;
    re.param = function(e, t) {
        var n, i = [],
            o = function(e, t) {
                t = re.isFunction(t) ? t() : null == t ? "" : t, i[i.length] =
                    encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional),
            re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(
            e, function() {
                o(this.name, this.value)
            });
        else
            for (n in e) X(n, e[n], t, o);
        return i.join("&").replace(Pt, "+")
    }, re.fn.extend({
        serialize: function() {
            return re.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = re.prop(this, "elements");
                return e ? re.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !re(this).is(
                        ":disabled") && jt.test(this.nodeName) &&
                    !At.test(e) && (this.checked || !$e
                        .test(e))
            }).map(function(e, t) {
                var n = re(this).val();
                return null == n ? null : re.isArray(n) ?
                    re.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Lt,
                                "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Lt, "\r\n")
                    }
            }).get()
        }
    }), re.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    };
    var $t = {
            0: 200,
            1223: 204
        },
        Dt = re.ajaxSettings.xhr();
    ie.cors = !!Dt && "withCredentials" in Dt, ie.ajax = Dt = !!Dt, re.ajaxTransport(
        function(t) {
            var n, i;
            return ie.cors || Dt && !t.crossDomain ? {
                send: function(o, r) {
                    var s, a = t.xhr();
                    if (a.open(t.type, t.url, t.async, t.username,
                        t.password), t.xhrFields)
                        for (s in t.xhrFields) a[s] = t.xhrFields[
                            s];
                    t.mimeType && a.overrideMimeType && a.overrideMimeType(
                        t.mimeType), t.crossDomain || o[
                        "X-Requested-With"] || (o[
                            "X-Requested-With"] =
                        "XMLHttpRequest");
                    for (s in o) a.setRequestHeader(s, o[s]);
                    n = function(e) {
                            return function() {
                                n && (n = i = a.onload = a.onerror =
                                    a.onabort = a.onreadystatechange =
                                    null, "abort" === e ?
                                    a.abort() : "error" ===
                                    e ? "number" !=
                                    typeof a.status ? r(
                                        0, "error") : r(
                                        a.status, a.statusText
                                    ) : r($t[a.status] ||
                                        a.status, a.statusText,
                                        "text" !== (a.responseType ||
                                            "text") ||
                                        "string" !=
                                        typeof a.responseText ? {
                                            binary: a.response
                                        } : {
                                            text: a.responseText
                                        }, a.getAllResponseHeaders()
                                    ))
                            }
                        }, a.onload = n(), i = a.onerror = n(
                            "error"), void 0 !== a.onabort ? a.onabort =
                        i : a.onreadystatechange = function() {
                            4 === a.readyState && e.setTimeout(
                                function() {
                                    n && i()
                                })
                        }, n = n("abort");
                    try {
                        a.send(t.hasContent && t.data || null)
                    } catch (l) {
                        if (n) throw l
                    }
                },
                abort: function() {
                    n && n()
                }
            } : void 0
        }), re.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return re.globalEval(e), e
            }
        }
    }), re.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type =
            "GET")
    }), re.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, o) {
                    t = re("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && o(
                            "error" === e.type ?
                            404 : 200, e.type)
                    }), Z.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var zt = [],
        Ht = /(=)\?(?=&|$)|\?\?/;
    re.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = zt.pop() || re.expando + "_" + gt++;
            return this[e] = !0, e
        }
    }), re.ajaxPrefilter("json jsonp", function(t, n, i) {
        var o, r, s, a = t.jsonp !== !1 && (Ht.test(t.url) ? "url" :
            "string" == typeof t.data && 0 === (t.contentType ||
                "").indexOf("application/x-www-form-urlencoded") &&
            Ht.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback =
            re.isFunction(t.jsonpCallback) ? t.jsonpCallback() :
            t.jsonpCallback, a ? t[a] = t[a].replace(Ht, "$1" +
                o) : t.jsonp !== !1 && (t.url += (yt.test(t.url) ?
                "&" : "?") + t.jsonp + "=" + o), t.converters[
                "script json"] = function() {
                return s || re.error(o + " was not called"), s[
                    0]
            }, t.dataTypes[0] = "json", r = e[o], e[o] =
            function() {
                s = arguments
            }, i.always(function() {
                void 0 === r ? re(e).removeProp(o) : e[o] =
                    r, t[o] && (t.jsonpCallback = n.jsonpCallback,
                        zt.push(o)), s && re.isFunction(r) &&
                    r(s[0]), s = r = void 0
            }), "script") : void 0
    }), ie.createHTMLDocument = function() {
        var e = Z.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes
            .length
    }(), re.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || (ie.createHTMLDocument ?
            Z.implementation.createHTMLDocument("") : Z);
        var i = he.exec(e),
            o = !n && [];
        return i ? [t.createElement(i[1])] : (i = p([e], t, o), o && o.length &&
            re(o).remove(), re.merge([], i.childNodes))
    };
    var _t = re.fn.load;
    re.fn.load = function(e, t, n) {
            if ("string" != typeof e && _t) return _t.apply(this, arguments);
            var i, o, r, s = this,
                a = e.indexOf(" ");
            return a > -1 && (i = re.trim(e.slice(a)), e = e.slice(0, a)),
                re.isFunction(t) ? (n = t, t = void 0) : t && "object" ==
                typeof t && (o = "POST"), s.length > 0 && re.ajax({
                    url: e,
                    type: o || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    r = arguments, s.html(i ? re("<div>").append(re.parseHTML(
                        e)).find(i) : e)
                }).always(n && function(e, t) {
                    s.each(function() {
                        n.apply(s, r || [e.responseText, t, e])
                    })
                }), this
        }, re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError",
            "ajaxSuccess", "ajaxSend"
        ], function(e, t) {
            re.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), re.expr.filters.animated = function(e) {
            return re.grep(re.timers, function(t) {
                return e === t.elem
            }).length
        }, re.offset = {
            setOffset: function(e, t, n) {
                var i, o, r, s, a, l, u, c = re.css(e, "position"),
                    d = re(e),
                    p = {};
                "static" === c && (e.style.position = "relative"), a =
                    d.offset(), r = re.css(e, "top"), l = re.css(e,
                        "left"), u = ("absolute" === c || "fixed" === c) &&
                    (r + l).indexOf("auto") > -1, u ? (i = d.position(),
                        s = i.top, o = i.left) : (s = parseFloat(r) ||
                        0, o = parseFloat(l) || 0), re.isFunction(t) &&
                    (t = t.call(e, n, re.extend({}, a))), null != t.top &&
                    (p.top = t.top - a.top + s), null != t.left && (p.left =
                        t.left - a.left + o), "using" in t ? t.using.call(
                        e, p) : d.css(p)
            }
        }, re.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this :
                    this.each(function(t) {
                        re.offset.setOffset(this, e, t)
                    });
                var t, n, i = this[0],
                    o = {
                        top: 0,
                        left: 0
                    },
                    r = i && i.ownerDocument;
                if (r) return t = r.documentElement, re.contains(t,
                    i) ? (o = i.getBoundingClientRect(), n =
                    Y(r), {
                        top: o.top + n.pageYOffset - t.clientTop,
                        left: o.left + n.pageXOffset - t.clientLeft
                    }) : o
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === re.css(n, "position") ? t =
                        n.getBoundingClientRect() : (e = this.offsetParent(),
                            t = this.offset(), re.nodeName(e[0],
                                "html") || (i = e.offset()), i.top +=
                            re.css(e[0], "borderTopWidth", !0) - e.scrollTop(),
                            i.left += re.css(e[0],
                                "borderLeftWidth", !0) - e.scrollLeft()
                        ), {
                            top: t.top - i.top - re.css(n,
                                "marginTop", !0),
                            left: t.left - i.left - re.css(n,
                                "marginLeft", !0)
                        }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e &&
                        "static" === re.css(e, "position");
                    ) e = e.offsetParent;
                    return e || Je
                })
            }
        }), re.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = "pageYOffset" === t;
            re.fn[e] = function(i) {
                return Te(this, function(e, i, o) {
                    var r = Y(e);
                    return void 0 === o ? r ? r[t] : e[i] :
                        void(r ? r.scrollTo(n ? r.pageXOffset :
                                o, n ? o : r.pageYOffset) :
                            e[i] = o)
                }, e, i, arguments.length)
            }
        }), re.each(["top", "left"], function(e, t) {
            re.cssHooks[t] = I(ie.pixelPosition, function(e, n) {
                return n ? (n = E(e, t), Ze.test(n) ? re(e).position()[
                    t] + "px" : n) : void 0
            })
        }), re.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            re.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, i) {
                re.fn[i] = function(i, o) {
                    var r = arguments.length && (n ||
                            "boolean" != typeof i),
                        s = n || (i === !0 || o === !0 ?
                            "margin" : "border");
                    return Te(this, function(t, n, i) {
                        var o;
                        return re.isWindow(t) ? t.document
                            .documentElement[
                                "client" + e] : 9 ===
                            t.nodeType ? (o = t.documentElement,
                                Math.max(t.body[
                                    "scroll" +
                                    e], o[
                                    "scroll" +
                                    e], t.body[
                                    "offset" +
                                    e], o[
                                    "offset" +
                                    e], o[
                                    "client" +
                                    e])) : void 0 ===
                            i ? re.css(t, n, s) :
                            re.style(t, n, i, s)
                    }, t, r ? i : void 0, r, null)
                }
            })
        }), re.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") :
                    this.off(t, e || "**", n)
            },
            size: function() {
                return this.length
            }
        }), re.fn.andSelf = re.fn.addBack, "function" == typeof define &&
        define.amd && define("jquery", [], function() {
            return re
        });
    var qt = e.jQuery,
        Nt = e.$;
    return re.noConflict = function(t) {
        return e.$ === re && (e.$ = Nt), t && e.jQuery === re && (e.jQuery =
            qt), re
    }, t || (e.jQuery = e.$ = re), re
}),
function(e) {
    "use strict";

    function t(e, t) {
        return e[s](t)
    }

    function n(e) {
        if (!e.parentNode) {
            var t = document.createDocumentFragment();
            t.appendChild(e)
        }
    }

    function i(e, t) {
        n(e);
        for (var i = e.parentNode.querySelectorAll(t), o = 0, r = i.length; r >
            o; o++)
            if (i[o] === e) return !0;
        return !1
    }

    function o(e, i) {
        return n(e), t(e, i)
    }
    var r, s = function() {
        if (e.matches) return "matches";
        if (e.matchesSelector) return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], n = 0, i = t.length; i >
            n; n++) {
            var o = t[n],
                r = o + "MatchesSelector";
            if (e[r]) return r
        }
    }();
    if (s) {
        var a = document.createElement("div"),
            l = t(a, "div");
        r = l ? t : o
    } else r = i;
    "function" == typeof define && define.amd ? define(function() {
            return r
        }) : "object" == typeof exports ? module.exports = r : window.matchesSelector =
        r
}(Element.prototype),
function(e) {
    "use strict";

    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }
    var n = document.documentElement,
        i = function() {};
    n.addEventListener ? i = function(e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (i = function(e, n, i) {
        e[n + i] = i.handleEvent ? function() {
            var n = t(e);
            i.handleEvent.call(i, n)
        } : function() {
            var n = t(e);
            i.call(e, n)
        }, e.attachEvent("on" + n, e[n + i])
    });
    var o = function() {};
    n.removeEventListener ? o = function(e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (o = function(e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (i) {
            e[t + n] = void 0
        }
    });
    var r = {
        bind: i,
        unbind: o
    };
    "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ?
        module.exports = r : e.eventie = r
}(window),
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof module &&
        module.exports ? module.exports = t() : e.EvEmitter = t()
}(this, function() {
    "use strict";

    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var n = this._events = this._events || {},
                i = n[e] = n[e] || [];
            return -1 == i.indexOf(t) && i.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var n = this._onceEvents = this._onceEvents || {},
                i = n[e] = n[e] || {};
            return i[t] = !0, this
        }
    }, t.off = function(e, t) {
        var n = this._events && this._events[e];
        if (n && n.length) {
            var i = n.indexOf(t);
            return -1 != i && n.splice(i, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var n = this._events && this._events[e];
        if (n && n.length) {
            var i = 0,
                o = n[i];
            t = t || [];
            for (var r = this._onceEvents && this._onceEvents[e]; o;) {
                var s = r && r[o];
                s && (this.off(e, o), delete r[o]), o.apply(this, t), i +=
                    s ? 0 : 1, o = n[i]
            }
            return this
        }
    }, e
}),
function(e) {
    function t(e) {
        var t = e.length,
            i = n.type(e);
        return "function" === i || n.isWindow(e) ? !1 : 1 === e.nodeType &&
            t ? !0 : "array" === i || 0 === t || "number" == typeof t && t >
            0 && t - 1 in e
    }
    if (!e.jQuery) {
        var n = function(e, t) {
            return new n.fn.init(e, t)
        };
        n.isWindow = function(e) {
            return null != e && e == e.window
        }, n.type = function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" ==
                typeof e ? o[s.call(e)] || "object" : typeof e
        }, n.isArray = Array.isArray || function(e) {
            return "array" === n.type(e)
        }, n.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== n.type(e) || e.nodeType || n.isWindow(e))
                return !1;
            try {
                if (e.constructor && !r.call(e, "constructor") && !r.call(e
                    .constructor.prototype, "isPrototypeOf")) return !1
            } catch (i) {
                return !1
            }
            for (t in e);
            return void 0 === t || r.call(e, t)
        }, n.each = function(e, n, i) {
            var o, r = 0,
                s = e.length,
                a = t(e);
            if (i) {
                if (a)
                    for (; s > r && (o = n.apply(e[r], i), o !== !1); r++);
                else
                    for (r in e)
                        if (o = n.apply(e[r], i), o === !1) break
            } else if (a)
                for (; s > r && (o = n.call(e[r], r, e[r]), o !== !1); r++)
            ;
            else
                for (r in e)
                    if (o = n.call(e[r], r, e[r]), o === !1) break; return e
        }, n.data = function(e, t, o) {
            if (void 0 === o) {
                var r = e[n.expando],
                    s = r && i[r];
                if (void 0 === t) return s;
                if (s && t in s) return s[t]
            } else if (void 0 !== t) {
                var r = e[n.expando] || (e[n.expando] = ++n.uuid);
                return i[r] = i[r] || {}, i[r][t] = o, o
            }
        }, n.removeData = function(e, t) {
            var o = e[n.expando],
                r = o && i[o];
            r && n.each(t, function(e, t) {
                delete r[t]
            })
        }, n.extend = function() {
            var e, t, i, o, r, s, a = arguments[0] || {},
                l = 1,
                u = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[l] || {}, l++),
                "object" != typeof a && "function" !== n.type(a) && (a = {}),
                l === u && (a = this, l--); u > l; l++)
                if (null != (r = arguments[l]))
                    for (o in r) e = a[o], i = r[o], a !== i && (c && i &&
                        (n.isPlainObject(i) || (t = n.isArray(i))) ? (t ?
                            (t = !1, s = e && n.isArray(e) ? e : []) :
                            s = e && n.isPlainObject(e) ? e : {}, a[o] =
                            n.extend(c, s, i)) : void 0 !== i && (a[o] =
                            i));
            return a
        }, n.queue = function(e, i, o) {
            function r(e, n) {
                var i = n || [];
                return null != e && (t(Object(e)) ? ! function(e, t) {
                    for (var n = +t.length, i = 0, o = e.length; n >
                        i;) e[o++] = t[i++];
                    if (n !== n)
                        for (; void 0 !== t[i];) e[o++] = t[i++];
                    return e.length = o, e
                }(i, "string" == typeof e ? [e] : e) : [].push.call(
                    i, e)), i
            }
            if (e) {
                i = (i || "fx") + "queue";
                var s = n.data(e, i);
                return o ? (!s || n.isArray(o) ? s = n.data(e, i, r(o)) : s
                    .push(o), s) : s || []
            }
        }, n.dequeue = function(e, t) {
            n.each(e.nodeType ? [e] : e, function(e, i) {
                t = t || "fx";
                var o = n.queue(i, t),
                    r = o.shift();
                "inprogress" === r && (r = o.shift()), r && ("fx" ===
                    t && o.unshift("inprogress"), r.call(i,
                        function() {
                            n.dequeue(i, t)
                        }))
            })
        }, n.fn = n.prototype = {
            init: function(e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop ||
                        0) - (document.clientTop || 0),
                    left: t.left + (e.pageXOffset || document.scrollLeft ||
                        0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                function e() {
                    for (var e = this.offsetParent || document; e &&
                        "html" === !e.nodeType.toLowerCase &&
                        "static" === e.style.position;) e = e.offsetParent;
                    return e || document
                }
                var t = this[0],
                    e = e.apply(t),
                    i = this.offset(),
                    o = /^(?:body|html)$/i.test(e.nodeName) ? {
                        top: 0,
                        left: 0
                    } : n(e).offset();
                return i.top -= parseFloat(t.style.marginTop) || 0, i.left -=
                    parseFloat(t.style.marginLeft) || 0, e.style && (o.top +=
                        parseFloat(e.style.borderTopWidth) || 0, o.left +=
                        parseFloat(e.style.borderLeftWidth) || 0), {
                        top: i.top - o.top,
                        left: i.left - o.left
                    }
            }
        };
        var i = {};
        n.expando = "velocity" + (new Date).getTime(), n.uuid = 0;
        for (var o = {}, r = o.hasOwnProperty, s = o.toString, a =
            "Boolean Number String Function Array Date RegExp Object Error"
            .split(" "), l = 0; l < a.length; l++) o["[object " + a[l] + "]"] =
            a[l].toLowerCase();
        n.fn.init.prototype = n.fn, e.Velocity = {
            Utilities: n
        }
    }
}(window),
function(e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports =
        e() : "function" == typeof define && define.amd ? define(e) : e()
}(function() {
    return function(e, t, n, i) {
        function o(e) {
            for (var t = -1, n = e ? e.length : 0, i = []; ++t < n;) {
                var o = e[t];
                o && i.push(o)
            }
            return i
        }

        function r(e) {
            return m.isWrapped(e) ? e = [].slice.call(e) : m.isNode(
                e) && (e = [e]), e
        }

        function s(e) {
            var t = p.data(e, "velocity");
            return null === t ? i : t
        }

        function a(e) {
            return function(t) {
                return Math.round(t * e) * (1 / e)
            }
        }

        function l(e, n, i, o) {
            function r(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function s(e, t) {
                return 3 * t - 6 * e
            }

            function a(e) {
                return 3 * e
            }

            function l(e, t, n) {
                return ((r(t, n) * e + s(t, n)) * e + a(t)) * e
            }

            function u(e, t, n) {
                return 3 * r(t, n) * e * e + 2 * s(t, n) * e +
                    a(t)
            }

            function c(t, n) {
                for (var o = 0; m > o; ++o) {
                    var r = u(n, e, i);
                    if (0 === r) return n;
                    var s = l(n, e, i) - t;
                    n -= s / r
                }
                return n
            }

            function d() {
                for (var t = 0; b > t; ++t) T[t] = l(t * x, e,
                    i)
            }

            function p(t, n, o) {
                var r, s, a = 0;
                do s = n + (o - n) / 2, r = l(s, e, i) - t, r >
                    0 ? o = s : n = s; while (Math.abs(r) > y &&
                    ++a < v);
                return s
            }

            function f(t) {
                for (var n = 0, o = 1, r = b - 1; o != r && T[o] <=
                    t; ++o) n += x;
                --o;
                var s = (t - T[o]) / (T[o + 1] - T[o]),
                    a = n + s * x,
                    l = u(a, e, i);
                return l >= g ? c(t, a) : 0 == l ? a : p(t, n,
                    n + x)
            }

            function h() {
                k = !0, (e != n || i != o) && d()
            }
            var m = 4,
                g = .001,
                y = 1e-7,
                v = 10,
                b = 11,
                x = 1 / (b - 1),
                w = "Float32Array" in t;
            if (4 !== arguments.length) return !1;
            for (var S = 0; 4 > S; ++S)
                if ("number" != typeof arguments[S] || isNaN(
                    arguments[S]) || !isFinite(arguments[S])) return
                    !1;
            e = Math.min(e, 1), i = Math.min(i, 1), e = Math.max(e,
                0), i = Math.max(i, 0);
            var T = w ? new Float32Array(b) : new Array(b),
                k = !1,
                C = function(t) {
                    return k || h(), e === n && i === o ? t : 0 ===
                        t ? 0 : 1 === t ? 1 : l(f(t), n, o)
                };
            C.getControlPoints = function() {
                return [{
                    x: e,
                    y: n
                }, {
                    x: i,
                    y: o
                }]
            };
            var E = "generateBezier(" + [e, n, i, o] + ")";
            return C.toString = function() {
                return E
            }, C
        }

        function u(e, t) {
            var n = e;
            return m.isString(e) ? b.Easings[e] || (n = !1) : n = m
                .isArray(e) && 1 === e.length ? a.apply(null, e) :
                m.isArray(e) && 2 === e.length ? x.apply(null, e.concat(
                    [t])) : m.isArray(e) && 4 === e.length ? l.apply(
                    null, e) : !1, n === !1 && (n = b.Easings[b.defaults
                    .easing] ? b.defaults.easing : v), n
        }

        function c(e) {
            if (e) {
                var t = (new Date).getTime(),
                    n = b.State.calls.length;
                n > 1e4 && (b.State.calls = o(b.State.calls));
                for (var r = 0; n > r; r++)
                    if (b.State.calls[r]) {
                        var a = b.State.calls[r],
                            l = a[0],
                            u = a[2],
                            f = a[3],
                            h = !!f,
                            g = null;
                        f || (f = b.State.calls[r][3] = t - 16);
                        for (var y = Math.min((t - f) / u.duration,
                            1), v = 0, x = l.length; x > v; v++) {
                            var S = l[v],
                                k = S.element;
                            if (s(k)) {
                                var C = !1;
                                if (u.display !== i && null !== u.display &&
                                    "none" !== u.display) {
                                    if ("flex" === u.display) {
                                        var E = ["-webkit-box",
                                            "-moz-box",
                                            "-ms-flexbox",
                                            "-webkit-flex"
                                        ];
                                        p.each(E, function(e, t) {
                                            w.setPropertyValue(
                                                k,
                                                "display",
                                                t)
                                        })
                                    }
                                    w.setPropertyValue(k, "display",
                                        u.display)
                                }
                                u.visibility !== i && "hidden" !==
                                    u.visibility && w.setPropertyValue(
                                        k, "visibility", u.visibility
                                    );
                                for (var I in S)
                                    if ("element" !== I) {
                                        var P, O = S[I],
                                            L = m.isString(O.easing) ?
                                            b.Easings[O.easing] : O
                                            .easing;
                                        if (1 === y) P = O.endValue;
                                        else {
                                            var A = O.endValue - O.startValue;
                                            if (P = O.startValue +
                                                A * L(y, u, A), !h &&
                                                P === O.currentValue
                                            ) continue
                                        } if (O.currentValue = P,
                                            "tween" === I) g = P;
                                        else {
                                            if (w.Hooks.registered[
                                                I]) {
                                                var j = w.Hooks.getRoot(
                                                        I),
                                                    $ = s(k).rootPropertyValueCache[
                                                        j];
                                                $ && (O.rootPropertyValue =
                                                    $)
                                            }
                                            var D = w.setPropertyValue(
                                                k, I, O.currentValue +
                                                (0 ===
                                                    parseFloat(
                                                        P) ? "" :
                                                    O.unitType),
                                                O.rootPropertyValue,
                                                O.scrollData);
                                            w.Hooks.registered[I] &&
                                                (w.Normalizations.registered[
                                                        j] ? s(k).rootPropertyValueCache[
                                                        j] = w.Normalizations
                                                    .registered[j](
                                                        "extract",
                                                        null, D[1]) :
                                                    s(k).rootPropertyValueCache[
                                                        j] = D[1]),
                                                "transform" === D[0] &&
                                                (C = !0)
                                        }
                                    }
                                u.mobileHA && s(k).transformCache.translate3d ===
                                    i && (s(k).transformCache.translate3d =
                                        "(0px, 0px, 0px)", C = !0),
                                    C && w.flushTransformCache(k)
                            }
                        }
                        u.display !== i && "none" !== u.display &&
                            (b.State.calls[r][2].display = !1), u.visibility !==
                            i && "hidden" !== u.visibility && (b.State
                                .calls[r][2].visibility = !1), u.progress &&
                            u.progress.call(a[1], a[1], y, Math.max(
                                0, f + u.duration - t), f, g), 1 ===
                            y && d(r)
                    }
            }
            b.State.isTicking && T(c)
        }

        function d(e, t) {
            if (!b.State.calls[e]) return !1;
            for (var n = b.State.calls[e][0], o = b.State.calls[e][
                    1
                ], r = b.State.calls[e][2], a = b.State.calls[e]
                [4], l = !1, u = 0, c = n.length; c > u; u++) {
                var d = n[u].element;
                if (t || r.loop || ("none" === r.display && w.setPropertyValue(
                            d, "display", r.display), "hidden" ===
                        r.visibility && w.setPropertyValue(d,
                            "visibility", r.visibility)), r.loop !==
                    !0 && (p.queue(d)[1] === i || !
                        /\.velocityQueueEntryFlag/i.test(p.queue(d)[
                            1])) && s(d)) {
                    s(d).isAnimating = !1, s(d).rootPropertyValueCache = {};
                    var f = !1;
                    p.each(w.Lists.transforms3D, function(e, t) {
                        var n = /^scale/.test(t) ? 1 : 0,
                            o = s(d).transformCache[t];
                        s(d).transformCache[t] !== i && new RegExp(
                                "^\\(" + n + "[^.]").test(o) &&
                            (f = !0, delete s(d).transformCache[
                                t])
                    }), r.mobileHA && (f = !0, delete s(d).transformCache
                        .translate3d), f && w.flushTransformCache(
                        d), w.Values.removeClass(d,
                        "velocity-animating")
                }
                if (!t && r.complete && !r.loop && u === c - 1) try {
                    r.complete.call(o, o)
                } catch (h) {
                    setTimeout(function() {
                        throw h
                    }, 1)
                }
                a && r.loop !== !0 && a(o), s(d) && r.loop === !0 &&
                    !t && (p.each(s(d).tweensContainer, function(e,
                        t) {
                        /^rotate/.test(e) && 360 ===
                            parseFloat(t.endValue) && (t.endValue =
                                0, t.startValue = 360),
                            /^backgroundPosition/.test(e) &&
                            100 === parseFloat(t.endValue) &&
                            "%" === t.unitType && (t.endValue =
                                0, t.startValue = 100)
                    }), b(d, "reverse", {
                        loop: !0,
                        delay: r.delay
                    })), r.queue !== !1 && p.dequeue(d, r.queue)
            }
            b.State.calls[e] = !1;
            for (var m = 0, g = b.State.calls.length; g > m; m++)
                if (b.State.calls[m] !== !1) {
                    l = !0;
                    break
                }
            l === !1 && (b.State.isTicking = !1, delete b.State.calls,
                b.State.calls = [])
        }
        var p, f = function() {
                if (n.documentMode) return n.documentMode;
                for (var e = 7; e > 4; e--) {
                    var t = n.createElement("div");
                    if (t.innerHTML = "<!--[if IE " + e +
                        "]><span></span><![endif]-->", t.getElementsByTagName(
                            "span").length) return t = null, e
                }
                return i
            }(),
            h = function() {
                var e = 0;
                return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame ||
                    function(t) {
                        var n, i = (new Date).getTime();
                        return n = Math.max(0, 16 - (i - e)), e = i + n,
                            setTimeout(function() {
                                t(i + n)
                            }, n)
                    }
            }(),
            m = {
                isString: function(e) {
                    return "string" == typeof e
                },
                isArray: Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString
                        .call(e)
                },
                isFunction: function(e) {
                    return "[object Function]" === Object.prototype
                        .toString.call(e)
                },
                isNode: function(e) {
                    return e && e.nodeType
                },
                isNodeList: function(e) {
                    return "object" == typeof e &&
                        /^\[object (HTMLCollection|NodeList|Object)\]$/
                        .test(Object.prototype.toString.call(e)) &&
                        e.length !== i && (0 === e.length ||
                            "object" == typeof e[0] && e[0].nodeType >
                            0)
                },
                isWrapped: function(e) {
                    return e && (e.jquery || t.Zepto && t.Zepto.zepto
                        .isZ(e))
                },
                isSVG: function(e) {
                    return t.SVGElement && e instanceof t.SVGElement
                },
                isEmptyObject: function(e) {
                    for (var t in e) return !1;
                    return !0
                }
            },
            g = !1;
        if (e.fn && e.fn.jquery ? (p = e, g = !0) : p = t.Velocity.Utilities,
            8 >= f && !g) throw new Error(
            "Velocity: IE8 and below require jQuery to be loaded before Velocity."
        );
        if (7 >= f) return void(jQuery.fn.velocity = jQuery.fn.animate);
        var y = 400,
            v = "swing",
            b = {
                State: {
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                        .test(navigator.userAgent),
                    isAndroid: /Android/i.test(navigator.userAgent),
                    isGingerbread: /Android 2\.3\.[3-7]/i.test(
                        navigator.userAgent),
                    isChrome: t.chrome,
                    isFirefox: /Firefox/i.test(navigator.userAgent),
                    prefixElement: n.createElement("div"),
                    prefixMatches: {},
                    scrollAnchor: null,
                    scrollPropertyLeft: null,
                    scrollPropertyTop: null,
                    isTicking: !1,
                    calls: []
                },
                CSS: {},
                Utilities: p,
                Redirects: {},
                Easings: {},
                Promise: t.Promise,
                defaults: {
                    queue: "",
                    duration: y,
                    easing: v,
                    begin: i,
                    complete: i,
                    progress: i,
                    display: i,
                    visibility: i,
                    loop: !1,
                    delay: !1,
                    mobileHA: !0,
                    _cacheValues: !0
                },
                init: function(e) {
                    p.data(e, "velocity", {
                        isSVG: m.isSVG(e),
                        isAnimating: !1,
                        computedStyle: null,
                        tweensContainer: null,
                        rootPropertyValueCache: {},
                        transformCache: {}
                    })
                },
                hook: null,
                mock: !1,
                version: {
                    major: 1,
                    minor: 2,
                    patch: 2
                },
                debug: !1
            };
        t.pageYOffset !== i ? (b.State.scrollAnchor = t, b.State.scrollPropertyLeft =
            "pageXOffset", b.State.scrollPropertyTop =
            "pageYOffset") : (b.State.scrollAnchor = n.documentElement ||
            n.body.parentNode || n.body, b.State.scrollPropertyLeft =
            "scrollLeft", b.State.scrollPropertyTop = "scrollTop");
        var x = function() {
            function e(e) {
                return -e.tension * e.x - e.friction * e.v
            }

            function t(t, n, i) {
                var o = {
                    x: t.x + i.dx * n,
                    v: t.v + i.dv * n,
                    tension: t.tension,
                    friction: t.friction
                };
                return {
                    dx: o.v,
                    dv: e(o)
                }
            }

            function n(n, i) {
                var o = {
                        dx: n.v,
                        dv: e(n)
                    },
                    r = t(n, .5 * i, o),
                    s = t(n, .5 * i, r),
                    a = t(n, i, s),
                    l = 1 / 6 * (o.dx + 2 * (r.dx + s.dx) + a.dx),
                    u = 1 / 6 * (o.dv + 2 * (r.dv + s.dv) + a.dv);
                return n.x = n.x + l * i, n.v = n.v + u * i, n
            }
            return function i(e, t, o) {
                var r, s, a, l = {
                        x: -1,
                        v: 0,
                        tension: null,
                        friction: null
                    },
                    u = [0],
                    c = 0,
                    d = 1e-4,
                    p = .016;
                for (e = parseFloat(e) || 500, t = parseFloat(t) ||
                    20, o = o || null, l.tension = e, l.friction =
                    t, r = null !== o, r ? (c = i(e, t), s = c /
                        o * p) : s = p;;)
                    if (a = n(a || l, s), u.push(1 + a.x), c +=
                        16, !(Math.abs(a.x) > d && Math.abs(a.v) >
                            d)) break;
                return r ? function(e) {
                    return u[e * (u.length - 1) | 0]
                } : c
            }
        }();
        b.Easings = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            spring: function(e) {
                return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(
                    6 * -e)
            }
        }, p.each([
            ["ease", [.25, .1, .25, 1]],
            ["ease-in", [.42, 0, 1, 1]],
            ["ease-out", [0, 0, .58, 1]],
            ["ease-in-out", [.42, 0, .58, 1]],
            ["easeInSine", [.47, 0, .745, .715]],
            ["easeOutSine", [.39, .575, .565, 1]],
            ["easeInOutSine", [.445, .05, .55, .95]],
            ["easeInQuad", [.55, .085, .68, .53]],
            ["easeOutQuad", [.25, .46, .45, .94]],
            ["easeInOutQuad", [.455, .03, .515, .955]],
            ["easeInCubic", [.55, .055, .675, .19]],
            ["easeOutCubic", [.215, .61, .355, 1]],
            ["easeInOutCubic", [.645, .045, .355, 1]],
            ["easeInQuart", [.895, .03, .685, .22]],
            ["easeOutQuart", [.165, .84, .44, 1]],
            ["easeInOutQuart", [.77, 0, .175, 1]],
            ["easeInQuint", [.755, .05, .855, .06]],
            ["easeOutQuint", [.23, 1, .32, 1]],
            ["easeInOutQuint", [.86, 0, .07, 1]],
            ["easeInExpo", [.95, .05, .795, .035]],
            ["easeOutExpo", [.19, 1, .22, 1]],
            ["easeInOutExpo", [1, 0, 0, 1]],
            ["easeInCirc", [.6, .04, .98, .335]],
            ["easeOutCirc", [.075, .82, .165, 1]],
            ["easeInOutCirc", [.785, .135, .15, .86]]
        ], function(e, t) {
            b.Easings[t[0]] = l.apply(null, t[1])
        });
        var w = b.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color",
                    "backgroundColor", "borderColor",
                    "borderTopColor", "borderRightColor",
                    "borderBottomColor", "borderLeftColor",
                    "outlineColor"
                ],
                transformsBase: ["translateX", "translateY",
                    "scale", "scaleX", "scaleY", "skewX",
                    "skewY", "rotateZ"
                ],
                transforms3D: ["transformPerspective", "translateZ",
                    "scaleZ", "rotateX", "rotateY"
                ]
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur",
                        "black 0px 0px 0px"
                    ],
                    boxShadow: ["Color X Y Blur Spread",
                        "black 0px 0px 0px 0px"
                    ],
                    clip: ["Top Right Bottom Left",
                        "0px 0px 0px 0px"
                    ],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    for (var e = 0; e < w.Lists.colors.length; e++) {
                        var t = "color" === w.Lists.colors[e] ?
                            "0 0 0 1" : "255 255 255 1";
                        w.Hooks.templates[w.Lists.colors[e]] = [
                            "Red Green Blue Alpha", t
                        ]
                    }
                    var n, i, o;
                    if (f)
                        for (n in w.Hooks.templates) {
                            i = w.Hooks.templates[n], o = i[0].split(
                                " ");
                            var r = i[1].match(w.RegEx.valueSplit);
                            "Color" === o[0] && (o.push(o.shift()),
                                r.push(r.shift()), w.Hooks.templates[
                                    n] = [o.join(" "), r.join(
                                    " ")])
                        }
                    for (n in w.Hooks.templates) {
                        i = w.Hooks.templates[n], o = i[0].split(
                            " ");
                        for (var e in o) {
                            var s = n + o[e],
                                a = e;
                            w.Hooks.registered[s] = [n, a]
                        }
                    }
                },
                getRoot: function(e) {
                    var t = w.Hooks.registered[e];
                    return t ? t[0] : e
                },
                cleanRootPropertyValue: function(e, t) {
                    return w.RegEx.valueUnwrap.test(t) && (t =
                            t.match(w.RegEx.valueUnwrap)[1]), w
                        .Values.isCSSNullValue(t) && (t = w.Hooks
                            .templates[e][1]), t
                },
                extractValue: function(e, t) {
                    var n = w.Hooks.registered[e];
                    if (n) {
                        var i = n[0],
                            o = n[1];
                        return t = w.Hooks.cleanRootPropertyValue(
                            i, t), t.toString().match(w.RegEx
                            .valueSplit)[o]
                    }
                    return t
                },
                injectValue: function(e, t, n) {
                    var i = w.Hooks.registered[e];
                    if (i) {
                        var o, r, s = i[0],
                            a = i[1];
                        return n = w.Hooks.cleanRootPropertyValue(
                                s, n), o = n.toString().match(w
                                .RegEx.valueSplit), o[a] = t, r =
                            o.join(" ")
                    }
                    return n
                }
            },
            Normalizations: {
                registered: {
                    clip: function(e, t, n) {
                        switch (e) {
                            case "name":
                                return "clip";
                            case "extract":
                                var i;
                                return w.RegEx.wrappedValueAlreadyExtracted
                                    .test(n) ? i = n : (i = n.toString()
                                        .match(w.RegEx.valueUnwrap),
                                        i = i ? i[1].replace(
                                            /,(\s+)?/g, " ") :
                                        n), i;
                            case "inject":
                                return "rect(" + n + ")"
                        }
                    },
                    blur: function(e, t, n) {
                        switch (e) {
                            case "name":
                                return b.State.isFirefox ?
                                    "filter" : "-webkit-filter";
                            case "extract":
                                var i = parseFloat(n);
                                if (!i && 0 !== i) {
                                    var o = n.toString().match(
                                        /blur\(([0-9]+[A-z]+)\)/i
                                    );
                                    i = o ? o[1] : 0
                                }
                                return i;
                            case "inject":
                                return parseFloat(n) ? "blur(" +
                                    n + ")" : "none"
                        }
                    },
                    opacity: function(e, t, n) {
                        if (8 >= f) switch (e) {
                            case "name":
                                return "filter";
                            case "extract":
                                var i = n.toString().match(
                                    /alpha\(opacity=(.*)\)/i
                                );
                                return n = i ? i[1] / 100 :
                                    1;
                            case "inject":
                                return t.style.zoom = 1,
                                    parseFloat(n) >= 1 ? "" :
                                    "alpha(opacity=" +
                                    parseInt(100 *
                                        parseFloat(n), 10) +
                                    ")"
                        } else switch (e) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return n;
                            case "inject":
                                return n
                        }
                    }
                },
                register: function() {
                    9 >= f || b.State.isGingerbread || (w.Lists
                        .transformsBase = w.Lists.transformsBase
                        .concat(w.Lists.transforms3D));
                    for (var e = 0; e < w.Lists.transformsBase.length; e++)
                        ! function() {
                            var t = w.Lists.transformsBase[e];
                            w.Normalizations.registered[t] =
                                function(e, n, o) {
                                    switch (e) {
                                        case "name":
                                            return "transform";
                                        case "extract":
                                            return s(n) === i ||
                                                s(n).transformCache[
                                                    t] === i ?
                                                /^scale/i.test(
                                                    t) ? 1 : 0 :
                                                s(n).transformCache[
                                                    t].replace(
                                                    /[()]/g, ""
                                                );
                                        case "inject":
                                            var r = !1;
                                            switch (t.substr(0,
                                                t.length -
                                                1)) {
                                                case "translate":
                                                    r = !
                                                        /(%|px|em|rem|vw|vh|\d)$/i
                                                        .test(o);
                                                    break;
                                                case "scal":
                                                case "scale":
                                                    b.State.isAndroid &&
                                                        s(n).transformCache[
                                                            t] ===
                                                        i && 1 >
                                                        o && (o =
                                                            1),
                                                        r = !
                                                        /(\d)$/i
                                                        .test(o);
                                                    break;
                                                case "skew":
                                                    r = !
                                                        /(deg|\d)$/i
                                                        .test(o);
                                                    break;
                                                case "rotate":
                                                    r = !
                                                        /(deg|\d)$/i
                                                        .test(o)
                                            }
                                            return r || (s(n).transformCache[
                                                    t] =
                                                "(" + o +
                                                ")"), s(n).transformCache[
                                                t]
                                    }
                                }
                        }();
                    for (var e = 0; e < w.Lists.colors.length; e++)
                        ! function() {
                            var t = w.Lists.colors[e];
                            w.Normalizations.registered[t] =
                                function(e, n, o) {
                                    switch (e) {
                                        case "name":
                                            return t;
                                        case "extract":
                                            var r;
                                            if (w.RegEx.wrappedValueAlreadyExtracted
                                                .test(o)) r = o;
                                            else {
                                                var s, a = {
                                                    black: "rgb(0, 0, 0)",
                                                    blue: "rgb(0, 0, 255)",
                                                    gray: "rgb(128, 128, 128)",
                                                    green: "rgb(0, 128, 0)",
                                                    red: "rgb(255, 0, 0)",
                                                    white: "rgb(255, 255, 255)"
                                                };
                                                /^[A-z]+$/i.test
                                                    (o) ? s = a[
                                                        o] !==
                                                    i ? a[o] :
                                                    a.black : w
                                                    .RegEx.isHex
                                                    .test(o) ?
                                                    s = "rgb(" +
                                                    w.Values.hexToRgb(
                                                        o).join(
                                                        " ") +
                                                    ")" :
                                                    /^rgba?\(/i
                                                    .test(o) ||
                                                    (s = a.black),
                                                    r = (s || o)
                                                    .toString()
                                                    .match(w.RegEx
                                                        .valueUnwrap
                                                    )[1].replace(
                                                        /,(\s+)?/g,
                                                        " ")
                                            }
                                            return 8 >= f || 3 !==
                                                r.split(" ").length ||
                                                (r += " 1"), r;
                                        case "inject":
                                            return 8 >= f ? 4 ===
                                                o.split(" ").length &&
                                                (o = o.split(
                                                    /\s+/).slice(
                                                    0, 3).join(
                                                    " ")) : 3 ===
                                                o.split(" ").length &&
                                                (o += " 1"), (8 >=
                                                    f ? "rgb" :
                                                    "rgba") +
                                                "(" + o.replace(
                                                    /\s+/g, ","
                                                ).replace(
                                                    /\.(\d)+(?=,)/g,
                                                    "") + ")"
                                    }
                                }
                        }()
                }
            },
            Names: {
                camelCase: function(e) {
                    return e.replace(/-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    })
                },
                SVGAttribute: function(e) {
                    var t =
                        "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (f || b.State.isAndroid && !b.State.isChrome) &&
                        (t += "|transform"), new RegExp("^(" +
                            t + ")$", "i").test(e)
                },
                prefixCheck: function(e) {
                    if (b.State.prefixMatches[e]) return [b.State
                        .prefixMatches[e], !0
                    ];
                    for (var t = ["", "Webkit", "Moz", "ms",
                        "O"
                    ], n = 0, i = t.length; i > n; n++) {
                        var o;
                        if (o = 0 === n ? e : t[n] + e.replace(
                            /^\w/, function(e) {
                                return e.toUpperCase()
                            }), m.isString(b.State.prefixElement
                            .style[o])) return b.State.prefixMatches[
                            e] = o, [o, !0]
                    }
                    return [e, !1]
                }
            },
            Values: {
                hexToRgb: function(e) {
                    var t, n =
                        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                        i =
                        /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return e = e.replace(n, function(e, t, n, i) {
                        return t + t + n + n + i + i
                    }), t = i.exec(e), t ? [parseInt(t[1],
                            16), parseInt(t[2], 16),
                        parseInt(t[3], 16)
                    ] : [0, 0, 0]
                },
                isCSSNullValue: function(e) {
                    return 0 == e ||
                        /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i
                        .test(e)
                },
                getUnitType: function(e) {
                    return /^(rotate|skew)/i.test(e) ? "deg" :
                        /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i
                        .test(e) ? "" : "px"
                },
                getDisplayType: function(e) {
                    var t = e && e.tagName.toString().toLowerCase();
                    return
                        /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i
                        .test(t) ? "inline" : /^(li)$/i.test(t) ?
                        "list-item" : /^(tr)$/i.test(t) ?
                        "table-row" : /^(table)$/i.test(t) ?
                        "table" : /^(tbody)$/i.test(t) ?
                        "table-row-group" : "block"
                },
                addClass: function(e, t) {
                    e.classList ? e.classList.add(t) : e.className +=
                        (e.className.length ? " " : "") + t
                },
                removeClass: function(e, t) {
                    e.classList ? e.classList.remove(t) : e.className =
                        e.className.toString().replace(new RegExp(
                                "(^|\\s)" + t.split(" ").join(
                                    "|") + "(\\s|$)", "gi"),
                            " ")
                }
            },
            getPropertyValue: function(e, n, o, r) {
                function a(e, n) {
                    function o() {
                        u && w.setPropertyValue(e,
                            "display", "none")
                    }
                    var l = 0;
                    if (8 >= f) l = p.css(e, n);
                    else {
                        var u = !1;
                        if (/^(width|height)$/.test(n) && 0 ===
                            w.getPropertyValue(e, "display") &&
                            (u = !0, w.setPropertyValue(e,
                                "display", w.Values.getDisplayType(
                                    e))), !r) {
                            if ("height" === n &&
                                "border-box" !== w.getPropertyValue(
                                    e, "boxSizing").toString()
                                .toLowerCase()) {
                                var c = e.offsetHeight - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "borderTopWidth"
                                    )) || 0) - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "borderBottomWidth"
                                    )) || 0) - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "paddingTop"
                                    )) || 0) - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "paddingBottom"
                                    )) || 0);
                                return o(), c
                            }
                            if ("width" === n &&
                                "border-box" !== w.getPropertyValue(
                                    e, "boxSizing").toString()
                                .toLowerCase()) {
                                var d = e.offsetWidth - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "borderLeftWidth"
                                    )) || 0) - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "borderRightWidth"
                                    )) || 0) - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "paddingLeft"
                                    )) || 0) - (
                                    parseFloat(w.getPropertyValue(
                                        e,
                                        "paddingRight"
                                    )) || 0);
                                return o(), d
                            }
                        }
                        var h;
                        h = s(e) === i ? t.getComputedStyle(
                                e, null) : s(e).computedStyle ?
                            s(e).computedStyle : s(e).computedStyle =
                            t.getComputedStyle(e, null),
                            "borderColor" === n && (n =
                                "borderTopColor"), l = 9 ===
                            f && "filter" === n ? h.getPropertyValue(
                                n) : h[n], ("" === l ||
                                null === l) && (l = e.style[
                                n]), o()
                    } if ("auto" === l &&
                        /^(top|right|bottom|left)$/i.test(n)
                    ) {
                        var m = a(e, "position");
                        ("fixed" === m || "absolute" === m &&
                            /top|left/i.test(n)) && (l = p(
                            e).position()[n] + "px")
                    }
                    return l
                }
                var l;
                if (w.Hooks.registered[n]) {
                    var u = n,
                        c = w.Hooks.getRoot(u);
                    o === i && (o = w.getPropertyValue(e, w.Names
                            .prefixCheck(c)[0])), w.Normalizations
                        .registered[c] && (o = w.Normalizations
                            .registered[c]("extract", e, o)), l =
                        w.Hooks.extractValue(u, o)
                } else if (w.Normalizations.registered[n]) {
                    var d, h;
                    d = w.Normalizations.registered[n]("name",
                        e), "transform" !== d && (h = a(e,
                            w.Names.prefixCheck(d)[0]), w.Values
                        .isCSSNullValue(h) && w.Hooks.templates[
                            n] && (h = w.Hooks.templates[n]
                            [1])), l = w.Normalizations.registered[
                        n]("extract", e, h)
                }
                if (!/^[\d-]/.test(l))
                    if (s(e) && s(e).isSVG && w.Names.SVGAttribute(
                        n))
                        if (/^(height|width)$/i.test(n)) try {
                            l = e.getBBox()[n]
                        } catch (m) {
                            l = 0
                        } else l = e.getAttribute(n);
                        else l = a(e, w.Names.prefixCheck(n)[0]);
                return w.Values.isCSSNullValue(l) && (l = 0), b
                    .debug >= 2 && console.log("Get " + n +
                        ": " + l), l
            },
            setPropertyValue: function(e, n, i, o, r) {
                var a = n;
                if ("scroll" === n) r.container ? r.container[
                        "scroll" + r.direction] = i : "Left" ===
                    r.direction ? t.scrollTo(i, r.alternateValue) :
                    t.scrollTo(r.alternateValue, i);
                else if (w.Normalizations.registered[n] &&
                    "transform" === w.Normalizations.registered[
                        n]("name", e)) w.Normalizations.registered[
                        n]("inject", e, i), a = "transform", i =
                    s(e).transformCache[n];
                else {
                    if (w.Hooks.registered[n]) {
                        var l = n,
                            u = w.Hooks.getRoot(n);
                        o = o || w.getPropertyValue(e, u), i =
                            w.Hooks.injectValue(l, i, o), n = u
                    }
                    if (w.Normalizations.registered[n] && (i =
                            w.Normalizations.registered[n](
                                "inject", e, i), n = w.Normalizations
                            .registered[n]("name", e)), a = w.Names
                        .prefixCheck(n)[0], 8 >= f) try {
                        e.style[a] = i
                    } catch (c) {
                        b.debug && console.log(
                            "Browser does not support [" +
                            i + "] for [" + a + "]")
                    } else s(e) && s(e).isSVG && w.Names.SVGAttribute(
                        n) ? e.setAttribute(n, i) : e.style[
                        a] = i;
                    b.debug >= 2 && console.log("Set " + n +
                        " (" + a + "): " + i)
                }
                return [a, i]
            },
            flushTransformCache: function(e) {
                function t(t) {
                    return parseFloat(w.getPropertyValue(e,
                        t))
                }
                var n = "";
                if ((f || b.State.isAndroid && !b.State.isChrome) &&
                    s(e).isSVG) {
                    var i = {
                        translate: [t("translateX"), t(
                            "translateY")],
                        skewX: [t("skewX")],
                        skewY: [t("skewY")],
                        scale: 1 !== t("scale") ? [t(
                            "scale"), t("scale")] : [t(
                            "scaleX"), t("scaleY")],
                        rotate: [t("rotateZ"), 0, 0]
                    };
                    p.each(s(e).transformCache, function(e) {
                        /^translate/i.test(e) ? e =
                            "translate" : /^scale/i.test(
                                e) ? e = "scale" :
                            /^rotate/i.test(e) && (e =
                                "rotate"), i[e] && (n +=
                                e + "(" + i[e].join(" ") +
                                ") ", delete i[e])
                    })
                } else {
                    var o, r;
                    p.each(s(e).transformCache, function(t) {
                        return o = s(e).transformCache[
                                t],
                            "transformPerspective" ===
                            t ? (r = o, !0) : (9 === f &&
                                "rotateZ" === t && (t =
                                    "rotate"), void(n +=
                                    t + o + " "))
                    }), r && (n = "perspective" + r + " " +
                        n)
                }
                w.setPropertyValue(e, "transform", n)
            }
        };
        w.Hooks.register(), w.Normalizations.register(), b.hook =
            function(e, t, n) {
                var o = i;
                return e = r(e), p.each(e, function(e, r) {
                    if (s(r) === i && b.init(r), n === i) o ===
                        i && (o = b.CSS.getPropertyValue(r, t));
                    else {
                        var a = b.CSS.setPropertyValue(r, t, n);
                        "transform" === a[0] && b.CSS.flushTransformCache(
                            r), o = a
                    }
                }), o
            };
        var S = function() {
            function e() {
                return a ? I.promise || null : l
            }

            function o() {
                function e(e) {
                    function d(e, t) {
                        var n = i,
                            o = i,
                            s = i;
                        return m.isArray(e) ? (n = e[0], !
                                m.isArray(e[1]) &&
                                /^[\d-]/.test(e[1]) ||
                                m.isFunction(e[1]) || w
                                .RegEx.isHex.test(e[1]) ?
                                s = e[1] : (m.isString(
                                        e[1]) && !w.RegEx
                                    .isHex.test(e[1]) ||
                                    m.isArray(e[1])) &&
                                (o = t ? e[1] : u(e[1],
                                    a.duration), e[
                                    2] !== i && (s =
                                    e[2]))) : n = e, t ||
                            (o = o || a.easing), m.isFunction(
                                n) && (n = n.call(r, k,
                                T)), m.isFunction(s) &&
                            (s = s.call(r, k, T)), [n ||
                                0, o, s
                            ]
                    }

                    function f(e, t) {
                        var n, i;
                        return i = (t || "0").toString()
                            .toLowerCase().replace(
                                /[%A-z]+$/, function(e) {
                                    return n = e, ""
                                }), n || (n = w.Values.getUnitType(
                                e)), [i, n]
                    }

                    function y() {
                        var e = {
                                myParent: r.parentNode ||
                                    n.body,
                                position: w.getPropertyValue(
                                    r, "position"),
                                fontSize: w.getPropertyValue(
                                    r, "fontSize")
                            },
                            i = e.position === D.lastPosition &&
                            e.myParent === D.lastParent,
                            o = e.fontSize === D.lastFontSize;
                        D.lastParent = e.myParent, D.lastPosition =
                            e.position, D.lastFontSize =
                            e.fontSize;
                        var a = 100,
                            l = {};
                        if (o && i) l.emToPx = D.lastEmToPx,
                            l.percentToPxWidth = D.lastPercentToPxWidth,
                            l.percentToPxHeight = D.lastPercentToPxHeight;
                        else {
                            var u = s(r).isSVG ? n.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "rect") : n.createElement(
                                "div");
                            b.init(u), e.myParent.appendChild(
                                    u), p.each([
                                    "overflow",
                                    "overflowX",
                                    "overflowY"
                                ], function(e, t) {
                                    b.CSS.setPropertyValue(
                                        u, t,
                                        "hidden"
                                    )
                                }), b.CSS.setPropertyValue(
                                    u, "position", e.position
                                ), b.CSS.setPropertyValue(
                                    u, "fontSize", e.fontSize
                                ), b.CSS.setPropertyValue(
                                    u, "boxSizing",
                                    "content-box"), p.each(
                                    ["minWidth",
                                        "maxWidth",
                                        "width",
                                        "minHeight",
                                        "maxHeight",
                                        "height"
                                    ], function(e, t) {
                                        b.CSS.setPropertyValue(
                                            u, t, a +
                                            "%")
                                    }), b.CSS.setPropertyValue(
                                    u, "paddingLeft", a +
                                    "em"), l.percentToPxWidth =
                                D.lastPercentToPxWidth =
                                (parseFloat(w.getPropertyValue(
                                    u, "width",
                                    null, !0)) || 1) /
                                a, l.percentToPxHeight =
                                D.lastPercentToPxHeight =
                                (parseFloat(w.getPropertyValue(
                                    u, "height",
                                    null, !0)) || 1) /
                                a, l.emToPx = D.lastEmToPx =
                                (parseFloat(w.getPropertyValue(
                                    u,
                                    "paddingLeft"
                                )) || 1) / a, e.myParent
                                .removeChild(u)
                        }
                        return null === D.remToPx && (D
                                .remToPx = parseFloat(w
                                    .getPropertyValue(n
                                        .body,
                                        "fontSize")) ||
                                16), null === D.vwToPx &&
                            (D.vwToPx = parseFloat(t.innerWidth) /
                                100, D.vhToPx =
                                parseFloat(t.innerHeight) /
                                100), l.remToPx = D.remToPx,
                            l.vwToPx = D.vwToPx, l.vhToPx =
                            D.vhToPx, b.debug >= 1 &&
                            console.log("Unit ratios: " +
                                JSON.stringify(l), r),
                            l
                    }
                    if (a.begin && 0 === k) try {
                        a.begin.call(h, h)
                    } catch (x) {
                        setTimeout(function() {
                            throw x
                        }, 1)
                    }
                    if ("scroll" === P) {
                        var S, C, E, O = /^x$/i.test(a.axis) ?
                            "Left" : "Top",
                            L = parseFloat(a.offset) || 0;
                        a.container ? m.isWrapped(a.container) ||
                            m.isNode(a.container) ? (a.container =
                                a.container[0] || a.container,
                                S = a.container["scroll" +
                                    O], E = S + p(r).position()[
                                    O.toLowerCase()] + L) :
                            a.container = null : (S = b.State
                                .scrollAnchor[b.State[
                                    "scrollProperty" +
                                    O]], C = b.State.scrollAnchor[
                                    b.State[
                                        "scrollProperty" +
                                        ("Left" === O ?
                                            "Top" : "Left")
                                    ]], E = p(r).offset()[O
                                    .toLowerCase()] + L), l = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: S,
                                    currentValue: S,
                                    endValue: E,
                                    unitType: "",
                                    easing: a.easing,
                                    scrollData: {
                                        container: a.container,
                                        direction: O,
                                        alternateValue: C
                                    }
                                },
                                element: r
                            }, b.debug && console.log(
                                "tweensContainer (scroll): ",
                                l.scroll, r)
                    } else if ("reverse" === P) {
                        if (!s(r).tweensContainer) return
                            void p.dequeue(r, a.queue);
                        "none" === s(r).opts.display && (s(
                                    r).opts.display =
                                "auto"), "hidden" === s(r).opts
                            .visibility && (s(r).opts.visibility =
                                "visible"), s(r).opts.loop = !
                            1, s(r).opts.begin = null, s(r)
                            .opts.complete = null, v.easing ||
                            delete a.easing, v.duration ||
                            delete a.duration, a = p.extend({},
                                s(r).opts, a);
                        var A = p.extend(!0, {}, s(r).tweensContainer);
                        for (var j in A)
                            if ("element" !== j) {
                                var $ = A[j].startValue;
                                A[j].startValue = A[j].currentValue =
                                    A[j].endValue, A[j].endValue =
                                    $, m.isEmptyObject(v) ||
                                    (A[j].easing = a.easing),
                                    b.debug && console.log(
                                        "reverse tweensContainer (" +
                                        j + "): " + JSON.stringify(
                                            A[j]), r)
                            }
                        l = A
                    } else if ("start" === P) {
                        var A;
                        s(r).tweensContainer && s(r).isAnimating ===
                            !0 && (A = s(r).tweensContainer),
                            p.each(g, function(e, t) {
                                if (RegExp("^" + w.Lists
                                    .colors.join(
                                        "$|^") +
                                    "$").test(e)) {
                                    var n = d(t, !0),
                                        o = n[0],
                                        r = n[1],
                                        s = n[2];
                                    if (w.RegEx.isHex.test(
                                        o)) {
                                        for (var a = [
                                                    "Red",
                                                    "Green",
                                                    "Blue"
                                                ], l =
                                                w.Values
                                                .hexToRgb(
                                                    o),
                                                u = s ?
                                                w.Values
                                                .hexToRgb(
                                                    s) :
                                                i, c =
                                                0; c <
                                            a.length; c++
                                        ) {
                                            var p = [l[
                                                c
                                            ]];
                                            r && p.push(
                                                    r),
                                                u !== i &&
                                                p.push(
                                                    u[c]
                                                ), g[e +
                                                    a[c]
                                                ] = p
                                        }
                                        delete g[e]
                                    }
                                }
                            });
                        for (var H in g) {
                            var _ = d(g[H]),
                                q = _[0],
                                N = _[1],
                                M = _[2];
                            H = w.Names.camelCase(H);
                            var R = w.Hooks.getRoot(H),
                                F = !1;
                            if (s(r).isSVG || "tween" === R ||
                                w.Names.prefixCheck(R)[1] !==
                                !1 || w.Normalizations.registered[
                                    R] !== i) {
                                (a.display !== i && null !==
                                    a.display && "none" !==
                                    a.display || a.visibility !==
                                    i && "hidden" !== a.visibility
                                ) && /opacity|filter/.test(
                                        H) && !M && 0 !== q &&
                                    (M = 0), a._cacheValues &&
                                    A && A[H] ? (M === i &&
                                        (M = A[H].endValue +
                                            A[H].unitType),
                                        F = s(r).rootPropertyValueCache[
                                            R]) : w.Hooks.registered[
                                        H] ? M === i ? (F =
                                        w.getPropertyValue(
                                            r, R), M = w.getPropertyValue(
                                            r, H, F)) : F =
                                    w.Hooks.templates[R][1] :
                                    M === i && (M = w.getPropertyValue(
                                        r, H));
                                var W, B, V, X = !1;
                                if (W = f(H, M), M = W[0],
                                    V = W[1], W = f(H, q),
                                    q = W[0].replace(
                                        /^([+-\/*])=/,
                                        function(e, t) {
                                            return X = t,
                                                ""
                                        }), B = W[1], M =
                                    parseFloat(M) || 0, q =
                                    parseFloat(q) || 0, "%" ===
                                    B && (
                                        /^(fontSize|lineHeight)$/
                                        .test(H) ? (q /=
                                            100, B = "em") :
                                        /^scale/.test(H) ?
                                        (q /= 100, B = "") :
                                        /(Red|Green|Blue)$/i
                                        .test(H) && (q = q /
                                            100 * 255, B =
                                            "")), /[\/*]/.test(
                                        X)) B = V;
                                else if (V !== B && 0 !== M)
                                    if (0 === q) B = V;
                                    else {
                                        o = o || y();
                                        var Y =
                                            /margin|padding|left|right|width|text|word|letter/i
                                            .test(H) ||
                                            /X$/.test(H) ||
                                            "x" === H ? "x" :
                                            "y";
                                        switch (V) {
                                            case "%":
                                                M *= "x" ===
                                                    Y ? o.percentToPxWidth :
                                                    o.percentToPxHeight;
                                                break;
                                            case "px":
                                                break;
                                            default:
                                                M *= o[V +
                                                    "ToPx"
                                                ]
                                        }
                                        switch (B) {
                                            case "%":
                                                M *= 1 / (
                                                    "x" ===
                                                    Y ?
                                                    o.percentToPxWidth :
                                                    o.percentToPxHeight
                                                );
                                                break;
                                            case "px":
                                                break;
                                            default:
                                                M *= 1 / o[
                                                    B +
                                                    "ToPx"
                                                ]
                                        }
                                    }
                                switch (X) {
                                    case "+":
                                        q = M + q;
                                        break;
                                    case "-":
                                        q = M - q;
                                        break;
                                    case "*":
                                        q = M * q;
                                        break;
                                    case "/":
                                        q = M / q
                                }
                                l[H] = {
                                    rootPropertyValue: F,
                                    startValue: M,
                                    currentValue: M,
                                    endValue: q,
                                    unitType: B,
                                    easing: N
                                }, b.debug && console.log(
                                    "tweensContainer (" +
                                    H + "): " + JSON.stringify(
                                        l[H]), r)
                            } else b.debug && console.log(
                                "Skipping [" + R +
                                "] due to a lack of browser support."
                            )
                        }
                        l.element = r
                    }
                    l.element && (w.Values.addClass(r,
                            "velocity-animating"), z.push(
                            l), "" === a.queue && (s(r)
                            .tweensContainer = l, s(r).opts =
                            a), s(r).isAnimating = !0,
                        k === T - 1 ? (b.State.calls.push(
                                [z, h, a, null, I.resolver]
                            ), b.State.isTicking === !1 &&
                            (b.State.isTicking = !0, c())
                        ) : k++)
                }
                var o, r = this,
                    a = p.extend({}, b.defaults, v),
                    l = {};
                switch (s(r) === i && b.init(r), parseFloat(a.delay) &&
                    a.queue !== !1 && p.queue(r, a.queue,
                        function(e) {
                            b.velocityQueueEntryFlag = !0, s(r)
                                .delayTimer = {
                                    setTimeout: setTimeout(e,
                                        parseFloat(a.delay)
                                    ),
                                    next: e
                                }
                        }), a.duration.toString().toLowerCase()
                ) {
                    case "fast":
                        a.duration = 200;
                        break;
                    case "normal":
                        a.duration = y;
                        break;
                    case "slow":
                        a.duration = 600;
                        break;
                    default:
                        a.duration = parseFloat(a.duration) ||
                            1
                }
                b.mock !== !1 && (b.mock === !0 ? a.duration =
                        a.delay = 1 : (a.duration *= parseFloat(
                                b.mock) || 1, a.delay *=
                            parseFloat(b.mock) || 1)), a.easing =
                    u(a.easing, a.duration), a.begin && !m.isFunction(
                        a.begin) && (a.begin = null), a.progress &&
                    !m.isFunction(a.progress) && (a.progress =
                        null), a.complete && !m.isFunction(a.complete) &&
                    (a.complete = null), a.display !== i &&
                    null !== a.display && (a.display = a.display
                        .toString().toLowerCase(), "auto" === a
                        .display && (a.display = b.CSS.Values.getDisplayType(
                            r))), a.visibility !== i && null !==
                    a.visibility && (a.visibility = a.visibility
                        .toString().toLowerCase()), a.mobileHA =
                    a.mobileHA && b.State.isMobile && !b.State.isGingerbread,
                    a.queue === !1 ? a.delay ? setTimeout(e, a.delay) :
                    e() : p.queue(r, a.queue, function(t, n) {
                        return n === !0 ? (I.promise && I.resolver(
                            h), !0) : (b.velocityQueueEntryFlag = !
                            0, void e(t))
                    }), "" !== a.queue && "fx" !== a.queue ||
                    "inprogress" === p.queue(r)[0] || p.dequeue(
                        r)
            }
            var a, l, f, h, g, v, x = arguments[0] && (arguments[0]
                .p || p.isPlainObject(arguments[0].properties) &&
                !arguments[0].properties.names || m.isString(
                    arguments[0].properties));
            if (m.isWrapped(this) ? (a = !1, f = 0, h = this, l =
                this) : (a = !0, f = 1, h = x ? arguments[0].elements ||
                arguments[0].e : arguments[0]), h = r(h)) {
                x ? (g = arguments[0].properties || arguments[0].p,
                        v = arguments[0].options || arguments[0].o) :
                    (g = arguments[f], v = arguments[f + 1]);
                var T = h.length,
                    k = 0;
                if (!/^(stop|finish|finishAll)$/i.test(g) && !p.isPlainObject(
                    v)) {
                    var C = f + 1;
                    v = {};
                    for (var E = C; E < arguments.length; E++) m.isArray(
                            arguments[E]) || !
                        /^(fast|normal|slow)$/i.test(arguments[E]) &&
                        !/^\d/.test(arguments[E]) ? m.isString(
                            arguments[E]) || m.isArray(arguments[E]) ?
                        v.easing = arguments[E] : m.isFunction(
                            arguments[E]) && (v.complete =
                            arguments[E]) : v.duration = arguments[
                            E]
                }
                var I = {
                    promise: null,
                    resolver: null,
                    rejecter: null
                };
                a && b.Promise && (I.promise = new b.Promise(
                    function(e, t) {
                        I.resolver = e, I.rejecter = t
                    }));
                var P;
                switch (g) {
                    case "scroll":
                        P = "scroll";
                        break;
                    case "reverse":
                        P = "reverse";
                        break;
                    case "finish":
                    case "finishAll":
                    case "stop":
                        p.each(h, function(e, t) {
                            s(t) && s(t).delayTimer && (
                                    clearTimeout(s(t).delayTimer
                                        .setTimeout), s(t).delayTimer
                                    .next && s(t).delayTimer
                                    .next(), delete s(t).delayTimer
                                ), "finishAll" !== g || v !==
                                !0 && !m.isString(v) || (p.each(
                                    p.queue(t, m.isString(
                                        v) ? v : ""),
                                    function(e, t) {
                                        m.isFunction(t) &&
                                            t()
                                    }), p.queue(t, m.isString(
                                    v) ? v : "", []))
                        });
                        var O = [];
                        return p.each(b.State.calls, function(e, t) {
                            t && p.each(t[1], function(n, o) {
                                var r = v === i ?
                                    "" : v;
                                return r === !0 ||
                                    t[2].queue ===
                                    r || v === i &&
                                    t[2].queue ===
                                    !1 ? void p.each(
                                        h, function(
                                            n, i) {
                                            i === o &&
                                                ((v ===
                                                        !
                                                        0 ||
                                                        m
                                                        .isString(
                                                            v
                                                        )
                                                    ) &&
                                                    (
                                                        p
                                                        .each(
                                                            p
                                                            .queue(
                                                                i,
                                                                m
                                                                .isString(
                                                                    v
                                                                ) ?
                                                                v :
                                                                ""
                                                            ),
                                                            function(
                                                                e,
                                                                t
                                                            ) {
                                                                m
                                                                    .isFunction(
                                                                        t
                                                                    ) &&
                                                                    t(
                                                                        null, !
                                                                        0
                                                                    )
                                                            }
                                                        ),
                                                        p
                                                        .queue(
                                                            i,
                                                            m
                                                            .isString(
                                                                v
                                                            ) ?
                                                            v :
                                                            "", []
                                                        )
                                                    ),
                                                    "stop" ===
                                                    g ?
                                                    (
                                                        s(
                                                            i
                                                        ) &&
                                                        s(
                                                            i
                                                        )
                                                        .tweensContainer &&
                                                        r !==
                                                        !
                                                        1 &&
                                                        p
                                                        .each(
                                                            s(
                                                                i
                                                            )
                                                            .tweensContainer,
                                                            function(
                                                                e,
                                                                t
                                                            ) {
                                                                t
                                                                    .endValue =
                                                                    t
                                                                    .currentValue
                                                            }
                                                        ),
                                                        O
                                                        .push(
                                                            e
                                                        )
                                                    ) :
                                                    (
                                                        "finish" ===
                                                        g ||
                                                        "finishAll" ===
                                                        g
                                                    ) &&
                                                    (
                                                        t[
                                                            2
                                                        ]
                                                        .duration =
                                                        1
                                                    )
                                                )
                                        }) : !0
                            })
                        }), "stop" === g && (p.each(O, function(
                            e, t) {
                            d(t, !0)
                        }), I.promise && I.resolver(h)), e();
                    default:
                        if (!p.isPlainObject(g) || m.isEmptyObject(
                            g)) {
                            if (m.isString(g) && b.Redirects[g]) {
                                var L = p.extend({}, v),
                                    A = L.duration,
                                    j = L.delay || 0;
                                return L.backwards === !0 && (h = p
                                    .extend(!0, [], h).reverse()
                                ), p.each(h, function(e, t) {
                                    parseFloat(L.stagger) ?
                                        L.delay = j +
                                        parseFloat(L.stagger) *
                                        e : m.isFunction(L.stagger) &&
                                        (L.delay = j + L.stagger
                                            .call(t, e, T)),
                                        L.drag && (L.duration =
                                            parseFloat(A) ||
                                            (
                                                /^(callout|transition)/
                                                .test(g) ?
                                                1e3 : y), L
                                            .duration =
                                            Math.max(L.duration *
                                                (L.backwards ?
                                                    1 - e /
                                                    T : (e +
                                                        1) /
                                                    T), .75 *
                                                L.duration,
                                                200)), b.Redirects[
                                            g].call(t, t, L || {},
                                            e, T, h, I.promise ?
                                            I : i)
                                }), e()
                            }
                            var $ = "Velocity: First argument (" +
                                g +
                                ") was not a property map, a known action, or a registered redirect. Aborting.";
                            return I.promise ? I.rejecter(new Error(
                                $)) : console.log($), e()
                        }
                        P = "start"
                }
                var D = {
                        lastParent: null,
                        lastPosition: null,
                        lastFontSize: null,
                        lastPercentToPxWidth: null,
                        lastPercentToPxHeight: null,
                        lastEmToPx: null,
                        remToPx: null,
                        vwToPx: null,
                        vhToPx: null
                    },
                    z = [];
                p.each(h, function(e, t) {
                    m.isNode(t) && o.call(t)
                });
                var H, L = p.extend({}, b.defaults, v);
                if (L.loop = parseInt(L.loop), H = 2 * L.loop - 1,
                    L.loop)
                    for (var _ = 0; H > _; _++) {
                        var q = {
                            delay: L.delay,
                            progress: L.progress
                        };
                        _ === H - 1 && (q.display = L.display, q.visibility =
                            L.visibility, q.complete = L.complete
                        ), S(h, "reverse", q)
                    }
                return e()
            }
        };
        b = p.extend(S, b), b.animate = S;
        var T = t.requestAnimationFrame || h;
        return b.State.isMobile || n.hidden === i || n.addEventListener(
            "visibilitychange", function() {
                n.hidden ? (T = function(e) {
                    return setTimeout(function() {
                        e(!0)
                    }, 16)
                }, c()) : T = t.requestAnimationFrame || h
            }), e.Velocity = b, e !== t && (e.fn.velocity = S, e.fn
            .velocity.defaults = b.defaults), p.each(["Down", "Up"],
            function(e, t) {
                b.Redirects["slide" + t] = function(e, n, o, r, s,
                    a) {
                    var l = p.extend({}, n),
                        u = l.begin,
                        c = l.complete,
                        d = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        f = {};
                    l.display === i && (l.display = "Down" ===
                        t ? "inline" === b.CSS.Values.getDisplayType(
                            e) ? "inline-block" : "block" :
                        "none"), l.begin = function() {
                        u && u.call(s, s);
                        for (var n in d) {
                            f[n] = e.style[n];
                            var i = b.CSS.getPropertyValue(
                                e, n);
                            d[n] = "Down" === t ? [i, 0] : [
                                0, i
                            ]
                        }
                        f.overflow = e.style.overflow, e.style
                            .overflow = "hidden"
                    }, l.complete = function() {
                        for (var t in f) e.style[t] = f[t];
                        c && c.call(s, s), a && a.resolver(
                            s)
                    }, b(e, d, l)
                }
            }), p.each(["In", "Out"], function(e, t) {
            b.Redirects["fade" + t] = function(e, n, o, r, s, a) {
                var l = p.extend({}, n),
                    u = {
                        opacity: "In" === t ? 1 : 0
                    },
                    c = l.complete;
                o !== r - 1 ? l.complete = l.begin = null :
                    l.complete = function() {
                        c && c.call(s, s), a && a.resolver(
                            s)
                    }, l.display === i && (l.display = "In" ===
                        t ? "auto" : "none"), b(this, u, l)
            }
        }), b
    }(window.jQuery || window.Zepto || window, window, document)
}),
function(e) {
    "function" == typeof require && "object" == typeof exports ? module.exports =
        e() : "function" == typeof define && define.amd ? define(["velocity"],
            e) : e()
}(function() {
    return function(e, t, n, i) {
        function o(e, t) {
            var n = [];
            return e && t ? (s.each([e, t], function(e, t) {
                var i = [];
                s.each(t, function(e, t) {
                    for (; t.toString().length <
                        5;) t = "0" + t;
                    i.push(t)
                }), n.push(i.join(""))
            }), parseFloat(n[0]) > parseFloat(n[1])) : !1
        }
        if (!e.Velocity || !e.Velocity.Utilities) return void(t.console &&
            console.log(
                "Velocity UI Pack: Velocity must be loaded first. Aborting."
            ));
        var r = e.Velocity,
            s = r.Utilities,
            a = r.version,
            l = {
                major: 1,
                minor: 1,
                patch: 0
            };
        if (o(l, a)) {
            var u =
                "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
            throw alert(u), new Error(u)
        }
        r.RegisterEffect = r.RegisterUI = function(e, t) {
            function n(e, t, n, i) {
                var o, a = 0;
                s.each(e.nodeType ? [e] : e, function(e, t) {
                    i && (n += e * i), o = t.parentNode,
                        s.each(["height", "paddingTop",
                            "paddingBottom",
                            "marginTop",
                            "marginBottom"
                        ], function(e, n) {
                            a += parseFloat(r.CSS.getPropertyValue(
                                t, n))
                        })
                }), r.animate(o, {
                    height: ("In" === t ? "+" : "-") +
                        "=" + a
                }, {
                    queue: !1,
                    easing: "ease-in-out",
                    duration: n * ("In" === t ? .6 : 1)
                })
            }
            return r.Redirects[e] = function(o, a, l, u, c, d) {
                function p() {
                    a.display !== i && "none" !== a.display ||
                        !/Out$/.test(e) || s.each(c.nodeType ? [
                            c
                        ] : c, function(e, t) {
                            r.CSS.setPropertyValue(t,
                                "display", "none")
                        }), a.complete && a.complete.call(c,
                            c), d && d.resolver(c || o)
                }
                var f = l === u - 1;
                "function" == typeof t.defaultDuration ? t.defaultDuration =
                    t.defaultDuration.call(c, c) : t.defaultDuration =
                    parseFloat(t.defaultDuration);
                for (var h = 0; h < t.calls.length; h++) {
                    var m = t.calls[h],
                        g = m[0],
                        y = a.duration || t.defaultDuration ||
                        1e3,
                        v = m[1],
                        b = m[2] || {},
                        x = {};
                    if (x.duration = y * (v || 1), x.queue = a.queue ||
                        "", x.easing = b.easing || "ease", x.delay =
                        parseFloat(b.delay) || 0, x._cacheValues =
                        b._cacheValues || !0, 0 === h) {
                        if (x.delay += parseFloat(a.delay) || 0,
                            0 === l && (x.begin = function() {
                                a.begin && a.begin.call(c,
                                    c);
                                var t = e.match(/(In|Out)$/);
                                t && "In" === t[0] && g.opacity !==
                                    i && s.each(c.nodeType ? [
                                        c
                                    ] : c, function(e,
                                        t) {
                                        r.CSS.setPropertyValue(
                                            t,
                                            "opacity",
                                            0)
                                    }), a.animateParentHeight &&
                                    t && n(c, t[0], y + x.delay,
                                        a.stagger)
                            }), null !== a.display)
                            if (a.display !== i && "none" !== a
                                .display) x.display = a.display;
                            else if (/In$/.test(e)) {
                            var w = r.CSS.Values.getDisplayType(
                                o);
                            x.display = "inline" === w ?
                                "inline-block" : w
                        }
                        a.visibility && "hidden" !== a.visibility &&
                            (x.visibility = a.visibility)
                    }
                    h === t.calls.length - 1 && (x.complete =
                        function() {
                            if (t.reset) {
                                for (var e in t.reset) {
                                    var n = t.reset[e];
                                    r.CSS.Hooks.registered[
                                            e] !== i ||
                                        "string" != typeof n &&
                                        "number" != typeof n ||
                                        (t.reset[e] = [t.reset[
                                            e], t.reset[
                                            e]])
                                }
                                var s = {
                                    duration: 0,
                                    queue: !1
                                };
                                f && (s.complete = p), r.animate(
                                    o, t.reset, s)
                            } else f && p()
                        }, "hidden" === a.visibility && (x.visibility =
                            a.visibility)), r.animate(o, g,
                        x)
                }
            }, r
        }, r.RegisterEffect.packagedEffects = {
            "callout.bounce": {
                defaultDuration: 550,
                calls: [
                    [{
                        translateY: -30
                    }, .25],
                    [{
                        translateY: 0
                    }, .125],
                    [{
                        translateY: -15
                    }, .125],
                    [{
                        translateY: 0
                    }, .25]
                ]
            },
            "callout.shake": {
                defaultDuration: 800,
                calls: [
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 11
                    }, .125],
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 11
                    }, .125],
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 11
                    }, .125],
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 0
                    }, .125]
                ]
            },
            "callout.flash": {
                defaultDuration: 1100,
                calls: [
                    [{
                        opacity: [0, "easeInOutQuad", 1]
                    }, .25],
                    [{
                        opacity: [1, "easeInOutQuad"]
                    }, .25],
                    [{
                        opacity: [0, "easeInOutQuad"]
                    }, .25],
                    [{
                        opacity: [1, "easeInOutQuad"]
                    }, .25]
                ]
            },
            "callout.pulse": {
                defaultDuration: 825,
                calls: [
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1
                    }, .5, {
                        easing: "easeInExpo"
                    }],
                    [{
                        scaleX: 1,
                        scaleY: 1
                    }, .5]
                ]
            },
            "callout.swing": {
                defaultDuration: 950,
                calls: [
                    [{
                        rotateZ: 15
                    }, .2],
                    [{
                        rotateZ: -10
                    }, .2],
                    [{
                        rotateZ: 5
                    }, .2],
                    [{
                        rotateZ: -5
                    }, .2],
                    [{
                        rotateZ: 0
                    }, .2]
                ]
            },
            "callout.tada": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        scaleX: .9,
                        scaleY: .9,
                        rotateZ: -3
                    }, .1],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        rotateZ: 3
                    }, .1],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        rotateZ: -3
                    }, .1],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    [{
                        scaleX: 1,
                        scaleY: 1,
                        rotateZ: 0
                    }, .2]
                ]
            },
            "transition.fadeIn": {
                defaultDuration: 500,
                calls: [
                    [{
                        opacity: [1, 0]
                    }]
                ]
            },
            "transition.fadeOut": {
                defaultDuration: 500,
                calls: [
                    [{
                        opacity: [0, 1]
                    }]
                ]
            },
            "transition.flipXIn": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        rotateY: [0, -55]
                    }]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipXOut": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        rotateY: 55
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipYIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        rotateX: [0, -45]
                    }]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipYOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        rotateX: 25
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.flipBounceXIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [.725, 0],
                        transformPerspective: [400, 400],
                        rotateY: [-10, 90]
                    }, .5],
                    [{
                        opacity: .8,
                        rotateY: 10
                    }, .25],
                    [{
                        opacity: 1,
                        rotateY: 0
                    }, .25]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceXOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [.9, 1],
                        transformPerspective: [400, 400],
                        rotateY: -10
                    }, .5],
                    [{
                        opacity: 0,
                        rotateY: 90
                    }, .5]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipBounceYIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [.725, 0],
                        transformPerspective: [400, 400],
                        rotateX: [-10, 90]
                    }, .5],
                    [{
                        opacity: .8,
                        rotateX: 10
                    }, .25],
                    [{
                        opacity: 1,
                        rotateX: 0
                    }, .25]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceYOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [.9, 1],
                        transformPerspective: [400, 400],
                        rotateX: -15
                    }, .5],
                    [{
                        opacity: 0,
                        rotateX: 90
                    }, .5]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.swoopIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["100%", "50%"],
                        transformOriginY: ["100%", "100%"],
                        scaleX: [1, 0],
                        scaleY: [1, 0],
                        translateX: [0, -700],
                        translateZ: 0
                    }]
                ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.swoopOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "100%"],
                        transformOriginY: ["100%", "100%"],
                        scaleX: 0,
                        scaleY: 0,
                        translateX: -700,
                        translateZ: 0
                    }]
                ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0
                }
            },
            "transition.whirlIn": {
                defaultDuration: 850,
                calls: [
                    [{
                            opacity: [1, 0],
                            transformOriginX: ["50%", "50%"],
                            transformOriginY: ["50%", "50%"],
                            scaleX: [1, 0],
                            scaleY: [1, 0],
                            rotateY: [0, 160]
                        },
                        1, {
                            easing: "easeInOutSine"
                        }
                    ]
                ]
            },
            "transition.whirlOut": {
                defaultDuration: 750,
                calls: [
                    [{
                            opacity: [0, "easeInOutQuint", 1],
                            transformOriginX: ["50%", "50%"],
                            transformOriginY: ["50%", "50%"],
                            scaleX: 0,
                            scaleY: 0,
                            rotateY: 160
                        },
                        1, {
                            easing: "swing"
                        }
                    ]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1,
                    rotateY: 0
                }
            },
            "transition.shrinkIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, 1.5],
                        scaleY: [1, 1.5],
                        translateZ: 0
                    }]
                ]
            },
            "transition.shrinkOut": {
                defaultDuration: 600,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: 1.3,
                        scaleY: 1.3,
                        translateZ: 0
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.expandIn": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, .625],
                        scaleY: [1, .625],
                        translateZ: 0
                    }]
                ]
            },
            "transition.expandOut": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: .5,
                        scaleY: .5,
                        translateZ: 0
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        scaleX: [1.05, .3],
                        scaleY: [1.05, .3]
                    }, .4],
                    [{
                        scaleX: .9,
                        scaleY: .9,
                        translateZ: 0
                    }, .2],
                    [{
                        scaleX: 1,
                        scaleY: 1
                    }, .5]
                ]
            },
            "transition.bounceOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        scaleX: .95,
                        scaleY: .95
                    }, .35],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        translateZ: 0
                    }, .35],
                    [{
                        opacity: [0, 1],
                        scaleX: .3,
                        scaleY: .3
                    }, .3]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceUpIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [-30, 1e3]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateY: 10
                    }, .2],
                    [{
                        translateY: 0
                    }, .2]
                ]
            },
            "transition.bounceUpOut": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        translateY: 20
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateY: -1e3
                    }, .8]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceDownIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [30, -1e3]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateY: -10
                    }, .2],
                    [{
                        translateY: 0
                    }, .2]
                ]
            },
            "transition.bounceDownOut": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        translateY: -20
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateY: 1e3
                    }, .8]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceLeftIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [30, -1250]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateX: -10
                    }, .2],
                    [{
                        translateX: 0
                    }, .2]
                ]
            },
            "transition.bounceLeftOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        translateX: 30
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateX: -1250
                    }, .8]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.bounceRightIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [-30, 1250]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateX: 10
                    }, .2],
                    [{
                        translateX: 0
                    }, .2]
                ]
            },
            "transition.bounceRightOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        translateX: -30
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateX: 1250
                    }, .8]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, 20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideUpOut": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: -20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, -20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideDownOut": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: 20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftIn": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, -20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideLeftOut": {
                defaultDuration: 1050,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: -20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightIn": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, 20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideRightOut": {
                defaultDuration: 1050,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: 20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpBigIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, 75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideUpBigOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: -75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownBigIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, -75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideDownBigOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: 75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftBigIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, -75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideLeftBigOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: -75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightBigIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, 75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideRightBigOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: 75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.perspectiveUpIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: ["100%", "100%"],
                        rotateX: [0, -180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveUpOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: ["100%", "100%"],
                        rotateX: -180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveDownIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateX: [0, 180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveDownOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateX: 180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveLeftIn": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateY: [0, -180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveLeftOut": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateY: -180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            },
            "transition.perspectiveRightIn": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: ["100%", "100%"],
                        transformOriginY: [0, 0],
                        rotateY: [0, 180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveRightOut": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: ["100%", "100%"],
                        transformOriginY: [0, 0],
                        rotateY: 180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            }
        };
        for (var c in r.RegisterEffect.packagedEffects) r.RegisterEffect(
            c, r.RegisterEffect.packagedEffects[c]);
        r.RunSequence = function(e) {
            var t = s.extend(!0, [], e);
            t.length > 1 && (s.each(t.reverse(), function(e, n) {
                var i = t[e + 1];
                if (i) {
                    var o = n.o || n.options,
                        a = i.o || i.options,
                        l = o && o.sequenceQueue === !1 ?
                        "begin" : "complete",
                        u = a && a[l],
                        c = {};
                    c[l] = function() {
                        var e = i.e || i.elements,
                            t = e.nodeType ? [e] :
                            e;
                        u && u.call(t, t), r(n)
                    }, i.o ? i.o = s.extend({}, a,
                        c) : i.options = s.extend({},
                        a, c)
                }
            }), t.reverse()), r(t[0])
        }
    }(window.jQuery || window.Zepto || window, window, document)
}),
function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var n = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var i = document.head || document.getElementsByTagName("head")[
                    0],
                o =
                ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                r = document.createElement("div");
            r.innerHTML = '<p>x</p><style id="fit-vids-style">' + o +
                "</style>", i.appendChild(r.childNodes[1])
        }
        return t && e.extend(n, t), this.each(function() {
            var t = ["iframe[src*='player.vimeo.com']",
                "iframe[src*='youtube.com']",
                "iframe[src*='youtube-nocookie.com']",
                "iframe[src*='kickstarter.com'][src*='video.html']",
                "object", "embed"
            ];
            n.customSelector && t.push(n.customSelector);
            var i = e(this).find(t.join(","));
            i = i.not("object object"), i.each(function() {
                var t = e(this);
                if (!("embed" === this.tagName.toLowerCase() &&
                    t.parent("object").length || t.parent(
                        ".fluid-width-video-wrapper").length
                )) {
                    var n = "object" === this.tagName.toLowerCase() ||
                        t.attr("height") && !isNaN(parseInt(
                            t.attr("height"), 10)) ?
                        parseInt(t.attr("height"), 10) : t.height(),
                        i = isNaN(parseInt(t.attr("width"),
                            10)) ? t.width() : parseInt(t.attr(
                            "width"), 10),
                        o = n / i;
                    if (!t.attr("id")) {
                        var r = "fitvid" + Math.floor(
                            999999 * Math.random());
                        t.attr("id", r)
                    }
                    t.wrap(
                            '<div class="fluid-width-video-wrapper"></div>'
                        ).parent(
                            ".fluid-width-video-wrapper").css(
                            "padding-top", 100 * o + "%"),
                        t.removeAttr("height").removeAttr(
                            "width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(
        "object" == typeof exports ? require("jquery") : window.jQuery ||
        window.Zepto)
}(function(e) {
    var t, n, i, o, r, s, a = "Close",
        l = "BeforeClose",
        u = "AfterClose",
        c = "BeforeAppend",
        d = "MarkupParse",
        p = "Open",
        f = "Change",
        h = "mfp",
        m = "." + h,
        g = "mfp-ready",
        y = "mfp-removing",
        v = "mfp-prevent-close",
        b = function() {},
        x = !!window.jQuery,
        w = e(window),
        S = function(e, n) {
            t.ev.on(h + e + m, n)
        },
        T = function(t, n, i, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n &&
                n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
        },
        k = function(n, i) {
            t.ev.triggerHandler(h + n, i), t.st.callbacks && (n = n.charAt(
                    0).toLowerCase() + n.slice(1), t.st.callbacks[n] &&
                t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
        },
        C = function(n) {
            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn =
                e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s =
                n), t.currTemplate.closeBtn
        },
        E = function() {
            e.magnificPopup.instance || (t = new b, t.init(), e.magnificPopup
                .instance = t)
        },
        I = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    b.prototype = {
        constructor: b,
        init: function() {
            var n = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener,
                t.isAndroid = /android/gi.test(n), t.isIOS =
                /iphone|ipad|ipod/gi.test(n), t.supportsTransition =
                I(), t.probablyMobile = t.isAndroid || t.isIOS ||
                /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i
                .test(navigator.userAgent), i = e(document), t.popupsCache = {}
        },
        open: function(n) {
            var o;
            if (n.isObj === !1) {
                t.items = n.items.toArray(), t.index = 0;
                var s, a = n.items;
                for (o = 0; o < a.length; o++)
                    if (s = a[o], s.parsed && (s = s.el[0]), s ===
                        n.el[0]) {
                        t.index = o;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items],
                t.index = n.index || 0; if (t.isOpen) return void t
                .updateItemHTML();
            t.types = [], r = "", n.mainEl && n.mainEl.length ? t.ev =
                n.mainEl.eq(0) : t.ev = i, n.key ? (t.popupsCache[n
                        .key] || (t.popupsCache[n.key] = {}), t.currTemplate =
                    t.popupsCache[n.key]) : t.currTemplate = {}, t.st =
                e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos =
                "auto" === t.st.fixedContentPos ? !t.probablyMobile :
                t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !
                    1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !
                    1, t.st.enableEscapeKey = !1), t.bgOverlay || (
                    t.bgOverlay = T("bg").on("click" + m, function() {
                        t.close()
                    }), t.wrap = T("wrap").attr("tabindex", -1).on(
                        "click" + m, function(e) {
                            t._checkIfClose(e.target) && t.close()
                        }), t.container = T("container", t.wrap)),
                t.contentContainer = T("content"), t.st.preloader &&
                (t.preloader = T("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (o = 0; o < l.length; o++) {
                var u = l[o];
                u = u.charAt(0).toUpperCase() + u.slice(1), t[
                    "init" + u].call(t)
            }
            k("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ?
                    (S(d, function(e, t, n, i) {
                        n.close_replaceWith = C(i.type)
                    }), r += " mfp-close-btn-in") : t.wrap.append(C())
                ), t.st.alignTop && (r += " mfp-align-top"), t.fixedContentPos ?
                t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                }) : t.wrap.css({
                    top: w.scrollTop(),
                    position: "absolute"
                }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos &&
                    !t.fixedContentPos) && t.bgOverlay.css({
                    height: i.height(),
                    position: "absolute"
                }), t.st.enableEscapeKey && i.on("keyup" + m,
                    function(e) {
                        27 === e.keyCode && t.close()
                    }), w.on("resize" + m, function() {
                    t.updateSize()
                }), t.st.closeOnContentClick || (r +=
                    " mfp-auto-cursor"), r && t.wrap.addClass(r);
            var c = t.wH = w.height(),
                f = {};
            if (t.fixedContentPos && t._hasScrollBar(c)) {
                var h = t._getScrollbarSize();
                h && (f.marginRight = h)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css(
                    "overflow", "hidden") : f.overflow =
                "hidden");
            var y = t.st.mainClass;
            return t.isIE7 && (y += " mfp-ie7"), y && t._addClassToMFP(
                    y), t.updateItemHTML(), k("BuildControls"), e(
                    "html").css(f), t.bgOverlay.add(t.wrap).prependTo(
                    t.st.prependTo || e(document.body)), t._lastFocusedEl =
                document.activeElement, setTimeout(function() {
                    t.content ? (t._addClassToMFP(g), t._setFocus()) :
                        t.bgOverlay.addClass(g), i.on("focusin" +
                            m, t._onFocusIn)
                }, 16), t.isOpen = !0, t.updateSize(c), k(p), n
        },
        close: function() {
            t.isOpen && (k(l), t.isOpen = !1, t.st.removalDelay &&
                !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(
                    y), setTimeout(function() {
                    t._close()
                }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            k(a);
            var n = y + " " + g + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(),
                t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(
                    n), t.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow =
                    "", e("html").css(o)
            }
            i.off("keyup" + m + " focusin" + m), t.ev.off(m), t.wrap
                .attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay
                .attr("class", "mfp-bg"), t.container.attr("class",
                    "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside &&
                t.currTemplate[t.currItem.type] !== !0 || t.currTemplate
                .closeBtn && t.currTemplate.closeBtn.detach(), t.st
                .autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl)
                .focus(), t.currItem = null, t.content = null, t.currTemplate =
                null, t.prevHeight = 0, k(u)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth /
                    window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || w.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), k(
                "Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(),
                n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (k("BeforeChange", [t.currItem ? t.currItem.type :
                "", i
            ]), t.currItem = n, !t.currTemplate[i]) {
                var r = t.st[i] ? t.st[i].markup : !1;
                k("FirstMarkupParse", r), r ? t.currTemplate[i] = e(
                    r) : t.currTemplate[i] = !0
            }
            o && o !== n.type && t.container.removeClass("mfp-" + o +
                "-holder");
            var s = t["get" + i.charAt(0).toUpperCase() + i.slice(1)]
                (n, t.currTemplate[i]);
            t.appendContent(s, i), n.preloaded = !0, k(f, n), o = n
                .type, t.container.prepend(t.contentContainer), k(
                    "AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside &&
                t.currTemplate[n] === !0 ? t.content.find(
                    ".mfp-close").length || t.content.append(C()) :
                t.content = e : t.content = "", k(c), t.container.addClass(
                    "mfp-" + n + "-holder"), t.contentContainer.append(
                    t.content)
        },
        parseEl: function(n) {
            var i, o = t.items[n];
            if (o.tagName ? o = {
                el: e(o)
            } : (i = o.type, o = {
                data: o,
                src: o.src
            }), o.el) {
                for (var r = t.types, s = 0; s < r.length; s++)
                    if (o.el.hasClass("mfp-" + r[s])) {
                        i = r[s];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src =
                    o.el.attr("href"))
            }
            return o.type = i || t.st.type || "inline", o.index = n,
                o.parsed = !0, t.items[n] = o, k("ElementParse", o),
                t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this, t._openClick(i, e, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) :
                (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate,
                    i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup
                .defaults.midClick;
            if (r || !(2 === n.which || n.ctrlKey || n.metaKey || n
                .altKey || n.shiftKey)) {
                var s = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup
                    .defaults.disableOn;
                if (s)
                    if (e.isFunction(s)) {
                        if (!s.call(t)) return !0
                    } else if (w.width() < s) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
                    o.el = e(n.mfpEl), o.delegate && (o.items = i.find(
                        o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i ||
                    "loading" !== e || (i = t.st.tLoading);
                var o = {
                    status: e,
                    text: i
                };
                k("UpdateStatus", o), e = o.status, i = o.text, t.preloader
                    .html(i), t.preloader.find("a").on("click",
                        function(e) {
                            e.stopImmediatePropagation()
                        }), t.container.addClass("mfp-s-" + e), n =
                    e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(v)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader &&
                    n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0],
                    n)) {
                    if (i) return !0
                } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? i.height() : document.body.scrollHeight) >
                (e || w.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap)
            .focus()
        },
        _onFocusIn: function(n) {
            return n.target === t.wrap[0] || e.contains(t.wrap[0],
                n.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), k(d, [t, n, i]), e
                .each(n, function(n, i) {
                    if (void 0 === i || i === !1) return !0;
                    if (o = n.split("_"), o.length > 1) {
                        var r = t.find(m + "-" + o[0]);
                        if (r.length > 0) {
                            var s = o[1];
                            "replaceWith" === s ? r[0] !== i[0] &&
                                r.replaceWith(i) : "img" === s ?
                                r.is("img") ? r.attr("src", i) :
                                r.replaceWith(e("<img>").attr(
                                    "src", i).attr("class",
                                    r.attr("class"))) : r.attr(
                                    o[1], i)
                        }
                    } else t.find(m + "-" + n).html(i)
                })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText =
                    "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                    document.body.appendChild(e), t.scrollbarSize =
                    e.offsetWidth - e.clientWidth, document.body.removeChild(
                        e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function(t, n) {
            return E(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !
                0, t.index = n || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance
                .close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options),
                e.extend(this.proto, n.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function(n) {
        E();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = x ? i.data("magnificPopup") : i[0].magnificPopup,
                    s = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[s] : (o = i, r.delegate && (o = o
                    .find(r.delegate)), o = o.eq(s)), t._openClick({
                    mfpEl: o
                }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(
                arguments, 1));
        else n = e.extend(!0, {}, n), x ? i.data("magnificPopup", n) :
            i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var P, O, L, A = "inline",
        j = function() {
            L && (O.after(L.addClass(P)).detach(), L = null)
        };
    e.magnificPopup.registerModule(A, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(A), S(a + "." + A, function() {
                    j()
                })
            },
            getInline: function(n, i) {
                if (j(), n.src) {
                    var o = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var s = r[0].parentNode;
                        s && s.tagName && (O || (P = o.hiddenClass,
                                O = T(P), P = "mfp-" + P),
                            L = r.after(O).detach().removeClass(
                                P)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound),
                        r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(
                    i, {}, n), i
            }
        }
    });
    var $, D = "ajax",
        z = function() {
            $ && e(document.body).removeClass($)
        },
        H = function() {
            z(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(D, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(D), $ = t.st.ajax.cursor, S(a +
                    "." + D, H), S("BeforeChange." + D, H)
            },
            getAjax: function(n) {
                $ && e(document.body).addClass($), t.updateStatus(
                    "loading");
                var i = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var s = {
                            data: i,
                            xhr: r
                        };
                        k("ParseAjax", s), t.appendContent(
                                e(s.data), D), n.finished = !
                            0, z(), t._setFocus(),
                            setTimeout(function() {
                                t.wrap.addClass(
                                    g)
                            }, 16), t.updateStatus(
                                "ready"), k(
                                "AjaxContentAdded")
                    },
                    error: function() {
                        z(), n.finished = n.loadError = !
                            0, t.updateStatus(
                                "error", t.st.ajax.tError
                                .replace("%url%", n
                                    .src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(i), ""
            }
        }
    });
    var _, q = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var n = t.st.image,
                    i = ".image";
                t.types.push("image"), S(p + i, function() {
                        "image" === t.currItem.type && n.cursor &&
                            e(document.body).addClass(n.cursor)
                    }), S(a + i, function() {
                        n.cursor && e(document.body).removeClass(
                            n.cursor), w.off("resize" +
                            m)
                    }), S("Resize" + i, t.resizeImage), t.isLowIE &&
                    S("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css(
                        "padding-top"), 10) + parseInt(
                        e.img.css("padding-bottom"), 10
                    )), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, _ && clearInterval(_),
                    e.isCheckingImgSize = !1, k(
                        "ImageHasSize", e), e.imgHidden &&
                    (t.content && t.content.removeClass(
                            "mfp-loading"), e.imgHidden = !
                        1))
            },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) {
                        _ && clearInterval(_), _ = setInterval(
                            function() {
                                return i.naturalWidth > 0 ?
                                    void t._onImageHasSize(
                                        e) : (n > 200 &&
                                        clearInterval(_), n++,
                                        void(3 === n ? o(10) :
                                            40 === n ? o(50) :
                                            100 === n && o(
                                                500)))
                            }, r)
                    };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() {
                        n && (n.img[0].complete ? (n.img.off(
                                    ".mfploader"), n === t.currItem &&
                                (t._onImageHasSize(n), t.updateStatus(
                                    "ready")), n.hasSize = !
                                0, n.loaded = !0, k(
                                    "ImageLoadComplete")) :
                            (o++, 200 > o ? setTimeout(r,
                                100) : s()))
                    },
                    s = function() {
                        n && (n.img.off(".mfploader"), n === t.currItem &&
                            (t._onImageHasSize(n), t.updateStatus(
                                "error", a.tError.replace(
                                    "%url%", n.src))), n.hasSize = !
                            0, n.loaded = !0, n.loadError = !
                            0)
                    },
                    a = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img", n.el && n.el.find(
                            "img").length && (u.alt = n.el.find(
                            "img").attr("alt")), n.img = e(u).on(
                            "load.mfploader", r).on(
                            "error.mfploader", s), u.src = n.src,
                        l.is("img") && (n.img = n.img.clone()),
                        u = n.img[0], u.naturalWidth > 0 ? n.hasSize = !
                        0 : u.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: q(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize ? (_ &&
                    clearInterval(_), n.loadError ? (i.addClass(
                        "mfp-loading"), t.updateStatus(
                        "error", a.tError.replace(
                            "%url%", n.src))) : (i.removeClass(
                        "mfp-loading"), t.updateStatus(
                        "ready")), i) : (t.updateStatus(
                        "loading"), n.loading = !0, n.hasSize ||
                    (n.imgHidden = !0, i.addClass(
                        "mfp-loading"), t.findImageSize(
                        n)), i)
            }
        }
    });
    var N, M = function() {
        return void 0 === N && (N = void 0 !== document.createElement(
            "p").style.MozTransform), N
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, s = n.duration,
                        u = function(e) {
                            var t = e.clone().removeAttr(
                                    "style").removeAttr("class")
                                .addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 +
                                "s " + n.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o[
                                    "-moz-" + r] = o["-o-" + r] =
                                o[r] = i, t.css(o), t
                        },
                        c = function() {
                            t.content.css("visibility",
                                "visible")
                        };
                    S("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content
                                .css("visibility",
                                    "hidden"), e = t._getItemToZoom(), !
                                e) return void c();
                            r = u(e), r.css(t._getOffset()),
                                t.wrap.append(r), o =
                                setTimeout(function() {
                                    r.css(t._getOffset(!
                                            0)), o =
                                        setTimeout(
                                            function() {
                                                c(),
                                                    setTimeout(
                                                        function() {
                                                            r
                                                                .remove(),
                                                                e =
                                                                r =
                                                                null,
                                                                k(
                                                                    "ZoomAnimationEnded"
                                                                )
                                                        },
                                                        16
                                                    )
                                            }, s)
                                }, 16)
                        }
                    }), S(l + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay =
                                s, !e) {
                                if (e = t._getItemToZoom(), !
                                    e) return;
                                r = u(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap
                                .append(r), t.content.css(
                                    "visibility",
                                    "hidden"),
                                setTimeout(function() {
                                    r.css(t._getOffset())
                                }, 16)
                        }
                    }), S(a + i, function() {
                        t._allowZoom() && (c(), r && r.remove(),
                            e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(n) {
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem
                    .el || t.currItem);
                var o = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    s = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var a = {
                    width: i.width(),
                    height: (x ? i.innerHeight() : i[0].offsetHeight) -
                        s - r
                };
                return M() ? a["-moz-transform"] = a.transform =
                    "translate(" + o.left + "px," + o.top +
                    "px)" : (a.left = o.left, a.top = o.top), a
            }
        }
    });
    var R = "iframe",
        F = "//about:blank",
        W = function(e) {
            if (t.currTemplate[R]) {
                var n = t.currTemplate[R].find("iframe");
                n.length && (e || (n[0].src = F), t.isIE8 && n.css(
                    "display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(R, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(R), S("BeforeChange", function(e,
                    t, n) {
                    t !== n && (t === R ? W() : n === R &&
                        W(!0))
                }), S(a + "." + R, function() {
                    W()
                })
            },
            getIframe: function(n, i) {
                var o = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() {
                    return o.indexOf(this.index) > -1 ?
                        (this.id && (o = "string" ==
                            typeof this.id ? o.substr(
                                o.lastIndexOf(this.id) +
                                this.id.length, o.length
                            ) : this.id.call(this,
                                o)), o = this.src.replace(
                            "%id%", o), !1) : void 0
                });
                var s = {};
                return r.srcAction && (s[r.srcAction] = o), t._parseMarkup(
                    i, s, n), t.updateStatus("ready"), i
            }
        }
    });
    var B = function(e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : 0 > e ? n + e : e
        },
        V = function(e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var n = t.st.gallery,
                    o = ".mfp-gallery";
                return t.direction = !0, n && n.enabled ? (r +=
                    " mfp-gallery", S(p + o, function() {
                        n.navigateByImgClick && t.wrap.on(
                            "click" + o, ".mfp-img",
                            function() {
                                return t.items.length >
                                    1 ? (t.next(), !
                                        1) : void 0
                            }), i.on("keydown" + o,
                            function(e) {
                                37 === e.keyCode ?
                                    t.prev() : 39 ===
                                    e.keyCode && t.next()
                            })
                    }), S("UpdateStatus" + o, function(e, n) {
                        n.text && (n.text = V(n.text, t
                            .currItem.index, t.items
                            .length))
                    }), S(d + o, function(e, i, o, r) {
                        var s = t.items.length;
                        o.counter = s > 1 ? V(n.tCounter,
                            r.index, s) : ""
                    }), S("BuildControls" + o, function() {
                        if (t.items.length > 1 && n.arrows &&
                            !t.arrowLeft) {
                            var i = n.arrowMarkup,
                                o = t.arrowLeft = e(i.replace(
                                    /%title%/gi, n.tPrev
                                ).replace(/%dir%/gi,
                                    "left")).addClass(v),
                                r = t.arrowRight = e(i.replace(
                                    /%title%/gi, n.tNext
                                ).replace(/%dir%/gi,
                                    "right")).addClass(
                                    v);
                            o.click(function() {
                                t.prev()
                            }), r.click(function() {
                                t.next()
                            }), t.container.append(
                                o.add(r))
                        }
                    }), S(f + o, function() {
                        t._preloadTimeout &&
                            clearTimeout(t._preloadTimeout),
                            t._preloadTimeout =
                            setTimeout(function() {
                                t.preloadNearbyImages(),
                                    t._preloadTimeout =
                                    null
                            }, 16)
                    }), void S(a + o, function() {
                        i.off(o), t.wrap.off("click" +
                                o), t.arrowRight = t.arrowLeft =
                            null
                    })) : !1
            },
            next: function() {
                t.direction = !0, t.index = B(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = B(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    o = Math.min(n[1], t.items.length);
                for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(
                    t.index + e);
                for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(
                    t.index - e)
            },
            _preloadItem: function(n) {
                if (n = B(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), k(
                            "LazyLoad", i), "image" === i.type &&
                        (i.img = e('<img class="mfp-img" />').on(
                            "load.mfploader", function() {
                                i.hasSize = !0
                            }).on("error.mfploader",
                            function() {
                                i.hasSize = !0, i.loadError = !
                                    0, k("LazyLoadError", i)
                            }).attr("src", i.src)), i.preloaded = !
                        0
                }
            }
        }
    });
    var X = "retina";
    e.magnificPopup.registerModule(X, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        n = e.ratio;
                    n = isNaN(n) ? n() : n, n > 1 && (S(
                        "ImageHasSize." + X, function(e,
                            t) {
                            t.img.css({
                                "max-width": t.img[
                                        0].naturalWidth /
                                    n,
                                width: "100%"
                            })
                        }), S("ElementParse." + X,
                        function(t, i) {
                            i.src = e.replaceSrc(i, n)
                        }))
                }
            }
        }
    }), E()
}), ! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) :
        "undefined" != typeof exports ? module.exports = e(require("jquery")) :
        e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
            function t(t, i) {
                var o, r = this;
                r.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: e(t),
                        appendDots: e(t),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, t) {
                            return
                                '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' +
                                (t + 1) + "</button>"
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rows: 1,
                        rtl: !1,
                        slide: "",
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        useTransform: !1,
                        variableWidth: !1,
                        vertical: !1,
                        verticalSwiping: !1,
                        waitForAnimate: !0,
                        zIndex: 1e3
                    }, r.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1
                    }, e.extend(r, r.initials), r.activeBreakpoint =
                    null, r.animType = null, r.animProp = null, r.breakpoints = [],
                    r.breakpointSettings = [], r.cssTransitions = !1, r
                    .hidden = "hidden", r.paused = !1, r.positionProp =
                    null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !
                    0, r.$slider = e(t), r.$slidesCache = null, r.transformType =
                    null, r.transitionType = null, r.visibilityChange =
                    "visibilitychange", r.windowWidth = 0, r.windowTimer =
                    null, o = e(t).data("slick") || {}, r.options = e.extend({},
                        r.defaults, o, i), r.currentSlide = r.options.initialSlide,
                    r.originalSettings = r.options, "undefined" !=
                    typeof document.mozHidden ? (r.hidden = "mozHidden",
                        r.visibilityChange = "mozvisibilitychange") :
                    "undefined" != typeof document.webkitHidden && (r.hidden =
                        "webkitHidden", r.visibilityChange =
                        "webkitvisibilitychange"), r.autoPlay = e.proxy(
                        r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear,
                        r), r.changeSlide = e.proxy(r.changeSlide, r),
                    r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler =
                    e.proxy(r.selectHandler, r), r.setPosition = e.proxy(
                        r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler,
                        r), r.dragHandler = e.proxy(r.dragHandler, r),
                    r.keyHandler = e.proxy(r.keyHandler, r), r.autoPlayIterator =
                    e.proxy(r.autoPlayIterator, r), r.instanceUid = n++,
                    r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(),
                    r.init(!0), r.checkResponsive(!0)
            }
            var n = 0;
            return t
        }(), t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
            var o = this;
            if ("boolean" == typeof n) i = n, n = null;
            else if (0 > n || n >= o.slideCount) return !1;
            o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ?
                e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides
                    .eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : i === !0 ?
                e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack),
                o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack
                .children(this.options.slide).detach(), o.$slideTrack.append(
                    o.$slides), o.$slides.each(function(t, n) {
                    e(n).attr("data-slick-index", t)
                }), o.$slidesCache = o.$slides, o.reinit()
        }, t.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight ===
                !0 && e.options.vertical === !1) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: t
                }, e.options.speed)
            }
        }, t.prototype.animateSlide = function(t, n) {
            var i = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical ===
                !1 && (t = -t), o.transformsEnabled === !1 ? o.options.vertical ===
                !1 ? o.$slideTrack.animate({
                    left: t
                }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
                    top: t
                }, o.options.speed, o.options.easing, n) : o.cssTransitions ===
                !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft),
                    e({
                        animStart: o.currentLeft
                    }).animate({
                        animStart: t
                    }, {
                        duration: o.options.speed,
                        easing: o.options.easing,
                        step: function(e) {
                            e = Math.ceil(e), o.options.vertical ===
                                !1 ? (i[o.animType] = "translate(" +
                                    e + "px, 0px)", o.$slideTrack.css(
                                        i)) : (i[o.animType] =
                                    "translate(0px," + e + "px)", o
                                    .$slideTrack.css(i))
                        },
                        complete: function() {
                            n && n.call()
                        }
                    })) : (o.applyTransition(), t = Math.ceil(t), o.options
                    .vertical === !1 ? i[o.animType] = "translate3d(" + t +
                    "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," +
                    t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(
                        function() {
                            o.disableTransition(), n.call()
                        }, o.options.speed))
        }, t.prototype.asNavFor = function(t) {
            var n = this,
                i = n.options.asNavFor;
            i && null !== i && (i = e(i).not(n.$slider)), null !== i &&
                "object" == typeof i && i.each(function() {
                    var n = e(this).slick("getSlick");
                    n.unslicked || n.slideHandler(t, !0)
                })
        }, t.prototype.applyTransition = function(e) {
            var t = this,
                n = {};
            t.options.fade === !1 ? n[t.transitionType] = t.transformType +
                " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] =
                "opacity " + t.options.speed + "ms " + t.options.cssEase, t
                .options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(
                    e).css(n)
        }, t.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer), e.slideCount >
                e.options.slidesToShow && e.paused !== !0 && (e.autoPlayTimer =
                    setInterval(e.autoPlayIterator, e.options.autoplaySpeed)
                )
        }, t.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, t.prototype.autoPlayIterator = function() {
            var e = this;
            e.options.infinite === !1 ? 1 === e.direction ? (e.currentSlide +
                1 === e.slideCount - 1 && (e.direction = 0), e.slideHandler(
                    e.currentSlide + e.options.slidesToScroll)) : (e.currentSlide -
                1 === 0 && (e.direction = 1), e.slideHandler(e.currentSlide -
                    e.options.slidesToScroll)) : e.slideHandler(e.currentSlide +
                e.options.slidesToScroll)
        }, t.prototype.buildArrows = function() {
            var t = this;
            t.options.arrows === !0 && (t.$prevArrow = e(t.options.prevArrow)
                .addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow)
                .addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ?
                (t.$prevArrow.removeClass("slick-hidden").removeAttr(
                        "aria-hidden tabindex"), t.$nextArrow.removeClass(
                        "slick-hidden").removeAttr(
                        "aria-hidden tabindex"), t.htmlExpr.test(t.options
                        .prevArrow) && t.$prevArrow.prependTo(t.options
                        .appendArrows), t.htmlExpr.test(t.options.nextArrow) &&
                    t.$nextArrow.appendTo(t.options.appendArrows), t.options
                    .infinite !== !0 && t.$prevArrow.addClass(
                        "slick-disabled").attr("aria-disabled", "true")
                ) : t.$prevArrow.add(t.$nextArrow).addClass(
                    "slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                }))
        }, t.prototype.buildDots = function() {
            var t, n, i = this;
            if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
                for (n = '<ul class="' + i.options.dotsClass + '">', t = 0; t <=
                    i.getDotCount(); t += 1) n += "<li>" + i.options.customPaging
                    .call(this, i, t) + "</li>";
                n += "</ul>", i.$dots = e(n).appendTo(i.options.appendDots),
                    i.$dots.find("li").first().addClass("slick-active").attr(
                        "aria-hidden", "false")
            }
        }, t.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide +
                    ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount =
                t.$slides.length, t.$slides.each(function(t, n) {
                    e(n).attr("data-slick-index", t).data(
                        "originalStyling", e(n).attr("style") || ""
                    )
                }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 ===
                t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) :
                t.$slides.wrapAll('<div class="slick-track"/>').parent(), t
                .$list = t.$slideTrack.wrap(
                    '<div aria-live="polite" class="slick-list"/>').parent(),
                t.$slideTrack.css("opacity", 0), (t.options.centerMode ===
                    !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll =
                    1), e("img[data-lazy]", t.$slider).not("[src]").addClass(
                    "slick-loading"), t.setupInfinite(), t.buildArrows(), t
                .buildDots(), t.updateDots(), t.setSlideClasses("number" ==
                    typeof t.currentSlide ? t.currentSlide : 0), t.options.draggable ===
                !0 && t.$list.addClass("draggable")
        }, t.prototype.buildRows = function() {
            var e, t, n, i, o, r, s, a = this;
            if (i = document.createDocumentFragment(), r = a.$slider.children(),
                a.options.rows > 1) {
                for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(
                    r.length / s), e = 0; o > e; e++) {
                    var l = document.createElement("div");
                    for (t = 0; t < a.options.rows; t++) {
                        var u = document.createElement("div");
                        for (n = 0; n < a.options.slidesPerRow; n++) {
                            var c = e * s + (t * a.options.slidesPerRow + n);
                            r.get(c) && u.appendChild(r.get(c))
                        }
                        l.appendChild(u)
                    }
                    i.appendChild(l)
                }
                a.$slider.html(i), a.$slider.children().children().children()
                    .css({
                        width: 100 / a.options.slidesPerRow + "%",
                        display: "inline-block"
                    })
            }
        }, t.prototype.checkResponsive = function(t, n) {
            var i, o, r, s = this,
                a = !1,
                l = s.$slider.width(),
                u = window.innerWidth || e(window).width();
            if ("window" === s.respondTo ? r = u : "slider" === s.respondTo ?
                r = l : "min" === s.respondTo && (r = Math.min(u, l)), s.options
                .responsive && s.options.responsive.length && null !== s.options
                .responsive) {
                o = null;
                for (i in s.breakpoints) s.breakpoints.hasOwnProperty(i) &&
                    (s.originalSettings.mobileFirst === !1 ? r < s.breakpoints[
                        i] && (o = s.breakpoints[i]) : r > s.breakpoints[
                        i] && (o = s.breakpoints[i]));
                null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint ||
                        n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[
                        o] ? s.unslick(o) : (s.options = e.extend({}, s
                            .originalSettings, s.breakpointSettings[o]),
                        t === !0 && (s.currentSlide = s.options.initialSlide),
                        s.refresh(t)), a = o) : (s.activeBreakpoint = o,
                        "unslick" === s.breakpointSettings[o] ? s.unslick(o) :
                        (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[
                            o]), t === !0 && (s.currentSlide = s.options
                            .initialSlide), s.refresh(t)), a = o) : null !==
                    s.activeBreakpoint && (s.activeBreakpoint = null, s.options =
                        s.originalSettings, t === !0 && (s.currentSlide = s
                            .options.initialSlide), s.refresh(t), a = o), t ||
                    a === !1 || s.$slider.trigger("breakpoint", [s, a])
            }
        }, t.prototype.changeSlide = function(t, n) {
            var i, o, r, s = this,
                a = e(t.target);
            switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest(
                    "li")), r = s.slideCount % s.options.slidesToScroll !==
                0, i = r ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll,
                t.data.message) {
                case "previous":
                    o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow -
                        i, s.slideCount > s.options.slidesToShow && s.slideHandler(
                            s.currentSlide - o, !1, n);
                    break;
                case "next":
                    o = 0 === i ? s.options.slidesToScroll : i, s.slideCount >
                        s.options.slidesToShow && s.slideHandler(s.currentSlide +
                            o, !1, n);
                    break;
                case "index":
                    var l = 0 === t.data.index ? 0 : t.data.index || a.index() *
                        s.options.slidesToScroll;
                    s.slideHandler(s.checkNavigable(l), !1, n), a.children()
                        .trigger("focus");
                    break;
                default:
                    return
            }
        }, t.prototype.checkNavigable = function(e) {
            var t, n, i = this;
            if (t = i.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e =
                t[t.length - 1];
            else
                for (var o in t) {
                    if (e < t[o]) {
                        e = n;
                        break
                    }
                    n = t[o]
                }
            return e
        }, t.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && null !== t.$dots && (e("li", t.$dots).off(
                        "click.slick", t.changeSlide), t.options.pauseOnDotsHover ===
                    !0 && t.options.autoplay === !0 && e("li", t.$dots).off(
                        "mouseenter.slick", e.proxy(t.setPaused, t, !0)).off(
                        "mouseleave.slick", e.proxy(t.setPaused, t, !1))),
                t.options.arrows === !0 && t.slideCount > t.options.slidesToShow &&
                (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
                    t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)
                ), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
                t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
                t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
                t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
                t.$list.off("click.slick", t.clickHandler), e(document).off(
                    t.visibilityChange, t.visibility), t.$list.off(
                    "mouseenter.slick", e.proxy(t.setPaused, t, !0)), t.$list
                .off("mouseleave.slick", e.proxy(t.setPaused, t, !1)), t.options
                .accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler),
                t.options.focusOnSelect === !0 && e(t.$slideTrack).children()
                .off("click.slick", t.selectHandler), e(window).off(
                    "orientationchange.slick.slick-" + t.instanceUid, t.orientationChange
                ), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
                e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
                e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition),
                e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.cleanUpRows = function() {
            var e, t = this;
            t.options.rows > 1 && (e = t.$slides.children().children(), e.removeAttr(
                "style"), t.$slider.html(e))
        }, t.prototype.clickHandler = function(e) {
            var t = this;
            t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(),
                e.preventDefault())
        }, t.prototype.destroy = function(t) {
            var n = this;
            n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(
                    ".slick-cloned", n.$slider).detach(), n.$dots && n.$dots
                .remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow
                    .removeClass("slick-disabled slick-arrow slick-hidden")
                    .removeAttr("aria-hidden aria-disabled tabindex").css(
                        "display", ""), n.htmlExpr.test(n.options.prevArrow) &&
                    n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length &&
                (n.$nextArrow.removeClass(
                        "slick-disabled slick-arrow slick-hidden").removeAttr(
                        "aria-hidden aria-disabled tabindex").css("display",
                        ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow
                    .remove()), n.$slides && (n.$slides.removeClass(
                        "slick-slide slick-active slick-center slick-visible slick-current"
                    ).removeAttr("aria-hidden").removeAttr(
                        "data-slick-index").each(function() {
                        e(this).attr("style", e(this).data(
                            "originalStyling"))
                    }), n.$slideTrack.children(this.options.slide).detach(),
                    n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(
                        n.$slides)), n.cleanUpRows(), n.$slider.removeClass(
                    "slick-slider"), n.$slider.removeClass(
                    "slick-initialized"), n.unslicked = !0, t || n.$slider.trigger(
                    "destroy", [n])
        }, t.prototype.disableTransition = function(e) {
            var t = this,
                n = {};
            n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack
                .css(n) : t.$slides.eq(e).css(n)
        }, t.prototype.fadeSlide = function(e, t) {
            var n = this;
            n.cssTransitions === !1 ? (n.$slides.eq(e).css({
                zIndex: n.options.zIndex
            }), n.$slides.eq(e).animate({
                opacity: 1
            }, n.options.speed, n.options.easing, t)) : (n.applyTransition(
                e), n.$slides.eq(e).css({
                opacity: 1,
                zIndex: n.options.zIndex
            }), t && setTimeout(function() {
                n.disableTransition(e), t.call()
            }, n.options.speed))
        }, t.prototype.fadeSlideOut = function(e) {
            var t = this;
            t.cssTransitions === !1 ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(
                e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack
                .children(this.options.slide).detach(), t.$slidesCache.filter(
                    e).appendTo(t.$slideTrack), t.reinit())
        }, t.prototype.getCurrent = t.prototype.slickCurrentSlide =
        function() {
            var e = this;
            return e.currentSlide
        }, t.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                n = 0,
                i = 0;
            if (e.options.infinite === !0)
                for (; t < e.slideCount;)++i, t = n + e.options.slidesToScroll,
                    n += e.options.slidesToScroll <= e.options.slidesToShow ?
                    e.options.slidesToScroll : e.options.slidesToShow;
            else if (e.options.centerMode === !0) i = e.slideCount;
            else
                for (; t < e.slideCount;)++i, t = n + e.options.slidesToScroll,
                    n += e.options.slidesToScroll <= e.options.slidesToShow ?
                    e.options.slidesToScroll : e.options.slidesToShow;
            return i - 1
        }, t.prototype.getLeft = function(e) {
            var t, n, i, o = this,
                r = 0;
            return o.slideOffset = 0, n = o.$slides.first().outerHeight(!0),
                o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow &&
                    (o.slideOffset = o.slideWidth * o.options.slidesToShow *
                        -1, r = n * o.options.slidesToShow * -1), o.slideCount %
                    o.options.slidesToScroll !== 0 && e + o.options.slidesToScroll >
                    o.slideCount && o.slideCount > o.options.slidesToShow &&
                    (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow -
                            (e - o.slideCount)) * o.slideWidth * -1, r =
                        (o.options.slidesToShow - (e - o.slideCount)) *
                        n * -1) : (o.slideOffset = o.slideCount % o.options
                        .slidesToScroll * o.slideWidth * -1, r = o.slideCount %
                        o.options.slidesToScroll * n * -1))) : e + o.options
                .slidesToShow > o.slideCount && (o.slideOffset = (e + o.options
                    .slidesToShow - o.slideCount) * o.slideWidth, r = (
                    e + o.options.slidesToShow - o.slideCount) * n), o.slideCount <=
                o.options.slidesToShow && (o.slideOffset = 0, r = 0), o.options
                .centerMode === !0 && o.options.infinite === !0 ? o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth :
                o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset +=
                    o.slideWidth * Math.floor(o.options.slidesToShow / 2)),
                t = o.options.vertical === !1 ? e * o.slideWidth * -1 + o.slideOffset :
                e * n * -1 + r, o.options.variableWidth === !0 && (i = o.slideCount <=
                    o.options.slidesToShow || o.options.infinite === !1 ? o
                    .$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack
                    .children(".slick-slide").eq(e + o.options.slidesToShow),
                    t = o.options.rtl === !0 ? i[0] ? -1 * (o.$slideTrack.width() -
                        i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0]
                    .offsetLeft : 0, o.options.centerMode === !0 && (i = o.slideCount <=
                        o.options.slidesToShow || o.options.infinite === !1 ?
                        o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack
                        .children(".slick-slide").eq(e + o.options.slidesToShow +
                            1), t = o.options.rtl === !0 ? i[0] ? -1 * (o.$slideTrack
                            .width() - i[0].offsetLeft - i.width()) : 0 : i[
                            0] ? -1 * i[0].offsetLeft : 0, t += (o.$list.width() -
                            i.outerWidth()) / 2)), t
        }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
            var t = this;
            return t.options[e]
        }, t.prototype.getNavigableIndexes = function() {
            var e, t = this,
                n = 0,
                i = 0,
                o = [];
            for (t.options.infinite === !1 ? e = t.slideCount : (n = -1 * t
                .options.slidesToScroll, i = -1 * t.options.slidesToScroll,
                e = 2 * t.slideCount); e > n;) o.push(n), n = i + t.options
                .slidesToScroll, i += t.options.slidesToScroll <= t.options
                .slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return o
        }, t.prototype.getSlick = function() {
            return this
        }, t.prototype.getSlideCount = function() {
            var t, n, i, o = this;
            return i = o.options.centerMode === !0 ? o.slideWidth * Math.floor(
                    o.options.slidesToShow / 2) : 0, o.options.swipeToSlide ===
                !0 ? (o.$slideTrack.find(".slick-slide").each(function(t, r) {
                        return r.offsetLeft - i + e(r).outerWidth() / 2 >
                            -1 * o.swipeLeft ? (n = r, !1) : void 0
                    }), t = Math.abs(e(n).attr("data-slick-index") - o.currentSlide) ||
                    1) : o.options.slidesToScroll
        }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
            var n = this;
            n.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, t.prototype.init = function(t) {
            var n = this;
            e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass(
                    "slick-initialized"), n.buildRows(), n.buildOut(),
                n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(),
                n.updateArrows(), n.updateDots()), t && n.$slider.trigger(
                "init", [n]), n.options.accessibility === !0 && n.initADA()
        }, t.prototype.initArrowEvents = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow &&
                (e.$prevArrow.on("click.slick", {
                    message: "previous"
                }, e.changeSlide), e.$nextArrow.on("click.slick", {
                    message: "next"
                }, e.changeSlide))
        }, t.prototype.initDotEvents = function() {
            var t = this;
            t.options.dots === !0 && t.slideCount > t.options.slidesToShow &&
                e("li", t.$dots).on("click.slick", {
                    message: "index"
                }, t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover ===
                !0 && t.options.autoplay === !0 && e("li", t.$dots).on(
                    "mouseenter.slick", e.proxy(t.setPaused, t, !0)).on(
                    "mouseleave.slick", e.proxy(t.setPaused, t, !1))
        }, t.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.$list.on(
                    "touchstart.slick mousedown.slick", {
                        action: "start"
                    }, t.swipeHandler), t.$list.on(
                    "touchmove.slick mousemove.slick", {
                        action: "move"
                    }, t.swipeHandler), t.$list.on(
                    "touchend.slick mouseup.slick", {
                        action: "end"
                    }, t.swipeHandler), t.$list.on(
                    "touchcancel.slick mouseleave.slick", {
                        action: "end"
                    }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler),
                e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
                t.$list.on("mouseenter.slick", e.proxy(t.setPaused, t, !0)),
                t.$list.on("mouseleave.slick", e.proxy(t.setPaused, t, !1)),
                t.options.accessibility === !0 && t.$list.on(
                    "keydown.slick", t.keyHandler), t.options.focusOnSelect ===
                !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
                e(window).on("orientationchange.slick.slick-" + t.instanceUid,
                    e.proxy(t.orientationChange, t)), e(window).on(
                    "resize.slick.slick-" + t.instanceUid, e.proxy(t.resize,
                        t)), e("[draggable!=true]", t.$slideTrack).on(
                    "dragstart", t.preventDefault), e(window).on(
                    "load.slick.slick-" + t.instanceUid, t.setPosition), e(
                    document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.initUI = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow &&
                (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots ===
                !0 && e.slideCount > e.options.slidesToShow && e.$dots.show(),
                e.options.autoplay === !0 && e.autoPlay()
        }, t.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode &&
                t.options.accessibility === !0 ? t.changeSlide({
                    data: {
                        message: "previous"
                    }
                }) : 39 === e.keyCode && t.options.accessibility === !0 &&
                t.changeSlide({
                    data: {
                        message: "next"
                    }
                }))
        }, t.prototype.lazyLoad = function() {
            function t(t) {
                e("img[data-lazy]", t).each(function() {
                    var t = e(this),
                        n = e(this).attr("data-lazy"),
                        i = document.createElement("img");
                    i.onload = function() {
                        t.animate({
                            opacity: 0
                        }, 100, function() {
                            t.attr("src", n).animate({
                                    opacity: 1
                                }, 200,
                                function() {
                                    t.removeAttr(
                                        "data-lazy"
                                    ).removeClass(
                                        "slick-loading"
                                    )
                                })
                        })
                    }, i.src = n
                })
            }
            var n, i, o, r, s = this;
            s.options.centerMode === !0 ? s.options.infinite === !0 ? (o =
                    s.currentSlide + (s.options.slidesToShow / 2 + 1), r =
                    o + s.options.slidesToShow + 2) : (o = Math.max(0, s.currentSlide -
                    (s.options.slidesToShow / 2 + 1)), r = 2 + (s.options
                    .slidesToShow / 2 + 1) + s.currentSlide) : (o = s.options
                    .infinite ? s.options.slidesToShow + s.currentSlide : s
                    .currentSlide, r = o + s.options.slidesToShow, s.options
                    .fade === !0 && (o > 0 && o--, r <= s.slideCount && r++)
                ), n = s.$slider.find(".slick-slide").slice(o, r), t(n), s.slideCount <=
                s.options.slidesToShow ? (i = s.$slider.find(".slick-slide"),
                    t(i)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ?
                (i = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow),
                    t(i)) : 0 === s.currentSlide && (i = s.$slider.find(
                        ".slick-cloned").slice(-1 * s.options.slidesToShow),
                    t(i))
        }, t.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                    opacity: 1
                }), e.$slider.removeClass("slick-loading"), e.initUI(),
                "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, t.prototype.next = t.prototype.slickNext = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, t.prototype.orientationChange = function() {
            var e = this;
            e.checkResponsive(), e.setPosition()
        }, t.prototype.pause = t.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, t.prototype.play = t.prototype.slickPlay = function() {
            var e = this;
            e.paused = !1, e.autoPlay()
        }, t.prototype.postSlide = function(e) {
            var t = this;
            t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(),
                t.swipeLeft = null, t.options.autoplay === !0 && t.paused ===
                !1 && t.autoPlay(), t.options.accessibility === !0 && t.initADA()
        }, t.prototype.prev = t.prototype.slickPrev = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, t.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, t.prototype.progressiveLazyLoad = function() {
            var t, n, i = this;
            t = e("img[data-lazy]", i.$slider).length, t > 0 && (n = e(
                "img[data-lazy]", i.$slider).first(), n.attr("src",
                null), n.attr("src", n.attr("data-lazy")).removeClass(
                "slick-loading").load(function() {
                n.removeAttr("data-lazy"), i.progressiveLazyLoad(),
                    i.options.adaptiveHeight === !0 && i.setPosition()
            }).error(function() {
                n.removeAttr("data-lazy"), i.progressiveLazyLoad()
            }))
        }, t.prototype.refresh = function(t) {
            var n, i, o = this;
            i = o.slideCount - o.options.slidesToShow, o.options.infinite ||
                (o.slideCount <= o.options.slidesToShow ? o.currentSlide =
                    0 : o.currentSlide > i && (o.currentSlide = i)), n = o.currentSlide,
                o.destroy(!0), e.extend(o, o.initials, {
                    currentSlide: n
                }), o.init(), t || o.changeSlide({
                    data: {
                        message: "index",
                        index: n
                    }
                }, !1)
        }, t.prototype.registerBreakpoints = function() {
            var t, n, i, o = this,
                r = o.options.responsive || null;
            if ("array" === e.type(r) && r.length) {
                o.respondTo = o.options.respondTo || "window";
                for (t in r)
                    if (i = o.breakpoints.length - 1, n = r[t].breakpoint,
                        r.hasOwnProperty(t)) {
                        for (; i >= 0;) o.breakpoints[i] && o.breakpoints[i] ===
                            n && o.breakpoints.splice(i, 1), i--;
                        o.breakpoints.push(n), o.breakpointSettings[n] = r[
                            t].settings
                    }
                o.breakpoints.sort(function(e, t) {
                    return o.options.mobileFirst ? e - t : t - e
                })
            }
        }, t.prototype.reinit = function() {
            var t = this;
            t.$slides = t.$slideTrack.children(t.options.slide).addClass(
                    "slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >=
                t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t
                    .currentSlide - t.options.slidesToScroll), t.slideCount <=
                t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(),
                t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(),
                t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(),
                t.checkResponsive(!1, !0), t.options.focusOnSelect === !0 &&
                e(t.$slideTrack).children().on("click.slick", t.selectHandler),
                t.setSlideClasses(0), t.setPosition(), t.$slider.trigger(
                    "reInit", [t]), t.options.autoplay === !0 && t.focusHandler()
        }, t.prototype.resize = function() {
            var t = this;
            e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay),
                t.windowDelay = window.setTimeout(function() {
                    t.windowWidth = e(window).width(), t.checkResponsive(),
                        t.unslicked || t.setPosition()
                }, 50))
        }, t.prototype.removeSlide = t.prototype.slickRemove = function(e,
            t, n) {
            var i = this;
            return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : i.slideCount -
                    1) : e = t === !0 ? --e : e, i.slideCount < 1 || 0 > e ||
                e > i.slideCount - 1 ? !1 : (i.unload(), n === !0 ? i.$slideTrack
                    .children().remove() : i.$slideTrack.children(this.options
                        .slide).eq(e).remove(), i.$slides = i.$slideTrack.children(
                        this.options.slide), i.$slideTrack.children(this.options
                        .slide).detach(), i.$slideTrack.append(i.$slides),
                    i.$slidesCache = i.$slides, void i.reinit())
        }, t.prototype.setCSS = function(e) {
            var t, n, i = this,
                o = {};
            i.options.rtl === !0 && (e = -e), t = "left" == i.positionProp ?
                Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ?
                Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, i.transformsEnabled ===
                !1 ? i.$slideTrack.css(o) : (o = {}, i.cssTransitions === !
                    1 ? (o[i.animType] = "translate(" + t + ", " + n + ")",
                        i.$slideTrack.css(o)) : (o[i.animType] =
                        "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack
                        .css(o)))
        }, t.prototype.setDimensions = function() {
            var e = this;
            e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list
                .css({
                    padding: "0px " + e.options.centerPadding
                }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options
                        .slidesToShow), e.options.centerMode === !0 && e.$list
                    .css({
                        padding: e.options.centerPadding + " 0px"
                    })), e.listWidth = e.$list.width(), e.listHeight = e.$list
                .height(), e.options.vertical === !1 && e.options.variableWidth ===
                !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow),
                    e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack
                        .children(".slick-slide").length))) : e.options.variableWidth ===
                !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth =
                    Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(
                        e.$slides.first().outerHeight(!0) * e.$slideTrack
                        .children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            e.options.variableWidth === !1 && e.$slideTrack.children(
                ".slick-slide").width(e.slideWidth - t)
        }, t.prototype.setFade = function() {
            var t, n = this;
            n.$slides.each(function(i, o) {
                t = n.slideWidth * i * -1, n.options.rtl === !0 ? e(
                    o).css({
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                }) : e(o).css({
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                })
            }), n.$slides.eq(n.currentSlide).css({
                zIndex: n.options.zIndex - 1,
                opacity: 1
            })
        }, t.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight ===
                !0 && e.options.vertical === !1) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, t.prototype.setOption = t.prototype.slickSetOption = function(t,
            n, i) {
            var o, r, s = this;
            if ("responsive" === t && "array" === e.type(n))
                for (r in n)
                    if ("array" !== e.type(s.options.responsive)) s.options
                        .responsive = [n[r]];
                    else {
                        for (o = s.options.responsive.length - 1; o >= 0;) s
                            .options.responsive[o].breakpoint === n[r].breakpoint &&
                            s.options.responsive.splice(o, 1), o--;
                        s.options.responsive.push(n[r])
                    } else s.options[t] = n;
            i === !0 && (s.unload(), s.reinit())
        }, t.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(
                e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger(
                "setPosition", [e])
        }, t.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = e.options.vertical === !0 ? "top" : "left",
                "top" === e.positionProp ? e.$slider.addClass(
                    "slick-vertical") : e.$slider.removeClass(
                    "slick-vertical"), (void 0 !== t.WebkitTransition ||
                    void 0 !== t.MozTransition || void 0 !== t.msTransition
                ) && e.options.useCSS === !0 && (e.cssTransitions = !0), e.options
                .fade && ("number" == typeof e.options.zIndex ? e.options.zIndex <
                    3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults
                    .zIndex), void 0 !== t.OTransform && (e.animType =
                    "OTransform", e.transformType = "-o-transform", e.transitionType =
                    "OTransition", void 0 === t.perspectiveProperty && void 0 ===
                    t.webkitPerspective && (e.animType = !1)), void 0 !== t
                .MozTransform && (e.animType = "MozTransform", e.transformType =
                    "-moz-transform", e.transitionType = "MozTransition",
                    void 0 === t.perspectiveProperty && void 0 === t.MozPerspective &&
                    (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType =
                    "webkitTransform", e.transformType =
                    "-webkit-transform", e.transitionType =
                    "webkitTransition", void 0 === t.perspectiveProperty &&
                    void 0 === t.webkitPerspective && (e.animType = !1)),
                void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType =
                    "-ms-transform", e.transitionType = "msTransition",
                    void 0 === t.msTransform && (e.animType = !1)), void 0 !==
                t.transform && e.animType !== !1 && (e.animType =
                    "transform", e.transformType = "transform", e.transitionType =
                    "transition"), e.transformsEnabled = e.options.useTransform &&
                null !== e.animType && e.animType !== !1
        }, t.prototype.setSlideClasses = function(e) {
            var t, n, i, o, r = this;
            n = r.$slider.find(".slick-slide").removeClass(
                    "slick-active slick-center slick-current").attr(
                    "aria-hidden", "true"), r.$slides.eq(e).addClass(
                    "slick-current"), r.options.centerMode === !0 ? (t =
                    Math.floor(r.options.slidesToShow / 2), r.options.infinite ===
                    !0 && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(
                            e - t, e + t + 1).addClass("slick-active").attr(
                            "aria-hidden", "false") : (i = r.options.slidesToShow +
                            e, n.slice(i - t + 1, i + t + 2).addClass(
                                "slick-active").attr("aria-hidden", "false")
                        ), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow)
                        .addClass("slick-center") : e === r.slideCount - 1 &&
                        n.eq(r.options.slidesToShow).addClass(
                            "slick-center")), r.$slides.eq(e).addClass(
                        "slick-center")) : e >= 0 && e <= r.slideCount - r.options
                .slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow)
                .addClass("slick-active").attr("aria-hidden", "false") : n.length <=
                r.options.slidesToShow ? n.addClass("slick-active").attr(
                    "aria-hidden", "false") : (o = r.slideCount % r.options
                    .slidesToShow, i = r.options.infinite === !0 ? r.options
                    .slidesToShow + e : e, r.options.slidesToShow == r.options
                    .slidesToScroll && r.slideCount - e < r.options.slidesToShow ?
                    n.slice(i - (r.options.slidesToShow - o), i + o).addClass(
                        "slick-active").attr("aria-hidden", "false") : n.slice(
                        i, i + r.options.slidesToShow).addClass(
                        "slick-active").attr("aria-hidden", "false")),
                "ondemand" === r.options.lazyLoad && r.lazyLoad()
        }, t.prototype.setupInfinite = function() {
            var t, n, i, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options
                .infinite === !0 && o.options.fade === !1 && (n = null, o.slideCount >
                    o.options.slidesToShow)) {
                for (i = o.options.centerMode === !0 ? o.options.slidesToShow +
                    1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount -
                    i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr(
                        "id", "").attr("data-slick-index", n - o.slideCount)
                    .prependTo(o.$slideTrack).addClass("slick-cloned");
                for (t = 0; i > t; t += 1) n = t, e(o.$slides[n]).clone(!0)
                    .attr("id", "").attr("data-slick-index", n + o.slideCount)
                    .appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(
                    function() {
                        e(this).attr("id", "")
                    })
            }
        }, t.prototype.setPaused = function(e) {
            var t = this;
            t.options.autoplay === !0 && t.options.pauseOnHover === !0 && (
                t.paused = e, e ? t.autoPlayClear() : t.autoPlay())
        }, t.prototype.selectHandler = function(t) {
            var n = this,
                i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target)
                .parents(".slick-slide"),
                o = parseInt(i.attr("data-slick-index"));
            return o || (o = 0), n.slideCount <= n.options.slidesToShow ? (
                n.setSlideClasses(o), void n.asNavFor(o)) : void n.slideHandler(
                o)
        }, t.prototype.slideHandler = function(e, t, n) {
            var i, o, r, s, a = null,
                l = this;
            return t = t || !1, l.animating === !0 && l.options.waitForAnimate ===
                !0 || l.options.fade === !0 && l.currentSlide === e || l.slideCount <=
                l.options.slidesToShow ? void 0 : (t === !1 && l.asNavFor(e),
                    i = e, a = l.getLeft(i), s = l.getLeft(l.currentSlide),
                    l.currentLeft = null === l.swipeLeft ? s : l.swipeLeft,
                    l.options.infinite === !1 && l.options.centerMode === !
                    1 && (0 > e || e > l.getDotCount() * l.options.slidesToScroll) ?
                    void(l.options.fade === !1 && (i = l.currentSlide, n !==
                        !0 ? l.animateSlide(s, function() {
                            l.postSlide(i)
                        }) : l.postSlide(i))) : l.options.infinite === !1 &&
                    l.options.centerMode === !0 && (0 > e || e > l.slideCount -
                        l.options.slidesToScroll) ? void(l.options.fade ===
                        !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(
                            s, function() {
                                l.postSlide(i)
                            }) : l.postSlide(i))) : (l.options.autoplay ===
                        !0 && clearInterval(l.autoPlayTimer), o = 0 > i ? l
                        .slideCount % l.options.slidesToScroll !== 0 ? l.slideCount -
                        l.slideCount % l.options.slidesToScroll : l.slideCount +
                        i : i >= l.slideCount ? l.slideCount % l.options.slidesToScroll !==
                        0 ? 0 : i - l.slideCount : i, l.animating = !0, l.$slider
                        .trigger("beforeChange", [l, l.currentSlide, o]), r =
                        l.currentSlide, l.currentSlide = o, l.setSlideClasses(
                            l.currentSlide), l.updateDots(), l.updateArrows(),
                        l.options.fade === !0 ? (n !== !0 ? (l.fadeSlideOut(
                            r), l.fadeSlide(o, function() {
                            l.postSlide(o)
                        })) : l.postSlide(o), void l.animateHeight()) :
                        void(n !== !0 ? l.animateSlide(a, function() {
                            l.postSlide(o)
                        }) : l.postSlide(o))))
        }, t.prototype.startLoad = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow &&
                (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots ===
                !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
                e.$slider.addClass("slick-loading")
        }, t.prototype.swipeDirection = function() {
            var e, t, n, i, o = this;
            return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject
                .startY - o.touchObject.curY, n = Math.atan2(t, e), i =
                Math.round(180 * n / Math.PI), 0 > i && (i = 360 - Math.abs(
                    i)), 45 >= i && i >= 0 ? o.options.rtl === !1 ? "left" :
                "right" : 360 >= i && i >= 315 ? o.options.rtl === !1 ?
                "left" : "right" : i >= 135 && 225 >= i ? o.options.rtl ===
                !1 ? "right" : "left" : o.options.verticalSwiping === !0 ?
                i >= 35 && 135 >= i ? "left" : "right" : "vertical"
        }, t.prototype.swipeEnd = function(e) {
            var t, n = this;
            if (n.dragging = !1, n.shouldClick = n.touchObject.swipeLength >
                10 ? !1 : !0, void 0 === n.touchObject.curX) return !1;
            if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [
                n, n.swipeDirection()
            ]), n.touchObject.swipeLength >= n.touchObject.minSwipe) switch (
                n.swipeDirection()) {
                case "left":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide +
                            n.getSlideCount()) : n.currentSlide + n.getSlideCount(),
                        n.slideHandler(t), n.currentDirection = 0, n.touchObject = {},
                        n.$slider.trigger("swipe", [n, "left"]);
                    break;
                case "right":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide -
                            n.getSlideCount()) : n.currentSlide - n.getSlideCount(),
                        n.slideHandler(t), n.currentDirection = 1, n.touchObject = {},
                        n.$slider.trigger("swipe", [n, "right"])
            } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(
                n.currentSlide), n.touchObject = {})
        }, t.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(t.options.swipe === !1 || "ontouchend" in document && t.options
                .swipe === !1 || t.options.draggable === !1 && -1 !== e
                .type.indexOf("mouse"))) switch (t.touchObject.fingerCount =
                e.originalEvent && void 0 !== e.originalEvent.touches ?
                e.originalEvent.touches.length : 1, t.touchObject.minSwipe =
                t.listWidth / t.options.touchThreshold, t.options.verticalSwiping ===
                !0 && (t.touchObject.minSwipe = t.listHeight / t.options
                    .touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, t.prototype.swipeMove = function(e) {
            var t, n, i, o, r, s = this;
            return r = void 0 !== e.originalEvent ? e.originalEvent.touches :
                null, !s.dragging || r && 1 !== r.length ? !1 : (t = s.getLeft(
                        s.currentSlide), s.touchObject.curX = void 0 !== r ?
                    r[0].pageX : e.clientX, s.touchObject.curY = void 0 !==
                    r ? r[0].pageY : e.clientY, s.touchObject.swipeLength =
                    Math.round(Math.sqrt(Math.pow(s.touchObject.curX - s.touchObject
                        .startX, 2))), s.options.verticalSwiping === !0 &&
                    (s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(
                        s.touchObject.curY - s.touchObject.startY,
                        2)))), n = s.swipeDirection(), "vertical" !== n ? (
                        void 0 !== e.originalEvent && s.touchObject.swipeLength >
                        4 && e.preventDefault(), o = (s.options.rtl === !1 ?
                            1 : -1) * (s.touchObject.curX > s.touchObject.startX ?
                            1 : -1), s.options.verticalSwiping === !0 && (o =
                            s.touchObject.curY > s.touchObject.startY ? 1 :
                            -1), i = s.touchObject.swipeLength, s.touchObject
                        .edgeHit = !1, s.options.infinite === !1 && (0 ===
                            s.currentSlide && "right" === n || s.currentSlide >=
                            s.getDotCount() && "left" === n) && (i = s.touchObject
                            .swipeLength * s.options.edgeFriction, s.touchObject
                            .edgeHit = !0), s.options.vertical === !1 ? s.swipeLeft =
                        t + i * o : s.swipeLeft = t + i * (s.$list.height() /
                            s.listWidth) * o, s.options.verticalSwiping ===
                        !0 && (s.swipeLeft = t + i * o), s.options.fade ===
                        !0 || s.options.touchMove === !1 ? !1 : s.animating ===
                        !0 ? (s.swipeLeft = null, !1) : void s.setCSS(s.swipeLeft)
                    ) : void 0)
        }, t.prototype.swipeStart = function(e) {
            var t, n = this;
            return 1 !== n.touchObject.fingerCount || n.slideCount <= n.options
                .slidesToShow ? (n.touchObject = {}, !1) : (void 0 !== e.originalEvent &&
                    void 0 !== e.originalEvent.touches && (t = e.originalEvent
                        .touches[0]), n.touchObject.startX = n.touchObject.curX =
                    void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY =
                    n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY,
                    void(n.dragging = !0))
        }, t.prototype.unfilterSlides = t.prototype.slickUnfilter =
        function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(
                this.options.slide).detach(), e.$slidesCache.appendTo(
                e.$slideTrack), e.reinit())
        }, t.prototype.unload = function() {
            var t = this;
            e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(),
                t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow
                .remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) &&
                t.$nextArrow.remove(), t.$slides.removeClass(
                    "slick-slide slick-active slick-visible slick-current")
                .attr("aria-hidden", "true").css("width", "")
        }, t.prototype.unslick = function(e) {
            var t = this;
            t.$slider.trigger("unslick", [t, e]), t.destroy()
        }, t.prototype.updateArrows = function() {
            var e, t = this;
            e = Math.floor(t.options.slidesToShow / 2), t.options.arrows ===
                !0 && t.slideCount > t.options.slidesToShow && !t.options.infinite &&
                (t.$prevArrow.removeClass("slick-disabled").attr(
                        "aria-disabled", "false"), t.$nextArrow.removeClass(
                        "slick-disabled").attr("aria-disabled", "false"), 0 ===
                    t.currentSlide ? (t.$prevArrow.addClass(
                            "slick-disabled").attr("aria-disabled", "true"),
                        t.$nextArrow.removeClass("slick-disabled").attr(
                            "aria-disabled", "false")) : t.currentSlide >=
                    t.slideCount - t.options.slidesToShow && t.options.centerMode ===
                    !1 ? (t.$nextArrow.addClass("slick-disabled").attr(
                        "aria-disabled", "true"), t.$prevArrow.removeClass(
                        "slick-disabled").attr("aria-disabled", "false")) :
                    t.currentSlide >= t.slideCount - 1 && t.options.centerMode ===
                    !0 && (t.$nextArrow.addClass("slick-disabled").attr(
                        "aria-disabled", "true"), t.$prevArrow.removeClass(
                        "slick-disabled").attr("aria-disabled", "false")))
        }, t.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass(
                    "slick-active").attr("aria-hidden", "true"), e.$dots
                .find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
                .addClass("slick-active").attr("aria-hidden", "false"))
        }, t.prototype.visibility = function() {
            var e = this;
            document[e.hidden] ? (e.paused = !0, e.autoPlayClear()) : e.options
                .autoplay === !0 && (e.paused = !1, e.autoPlay())
        }, t.prototype.initADA = function() {
            var t = this;
            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack
                .find(".slick-cloned")).each(function(n) {
                e(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + t.instanceUid +
                        n
                })
            }), null !== t.$dots && t.$dots.attr("role", "tablist").find(
                "li").each(function(n) {
                e(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + t.instanceUid +
                        n,
                    id: "slick-slide" + t.instanceUid + n
                })
            }).first().attr("aria-selected", "true").end().find(
                "button").attr("role", "button").end().closest("div").attr(
                "role", "toolbar"), t.activateADA()
        }, t.prototype.activateADA = function() {
            var e = this;
            e.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, t.prototype.focusHandler = function() {
            var t = this;
            t.$slider.on("focus.slick blur.slick", "*", function(n) {
                n.stopImmediatePropagation();
                var i = e(this);
                setTimeout(function() {
                    t.isPlay && (i.is(":focus") ? (t.autoPlayClear(),
                        t.paused = !0) : (t.paused = !
                        1, t.autoPlay()))
                }, 0)
            })
        }, e.fn.slick = function() {
            var e, n, i = this,
                o = arguments[0],
                r = Array.prototype.slice.call(arguments, 1),
                s = i.length;
            for (e = 0; s > e; e++)
                if ("object" == typeof o || "undefined" == typeof o ? i[e].slick =
                    new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r),
                    "undefined" != typeof n) return n;
            return i
        }
}),
function(e) {
    "use strict";

    function t(e) {
        "function" == typeof e && (t.isReady ? e() : s.push(e))
    }

    function n(e) {
        var n = "readystatechange" === e.type && "complete" !== r.readyState;
        t.isReady || n || i()
    }

    function i() {
        t.isReady = !0;
        for (var e = 0, n = s.length; n > e; e++) {
            var i = s[e];
            i()
        }
    }

    function o(o) {
        return "complete" === r.readyState ? i() : (o.bind(r,
                "DOMContentLoaded", n), o.bind(r, "readystatechange", n),
            o.bind(e, "load", n)), t
    }
    var r = e.document,
        s = [];
    t.isReady = !1, "function" == typeof define && define.amd ? define([
        "eventie/eventie"
    ], o) : "object" == typeof exports ? module.exports = o(require(
        "eventie")) : e.docReady = o(e.eventie)
}(window),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"],
            function(n) {
                return t(e, n)
            }) : "object" == typeof module && module.exports ? module.exports =
        t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}(window, function(e, t) {
    "use strict";

    function n(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function i(e) {
        var t = [];
        if (Array.isArray(e)) t = e;
        else if ("number" == typeof e.length)
            for (var n = 0; n < e.length; n++) t.push(e[n]);
        else t.push(e);
        return t
    }

    function o(e, t, r) {
        return this instanceof o ? ("string" == typeof e && (e =
                document.querySelectorAll(e)), this.elements = i(e),
            this.options = n({}, this.options), "function" ==
            typeof t ? r = t : n(this.options, t), r && this.on(
                "always", r), this.getImages(), a && (this.jqDeferred =
                new a.Deferred), void setTimeout(function() {
                this.check()
            }.bind(this))) : new o(e, t, r)
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }
    var a = e.jQuery,
        l = e.console;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype
        .getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages,
                this)
        }, o.prototype.addElementImages = function(e) {
            "IMG" == e.nodeName && this.addImage(e), this.options.background ===
                !0 && this.addElementBackgroundImages(e);
            var t = e.nodeType;
            if (t && u[t]) {
                for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) {
                    var o = n[i];
                    this.addImage(o)
                }
                if ("string" == typeof this.options.background) {
                    var r = e.querySelectorAll(this.options.background);
                    for (i = 0; i < r.length; i++) {
                        var s = r[i];
                        this.addElementBackgroundImages(s)
                    }
                }
            }
        };
    var u = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(e) {
            var t = getComputedStyle(e);
            if (t)
                for (var n = /url\((['"])?(.*?)\1\)/gi, i = n.exec(t.backgroundImage); null !==
                    i;) {
                    var o = i && i[2];
                    o && this.addBackground(o, e), i = n.exec(t.backgroundImage)
                }
        }, o.prototype.addImage = function(e) {
            var t = new r(e);
            this.images.push(t)
        }, o.prototype.addBackground = function(e, t) {
            var n = new s(e, t);
            this.images.push(n)
        }, o.prototype.check = function() {
            function e(e, n, i) {
                setTimeout(function() {
                    t.progress(e, n, i)
                })
            }
            var t = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images
                .length ? void this.images.forEach(function(t) {
                    t.once("progress", e), t.check()
                }) : void this.complete()
        }, o.prototype.progress = function(e, t, n) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken ||
                !e.isLoaded, this.emitEvent("progress", [this, e, t]), this
                .jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(
                    this, e), this.progressedCount == this.images.length &&
                this.complete(), this.options.debug && l && l.log(
                    "progress: " + n, e, t)
        }, o.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent(
                "always", [this]), this.jqDeferred) {
                var t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this)
            }
        }, r.prototype = Object.create(t.prototype), r.prototype.check =
        function() {
            var e = this.getIsImageComplete();
            return e ? void this.confirm(0 !== this.img.naturalWidth,
                "naturalWidth") : (this.proxyImage = new Image, this.proxyImage
                .addEventListener("load", this), this.proxyImage.addEventListener(
                    "error", this), this.img.addEventListener("load",
                    this), this.img.addEventListener("error", this),
                void(this.proxyImage.src = this.img.src))
        }, r.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, r.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.img,
                t
            ])
        }, r.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, r.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, r.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, r.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage
                .removeEventListener("error", this), this.img.removeEventListener(
                    "load", this), this.img.removeEventListener("error",
                    this)
        }, s.prototype = Object.create(r.prototype), s.prototype.check =
        function() {
            this.img.addEventListener("load", this), this.img.addEventListener(
                "error", this), this.img.src = this.url;
            var e = this.getIsImageComplete();
            e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                this.unbindEvents())
        }, s.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener(
                "error", this)
        }, s.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.element,
                t
            ])
        }, o.makeJQueryPlugin = function(t) {
            t = t || e.jQuery, t && (a = t, a.fn.imagesLoaded = function(e,
                t) {
                var n = new o(this, e, t);
                return n.jqDeferred.promise(a(this))
            })
        }, o.makeJQueryPlugin(), o
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["doc-ready/doc-ready",
            "matches-selector/matches-selector"
        ], function(n, i) {
            return t(e, n, i)
        }) : "object" == typeof exports ? module.exports = t(e, require(
            "doc-ready"), require("desandro-matches-selector")) : e.fizzyUIUtils =
        t(e, e.docReady, e.matchesSelector)
}(window, function(e, t, n) {
    "use strict";
    var i = {};
    i.extend = function(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }, i.modulo = function(e, t) {
        return (e % t + t) % t
    };
    var o = Object.prototype.toString;
    i.isArray = function(e) {
            return "[object Array]" == o.call(e)
        }, i.makeArray = function(e) {
            var t = [];
            if (i.isArray(e)) t = e;
            else if (e && "number" == typeof e.length)
                for (var n = 0, o = e.length; o > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }, i.indexOf = Array.prototype.indexOf ? function(e, t) {
            return e.indexOf(t)
        } : function(e, t) {
            for (var n = 0, i = e.length; i > n; n++)
                if (e[n] === t) return n;
            return -1
        }, i.removeFrom = function(e, t) {
            var n = i.indexOf(e, t); - 1 != n && e.splice(n, 1)
        }, i.isElement = "function" == typeof HTMLElement || "object" ==
        typeof HTMLElement ? function(e) {
            return e instanceof HTMLElement
        } : function(e) {
            return e && "object" == typeof e && 1 == e.nodeType && "string" ==
                typeof e.nodeName
        }, i.setText = function() {
            function e(e, n) {
                t = t || (void 0 !== document.documentElement.textContent ?
                    "textContent" : "innerText"), e[t] = n
            }
            var t;
            return e
        }(), i.getParent = function(e, t) {
            for (; e != document.body;)
                if (e = e.parentNode, n(e, t)) return e
        }, i.getQueryElement = function(e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }, i.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, i.filterFindElements = function(e, t) {
            e = i.makeArray(e);
            for (var o = [], r = 0, s = e.length; s > r; r++) {
                var a = e[r];
                if (i.isElement(a))
                    if (t) {
                        n(a, t) && o.push(a);
                        for (var l = a.querySelectorAll(t), u = 0, c = l.length; c >
                            u; u++) o.push(l[u])
                    } else o.push(a)
            }
            return o
        }, i.debounceMethod = function(e, t, n) {
            var i = e.prototype[t],
                o = t + "Timeout";
            e.prototype[t] = function() {
                var e = this[o];
                e && clearTimeout(e);
                var t = arguments,
                    r = this;
                this[o] = setTimeout(function() {
                    i.apply(r, t), delete r[o]
                }, n || 100)
            }
        }, i.toDashed = function(e) {
            return e.replace(/(.)([A-Z])/g, function(e, t, n) {
                return t + "-" + n
            }).toLowerCase()
        };
    var r = e.console;
    return i.htmlInit = function(n, o) {
        t(function() {
            for (var t = i.toDashed(o), s = document.querySelectorAll(
                    ".js-" + t), a = "data-" + t +
                "-options", l = 0, u = s.length; u > l; l++) {
                var c, d = s[l],
                    p = d.getAttribute(a);
                try {
                    c = p && JSON.parse(p)
                } catch (f) {
                    r && r.error("Error parsing " + a + " on " +
                        d.nodeName.toLowerCase() + (d.id ?
                            "#" + d.id : "") + ": " + f);
                    continue
                }
                var h = new n(d, c),
                    m = e.jQuery;
                m && m.data(d, o, h)
            }
        })
    }, i
}),
function(e) {
    function t() {}

    function n(e) {
        function n(t) {
            t.prototype.option || (t.prototype.option = function(t) {
                e.isPlainObject(t) && (this.options = e.extend(!
                    0, this.options, t))
            })
        }

        function o(t, n) {
            e.fn[t] = function(o) {
                if ("string" == typeof o) {
                    for (var s = i.call(arguments, 1), a = 0, l =
                        this.length; l > a; a++) {
                        var u = this[a],
                            c = e.data(u, t);
                        if (c)
                            if (e.isFunction(c[o]) && "_" !== o.charAt(
                                0)) {
                                var d = c[o].apply(c, s);
                                if (void 0 !== d) return d
                            } else r("no such method '" + o +
                                "' for " + t + " instance");
                        else r("cannot call methods on " + t +
                            " prior to initialization; attempted to call '" +
                            o + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var i = e.data(this, t);
                    i ? (i.option(o), i._init()) : (i = new n(
                        this, o), e.data(this, t, i))
                })
            }
        }
        if (e) {
            var r = "undefined" == typeof console ? t : function(e) {
                console.error(e)
            };
            return e.bridget = function(e, t) {
                n(t), o(e, t)
            }, e.bridget
        }
    }
    var i = Array.prototype.slice;
    "function" == typeof define && define.amd ? define(
        "jquery-bridget/jquery.bridget", ["jquery"], n) : n("object" ==
        typeof exports ? require("jquery") : e.jQuery)
}(window),
function(e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }
    var n = document.documentElement,
        i = function() {};
    n.addEventListener ? i = function(e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (i = function(e, n, i) {
        e[n + i] = i.handleEvent ? function() {
            var n = t(e);
            i.handleEvent.call(i, n)
        } : function() {
            var n = t(e);
            i.call(e, n)
        }, e.attachEvent("on" + n, e[n + i])
    });
    var o = function() {};
    n.removeEventListener ? o = function(e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (o = function(e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (i) {
            e[t + n] = void 0
        }
    });
    var r = {
        bind: i,
        unbind: o
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", r) :
        "object" == typeof exports ? module.exports = r : e.eventie = r
}(window),
function() {
    "use strict";

    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    var i = e.prototype,
        o = this,
        r = o.EventEmitter;
    i.getListeners = function(e) {
            var t, n, i = this._getEvents();
            if (e instanceof RegExp) {
                t = {};
                for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
            } else t = i[e] || (i[e] = []);
            return t
        }, i.flattenListeners = function(e) {
            var t, n = [];
            for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
            return n
        }, i.getListenersAsObject = function(e) {
            var t, n = this.getListeners(e);
            return n instanceof Array && (t = {}, t[e] = n), t || n
        }, i.addListener = function(e, n) {
            var i, o = this.getListenersAsObject(e),
                r = "object" == typeof n;
            for (i in o) o.hasOwnProperty(i) && -1 === t(o[i], n) && o[i].push(
                r ? n : {
                    listener: n,
                    once: !1
                });
            return this
        }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
            return this.getListeners(e), this
        }, i.defineEvents = function(e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, i.removeListener = function(e, n) {
            var i, o, r = this.getListenersAsObject(e);
            for (o in r) r.hasOwnProperty(o) && (i = t(r[o], n), -1 !== i && r[
                o].splice(i, 1));
            return this
        }, i.off = n("removeListener"), i.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, i.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, i.manipulateListeners = function(e, t, n) {
            var i, o, r = e ? this.removeListener : this.addListener,
                s = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (i = n.length; i--;) r.call(this, t, n[i]);
            else
                for (i in t) t.hasOwnProperty(i) && (o = t[i]) && ("function" ==
                    typeof o ? r.call(this, i, o) : s.call(this, i, o));
            return this
        }, i.removeEvent = function(e) {
            var t, n = typeof e,
                i = this._getEvents();
            if ("string" === n) delete i[e];
            else if (e instanceof RegExp)
                for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
            else delete this._events;
            return this
        }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
            var n, i, o, r, s = this.getListenersAsObject(e);
            for (o in s)
                if (s.hasOwnProperty(o))
                    for (i = s[o].length; i--;) n = s[o][i], n.once === !0 &&
                        this.removeListener(e, n.listener), r = n.listener.apply(
                            this, t || []), r === this._getOnceReturnValue() &&
                        this.removeListener(e, n.listener);
            return this
        }, i.trigger = n("emitEvent"), i.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, i.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, i._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue :
                !0
        }, i._getEvents = function() {
            return this._events || (this._events = {})
        }, e.noConflict = function() {
            return o.EventEmitter = r, e
        }, "function" == typeof define && define.amd ? define(
            "eventEmitter/EventEmitter", [], function() {
                return e
            }) : "object" == typeof module && module.exports ? module.exports =
        e : o.EventEmitter = e
}.call(this),
    function(e) {
        function t(e) {
            if (e) {
                if ("string" == typeof i[e]) return e;
                e = e.charAt(0).toUpperCase() + e.slice(1);
                for (var t, o = 0, r = n.length; r > o; o++)
                    if (t = n[o] + e, "string" == typeof i[t]) return t
            }
        }
        var n = "Webkit Moz ms Ms O".split(" "),
            i = document.documentElement.style;
        "function" == typeof define && define.amd ? define(
                "get-style-property/get-style-property", [], function() {
                    return t
                }) : "object" == typeof exports ? module.exports = t : e.getStyleProperty =
            t
    }(window),
    function(e, t) {
        function n(e) {
            var t = parseFloat(e),
                n = -1 === e.indexOf("%") && !isNaN(t);
            return n && t
        }

        function i() {}

        function o() {
            for (var e = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, t = 0, n = a.length; n > t; t++) {
                var i = a[t];
                e[i] = 0
            }
            return e
        }

        function r(t) {
            function i() {
                if (!p) {
                    p = !0;
                    var i = e.getComputedStyle;
                    if (u = function() {
                        var e = i ? function(e) {
                            return i(e, null)
                        } : function(e) {
                            return e.currentStyle
                        };
                        return function(t) {
                            var n = e(t);
                            return n || s("Style returned " + n +
                                ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                            ), n
                        }
                    }(), c = t("boxSizing")) {
                        var o = document.createElement("div");
                        o.style.width = "200px", o.style.padding =
                            "1px 2px 3px 4px", o.style.borderStyle =
                            "solid", o.style.borderWidth =
                            "1px 2px 3px 4px", o.style[c] =
                            "border-box";
                        var r = document.body || document.documentElement;
                        r.appendChild(o);
                        var a = u(o);
                        d = 200 === n(a.width), r.removeChild(o)
                    }
                }
            }

            function r(e) {
                if (i(), "string" == typeof e && (e = document.querySelector(
                    e)), e && "object" == typeof e && e.nodeType) {
                    var t = u(e);
                    if ("none" === t.display) return o();
                    var r = {};
                    r.width = e.offsetWidth, r.height = e.offsetHeight;
                    for (var s = r.isBorderBox = !(!c || !t[c] ||
                            "border-box" !== t[c]), p = 0, f = a.length; f >
                        p; p++) {
                        var h = a[p],
                            m = t[h];
                        m = l(e, m);
                        var g = parseFloat(m);
                        r[h] = isNaN(g) ? 0 : g
                    }
                    var y = r.paddingLeft + r.paddingRight,
                        v = r.paddingTop + r.paddingBottom,
                        b = r.marginLeft + r.marginRight,
                        x = r.marginTop + r.marginBottom,
                        w = r.borderLeftWidth + r.borderRightWidth,
                        S = r.borderTopWidth + r.borderBottomWidth,
                        T = s && d,
                        k = n(t.width);
                    k !== !1 && (r.width = k + (T ? 0 : y + w));
                    var C = n(t.height);
                    return C !== !1 && (r.height = C + (T ? 0 : v + S)),
                        r.innerWidth = r.width - (y + w), r.innerHeight =
                        r.height - (v + S), r.outerWidth = r.width + b,
                        r.outerHeight = r.height + x, r
                }
            }

            function l(t, n) {
                if (e.getComputedStyle || -1 === n.indexOf("%")) return
                    n;
                var i = t.style,
                    o = i.left,
                    r = t.runtimeStyle,
                    s = r && r.left;
                return s && (r.left = t.currentStyle.left), i.left = n,
                    n = i.pixelLeft, i.left = o, s && (r.left = s), n
            }
            var u, c, d, p = !1;
            return r
        }
        var s = "undefined" == typeof console ? i : function(e) {
                console.error(e)
            },
            a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom",
                "marginLeft", "marginRight", "marginTop", "marginBottom",
                "borderLeftWidth", "borderRightWidth", "borderTopWidth",
                "borderBottomWidth"
            ];
        "function" == typeof define && define.amd ? define("get-size/get-size", [
            "get-style-property/get-style-property"
        ], r) : "object" == typeof exports ? module.exports = r(require(
            "desandro-get-style-property")) : e.getSize = r(e.getStyleProperty)
    }(window),
    function(e) {
        function t(e) {
            "function" == typeof e && (t.isReady ? e() : s.push(e))
        }

        function n(e) {
            var n = "readystatechange" === e.type && "complete" !== r.readyState;
            t.isReady || n || i()
        }

        function i() {
            t.isReady = !0;
            for (var e = 0, n = s.length; n > e; e++) {
                var i = s[e];
                i()
            }
        }

        function o(o) {
            return "complete" === r.readyState ? i() : (o.bind(r,
                "DOMContentLoaded", n), o.bind(r,
                "readystatechange", n), o.bind(e, "load", n)), t
        }
        var r = e.document,
            s = [];
        t.isReady = !1, "function" == typeof define && define.amd ? define(
                "doc-ready/doc-ready", ["eventie/eventie"], o) : "object" ==
            typeof exports ? module.exports = o(require("eventie")) : e.docReady =
            o(e.eventie)
    }(window),
    function(e) {
        "use strict";

        function t(e, t) {
            return e[s](t)
        }

        function n(e) {
            if (!e.parentNode) {
                var t = document.createDocumentFragment();
                t.appendChild(e)
            }
        }

        function i(e, t) {
            n(e);
            for (var i = e.parentNode.querySelectorAll(t), o = 0, r = i.length; r >
                o; o++)
                if (i[o] === e) return !0;
            return !1
        }

        function o(e, i) {
            return n(e), t(e, i)
        }
        var r, s = function() {
            if (e.matches) return "matches";
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], n = 0, i = t.length; i >
                n; n++) {
                var o = t[n],
                    r = o + "MatchesSelector";
                if (e[r]) return r
            }
        }();
        if (s) {
            var a = document.createElement("div"),
                l = t(a, "div");
            r = l ? t : o
        } else r = i;
        "function" == typeof define && define.amd ? define(
                "matches-selector/matches-selector", [], function() {
                    return r
                }) : "object" == typeof exports ? module.exports = r : window.matchesSelector =
            r
    }(Element.prototype),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(
                "fizzy-ui-utils/utils", ["doc-ready/doc-ready",
                    "matches-selector/matches-selector"
                ], function(n, i) {
                    return t(e, n, i)
                }) : "object" == typeof exports ? module.exports = t(e, require(
                "doc-ready"), require("desandro-matches-selector")) : e.fizzyUIUtils =
            t(e, e.docReady, e.matchesSelector)
    }(window, function(e, t, n) {
        var i = {};
        i.extend = function(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }, i.modulo = function(e, t) {
            return (e % t + t) % t
        };
        var o = Object.prototype.toString;
        i.isArray = function(e) {
                return "[object Array]" == o.call(e)
            }, i.makeArray = function(e) {
                var t = [];
                if (i.isArray(e)) t = e;
                else if (e && "number" == typeof e.length)
                    for (var n = 0, o = e.length; o > n; n++) t.push(e[n]);
                else t.push(e);
                return t
            }, i.indexOf = Array.prototype.indexOf ? function(e, t) {
                return e.indexOf(t)
            } : function(e, t) {
                for (var n = 0, i = e.length; i > n; n++)
                    if (e[n] === t) return n;
                return -1
            }, i.removeFrom = function(e, t) {
                var n = i.indexOf(e, t); - 1 != n && e.splice(n, 1)
            }, i.isElement = "function" == typeof HTMLElement || "object" ==
            typeof HTMLElement ? function(e) {
                return e instanceof HTMLElement
            } : function(e) {
                return e && "object" == typeof e && 1 == e.nodeType &&
                    "string" == typeof e.nodeName
            }, i.setText = function() {
                function e(e, n) {
                    t = t || (void 0 !== document.documentElement.textContent ?
                        "textContent" : "innerText"), e[t] = n
                }
                var t;
                return e
            }(), i.getParent = function(e, t) {
                for (; e != document.body;)
                    if (e = e.parentNode, n(e, t)) return e
            }, i.getQueryElement = function(e) {
                return "string" == typeof e ? document.querySelector(e) : e
            }, i.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, i.filterFindElements = function(e, t) {
                e = i.makeArray(e);
                for (var o = [], r = 0, s = e.length; s > r; r++) {
                    var a = e[r];
                    if (i.isElement(a))
                        if (t) {
                            n(a, t) && o.push(a);
                            for (var l = a.querySelectorAll(t), u = 0, c =
                                l.length; c > u; u++) o.push(l[u])
                        } else o.push(a)
                }
                return o
            }, i.debounceMethod = function(e, t, n) {
                var i = e.prototype[t],
                    o = t + "Timeout";
                e.prototype[t] = function() {
                    var e = this[o];
                    e && clearTimeout(e);
                    var t = arguments,
                        r = this;
                    this[o] = setTimeout(function() {
                        i.apply(r, t), delete r[o]
                    }, n || 100)
                }
            }, i.toDashed = function(e) {
                return e.replace(/(.)([A-Z])/g, function(e, t, n) {
                    return t + "-" + n
                }).toLowerCase()
            };
        var r = e.console;
        return i.htmlInit = function(n, o) {
            t(function() {
                for (var t = i.toDashed(o), s = document.querySelectorAll(
                        ".js-" + t), a = "data-" + t +
                    "-options", l = 0, u = s.length; u > l; l++) {
                    var c, d = s[l],
                        p = d.getAttribute(a);
                    try {
                        c = p && JSON.parse(p)
                    } catch (f) {
                        r && r.error("Error parsing " + a +
                            " on " + d.nodeName.toLowerCase() +
                            (d.id ? "#" + d.id : "") + ": " +
                            f);
                        continue
                    }
                    var h = new n(d, c),
                        m = e.jQuery;
                    m && m.data(d, o, h)
                }
            })
        }, i
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/item", [
            "eventEmitter/EventEmitter", "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils"
        ], function(n, i, o, r) {
            return t(e, n, i, o, r)
        }) : "object" == typeof exports ? module.exports = t(e, require(
            "wolfy87-eventemitter"), require("get-size"), require(
            "desandro-get-style-property"), require("fizzy-ui-utils")) : (e
            .Outlayer = {}, e.Outlayer.Item = t(e, e.EventEmitter, e.getSize,
                e.getStyleProperty, e.fizzyUIUtils))
    }(window, function(e, t, n, i, o) {
        "use strict";

        function r(e) {
            for (var t in e) return !1;
            return t = null, !0
        }

        function s(e, t) {
            e && (this.element = e, this.layout = t, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function a(e) {
            return e.replace(/([A-Z])/g, function(e) {
                return "-" + e.toLowerCase()
            })
        }
        var l = e.getComputedStyle,
            u = l ? function(e) {
                return l(e, null)
            } : function(e) {
                return e.currentStyle
            },
            c = i("transition"),
            d = i("transform"),
            p = c && d,
            f = !!i("perspective"),
            h = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[c],
            m = ["transform", "transition", "transitionDuration",
                "transitionProperty"
            ],
            g = function() {
                for (var e = {}, t = 0, n = m.length; n > t; t++) {
                    var o = m[t],
                        r = i(o);
                    r && r !== o && (e[o] = r)
                }
                return e
            }();
        o.extend(s.prototype, t.prototype), s.prototype._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, s.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, s.prototype.getSize = function() {
                this.size = n(this.element)
            }, s.prototype.css = function(e) {
                var t = this.element.style;
                for (var n in e) {
                    var i = g[n] || n;
                    t[i] = e[n]
                }
            }, s.prototype.getPosition = function() {
                var e = u(this.element),
                    t = this.layout.options,
                    n = t.isOriginLeft,
                    i = t.isOriginTop,
                    o = e[n ? "left" : "right"],
                    r = e[i ? "top" : "bottom"],
                    s = this.layout.size,
                    a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.width :
                    parseInt(o, 10),
                    l = -1 != r.indexOf("%") ? parseFloat(r) / 100 * s.height :
                    parseInt(r, 10);
                a = isNaN(a) ? 0 : a, l = isNaN(l) ? 0 : l, a -= n ? s.paddingLeft :
                    s.paddingRight, l -= i ? s.paddingTop : s.paddingBottom,
                    this.position.x = a, this.position.y = l
            }, s.prototype.layoutPosition = function() {
                var e = this.layout.size,
                    t = this.layout.options,
                    n = {},
                    i = t.isOriginLeft ? "paddingLeft" : "paddingRight",
                    o = t.isOriginLeft ? "left" : "right",
                    r = t.isOriginLeft ? "right" : "left",
                    s = this.position.x + e[i];
                n[o] = this.getXValue(s), n[r] = "";
                var a = t.isOriginTop ? "paddingTop" : "paddingBottom",
                    l = t.isOriginTop ? "top" : "bottom",
                    u = t.isOriginTop ? "bottom" : "top",
                    c = this.position.y + e[a];
                n[l] = this.getYValue(c), n[u] = "", this.css(n), this.emitEvent(
                    "layout", [this])
            }, s.prototype.getXValue = function(e) {
                var t = this.layout.options;
                return t.percentPosition && !t.isHorizontal ? e / this.layout
                    .size.width * 100 + "%" : e + "px"
            }, s.prototype.getYValue = function(e) {
                var t = this.layout.options;
                return t.percentPosition && t.isHorizontal ? e / this.layout
                    .size.height * 100 + "%" : e + "px"
            }, s.prototype._transitionTo = function(e, t) {
                this.getPosition();
                var n = this.position.x,
                    i = this.position.y,
                    o = parseInt(e, 10),
                    r = parseInt(t, 10),
                    s = o === this.position.x && r === this.position.y;
                if (this.setPosition(e, t), s && !this.isTransitioning)
                    return void this.layoutPosition();
                var a = e - n,
                    l = t - i,
                    u = {};
                u.transform = this.getTranslate(a, l), this.transition({
                    to: u,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            }, s.prototype.getTranslate = function(e, t) {
                var n = this.layout.options;
                return e = n.isOriginLeft ? e : -e, t = n.isOriginTop ? t :
                    -t, f ? "translate3d(" + e + "px, " + t + "px, 0)" :
                    "translate(" + e + "px, " + t + "px)"
            }, s.prototype.goTo = function(e, t) {
                this.setPosition(e, t), this.layoutPosition()
            }, s.prototype.moveTo = p ? s.prototype._transitionTo : s.prototype
            .goTo, s.prototype.setPosition = function(e, t) {
                this.position.x = parseInt(e, 10), this.position.y =
                    parseInt(t, 10)
            }, s.prototype._nonTransition = function(e) {
                this.css(e.to), e.isCleaning && this._removeStyles(e.to);
                for (var t in e.onTransitionEnd) e.onTransitionEnd[t].call(
                    this)
            }, s.prototype._transition = function(e) {
                if (!parseFloat(this.layout.options.transitionDuration))
                    return void this._nonTransition(e);
                var t = this._transn;
                for (var n in e.onTransitionEnd) t.onEnd[n] = e.onTransitionEnd[
                    n];
                for (n in e.to) t.ingProperties[n] = !0, e.isCleaning && (t
                    .clean[n] = !0);
                if (e.from) {
                    this.css(e.from);
                    var i = this.element.offsetHeight;
                    i = null
                }
                this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !
                    0
            };
        var y = "opacity," + a(g.transform || "transform");
        s.prototype.enableTransition = function() {
                this.isTransitioning || (this.css({
                    transitionProperty: y,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(h, this, !1))
            }, s.prototype.transition = s.prototype[c ? "_transition" :
                "_nonTransition"], s.prototype.onwebkitTransitionEnd =
            function(e) {
                this.ontransitionend(e)
            }, s.prototype.onotransitionend = function(e) {
                this.ontransitionend(e)
            };
        var v = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        s.prototype.ontransitionend = function(e) {
            if (e.target === this.element) {
                var t = this._transn,
                    n = v[e.propertyName] || e.propertyName;
                if (delete t.ingProperties[n], r(t.ingProperties) &&
                    this.disableTransition(), n in t.clean && (this.element
                        .style[e.propertyName] = "", delete t.clean[n]),
                    n in t.onEnd) {
                    var i = t.onEnd[n];
                    i.call(this), delete t.onEnd[n]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, s.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(
                h, this, !1), this.isTransitioning = !1
        }, s.prototype._removeStyles = function(e) {
            var t = {};
            for (var n in e) t[n] = "";
            this.css(t)
        };
        var b = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return s.prototype.removeTransitionStyles = function() {
            this.css(b)
        }, s.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element),
                this.css({
                    display: ""
                }), this.emitEvent("remove", [this])
        }, s.prototype.remove = function() {
            if (!c || !parseFloat(this.layout.options.transitionDuration))
                return void this.removeElem();
            var e = this;
            this.once("transitionEnd", function() {
                e.removeElem()
            }), this.hide()
        }, s.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {},
                n = this.getHideRevealTransitionEndProperty(
                    "visibleStyle");
            t[n] = this.onRevealTransitionEnd, this.transition({
                from: e.hiddenStyle,
                to: e.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, s.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, s.prototype.getHideRevealTransitionEndProperty = function(e) {
            var t = this.layout.options[e];
            if (t.opacity) return "opacity";
            for (var n in t) return n
        }, s.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {},
                n = this.getHideRevealTransitionEndProperty(
                    "hiddenStyle");
            t[n] = this.onHideTransitionEnd, this.transition({
                from: e.visibleStyle,
                to: e.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, s.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, s.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, s
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", [
                "eventie/eventie", "eventEmitter/EventEmitter",
                "get-size/get-size", "fizzy-ui-utils/utils", "./item"
            ], function(n, i, o, r, s) {
                return t(e, n, i, o, r, s)
            }) : "object" == typeof exports ? module.exports = t(e, require(
                "eventie"), require("wolfy87-eventemitter"), require(
                "get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer =
            t(e, e.eventie, e.EventEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer
                .Item)
    }(window, function(e, t, n, i, o, r) {
        "use strict";

        function s(e, t) {
            var n = o.getQueryElement(e);
            if (!n) return void(a && a.error("Bad element for " + this.constructor
                .namespace + ": " + (n || e)));
            this.element = n, l && (this.$element = l(this.element)),
                this.options = o.extend({}, this.constructor.defaults),
                this.option(t);
            var i = ++c;
            this.element.outlayerGUID = i, d[i] = this, this._create(),
                this.options.isInitLayout && this.layout()
        }
        var a = e.console,
            l = e.jQuery,
            u = function() {},
            c = 0,
            d = {};
        return s.namespace = "outlayer", s.Item = r, s.defaults = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                isResizingContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, o.extend(s.prototype, n.prototype), s.prototype.option =
            function(e) {
                o.extend(this.options, e)
            }, s.prototype._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options
                        .stamp), o.extend(this.element.style, this.options.containerStyle),
                    this.options.isResizeBound && this.bindResize()
            }, s.prototype.reloadItems = function() {
                this.items = this._itemize(this.element.children)
            }, s.prototype._itemize = function(e) {
                for (var t = this._filterFindItemElements(e), n = this.constructor
                    .Item, i = [], o = 0, r = t.length; r > o; o++) {
                    var s = t[o],
                        a = new n(s, this);
                    i.push(a)
                }
                return i
            }, s.prototype._filterFindItemElements = function(e) {
                return o.filterFindElements(e, this.options.itemSelector)
            }, s.prototype.getItemElements = function() {
                for (var e = [], t = 0, n = this.items.length; n > t; t++) e
                    .push(this.items[t].element);
                return e
            }, s.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var e = void 0 !== this.options.isLayoutInstant ? this.options
                    .isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, e), this._isLayoutInited = !0
            }, s.prototype._init = s.prototype.layout, s.prototype._resetLayout =
            function() {
                this.getSize()
            }, s.prototype.getSize = function() {
                this.size = i(this.element)
            }, s.prototype._getMeasurement = function(e, t) {
                var n, r = this.options[e];
                r ? ("string" == typeof r ? n = this.element.querySelector(
                    r) : o.isElement(r) && (n = r), this[e] = n ? i(
                    n)[t] : r) : this[e] = 0
            }, s.prototype.layoutItems = function(e, t) {
                e = this._getItemsForLayout(e), this._layoutItems(e, t),
                    this._postLayout()
            }, s.prototype._getItemsForLayout = function(e) {
                for (var t = [], n = 0, i = e.length; i > n; n++) {
                    var o = e[n];
                    o.isIgnored || t.push(o)
                }
                return t
            }, s.prototype._layoutItems = function(e, t) {
                if (this._emitCompleteOnItems("layout", e), e && e.length) {
                    for (var n = [], i = 0, o = e.length; o > i; i++) {
                        var r = e[i],
                            s = this._getItemLayoutPosition(r);
                        s.item = r, s.isInstant = t || r.isLayoutInstant, n
                            .push(s)
                    }
                    this._processLayoutQueue(n)
                }
            }, s.prototype._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }, s.prototype._processLayoutQueue = function(e) {
                for (var t = 0, n = e.length; n > t; t++) {
                    var i = e[t];
                    this._positionItem(i.item, i.x, i.y, i.isInstant)
                }
            }, s.prototype._positionItem = function(e, t, n, i) {
                i ? e.goTo(t, n) : e.moveTo(t, n)
            }, s.prototype._postLayout = function() {
                this.resizeContainer()
            }, s.prototype.resizeContainer = function() {
                if (this.options.isResizingContainer) {
                    var e = this._getContainerSize();
                    e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(
                        e.height, !1))
                }
            }, s.prototype._getContainerSize = u, s.prototype._setContainerMeasure =
            function(e, t) {
                if (void 0 !== e) {
                    var n = this.size;
                    n.isBorderBox && (e += t ? n.paddingLeft + n.paddingRight +
                        n.borderLeftWidth + n.borderRightWidth : n.paddingBottom +
                        n.paddingTop + n.borderTopWidth + n.borderBottomWidth
                    ), e = Math.max(e, 0), this.element.style[t ?
                        "width" : "height"] = e + "px"
                }
            }, s.prototype._emitCompleteOnItems = function(e, t) {
                function n() {
                    o.dispatchEvent(e + "Complete", null, [t])
                }

                function i() {
                    s++, s === r && n()
                }
                var o = this,
                    r = t.length;
                if (!t || !r) return void n();
                for (var s = 0, a = 0, l = t.length; l > a; a++) {
                    var u = t[a];
                    u.once(e, i)
                }
            }, s.prototype.dispatchEvent = function(e, t, n) {
                var i = t ? [t].concat(n) : n;
                if (this.emitEvent(e, i), l)
                    if (this.$element = this.$element || l(this.element), t) {
                        var o = l.Event(t);
                        o.type = e, this.$element.trigger(o, n)
                    } else this.$element.trigger(e, n)
            }, s.prototype.ignore = function(e) {
                var t = this.getItem(e);
                t && (t.isIgnored = !0)
            }, s.prototype.unignore = function(e) {
                var t = this.getItem(e);
                t && delete t.isIgnored
            }, s.prototype.stamp = function(e) {
                if (e = this._find(e)) {
                    this.stamps = this.stamps.concat(e);
                    for (var t = 0, n = e.length; n > t; t++) {
                        var i = e[t];
                        this.ignore(i)
                    }
                }
            }, s.prototype.unstamp = function(e) {
                if (e = this._find(e))
                    for (var t = 0, n = e.length; n > t; t++) {
                        var i = e[t];
                        o.removeFrom(this.stamps, i), this.unignore(i)
                    }
            }, s.prototype._find = function(e) {
                return e ? ("string" == typeof e && (e = this.element.querySelectorAll(
                    e)), e = o.makeArray(e)) : void 0
            }, s.prototype._manageStamps = function() {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var e = 0, t = this.stamps.length; t > e; e++) {
                        var n = this.stamps[e];
                        this._manageStamp(n)
                    }
                }
            }, s.prototype._getBoundingRect = function() {
                var e = this.element.getBoundingClientRect(),
                    t = this.size;
                this._boundingRect = {
                    left: e.left + t.paddingLeft + t.borderLeftWidth,
                    top: e.top + t.paddingTop + t.borderTopWidth,
                    right: e.right - (t.paddingRight + t.borderRightWidth),
                    bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
                }
            }, s.prototype._manageStamp = u, s.prototype._getElementOffset =
            function(e) {
                var t = e.getBoundingClientRect(),
                    n = this._boundingRect,
                    o = i(e),
                    r = {
                        left: t.left - n.left - o.marginLeft,
                        top: t.top - n.top - o.marginTop,
                        right: n.right - t.right - o.marginRight,
                        bottom: n.bottom - t.bottom - o.marginBottom
                    };
                return r
            }, s.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, s.prototype.bindResize = function() {
                this.isResizeBound || (t.bind(e, "resize", this), this.isResizeBound = !
                    0)
            }, s.prototype.unbindResize = function() {
                this.isResizeBound && t.unbind(e, "resize", this), this.isResizeBound = !
                    1
            }, s.prototype.onresize = function() {
                function e() {
                    t.resize(), delete t.resizeTimeout
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var t = this;
                this.resizeTimeout = setTimeout(e, 100)
            }, s.prototype.resize = function() {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, s.prototype.needsResizeLayout = function() {
                var e = i(this.element),
                    t = this.size && e;
                return t && e.innerWidth !== this.size.innerWidth
            }, s.prototype.addItems = function(e) {
                var t = this._itemize(e);
                return t.length && (this.items = this.items.concat(t)), t
            }, s.prototype.appended = function(e) {
                var t = this.addItems(e);
                t.length && (this.layoutItems(t, !0), this.reveal(t))
            }, s.prototype.prepended = function(e) {
                var t = this._itemize(e);
                if (t.length) {
                    var n = this.items.slice(0);
                    this.items = t.concat(n), this._resetLayout(), this._manageStamps(),
                        this.layoutItems(t, !0), this.reveal(t), this.layoutItems(
                            n)
                }
            }, s.prototype.reveal = function(e) {
                this._emitCompleteOnItems("reveal", e);
                for (var t = e && e.length, n = 0; t && t > n; n++) {
                    var i = e[n];
                    i.reveal()
                }
            }, s.prototype.hide = function(e) {
                this._emitCompleteOnItems("hide", e);
                for (var t = e && e.length, n = 0; t && t > n; n++) {
                    var i = e[n];
                    i.hide()
                }
            }, s.prototype.revealItemElements = function(e) {
                var t = this.getItems(e);
                this.reveal(t)
            }, s.prototype.hideItemElements = function(e) {
                var t = this.getItems(e);
                this.hide(t)
            }, s.prototype.getItem = function(e) {
                for (var t = 0, n = this.items.length; n > t; t++) {
                    var i = this.items[t];
                    if (i.element === e) return i
                }
            }, s.prototype.getItems = function(e) {
                e = o.makeArray(e);
                for (var t = [], n = 0, i = e.length; i > n; n++) {
                    var r = e[n],
                        s = this.getItem(r);
                    s && t.push(s)
                }
                return t
            }, s.prototype.remove = function(e) {
                var t = this.getItems(e);
                if (this._emitCompleteOnItems("remove", t), t && t.length)
                    for (var n = 0, i = t.length; i > n; n++) {
                        var r = t[n];
                        r.remove(), o.removeFrom(this.items, r)
                    }
            }, s.prototype.destroy = function() {
                var e = this.element.style;
                e.height = "", e.position = "", e.width = "";
                for (var t = 0, n = this.items.length; n > t; t++) {
                    var i = this.items[t];
                    i.destroy()
                }
                this.unbindResize();
                var o = this.element.outlayerGUID;
                delete d[o], delete this.element.outlayerGUID, l && l.removeData(
                    this.element, this.constructor.namespace)
            }, s.data = function(e) {
                e = o.getQueryElement(e);
                var t = e && e.outlayerGUID;
                return t && d[t]
            }, s.create = function(e, t) {
                function n() {
                    s.apply(this, arguments)
                }
                return Object.create ? n.prototype = Object.create(s.prototype) :
                    o.extend(n.prototype, s.prototype), n.prototype.constructor =
                    n, n.defaults = o.extend({}, s.defaults), o.extend(n.defaults,
                        t), n.prototype.settings = {}, n.namespace = e, n.data =
                    s.data, n.Item = function() {
                        r.apply(this, arguments)
                    }, n.Item.prototype = new r, o.htmlInit(n, e), l && l.bridget &&
                    l.bridget(e, n), n
            }, s.Item = r, s
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/item", [
            "outlayer/outlayer"
        ], t) : "object" == typeof exports ? module.exports = t(require(
            "outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(
            e.Outlayer))
    }(window, function(e) {
        "use strict";

        function t() {
            e.Item.apply(this, arguments)
        }
        t.prototype = new e.Item, t.prototype._create = function() {
            this.id = this.layout.itemGUID++, e.Item.prototype._create.call(
                this), this.sortData = {}
        }, t.prototype.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData[
                        "original-order"] = this.id, this.sortData.random =
                    Math.random();
                var e = this.layout.options.getSortData,
                    t = this.layout._sorters;
                for (var n in e) {
                    var i = t[n];
                    this.sortData[n] = i(this.element, this)
                }
            }
        };
        var n = t.prototype.destroy;
        return t.prototype.destroy = function() {
            n.apply(this, arguments), this.css({
                display: ""
            })
        }, t
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(
            "isotope/js/layout-mode", ["get-size/get-size",
                "outlayer/outlayer"
            ], t) : "object" == typeof exports ? module.exports = t(require(
            "get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {},
            e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
    }(window, function(e, t) {
        "use strict";

        function n(e) {
            this.isotope = e, e && (this.options = e.options[this.namespace],
                this.element = e.element, this.items = e.filteredItems,
                this.size = e.size)
        }
        return function() {
            function e(e) {
                return function() {
                    return t.prototype[e].apply(this.isotope,
                        arguments)
                }
            }
            for (var i = ["_resetLayout", "_getItemLayoutPosition",
                "_manageStamp", "_getContainerSize",
                "_getElementOffset", "needsResizeLayout"
            ], o = 0, r = i.length; r > o; o++) {
                var s = i[o];
                n.prototype[s] = e(s)
            }
        }(), n.prototype.needsVerticalResizeLayout = function() {
            var t = e(this.isotope.element),
                n = this.isotope.size && t;
            return n && t.innerHeight != this.isotope.size.innerHeight
        }, n.prototype._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, n.prototype.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, n.prototype.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, n.prototype.getSegmentSize = function(e, t) {
            var n = e + t,
                i = "outer" + t;
            if (this._getMeasurement(n, i), !this[n]) {
                var o = this.getFirstItemSize();
                this[n] = o && o[i] || this.isotope.size["inner" + t]
            }
        }, n.prototype.getFirstItemSize = function() {
            var t = this.isotope.filteredItems[0];
            return t && t.element && e(t.element)
        }, n.prototype.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, n.prototype.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, n.modes = {}, n.create = function(e, t) {
            function i() {
                n.apply(this, arguments)
            }
            return i.prototype = new n, t && (i.options = t), i.prototype
                .namespace = e, n.modes[e] = i, i
        }, n
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("masonry/masonry", [
                "outlayer/outlayer", "get-size/get-size",
                "fizzy-ui-utils/utils"
            ], t) : "object" == typeof exports ? module.exports = t(require(
                "outlayer"), require("get-size"), require("fizzy-ui-utils")) :
            e.Masonry = t(e.Outlayer, e.getSize, e.fizzyUIUtils)
    }(window, function(e, t, n) {
        var i = e.create("masonry");
        return i.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth",
                "outerWidth"), this._getMeasurement("gutter",
                "outerWidth"), this.measureColumns();
            var e = this.cols;
            for (this.colYs = []; e--;) this.colYs.push(0);
            this.maxY = 0
        }, i.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var e = this.items[0],
                    n = e && e.element;
                this.columnWidth = n && t(n).outerWidth || this.containerWidth
            }
            var i = this.columnWidth += this.gutter,
                o = this.containerWidth + this.gutter,
                r = o / i,
                s = i - o % i,
                a = s && 1 > s ? "round" : "floor";
            r = Math[a](r), this.cols = Math.max(r, 1)
        }, i.prototype.getContainerWidth = function() {
            var e = this.options.isFitWidth ? this.element.parentNode :
                this.element,
                n = t(e);
            this.containerWidth = n && n.innerWidth
        }, i.prototype._getItemLayoutPosition = function(e) {
            e.getSize();
            var t = e.size.outerWidth % this.columnWidth,
                i = t && 1 > t ? "round" : "ceil",
                o = Math[i](e.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (var r = this._getColGroup(o), s = Math.min.apply(Math,
                    r), a = n.indexOf(r, s), l = {
                    x: this.columnWidth * a,
                    y: s
                }, u = s + e.size.outerHeight, c = this.cols + 1 -
                r.length, d = 0; c > d; d++) this.colYs[a + d] = u;
            return l
        }, i.prototype._getColGroup = function(e) {
            if (2 > e) return this.colYs;
            for (var t = [], n = this.cols + 1 - e, i = 0; n > i; i++) {
                var o = this.colYs.slice(i, i + e);
                t[i] = Math.max.apply(Math, o)
            }
            return t
        }, i.prototype._manageStamp = function(e) {
            var n = t(e),
                i = this._getElementOffset(e),
                o = this.options.isOriginLeft ? i.left : i.right,
                r = o + n.outerWidth,
                s = Math.floor(o / this.columnWidth);
            s = Math.max(0, s);
            var a = Math.floor(r / this.columnWidth);
            a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols -
                1, a);
            for (var l = (this.options.isOriginTop ? i.top : i.bottom) +
                n.outerHeight, u = s; a >= u; u++) this.colYs[u] = Math
                .max(l, this.colYs[u])
        }, i.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = {
                height: this.maxY
            };
            return this.options.isFitWidth && (e.width = this._getContainerFitWidth()),
                e
        }, i.prototype._getContainerFitWidth = function() {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];)
                e++;
            return (this.cols - e) * this.columnWidth - this.gutter
        }, i.prototype.needsResizeLayout = function() {
            var e = this.containerWidth;
            return this.getContainerWidth(), e !== this.containerWidth
        }, i
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(
            "isotope/js/layout-modes/masonry", ["../layout-mode",
                "masonry/masonry"
            ], t) : "object" == typeof exports ? module.exports = t(require(
            "../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode,
            e.Masonry)
    }(window, function(e, t) {
        "use strict";

        function n(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }
        var i = e.create("masonry"),
            o = i.prototype._getElementOffset,
            r = i.prototype.layout,
            s = i.prototype._getMeasurement;
        n(i.prototype, t.prototype), i.prototype._getElementOffset = o, i.prototype
            .layout = r, i.prototype._getMeasurement = s;
        var a = i.prototype.measureColumns;
        i.prototype.measureColumns = function() {
            this.items = this.isotope.filteredItems, a.call(this)
        };
        var l = i.prototype._manageStamp;
        return i.prototype._manageStamp = function() {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft,
                this.options.isOriginTop = this.isotope.options.isOriginTop,
                l.apply(this, arguments)
        }, i
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(
                "isotope/js/layout-modes/fit-rows", ["../layout-mode"], t) :
            "object" == typeof exports ? module.exports = t(require(
                "../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function(e) {
        "use strict";
        var t = e.create("fitRows");
        return t.prototype._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement(
                "gutter", "outerWidth")
        }, t.prototype._getItemLayoutPosition = function(e) {
            e.getSize();
            var t = e.size.outerWidth + this.gutter,
                n = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && t + this.x > n && (this.x = 0, this.y =
                this.maxY);
            var i = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight),
                this.x += t, i
        }, t.prototype._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, t
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(
                "isotope/js/layout-modes/vertical", ["../layout-mode"], t) :
            "object" == typeof exports ? module.exports = t(require(
                "../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function(e) {
        "use strict";
        var t = e.create("vertical", {
            horizontalAlignment: 0
        });
        return t.prototype._resetLayout = function() {
            this.y = 0
        }, t.prototype._getItemLayoutPosition = function(e) {
            e.getSize();
            var t = (this.isotope.size.innerWidth - e.size.outerWidth) *
                this.options.horizontalAlignment,
                n = this.y;
            return this.y += e.size.outerHeight, {
                x: t,
                y: n
            }
        }, t.prototype._getContainerSize = function() {
            return {
                height: this.y
            }
        }, t
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["outlayer/outlayer",
            "get-size/get-size", "matches-selector/matches-selector",
            "fizzy-ui-utils/utils", "isotope/js/item",
            "isotope/js/layout-mode", "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical"
        ], function(n, i, o, r, s, a) {
            return t(e, n, i, o, r, s, a)
        }) : "object" == typeof exports ? module.exports = t(e, require(
                "outlayer"), require("get-size"), require(
                "desandro-matches-selector"), require("fizzy-ui-utils"),
            require("./item"), require("./layout-mode"), require(
                "./layout-modes/masonry"), require(
                "./layout-modes/fit-rows"), require(
                "./layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer,
            e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e
            .Isotope.LayoutMode)
    }(window, function(e, t, n, i, o, r, s) {
        function a(e, t) {
            return function(n, i) {
                for (var o = 0, r = e.length; r > o; o++) {
                    var s = e[o],
                        a = n.sortData[s],
                        l = i.sortData[s];
                    if (a > l || l > a) {
                        var u = void 0 !== t[s] ? t[s] : t,
                            c = u ? 1 : -1;
                        return (a > l ? 1 : -1) * c
                    }
                }
                return 0
            }
        }
        var l = e.jQuery,
            u = String.prototype.trim ? function(e) {
                return e.trim()
            } : function(e) {
                return e.replace(/^\s+|\s+$/g, "")
            },
            c = document.documentElement,
            d = c.textContent ? function(e) {
                return e.textContent
            } : function(e) {
                return e.innerText
            },
            p = t.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        p.Item = r, p.LayoutMode = s, p.prototype._create = function() {
                this.itemGUID = 0, this._sorters = {}, this._getSorters(),
                    t.prototype._create.call(this), this.modes = {}, this.filteredItems =
                    this.items, this.sortHistory = ["original-order"];
                for (var e in s.modes) this._initLayoutMode(e)
            }, p.prototype.reloadItems = function() {
                this.itemGUID = 0, t.prototype.reloadItems.call(this)
            }, p.prototype._itemize = function() {
                for (var e = t.prototype._itemize.apply(this, arguments), n =
                    0, i = e.length; i > n; n++) {
                    var o = e[n];
                    o.id = this.itemGUID++
                }
                return this._updateItemsSortData(e), e
            }, p.prototype._initLayoutMode = function(e) {
                var t = s.modes[e],
                    n = this.options[e] || {};
                this.options[e] = t.options ? o.extend(t.options, n) : n,
                    this.modes[e] = new t(this)
            }, p.prototype.layout = function() {
                return !this._isLayoutInited && this.options.isInitLayout ?
                    void this.arrange() : void this._layout()
            }, p.prototype._layout = function() {
                var e = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(
                    this.filteredItems, e), this._isLayoutInited = !0
            }, p.prototype.arrange = function(e) {
                function t() {
                    i.reveal(n.needReveal), i.hide(n.needHide)
                }
                this.option(e), this._getIsInstant();
                var n = this._filter(this.items);
                this.filteredItems = n.matches;
                var i = this;
                this._bindArrangeComplete(), this._isInstant ? this._noTransition(
                    t) : t(), this._sort(), this._layout()
            }, p.prototype._init = p.prototype.arrange, p.prototype._getIsInstant =
            function() {
                var e = void 0 !== this.options.isLayoutInstant ? this.options
                    .isLayoutInstant : !this._isLayoutInited;
                return this._isInstant = e, e
            }, p.prototype._bindArrangeComplete = function() {
                function e() {
                    t && n && i && o.dispatchEvent("arrangeComplete",
                        null, [o.filteredItems])
                }
                var t, n, i, o = this;
                this.once("layoutComplete", function() {
                    t = !0, e()
                }), this.once("hideComplete", function() {
                    n = !0, e()
                }), this.once("revealComplete", function() {
                    i = !0, e()
                })
            }, p.prototype._filter = function(e) {
                var t = this.options.filter;
                t = t || "*";
                for (var n = [], i = [], o = [], r = this._getFilterTest(t),
                    s = 0, a = e.length; a > s; s++) {
                    var l = e[s];
                    if (!l.isIgnored) {
                        var u = r(l);
                        u && n.push(l), u && l.isHidden ? i.push(l) : u ||
                            l.isHidden || o.push(l)
                    }
                }
                return {
                    matches: n,
                    needReveal: i,
                    needHide: o
                }
            }, p.prototype._getFilterTest = function(e) {
                return l && this.options.isJQueryFiltering ? function(t) {
                    return l(t.element).is(e)
                } : "function" == typeof e ? function(t) {
                    return e(t.element)
                } : function(t) {
                    return i(t.element, e)
                }
            }, p.prototype.updateSortData = function(e) {
                var t;
                e ? (e = o.makeArray(e), t = this.getItems(e)) : t = this.items,
                    this._getSorters(), this._updateItemsSortData(t)
            }, p.prototype._getSorters = function() {
                var e = this.options.getSortData;
                for (var t in e) {
                    var n = e[t];
                    this._sorters[t] = f(n)
                }
            }, p.prototype._updateItemsSortData = function(e) {
                for (var t = e && e.length, n = 0; t && t > n; n++) {
                    var i = e[n];
                    i.updateSortData()
                }
            };
        var f = function() {
            function e(e) {
                if ("string" != typeof e) return e;
                var n = u(e).split(" "),
                    i = n[0],
                    o = i.match(/^\[(.+)\]$/),
                    r = o && o[1],
                    s = t(r, i),
                    a = p.sortDataParsers[n[1]];
                return e = a ? function(e) {
                    return e && a(s(e))
                } : function(e) {
                    return e && s(e)
                }
            }

            function t(e, t) {
                var n;
                return n = e ? function(t) {
                    return t.getAttribute(e)
                } : function(e) {
                    var n = e.querySelector(t);
                    return n && d(n)
                }
            }
            return e
        }();
        p.sortDataParsers = {
            parseInt: function(e) {
                return parseInt(e, 10)
            },
            parseFloat: function(e) {
                return parseFloat(e)
            }
        }, p.prototype._sort = function() {
            var e = this.options.sortBy;
            if (e) {
                var t = [].concat.apply(e, this.sortHistory),
                    n = a(t, this.options.sortAscending);
                this.filteredItems.sort(n), e != this.sortHistory[0] &&
                    this.sortHistory.unshift(e)
            }
        }, p.prototype._mode = function() {
            var e = this.options.layoutMode,
                t = this.modes[e];
            if (!t) throw new Error("No layout mode: " + e);
            return t.options = this.options[e], t
        }, p.prototype._resetLayout = function() {
            t.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, p.prototype._getItemLayoutPosition = function(e) {
            return this._mode()._getItemLayoutPosition(e)
        }, p.prototype._manageStamp = function(e) {
            this._mode()._manageStamp(e)
        }, p.prototype._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, p.prototype.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, p.prototype.appended = function(e) {
            var t = this.addItems(e);
            if (t.length) {
                var n = this._filterRevealAdded(t);
                this.filteredItems = this.filteredItems.concat(n)
            }
        }, p.prototype.prepended = function(e) {
            var t = this._itemize(e);
            if (t.length) {
                this._resetLayout(), this._manageStamps();
                var n = this._filterRevealAdded(t);
                this.layoutItems(this.filteredItems), this.filteredItems =
                    n.concat(this.filteredItems), this.items = t.concat(
                        this.items)
            }
        }, p.prototype._filterRevealAdded = function(e) {
            var t = this._filter(e);
            return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(
                t.matches, !0), t.matches
        }, p.prototype.insert = function(e) {
            var t = this.addItems(e);
            if (t.length) {
                var n, i, o = t.length;
                for (n = 0; o > n; n++) i = t[n], this.element.appendChild(
                    i.element);
                var r = this._filter(t).matches;
                for (n = 0; o > n; n++) t[n].isLayoutInstant = !0;
                for (this.arrange(), n = 0; o > n; n++) delete t[n].isLayoutInstant;
                this.reveal(r)
            }
        };
        var h = p.prototype.remove;
        return p.prototype.remove = function(e) {
            e = o.makeArray(e);
            var t = this.getItems(e);
            h.call(this, e);
            var n = t && t.length;
            if (n)
                for (var i = 0; n > i; i++) {
                    var r = t[i];
                    o.removeFrom(this.filteredItems, r)
                }
        }, p.prototype.shuffle = function() {
            for (var e = 0, t = this.items.length; t > e; e++) {
                var n = this.items[e];
                n.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, p.prototype._noTransition = function(e) {
            var t = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var n = e.call(this);
            return this.options.transitionDuration = t, n
        }, p.prototype.getFilteredItemElements = function() {
            for (var e = [], t = 0, n = this.filteredItems.length; n >
                t; t++) e.push(this.filteredItems[t].element);
            return e
        }, p
    }), jQuery.extend(jQuery.easing, {
        def: "easeInOutQuart",
        easeInOutQuart: function(e, t, n, i, o) {
            return (t /= o / 2) < 1 ? i / 2 * t * t * t * t + n : -i /
                2 * ((t -= 2) * t * t * t - 2) + n
        }
    });
var HomeSlider = function() {
        var e;
        return {
            settings: {},
            init: function() {
                e = this.settings, $(".home-slides").each(function() {
                    HomeSlider.runSlider(this)
                })
            },
            runSlider: function(e) {
                var t = $(e).find(".slider");
                t.slick({
                    dots: !0,
                    infinite: !0,
                    speed: 500,
                    cssEase: "linear",
                    autoplay: !0,
                    autoplaySpeed: 5e3,
                    fade: !0,
                    adaptiveHeight: !0
                })
            }
        }
    }(),
    Partners = function() {
        var e;
        return {
            settings: {},
            init: function() {
                this.settings.grid = $(".about-partners-list"), e = this.settings,
                    this.loadGrid()
            },
            loadGrid: function() {
                e.grid.imagesLoaded(function() {
                    e.grid.isotope({
                        transitionDuration: 0,
                        itemSelector: ".about-partners-list-entry",
                        percentPosition: !0,
                        layoutMode: "masonry",
                        stamp: ".stamp",
                        masonry: {
                            columnWidth: ".about-partners-list-entry"
                        }
                    })
                })
            }
        }
    }();
jQuery(document).ready(function(e) {
    HomeSlider.init(), Partners.init(), e("body").on("click",
        'a[href*="#"]:not([href="#"])', function() {
            if (location.pathname.replace(/^\//, "") == this.pathname
                .replace(/^\//, "") && location.hostname == this.hostname
            ) {
                var t = e(this.hash);
                if (t = t.length ? t : e("[name=" + this.hash.slice(
                    1) + "]"), t.length) return e("html, body").animate({
                    scrollTop: t.offset().top - 140
                }, 500, "easeInOutQuart"), !1
            }
        }), e(".instagram-entries").slick({
        dots: !1,
        infinite: !0,
        slidesToShow: 1,
        centerMode: !0,
        variableWidth: !0,
        arrows: !1
    }), e(".main").fitVids(), e(".navigation-toggle").on("click",
        function() {
            e("body").toggleClass("navigation-active")
        }), e("a.js-modal, .js-modal > a").magnificPopup({
        type: "inline",
        closeBtnInside: !0
    }), e(".about-commandments-slider").slick({
        dots: !1,
        infinite: !0,
        speed: 500,
        cssEase: "linear",
        fade: !0,
        adaptiveHeight: !0
    }), e(".menu-make-your-own-step").on("mouseover", function() {
        e(".menu-make-your-own-step").parent().removeClass(
            "active"), e(this).parent().addClass("active")
    }), e(".js-background").imagesLoaded({
        background: !0
    }).progress(function(t, n) {
        e(n.element).addClass("loaded")
    })
});
