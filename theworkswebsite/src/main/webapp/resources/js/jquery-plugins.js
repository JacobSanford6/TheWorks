/*
 jQuery UI - v1.13.2 - 2022-07-19
 http://jqueryui.com
 Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-patch.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/mouse.js, widgets/slider.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
 Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(e) {
    "function" === typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}
)(function(e) {
    function w(a) {
        return null == a ? a + "" : "object" === typeof a ? X[S.call(a)] || "object" : typeof a
    }
    function B(a, b, c) {
        var d = v[b.type] || {};
        if (null == a)
            return c || !b.def ? null : b.def;
        a = d.floor ? ~~a : parseFloat(a);
        return isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : Math.min(d.max, Math.max(0, a))
    }
    function I(a) {
        var b = H()
          , c = b._rgba = [];
        a = a.toLowerCase();
        P(R, function(d, f) {
            d = (d = f.re.exec(a)) && f.parse(d);
            f = f.space || "rgba";
            if (d)
                return d = b[f](d),
                b[u[f].cache] = d[u[f].cache],
                c = b._rgba = d._rgba,
                !1
        });
        return c.length ? ("0,0,0,0" === c.join() && A.extend(c, ba.transparent),
        b) : ba[a]
    }
    function L(a, b, c) {
        c = (c + 1) % 1;
        return 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
    }
    e.ui = e.ui || {};
    e.ui.version = "1.13.2";
    var J = 0
      , D = Array.prototype.hasOwnProperty
      , t = Array.prototype.slice;
    e.cleanData = function(a) {
        return function(b) {
            var c, d, f;
            for (f = 0; null != (d = b[f]); f++)
                (c = e._data(d, "events")) && c.remove && e(d).triggerHandler("remove");
            a(b)
        }
    }(e.cleanData);
    e.widget = function(a, b, c) {
        var d = {}
          , f = a.split(".")[0];
        a = a.split(".")[1];
        var g = f + "-" + a;
        c || (c = b,
        b = e.Widget);
        Array.isArray(c) && (c = e.extend.apply(null, [{}].concat(c)));
        e.expr.pseudos[g.toLowerCase()] = function(n) {
            return !!e.data(n, g)
        }
        ;
        e[f] = e[f] || {};
        var h = e[f][a];
        var l = e[f][a] = function(n, r) {
            if (!this || !this._createWidget)
                return new l(n,r);
            arguments.length && this._createWidget(n, r)
        }
        ;
        e.extend(l, h, {
            version: c.version,
            _proto: e.extend({}, c),
            _childConstructors: []
        });
        var k = new b;
        k.options = e.widget.extend({}, k.options);
        e.each(c, function(n, r) {
            d[n] = "function" !== typeof r ? r : function() {
                function m() {
                    return b.prototype[n].apply(this, arguments)
                }
                function p(q) {
                    return b.prototype[n].apply(this, q)
                }
                return function() {
                    var q = this._super
                      , x = this._superApply;
                    this._super = m;
                    this._superApply = p;
                    var z = r.apply(this, arguments);
                    this._super = q;
                    this._superApply = x;
                    return z
                }
            }()
        });
        l.prototype = e.widget.extend(k, {
            widgetEventPrefix: h ? k.widgetEventPrefix || a : a
        }, d, {
            constructor: l,
            namespace: f,
            widgetName: a,
            widgetFullName: g
        });
        h ? (e.each(h._childConstructors, function(n, r) {
            n = r.prototype;
            e.widget(n.namespace + "." + n.widgetName, l, r._proto)
        }),
        delete h._childConstructors) : b._childConstructors.push(l);
        e.widget.bridge(a, l);
        return l
    }
    ;
    e.widget.extend = function(a) {
        for (var b = t.call(arguments, 1), c = 0, d = b.length, f, g; c < d; c++)
            for (f in b[c])
                g = b[c][f],
                D.call(b[c], f) && void 0 !== g && (e.isPlainObject(g) ? a[f] = e.isPlainObject(a[f]) ? e.widget.extend({}, a[f], g) : e.widget.extend({}, g) : a[f] = g);
        return a
    }
    ;
    e.widget.bridge = function(a, b) {
        var c = b.prototype.widgetFullName || a;
        e.fn[a] = function(d) {
            var f = "string" === typeof d
              , g = t.call(arguments, 1)
              , h = this;
            f ? this.length || "instance" !== d ? this.each(function() {
                var l = e.data(this, c);
                if ("instance" === d)
                    return h = l,
                    !1;
                if (!l)
                    return e.error("cannot call methods on " + a + " prior to initialization; attempted to call method '" + d + "'");
                if ("function" !== typeof l[d] || "_" === d.charAt(0))
                    return e.error("no such method '" + d + "' for " + a + " widget instance");
                var k = l[d].apply(l, g);
                if (k !== l && void 0 !== k)
                    return h = k && k.jquery ? h.pushStack(k.get()) : k,
                    !1
            }) : h = void 0 : (g.length && (d = e.widget.extend.apply(null, [d].concat(g))),
            this.each(function() {
                var l = e.data(this, c);
                l ? (l.option(d || {}),
                l._init && l._init()) : e.data(this, c, new b(d,this))
            }));
            return h
        }
    }
    ;
    e.Widget = function() {}
    ;
    e.Widget._childConstructors = [];
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "\x3cdiv\x3e",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(a, b) {
            b = e(b || this.defaultElement || this)[0];
            this.element = e(b);
            this.uuid = J++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = e();
            this.hoverable = e();
            this.focusable = e();
            this.classesElementLookup = {};
            b !== this && (e.data(b, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(c) {
                    c.target === b && this.destroy()
                }
            }),
            this.document = e(b.style ? b.ownerDocument : b.document || b),
            this.window = e(this.document[0].defaultView || this.document[0].parentWindow));
            this.options = e.widget.extend({}, this.options, this._getCreateOptions(), a);
            this._create();
            this.options.disabled && this._setOptionDisabled(this.options.disabled);
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: function() {
            return {}
        },
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            var a = this;
            this._destroy();
            e.each(this.classesElementLookup, function(b, c) {
                a._removeClass(c, b)
            });
            this.element.off(this.eventNamespace).removeData(this.widgetFullName);
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
            this.bindings.off(this.eventNamespace)
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(a, b) {
            var c = a, d;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" === typeof a) {
                c = {};
                var f = a.split(".");
                a = f.shift();
                if (f.length) {
                    var g = c[a] = e.widget.extend({}, this.options[a]);
                    for (d = 0; d < f.length - 1; d++)
                        g[f[d]] = g[f[d]] || {},
                        g = g[f[d]];
                    a = f.pop();
                    if (1 === arguments.length)
                        return void 0 === g[a] ? null : g[a];
                    g[a] = b
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[a] ? null : this.options[a];
                    c[a] = b
                }
            }
            this._setOptions(c);
            return this
        },
        _setOptions: function(a) {
            for (var b in a)
                this._setOption(b, a[b]);
            return this
        },
        _setOption: function(a, b) {
            "classes" === a && this._setOptionClasses(b);
            this.options[a] = b;
            "disabled" === a && this._setOptionDisabled(b);
            return this
        },
        _setOptionClasses: function(a) {
            var b;
            for (b in a) {
                var c = this.classesElementLookup[b];
                if (a[b] !== this.options.classes[b] && c && c.length) {
                    var d = e(c.get());
                    this._removeClass(c, b);
                    d.addClass(this._classes({
                        element: d,
                        keys: b,
                        classes: a,
                        add: !0
                    }))
                }
            }
        },
        _setOptionDisabled: function(a) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!a);
            a && (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _classes: function(a) {
            function b() {
                var g = [];
                a.element.each(function(h, l) {
                    e.map(f.classesElementLookup, function(k) {
                        return k
                    }).some(function(k) {
                        return k.is(l)
                    }) || g.push(l)
                });
                f._on(e(g), {
                    remove: "_untrackClassesElement"
                })
            }
            function c(g, h) {
                var l;
                for (l = 0; l < g.length; l++) {
                    var k = f.classesElementLookup[g[l]] || e();
                    a.add ? (b(),
                    k = e(e.uniqueSort(k.get().concat(a.element.get())))) : k = e(k.not(a.element).get());
                    f.classesElementLookup[g[l]] = k;
                    d.push(g[l]);
                    h && a.classes[g[l]] && d.push(a.classes[g[l]])
                }
            }
            var d = []
              , f = this;
            a = e.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, a);
            a.keys && c(a.keys.match(/\S+/g) || [], !0);
            a.extra && c(a.extra.match(/\S+/g) || []);
            return d.join(" ")
        },
        _untrackClassesElement: function(a) {
            var b = this;
            e.each(b.classesElementLookup, function(c, d) {
                -1 !== e.inArray(a.target, d) && (b.classesElementLookup[c] = e(d.not(a.target).get()))
            });
            this._off(e(a.target))
        },
        _removeClass: function(a, b, c) {
            return this._toggleClass(a, b, c, !1)
        },
        _addClass: function(a, b, c) {
            return this._toggleClass(a, b, c, !0)
        },
        _toggleClass: function(a, b, c, d) {
            d = "boolean" === typeof d ? d : c;
            var f = "string" === typeof a || null === a;
            a = {
                extra: f ? b : c,
                keys: f ? a : b,
                element: f ? this.element : a,
                add: d
            };
            a.element.toggleClass(this._classes(a), d);
            return this
        },
        _on: function(a, b, c) {
            var d, f = this;
            "boolean" !== typeof a && (c = b,
            b = a,
            a = !1);
            c ? (b = d = e(b),
            this.bindings = this.bindings.add(b)) : (c = b,
            b = this.element,
            d = this.widget());
            e.each(c, function(g, h) {
                function l() {
                    if (a || !0 !== f.options.disabled && !e(this).hasClass("ui-state-disabled"))
                        return ("string" === typeof h ? f[h] : h).apply(f, arguments)
                }
                "string" !== typeof h && (l.guid = h.guid = h.guid || l.guid || e.guid++);
                var k = g.match(/^([\w:-]*)\s*(.*)$/);
                g = k[1] + f.eventNamespace;
                if (k = k[2])
                    d.on(g, k, l);
                else
                    b.on(g, l)
            })
        },
        _off: function(a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            a.off(b);
            this.bindings = e(this.bindings.not(a).get());
            this.focusable = e(this.focusable.not(a).get());
            this.hoverable = e(this.hoverable.not(a).get())
        },
        _delay: function(a, b) {
            var c = this;
            return setTimeout(function() {
                return ("string" === typeof a ? c[a] : a).apply(c, arguments)
            }, b || 0)
        },
        _hoverable: function(a) {
            this.hoverable = this.hoverable.add(a);
            this._on(a, {
                mouseenter: function(b) {
                    this._addClass(e(b.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function(b) {
                    this._removeClass(e(b.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function(a) {
            this.focusable = this.focusable.add(a);
            this._on(a, {
                focusin: function(b) {
                    this._addClass(e(b.currentTarget), null, "ui-state-focus")
                },
                focusout: function(b) {
                    this._removeClass(e(b.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function(a, b, c) {
            var d, f = this.options[a];
            c = c || {};
            b = e.Event(b);
            b.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase();
            b.target = this.element[0];
            if (a = b.originalEvent)
                for (d in a)
                    d in b || (b[d] = a[d]);
            this.element.trigger(b, c);
            return !("function" === typeof f && !1 === f.apply(this.element[0], [b].concat(c)) || b.isDefaultPrevented())
        }
    };
    e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(a, b) {
        e.Widget.prototype["_" + a] = function(c, d, f) {
            "string" === typeof d && (d = {
                effect: d
            });
            var g = d ? !0 === d || "number" === typeof d ? b : d.effect || b : a;
            d = d || {};
            "number" === typeof d ? d = {
                duration: d
            } : !0 === d && (d = {});
            var h = !e.isEmptyObject(d);
            d.complete = f;
            d.delay && c.delay(d.delay);
            if (h && e.effects && e.effects.effect[g])
                c[a](d);
            else if (g !== a && c[g])
                c[g](d.duration, d.easing, f);
            else
                c.queue(function(l) {
                    e(this)[a]();
                    f && f.call(c[0]);
                    l()
                })
        }
    });
    (function() {
        function a(m, p, q) {
            return [parseFloat(m[0]) * (n.test(m[0]) ? p / 100 : 1), parseFloat(m[1]) * (n.test(m[1]) ? q / 100 : 1)]
        }
        function b(m) {
            var p = m[0];
            return 9 === p.nodeType ? {
                width: m.width(),
                height: m.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : null != p && p === p.window ? {
                width: m.width(),
                height: m.height(),
                offset: {
                    top: m.scrollTop(),
                    left: m.scrollLeft()
                }
            } : p.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: p.pageY,
                    left: p.pageX
                }
            } : {
                width: m.outerWidth(),
                height: m.outerHeight(),
                offset: m.offset()
            }
        }
        var c, d = Math.max, f = Math.abs, g = /left|center|right/, h = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, k = /^\w+/, n = /%$/, r = e.fn.position;
        e.position = {
            scrollbarWidth: function() {
                if (void 0 !== c)
                    return c;
                var m = e("\x3cdiv style\x3d'display:block;position:absolute;width:200px;height:200px;overflow:hidden;'\x3e\x3cdiv style\x3d'height:300px;width:auto;'\x3e\x3c/div\x3e\x3c/div\x3e");
                var p = m.children()[0];
                e("body").append(m);
                var q = p.offsetWidth;
                m.css("overflow", "scroll");
                p = p.offsetWidth;
                q === p && (p = m[0].clientWidth);
                m.remove();
                return c = q - p
            },
            getScrollInfo: function(m) {
                var p = m.isWindow || m.isDocument ? "" : m.element.css("overflow-x")
                  , q = m.isWindow || m.isDocument ? "" : m.element.css("overflow-y");
                p = "scroll" === p || "auto" === p && m.width < m.element[0].scrollWidth;
                return {
                    width: "scroll" === q || "auto" === q && m.height < m.element[0].scrollHeight ? e.position.scrollbarWidth() : 0,
                    height: p ? e.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(m) {
                var p = e(m || window);
                var q = p[0];
                q = null != q && q === q.window;
                var x = !!p[0] && 9 === p[0].nodeType;
                return {
                    element: p,
                    isWindow: q,
                    isDocument: x,
                    offset: q || x ? {
                        left: 0,
                        top: 0
                    } : e(m).offset(),
                    scrollLeft: p.scrollLeft(),
                    scrollTop: p.scrollTop(),
                    width: p.outerWidth(),
                    height: p.outerHeight()
                }
            }
        };
        e.fn.position = function(m) {
            if (!m || !m.of)
                return r.apply(this, arguments);
            m = e.extend({}, m);
            var p = "string" === typeof m.of ? e(document).find(m.of) : e(m.of)
              , q = e.position.getWithinInfo(m.within)
              , x = e.position.getScrollInfo(q)
              , z = (m.collision || "flip").split(" ")
              , C = {};
            var E = b(p);
            p[0].preventDefault && (m.at = "left top");
            var T = E.width;
            var M = E.height;
            var N = E.offset;
            var U = e.extend({}, N);
            e.each(["my", "at"], function() {
                var V = (m[this] || "").split(" ");
                1 === V.length && (V = g.test(V[0]) ? V.concat(["center"]) : h.test(V[0]) ? ["center"].concat(V) : ["center", "center"]);
                V[0] = g.test(V[0]) ? V[0] : "center";
                V[1] = h.test(V[1]) ? V[1] : "center";
                var Y = l.exec(V[0]);
                var Z = l.exec(V[1]);
                C[this] = [Y ? Y[0] : 0, Z ? Z[0] : 0];
                m[this] = [k.exec(V[0])[0], k.exec(V[1])[0]]
            });
            1 === z.length && (z[1] = z[0]);
            "right" === m.at[0] ? U.left += T : "center" === m.at[0] && (U.left += T / 2);
            "bottom" === m.at[1] ? U.top += M : "center" === m.at[1] && (U.top += M / 2);
            var ea = a(C.at, T, M);
            U.left += ea[0];
            U.top += ea[1];
            return this.each(function() {
                var V, Y = e(this), Z = Y.outerWidth(), aa = Y.outerHeight(), la = parseInt(e.css(this, "marginLeft"), 10) || 0, ma = parseInt(e.css(this, "marginTop"), 10) || 0, na = Z + la + (parseInt(e.css(this, "marginRight"), 10) || 0) + x.width, oa = aa + ma + (parseInt(e.css(this, "marginBottom"), 10) || 0) + x.height, W = e.extend({}, U), fa = a(C.my, Y.outerWidth(), Y.outerHeight());
                "right" === m.my[0] ? W.left -= Z : "center" === m.my[0] && (W.left -= Z / 2);
                "bottom" === m.my[1] ? W.top -= aa : "center" === m.my[1] && (W.top -= aa / 2);
                W.left += fa[0];
                W.top += fa[1];
                var pa = {
                    marginLeft: la,
                    marginTop: ma
                };
                e.each(["left", "top"], function(ha, ca) {
                    if (e.ui.position[z[ha]])
                        e.ui.position[z[ha]][ca](W, {
                            targetWidth: T,
                            targetHeight: M,
                            elemWidth: Z,
                            elemHeight: aa,
                            collisionPosition: pa,
                            collisionWidth: na,
                            collisionHeight: oa,
                            offset: [ea[0] + fa[0], ea[1] + fa[1]],
                            my: m.my,
                            at: m.at,
                            within: q,
                            elem: Y
                        })
                });
                m.using && (V = function(ha) {
                    var ca = N.left - W.left
                      , ja = ca + T - Z
                      , ia = N.top - W.top
                      , ka = ia + M - aa
                      , da = {
                        target: {
                            element: p,
                            left: N.left,
                            top: N.top,
                            width: T,
                            height: M
                        },
                        element: {
                            element: Y,
                            left: W.left,
                            top: W.top,
                            width: Z,
                            height: aa
                        },
                        horizontal: 0 > ja ? "left" : 0 < ca ? "right" : "center",
                        vertical: 0 > ka ? "top" : 0 < ia ? "bottom" : "middle"
                    };
                    T < Z && f(ca + ja) < T && (da.horizontal = "center");
                    M < aa && f(ia + ka) < M && (da.vertical = "middle");
                    d(f(ca), f(ja)) > d(f(ia), f(ka)) ? da.important = "horizontal" : da.important = "vertical";
                    m.using.call(this, ha, da)
                }
                );
                Y.offset(e.extend(W, {
                    using: V
                }))
            })
        }
        ;
        e.ui.position = {
            fit: {
                left: function(m, p) {
                    var q = p.within
                      , x = q.isWindow ? q.scrollLeft : q.offset.left
                      , z = q.width
                      , C = m.left - p.collisionPosition.marginLeft;
                    q = x - C;
                    var E = C + p.collisionWidth - z - x;
                    p.collisionWidth > z ? 0 < q && 0 >= E ? (p = m.left + q + p.collisionWidth - z - x,
                    m.left += q - p) : m.left = 0 < E && 0 >= q ? x : q > E ? x + z - p.collisionWidth : x : m.left = 0 < q ? m.left + q : 0 < E ? m.left - E : d(m.left - C, m.left)
                },
                top: function(m, p) {
                    var q = p.within
                      , x = q.isWindow ? q.scrollTop : q.offset.top
                      , z = p.within.height
                      , C = m.top - p.collisionPosition.marginTop;
                    q = x - C;
                    var E = C + p.collisionHeight - z - x;
                    p.collisionHeight > z ? 0 < q && 0 >= E ? (p = m.top + q + p.collisionHeight - z - x,
                    m.top += q - p) : m.top = 0 < E && 0 >= q ? x : q > E ? x + z - p.collisionHeight : x : m.top = 0 < q ? m.top + q : 0 < E ? m.top - E : d(m.top - C, m.top)
                }
            },
            flip: {
                left: function(m, p) {
                    var q = p.within
                      , x = q.offset.left + q.scrollLeft
                      , z = q.width
                      , C = q.isWindow ? q.scrollLeft : q.offset.left
                      , E = m.left - p.collisionPosition.marginLeft;
                    q = E - C;
                    var T = E + p.collisionWidth - z - C;
                    E = "left" === p.my[0] ? -p.elemWidth : "right" === p.my[0] ? p.elemWidth : 0;
                    var M = "left" === p.at[0] ? p.targetWidth : "right" === p.at[0] ? -p.targetWidth : 0
                      , N = -2 * p.offset[0];
                    if (0 > q) {
                        if (p = m.left + E + M + N + p.collisionWidth - z - x,
                        0 > p || p < f(q))
                            m.left += E + M + N
                    } else
                        0 < T && (p = m.left - p.collisionPosition.marginLeft + E + M + N - C,
                        0 < p || f(p) < T) && (m.left += E + M + N)
                },
                top: function(m, p) {
                    var q = p.within
                      , x = q.offset.top + q.scrollTop
                      , z = q.height
                      , C = q.isWindow ? q.scrollTop : q.offset.top
                      , E = m.top - p.collisionPosition.marginTop;
                    q = E - C;
                    var T = E + p.collisionHeight - z - C;
                    E = "top" === p.my[1] ? -p.elemHeight : "bottom" === p.my[1] ? p.elemHeight : 0;
                    var M = "top" === p.at[1] ? p.targetHeight : "bottom" === p.at[1] ? -p.targetHeight : 0
                      , N = -2 * p.offset[1];
                    if (0 > q) {
                        if (p = m.top + E + M + N + p.collisionHeight - z - x,
                        0 > p || p < f(q))
                            m.top += E + M + N
                    } else
                        0 < T && (p = m.top - p.collisionPosition.marginTop + E + M + N - C,
                        0 < p || f(p) < T) && (m.top += E + M + N)
                }
            },
            flipfit: {
                left: function() {
                    e.ui.position.flip.left.apply(this, arguments);
                    e.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    e.ui.position.flip.top.apply(this, arguments);
                    e.ui.position.fit.top.apply(this, arguments)
                }
            }
        }
    }
    )();
    e.extend(e.expr.pseudos, {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(a) {
            return function(b) {
                return !!e.data(b, a)
            }
        }) : function(a, b, c) {
            return !!e.data(a, c[3])
        }
    });
    e.fn.extend({
        disableSelection: function() {
            var a = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.on(a + ".ui-disableSelection", function(b) {
                    b.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.off(".ui-disableSelection")
        }
    });
    e.ui.focusable = function(a, b) {
        var c = a.nodeName.toLowerCase();
        if ("area" === c) {
            b = a.parentNode;
            c = b.name;
            if (!a.href || !c || "map" !== b.nodeName.toLowerCase())
                return !1;
            a = e("img[usemap\x3d'#" + c + "']");
            return 0 < a.length && a.is(":visible")
        }
        /^(input|select|textarea|button|object)$/.test(c) ? (b = !a.disabled) && (c = e(a).closest("fieldset")[0]) && (b = !c.disabled) : b = "a" === c ? a.href || b : b;
        if (b = b && e(a).is(":visible")) {
            a = e(a);
            for (b = a.css("visibility"); "inherit" === b; )
                a = a.parent(),
                b = a.css("visibility");
            b = "visible" === b
        }
        return b
    }
    ;
    e.extend(e.expr.pseudos, {
        focusable: function(a) {
            return e.ui.focusable(a, null != e.attr(a, "tabindex"))
        }
    });
    e.fn._form = function() {
        return "string" === typeof this[0].form ? this.closest("form") : e(this[0].form)
    }
    ;
    e.ui.formResetMixin = {
        _formResetHandler: function() {
            var a = e(this);
            setTimeout(function() {
                var b = a.data("ui-form-reset-instances");
                e.each(b, function() {
                    this.refresh()
                })
            })
        },
        _bindFormResetHandler: function() {
            this.form = this.element._form();
            if (this.form.length) {
                var a = this.form.data("ui-form-reset-instances") || [];
                if (!a.length)
                    this.form.on("reset.ui-form-reset", this._formResetHandler);
                a.push(this);
                this.form.data("ui-form-reset-instances", a)
            }
        },
        _unbindFormResetHandler: function() {
            if (this.form.length) {
                var a = this.form.data("ui-form-reset-instances");
                a.splice(e.inArray(this, a), 1);
                a.length ? this.form.data("ui-form-reset-instances", a) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
            }
        }
    };
    e.expr.pseudos || (e.expr.pseudos = e.expr[":"]);
    e.uniqueSort || (e.uniqueSort = e.unique);
    if (!e.escapeSelector) {
        var Q = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g
          , K = function(a, b) {
            return b ? "\x00" === a ? "\ufffd" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
        };
        e.escapeSelector = function(a) {
            return (a + "").replace(Q, K)
        }
    }
    e.fn.even && e.fn.odd || e.fn.extend({
        even: function() {
            return this.filter(function(a) {
                return 0 === a % 2
            })
        },
        odd: function() {
            return this.filter(function(a) {
                return 1 === a % 2
            })
        }
    });
    e.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };
    e.fn.labels = function() {
        var a;
        if (!this.length)
            return this.pushStack([]);
        if (this[0].labels && this[0].labels.length)
            return this.pushStack(this[0].labels);
        var b = this.eq(0).parents("label");
        if (a = this.attr("id")) {
            var c = this.eq(0).parents().last();
            c = c.add(c.length ? c.siblings() : this.siblings());
            a = "label[for\x3d'" + e.escapeSelector(a) + "']";
            b = b.add(c.find(a).addBack(a))
        }
        return this.pushStack(b)
    }
    ;
    e.fn.scrollParent = function(a) {
        var b = this.css("position")
          , c = "absolute" === b
          , d = a ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
        a = this.parents().filter(function() {
            var f = e(this);
            return c && "static" === f.css("position") ? !1 : d.test(f.css("overflow") + f.css("overflow-y") + f.css("overflow-x"))
        }).eq(0);
        return "fixed" !== b && a.length ? a : e(this[0].ownerDocument || document)
    }
    ;
    e.extend(e.expr.pseudos, {
        tabbable: function(a) {
            var b = e.attr(a, "tabindex")
              , c = null != b;
            return (!c || 0 <= b) && e.ui.focusable(a, c)
        }
    });
    e.fn.extend({
        uniqueId: function() {
            var a = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++a)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    });
    e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var F = !1;
    e(document).on("mouseup", function() {
        F = !1
    });
    e.widget("ui.mouse", {
        version: "1.13.2",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var a = this;
            this.element.on("mousedown." + this.widgetName, function(b) {
                return a._mouseDown(b)
            }).on("click." + this.widgetName, function(b) {
                if (!0 === e.data(b.target, a.widgetName + ".preventClickEvent"))
                    return e.removeData(b.target, a.widgetName + ".preventClickEvent"),
                    b.stopImmediatePropagation(),
                    !1
            });
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName);
            this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(a) {
            if (!F) {
                this._mouseMoved = !1;
                this._mouseStarted && this._mouseUp(a);
                this._mouseDownEvent = a;
                var b = this
                  , c = 1 === a.which
                  , d = "string" === typeof this.options.cancel && a.target.nodeName ? e(a.target).closest(this.options.cancel).length : !1;
                if (!c || d || !this._mouseCapture(a))
                    return !0;
                this.mouseDelayMet = !this.options.delay;
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    b.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(a) && this._mouseDelayMet(a) && (this._mouseStarted = !1 !== this._mouseStart(a),
                !this._mouseStarted))
                    return a.preventDefault(),
                    !0;
                !0 === e.data(a.target, this.widgetName + ".preventClickEvent") && e.removeData(a.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(f) {
                    return b._mouseMove(f)
                }
                ;
                this._mouseUpDelegate = function(f) {
                    return b._mouseUp(f)
                }
                ;
                this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate);
                a.preventDefault();
                return F = !0
            }
        },
        _mouseMove: function(a) {
            if (this._mouseMoved) {
                if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !a.button)
                    return this._mouseUp(a);
                if (!a.which)
                    if (a.originalEvent.altKey || a.originalEvent.ctrlKey || a.originalEvent.metaKey || a.originalEvent.shiftKey)
                        this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich)
                        return this._mouseUp(a)
            }
            if (a.which || a.button)
                this._mouseMoved = !0;
            if (this._mouseStarted)
                return this._mouseDrag(a),
                a.preventDefault();
            this._mouseDistanceMet(a) && this._mouseDelayMet(a) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, a)) ? this._mouseDrag(a) : this._mouseUp(a));
            return !this._mouseStarted
        },
        _mouseUp: function(a) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
            this._mouseStarted && (this._mouseStarted = !1,
            a.target === this._mouseDownEvent.target && e.data(a.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(a));
            this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer),
            delete this._mouseDelayTimer);
            F = this.ignoreMissingWhich = !1;
            a.preventDefault()
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    });
    e.ui.plugin = {
        add: function(a, b, c) {
            var d;
            a = e.ui[a].prototype;
            for (d in c)
                a.plugins[d] = a.plugins[d] || [],
                a.plugins[d].push([b, c[d]])
        },
        call: function(a, b, c, d) {
            if ((b = a.plugins[b]) && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
                for (d = 0; d < b.length; d++)
                    a.options[b[d][0]] && b[d][1].apply(a.element, c)
        }
    };
    e.ui.safeActiveElement = function(a) {
        try {
            var b = a.activeElement
        } catch (c) {
            b = a.body
        }
        b || (b = a.body);
        b.nodeName || (b = a.body);
        return b
    }
    ;
    e.ui.safeBlur = function(a) {
        a && "body" !== a.nodeName.toLowerCase() && e(a).trigger("blur")
    }
    ;
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.13.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative();
            this.options.addClasses && this._addClass("ui-draggable");
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function(a, b) {
            this._super(a, b);
            "handle" === a && (this._removeHandleClassName(),
            this._setHandleClassName())
        },
        _destroy: function() {
            (this.helper || this.element).is(".ui-draggable-dragging") ? this.destroyOnClear = !0 : (this._removeHandleClassName(),
            this._mouseDestroy())
        },
        _mouseCapture: function(a) {
            var b = this.options;
            if (this.helper || b.disabled || 0 < e(a.target).closest(".ui-resizable-handle").length)
                return !1;
            this.handle = this._getHandle(a);
            if (!this.handle)
                return !1;
            this._blurActiveElement(a);
            this._blockFrames(!0 === b.iframeFix ? "iframe" : b.iframeFix);
            return !0
        },
        _blockFrames: function(a) {
            this.iframeBlocks = this.document.find(a).map(function() {
                var b = e(this);
                return e("\x3cdiv\x3e").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _blurActiveElement: function(a) {
            var b = e.ui.safeActiveElement(this.document[0]);
            e(a.target).closest(b).length || e.ui.safeBlur(b)
        },
        _mouseStart: function(a) {
            var b = this.options;
            this.helper = this._createHelper(a);
            this._addClass(this.helper, "ui-draggable-dragging");
            this._cacheHelperProportions();
            e.ui.ddmanager && (e.ui.ddmanager.current = this);
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent(!0);
            this.offsetParent = this.helper.offsetParent();
            this.hasFixedAncestor = 0 < this.helper.parents().filter(function() {
                return "fixed" === e(this).css("position")
            }).length;
            this.positionAbs = this.element.offset();
            this._refreshOffsets(a);
            this.originalPosition = this.position = this._generatePosition(a, !1);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            this._setContainment();
            if (!1 === this._trigger("start", a))
                return this._clear(),
                !1;
            this._cacheHelperProportions();
            e.ui.ddmanager && !b.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, a);
            this._mouseDrag(a, !0);
            e.ui.ddmanager && e.ui.ddmanager.dragStart(this, a);
            return !0
        },
        _refreshOffsets: function(a) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            };
            this.offset.click = {
                left: a.pageX - this.offset.left,
                top: a.pageY - this.offset.top
            }
        },
        _mouseDrag: function(a, b) {
            this.hasFixedAncestor && (this.offset.parent = this._getParentOffset());
            this.position = this._generatePosition(a, !0);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!b) {
                b = this._uiHash();
                if (!1 === this._trigger("drag", a, b))
                    return this._mouseUp(new e.Event("mouseup",a)),
                    !1;
                this.position = b.position
            }
            this.helper[0].style.left = this.position.left + "px";
            this.helper[0].style.top = this.position.top + "px";
            e.ui.ddmanager && e.ui.ddmanager.drag(this, a);
            return !1
        },
        _mouseStop: function(a) {
            var b = this
              , c = !1;
            e.ui.ddmanager && !this.options.dropBehaviour && (c = e.ui.ddmanager.drop(this, a));
            this.dropped && (c = this.dropped,
            this.dropped = !1);
            "invalid" === this.options.revert && !c || "valid" === this.options.revert && c || !0 === this.options.revert || "function" === typeof this.options.revert && this.options.revert.call(this.element, c) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== b._trigger("stop", a) && b._clear()
            }) : !1 !== this._trigger("stop", a) && this._clear();
            return !1
        },
        _mouseUp: function(a) {
            this._unblockFrames();
            e.ui.ddmanager && e.ui.ddmanager.dragStop(this, a);
            this.handleElement.is(a.target) && this.element.trigger("focus");
            return e.ui.mouse.prototype._mouseUp.call(this, a)
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new e.Event("mouseup",{
                target: this.element[0]
            })) : this._clear();
            return this
        },
        _getHandle: function(a) {
            return this.options.handle ? !!e(a.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
            this._addClass(this.handleElement, "ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle")
        },
        _createHelper: function(a) {
            var b = this.options
              , c = "function" === typeof b.helper;
            a = c ? e(b.helper.apply(this.element[0], [a])) : "clone" === b.helper ? this.element.clone().removeAttr("id") : this.element;
            a.parents("body").length || a.appendTo("parent" === b.appendTo ? this.element[0].parentNode : b.appendTo);
            c && a[0] === this.element[0] && this._setPositionRelative();
            a[0] === this.element[0] || /(fixed|absolute)/.test(a.css("position")) || a.css("position", "absolute");
            return a
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(a) {
            "string" === typeof a && (a = a.split(" "));
            Array.isArray(a) && (a = {
                left: +a[0],
                top: +a[1] || 0
            });
            "left"in a && (this.offset.click.left = a.left + this.margins.left);
            "right"in a && (this.offset.click.left = this.helperProportions.width - a.right + this.margins.left);
            "top"in a && (this.offset.click.top = a.top + this.margins.top);
            "bottom"in a && (this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top)
        },
        _isRootNode: function(a) {
            return /(html|body)/i.test(a.tagName) || a === this.document[0]
        },
        _getParentOffset: function() {
            var a = this.offsetParent.offset()
              , b = this.document[0];
            "absolute" === this.cssPosition && this.scrollParent[0] !== b && e.contains(this.scrollParent[0], this.offsetParent[0]) && (a.left += this.scrollParent.scrollLeft(),
            a.top += this.scrollParent.scrollTop());
            this._isRootNode(this.offsetParent[0]) && (a = {
                top: 0,
                left: 0
            });
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var a = this.element.position()
              , b = this._isRootNode(this.scrollParent[0]);
            return {
                top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()),
                left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var a;
            var b = this.options;
            var c = this.document[0];
            this.relativeContainer = null;
            if (b.containment)
                if ("window" === b.containment)
                    this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || c.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                else if ("document" === b.containment)
                    this.containment = [0, 0, e(c).width() - this.helperProportions.width - this.margins.left, (e(c).height() || c.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                else if (b.containment.constructor === Array)
                    this.containment = b.containment;
                else {
                    if ("parent" === b.containment && (b.containment = this.helper[0].parentNode),
                    c = e(b.containment),
                    a = c[0])
                        b = /(scroll|auto)/.test(c.css("overflow")),
                        this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(a.scrollWidth, a.offsetWidth) : a.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(a.scrollHeight, a.offsetHeight) : a.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
                        this.relativeContainer = c
                }
            else
                this.containment = null
        },
        _convertPositionTo: function(a, b) {
            b || (b = this.position);
            a = "absolute" === a ? 1 : -1;
            var c = this._isRootNode(this.scrollParent[0]);
            return {
                top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - ("fixed" === this.cssPosition ? -this.offset.scroll.top : c ? 0 : this.offset.scroll.top) * a,
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - ("fixed" === this.cssPosition ? -this.offset.scroll.left : c ? 0 : this.offset.scroll.left) * a
            }
        },
        _generatePosition: function(a, b) {
            var c = this.options
              , d = this._isRootNode(this.scrollParent[0]);
            var f = a.pageX;
            var g = a.pageY;
            d && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            });
            if (b) {
                if (this.containment) {
                    if (this.relativeContainer) {
                        var h = this.relativeContainer.offset();
                        h = [this.containment[0] + h.left, this.containment[1] + h.top, this.containment[2] + h.left, this.containment[3] + h.top]
                    } else
                        h = this.containment;
                    a.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left);
                    a.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top);
                    a.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left);
                    a.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                c.grid && (g = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY,
                g = h ? g - this.offset.click.top >= h[1] || g - this.offset.click.top > h[3] ? g : g - this.offset.click.top >= h[1] ? g - c.grid[1] : g + c.grid[1] : g,
                f = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX,
                f = h ? f - this.offset.click.left >= h[0] || f - this.offset.click.left > h[2] ? f : f - this.offset.click.left >= h[0] ? f - c.grid[0] : f + c.grid[0] : f);
                "y" === c.axis && (f = this.originalPageX);
                "x" === c.axis && (g = this.originalPageY)
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging");
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = !1;
            this.destroyOnClear && this.destroy()
        },
        _trigger: function(a, b, c) {
            c = c || this._uiHash();
            e.ui.plugin.call(this, a, [b, c, this], !0);
            /^(drag|start|stop)/.test(a) && (this.positionAbs = this._convertPositionTo("absolute"),
            c.offset = this.positionAbs);
            return e.Widget.prototype._trigger.call(this, a, b, c)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    e.ui.plugin.add("draggable", "connectToSortable", {
        start: function(a, b, c) {
            var d = e.extend({}, b, {
                item: c.element
            });
            c.sortables = [];
            e(c.options.connectToSortable).each(function() {
                var f = e(this).sortable("instance");
                f && !f.options.disabled && (c.sortables.push(f),
                f.refreshPositions(),
                f._trigger("activate", a, d))
            })
        },
        stop: function(a, b, c) {
            var d = e.extend({}, b, {
                item: c.element
            });
            c.cancelHelperRemoval = !1;
            e.each(c.sortables, function() {
                this.isOver ? (this.isOver = 0,
                c.cancelHelperRemoval = !0,
                this.cancelHelperRemoval = !1,
                this._storedCSS = {
                    position: this.placeholder.css("position"),
                    top: this.placeholder.css("top"),
                    left: this.placeholder.css("left")
                },
                this._mouseStop(a),
                this.options.helper = this.options._helper) : (this.cancelHelperRemoval = !0,
                this._trigger("deactivate", a, d))
            })
        },
        drag: function(a, b, c) {
            e.each(c.sortables, function() {
                var d = !1
                  , f = this;
                f.positionAbs = c.positionAbs;
                f.helperProportions = c.helperProportions;
                f.offset.click = c.offset.click;
                f._intersectsWith(f.containerCache) && (d = !0,
                e.each(c.sortables, function() {
                    this.positionAbs = c.positionAbs;
                    this.helperProportions = c.helperProportions;
                    this.offset.click = c.offset.click;
                    this !== f && this._intersectsWith(this.containerCache) && e.contains(f.element[0], this.element[0]) && (d = !1);
                    return d
                }));
                d ? (f.isOver || (f.isOver = 1,
                c._parent = b.helper.parent(),
                f.currentItem = b.helper.appendTo(f.element).data("ui-sortable-item", !0),
                f.options._helper = f.options.helper,
                f.options.helper = function() {
                    return b.helper[0]
                }
                ,
                a.target = f.currentItem[0],
                f._mouseCapture(a, !0),
                f._mouseStart(a, !0, !0),
                f.offset.click.top = c.offset.click.top,
                f.offset.click.left = c.offset.click.left,
                f.offset.parent.left -= c.offset.parent.left - f.offset.parent.left,
                f.offset.parent.top -= c.offset.parent.top - f.offset.parent.top,
                c._trigger("toSortable", a),
                c.dropped = f.element,
                e.each(c.sortables, function() {
                    this.refreshPositions()
                }),
                c.currentItem = c.element,
                f.fromOutside = c),
                f.currentItem && (f._mouseDrag(a),
                b.position = f.position)) : f.isOver && (f.isOver = 0,
                f.cancelHelperRemoval = !0,
                f.options._revert = f.options.revert,
                f.options.revert = !1,
                f._trigger("out", a, f._uiHash(f)),
                f._mouseStop(a, !0),
                f.options.revert = f.options._revert,
                f.options.helper = f.options._helper,
                f.placeholder && f.placeholder.remove(),
                b.helper.appendTo(c._parent),
                c._refreshOffsets(a),
                b.position = c._generatePosition(a, !0),
                c._trigger("fromSortable", a),
                c.dropped = !1,
                e.each(c.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    });
    e.ui.plugin.add("draggable", "cursor", {
        start: function(a, b, c) {
            a = e("body");
            c = c.options;
            a.css("cursor") && (c._cursor = a.css("cursor"));
            a.css("cursor", c.cursor)
        },
        stop: function(a, b, c) {
            a = c.options;
            a._cursor && e("body").css("cursor", a._cursor)
        }
    });
    e.ui.plugin.add("draggable", "opacity", {
        start: function(a, b, c) {
            a = e(b.helper);
            c = c.options;
            a.css("opacity") && (c._opacity = a.css("opacity"));
            a.css("opacity", c.opacity)
        },
        stop: function(a, b, c) {
            a = c.options;
            a._opacity && e(b.helper).css("opacity", a._opacity)
        }
    });
    e.ui.plugin.add("draggable", "scroll", {
        start: function(a, b, c) {
            c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1));
            c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset())
        },
        drag: function(a, b, c) {
            b = c.options;
            var d = !1
              , f = c.scrollParentNotHidden[0]
              , g = c.document[0];
            f !== g && "HTML" !== f.tagName ? (b.axis && "x" === b.axis || (c.overflowOffset.top + f.offsetHeight - a.pageY < b.scrollSensitivity ? f.scrollTop = d = f.scrollTop + b.scrollSpeed : a.pageY - c.overflowOffset.top < b.scrollSensitivity && (f.scrollTop = d = f.scrollTop - b.scrollSpeed)),
            b.axis && "y" === b.axis || (c.overflowOffset.left + f.offsetWidth - a.pageX < b.scrollSensitivity ? f.scrollLeft = d = f.scrollLeft + b.scrollSpeed : a.pageX - c.overflowOffset.left < b.scrollSensitivity && (f.scrollLeft = d = f.scrollLeft - b.scrollSpeed))) : (b.axis && "x" === b.axis || (a.pageY - e(g).scrollTop() < b.scrollSensitivity ? d = e(g).scrollTop(e(g).scrollTop() - b.scrollSpeed) : e(window).height() - (a.pageY - e(g).scrollTop()) < b.scrollSensitivity && (d = e(g).scrollTop(e(g).scrollTop() + b.scrollSpeed))),
            b.axis && "y" === b.axis || (a.pageX - e(g).scrollLeft() < b.scrollSensitivity ? d = e(g).scrollLeft(e(g).scrollLeft() - b.scrollSpeed) : e(window).width() - (a.pageX - e(g).scrollLeft()) < b.scrollSensitivity && (d = e(g).scrollLeft(e(g).scrollLeft() + b.scrollSpeed))));
            !1 !== d && e.ui.ddmanager && !b.dropBehaviour && e.ui.ddmanager.prepareOffsets(c, a)
        }
    });
    e.ui.plugin.add("draggable", "snap", {
        start: function(a, b, c) {
            a = c.options;
            c.snapElements = [];
            e(a.snap.constructor !== String ? a.snap.items || ":data(ui-draggable)" : a.snap).each(function() {
                var d = e(this)
                  , f = d.offset();
                this !== c.element[0] && c.snapElements.push({
                    item: this,
                    width: d.outerWidth(),
                    height: d.outerHeight(),
                    top: f.top,
                    left: f.left
                })
            })
        },
        drag: function(a, b, c) {
            var d, f = c.options, g = f.snapTolerance, h = b.offset.left, l = h + c.helperProportions.width, k = b.offset.top, n = k + c.helperProportions.height;
            for (d = c.snapElements.length - 1; 0 <= d; d--) {
                var r = c.snapElements[d].left - c.margins.left;
                var m = r + c.snapElements[d].width;
                var p = c.snapElements[d].top - c.margins.top;
                var q = p + c.snapElements[d].height;
                if (l < r - g || h > m + g || n < p - g || k > q + g || !e.contains(c.snapElements[d].item.ownerDocument, c.snapElements[d].item))
                    c.snapElements[d].snapping && c.options.snap.release && c.options.snap.release.call(c.element, a, e.extend(c._uiHash(), {
                        snapItem: c.snapElements[d].item
                    })),
                    c.snapElements[d].snapping = !1;
                else {
                    if ("inner" !== f.snapMode) {
                        var x = Math.abs(p - n) <= g;
                        var z = Math.abs(q - k) <= g;
                        var C = Math.abs(r - l) <= g;
                        var E = Math.abs(m - h) <= g;
                        x && (b.position.top = c._convertPositionTo("relative", {
                            top: p - c.helperProportions.height,
                            left: 0
                        }).top);
                        z && (b.position.top = c._convertPositionTo("relative", {
                            top: q,
                            left: 0
                        }).top);
                        C && (b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: r - c.helperProportions.width
                        }).left);
                        E && (b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: m
                        }).left)
                    }
                    var T = x || z || C || E;
                    "outer" !== f.snapMode && (x = Math.abs(p - k) <= g,
                    z = Math.abs(q - n) <= g,
                    C = Math.abs(r - h) <= g,
                    E = Math.abs(m - l) <= g,
                    x && (b.position.top = c._convertPositionTo("relative", {
                        top: p,
                        left: 0
                    }).top),
                    z && (b.position.top = c._convertPositionTo("relative", {
                        top: q - c.helperProportions.height,
                        left: 0
                    }).top),
                    C && (b.position.left = c._convertPositionTo("relative", {
                        top: 0,
                        left: r
                    }).left),
                    E && (b.position.left = c._convertPositionTo("relative", {
                        top: 0,
                        left: m - c.helperProportions.width
                    }).left));
                    !c.snapElements[d].snapping && (x || z || C || E || T) && c.options.snap.snap && c.options.snap.snap.call(c.element, a, e.extend(c._uiHash(), {
                        snapItem: c.snapElements[d].item
                    }));
                    c.snapElements[d].snapping = x || z || C || E || T
                }
            }
        }
    });
    e.ui.plugin.add("draggable", "stack", {
        start: function(a, b, c) {
            a = e.makeArray(e(c.options.stack)).sort(function(f, g) {
                return (parseInt(e(f).css("zIndex"), 10) || 0) - (parseInt(e(g).css("zIndex"), 10) || 0)
            });
            if (a.length) {
                var d = parseInt(e(a[0]).css("zIndex"), 10) || 0;
                e(a).each(function(f) {
                    e(this).css("zIndex", d + f)
                });
                this.css("zIndex", d + a.length)
            }
        }
    });
    e.ui.plugin.add("draggable", "zIndex", {
        start: function(a, b, c) {
            a = e(b.helper);
            c = c.options;
            a.css("zIndex") && (c._zIndex = a.css("zIndex"));
            a.css("zIndex", c.zIndex)
        },
        stop: function(a, b, c) {
            a = c.options;
            a._zIndex && e(b.helper).css("zIndex", a._zIndex)
        }
    });
    e.widget("ui.droppable", {
        version: "1.13.2",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var a, b = this.options, c = b.accept;
            this.isover = !1;
            this.isout = !0;
            this.accept = "function" === typeof c ? c : function(d) {
                return d.is(c)
            }
            ;
            this.proportions = function() {
                if (arguments.length)
                    a = arguments[0];
                else
                    return a ? a : a = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
            }
            ;
            this._addToManager(b.scope);
            b.addClasses && this._addClass("ui-droppable")
        },
        _addToManager: function(a) {
            e.ui.ddmanager.droppables[a] = e.ui.ddmanager.droppables[a] || [];
            e.ui.ddmanager.droppables[a].push(this)
        },
        _splice: function(a) {
            for (var b = 0; b < a.length; b++)
                a[b] === this && a.splice(b, 1)
        },
        _destroy: function() {
            this._splice(e.ui.ddmanager.droppables[this.options.scope])
        },
        _setOption: function(a, b) {
            "accept" === a ? this.accept = "function" === typeof b ? b : function(c) {
                return c.is(b)
            }
            : "scope" === a && (this._splice(e.ui.ddmanager.droppables[this.options.scope]),
            this._addToManager(b));
            this._super(a, b)
        },
        _activate: function(a) {
            var b = e.ui.ddmanager.current;
            this._addActiveClass();
            b && this._trigger("activate", a, this.ui(b))
        },
        _deactivate: function(a) {
            var b = e.ui.ddmanager.current;
            this._removeActiveClass();
            b && this._trigger("deactivate", a, this.ui(b))
        },
        _over: function(a) {
            var b = e.ui.ddmanager.current;
            b && (b.currentItem || b.element)[0] !== this.element[0] && this.accept.call(this.element[0], b.currentItem || b.element) && (this._addHoverClass(),
            this._trigger("over", a, this.ui(b)))
        },
        _out: function(a) {
            var b = e.ui.ddmanager.current;
            b && (b.currentItem || b.element)[0] !== this.element[0] && this.accept.call(this.element[0], b.currentItem || b.element) && (this._removeHoverClass(),
            this._trigger("out", a, this.ui(b)))
        },
        _drop: function(a, b) {
            var c = b || e.ui.ddmanager.current
              , d = !1;
            if (!c || (c.currentItem || c.element)[0] === this.element[0])
                return !1;
            this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var f = e(this).droppable("instance");
                if (f.options.greedy && !f.options.disabled && f.options.scope === c.options.scope && f.accept.call(f.element[0], c.currentItem || c.element) && e.ui.intersect(c, e.extend(f, {
                    offset: f.element.offset()
                }), f.options.tolerance, a))
                    return d = !0,
                    !1
            });
            return d ? !1 : this.accept.call(this.element[0], c.currentItem || c.element) ? (this._removeActiveClass(),
            this._removeHoverClass(),
            this._trigger("drop", a, this.ui(c)),
            this.element) : !1
        },
        ui: function(a) {
            return {
                draggable: a.currentItem || a.element,
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            }
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover")
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover")
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active")
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active")
        }
    });
    e.ui.intersect = function() {
        return function(a, b, c, d) {
            if (!b.offset)
                return !1;
            var f = (a.positionAbs || a.position.absolute).left + a.margins.left
              , g = (a.positionAbs || a.position.absolute).top + a.margins.top
              , h = f + a.helperProportions.width
              , l = g + a.helperProportions.height
              , k = b.offset.left
              , n = b.offset.top
              , r = k + b.proportions().width
              , m = n + b.proportions().height;
            switch (c) {
            case "fit":
                return k <= f && h <= r && n <= g && l <= m;
            case "intersect":
                return k < f + a.helperProportions.width / 2 && h - a.helperProportions.width / 2 < r && n < g + a.helperProportions.height / 2 && l - a.helperProportions.height / 2 < m;
            case "pointer":
                a = d.pageY;
                c = b.proportions().height;
                if (n = a >= n && a < n + c)
                    d = d.pageX,
                    b = b.proportions().width,
                    n = d >= k && d < k + b;
                return n;
            case "touch":
                return (g >= n && g <= m || l >= n && l <= m || g < n && l > m) && (f >= k && f <= r || h >= k && h <= r || f < k && h > r);
            default:
                return !1
            }
        }
    }();
    e.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(a, b) {
            var c, d = e.ui.ddmanager.droppables[a.options.scope] || [], f = b ? b.type : null, g = (a.currentItem || a.element).find(":data(ui-droppable)").addBack();
            var h = 0;
            a: for (; h < d.length; h++)
                if (!(d[h].options.disabled || a && !d[h].accept.call(d[h].element[0], a.currentItem || a.element))) {
                    for (c = 0; c < g.length; c++)
                        if (g[c] === d[h].element[0]) {
                            d[h].proportions().height = 0;
                            continue a
                        }
                    d[h].visible = "none" !== d[h].element.css("display");
                    d[h].visible && ("mousedown" === f && d[h]._activate.call(d[h], b),
                    d[h].offset = d[h].element.offset(),
                    d[h].proportions({
                        width: d[h].element[0].offsetWidth,
                        height: d[h].element[0].offsetHeight
                    }))
                }
        },
        drop: function(a, b) {
            var c = !1;
            e.each((e.ui.ddmanager.droppables[a.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && e.ui.intersect(a, this, this.options.tolerance, b) && (c = this._drop.call(this, b) || c),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], a.currentItem || a.element) && (this.isout = !0,
                this.isover = !1,
                this._deactivate.call(this, b)))
            });
            return c
        },
        dragStart: function(a, b) {
            a.element.parentsUntil("body").on("scroll.droppable", function() {
                a.options.refreshPositions || e.ui.ddmanager.prepareOffsets(a, b)
            })
        },
        drag: function(a, b) {
            a.options.refreshPositions && e.ui.ddmanager.prepareOffsets(a, b);
            e.each(e.ui.ddmanager.droppables[a.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var c = e.ui.intersect(a, this, this.options.tolerance, b);
                    var d = !c && this.isover ? "isout" : c && !this.isover ? "isover" : null;
                    if (d) {
                        if (this.options.greedy) {
                            var f = this.options.scope;
                            c = this.element.parents(":data(ui-droppable)").filter(function() {
                                return e(this).droppable("instance").options.scope === f
                            });
                            if (c.length) {
                                var g = e(c[0]).droppable("instance");
                                g.greedyChild = "isover" === d
                            }
                        }
                        g && "isover" === d && (g.isover = !1,
                        g.isout = !0,
                        g._out.call(g, b));
                        this[d] = !0;
                        this["isout" === d ? "isover" : "isout"] = !1;
                        this["isover" === d ? "_over" : "_out"].call(this, b);
                        g && "isout" === d && (g.isout = !1,
                        g.isover = !0,
                        g._over.call(g, b))
                    }
                }
            })
        },
        dragStop: function(a, b) {
            a.element.parentsUntil("body").off("scroll.droppable");
            a.options.refreshPositions || e.ui.ddmanager.prepareOffsets(a, b)
        }
    };
    !1 !== e.uiBackCompat && e.widget("ui.droppable", e.ui.droppable, {
        options: {
            hoverClass: !1,
            activeClass: !1
        },
        _addActiveClass: function() {
            this._super();
            this.options.activeClass && this.element.addClass(this.options.activeClass)
        },
        _removeActiveClass: function() {
            this._super();
            this.options.activeClass && this.element.removeClass(this.options.activeClass)
        },
        _addHoverClass: function() {
            this._super();
            this.options.hoverClass && this.element.addClass(this.options.hoverClass)
        },
        _removeHoverClass: function() {
            this._super();
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
        }
    });
    e.widget("ui.resizable", e.ui.mouse, {
        version: "1.13.2",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(a) {
            return parseFloat(a) || 0
        },
        _isNumber: function(a) {
            return !isNaN(parseFloat(a))
        },
        _hasScroll: function(a, b) {
            if ("hidden" === e(a).css("overflow"))
                return !1;
            b = b && "left" === b ? "scrollLeft" : "scrollTop";
            var c = !1;
            if (0 < a[b])
                return !0;
            try {
                a[b] = 1,
                c = 0 < a[b],
                a[b] = 0
            } catch (d) {}
            return c
        },
        _create: function() {
            var a = this.options
              , b = this;
            this._addClass("ui-resizable");
            e.extend(this, {
                _aspectRatio: !!a.aspectRatio,
                aspectRatio: a.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {
                this.element.wrap(e("\x3cdiv class\x3d'ui-wrapper'\x3e\x3c/div\x3e").css({
                    overflow: "hidden",
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
                this.elementIsWrapper = !0;
                var c = {
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom"),
                    marginLeft: this.originalElement.css("marginLeft")
                };
                this.element.css(c);
                this.originalElement.css("margin", 0);
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css(c);
                this._proportionallyResize()
            }
            this._setupHandles();
            if (a.autoHide)
                e(this.element).on("mouseenter", function() {
                    a.disabled || (b._removeClass("ui-resizable-autohide"),
                    b._handles.show())
                }).on("mouseleave", function() {
                    a.disabled || b.resizing || (b._addClass("ui-resizable-autohide"),
                    b._handles.hide())
                });
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            this._addedHandles.remove();
            var a = function(c) {
                e(c).removeData("resizable").removeData("ui-resizable").off(".resizable")
            };
            if (this.elementIsWrapper) {
                a(this.element);
                var b = this.element;
                this.originalElement.css({
                    position: b.css("position"),
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: b.css("top"),
                    left: b.css("left")
                }).insertAfter(b);
                b.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            a(this.originalElement);
            return this
        },
        _setOption: function(a, b) {
            this._super(a, b);
            switch (a) {
            case "handles":
                this._removeHandles();
                this._setupHandles();
                break;
            case "aspectRatio":
                this._aspectRatio = !!b
            }
        },
        _setupHandles: function() {
            var a = this.options, b, c = this;
            this.handles = a.handles || (e(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se");
            this._handles = e();
            this._addedHandles = e();
            if (this.handles.constructor === String) {
                "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var d = this.handles.split(",");
                this.handles = {};
                for (b = 0; b < d.length; b++) {
                    var f = String.prototype.trim.call(d[b]);
                    var g = "ui-resizable-" + f;
                    var h = e("\x3cdiv\x3e");
                    this._addClass(h, "ui-resizable-handle " + g);
                    h.css({
                        zIndex: a.zIndex
                    });
                    this.handles[f] = ".ui-resizable-" + f;
                    this.element.children(this.handles[f]).length || (this.element.append(h),
                    this._addedHandles = this._addedHandles.add(h))
                }
            }
            this._renderAxis = function(l) {
                var k;
                l = l || this.element;
                for (k in this.handles) {
                    if (this.handles[k].constructor === String)
                        this.handles[k] = this.element.children(this.handles[k]).first().show();
                    else if (this.handles[k].jquery || this.handles[k].nodeType)
                        this.handles[k] = e(this.handles[k]),
                        this._on(this.handles[k], {
                            mousedown: c._mouseDown
                        });
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {
                        var n = e(this.handles[k], this.element);
                        var r = /sw|ne|nw|se|n|s/.test(k) ? n.outerHeight() : n.outerWidth();
                        n = ["padding", /ne|nw|n/.test(k) ? "Top" : /se|sw|s/.test(k) ? "Bottom" : /^e$/.test(k) ? "Right" : "Left"].join("");
                        l.css(n, r);
                        this._proportionallyResize()
                    }
                    this._handles = this._handles.add(this.handles[k])
                }
            }
            ;
            this._renderAxis(this.element);
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
            this._handles.disableSelection();
            this._handles.on("mouseover", function() {
                c.resizing || (this.className && (h = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                c.axis = h && h[1] ? h[1] : "se")
            });
            a.autoHide && (this._handles.hide(),
            this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function() {
            this._addedHandles.remove()
        },
        _mouseCapture: function(a) {
            var b, c = !1;
            for (b in this.handles) {
                var d = e(this.handles[b])[0];
                if (d === a.target || e.contains(d, a.target))
                    c = !0
            }
            return !this.options.disabled && c
        },
        _mouseStart: function(a) {
            var b = this.options
              , c = this.element;
            this.resizing = !0;
            this._renderProxy();
            var d = this._num(this.helper.css("left"));
            var f = this._num(this.helper.css("top"));
            b.containment && (d += e(b.containment).scrollLeft() || 0,
            f += e(b.containment).scrollTop() || 0);
            this.offset = this.helper.offset();
            this.position = {
                left: d,
                top: f
            };
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: c.width(),
                height: c.height()
            };
            this.originalSize = this._helper ? {
                width: c.outerWidth(),
                height: c.outerHeight()
            } : {
                width: c.width(),
                height: c.height()
            };
            this.sizeDiff = {
                width: c.outerWidth() - c.width(),
                height: c.outerHeight() - c.height()
            };
            this.originalPosition = {
                left: d,
                top: f
            };
            this.originalMousePosition = {
                left: a.pageX,
                top: a.pageY
            };
            this.aspectRatio = "number" === typeof b.aspectRatio ? b.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            d = e(".ui-resizable-" + this.axis).css("cursor");
            e("body").css("cursor", "auto" === d ? this.axis + "-resize" : d);
            this._addClass("ui-resizable-resizing");
            this._propagate("start", a);
            return !0
        },
        _mouseDrag: function(a) {
            var b = this.originalMousePosition;
            var c = a.pageX - b.left || 0;
            b = a.pageY - b.top || 0;
            var d = this._change[this.axis];
            this._updatePrevProperties();
            if (!d)
                return !1;
            c = d.apply(this, [a, c, b]);
            this._updateVirtualBoundaries(a.shiftKey);
            if (this._aspectRatio || a.shiftKey)
                c = this._updateRatio(c, a);
            c = this._respectSize(c, a);
            this._updateCache(c);
            this._propagate("resize", a);
            c = this._applyChanges();
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            e.isEmptyObject(c) || (this._updatePrevProperties(),
            this._trigger("resize", a, this.ui()),
            this._applyChanges());
            return !1
        },
        _mouseStop: function(a) {
            this.resizing = !1;
            var b, c = this.options;
            if (this._helper) {
                var d = this._proportionallyResizeElements;
                d = (b = d.length && /textarea/i.test(d[0].nodeName)) && this._hasScroll(d[0], "left") ? 0 : this.sizeDiff.height;
                b = b ? 0 : this.sizeDiff.width;
                b = {
                    width: this.helper.width() - b,
                    height: this.helper.height() - d
                };
                d = parseFloat(this.element.css("left")) + (this.position.left - this.originalPosition.left) || null;
                var f = parseFloat(this.element.css("top")) + (this.position.top - this.originalPosition.top) || null;
                c.animate || this.element.css(e.extend(b, {
                    top: f,
                    left: d
                }));
                this.helper.height(this.size.height);
                this.helper.width(this.size.width);
                this._helper && !c.animate && this._proportionallyResize()
            }
            e("body").css("cursor", "auto");
            this._removeClass("ui-resizable-resizing");
            this._propagate("stop", a);
            this._helper && this.helper.remove();
            return !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var a = {};
            this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px");
            this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px");
            this.size.width !== this.prevSize.width && (a.width = this.size.width + "px");
            this.size.height !== this.prevSize.height && (a.height = this.size.height + "px");
            this.helper.css(a);
            return a
        },
        _updateVirtualBoundaries: function(a) {
            var b = this.options;
            b = {
                minWidth: this._isNumber(b.minWidth) ? b.minWidth : 0,
                maxWidth: this._isNumber(b.maxWidth) ? b.maxWidth : Infinity,
                minHeight: this._isNumber(b.minHeight) ? b.minHeight : 0,
                maxHeight: this._isNumber(b.maxHeight) ? b.maxHeight : Infinity
            };
            if (this._aspectRatio || a) {
                a = b.minHeight * this.aspectRatio;
                var c = b.minWidth / this.aspectRatio;
                var d = b.maxHeight * this.aspectRatio;
                var f = b.maxWidth / this.aspectRatio;
                a > b.minWidth && (b.minWidth = a);
                c > b.minHeight && (b.minHeight = c);
                d < b.maxWidth && (b.maxWidth = d);
                f < b.maxHeight && (b.maxHeight = f)
            }
            this._vBoundaries = b
        },
        _updateCache: function(a) {
            this.offset = this.helper.offset();
            this._isNumber(a.left) && (this.position.left = a.left);
            this._isNumber(a.top) && (this.position.top = a.top);
            this._isNumber(a.height) && (this.size.height = a.height);
            this._isNumber(a.width) && (this.size.width = a.width)
        },
        _updateRatio: function(a) {
            var b = this.position
              , c = this.size
              , d = this.axis;
            this._isNumber(a.height) ? a.width = a.height * this.aspectRatio : this._isNumber(a.width) && (a.height = a.width / this.aspectRatio);
            "sw" === d && (a.left = b.left + (c.width - a.width),
            a.top = null);
            "nw" === d && (a.top = b.top + (c.height - a.height),
            a.left = b.left + (c.width - a.width));
            return a
        },
        _respectSize: function(a) {
            var b = this._vBoundaries
              , c = this.axis
              , d = this._isNumber(a.width) && b.maxWidth && b.maxWidth < a.width
              , f = this._isNumber(a.height) && b.maxHeight && b.maxHeight < a.height
              , g = this._isNumber(a.width) && b.minWidth && b.minWidth > a.width
              , h = this._isNumber(a.height) && b.minHeight && b.minHeight > a.height
              , l = this.originalPosition.left + this.originalSize.width
              , k = this.originalPosition.top + this.originalSize.height
              , n = /sw|nw|w/.test(c);
            c = /nw|ne|n/.test(c);
            g && (a.width = b.minWidth);
            h && (a.height = b.minHeight);
            d && (a.width = b.maxWidth);
            f && (a.height = b.maxHeight);
            g && n && (a.left = l - b.minWidth);
            d && n && (a.left = l - b.maxWidth);
            h && c && (a.top = k - b.minHeight);
            f && c && (a.top = k - b.maxHeight);
            a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null;
            return a
        },
        _getPaddingPlusBorderDimensions: function(a) {
            var b = 0
              , c = []
              , d = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")];
            for (a = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")]; 4 > b; b++)
                c[b] = parseFloat(d[b]) || 0,
                c[b] += parseFloat(a[b]) || 0;
            return {
                height: c[0] + c[2],
                width: c[1] + c[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var a, b = 0, c = this.helper || this.element; b < this._proportionallyResizeElements.length; b++)
                    a = this._proportionallyResizeElements[b],
                    this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(a)),
                    a.css({
                        height: c.height() - this.outerDimensions.height || 0,
                        width: c.width() - this.outerDimensions.width || 0
                    })
        },
        _renderProxy: function() {
            var a = this.options;
            this.elementOffset = this.element.offset();
            this._helper ? (this.helper = this.helper || e("\x3cdiv\x3e\x3c/div\x3e").css({
                overflow: "hidden"
            }),
            this._addClass(this.helper, this._helper),
            this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++a.zIndex
            }),
            this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(a, b) {
                return {
                    width: this.originalSize.width + b
                }
            },
            w: function(a, b) {
                return {
                    left: this.originalPosition.left + b,
                    width: this.originalSize.width - b
                }
            },
            n: function(a, b, c) {
                return {
                    top: this.originalPosition.top + c,
                    height: this.originalSize.height - c
                }
            },
            s: function(a, b, c) {
                return {
                    height: this.originalSize.height + c
                }
            },
            se: function(a, b, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [a, b, c]))
            },
            sw: function(a, b, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [a, b, c]))
            },
            ne: function(a, b, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [a, b, c]))
            },
            nw: function(a, b, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [a, b, c]))
            }
        },
        _propagate: function(a, b) {
            e.ui.plugin.call(this, a, [b, this.ui()]);
            "resize" !== a && this._trigger(a, b, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    e.ui.plugin.add("resizable", "animate", {
        stop: function(a) {
            var b = e(this).resizable("instance")
              , c = b.options
              , d = b._proportionallyResizeElements
              , f = d.length && /textarea/i.test(d[0].nodeName)
              , g = f && b._hasScroll(d[0], "left") ? 0 : b.sizeDiff.height;
            f = {
                width: b.size.width - (f ? 0 : b.sizeDiff.width),
                height: b.size.height - g
            };
            g = parseFloat(b.element.css("left")) + (b.position.left - b.originalPosition.left) || null;
            var h = parseFloat(b.element.css("top")) + (b.position.top - b.originalPosition.top) || null;
            b.element.animate(e.extend(f, h && g ? {
                top: h,
                left: g
            } : {}), {
                duration: c.animateDuration,
                easing: c.animateEasing,
                step: function() {
                    var l = {
                        width: parseFloat(b.element.css("width")),
                        height: parseFloat(b.element.css("height")),
                        top: parseFloat(b.element.css("top")),
                        left: parseFloat(b.element.css("left"))
                    };
                    d && d.length && e(d[0]).css({
                        width: l.width,
                        height: l.height
                    });
                    b._updateCache(l);
                    b._propagate("resize", a)
                }
            })
        }
    });
    e.ui.plugin.add("resizable", "containment", {
        start: function() {
            var a = e(this).resizable("instance")
              , b = a.element;
            var c = a.options.containment;
            if (b = c instanceof e ? c.get(0) : /parent/.test(c) ? b.parent().get(0) : c)
                if (a.containerElement = e(b),
                /document/.test(c) || c === document)
                    a.containerOffset = {
                        left: 0,
                        top: 0
                    },
                    a.containerPosition = {
                        left: 0,
                        top: 0
                    },
                    a.parentData = {
                        element: e(document),
                        left: 0,
                        top: 0,
                        width: e(document).width(),
                        height: e(document).height() || document.body.parentNode.scrollHeight
                    };
                else {
                    var d = e(b);
                    var f = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function(l, k) {
                        f[l] = a._num(d.css("padding" + k))
                    });
                    a.containerOffset = d.offset();
                    a.containerPosition = d.position();
                    a.containerSize = {
                        height: d.innerHeight() - f[3],
                        width: d.innerWidth() - f[1]
                    };
                    c = a.containerOffset;
                    var g = a.containerSize.height;
                    var h = a.containerSize.width;
                    h = a._hasScroll(b, "left") ? b.scrollWidth : h;
                    g = a._hasScroll(b) ? b.scrollHeight : g;
                    a.parentData = {
                        element: b,
                        left: c.left,
                        top: c.top,
                        width: h,
                        height: g
                    }
                }
        },
        resize: function(a) {
            var b = e(this).resizable("instance");
            var c = b.options;
            var d = b.containerOffset;
            var f = b.position;
            a = b._aspectRatio || a.shiftKey;
            var g = {
                top: 0,
                left: 0
            }
              , h = b.containerElement
              , l = !0;
            h[0] !== document && /static/.test(h.css("position")) && (g = d);
            f.left < (b._helper ? d.left : 0) && (b.size.width += b._helper ? b.position.left - d.left : b.position.left - g.left,
            a && (b.size.height = b.size.width / b.aspectRatio,
            l = !1),
            b.position.left = c.helper ? d.left : 0);
            f.top < (b._helper ? d.top : 0) && (b.size.height += b._helper ? b.position.top - d.top : b.position.top,
            a && (b.size.width = b.size.height * b.aspectRatio,
            l = !1),
            b.position.top = b._helper ? d.top : 0);
            c = b.containerElement.get(0) === b.element.parent().get(0);
            f = /relative|absolute/.test(b.containerElement.css("position"));
            c && f ? (b.offset.left = b.parentData.left + b.position.left,
            b.offset.top = b.parentData.top + b.position.top) : (b.offset.left = b.element.offset().left,
            b.offset.top = b.element.offset().top);
            c = Math.abs(b.sizeDiff.width + (b._helper ? b.offset.left - g.left : b.offset.left - d.left));
            d = Math.abs(b.sizeDiff.height + (b._helper ? b.offset.top - g.top : b.offset.top - d.top));
            c + b.size.width >= b.parentData.width && (b.size.width = b.parentData.width - c,
            a && (b.size.height = b.size.width / b.aspectRatio,
            l = !1));
            d + b.size.height >= b.parentData.height && (b.size.height = b.parentData.height - d,
            a && (b.size.width = b.size.height * b.aspectRatio,
            l = !1));
            l || (b.position.left = b.prevPosition.left,
            b.position.top = b.prevPosition.top,
            b.size.width = b.prevSize.width,
            b.size.height = b.prevSize.height)
        },
        stop: function() {
            var a = e(this).resizable("instance")
              , b = a.options
              , c = a.containerOffset
              , d = a.containerPosition
              , f = a.containerElement
              , g = e(a.helper)
              , h = g.offset()
              , l = g.outerWidth() - a.sizeDiff.width;
            g = g.outerHeight() - a.sizeDiff.height;
            a._helper && !b.animate && /relative/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: l,
                height: g
            });
            a._helper && !b.animate && /static/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: l,
                height: g
            })
        }
    });
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var a = e(this).resizable("instance").options;
            e(a.alsoResize).each(function() {
                var b = e(this);
                b.data("ui-resizable-alsoresize", {
                    width: parseFloat(b.width()),
                    height: parseFloat(b.height()),
                    left: parseFloat(b.css("left")),
                    top: parseFloat(b.css("top"))
                })
            })
        },
        resize: function(a, b) {
            a = e(this).resizable("instance");
            var c = a.originalSize
              , d = a.originalPosition
              , f = {
                height: a.size.height - c.height || 0,
                width: a.size.width - c.width || 0,
                top: a.position.top - d.top || 0,
                left: a.position.left - d.left || 0
            };
            e(a.options.alsoResize).each(function() {
                var g = e(this)
                  , h = e(this).data("ui-resizable-alsoresize")
                  , l = {}
                  , k = g.parents(b.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                e.each(k, function(n, r) {
                    (n = (h[r] || 0) + (f[r] || 0)) && 0 <= n && (l[r] = n || null)
                });
                g.css(l)
            })
        },
        stop: function() {
            e(this).removeData("ui-resizable-alsoresize")
        }
    });
    e.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var a = e(this).resizable("instance")
              , b = a.size;
            a.ghost = a.originalElement.clone();
            a.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: b.height,
                width: b.width,
                margin: 0,
                left: 0,
                top: 0
            });
            a._addClass(a.ghost, "ui-resizable-ghost");
            !1 !== e.uiBackCompat && "string" === typeof a.options.ghost && a.ghost.addClass(this.options.ghost);
            a.ghost.appendTo(a.helper)
        },
        resize: function() {
            var a = e(this).resizable("instance");
            a.ghost && a.ghost.css({
                position: "relative",
                height: a.size.height,
                width: a.size.width
            })
        },
        stop: function() {
            var a = e(this).resizable("instance");
            a.ghost && a.helper && a.helper.get(0).removeChild(a.ghost.get(0))
        }
    });
    e.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var a = e(this).resizable("instance")
              , b = a.options
              , c = a.size
              , d = a.originalSize
              , f = a.originalPosition
              , g = a.axis
              , h = "number" === typeof b.grid ? [b.grid, b.grid] : b.grid
              , l = h[0] || 1
              , k = h[1] || 1
              , n = Math.round((c.width - d.width) / l) * l;
            c = Math.round((c.height - d.height) / k) * k;
            var r = d.width + n
              , m = d.height + c
              , p = b.maxWidth && b.maxWidth < r
              , q = b.maxHeight && b.maxHeight < m
              , x = b.minWidth && b.minWidth > r
              , z = b.minHeight && b.minHeight > m;
            b.grid = h;
            x && (r += l);
            z && (m += k);
            p && (r -= l);
            q && (m -= k);
            if (/^(se|s|e)$/.test(g))
                a.size.width = r,
                a.size.height = m;
            else if (/^(ne)$/.test(g))
                a.size.width = r,
                a.size.height = m,
                a.position.top = f.top - c;
            else if (/^(sw)$/.test(g))
                a.size.width = r,
                a.size.height = m,
                a.position.left = f.left - n;
            else {
                if (0 >= m - k || 0 >= r - l)
                    var C = a._getPaddingPlusBorderDimensions(this);
                0 < m - k ? (a.size.height = m,
                a.position.top = f.top - c) : (m = k - C.height,
                a.size.height = m,
                a.position.top = f.top + d.height - m);
                0 < r - l ? (a.size.width = r,
                a.position.left = f.left - n) : (r = l - C.width,
                a.size.width = r,
                a.position.left = f.left + d.width - r)
            }
        }
    });
    e.widget("ui.selectable", e.ui.mouse, {
        version: "1.13.2",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var a = this;
            this._addClass("ui-selectable");
            this.dragged = !1;
            this.refresh = function() {
                a.elementPos = e(a.element[0]).offset();
                a.selectees = e(a.options.filter, a.element[0]);
                a._addClass(a.selectees, "ui-selectee");
                a.selectees.each(function() {
                    var b = e(this)
                      , c = b.offset()
                      , d = c.left - a.elementPos.left;
                    c = c.top - a.elementPos.top;
                    e.data(this, "selectable-item", {
                        element: this,
                        $element: b,
                        left: d,
                        top: c,
                        right: d + b.outerWidth(),
                        bottom: c + b.outerHeight(),
                        startselected: !1,
                        selected: b.hasClass("ui-selected"),
                        selecting: b.hasClass("ui-selecting"),
                        unselecting: b.hasClass("ui-unselecting")
                    })
                })
            }
            ;
            this.refresh();
            this._mouseInit();
            this.helper = e("\x3cdiv\x3e");
            this._addClass(this.helper, "ui-selectable-helper")
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item");
            this._mouseDestroy()
        },
        _mouseStart: function(a) {
            var b = this
              , c = this.options;
            this.opos = [a.pageX, a.pageY];
            this.elementPos = e(this.element[0]).offset();
            this.options.disabled || (this.selectees = e(c.filter, this.element[0]),
            this._trigger("start", a),
            e(c.appendTo).append(this.helper),
            this.helper.css({
                left: a.pageX,
                top: a.pageY,
                width: 0,
                height: 0
            }),
            c.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function() {
                var d = e.data(this, "selectable-item");
                d.startselected = !0;
                a.metaKey || a.ctrlKey || (b._removeClass(d.$element, "ui-selected"),
                d.selected = !1,
                b._addClass(d.$element, "ui-unselecting"),
                d.unselecting = !0,
                b._trigger("unselecting", a, {
                    unselecting: d.element
                }))
            }),
            e(a.target).parents().addBack().each(function() {
                var d = e.data(this, "selectable-item");
                if (d) {
                    var f = !a.metaKey && !a.ctrlKey || !d.$element.hasClass("ui-selected");
                    b._removeClass(d.$element, f ? "ui-unselecting" : "ui-selected")._addClass(d.$element, f ? "ui-selecting" : "ui-unselecting");
                    d.unselecting = !f;
                    d.selecting = f;
                    (d.selected = f) ? b._trigger("selecting", a, {
                        selecting: d.element
                    }) : b._trigger("unselecting", a, {
                        unselecting: d.element
                    });
                    return !1
                }
            }))
        },
        _mouseDrag: function(a) {
            this.dragged = !0;
            if (!this.options.disabled) {
                var b = this
                  , c = this.options
                  , d = this.opos[0]
                  , f = this.opos[1]
                  , g = a.pageX
                  , h = a.pageY;
                if (d > g) {
                    var l = g;
                    g = d;
                    d = l
                }
                f > h && (l = h,
                h = f,
                f = l);
                this.helper.css({
                    left: d,
                    top: f,
                    width: g - d,
                    height: h - f
                });
                this.selectees.each(function() {
                    var k = e.data(this, "selectable-item")
                      , n = !1;
                    if (k && k.element !== b.element[0]) {
                        var r = k.left + b.elementPos.left;
                        var m = k.right + b.elementPos.left;
                        var p = k.top + b.elementPos.top;
                        var q = k.bottom + b.elementPos.top;
                        "touch" === c.tolerance ? n = !(r > g || m < d || p > h || q < f) : "fit" === c.tolerance && (n = r > d && m < g && p > f && q < h);
                        n ? (k.selected && (b._removeClass(k.$element, "ui-selected"),
                        k.selected = !1),
                        k.unselecting && (b._removeClass(k.$element, "ui-unselecting"),
                        k.unselecting = !1),
                        k.selecting || (b._addClass(k.$element, "ui-selecting"),
                        k.selecting = !0,
                        b._trigger("selecting", a, {
                            selecting: k.element
                        }))) : (k.selecting && ((a.metaKey || a.ctrlKey) && k.startselected ? (b._removeClass(k.$element, "ui-selecting"),
                        k.selecting = !1,
                        b._addClass(k.$element, "ui-selected"),
                        k.selected = !0) : (b._removeClass(k.$element, "ui-selecting"),
                        k.selecting = !1,
                        k.startselected && (b._addClass(k.$element, "ui-unselecting"),
                        k.unselecting = !0),
                        b._trigger("unselecting", a, {
                            unselecting: k.element
                        }))),
                        !k.selected || a.metaKey || a.ctrlKey || k.startselected || (b._removeClass(k.$element, "ui-selected"),
                        k.selected = !1,
                        b._addClass(k.$element, "ui-unselecting"),
                        k.unselecting = !0,
                        b._trigger("unselecting", a, {
                            unselecting: k.element
                        })))
                    }
                });
                return !1
            }
        },
        _mouseStop: function(a) {
            var b = this;
            this.dragged = !1;
            e(".ui-unselecting", this.element[0]).each(function() {
                var c = e.data(this, "selectable-item");
                b._removeClass(c.$element, "ui-unselecting");
                c.unselecting = !1;
                c.startselected = !1;
                b._trigger("unselected", a, {
                    unselected: c.element
                })
            });
            e(".ui-selecting", this.element[0]).each(function() {
                var c = e.data(this, "selectable-item");
                b._removeClass(c.$element, "ui-selecting")._addClass(c.$element, "ui-selected");
                c.selecting = !1;
                c.selected = !0;
                c.startselected = !0;
                b._trigger("selected", a, {
                    selected: c.element
                })
            });
            this._trigger("stop", a);
            this.helper.remove();
            return !1
        }
    });
    e.widget("ui.sortable", e.ui.mouse, {
        version: "1.13.2",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "\x3e *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(a, b, c) {
            return a >= b && a < b + c
        },
        _isFloating: function(a) {
            return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
        },
        _create: function() {
            this.containerCache = {};
            this._addClass("ui-sortable");
            this.refresh();
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = !0
        },
        _setOption: function(a, b) {
            this._super(a, b);
            "handle" === a && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            var a = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
            e.each(this.items, function() {
                a._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
            })
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var a = this.items.length - 1; 0 <= a; a--)
                this.items[a].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(a, b) {
            var c = null
              , d = !1
              , f = this;
            if (this.reverting || this.options.disabled || "static" === this.options.type)
                return !1;
            this._refreshItems(a);
            e(a.target).parents().each(function() {
                if (e.data(this, f.widgetName + "-item") === f)
                    return c = e(this),
                    !1
            });
            e.data(a.target, f.widgetName + "-item") === f && (c = e(a.target));
            if (!c || this.options.handle && !b && (e(this.options.handle, c).find("*").addBack().each(function() {
                this === a.target && (d = !0)
            }),
            !d))
                return !1;
            this.currentItem = c;
            this._removeCurrentsFromItems();
            return !0
        },
        _mouseStart: function(a, b, c) {
            b = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.appendTo = e("parent" !== b.appendTo ? b.appendTo : this.currentItem.parent());
            this.helper = this._createHelper(a);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            e.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            this.scrollParent = this.placeholder.scrollParent();
            e.extend(this.offset, {
                parent: this._getParentOffset()
            });
            b.containment && this._setContainment();
            if (b.cursor && "auto" !== b.cursor) {
                var d = this.document.find("body");
                this.storedCursor = d.css("cursor");
                d.css("cursor", b.cursor);
                this.storedStylesheet = e("\x3cstyle\x3e*{ cursor: " + b.cursor + " !important; }\x3c/style\x3e").appendTo(d)
            }
            b.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", b.zIndex));
            b.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", b.opacity));
            this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset());
            this._trigger("start", a, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!c)
                for (c = this.containers.length - 1; 0 <= c; c--)
                    this.containers[c]._trigger("activate", a, this._uiHash(this));
            e.ui.ddmanager && (e.ui.ddmanager.current = this);
            e.ui.ddmanager && !b.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, a);
            this.dragging = !0;
            this._addClass(this.helper, "ui-sortable-helper");
            this.helper.parent().is(this.appendTo) || (this.helper.detach().appendTo(this.appendTo),
            this.offset.parent = this._getParentOffset());
            this.position = this.originalPosition = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            this.lastPositionAbs = this.positionAbs = this._convertPositionTo("absolute");
            this._mouseDrag(a);
            return !0
        },
        _scroll: function(a) {
            var b = this.options
              , c = !1;
            this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - a.pageY < b.scrollSensitivity ? this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + b.scrollSpeed : a.pageY - this.overflowOffset.top < b.scrollSensitivity && (this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - b.scrollSpeed),
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - a.pageX < b.scrollSensitivity ? this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + b.scrollSpeed : a.pageX - this.overflowOffset.left < b.scrollSensitivity && (this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - b.scrollSpeed)) : (a.pageY - this.document.scrollTop() < b.scrollSensitivity ? c = this.document.scrollTop(this.document.scrollTop() - b.scrollSpeed) : this.window.height() - (a.pageY - this.document.scrollTop()) < b.scrollSensitivity && (c = this.document.scrollTop(this.document.scrollTop() + b.scrollSpeed)),
            a.pageX - this.document.scrollLeft() < b.scrollSensitivity ? c = this.document.scrollLeft(this.document.scrollLeft() - b.scrollSpeed) : this.window.width() - (a.pageX - this.document.scrollLeft()) < b.scrollSensitivity && (c = this.document.scrollLeft(this.document.scrollLeft() + b.scrollSpeed)));
            return c
        },
        _mouseDrag: function(a) {
            var b;
            var c = this.options;
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute");
            this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px");
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px");
            c.scroll && !1 !== this._scroll(a) && (this._refreshItemPositions(!0),
            e.ui.ddmanager && !c.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, a));
            this.dragDirection = {
                vertical: this._getDragVerticalDirection(),
                horizontal: this._getDragHorizontalDirection()
            };
            for (c = this.items.length - 1; 0 <= c; c--) {
                var d = this.items[c];
                var f = d.item[0];
                if ((b = this._intersectsWithPointer(d)) && d.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[1 === b ? "next" : "prev"]()[0] !== f && !e.contains(this.placeholder[0], f) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], f) : 1)) {
                    this.direction = 1 === b ? "down" : "up";
                    if ("pointer" === this.options.tolerance || this._intersectsWithSides(d))
                        this._rearrange(a, d);
                    else
                        break;
                    this._trigger("change", a, this._uiHash());
                    break
                }
            }
            this._contactContainers(a);
            e.ui.ddmanager && e.ui.ddmanager.drag(this, a);
            this._trigger("sort", a, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return !1
        },
        _mouseStop: function(a, b) {
            if (a) {
                e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, a);
                if (this.options.revert) {
                    var c = this;
                    b = this.placeholder.offset();
                    var d = this.options.axis
                      , f = {};
                    d && "x" !== d || (f.left = b.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft));
                    d && "y" !== d || (f.top = b.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop));
                    this.reverting = !0;
                    e(this.helper).animate(f, parseInt(this.options.revert, 10) || 500, function() {
                        c._clear(a)
                    })
                } else
                    this._clear(a, b);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new e.Event("mouseup",{
                    target: null
                }));
                "original" === this.options.helper ? (this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var a = this.containers.length - 1; 0 <= a; a--)
                    this.containers[a]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[a].containerCache.over && (this.containers[a]._trigger("out", null, this._uiHash(this)),
                    this.containers[a].containerCache.over = 0)
            }
            this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
            e.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }),
            this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem));
            return this
        },
        serialize: function(a) {
            var b = this._getItemsAsjQuery(a && a.connected)
              , c = [];
            a = a || {};
            e(b).each(function() {
                var d = (e(a.item || this).attr(a.attribute || "id") || "").match(a.expression || /(.+)[\-=_](.+)/);
                d && c.push((a.key || d[1] + "[]") + "\x3d" + (a.key && a.expression ? d[1] : d[2]))
            });
            !c.length && a.key && c.push(a.key + "\x3d");
            return c.join("\x26")
        },
        toArray: function(a) {
            var b = this._getItemsAsjQuery(a && a.connected)
              , c = [];
            a = a || {};
            b.each(function() {
                c.push(e(a.item || this).attr(a.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function(a) {
            var b = this.positionAbs.left
              , c = b + this.helperProportions.width
              , d = this.positionAbs.top
              , f = d + this.helperProportions.height
              , g = a.left
              , h = g + a.width
              , l = a.top
              , k = l + a.height
              , n = this.offset.click.top
              , r = this.offset.click.left;
            n = "x" === this.options.axis || d + n > l && d + n < k;
            r = "y" === this.options.axis || b + r > g && b + r < h;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n && r : g < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < h && l < d + this.helperProportions.height / 2 && f - this.helperProportions.height / 2 < k
        },
        _intersectsWithPointer: function(a) {
            var b = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height);
            a = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width);
            if (!b || !a)
                return !1;
            b = this.dragDirection.vertical;
            a = this.dragDirection.horizontal;
            return this.floating ? "right" === a || "down" === b ? 2 : 1 : b && ("down" === b ? 2 : 1)
        },
        _intersectsWithSides: function(a) {
            var b = this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height);
            a = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width);
            var c = this.dragDirection.vertical
              , d = this.dragDirection.horizontal;
            return this.floating && d ? "right" === d && a || "left" === d && !a : c && ("down" === c && b || "up" === c && !b)
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== a && (0 < a ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== a && (0 < a ? "right" : "left")
        },
        refresh: function(a) {
            this._refreshItems(a);
            this._setHandleClassName();
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function(a) {
            function b() {
                f.push(this)
            }
            var c, d, f = [], g = [], h = this._connectWith();
            if (h && a)
                for (a = h.length - 1; 0 <= a; a--) {
                    var l = e(h[a], this.document[0]);
                    for (c = l.length - 1; 0 <= c; c--)
                        (d = e.data(l[c], this.widgetFullName)) && d !== this && !d.options.disabled && g.push(["function" === typeof d.options.items ? d.options.items.call(d.element) : e(d.options.items, d.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), d])
                }
            g.push(["function" === typeof this.options.items ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (a = g.length - 1; 0 <= a; a--)
                g[a][0].each(b);
            return e(f)
        },
        _removeCurrentsFromItems: function() {
            var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = e.grep(this.items, function(b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b.item[0])
                        return !1;
                return !0
            })
        },
        _refreshItems: function(a) {
            this.items = [];
            this.containers = [this];
            var b, c, d, f, g = this.items, h = [["function" === typeof this.options.items ? this.options.items.call(this.element[0], a, {
                item: this.currentItem
            }) : e(this.options.items, this.element), this]];
            if ((f = this._connectWith()) && this.ready)
                for (b = f.length - 1; 0 <= b; b--) {
                    var l = e(f[b], this.document[0]);
                    for (c = l.length - 1; 0 <= c; c--)
                        (d = e.data(l[c], this.widgetFullName)) && d !== this && !d.options.disabled && (h.push(["function" === typeof d.options.items ? d.options.items.call(d.element[0], a, {
                            item: this.currentItem
                        }) : e(d.options.items, d.element), d]),
                        this.containers.push(d))
                }
            for (b = h.length - 1; 0 <= b; b--)
                for (a = h[b][1],
                l = h[b][0],
                c = 0,
                f = l.length; c < f; c++)
                    d = e(l[c]),
                    d.data(this.widgetName + "-item", a),
                    g.push({
                        item: d,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
        },
        _refreshItemPositions: function(a) {
            var b;
            for (b = this.items.length - 1; 0 <= b; b--) {
                var c = this.items[b];
                if (!this.currentContainer || c.instance === this.currentContainer || c.item[0] === this.currentItem[0]) {
                    var d = this.options.toleranceElement ? e(this.options.toleranceElement, c.item) : c.item;
                    a || (c.width = d.outerWidth(),
                    c.height = d.outerHeight());
                    d = d.offset();
                    c.left = d.left;
                    c.top = d.top
                }
            }
        },
        refreshPositions: function(a) {
            this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1;
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            this._refreshItemPositions(a);
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (a = this.containers.length - 1; 0 <= a; a--) {
                    var b = this.containers[a].element.offset();
                    this.containers[a].containerCache.left = b.left;
                    this.containers[a].containerCache.top = b.top;
                    this.containers[a].containerCache.width = this.containers[a].element.outerWidth();
                    this.containers[a].containerCache.height = this.containers[a].element.outerHeight()
                }
            return this
        },
        _createPlaceholder: function(a) {
            a = a || this;
            var b = a.options;
            if (!b.placeholder || b.placeholder.constructor === String) {
                var c = b.placeholder;
                var d = a.currentItem[0].nodeName.toLowerCase();
                b.placeholder = {
                    element: function() {
                        var f = e("\x3c" + d + "\x3e", a.document[0]);
                        a._addClass(f, "ui-sortable-placeholder", c || a.currentItem[0].className)._removeClass(f, "ui-sortable-helper");
                        "tbody" === d ? a._createTrPlaceholder(a.currentItem.find("tr").eq(0), e("\x3ctr\x3e", a.document[0]).appendTo(f)) : "tr" === d ? a._createTrPlaceholder(a.currentItem, f) : "img" === d && f.attr("src", a.currentItem.attr("src"));
                        c || f.css("visibility", "hidden");
                        return f
                    },
                    update: function(f, g) {
                        if (!c || b.forcePlaceholderSize)
                            g.height() && (!b.forcePlaceholderSize || "tbody" !== d && "tr" !== d) || g.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10)),
                            g.width() || g.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") || 0, 10))
                    }
                }
            }
            a.placeholder = e(b.placeholder.element.call(a.element, a.currentItem));
            a.currentItem.after(a.placeholder);
            b.placeholder.update(a, a.placeholder)
        },
        _createTrPlaceholder: function(a, b) {
            var c = this;
            a.children().each(function() {
                e("\x3ctd\x3e\x26#160;\x3c/td\x3e", c.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(b)
            })
        },
        _contactContainers: function(a) {
            var b, c, d, f = d = null;
            for (b = this.containers.length - 1; 0 <= b; b--)
                e.contains(this.currentItem[0], this.containers[b].element[0]) || (this._intersectsWith(this.containers[b].containerCache) ? d && e.contains(this.containers[b].element[0], d.element[0]) || (d = this.containers[b],
                f = b) : this.containers[b].containerCache.over && (this.containers[b]._trigger("out", a, this._uiHash(this)),
                this.containers[b].containerCache.over = 0));
            if (d)
                if (1 === this.containers.length)
                    this.containers[f].containerCache.over || (this.containers[f]._trigger("over", a, this._uiHash(this)),
                    this.containers[f].containerCache.over = 1);
                else {
                    b = 1E4;
                    var g = null;
                    d = (c = d.floating || this._isFloating(this.currentItem)) ? "left" : "top";
                    var h = c ? "width" : "height";
                    var l = c ? "pageX" : "pageY";
                    for (c = this.items.length - 1; 0 <= c; c--)
                        if (e.contains(this.containers[f].element[0], this.items[c].item[0]) && this.items[c].item[0] !== this.currentItem[0]) {
                            var k = this.items[c].item.offset()[d];
                            var n = !1;
                            a[l] - k > this.items[c][h] / 2 && (n = !0);
                            Math.abs(a[l] - k) < b && (b = Math.abs(a[l] - k),
                            g = this.items[c],
                            this.direction = n ? "up" : "down")
                        }
                    if (g || this.options.dropOnEmpty)
                        this.currentContainer === this.containers[f] ? this.currentContainer.containerCache.over || (this.containers[f]._trigger("over", a, this._uiHash()),
                        this.currentContainer.containerCache.over = 1) : (g ? this._rearrange(a, g, null, !0) : this._rearrange(a, null, this.containers[f].element, !0),
                        this._trigger("change", a, this._uiHash()),
                        this.containers[f]._trigger("change", a, this._uiHash(this)),
                        this.currentContainer = this.containers[f],
                        this.options.placeholder.update(this.currentContainer, this.placeholder),
                        this.scrollParent = this.placeholder.scrollParent(),
                        this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
                        this.containers[f]._trigger("over", a, this._uiHash(this)),
                        this.containers[f].containerCache.over = 1)
                }
        },
        _createHelper: function(a) {
            var b = this.options;
            a = "function" === typeof b.helper ? e(b.helper.apply(this.element[0], [a, this.currentItem])) : "clone" === b.helper ? this.currentItem.clone() : this.currentItem;
            a.parents("body").length || this.appendTo[0].appendChild(a[0]);
            a[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            });
            a[0].style.width && !b.forceHelperSize || a.width(this.currentItem.width());
            a[0].style.height && !b.forceHelperSize || a.height(this.currentItem.height());
            return a
        },
        _adjustOffsetFromHelper: function(a) {
            "string" === typeof a && (a = a.split(" "));
            Array.isArray(a) && (a = {
                left: +a[0],
                top: +a[1] || 0
            });
            "left"in a && (this.offset.click.left = a.left + this.margins.left);
            "right"in a && (this.offset.click.left = this.helperProportions.width - a.right + this.margins.left);
            "top"in a && (this.offset.click.top = a.top + this.margins.top);
            "bottom"in a && (this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) && (a.left += this.scrollParent.scrollLeft(),
            a.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie)
                a = {
                    top: 0,
                    left: 0
                };
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var a = this.options;
            "parent" === a.containment && (a.containment = this.helper[0].parentNode);
            if ("document" === a.containment || "window" === a.containment)
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === a.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === a.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(a.containment)) {
                var b = e(a.containment)[0];
                a = e(a.containment).offset();
                var c = "hidden" !== e(b).css("overflow");
                this.containment = [a.left + (parseInt(e(b).css("borderLeftWidth"), 10) || 0) + (parseInt(e(b).css("paddingLeft"), 10) || 0) - this.margins.left, a.top + (parseInt(e(b).css("borderTopWidth"), 10) || 0) + (parseInt(e(b).css("paddingTop"), 10) || 0) - this.margins.top, a.left + (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(e(b).css("borderLeftWidth"), 10) || 0) - (parseInt(e(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, a.top + (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(e(b).css("borderTopWidth"), 10) || 0) - (parseInt(e(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(a, b) {
            b || (b = this.position);
            a = "absolute" === a ? 1 : -1;
            var c = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , d = /(html|body)/i.test(c[0].tagName);
            return {
                top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : d ? 0 : c.scrollTop()) * a,
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : d ? 0 : c.scrollLeft()) * a
            }
        },
        _generatePosition: function(a) {
            var b = this.options;
            var c = a.pageX;
            var d = a.pageY;
            var f = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , g = /(html|body)/i.test(f[0].tagName);
            "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset());
            this.originalPosition && (this.containment && (a.pageX - this.offset.click.left < this.containment[0] && (c = this.containment[0] + this.offset.click.left),
            a.pageY - this.offset.click.top < this.containment[1] && (d = this.containment[1] + this.offset.click.top),
            a.pageX - this.offset.click.left > this.containment[2] && (c = this.containment[2] + this.offset.click.left),
            a.pageY - this.offset.click.top > this.containment[3] && (d = this.containment[3] + this.offset.click.top)),
            b.grid && (d = this.originalPageY + Math.round((d - this.originalPageY) / b.grid[1]) * b.grid[1],
            d = this.containment ? d - this.offset.click.top >= this.containment[1] && d - this.offset.click.top <= this.containment[3] ? d : d - this.offset.click.top >= this.containment[1] ? d - b.grid[1] : d + b.grid[1] : d,
            c = this.originalPageX + Math.round((c - this.originalPageX) / b.grid[0]) * b.grid[0],
            c = this.containment ? c - this.offset.click.left >= this.containment[0] && c - this.offset.click.left <= this.containment[2] ? c : c - this.offset.click.left >= this.containment[0] ? c - b.grid[0] : c + b.grid[0] : c));
            return {
                top: d - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()),
                left: c - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft())
            }
        },
        _rearrange: function(a, b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling);
            var f = this.counter = this.counter ? ++this.counter : 1;
            this._delay(function() {
                f === this.counter && this.refreshPositions(!d)
            })
        },
        _clear: function(a, b) {
            function c(g, h, l) {
                return function(k) {
                    l._trigger(g, k, h._uiHash(h))
                }
            }
            this.reverting = !1;
            var d, f = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (d in this._storedCSS)
                    if ("auto" === this._storedCSS[d] || "static" === this._storedCSS[d])
                        this._storedCSS[d] = "";
                this.currentItem.css(this._storedCSS);
                this._removeClass(this.currentItem, "ui-sortable-helper")
            } else
                this.currentItem.show();
            this.fromOutside && !b && f.push(function(g) {
                this._trigger("receive", g, this._uiHash(this.fromOutside))
            });
            !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || f.push(function(g) {
                this._trigger("update", g, this._uiHash())
            });
            this === this.currentContainer || b || (f.push(function(g) {
                this._trigger("remove", g, this._uiHash())
            }),
            f.push(function(g) {
                return function(h) {
                    g._trigger("receive", h, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)),
            f.push(function(g) {
                return function(h) {
                    g._trigger("update", h, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)));
            for (d = this.containers.length - 1; 0 <= d; d--)
                b || f.push(c("deactivate", this, this.containers[d])),
                this.containers[d].containerCache.over && (f.push(c("out", this, this.containers[d])),
                this.containers[d].containerCache.over = 0);
            this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove());
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex);
            this.dragging = !1;
            b || this._trigger("beforeStop", a, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            this.helper = null);
            if (!b) {
                for (d = 0; d < f.length; d++)
                    f[d].call(this, a);
                this._trigger("stop", a, this._uiHash())
            }
            this.fromOutside = !1;
            return !this.cancelHelperRemoval
        },
        _trigger: function() {
            !1 === e.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(a) {
            var b = a || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || e([]),
                position: b.position,
                originalPosition: b.originalPosition,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: a ? a.element : null
            }
        }
    });
    e.widget("ui.slider", e.ui.mouse, {
        version: "1.13.2",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._mouseSliding = this._keySliding = !1;
            this._animateOff = !0;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this._calculateNewMax();
            this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content");
            this._refresh();
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function() {
            var a = this.options;
            var b = this.element.find(".ui-slider-handle")
              , c = [];
            var d = a.values && a.values.length || 1;
            b.length > d && (b.slice(d).remove(),
            b = b.slice(0, d));
            for (a = b.length; a < d; a++)
                c.push("\x3cspan tabindex\x3d'0'\x3e\x3c/span\x3e");
            this.handles = b.add(e(c.join("")).appendTo(this.element));
            this._addClass(this.handles, "ui-slider-handle", "ui-state-default");
            this.handle = this.handles.eq(0);
            this.handles.each(function(f) {
                e(this).data("ui-slider-handle-index", f).attr("tabIndex", 0)
            })
        },
        _createRange: function() {
            var a = this.options;
            a.range ? (!0 === a.range && (a.values ? a.values.length && 2 !== a.values.length ? a.values = [a.values[0], a.values[0]] : Array.isArray(a.values) && (a.values = a.values.slice(0)) : a.values = [this._valueMin(), this._valueMin()]),
            this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"),
            this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = e("\x3cdiv\x3e").appendTo(this.element),
            this._addClass(this.range, "ui-slider-range")),
            "min" !== a.range && "max" !== a.range || this._addClass(this.range, "ui-slider-range-" + a.range)) : (this.range && this.range.remove(),
            this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove();
            this.range && this.range.remove();
            this._mouseDestroy()
        },
        _mouseCapture: function(a) {
            var b, c, d = this, f = this.options;
            if (f.disabled)
                return !1;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            var g = this._normValueFromMouse({
                x: a.pageX,
                y: a.pageY
            });
            var h = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function(k) {
                var n = Math.abs(g - d.values(k));
                if (h > n || h === n && (k === d._lastChangedValue || d.values(k) === f.min))
                    h = n,
                    b = e(this),
                    c = k
            });
            if (!1 === this._start(a, c))
                return !1;
            this._mouseSliding = !0;
            this._handleIndex = c;
            this._addClass(b, null, "ui-state-active");
            b.trigger("focus");
            var l = b.offset();
            this._clickOffset = e(a.target).parents().addBack().is(".ui-slider-handle") ? {
                left: a.pageX - l.left - b.width() / 2,
                top: a.pageY - l.top - b.height() / 2 - (parseInt(b.css("borderTopWidth"), 10) || 0) - (parseInt(b.css("borderBottomWidth"), 10) || 0) + (parseInt(b.css("marginTop"), 10) || 0)
            } : {
                left: 0,
                top: 0
            };
            this.handles.hasClass("ui-state-hover") || this._slide(a, c, g);
            return this._animateOff = !0
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(a) {
            var b = this._normValueFromMouse({
                x: a.pageX,
                y: a.pageY
            });
            this._slide(a, this._handleIndex, b);
            return !1
        },
        _mouseStop: function(a) {
            this._removeClass(this.handles, null, "ui-state-active");
            this._mouseSliding = !1;
            this._stop(a, this._handleIndex);
            this._change(a, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(a) {
            if ("horizontal" === this.orientation) {
                var b = this.elementSize.width;
                a = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else
                b = this.elementSize.height,
                a = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
            b = a / b;
            1 < b && (b = 1);
            0 > b && (b = 0);
            "vertical" === this.orientation && (b = 1 - b);
            a = this._valueMax() - this._valueMin();
            b = this._valueMin() + b * a;
            return this._trimAlignValue(b)
        },
        _uiHash: function(a, b, c) {
            var d = {
                handle: this.handles[a],
                handleIndex: a,
                value: void 0 !== b ? b : this.value()
            };
            this._hasMultipleValues() && (d.value = void 0 !== b ? b : this.values(a),
            d.values = c || this.values());
            return d
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length
        },
        _start: function(a, b) {
            return this._trigger("start", a, this._uiHash(b))
        },
        _slide: function(a, b, c) {
            var d = this.value()
              , f = this.values();
            if (this._hasMultipleValues()) {
                var g = this.values(b ? 0 : 1);
                d = this.values(b);
                2 === this.options.values.length && !0 === this.options.range && (c = 0 === b ? Math.min(g, c) : Math.max(g, c));
                f[b] = c
            }
            c !== d && !1 !== this._trigger("slide", a, this._uiHash(b, c, f)) && (this._hasMultipleValues() ? this.values(b, c) : this.value(c))
        },
        _stop: function(a, b) {
            this._trigger("stop", a, this._uiHash(b))
        },
        _change: function(a, b) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = b,
            this._trigger("change", a, this._uiHash(b)))
        },
        value: function(a) {
            if (arguments.length)
                this.options.value = this._trimAlignValue(a),
                this._refreshValue(),
                this._change(null, 0);
            else
                return this._value()
        },
        values: function(a, b) {
            var c;
            if (1 < arguments.length)
                this.options.values[a] = this._trimAlignValue(b),
                this._refreshValue(),
                this._change(null, a);
            else if (arguments.length)
                if (Array.isArray(arguments[0])) {
                    var d = this.options.values;
                    var f = arguments[0];
                    for (c = 0; c < d.length; c += 1)
                        d[c] = this._trimAlignValue(f[c]),
                        this._change(null, c);
                    this._refreshValue()
                } else
                    return this._hasMultipleValues() ? this._values(a) : this.value();
            else
                return this._values()
        },
        _setOption: function(a, b) {
            var c = 0;
            "range" === a && !0 === this.options.range && ("min" === b ? (this.options.value = this._values(0),
            this.options.values = null) : "max" === b && (this.options.value = this._values(this.options.values.length - 1),
            this.options.values = null));
            Array.isArray(this.options.values) && (c = this.options.values.length);
            this._super(a, b);
            switch (a) {
            case "orientation":
                this._detectOrientation();
                this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                this.options.range && this._refreshRange(b);
                this.handles.css("horizontal" === b ? "bottom" : "left", "");
                break;
            case "value":
                this._animateOff = !0;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = !1;
                break;
            case "values":
                this._animateOff = !0;
                this._refreshValue();
                for (a = c - 1; 0 <= a; a--)
                    this._change(null, a);
                this._animateOff = !1;
                break;
            case "step":
            case "min":
            case "max":
                this._animateOff = !0;
                this._calculateNewMax();
                this._refreshValue();
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0,
                this._refresh(),
                this._animateOff = !1
            }
        },
        _setOptionDisabled: function(a) {
            this._super(a);
            this._toggleClass(null, "ui-state-disabled", !!a)
        },
        _value: function() {
            var a = this.options.value;
            return a = this._trimAlignValue(a)
        },
        _values: function(a) {
            var b;
            if (arguments.length) {
                var c = this.options.values[a];
                return c = this._trimAlignValue(c)
            }
            if (this._hasMultipleValues()) {
                c = this.options.values.slice();
                for (b = 0; b < c.length; b += 1)
                    c[b] = this._trimAlignValue(c[b]);
                return c
            }
            return []
        },
        _trimAlignValue: function(a) {
            if (a <= this._valueMin())
                return this._valueMin();
            if (a >= this._valueMax())
                return this._valueMax();
            var b = 0 < this.options.step ? this.options.step : 1
              , c = (a - this._valueMin()) % b;
            a -= c;
            2 * Math.abs(c) >= b && (a += 0 < c ? b : -b);
            return parseFloat(a.toFixed(5))
        },
        _calculateNewMax: function() {
            var a = this.options.max
              , b = this._valueMin()
              , c = this.options.step;
            a = Math.round((a - b) / c) * c + b;
            a > this.options.max && (a -= c);
            this.max = parseFloat(a.toFixed(this._precision()))
        },
        _precision: function() {
            var a = this._precisionOf(this.options.step);
            null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min)));
            return a
        },
        _precisionOf: function(a) {
            a = a.toString();
            var b = a.indexOf(".");
            return -1 === b ? 0 : a.length - b - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshRange: function(a) {
            "vertical" === a && this.range.css({
                width: "",
                left: ""
            });
            "horizontal" === a && this.range.css({
                height: "",
                bottom: ""
            })
        },
        _refreshValue: function() {
            var a, b = this.options.range, c = this.options, d = this, f = this._animateOff ? !1 : c.animate, g = {};
            if (this._hasMultipleValues())
                this.handles.each(function(r) {
                    n = (d.values(r) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100;
                    g["horizontal" === d.orientation ? "left" : "bottom"] = n + "%";
                    e(this).stop(1, 1)[f ? "animate" : "css"](g, c.animate);
                    if (!0 === d.options.range)
                        if ("horizontal" === d.orientation) {
                            if (0 === r)
                                d.range.stop(1, 1)[f ? "animate" : "css"]({
                                    left: n + "%"
                                }, c.animate);
                            if (1 === r)
                                d.range[f ? "animate" : "css"]({
                                    width: n - a + "%"
                                }, {
                                    queue: !1,
                                    duration: c.animate
                                })
                        } else {
                            if (0 === r)
                                d.range.stop(1, 1)[f ? "animate" : "css"]({
                                    bottom: n + "%"
                                }, c.animate);
                            if (1 === r)
                                d.range[f ? "animate" : "css"]({
                                    height: n - a + "%"
                                }, {
                                    queue: !1,
                                    duration: c.animate
                                })
                        }
                    a = n
                });
            else {
                var h = this.value();
                var l = this._valueMin();
                var k = this._valueMax();
                var n = k !== l ? (h - l) / (k - l) * 100 : 0;
                g["horizontal" === this.orientation ? "left" : "bottom"] = n + "%";
                this.handle.stop(1, 1)[f ? "animate" : "css"](g, c.animate);
                if ("min" === b && "horizontal" === this.orientation)
                    this.range.stop(1, 1)[f ? "animate" : "css"]({
                        width: n + "%"
                    }, c.animate);
                if ("max" === b && "horizontal" === this.orientation)
                    this.range.stop(1, 1)[f ? "animate" : "css"]({
                        width: 100 - n + "%"
                    }, c.animate);
                if ("min" === b && "vertical" === this.orientation)
                    this.range.stop(1, 1)[f ? "animate" : "css"]({
                        height: n + "%"
                    }, c.animate);
                if ("max" === b && "vertical" === this.orientation)
                    this.range.stop(1, 1)[f ? "animate" : "css"]({
                        height: 100 - n + "%"
                    }, c.animate)
            }
        },
        _handleEvents: {
            keydown: function(a) {
                var b, c = e(a.target).data("ui-slider-handle-index");
                switch (a.keyCode) {
                case e.ui.keyCode.HOME:
                case e.ui.keyCode.END:
                case e.ui.keyCode.PAGE_UP:
                case e.ui.keyCode.PAGE_DOWN:
                case e.ui.keyCode.UP:
                case e.ui.keyCode.RIGHT:
                case e.ui.keyCode.DOWN:
                case e.ui.keyCode.LEFT:
                    if (a.preventDefault(),
                    !this._keySliding) {
                        this._keySliding = !0;
                        this._addClass(e(a.target), null, "ui-state-active");
                        var d = this._start(a, c);
                        if (!1 === d)
                            return
                    }
                }
                var f = this.options.step;
                d = this._hasMultipleValues() ? b = this.values(c) : b = this.value();
                switch (a.keyCode) {
                case e.ui.keyCode.HOME:
                    b = this._valueMin();
                    break;
                case e.ui.keyCode.END:
                    b = this._valueMax();
                    break;
                case e.ui.keyCode.PAGE_UP:
                    b = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case e.ui.keyCode.PAGE_DOWN:
                    b = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case e.ui.keyCode.UP:
                case e.ui.keyCode.RIGHT:
                    if (d === this._valueMax())
                        return;
                    b = this._trimAlignValue(d + f);
                    break;
                case e.ui.keyCode.DOWN:
                case e.ui.keyCode.LEFT:
                    if (d === this._valueMin())
                        return;
                    b = this._trimAlignValue(d - f)
                }
                this._slide(a, c, b)
            },
            keyup: function(a) {
                var b = e(a.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1,
                this._stop(a, b),
                this._change(a, b),
                this._removeClass(e(a.target), null, "ui-state-active"))
            }
        }
    });
    var A = e
      , X = {}
      , S = X.toString
      , G = /^([\-+])=\s*(\d+\.?\d*)/
      , R = [{
        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(a) {
            return [a[1], a[2], a[3], a[4]]
        }
    }, {
        re: /rgba?\(\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(a) {
            return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
        }
    }, {
        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/,
        parse: function(a) {
            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16), a[4] ? (parseInt(a[4], 16) / 255).toFixed(2) : 1]
        }
    }, {
        re: /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?/,
        parse: function(a) {
            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16), a[4] ? (parseInt(a[4] + a[4], 16) / 255).toFixed(2) : 1]
        }
    }, {
        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        space: "hsla",
        parse: function(a) {
            return [a[1], a[2] / 100, a[3] / 100, a[4]]
        }
    }]
      , H = A.Color = function(a, b, c, d) {
        return new A.Color.fn.parse(a,b,c,d)
    }
      , u = {
        rgba: {
            props: {
                red: {
                    idx: 0,
                    type: "byte"
                },
                green: {
                    idx: 1,
                    type: "byte"
                },
                blue: {
                    idx: 2,
                    type: "byte"
                }
            }
        },
        hsla: {
            props: {
                hue: {
                    idx: 0,
                    type: "degrees"
                },
                saturation: {
                    idx: 1,
                    type: "percent"
                },
                lightness: {
                    idx: 2,
                    type: "percent"
                }
            }
        }
    }
      , v = {
        "byte": {
            floor: !0,
            max: 255
        },
        percent: {
            max: 1
        },
        degrees: {
            mod: 360,
            floor: !0
        }
    }
      , y = H.support = {}
      , O = A("\x3cp\x3e")[0]
      , P = A.each;
    O.style.cssText = "background-color:rgba(1,1,1,.5)";
    y.rgba = -1 < O.style.backgroundColor.indexOf("rgba");
    P(u, function(a, b) {
        b.cache = "_" + a;
        b.props.alpha = {
            idx: 3,
            type: "percent",
            def: 1
        }
    });
    A.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
        X["[object " + b + "]"] = b.toLowerCase()
    });
    H.fn = A.extend(H.prototype, {
        parse: function(a, b, c, d) {
            if (void 0 === a)
                return this._rgba = [null, null, null, null],
                this;
            if (a.jquery || a.nodeType)
                a = A(a).css(b),
                b = void 0;
            var f = this
              , g = w(a)
              , h = this._rgba = [];
            void 0 !== b && (a = [a, b, c, d],
            g = "array");
            if ("string" === g)
                return this.parse(I(a) || ba._default);
            if ("array" === g)
                return P(u.rgba.props, function(l, k) {
                    h[k.idx] = B(a[k.idx], k)
                }),
                this;
            if ("object" === g)
                return a instanceof H ? P(u, function(l, k) {
                    a[k.cache] && (f[k.cache] = a[k.cache].slice())
                }) : P(u, function(l, k) {
                    var n = k.cache;
                    P(k.props, function(r, m) {
                        if (!f[n] && k.to) {
                            if ("alpha" === r || null == a[r])
                                return;
                            f[n] = k.to(f._rgba)
                        }
                        f[n][m.idx] = B(a[r], m, !0)
                    });
                    f[n] && 0 > A.inArray(null, f[n].slice(0, 3)) && (null == f[n][3] && (f[n][3] = 1),
                    k.from && (f._rgba = k.from(f[n])))
                }),
                this
        },
        is: function(a) {
            var b = H(a)
              , c = !0
              , d = this;
            P(u, function(f, g) {
                var h = b[g.cache];
                if (h) {
                    var l = d[g.cache] || g.to && g.to(d._rgba) || [];
                    P(g.props, function(k, n) {
                        if (null != h[n.idx])
                            return c = h[n.idx] === l[n.idx]
                    })
                }
                return c
            });
            return c
        },
        _space: function() {
            var a = []
              , b = this;
            P(u, function(c, d) {
                b[d.cache] && a.push(c)
            });
            return a.pop()
        },
        transition: function(a, b) {
            var c = H(a);
            a = c._space();
            var d = u[a]
              , f = 0 === this.alpha() ? H("transparent") : this
              , g = f[d.cache] || d.to(f._rgba)
              , h = g.slice();
            c = c[d.cache];
            P(d.props, function(l, k) {
                l = k.idx;
                var n = g[l]
                  , r = c[l]
                  , m = v[k.type] || {};
                null !== r && (null === n ? h[l] = r : (m.mod && (r - n > m.mod / 2 ? n += m.mod : n - r > m.mod / 2 && (n -= m.mod)),
                h[l] = B((r - n) * b + n, k)))
            });
            return this[a](h)
        },
        blend: function(a) {
            if (1 === this._rgba[3])
                return this;
            var b = this._rgba.slice()
              , c = b.pop()
              , d = H(a)._rgba;
            return H(A.map(b, function(f, g) {
                return (1 - c) * d[g] + c * f
            }))
        },
        toRgbaString: function() {
            var a = "rgba("
              , b = A.map(this._rgba, function(c, d) {
                return null != c ? c : 2 < d ? 1 : 0
            });
            1 === b[3] && (b.pop(),
            a = "rgb(");
            return a + b.join() + ")"
        },
        toHslaString: function() {
            var a = "hsla("
              , b = A.map(this.hsla(), function(c, d) {
                null == c && (c = 2 < d ? 1 : 0);
                d && 3 > d && (c = Math.round(100 * c) + "%");
                return c
            });
            1 === b[3] && (b.pop(),
            a = "hsl(");
            return a + b.join() + ")"
        },
        toHexString: function(a) {
            var b = this._rgba.slice()
              , c = b.pop();
            a && b.push(~~(255 * c));
            return "#" + A.map(b, function(d) {
                d = (d || 0).toString(16);
                return 1 === d.length ? "0" + d : d
            }).join("")
        },
        toString: function() {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
        }
    });
    H.fn.parse.prototype = H.fn;
    u.hsla.to = function(a) {
        if (null == a[0] || null == a[1] || null == a[2])
            return [null, null, null, a[3]];
        var b = a[0] / 255
          , c = a[1] / 255
          , d = a[2] / 255;
        a = a[3];
        var f = Math.max(b, c, d)
          , g = Math.min(b, c, d)
          , h = f - g
          , l = f + g
          , k = .5 * l;
        return [Math.round(g === f ? 0 : b === f ? 60 * (c - d) / h + 360 : c === f ? 60 * (d - b) / h + 120 : 60 * (b - c) / h + 240) % 360, 0 === h ? 0 : .5 >= k ? h / l : h / (2 - l), k, null == a ? 1 : a]
    }
    ;
    u.hsla.from = function(a) {
        if (null == a[0] || null == a[1] || null == a[2])
            return [null, null, null, a[3]];
        var b = a[0] / 360
          , c = a[1]
          , d = a[2];
        a = a[3];
        c = .5 >= d ? d * (1 + c) : d + c - d * c;
        d = 2 * d - c;
        return [Math.round(255 * L(d, c, b + 1 / 3)), Math.round(255 * L(d, c, b)), Math.round(255 * L(d, c, b - 1 / 3)), a]
    }
    ;
    P(u, function(a, b) {
        var c = b.props
          , d = b.cache
          , f = b.to
          , g = b.from;
        H.fn[a] = function(h) {
            f && !this[d] && (this[d] = f(this._rgba));
            if (void 0 === h)
                return this[d].slice();
            var l = w(h)
              , k = "array" === l || "object" === l ? h : arguments
              , n = this[d].slice();
            P(c, function(m, p) {
                m = k["object" === l ? m : p.idx];
                null == m && (m = n[p.idx]);
                n[p.idx] = B(m, p)
            });
            if (g) {
                var r = H(g(n));
                r[d] = n;
                return r
            }
            return H(n)
        }
        ;
        P(c, function(h, l) {
            H.fn[h] || (H.fn[h] = function(k) {
                var n = w(k);
                var r = "alpha" === h ? this._hsla ? "hsla" : "rgba" : a;
                var m = this[r]();
                var p = m[l.idx];
                if ("undefined" === n)
                    return p;
                "function" === n && (k = k.call(this, p),
                n = w(k));
                if (null == k && l.empty)
                    return this;
                "string" === n && (n = G.exec(k)) && (k = p + parseFloat(n[2]) * ("+" === n[1] ? 1 : -1));
                m[l.idx] = k;
                return this[r](m)
            }
            )
        })
    });
    H.hook = function(a) {
        a = a.split(" ");
        P(a, function(b, c) {
            A.cssHooks[c] = {
                set: function(d, f) {
                    var g, h = "";
                    if ("transparent" !== f && ("string" !== w(f) || (g = I(f)))) {
                        f = H(g || f);
                        if (!y.rgba && 1 !== f._rgba[3]) {
                            for (g = "backgroundColor" === c ? d.parentNode : d; ("" === h || "transparent" === h) && g && g.style; )
                                try {
                                    h = A.css(g, "backgroundColor"),
                                    g = g.parentNode
                                } catch (l) {}
                            f = f.blend(h && "transparent" !== h ? h : "_default")
                        }
                        f = f.toRgbaString()
                    }
                    try {
                        d.style[c] = f
                    } catch (l) {}
                }
            };
            A.fx.step[c] = function(d) {
                d.colorInit || (d.start = H(d.elem, c),
                d.end = H(d.end),
                d.colorInit = !0);
                A.cssHooks[c].set(d.elem, d.start.transition(d.end, d.pos))
            }
        })
    }
    ;
    H.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
    A.cssHooks.borderColor = {
        expand: function(a) {
            var b = {};
            P(["Top", "Right", "Bottom", "Left"], function(c, d) {
                b["border" + d + "Color"] = a
            });
            return b
        }
    };
    var ba = A.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
    };
    e.effects = {
        effect: {}
    };
    (function() {
        function a(f) {
            return f.replace(/-([\da-z])/gi, function(g, h) {
                return h.toUpperCase()
            })
        }
        function b(f) {
            var g = f.ownerDocument.defaultView ? f.ownerDocument.defaultView.getComputedStyle(f, null) : f.currentStyle
              , h = {};
            if (g && g.length && g[0] && g[g[0]])
                for (f = g.length; f--; ) {
                    var l = g[f];
                    "string" === typeof g[l] && (h[a(l)] = g[l])
                }
            else
                for (l in g)
                    "string" === typeof g[l] && (h[l] = g[l]);
            return h
        }
        var c = ["add", "remove", "toggle"]
          , d = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(f, g) {
            e.fx.step[g] = function(h) {
                if ("none" !== h.end && !h.setAttr || 1 === h.pos && !h.setAttr)
                    A.style(h.elem, g, h.end),
                    h.setAttr = !0
            }
        });
        e.fn.addBack || (e.fn.addBack = function(f) {
            return this.add(null == f ? this.prevObject : this.prevObject.filter(f))
        }
        );
        e.effects.animateClass = function(f, g, h, l) {
            var k = e.speed(g, h, l);
            return this.queue(function() {
                var n = e(this)
                  , r = n.attr("class") || ""
                  , m = k.children ? n.find("*").addBack() : n;
                m = m.map(function() {
                    return {
                        el: e(this),
                        start: b(this)
                    }
                });
                var p = function() {
                    e.each(c, function(q, x) {
                        if (f[x])
                            n[x + "Class"](f[x])
                    })
                };
                p();
                m = m.map(function() {
                    this.end = b(this.el[0]);
                    var q = this.start, x = this.end, z = {}, C;
                    for (C in x) {
                        var E = x[C];
                        q[C] === E || d[C] || !e.fx.step[C] && isNaN(parseFloat(E)) || (z[C] = E)
                    }
                    this.diff = z;
                    return this
                });
                n.attr("class", r);
                m = m.map(function() {
                    var q = this
                      , x = e.Deferred()
                      , z = e.extend({}, k, {
                        queue: !1,
                        complete: function() {
                            x.resolve(q)
                        }
                    });
                    this.el.animate(this.diff, z);
                    return x.promise()
                });
                e.when.apply(e, m.get()).done(function() {
                    p();
                    e.each(arguments, function() {
                        var q = this.el;
                        e.each(this.diff, function(x) {
                            q.css(x, "")
                        })
                    });
                    k.complete.call(n[0])
                })
            })
        }
        ;
        e.fn.extend({
            addClass: function(f) {
                return function(g, h, l, k) {
                    return h ? e.effects.animateClass.call(this, {
                        add: g
                    }, h, l, k) : f.apply(this, arguments)
                }
            }(e.fn.addClass),
            removeClass: function(f) {
                return function(g, h, l, k) {
                    return 1 < arguments.length ? e.effects.animateClass.call(this, {
                        remove: g
                    }, h, l, k) : f.apply(this, arguments)
                }
            }(e.fn.removeClass),
            toggleClass: function(f) {
                return function(g, h, l, k, n) {
                    return "boolean" === typeof h || void 0 === h ? l ? e.effects.animateClass.call(this, h ? {
                        add: g
                    } : {
                        remove: g
                    }, l, k, n) : f.apply(this, arguments) : e.effects.animateClass.call(this, {
                        toggle: g
                    }, h, l, k)
                }
            }(e.fn.toggleClass),
            switchClass: function(f, g, h, l, k) {
                return e.effects.animateClass.call(this, {
                    add: g,
                    remove: f
                }, h, l, k)
            }
        })
    }
    )();
    (function() {
        function a(d, f, g, h) {
            e.isPlainObject(d) && (f = d,
            d = d.effect);
            d = {
                effect: d
            };
            null == f && (f = {});
            "function" === typeof f && (h = f,
            g = null,
            f = {});
            if ("number" === typeof f || e.fx.speeds[f])
                h = g,
                g = f,
                f = {};
            "function" === typeof g && (h = g,
            g = null);
            f && e.extend(d, f);
            g = g || f.duration;
            d.duration = e.fx.off ? 0 : "number" === typeof g ? g : g in e.fx.speeds ? e.fx.speeds[g] : e.fx.speeds._default;
            d.complete = h || f.complete;
            return d
        }
        function b(d) {
            return !d || "number" === typeof d || e.fx.speeds[d] || "string" === typeof d && !e.effects.effect[d] || "function" === typeof d || "object" === typeof d && !d.effect ? !0 : !1
        }
        function c(d, f) {
            var g = f.outerWidth();
            f = f.outerHeight();
            d = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(d) || ["", 0, g, f, 0];
            return {
                top: parseFloat(d[1]) || 0,
                right: "auto" === d[2] ? g : parseFloat(d[2]),
                bottom: "auto" === d[3] ? f : parseFloat(d[3]),
                left: parseFloat(d[4]) || 0
            }
        }
        e.expr && e.expr.pseudos && e.expr.pseudos.animated && (e.expr.pseudos.animated = function(d) {
            return function(f) {
                return !!e(f).data("ui-effects-animated") || d(f)
            }
        }(e.expr.pseudos.animated));
        !1 !== e.uiBackCompat && e.extend(e.effects, {
            save: function(d, f) {
                for (var g = 0, h = f.length; g < h; g++)
                    null !== f[g] && d.data("ui-effects-" + f[g], d[0].style[f[g]])
            },
            restore: function(d, f) {
                for (var g, h = 0, l = f.length; h < l; h++)
                    null !== f[h] && (g = d.data("ui-effects-" + f[h]),
                    d.css(f[h], g))
            },
            setMode: function(d, f) {
                "toggle" === f && (f = d.is(":hidden") ? "show" : "hide");
                return f
            },
            createWrapper: function(d) {
                if (d.parent().is(".ui-effects-wrapper"))
                    return d.parent();
                var f = {
                    width: d.outerWidth(!0),
                    height: d.outerHeight(!0),
                    "float": d.css("float")
                }
                  , g = e("\x3cdiv\x3e\x3c/div\x3e").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , h = {
                    width: d.width(),
                    height: d.height()
                }
                  , l = document.activeElement;
                try {
                    l.id
                } catch (k) {
                    l = document.body
                }
                d.wrap(g);
                (d[0] === l || e.contains(d[0], l)) && e(l).trigger("focus");
                g = d.parent();
                "static" === d.css("position") ? (g.css({
                    position: "relative"
                }),
                d.css({
                    position: "relative"
                })) : (e.extend(f, {
                    position: d.css("position"),
                    zIndex: d.css("z-index")
                }),
                e.each(["top", "left", "bottom", "right"], function(k, n) {
                    f[n] = d.css(n);
                    isNaN(parseInt(f[n], 10)) && (f[n] = "auto")
                }),
                d.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                }));
                d.css(h);
                return g.css(f).show()
            },
            removeWrapper: function(d) {
                var f = document.activeElement;
                d.parent().is(".ui-effects-wrapper") && (d.parent().replaceWith(d),
                (d[0] === f || e.contains(d[0], f)) && e(f).trigger("focus"));
                return d
            }
        });
        e.extend(e.effects, {
            version: "1.13.2",
            define: function(d, f, g) {
                g || (g = f,
                f = "effect");
                e.effects.effect[d] = g;
                e.effects.effect[d].mode = f;
                return g
            },
            scaledDimensions: function(d, f, g) {
                if (0 === f)
                    return {
                        height: 0,
                        width: 0,
                        outerHeight: 0,
                        outerWidth: 0
                    };
                var h = "horizontal" !== g ? (f || 100) / 100 : 1;
                f = "vertical" !== g ? (f || 100) / 100 : 1;
                return {
                    height: d.height() * f,
                    width: d.width() * h,
                    outerHeight: d.outerHeight() * f,
                    outerWidth: d.outerWidth() * h
                }
            },
            clipToBox: function(d) {
                return {
                    width: d.clip.right - d.clip.left,
                    height: d.clip.bottom - d.clip.top,
                    left: d.clip.left,
                    top: d.clip.top
                }
            },
            unshift: function(d, f, g) {
                var h = d.queue();
                1 < f && h.splice.apply(h, [1, 0].concat(h.splice(f, g)));
                d.dequeue()
            },
            saveStyle: function(d) {
                d.data("ui-effects-style", d[0].style.cssText)
            },
            restoreStyle: function(d) {
                d[0].style.cssText = d.data("ui-effects-style") || "";
                d.removeData("ui-effects-style")
            },
            mode: function(d, f) {
                d = d.is(":hidden");
                "toggle" === f && (f = d ? "show" : "hide");
                if (d ? "hide" === f : "show" === f)
                    f = "none";
                return f
            },
            getBaseline: function(d, f) {
                switch (d[0]) {
                case "top":
                    var g = 0;
                    break;
                case "middle":
                    g = .5;
                    break;
                case "bottom":
                    g = 1;
                    break;
                default:
                    g = d[0] / f.height
                }
                switch (d[1]) {
                case "left":
                    d = 0;
                    break;
                case "center":
                    d = .5;
                    break;
                case "right":
                    d = 1;
                    break;
                default:
                    d = d[1] / f.width
                }
                return {
                    x: d,
                    y: g
                }
            },
            createPlaceholder: function(d) {
                var f = d.css("position")
                  , g = d.position();
                d.css({
                    marginTop: d.css("marginTop"),
                    marginBottom: d.css("marginBottom"),
                    marginLeft: d.css("marginLeft"),
                    marginRight: d.css("marginRight")
                }).outerWidth(d.outerWidth()).outerHeight(d.outerHeight());
                if (/^(static|relative)/.test(f)) {
                    f = "absolute";
                    var h = e("\x3c" + d[0].nodeName + "\x3e").insertAfter(d).css({
                        display: /^(inline|ruby)/.test(d.css("display")) ? "inline-block" : "block",
                        visibility: "hidden",
                        marginTop: d.css("marginTop"),
                        marginBottom: d.css("marginBottom"),
                        marginLeft: d.css("marginLeft"),
                        marginRight: d.css("marginRight"),
                        "float": d.css("float")
                    }).outerWidth(d.outerWidth()).outerHeight(d.outerHeight()).addClass("ui-effects-placeholder");
                    d.data("ui-effects-placeholder", h)
                }
                d.css({
                    position: f,
                    left: g.left,
                    top: g.top
                });
                return h
            },
            removePlaceholder: function(d) {
                var f = d.data("ui-effects-placeholder");
                f && (f.remove(),
                d.removeData("ui-effects-placeholder"))
            },
            cleanUp: function(d) {
                e.effects.restoreStyle(d);
                e.effects.removePlaceholder(d)
            },
            setTransition: function(d, f, g, h) {
                h = h || {};
                e.each(f, function(l, k) {
                    l = d.cssUnit(k);
                    0 < l[0] && (h[k] = l[0] * g + l[1])
                });
                return h
            }
        });
        e.fn.extend({
            effect: function() {
                function d(q) {
                    function x() {
                        C.removeData("ui-effects-animated");
                        e.effects.cleanUp(C);
                        "hide" === f.mode && C.hide();
                        z()
                    }
                    function z() {
                        "function" === typeof n && n.call(C[0]);
                        "function" === typeof q && q()
                    }
                    var C = e(this);
                    f.mode = m.shift();
                    !1 === e.uiBackCompat || h ? "none" === f.mode ? (C[r](),
                    z()) : g.call(C[0], f, x) : (C.is(":hidden") ? "hide" === r : "show" === r) ? (C[r](),
                    z()) : g.call(C[0], f, z)
                }
                var f = a.apply(this, arguments)
                  , g = e.effects.effect[f.effect]
                  , h = g.mode
                  , l = f.queue
                  , k = l || "fx"
                  , n = f.complete
                  , r = f.mode
                  , m = []
                  , p = function(q) {
                    var x = e(this)
                      , z = e.effects.mode(x, r) || h;
                    x.data("ui-effects-animated", !0);
                    m.push(z);
                    h && ("show" === z || z === h && "hide" === z) && x.show();
                    h && "none" === z || e.effects.saveStyle(x);
                    "function" === typeof q && q()
                };
                return e.fx.off || !g ? r ? this[r](f.duration, n) : this.each(function() {
                    n && n.call(this)
                }) : !1 === l ? this.each(p).each(d) : this.queue(k, p).queue(k, d)
            },
            show: function(d) {
                return function(f) {
                    if (b(f))
                        return d.apply(this, arguments);
                    var g = a.apply(this, arguments);
                    g.mode = "show";
                    return this.effect.call(this, g)
                }
            }(e.fn.show),
            hide: function(d) {
                return function(f) {
                    if (b(f))
                        return d.apply(this, arguments);
                    var g = a.apply(this, arguments);
                    g.mode = "hide";
                    return this.effect.call(this, g)
                }
            }(e.fn.hide),
            toggle: function(d) {
                return function(f) {
                    if (b(f) || "boolean" === typeof f)
                        return d.apply(this, arguments);
                    var g = a.apply(this, arguments);
                    g.mode = "toggle";
                    return this.effect.call(this, g)
                }
            }(e.fn.toggle),
            cssUnit: function(d) {
                var f = this.css(d)
                  , g = [];
                e.each(["em", "px", "%", "pt"], function(h, l) {
                    0 < f.indexOf(l) && (g = [parseFloat(f), l])
                });
                return g
            },
            cssClip: function(d) {
                return d ? this.css("clip", "rect(" + d.top + "px " + d.right + "px " + d.bottom + "px " + d.left + "px)") : c(this.css("clip"), this)
            },
            transfer: function(d, f) {
                var g = e(this)
                  , h = e(d.to)
                  , l = "fixed" === h.css("position")
                  , k = e("body")
                  , n = l ? k.scrollTop() : 0;
                k = l ? k.scrollLeft() : 0;
                var r = h.offset();
                h = {
                    top: r.top - n,
                    left: r.left - k,
                    height: h.innerHeight(),
                    width: h.innerWidth()
                };
                r = g.offset();
                var m = e("\x3cdiv class\x3d'ui-effects-transfer'\x3e\x3c/div\x3e");
                m.appendTo("body").addClass(d.className).css({
                    top: r.top - n,
                    left: r.left - k,
                    height: g.innerHeight(),
                    width: g.innerWidth(),
                    position: l ? "fixed" : "absolute"
                }).animate(h, d.duration, d.easing, function() {
                    m.remove();
                    "function" === typeof f && f()
                })
            }
        });
        e.fx.step.clip = function(d) {
            d.clipInit || (d.start = e(d.elem).cssClip(),
            "string" === typeof d.end && (d.end = c(d.end, d.elem)),
            d.clipInit = !0);
            e(d.elem).cssClip({
                top: d.pos * (d.end.top - d.start.top) + d.start.top,
                right: d.pos * (d.end.right - d.start.right) + d.start.right,
                bottom: d.pos * (d.end.bottom - d.start.bottom) + d.start.bottom,
                left: d.pos * (d.end.left - d.start.left) + d.start.left
            })
        }
    }
    )();
    (function() {
        var a = {};
        e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(b, c) {
            a[c] = function(d) {
                return Math.pow(d, b + 2)
            }
        });
        e.extend(a, {
            Sine: function(b) {
                return 1 - Math.cos(b * Math.PI / 2)
            },
            Circ: function(b) {
                return 1 - Math.sqrt(1 - b * b)
            },
            Elastic: function(b) {
                return 0 === b || 1 === b ? b : -Math.pow(2, 8 * (b - 1)) * Math.sin((80 * (b - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(b) {
                return b * b * (3 * b - 2)
            },
            Bounce: function(b) {
                for (var c, d = 4; b < ((c = Math.pow(2, --d)) - 1) / 11; )
                    ;
                return 1 / Math.pow(4, 3 - d) - 7.5625 * Math.pow((3 * c - 2) / 22 - b, 2)
            }
        });
        e.each(a, function(b, c) {
            e.easing["easeIn" + b] = c;
            e.easing["easeOut" + b] = function(d) {
                return 1 - c(1 - d)
            }
            ;
            e.easing["easeInOut" + b] = function(d) {
                return .5 > d ? c(2 * d) / 2 : 1 - c(-2 * d + 2) / 2
            }
        })
    }
    )();
    e.effects.define("blind", "hide", function(a, b) {
        var c = {
            up: ["bottom", "top"],
            vertical: ["bottom", "top"],
            down: ["top", "bottom"],
            left: ["right", "left"],
            horizontal: ["right", "left"],
            right: ["left", "right"]
        }
          , d = e(this)
          , f = a.direction || "up"
          , g = d.cssClip()
          , h = {
            clip: e.extend({}, g)
        }
          , l = e.effects.createPlaceholder(d);
        h.clip[c[f][0]] = h.clip[c[f][1]];
        "show" === a.mode && (d.cssClip(h.clip),
        l && l.css(e.effects.clipToBox(h)),
        h.clip = g);
        l && l.animate(e.effects.clipToBox(h), a.duration, a.easing);
        d.animate(h, {
            queue: !1,
            duration: a.duration,
            easing: a.easing,
            complete: b
        })
    });
    e.effects.define("bounce", function(a, b) {
        var c = e(this)
          , d = a.mode
          , f = "hide" === d;
        var g = "show" === d;
        var h = a.direction || "up";
        d = a.distance;
        var l = a.times || 5
          , k = 2 * l + (g || f ? 1 : 0)
          , n = a.duration / k;
        a = a.easing;
        var r = "up" === h || "down" === h ? "top" : "left";
        h = "up" === h || "left" === h;
        var m = 0
          , p = c.queue().length;
        e.effects.createPlaceholder(c);
        var q = c.css(r);
        d || (d = c["top" === r ? "outerHeight" : "outerWidth"]() / 3);
        g && (g = {
            opacity: 1
        },
        g[r] = q,
        c.css("opacity", 0).css(r, h ? 2 * -d : 2 * d).animate(g, n, a));
        f && (d /= Math.pow(2, l - 1));
        g = {};
        for (g[r] = q; m < l; m++)
            q = {},
            q[r] = (h ? "-\x3d" : "+\x3d") + d,
            c.animate(q, n, a).animate(g, n, a),
            d = f ? 2 * d : d / 2;
        f && (q = {
            opacity: 0
        },
        q[r] = (h ? "-\x3d" : "+\x3d") + d,
        c.animate(q, n, a));
        c.queue(b);
        e.effects.unshift(c, p, k + 1)
    });
    e.effects.define("clip", "hide", function(a, b) {
        var c = {}
          , d = e(this);
        var f = a.direction || "vertical";
        var g = "both" === f
          , h = g || "horizontal" === f;
        g = g || "vertical" === f;
        f = d.cssClip();
        c.clip = {
            top: g ? (f.bottom - f.top) / 2 : f.top,
            right: h ? (f.right - f.left) / 2 : f.right,
            bottom: g ? (f.bottom - f.top) / 2 : f.bottom,
            left: h ? (f.right - f.left) / 2 : f.left
        };
        e.effects.createPlaceholder(d);
        "show" === a.mode && (d.cssClip(c.clip),
        c.clip = f);
        d.animate(c, {
            queue: !1,
            duration: a.duration,
            easing: a.easing,
            complete: b
        })
    });
    e.effects.define("drop", "hide", function(a, b) {
        var c = e(this)
          , d = "show" === a.mode;
        var f = a.direction || "left";
        var g = "up" === f || "down" === f ? "top" : "left"
          , h = "up" === f || "left" === f ? "-\x3d" : "+\x3d"
          , l = "+\x3d" === h ? "-\x3d" : "+\x3d"
          , k = {
            opacity: 0
        };
        e.effects.createPlaceholder(c);
        f = a.distance || c["top" === g ? "outerHeight" : "outerWidth"](!0) / 2;
        k[g] = h + f;
        d && (c.css(k),
        k[g] = l + f,
        k.opacity = 1);
        c.animate(k, {
            queue: !1,
            duration: a.duration,
            easing: a.easing,
            complete: b
        })
    });
    e.effects.define("explode", "hide", function(a, b) {
        function c() {
            p.push(this);
            p.length === g * h && (l.css({
                visibility: "visible"
            }),
            e(p).remove(),
            b())
        }
        var d, f, g = a.pieces ? Math.round(Math.sqrt(a.pieces)) : 3, h = g, l = e(this), k = "show" === a.mode, n = l.show().css("visibility", "hidden").offset(), r = Math.ceil(l.outerWidth() / h), m = Math.ceil(l.outerHeight() / g), p = [];
        for (d = 0; d < g; d++) {
            var q = n.top + d * m;
            var x = d - (g - 1) / 2;
            for (f = 0; f < h; f++) {
                var z = n.left + f * r;
                var C = f - (h - 1) / 2;
                l.clone().appendTo("body").wrap("\x3cdiv\x3e\x3c/div\x3e").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -f * r,
                    top: -d * m
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: r,
                    height: m,
                    left: z + (k ? C * r : 0),
                    top: q + (k ? x * m : 0),
                    opacity: k ? 0 : 1
                }).animate({
                    left: z + (k ? 0 : C * r),
                    top: q + (k ? 0 : x * m),
                    opacity: k ? 1 : 0
                }, a.duration || 500, a.easing, c)
            }
        }
    });
    e.effects.define("fade", "toggle", function(a, b) {
        var c = "show" === a.mode;
        e(this).css("opacity", c ? 0 : 1).animate({
            opacity: c ? 1 : 0
        }, {
            queue: !1,
            duration: a.duration,
            easing: a.easing,
            complete: b
        })
    });
    e.effects.define("fold", "hide", function(a, b) {
        var c = e(this)
          , d = a.mode
          , f = "show" === d;
        d = "hide" === d;
        var g = a.size || 15
          , h = /([0-9]+)%/.exec(g)
          , l = a.horizFirst ? ["right", "bottom"] : ["bottom", "right"]
          , k = a.duration / 2
          , n = e.effects.createPlaceholder(c)
          , r = c.cssClip()
          , m = {
            clip: e.extend({}, r)
        }
          , p = {
            clip: e.extend({}, r)
        }
          , q = [r[l[0]], r[l[1]]]
          , x = c.queue().length;
        h && (g = parseInt(h[1], 10) / 100 * q[d ? 0 : 1]);
        m.clip[l[0]] = g;
        p.clip[l[0]] = g;
        p.clip[l[1]] = 0;
        f && (c.cssClip(p.clip),
        n && n.css(e.effects.clipToBox(p)),
        p.clip = r);
        c.queue(function(z) {
            n && n.animate(e.effects.clipToBox(m), k, a.easing).animate(e.effects.clipToBox(p), k, a.easing);
            z()
        }).animate(m, k, a.easing).animate(p, k, a.easing).queue(b);
        e.effects.unshift(c, x, 4)
    });
    e.effects.define("highlight", "show", function(a, b) {
        var c = e(this)
          , d = {
            backgroundColor: c.css("backgroundColor")
        };
        "hide" === a.mode && (d.opacity = 0);
        e.effects.saveStyle(c);
        c.css({
            backgroundImage: "none",
            backgroundColor: a.color || "#ffff99"
        }).animate(d, {
            queue: !1,
            duration: a.duration,
            easing: a.easing,
            complete: b
        })
    });
    e.effects.define("size", function(a, b) {
        var c = e(this)
          , d = ["fontSize"]
          , f = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"]
          , g = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
        var h = a.mode;
        var l = "effect" !== h
          , k = a.scale || "both";
        var n = a.origin || ["middle", "center"];
        var r = c.css("position")
          , m = c.position()
          , p = e.effects.scaledDimensions(c)
          , q = a.from || p
          , x = a.to || e.effects.scaledDimensions(c, 0);
        e.effects.createPlaceholder(c);
        "show" === h && (h = q,
        q = x,
        x = h);
        var z = q.height / p.height;
        var C = q.width / p.width;
        var E = x.height / p.height;
        var T = x.width / p.width;
        if ("box" === k || "both" === k)
            z !== E && (q = e.effects.setTransition(c, f, z, q),
            x = e.effects.setTransition(c, f, E, x)),
            C !== T && (q = e.effects.setTransition(c, g, C, q),
            x = e.effects.setTransition(c, g, T, x));
        "content" !== k && "both" !== k || z === E || (q = e.effects.setTransition(c, d, z, q),
        x = e.effects.setTransition(c, d, E, x));
        n && (n = e.effects.getBaseline(n, p),
        q.top = (p.outerHeight - q.outerHeight) * n.y + m.top,
        q.left = (p.outerWidth - q.outerWidth) * n.x + m.left,
        x.top = (p.outerHeight - x.outerHeight) * n.y + m.top,
        x.left = (p.outerWidth - x.outerWidth) * n.x + m.left);
        delete q.outerHeight;
        delete q.outerWidth;
        c.css(q);
        if ("content" === k || "both" === k)
            f = f.concat(["marginTop", "marginBottom"]).concat(d),
            g = g.concat(["marginLeft", "marginRight"]),
            c.find("*[width]").each(function() {
                var M = e(this)
                  , N = e.effects.scaledDimensions(M)
                  , U = {
                    height: N.height * z,
                    width: N.width * C,
                    outerHeight: N.outerHeight * z,
                    outerWidth: N.outerWidth * C
                };
                N = {
                    height: N.height * E,
                    width: N.width * T,
                    outerHeight: N.height * E,
                    outerWidth: N.width * T
                };
                z !== E && (U = e.effects.setTransition(M, f, z, U),
                N = e.effects.setTransition(M, f, E, N));
                C !== T && (U = e.effects.setTransition(M, g, C, U),
                N = e.effects.setTransition(M, g, T, N));
                l && e.effects.saveStyle(M);
                M.css(U);
                M.animate(N, a.duration, a.easing, function() {
                    l && e.effects.restoreStyle(M)
                })
            });
        c.animate(x, {
            queue: !1,
            duration: a.duration,
            easing: a.easing,
            complete: function() {
                var M = c.offset();
                0 === x.opacity && c.css("opacity", q.opacity);
                l || (c.css("position", "static" === r ? "relative" : r).offset(M),
                e.effects.saveStyle(c));
                b()
            }
        })
    });
    e.effects.define("scale", function(a, b) {
        var c = e(this)
          , d = a.mode;
        d = parseInt(a.percent, 10) || (0 === parseInt(a.percent, 10) ? 0 : "effect" !== d ? 0 : 100);
        c = e.extend(!0, {
            from: e.effects.scaledDimensions(c),
            to: e.effects.scaledDimensions(c, d, a.direction || "both"),
            origin: a.origin || ["middle", "center"]
        }, a);
        a.fade && (c.from.opacity = 1,
        c.to.opacity = 0);
        e.effects.effect.size.call(this, c, b)
    });
    e.effects.define("puff", "hide", function(a, b) {
        a = e.extend(!0, {}, a, {
            fade: !0,
            percent: parseInt(a.percent, 10) || 150
        });
        e.effects.effect.scale.call(this, a, b)
    });
    e.effects.define("pulsate", "show", function(a, b) {
        var c = e(this)
          , d = a.mode
          , f = "show" === d;
        d = 2 * (a.times || 5) + (f || "hide" === d ? 1 : 0);
        var g = a.duration / d
          , h = 0
          , l = 1
          , k = c.queue().length;
        if (f || !c.is(":visible"))
            c.css("opacity", 0).show(),
            h = 1;
        for (; l < d; l++)
            c.animate({
                opacity: h
            }, g, a.easing),
            h = 1 - h;
        c.animate({
            opacity: h
        }, g, a.easing);
        c.queue(b);
        e.effects.unshift(c, k, d + 1)
    });
    e.effects.define("shake", function(a, b) {
        var c = 1
          , d = e(this)
          , f = a.direction || "left"
          , g = a.distance || 20
          , h = a.times || 3
          , l = 2 * h + 1
          , k = Math.round(a.duration / l)
          , n = "up" === f || "down" === f ? "top" : "left";
        f = "up" === f || "left" === f;
        var r = {}
          , m = {}
          , p = {}
          , q = d.queue().length;
        e.effects.createPlaceholder(d);
        r[n] = (f ? "-\x3d" : "+\x3d") + g;
        m[n] = (f ? "+\x3d" : "-\x3d") + 2 * g;
        p[n] = (f ? "-\x3d" : "+\x3d") + 2 * g;
        for (d.animate(r, k, a.easing); c < h; c++)
            d.animate(m, k, a.easing).animate(p, k, a.easing);
        d.animate(m, k, a.easing).animate(r, k / 2, a.easing).queue(b);
        e.effects.unshift(d, q, l + 1)
    });
    e.effects.define("slide", "show", function(a, b) {
        var c = e(this)
          , d = {
            up: ["bottom", "top"],
            down: ["top", "bottom"],
            left: ["right", "left"],
            right: ["left", "right"]
        }
          , f = a.mode
          , g = a.direction || "left"
          , h = "up" === g || "down" === g ? "top" : "left"
          , l = "up" === g || "left" === g
          , k = a.distance || c["top" === h ? "outerHeight" : "outerWidth"](!0)
          , n = {};
        e.effects.createPlaceholder(c);
        var r = c.cssClip();
        var m = c.position()[h];
        n[h] = (l ? -1 : 1) * k + m;
        n.clip = c.cssClip();
        n.clip[d[g][1]] = n.clip[d[g][0]];
        "show" === f && (c.cssClip(n.clip),
        c.css(h, n[h]),
        n.clip = r,
        n[h] = m);
        c.animate(n, {
            queue: !1,
            duration: a.duration,
            easing: a.easing,
            complete: b
        })
    });
    !1 !== e.uiBackCompat && e.effects.define("transfer", function(a, b) {
        e(this).transfer(a, b)
    })
});
$(function() {
    var e = {
        primaryStyles: "fontFamily fontSize fontWeight fontVariant fontStyle paddingLeft paddingTop paddingBottom paddingRight marginLeft marginTop marginBottom marginRight borderLeftColor borderTopColor borderBottomColor borderRightColor borderLeftStyle borderTopStyle borderBottomStyle borderRightStyle borderLeftWidth borderTopWidth borderBottomWidth borderRightWidth line-height outline".split(" "),
        specificStyle: {
            "word-wrap": "break-word",
            "overflow-x": "hidden",
            "overflow-y": "auto"
        },
        simulator: $('\x3cdiv id\x3d"textarea_simulator"\x3e\x3c/div\x3e').css({
            position: "absolute",
            top: "0px",
            left: "0px",
            visibility: "hidden"
        }).appendTo(document.body),
        toHtml: function(w) {
            return PrimeFaces.escapeHTML(w).replace(/\n/g, "\x3cbr\x3e").split(" ").join('\x3cspan style\x3d"white-space:prev-wrap"\x3e\x26nbsp;\x3c/span\x3e')
        },
        getCaretPosition: function() {
            var w = e
              , B = this
              , I = B[0]
              , L = B.offset();
            if ($.browser.msie && document.selection && document.selection.createRange) {
                I.focus();
                var J = document.selection.createRange();
                $("#hskeywords").val(I.scrollTop);
                return {
                    left: J.boundingLeft - L.left,
                    top: parseInt(J.boundingTop) - L.top + I.scrollTop + document.documentElement.scrollTop + parseInt(B.getComputedStyle("fontSize"))
                }
            }
            w.simulator.empty();
            $.each(w.primaryStyles, function(t, Q) {
                B.cloneStyle(w.simulator, Q)
            });
            w.simulator.css($.extend({
                width: B.width() + "px",
                height: B.height() + "px"
            }, w.specificStyle));
            J = B.val();
            var D = B.getCursorPosition();
            L = J.substring(0, D);
            J = J.substring(D);
            D = $('\x3cspan class\x3d"before"\x3e\x3c/span\x3e').html(w.toHtml(L));
            L = $('\x3cspan class\x3d"focus"\x3e\x3c/span\x3e');
            J = $('\x3cspan class\x3d"after"\x3e\x3c/span\x3e').html(w.toHtml(J));
            w.simulator.append(D).append(L).append(J);
            J = L.offset();
            D = w.simulator.offset();
            return {
                top: J.top - D.top - I.scrollTop + ($.browser.mozilla ? 0 : parseInt(B.getComputedStyle("fontSize"))),
                left: L[0].offsetLeft - w.simulator[0].offsetLeft - I.scrollLeft
            }
        }
    };
    $.fn.extend({
        getComputedStyle: function(w) {
            if (0 != this.length) {
                var B = this[0]
                  , I = this.css(w);
                return I = I || ($.browser.msie ? B.currentStyle[w] : document.defaultView.getComputedStyle(B, null)[w])
            }
        },
        cloneStyle: function(w, B) {
            var I = this.getComputedStyle(B);
            I && $(w).css(B, I)
        },
        cloneAllStyle: function(w, B) {
            B = this[0];
            for (var I in B.style) {
                var L = B.style[I];
                "string" == typeof L || "number" == typeof L ? this.cloneStyle(w, I) : NaN
            }
        },
        getCursorPosition: function() {
            var w = this[0]
              , B = 0;
            if ("selectionStart"in w)
                B = w.selectionStart;
            else if ("selection"in document) {
                var I = document.selection.createRange();
                if (6 < parseInt($.browser.version))
                    w.focus(),
                    B = document.selection.createRange().text.length,
                    I.moveStart("character", -w.value.length),
                    B = I.text.length - B;
                else {
                    var L = document.body.createTextRange();
                    for (L.moveToElementText(w); 0 > L.compareEndPoints("StartToStart", I); B++)
                        L.moveStart("character", 1);
                    for (I = 0; I <= B; I++)
                        "\n" == w.value.charAt(I) && B++;
                    w = w.value.split("\n").length - 1;
                    return B - w
                }
            }
            return B
        },
        getCaretPosition: e.getCaretPosition
    })
});
(function(e, w) {
    if ("function" === typeof define && define.amd)
        define(["module", "exports"], w);
    else if ("undefined" !== typeof exports)
        w(module, exports);
    else {
        var B = {
            exports: {}
        };
        w(B, B.exports);
        e.autosize = B.exports
    }
}
)(this, function(e, w) {
    function B(t) {
        function Q(u) {
            var v = t.style.width;
            t.style.width = "0px";
            t.offsetWidth;
            t.style.width = v;
            t.style.overflowY = u
        }
        function K(u) {
            for (var v = []; u && u.parentNode && u.parentNode instanceof Element; )
                u.parentNode.scrollTop && v.push({
                    node: u.parentNode,
                    scrollTop: u.parentNode.scrollTop
                }),
                u = u.parentNode;
            return v
        }
        function F() {
            if (0 !== t.scrollHeight) {
                var u = K(t)
                  , v = document.documentElement && document.documentElement.scrollTop;
                t.style.height = "";
                t.style.height = t.scrollHeight + X + "px";
                S = t.clientWidth;
                u.forEach(function(y) {
                    y.node.scrollTop = y.scrollTop
                });
                v && (document.documentElement.scrollTop = v)
            }
        }
        function A() {
            F();
            var u = Math.round(parseFloat(t.style.height))
              , v = window.getComputedStyle(t, null)
              , y = "content-box" === v.boxSizing ? Math.round(parseFloat(v.height)) : t.offsetHeight;
            y < u ? "hidden" === v.overflowY && (Q("scroll"),
            F(),
            y = "content-box" === v.boxSizing ? Math.round(parseFloat(window.getComputedStyle(t, null).height)) : t.offsetHeight) : "hidden" !== v.overflowY && (Q("hidden"),
            F(),
            y = "content-box" === v.boxSizing ? Math.round(parseFloat(window.getComputedStyle(t, null).height)) : t.offsetHeight);
            if (G !== y) {
                G = y;
                u = D("autosize:resized");
                try {
                    t.dispatchEvent(u)
                } catch (O) {}
            }
        }
        if (t && t.nodeName && "TEXTAREA" === t.nodeName && !J.has(t)) {
            var X = null
              , S = null
              , G = null
              , R = function() {
                t.clientWidth !== S && A()
            }
              , H = function(u) {
                window.removeEventListener("resize", R, !1);
                t.removeEventListener("input", A, !1);
                t.removeEventListener("keyup", A, !1);
                t.removeEventListener("autosize:destroy", H, !1);
                t.removeEventListener("autosize:update", A, !1);
                Object.keys(u).forEach(function(v) {
                    t.style[v] = u[v]
                });
                J._delete(t)
            }
            .bind(t, {
                height: t.style.height,
                resize: t.style.resize,
                overflowY: t.style.overflowY,
                overflowX: t.style.overflowX,
                wordWrap: t.style.wordWrap
            });
            t.addEventListener("autosize:destroy", H, !1);
            "onpropertychange"in t && "oninput"in t && t.addEventListener("keyup", A, !1);
            window.addEventListener("resize", R, !1);
            t.addEventListener("input", A, !1);
            t.addEventListener("autosize:update", A, !1);
            t.style.overflowX = "hidden";
            t.style.wordWrap = "break-word";
            J.set(t, {
                destroy: H,
                update: A
            });
            (function() {
                var u = window.getComputedStyle(t, null);
                "vertical" === u.resize ? t.style.resize = "none" : "both" === u.resize && (t.style.resize = "horizontal");
                X = "content-box" === u.boxSizing ? -(parseFloat(u.paddingTop) + parseFloat(u.paddingBottom)) : parseFloat(u.borderTopWidth) + parseFloat(u.borderBottomWidth);
                isNaN(X) && (X = 0);
                A()
            }
            )()
        }
    }
    function I(t) {
        (t = J.get(t)) && t.destroy()
    }
    function L(t) {
        (t = J.get(t)) && t.update()
    }
    var J = "function" === typeof Map ? new Map : function() {
        var t = []
          , Q = [];
        return {
            has: function(K) {
                return -1 < t.indexOf(K)
            },
            get: function(K) {
                return Q[t.indexOf(K)]
            },
            set: function(K, F) {
                -1 === t.indexOf(K) && (t.push(K),
                Q.push(F))
            },
            _delete: function(K) {
                K = t.indexOf(K);
                -1 < K && (t.splice(K, 1),
                Q.splice(K, 1))
            }
        }
    }()
      , D = function(t) {
        return new Event(t,{
            bubbles: !0
        })
    };
    try {
        new Event("test")
    } catch (t) {
        D = function(Q) {
            var K = document.createEvent("Event");
            K.initEvent(Q, !0, !1);
            return K
        }
    }
    w = null;
    "undefined" === typeof window || "function" !== typeof window.getComputedStyle ? (w = function(t) {
        return t
    }
    ,
    w.destroy = function(t) {
        return t
    }
    ,
    w.update = function(t) {
        return t
    }
    ) : (w = function(t, Q) {
        t && Array.prototype.forEach.call(t.length ? t : [t], function(K) {
            return B(K, Q)
        });
        return t
    }
    ,
    w.destroy = function(t) {
        t && Array.prototype.forEach.call(t.length ? t : [t], I);
        return t
    }
    ,
    w.update = function(t) {
        t && Array.prototype.forEach.call(t.length ? t : [t], L);
        return t
    }
    );
    e.exports = w
});
(function(e) {
    "function" === typeof define && define.amd ? define(["jquery"], e) : "object" === typeof exports ? module.exports = e : e(jQuery)
}
)(function(e) {
    function w(F) {
        var A = F || window.event
          , X = J.call(arguments, 1)
          , S = 0
          , G = 0
          , R = 0
          , H = 0;
        F = e.event.fix(A);
        F.type = "mousewheel";
        "detail"in A && (G = -1 * A.detail);
        "wheelDelta"in A && (G = A.wheelDelta);
        "wheelDeltaY"in A && (G = A.wheelDeltaY);
        "wheelDeltaX"in A && (S = -1 * A.wheelDeltaX);
        "axis"in A && A.axis === A.HORIZONTAL_AXIS && (S = -1 * G,
        G = 0);
        var u = 0 === G ? S : G;
        "deltaY"in A && (u = G = -1 * A.deltaY);
        "deltaX"in A && (S = A.deltaX,
        0 === G && (u = -1 * S));
        if (0 !== G || 0 !== S) {
            if (1 === A.deltaMode) {
                var v = e.data(this, "mousewheel-line-height");
                u *= v;
                G *= v;
                S *= v
            } else
                2 === A.deltaMode && (v = e.data(this, "mousewheel-page-height"),
                u *= v,
                G *= v,
                S *= v);
            v = Math.max(Math.abs(G), Math.abs(S));
            if (!t || v < t)
                t = v,
                K.settings.adjustOldDeltas && "mousewheel" === A.type && 0 === v % 120 && (t /= 40);
            K.settings.adjustOldDeltas && "mousewheel" === A.type && 0 === v % 120 && (u /= 40,
            S /= 40,
            G /= 40);
            u = Math[1 <= u ? "floor" : "ceil"](u / t);
            S = Math[1 <= S ? "floor" : "ceil"](S / t);
            G = Math[1 <= G ? "floor" : "ceil"](G / t);
            K.settings.normalizeOffset && this.getBoundingClientRect && (A = this.getBoundingClientRect(),
            R = F.clientX - A.left,
            H = F.clientY - A.top);
            F.deltaX = S;
            F.deltaY = G;
            F.deltaFactor = t;
            F.offsetX = R;
            F.offsetY = H;
            F.deltaMode = 0;
            X.unshift(F, u, S, G);
            D && clearTimeout(D);
            D = setTimeout(B, 200);
            return (e.event.dispatch || e.event.handle).apply(this, X)
        }
    }
    function B() {
        t = null
    }
    var I = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], L = "onwheel"in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], J = Array.prototype.slice, D, t;
    if (e.event.fixHooks)
        for (var Q = I.length; Q; )
            e.event.fixHooks[I[--Q]] = e.event.mouseHooks;
    var K = e.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var F = L.length; F; )
                    this.addEventListener(L[--F], w, !1);
            else
                this.onmousewheel = w;
            e.data(this, "mousewheel-line-height", K.getLineHeight(this));
            e.data(this, "mousewheel-page-height", K.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var F = L.length; F; )
                    this.removeEventListener(L[--F], w, !1);
            else
                this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height");
            e.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(F) {
            F = e(F);
            var A = F["offsetParent"in e.fn ? "offsetParent" : "parent"]();
            A.length || (A = e("body"));
            return parseInt(A.css("fontSize"), 10) || parseInt(F.css("fontSize"), 10) || 16
        },
        getPageHeight: function(F) {
            return e(F).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    e.fn.extend({
        mousewheel: function(F) {
            return F ? this.on("mousewheel", F) : this.trigger("mousewheel")
        },
        unmousewheel: function(F) {
            return this.off("mousewheel", F)
        }
    })
});
(function(e) {
    function w(G, R) {
        var H = typeof G[R];
        return "function" === H || !("object" != H || !G[R]) || "unknown" == H
    }
    function B(G, R) {
        return !("object" != typeof G[R] || !G[R])
    }
    function I(G, R, H) {
        0 > R && (R += G.value.length);
        "undefined" == typeof H && (H = R);
        0 > H && (H += G.value.length);
        return {
            start: R,
            end: H
        }
    }
    function L() {
        return B(document, "body") ? document.body : document.getElementsByTagName("body")[0]
    }
    var J, D, t, Q, K, F, A, X, S;
    e(document).ready(function() {
        function G(u, v) {
            return function() {
                var y = this.jquery ? this[0] : this
                  , O = y.nodeName.toLowerCase();
                if (1 == y.nodeType && ("textarea" == O || "input" == O && "text" == y.type) && (y = [y].concat(Array.prototype.slice.call(arguments)),
                y = u.apply(this, y),
                !v))
                    return y;
                if (v)
                    return this
            }
        }
        var R = document.createElement("textarea");
        L().appendChild(R);
        if ("undefined" != typeof R.selectionStart && "undefined" != typeof R.selectionEnd)
            J = function(u) {
                var v = u.selectionStart
                  , y = u.selectionEnd;
                return {
                    start: v,
                    end: y,
                    length: y - v,
                    text: u.value.slice(v, y)
                }
            }
            ,
            D = function(u, v, y) {
                v = I(u, v, y);
                u.selectionStart = v.start;
                u.selectionEnd = v.end
            }
            ,
            S = function(u, v) {
                v ? u.selectionEnd = u.selectionStart : u.selectionStart = u.selectionEnd
            }
            ;
        else if (w(R, "createTextRange") && B(document, "selection") && w(document.selection, "createRange")) {
            J = function(u) {
                var v = 0, y = 0, O;
                if ((O = document.selection.createRange()) && O.parentElement() == u) {
                    var P = u.value.length;
                    var ba = u.value.replace(/\r\n/g, "\n");
                    y = u.createTextRange();
                    y.moveToBookmark(O.getBookmark());
                    O = u.createTextRange();
                    O.collapse(!1);
                    -1 < y.compareEndPoints("StartToEnd", O) ? v = y = P : (v = -y.moveStart("character", -P),
                    v += ba.slice(0, v).split("\n").length - 1,
                    -1 < y.compareEndPoints("EndToEnd", O) ? y = P : (y = -y.moveEnd("character", -P),
                    y += ba.slice(0, y).split("\n").length - 1))
                }
                return {
                    start: v,
                    end: y,
                    length: y - v,
                    text: u.value.slice(v, y)
                }
            }
            ;
            var H = function(u, v) {
                return v - (u.value.slice(0, v).split("\r\n").length - 1)
            };
            D = function(u, v, y) {
                v = I(u, v, y);
                y = u.createTextRange();
                var O = H(u, v.start);
                y.collapse(!0);
                v.start == v.end ? y.move("character", O) : (y.moveEnd("character", H(u, v.end)),
                y.moveStart("character", O));
                y.select()
            }
            ;
            S = function(u, v) {
                u = document.selection.createRange();
                u.collapse(v);
                u.select()
            }
        } else {
            L().removeChild(R);
            window.console && window.console.log && window.console.log("TextInputs module for Rangy not supported in your browser. Reason: No means of finding text input caret position");
            return
        }
        L().removeChild(R);
        Q = function(u, v, y, O) {
            if (v != y) {
                var P = u.value;
                u.value = P.slice(0, v) + P.slice(y)
            }
            O && D(u, v, v)
        }
        ;
        t = function(u) {
            var v = J(u);
            Q(u, v.start, v.end, !0)
        }
        ;
        X = function(u) {
            var v = J(u);
            if (v.start != v.end) {
                var y = u.value;
                u.value = y.slice(0, v.start) + y.slice(v.end)
            }
            D(u, v.start, v.start);
            return v.text
        }
        ;
        K = function(u, v, y, O) {
            var P = u.value;
            u.value = P.slice(0, y) + v + P.slice(y);
            O && (v = y + v.length,
            D(u, v, v))
        }
        ;
        F = function(u, v) {
            var y = J(u)
              , O = u.value;
            u.value = O.slice(0, y.start) + v + O.slice(y.end);
            v = y.start + v.length;
            D(u, v, v)
        }
        ;
        A = function(u, v, y) {
            var O = J(u)
              , P = u.value;
            u.value = P.slice(0, O.start) + v + O.text + y + P.slice(O.end);
            v = O.start + v.length;
            D(u, v, v + O.length)
        }
        ;
        e.fn.extend({
            getSelection: G(J, !1),
            setSelection: G(D, !0),
            collapseSelection: G(S, !0),
            deleteSelectedText: G(t, !0),
            deleteText: G(Q, !0),
            extractSelectedText: G(X, !1),
            insertText: G(K, !0),
            replaceSelectedText: G(F, !0),
            surroundSelectedText: G(A, !0)
        })
    })
}
)(jQuery);
(function(e) {
    "function" === typeof define && define.amd ? define(["jquery", "jquery-ui"], e) : e(jQuery)
}
)(function(e) {
    function w(D, t) {
        if (!(1 < D.originalEvent.touches.length || e(D.target).is("input") || e(D.target).is("textarea"))) {
            D.cancelable && D.preventDefault();
            var Q = D.originalEvent.changedTouches[0]
              , K = document.createEvent("MouseEvents");
            K.initMouseEvent(t, !0, !0, window, 1, Q.screenX, Q.screenY, Q.clientX, Q.clientY, !1, !1, !1, !1, 0, null);
            D.target.dispatchEvent(K)
        }
    }
    e.support.mspointer = window.navigator.msPointerEnabled;
    e.support.touch = "ontouchstart"in document || "ontouchstart"in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints;
    if ((e.support.touch || e.support.mspointer) && e.ui.mouse) {
        var B = e.ui.mouse.prototype, I = B._mouseInit, L = B._mouseDestroy, J;
        B._touchStart = function(D) {
            this._startedMove = D.timeStamp;
            this._startPos = {
                x: D.originalEvent.changedTouches[0].pageX,
                y: D.originalEvent.changedTouches[0].pageY
            };
            !J && this._mouseCapture(D.originalEvent.changedTouches[0]) && (J = !0,
            this._touchMoved = !1,
            w(D, "mouseover"),
            w(D, "mousemove"),
            w(D, "mousedown"))
        }
        ;
        B._touchMove = function(D) {
            J && (this._touchMoved = !0,
            w(D, "mousemove"))
        }
        ;
        B._touchEnd = function(D) {
            if (J) {
                w(D, "mouseup");
                w(D, "mouseout");
                var t = D.timeStamp - this._startedMove;
                !this._touchMoved || 500 > t ? w(D, "click") : (t = D.originalEvent.changedTouches[0].pageY,
                10 > Math.abs(D.originalEvent.changedTouches[0].pageX - this._startPos.x) && 10 > Math.abs(t - this._startPos.y) && (this._touchMoved && "stylus" !== D.originalEvent.changedTouches[0].touchType || w(D, "click")));
                J = this._touchMoved = !1
            }
        }
        ;
        B._mouseInit = function() {
            e.support.mspointer && (this.element[0].style.msTouchAction = "none");
            this.element.on({
                touchstart: e.proxy(this, "_touchStart"),
                touchmove: e.proxy(this, "_touchMove"),
                touchend: e.proxy(this, "_touchEnd")
            });
            I.call(this)
        }
        ;
        B._mouseDestroy = function() {
            this.element.off({
                touchstart: e.proxy(this, "_touchStart"),
                touchmove: e.proxy(this, "_touchMove"),
                touchend: e.proxy(this, "_touchEnd")
            });
            L.call(this)
        }
    }
});
(function() {
    $.fn.extend({
        focus: function(e) {
            return function(w, B) {
                return "number" === typeof w ? this.each(function() {
                    var I = this;
                    setTimeout(function() {
                        $(I).trigger("focus");
                        B && B.call(I)
                    }, w)
                }) : e.apply(this, arguments)
            }
        }($.fn.focus),
        disableSelection: function() {
            var e = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.on(e + ".ui-disableSelection", function(w) {
                    w.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.off(".ui-disableSelection")
        },
        zIndex: function(e) {
            if (void 0 !== e)
                return this.css("zIndex", String(e));
            if (this.length) {
                e = $(this[0]);
                for (var w; e.length && e[0] !== document; ) {
                    w = e.css("position");
                    if ("absolute" === w || "relative" === w || "fixed" === w)
                        if (w = parseInt(e.css("zIndex"), 10),
                        !isNaN(w) && 0 !== w)
                            return w;
                    e = e.parent()
                }
            }
            return 0
        }
    })
}
)();
$.widget("ui.sortable", $.ui.sortable, {
    _setHandleClassName: function() {
        this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
        $.each(this.items, function() {
            (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
        })
    }
});
(function() {
    $.ui.slider.prototype._trimAlignValue = function(e) {
        if (e <= this._valueMin())
            return this._valueMin();
        if (e >= this._valueMax())
            return this._valueMax();
        var w = 0 < this.options.step ? this.options.step : 1;
        e = 0 < (e - this._valueMin()) % w ? Math.floor(e / w) * w : Math.ceil(e / w) * w;
        return e <= this._valueMin() ? this._valueMin() : e >= this._valueMax() ? this._valueMax() : parseFloat(e.toFixed(5))
    }
    ;
    $.ui.slider.prototype._calculateNewMax = function() {
        this.max = parseFloat(this.options.max.toFixed(this._precision()))
    }
}
)();
(function() {
    var e = new $.Event("remove")
      , w = $.fn.remove;
    $.fn.remove = function() {
        $(this).trigger(e);
        return w.apply(this, arguments)
    }
}
)();
