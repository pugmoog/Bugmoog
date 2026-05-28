/** Cooked with Flambe, https://getflambe.com */
'use strict';
(function() {
    function s(a, b) {
        function c() {}
        c.prototype = a;
        var d = new c,
            f;
        for (f in b) d[f] = b[f];
        b.toString !== Object.prototype.toString && (d.toString = b.toString);
        return d
    }

    function Pc(a) {
        return a instanceof Array ? function() {
            return y.iter(a)
        } : "function" == typeof a.iterator ? q(a, a.iterator) : a.iterator
    }

    function q(a, b) {
        if (null == b) return null;
        null == b.__id__ && (b.__id__ = ed++);
        var c;
        null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
        null == c && (c = function() {
            return c.method.apply(c.scope,
                arguments)
        }, c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
        return c
    }
    var e = {},
        k = function() {
            return O.__string_rec(this, "")
        },
        Ba = function(a, b) {
            b = b.split("u").join("");
            this.r = RegExp(a, b)
        };
    e.EReg = Ba;
    Ba.__name__ = ["EReg"];
    Ba.prototype = {
        match: function(a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        matched: function(a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) return this.r.m[a];
            throw "EReg::matched";
        },
        matchedPos: function() {
            if (null == this.r.m) throw "No string matched";
            return {
                pos: this.r.m.index,
                len: this.r.m[0].length
            }
        },
        __class__: Ba
    };
    var Qc = function() {};
    e.FlambePointExtender = Qc;
    Qc.__name__ = ["FlambePointExtender"];
    Qc.sub = function(a, b) {
        a.set(a.x - b.x, a.y - b.y);
        return a
    };
    var y = function() {};
    e.HxOverrides = y;
    y.__name__ = ["HxOverrides"];
    y.dateStr = function(a) {
        var b = a.getMonth() + 1,
            c = a.getDate(),
            d = a.getHours(),
            f = a.getMinutes(),
            i = a.getSeconds();
        return a.getFullYear() + "-" + (10 > b ? "0" + b : "" + b) + "-" + (10 > c ? "0" + c : "" + c) + " " + (10 > d ? "0" + d : "" + d) + ":" + (10 > f ? "0" + f : "" + f) + ":" + (10 > i ? "0" + i : "" + i)
    };
    y.strDate = function(a) {
        switch (a.length) {
            case 8:
                var a = a.split(":"),
                    b = new Date;
                b.setTime(0);
                b.setUTCHours(a[0]);
                b.setUTCMinutes(a[1]);
                b.setUTCSeconds(a[2]);
                return b;
            case 10:
                return a = a.split("-"), new Date(a[0], a[1] - 1, a[2], 0, 0, 0);
            case 19:
                return b = a.split(" "), a = b[0].split("-"), b = b[1].split(":"), new Date(a[0], a[1] - 1, a[2], b[0], b[1], b[2]);
            default:
                throw "Invalid date format : " + a;
        }
    };
    y.cca = function(a, b) {
        var c = a.charCodeAt(b);
        return c != c ? void 0 : c
    };
    y.substr = function(a, b, c) {
        if (null != b && 0 != b && null != c && 0 > c) return "";
        null == c && (c = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > c && (c = a.length + c - b);
        return a.substr(b, c)
    };
    y.remove = function(a, b) {
        var c = a.indexOf(b);
        if (-1 == c) return !1;
        a.splice(c, 1);
        return !0
    };
    y.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur < this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    };
    var wa = function() {};
    e.Lambda = wa;
    wa.__name__ = ["Lambda"];
    wa.array = function(a) {
        for (var b = [], a = Pc(a)(); a.hasNext();) {
            var c = a.next();
            b.push(c)
        }
        return b
    };
    wa.exists = function(a, b) {
        for (var c = Pc(a)(); c.hasNext();) {
            var d =
                c.next();
            if (b(d)) return !0
        }
        return !1
    };
    wa.count = function(a, b) {
        var c = 0;
        if (null == b)
            for (var d = Pc(a)(); d.hasNext();) d.next(), c++;
        else
            for (d = Pc(a)(); d.hasNext();) {
                var f = d.next();
                b(f) && c++
            }
        return c
    };
    var nb = function() {
        this.length = 0
    };
    e.List = nb;
    nb.__name__ = ["List"];
    nb.prototype = {
        add: function(a) {
            a = [a];
            null == this.h ? this.h = a : this.q[1] = a;
            this.q = a;
            this.length++
        },
        iterator: function() {
            return {
                h: this.h,
                hasNext: function() {
                    return null != this.h
                },
                next: function() {
                    if (null == this.h) return null;
                    var a = this.h[0];
                    this.h = this.h[1];
                    return a
                }
            }
        },
        __class__: nb
    };
    var ob = function() {};
    e.IMap = ob;
    ob.__name__ = ["IMap"];
    Math.__name__ = ["Math"];
    var A = function() {};
    e.Reflect = A;
    A.__name__ = ["Reflect"];
    A.field = function(a, b) {
        try {
            return a[b]
        } catch (c) {
            return null
        }
    };
    A.callMethod = function(a, b, c) {
        return b.apply(a, c)
    };
    A.fields = function(a) {
        var b = [];
        if (null != a) {
            var c = Object.prototype.hasOwnProperty,
                d;
            for (d in a) "__id__" != d && "hx__closures__" != d && c.call(a, d) && b.push(d)
        }
        return b
    };
    A.isFunction = function(a) {
        return "function" == typeof a && !(a.__name__ || a.__ename__)
    };
    A.compare = function(a, b) {
        return a == b ? 0 : a > b ? 1 : -1
    };
    A.isEnumValue = function(a) {
        return null != a && null != a.__enum__
    };
    A.deleteField = function(a, b) {
        if (!Object.prototype.hasOwnProperty.call(a, b)) return !1;
        delete a[b];
        return !0
    };
    var hc = function() {
        this.myMap = new ta
    };
    e.Set = hc;
    hc.__name__ = ["Set"];
    hc.prototype = {
        clear: function() {
            this.myMap = new ta
        },
        insert: function(a) {
            this.myMap.set(a, !0)
        },
        exists: function(a) {
            return null != this.myMap.h.__keys__[a.__id__]
        },
        iterator: function() {
            return this.myMap.keys()
        },
        __class__: hc
    };
    var r =
        function() {};
    e.Std = r;
    r.__name__ = ["Std"];
    r.is = function(a, b) {
        return O.__instanceof(a, b)
    };
    r.instance = function(a, b) {
        return a instanceof b ? a : null
    };
    r.string = function(a) {
        return O.__string_rec(a, "")
    };
    r["int"] = function(a) {
        return a | 0
    };
    r.parseInt = function(a) {
        var b = parseInt(a, 10);
        if (0 == b && (120 == y.cca(a, 1) || 88 == y.cca(a, 1))) b = parseInt(a);
        return isNaN(b) ? null : b
    };
    r.parseFloat = function(a) {
        return parseFloat(a)
    };
    r.random = function(a) {
        return 0 >= a ? 0 : Math.floor(Math.random() * a)
    };
    var pb = function() {
        this.b = ""
    };
    e.StringBuf =
        pb;
    pb.__name__ = ["StringBuf"];
    pb.prototype = {
        add: function(a) {
            this.b += r.string(a)
        },
        __class__: pb
    };
    var ha = function() {};
    e.StringTools = ha;
    ha.__name__ = ["StringTools"];
    ha.startsWith = function(a, b) {
        return a.length >= b.length && y.substr(a, 0, b.length) == b
    };
    ha.fastCodeAt = function(a, b) {
        return a.charCodeAt(b)
    };
    var u = e.ValueType = {
        __ename__: ["ValueType"],
        __constructs__: "TNull,TInt,TFloat,TBool,TObject,TFunction,TClass,TEnum,TUnknown".split(",")
    };
    u.TNull = ["TNull", 0];
    u.TNull.toString = k;
    u.TNull.__enum__ = u;
    u.TInt = ["TInt",
        1
    ];
    u.TInt.toString = k;
    u.TInt.__enum__ = u;
    u.TFloat = ["TFloat", 2];
    u.TFloat.toString = k;
    u.TFloat.__enum__ = u;
    u.TBool = ["TBool", 3];
    u.TBool.toString = k;
    u.TBool.__enum__ = u;
    u.TObject = ["TObject", 4];
    u.TObject.toString = k;
    u.TObject.__enum__ = u;
    u.TFunction = ["TFunction", 5];
    u.TFunction.toString = k;
    u.TFunction.__enum__ = u;
    u.TClass = function(a) {
        a = ["TClass", 6, a];
        a.__enum__ = u;
        a.toString = k;
        return a
    };
    u.TEnum = function(a) {
        a = ["TEnum", 7, a];
        a.__enum__ = u;
        a.toString = k;
        return a
    };
    u.TUnknown = ["TUnknown", 8];
    u.TUnknown.toString = k;
    u.TUnknown.__enum__ =
        u;
    var L = function() {};
    e.Type = L;
    L.__name__ = ["Type"];
    L.getClassName = function(a) {
        return a.__name__.join(".")
    };
    L.getEnumName = function(a) {
        return a.__ename__.join(".")
    };
    L.resolveClass = function(a) {
        a = e[a];
        return null == a || !a.__name__ ? null : a
    };
    L.resolveEnum = function(a) {
        a = e[a];
        return null == a || !a.__ename__ ? null : a
    };
    L.createEmptyInstance = function(a) {
        function b() {}
        b.prototype = a.prototype;
        return new b
    };
    L.createEnum = function(a, b, c) {
        var d = A.field(a, b);
        if (null == d) throw "No such constructor " + b;
        if (A.isFunction(d)) {
            if (null ==
                c) throw "Constructor " + b + " need parameters";
            return d.apply(a, c)
        }
        if (null != c && 0 != c.length) throw "Constructor " + b + " does not need parameters";
        return d
    };
    L.getEnumConstructs = function(a) {
        return a.__constructs__.slice()
    };
    L["typeof"] = function(a) {
        switch (typeof a) {
            case "boolean":
                return u.TBool;
            case "string":
                return u.TClass(String);
            case "number":
                return Math.ceil(a) == a % 2147483648 ? u.TInt : u.TFloat;
            case "object":
                if (null == a) return u.TNull;
                var b = a.__enum__;
                if (null != b) return u.TEnum(b);
                a = a instanceof Array && null == a.__enum__ ?
                    Array : a.__class__;
                return null != a ? u.TClass(a) : u.TObject;
            case "function":
                return a.__name__ || a.__ename__ ? u.TObject : u.TFunction;
            case "undefined":
                return u.TNull;
            default:
                return u.TUnknown
        }
    };
    var ic = function(a, b) {
        this.now = a;
        this.limit = b
    };
    e.DecIter = ic;
    ic.__name__ = ["DecIter"];
    ic.prototype = {
        hasNext: function() {
            return this.now >= this.limit
        },
        next: function() {
            return this.now--
        },
        __class__: ic
    };
    var xa = function(a) {
        var b = this;
        this.id = setInterval(function() {
            b.run()
        }, a)
    };
    e["haxe.Timer"] = xa;
    xa.__name__ = ["haxe", "Timer"];
    xa.delay =
        function(a, b) {
            var c = new xa(b);
            c.run = function() {
                c.stop();
                a()
            };
            return c
        };
    xa.stamp = function() {
        return (new Date).getTime() / 1E3
    };
    xa.prototype = {
        stop: function() {
            null != this.id && (clearInterval(this.id), this.id = null)
        },
        run: function() {},
        __class__: xa
    };
    var J = function() {};
    e.Util = J;
    J.__name__ = ["Util"];
    J.Assert = function(a) {
        a || J.NullRef.charAt(0)
    };
    J.NegIter = function(a, b) {
        return new ic(a, b)
    };
    J.LimitI = function(a, b, c) {
        a < b && (a = b);
        a > c && (a = c);
        return a
    };
    var ya = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b;
        null
    };
    e.Vec2 = ya;
    ya.__name__ = ["Vec2"];
    ya.GetTForClosestPointOnLine = function(a, b, c) {
        var d = b.x * b.x + b.y * b.y;
        return 0 == d ? 0 : (new ya(c.x - a.x, c.y - a.y)).dot(b) / d
    };
    ya.prototype = {
        dot: function(a) {
            return this.x * a.x + this.y * a.y
        },
        __class__: ya
    };
    var pa = function() {};
    e["flambe.util.Disposable"] = pa;
    pa.__name__ = ["flambe", "util", "Disposable"];
    pa.prototype = {
        __class__: pa
    };
    var g = function() {
        this._flags = 0;
        this.owner = this.next = null
    };
    e["flambe.Component"] = g;
    g.__name__ = ["flambe", "Component"];
    g.__interfaces__ = [pa];
    g.prototype = {
        onAdded: function() {},
        onRemoved: function() {},
        onStart: function() {},
        onStop: function() {},
        onUpdate: function() {},
        dispose: function() {
            null != this.owner && this.owner.remove(this)
        },
        get_name: function() {
            return null
        },
        __class__: g
    };
    var o = function() {
        this.parent = this.firstChild = this.next = this.firstComponent = null;
        this._compMap = {}
    };
    e["flambe.Entity"] = o;
    o.__name__ = ["flambe", "Entity"];
    o.__interfaces__ = [pa];
    o.prototype = {
        add: function(a) {
            null != a.owner && a.owner.remove(a);
            var b = a.get_name(),
                c = this._compMap[b];
            null != c && this.remove(c);
            this._compMap[b] =
                a;
            b = null;
            for (c = this.firstComponent; null != c;) b = c, c = c.next;
            null != b ? b.next = a : this.firstComponent = a;
            a.owner = this;
            a.next = null;
            a.onAdded();
            return this
        },
        remove: function(a) {
            for (var b = null, c = this.firstComponent; null != c;) {
                var d = c.next;
                if (c == a) return null == b ? this.firstComponent = d : (b.owner = this, b.next = d), delete this._compMap[c.get_name()], 0 != (c._flags & 1) && (c.onStop(), c._flags &= -2), c.onRemoved(), c.owner = null, c.next = null, !0;
                b = c;
                c = d
            }
            return !1
        },
        addChild: function(a, b) {
            null == b && (b = !0);
            null != a.parent && a.parent.removeChild(a);
            a.parent = this;
            if (b) {
                for (var c = null, d = this.firstChild; null != d;) c = d, d = d.next;
                null != c ? c.next = a : this.firstChild = a
            } else a.next = this.firstChild, this.firstChild = a;
            return this
        },
        removeChild: function(a) {
            for (var b = null, c = this.firstChild; null != c;) {
                var d = c.next;
                if (c == a) {
                    null == b ? this.firstChild = d : b.next = d;
                    c.parent = null;
                    c.next = null;
                    break
                }
                b = c;
                c = d
            }
        },
        disposeChildren: function() {
            for (; null != this.firstChild;) this.firstChild.dispose()
        },
        dispose: function() {
            for (null != this.parent && this.parent.removeChild(this); null != this.firstComponent;) this.firstComponent.dispose();
            this.disposeChildren()
        },
        __class__: o
    };
    var Rc = function() {};
    e["flambe.util.PackageLog"] = Rc;
    Rc.__name__ = ["flambe", "util", "PackageLog"];
    var jc = function() {};
    e["flambe.platform.Platform"] = jc;
    jc.__name__ = ["flambe", "platform", "Platform"];
    jc.prototype = {
        __class__: jc
    };
    var Ca = function() {};
    e["flambe.platform.html.HtmlPlatform"] = Ca;
    Ca.__name__ = ["flambe", "platform", "html", "HtmlPlatform"];
    Ca.__interfaces__ = [jc];
    Ca.prototype = {
        init: function() {
            var a = this;
            p.fixAndroidMath();
            var b = null;
            try {
                b = window.flambe.canvas
            } catch (c) {}
            b.setAttribute("tabindex",
                "0");
            b.style.outlineStyle = "none";
            b.style.webkitTapHighlightColor = "transparent";
            b.setAttribute("moz-opaque", "true");
            p.callLater(function() {
                b.style.opacity = "0.99";
                p.callLater(function() {
                    b.style.opacity = "1.0";
                    null
                }, 200)
            });
            this._stage = new Ka(b);
            this._pointer = new P;
            this._mouse = new qb(this._pointer, b);
            this._renderer = this.createRenderer(b);
            this.mainLoop = new La;
            this.musicPlaying = !1;
            this._canvas = b;
            this._container = b.parentElement;
            this._container.style.overflow = "hidden";
            this._container.style.position = "relative";
            this._container.style.msTouchAction = "none";
            var d = 0,
                f = function(c) {
                    if (!(1E3 > c.timeStamp - d)) {
                        var f = b.getBoundingClientRect(),
                            i = a.getX(c, f),
                            f = a.getY(c, f);
                        switch (c.type) {
                            case "mousedown":
                                c.target == b && (c.preventDefault(), a._mouse.submitDown(i, f, c.button), b.focus());
                                break;
                            case "mousemove":
                                a._mouse.submitMove(i, f);
                                break;
                            case "mouseup":
                                a._mouse.submitUp(i, f, c.button);
                                break;
                            case "mousewheel":
                            case "DOMMouseScroll":
                                a._mouse.submitScroll(i, f, "mousewheel" == c.type ? c.wheelDelta / 40 : -c.detail) && c.preventDefault()
                        }
                    }
                };
            window.addEventListener("mousedown", f, !1);
            window.addEventListener("mousemove", f, !1);
            window.addEventListener("mouseup", f, !1);
            b.addEventListener("mousewheel", f, !1);
            b.addEventListener("DOMMouseScroll", f, !1);
            b.addEventListener("contextmenu", function(a) {
                a.preventDefault()
            }, !1);
            var i = "undefined" != typeof window.ontouchstart,
                f = "msMaxTouchPoints" in window.navigator && 1 < window.navigator.msMaxTouchPoints;
            if (i || f) {
                var e = new rb(this._pointer, i ? 4 : window.navigator.msMaxTouchPoints);
                this._touch = e;
                f = function(b) {
                    var c;
                    c = i ? b.changedTouches : [b];
                    var f = b.target.getBoundingClientRect();
                    d = b.timeStamp;
                    switch (b.type) {
                        case "touchstart":
                        case "MSPointerDown":
                        case "pointerdown":
                            b.preventDefault();
                            p.SHOULD_HIDE_MOBILE_BROWSER && p.hideMobileBrowser();
                            for (b = 0; b < c.length;) {
                                var n = c[b];
                                ++b;
                                var g = a.getX(n, f),
                                    kc = a.getY(n, f);
                                e.submitDown((i ? n.identifier : n.pointerId) | 0, g, kc)
                            }
                            break;
                        case "touchmove":
                        case "MSPointerMove":
                        case "pointermove":
                            b.preventDefault();
                            for (b = 0; b < c.length;) n = c[b], ++b, g = a.getX(n, f), kc = a.getY(n, f), e.submitMove((i ? n.identifier :
                                n.pointerId) | 0, g, kc);
                            break;
                        case "touchend":
                        case "touchcancel":
                        case "MSPointerUp":
                        case "pointerup":
                            for (b = 0; b < c.length;) n = c[b], ++b, g = a.getX(n, f), kc = a.getY(n, f), e.submitUp((i ? n.identifier : n.pointerId) | 0, g, kc)
                    }
                };
                i ? (b.addEventListener("touchstart", f, !1), b.addEventListener("touchmove", f, !1), b.addEventListener("touchend", f, !1), b.addEventListener("touchcancel", f, !1)) : (b.addEventListener("MSPointerDown", f, !1), b.addEventListener("MSPointerMove", f, !1), b.addEventListener("MSPointerUp", f, !1))
            } else this._touch =
                new sb;
            var g = window.onerror;
            window.onerror = function(a, b, c) {
                l.uncaughtError.emit(a);
                return null != g ? g(a, b, c) : !1
            };
            var n = p.loadExtension("hidden", window.document);
            null != n.value ? (f = function() {
                l.hidden.set__(A.field(window.document, n.field))
            }, f(null), window.document.addEventListener(n.prefix + "visibilitychange", f, !1)) : (f = function(a) {
                l.hidden.set__("pagehide" == a.type || "blur" == a.type)
            }, window.addEventListener("pageshow", f, !1), window.addEventListener("pagehide", f, !1), window.addEventListener("focus", f, !1), window.addEventListener("blur",
                f, !1));
            l.hidden.get_changed().connect(function(b) {
                b || (a._skipFrame = !0)
            });
            this._skipFrame = !1;
            this._lastUpdate = Date.now();
            var ad = p.loadExtension("requestAnimationFrame").value;
            if (null != ad) {
                var h = window.performance,
                    j = null != h && p.polyfill("now", h);
                j ? this._lastUpdate = h.now() : null;
                var k = null,
                    k = function(c) {
                        a.update(j ? h.now() : c);
                        ad(k, b)
                    };
                ad(k, b)
            } else window.setInterval(function() {
                a.update(Date.now())
            }, 16);
            Xa.info("Initialized HTML platform", ["renderer", this._renderer.get_type()])
        },
        loadAssetPack: function(a) {
            return (new D(this,
                a)).promise
        },
        getStage: function() {
            return this._stage
        },
        getStorage: function() {
            if (null == this._storage) {
                var a = Sc.getLocalStorage();
                this._storage = null != a ? new tb(a) : new ub
            }
            return this._storage
        },
        update: function(a) {
            var b = (a - this._lastUpdate) / 1E3;
            this._lastUpdate = a;
            l.hidden._value || (this._skipFrame ? this._skipFrame = !1 : (this.mainLoop.update(b), this.mainLoop.render(this._renderer)))
        },
        getPointer: function() {
            return this._pointer
        },
        getWeb: function() {
            null == this._web && (this._web = new vb(this._container));
            return this._web
        },
        getRenderer: function() {
            return this._renderer
        },
        getX: function(a, b) {
            return (a.clientX - b.left) * this._stage.get_width() / b.width
        },
        getY: function(a, b) {
            return (a.clientY - b.top) * this._stage.get_height() / b.height
        },
        createRenderer: function(a) {
            return new Ma(a)
        },
        __class__: Ca
    };
    var X = function(a, b) {
        this._value = a;
        this._changed = null != b ? new Ya(b) : null
    };
    e["flambe.util.Value"] = X;
    X.__name__ = ["flambe", "util", "Value"];
    X.prototype = {
        watch: function(a) {
            a(this._value, this._value);
            return this.get_changed().connect(a)
        },
        set__: function(a) {
            var b =
                this._value;
            a != b && (this._value = a, null != this._changed && this._changed.emit(a, b));
            return a
        },
        get_changed: function() {
            null == this._changed && (this._changed = new Ya);
            return this._changed
        },
        __class__: X
    };
    var Na = function(a, b) {
        this._next = null;
        this._signal = a;
        this._listener = b;
        this.stayInList = !0
    };
    e["flambe.util.SignalConnection"] = Na;
    Na.__name__ = ["flambe", "util", "SignalConnection"];
    Na.__interfaces__ = [pa];
    Na.prototype = {
        once: function() {
            this.stayInList = !1;
            return this
        },
        dispose: function() {
            null != this._signal && (this._signal.disconnect(this),
                this._signal = null)
        },
        __class__: Na
    };
    var M = function(a) {
        this._head = null != a ? new Na(this, a) : null;
        this._deferredTasks = null
    };
    e["flambe.util.SignalBase"] = M;
    M.__name__ = ["flambe", "util", "SignalBase"];
    M.prototype = {
        connectImpl: function(a, b) {
            var c = this,
                d = new Na(this, a);
            this._head == M.DISPATCHING_SENTINEL ? this.defer(function() {
                c.listAdd(d, b)
            }) : this.listAdd(d, b);
            return d
        },
        disconnect: function(a) {
            var b = this;
            this._head == M.DISPATCHING_SENTINEL ? this.defer(function() {
                b.listRemove(a)
            }) : this.listRemove(a)
        },
        defer: function(a) {
            for (var b =
                    null, c = this._deferredTasks; null != c;) b = c, c = c.next;
            a = new lc(a);
            null != b ? b.next = a : this._deferredTasks = a
        },
        willEmit: function() {
            var a = this._head;
            this._head = M.DISPATCHING_SENTINEL;
            return a
        },
        didEmit: function(a) {
            this._head = a;
            a = this._deferredTasks;
            for (this._deferredTasks = null; null != a;) a.fn(), a = a.next
        },
        listAdd: function(a, b) {
            if (b) a._next = this._head, this._head = a;
            else {
                for (var c = null, d = this._head; null != d;) c = d, d = d._next;
                null != c ? c._next = a : this._head = a
            }
        },
        listRemove: function(a) {
            for (var b = null, c = this._head; null != c;) {
                if (c ==
                    a) {
                    a = c._next;
                    null == b ? this._head = a : b._next = a;
                    break
                }
                b = c;
                c = c._next
            }
        },
        __class__: M
    };
    var Ya = function(a) {
        M.call(this, a)
    };
    e["flambe.util.Signal2"] = Ya;
    Ya.__name__ = ["flambe", "util", "Signal2"];
    Ya.__super__ = M;
    Ya.prototype = s(M.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function(a, b) {
            var c = this;
            this._head == M.DISPATCHING_SENTINEL ? this.defer(function() {
                c.emitImpl(a, b)
            }) : this.emitImpl(a, b)
        },
        emitImpl: function(a, b) {
            for (var c = this.willEmit(), d = c; null != d;) d._listener(a, b), d.stayInList ||
                d.dispose(), d = d._next;
            this.didEmit(c)
        },
        __class__: Ya
    });
    var B = function(a) {
        M.call(this, a)
    };
    e["flambe.util.Signal1"] = B;
    B.__name__ = ["flambe", "util", "Signal1"];
    B.__super__ = M;
    B.prototype = s(M.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function(a) {
            var b = this;
            this._head == M.DISPATCHING_SENTINEL ? this.defer(function() {
                b.emitImpl(a)
            }) : this.emitImpl(a)
        },
        emitImpl: function(a) {
            for (var b = this.willEmit(), c = b; null != c;) c._listener(a), c.stayInList || c.dispose(), c = c._next;
            this.didEmit(b)
        },
        __class__: B
    });
    var E = function(a, b) {
        this._behavior = null;
        X.call(this, a, b)
    };
    e["flambe.animation.AnimatedFloat"] = E;
    E.__name__ = ["flambe", "animation", "AnimatedFloat"];
    E.__super__ = X;
    E.prototype = s(X.prototype, {
        set__: function(a) {
            this._behavior = null;
            return X.prototype.set__.call(this, a)
        },
        update: function(a) {
            null != this._behavior && (X.prototype.set__.call(this, this._behavior.update(a)), this._behavior.isComplete() && (this._behavior = null))
        },
        animate: function(a, b, c, d) {
            this.set__(a);
            this.animateTo(b, c, d)
        },
        animateTo: function(a,
            b, c) {
            this.set_behavior(new Oa(this._value, a, b, c))
        },
        set_behavior: function(a) {
            this._behavior = a;
            this.update(0);
            return a
        },
        __class__: E
    });
    var l = function() {};
    e["flambe.System"] = l;
    l.__name__ = ["flambe", "System"];
    l.init = function() {
        l._calledInit || (l._platform.init(), l._calledInit = !0)
    };
    l.loadAssetPack = function(a) {
        return l._platform.loadAssetPack(a)
    };
    var Xa = function() {};
    e["flambe.Log"] = Xa;
    Xa.__name__ = ["flambe", "Log"];
    Xa.info = function() {
        null
    };
    Xa.__super__ = Rc;
    Xa.prototype = s(Rc.prototype, {
        __class__: Xa
    });
    var mc = function() {
        this._realDt =
            0
    };
    e["flambe.SpeedAdjuster"] = mc;
    mc.__name__ = ["flambe", "SpeedAdjuster"];
    mc.__super__ = g;
    mc.prototype = s(g.prototype, {
        get_name: function() {
            return "SpeedAdjuster_14"
        },
        onUpdate: function(a) {
            0 < this._realDt && (a = this._realDt, this._realDt = 0);
            this.scale.update(a)
        },
        __class__: mc
    });
    var wb = function() {};
    e["flambe.animation.Behavior"] = wb;
    wb.__name__ = ["flambe", "animation", "Behavior"];
    wb.prototype = {
        __class__: wb
    };
    var t = function() {};
    e["flambe.animation.Ease"] = t;
    t.__name__ = ["flambe", "animation", "Ease"];
    t.linear = function(a) {
        return a
    };
    t.sineInOut = function(a) {
        return 0.5 - Math.cos(3.141592653589793 * a) / 2
    };
    t.bounceIn = function(a) {
        a = 1 - a;
        return 0.36363636363636365 > a ? 1 - 7.5625 * a * a : 0.7272727272727273 > a ? 1 - (7.5625 * (a - 0.5454545454545454) * (a - 0.5454545454545454) + 0.75) : 0.9090909090909091 > a ? 1 - (7.5625 * (a - 0.8181818181818182) * (a - 0.8181818181818182) + 0.9375) : 1 - (7.5625 * (a - 0.9545454545454546) * (a - 0.9545454545454546) + 0.984375)
    };
    t.bounceOut = function(a) {
        return 0.36363636363636365 > a ? 7.5625 * a * a : 0.7272727272727273 > a ? 7.5625 * (a - 0.5454545454545454) * (a - 0.5454545454545454) +
            0.75 : 0.9090909090909091 > a ? 7.5625 * (a - 0.8181818181818182) * (a - 0.8181818181818182) + 0.9375 : 7.5625 * (a - 0.9545454545454546) * (a - 0.9545454545454546) + 0.984375
    };
    t.circIn = function(a) {
        return 1 - Math.sqrt(1 - a * a)
    };
    t.circOut = function(a) {
        --a;
        return Math.sqrt(1 - a * a)
    };
    t.circInOut = function(a) {
        return 0.5 >= a ? (Math.sqrt(1 - 4 * a * a) - 1) / -2 : (Math.sqrt(1 - (2 * a - 2) * (2 * a - 2)) + 1) / 2
    };
    t.expoIn = function(a) {
        return Math.pow(2, 10 * (a - 1))
    };
    t.expoOut = function(a) {
        return -Math.pow(2, -10 * a) + 1
    };
    t.expoInOut = function(a) {
        return 0.5 > a ? Math.pow(2, 10 * (2 *
            a - 1)) / 2 : (-Math.pow(2, -10 * (2 * a - 1)) + 2) / 2
    };
    t.backOut = function(a) {
        return 1 - --a * a * (-2.70158 * a - 1.70158)
    };
    var Za = function(a, b, c, d, f) {
        null == f && (f = 0);
        null == d && (d = 0);
        null == c && (c = 1);
        this.start = a;
        this.end = b;
        this.cycles = d;
        this.speed = new E(c);
        this._count = 1.5707963267948966 + f * (3.141592653589793 / c);
        this._distance = 0.5 * (a - b);
        this._center = b + this._distance
    };
    e["flambe.animation.Sine"] = Za;
    Za.__name__ = ["flambe", "animation", "Sine"];
    Za.__interfaces__ = [wb];
    Za.prototype = {
        update: function(a) {
            this.speed.update(a);
            this._count +=
                a * (3.141592653589793 / this.speed._value);
            return this._center + Math.sin(this._count) * this._distance
        },
        isComplete: function() {
            return 0 < this.cycles && 0.5 * ((this._count - 1.5707963267948966) / 3.141592653589793) >= this.cycles
        },
        __class__: Za
    };
    var Oa = function(a, b, c, d) {
        this._from = a;
        this._to = b;
        this._duration = c;
        this.elapsed = 0;
        this._easing = null != d ? d : t.linear
    };
    e["flambe.animation.Tween"] = Oa;
    Oa.__name__ = ["flambe", "animation", "Tween"];
    Oa.__interfaces__ = [wb];
    Oa.prototype = {
        update: function(a) {
            this.elapsed += a;
            return this.elapsed >=
                this._duration ? this._to : this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration)
        },
        isComplete: function() {
            return this.elapsed >= this._duration
        },
        __class__: Oa
    };
    var Da = function() {};
    e["flambe.asset.Asset"] = Da;
    Da.__name__ = ["flambe", "asset", "Asset"];
    Da.__interfaces__ = [pa];
    Da.prototype = {
        __class__: Da
    };
    var h = e["flambe.asset.AssetFormat"] = {
        __ename__: ["flambe", "asset", "AssetFormat"],
        __constructs__: "WEBP,JXR,PNG,JPG,GIF,DDS,PVR,PKM,MP3,M4A,OPUS,OGG,WAV,Data".split(",")
    };
    h.WEBP = ["WEBP", 0];
    h.WEBP.toString =
        k;
    h.WEBP.__enum__ = h;
    h.JXR = ["JXR", 1];
    h.JXR.toString = k;
    h.JXR.__enum__ = h;
    h.PNG = ["PNG", 2];
    h.PNG.toString = k;
    h.PNG.__enum__ = h;
    h.JPG = ["JPG", 3];
    h.JPG.toString = k;
    h.JPG.__enum__ = h;
    h.GIF = ["GIF", 4];
    h.GIF.toString = k;
    h.GIF.__enum__ = h;
    h.DDS = ["DDS", 5];
    h.DDS.toString = k;
    h.DDS.__enum__ = h;
    h.PVR = ["PVR", 6];
    h.PVR.toString = k;
    h.PVR.__enum__ = h;
    h.PKM = ["PKM", 7];
    h.PKM.toString = k;
    h.PKM.__enum__ = h;
    h.MP3 = ["MP3", 8];
    h.MP3.toString = k;
    h.MP3.__enum__ = h;
    h.M4A = ["M4A", 9];
    h.M4A.toString = k;
    h.M4A.__enum__ = h;
    h.OPUS = ["OPUS", 10];
    h.OPUS.toString =
        k;
    h.OPUS.__enum__ = h;
    h.OGG = ["OGG", 11];
    h.OGG.toString = k;
    h.OGG.__enum__ = h;
    h.WAV = ["WAV", 12];
    h.WAV.toString = k;
    h.WAV.__enum__ = h;
    h.Data = ["Data", 13];
    h.Data.toString = k;
    h.Data.__enum__ = h;
    var nc = function(a, b, c, d) {
        this.name = a;
        this.url = b;
        this.format = c;
        this.bytes = d
    };
    e["flambe.asset.AssetEntry"] = nc;
    nc.__name__ = ["flambe", "asset", "AssetEntry"];
    nc.prototype = {
        __class__: nc
    };
    var $a = function() {};
    e["flambe.asset.AssetPack"] = $a;
    $a.__name__ = ["flambe", "asset", "AssetPack"];
    $a.__interfaces__ = [pa];
    $a.prototype = {
        __class__: $a
    };
    var xb = function() {};
    e["flambe.asset.File"] = xb;
    xb.__name__ = ["flambe", "asset", "File"];
    xb.__interfaces__ = [Da];
    xb.prototype = {
        __class__: xb
    };
    var Y = function() {
        this._localBase = this._remoteBase = null;
        this._entries = []
    };
    e["flambe.asset.Manifest"] = Y;
    Y.__name__ = ["flambe", "asset", "Manifest"];
    Y.fromAssets = function(a, b) {
        null == b && (b = !0);
        var c = A.field(Tc.getType(Y).assets[0], a);
        if (null == c) {
            if (b) throw U.withFields("Missing asset pack", ["name", a]);
            return null
        }
        var d = new Y;
        d.set_localBase("assets");
        for (var f = 0; f < c.length;) {
            var i =
                c[f];
            ++f;
            var e = i.name,
                g = a + "/" + e + "?v=" + r.string(i.md5),
                n = Y.inferFormat(e);
            n != h.Data && (e = U.removeFileExtension(e));
            d.add(e, g, i.bytes, n)
        }
        return d
    };
    Y.inferFormat = function(a) {
        a = U.getUrlExtension(a);
        if (null != a) switch (a.toLowerCase()) {
            case "gif":
                return h.GIF;
            case "jpg":
            case "jpeg":
                return h.JPG;
            case "jxr":
            case "wdp":
                return h.JXR;
            case "png":
                return h.PNG;
            case "webp":
                return h.WEBP;
            case "dds":
                return h.DDS;
            case "pvr":
                return h.PVR;
            case "pkm":
                return h.PKM;
            case "m4a":
                return h.M4A;
            case "mp3":
                return h.MP3;
            case "ogg":
                return h.OGG;
            case "opus":
                return h.OPUS;
            case "wav":
                return h.WAV
        } else null;
        return h.Data
    };
    Y.prototype = {
        add: function(a, b, c, d) {
            null == c && (c = 0);
            null == d && (d = Y.inferFormat(b));
            a = new nc(a, b, d, c);
            this._entries.push(a);
            return a
        },
        iterator: function() {
            return y.iter(this._entries)
        },
        getFullURL: function(a) {
            var b;
            b = null != this.get_remoteBase() && Y._supportsCrossOrigin ? this.get_remoteBase() : this.get_localBase();
            return null != b ? U.joinPath(b, a.url) : a.url
        },
        get_localBase: function() {
            return this._localBase
        },
        set_localBase: function(a) {
            null !=
                a && Uc.that(!ha.startsWith(a, "http://") && !ha.startsWith(a, "https://"), "localBase must be a path on the same domain, NOT starting with http(s)://", null);
            return this._localBase = a
        },
        get_remoteBase: function() {
            return this._remoteBase
        },
        __class__: Y
    };
    var H = e["flambe.display.BlendMode"] = {
        __ename__: ["flambe", "display", "BlendMode"],
        __constructs__: "Normal,Add,Multiply,Screen,Mask,Copy".split(",")
    };
    H.Normal = ["Normal", 0];
    H.Normal.toString = k;
    H.Normal.__enum__ = H;
    H.Add = ["Add", 1];
    H.Add.toString = k;
    H.Add.__enum__ = H;
    H.Multiply = ["Multiply", 2];
    H.Multiply.toString = k;
    H.Multiply.__enum__ = H;
    H.Screen = ["Screen", 3];
    H.Screen.toString = k;
    H.Screen.__enum__ = H;
    H.Mask = ["Mask", 4];
    H.Mask.toString = k;
    H.Mask.__enum__ = H;
    H.Copy = ["Copy", 5];
    H.Copy.toString = k;
    H.Copy.__enum__ = H;
    var ca = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b
    };
    e["flambe.math.Point"] = ca;
    ca.__name__ = ["flambe", "math", "Point"];
    ca.prototype = {
        set: function(a, b) {
            this.x = a;
            this.y = b
        },
        normalize: function() {
            var a = this.magnitude();
            this.x /= a;
            this.y /= a
        },
        magnitude: function() {
            return Math.sqrt(this.x *
                this.x + this.y * this.y)
        },
        distanceTo: function(a, b) {
            return Math.sqrt(this.distanceToSquared(a, b))
        },
        distanceToSquared: function(a, b) {
            var c = this.x - a,
                d = this.y - b;
            return c * c + d * d
        },
        clone: function(a) {
            if (null == a) return new ca(this.x, this.y);
            a.set(this.x, this.y);
            return a
        },
        __class__: ca
    };
    var v = function() {
        this._viewMatrixUpdateCount = this._parentViewMatrixUpdateCount = 0;
        this.blendMode = this.scissor = this._viewMatrix = null;
        var a = this;
        g.call(this);
        this._flags |= 54;
        this._localMatrix = new Ea;
        var b = function() {
            a._flags |= 24
        };
        this.x =
            new E(0, b);
        this.y = new E(0, b);
        this.rotation = new E(0, b);
        this.scaleX = new E(1, b);
        this.scaleY = new E(1, b);
        this.anchorX = new E(0, b);
        this.anchorY = new E(0, b);
        this.alpha = new E(1)
    };
    e["flambe.display.Sprite"] = v;
    v.__name__ = ["flambe", "display", "Sprite"];
    v.hitTest = function(a, b, c) {
        var d = a._compMap.Sprite_12;
        if (null != d) {
            if (6 != (d._flags & 6)) return null;
            d.getLocalMatrix().inverseTransform(b, c, v._scratchPoint) && (b = v._scratchPoint.x, c = v._scratchPoint.y);
            var f = d.scissor;
            if (null != f && !f.contains(b, c)) return null
        }
        a = v.hitTestBackwards(a.firstChild,
            b, c);
        return null != a ? a : null != d && d.containsLocal(b, c) ? d : null
    };
    v.render = function(a, b) {
        var c = a._compMap.Sprite_12;
        if (null != c) {
            var d = c.alpha._value;
            if (0 == (c._flags & 2) || 0 >= d) return;
            b.save();
            1 > d && b.multiplyAlpha(d);
            null != c.blendMode && b.setBlendMode(c.blendMode);
            var d = c.getLocalMatrix(),
                f = d.m02,
                i = d.m12;
            0 != (c._flags & 32) && (f = Math.round(f), i = Math.round(i));
            b.transform(d.m00, d.m10, d.m01, d.m11, f, i);
            d = c.scissor;
            null != d && b.applyScissor(d.x, d.y, d.width, d.height);
            c.draw(b)
        }
        d = a._compMap.Director_13;
        if (null != d) {
            d = d.occludedScenes;
            for (f = 0; f < d.length;) i = d[f], ++f, v.render(i, b)
        }
        for (d = a.firstChild; null != d;) f = d.next, v.render(d, b), d = f;
        null != c && b.restore()
    };
    v.hitTestBackwards = function(a, b, c) {
        if (null != a) {
            var d = v.hitTestBackwards(a.next, b, c);
            return null != d ? d : v.hitTest(a, b, c)
        }
        return null
    };
    v.__super__ = g;
    v.prototype = s(g.prototype, {
        get_name: function() {
            return "Sprite_12"
        },
        getNaturalWidth: function() {
            return 0
        },
        getNaturalHeight: function() {
            return 0
        },
        containsLocal: function(a, b) {
            return 0 <= a && a < this.getNaturalWidth() && 0 <= b && b < this.getNaturalHeight()
        },
        getLocalMatrix: function() {
            0 != (this._flags & 8) && (this._flags &= -9, this._localMatrix.compose(this.x._value, this.y._value, this.scaleX._value, this.scaleY._value, 3.141592653589793 * this.rotation._value / 180), this._localMatrix.translate(-this.anchorX._value, -this.anchorY._value));
            return this._localMatrix
        },
        getViewMatrix: function() {
            if (this.isViewMatrixDirty()) {
                var a = this.getParentSprite();
                this._viewMatrix = null != a ? Ea.multiply(a.getViewMatrix(), this.getLocalMatrix(), this._viewMatrix) : this.getLocalMatrix().clone(this._viewMatrix);
                this._flags &= -17;
                null != a && (this._parentViewMatrixUpdateCount = a._viewMatrixUpdateCount);
                ++this._viewMatrixUpdateCount
            }
            return this._viewMatrix
        },
        setAnchor: function(a, b) {
            this.anchorX.set__(a);
            this.anchorY.set__(b);
            return this
        },
        centerAnchor: function() {
            this.anchorX.set__(this.getNaturalWidth() / 2);
            this.anchorY.set__(this.getNaturalHeight() / 2);
            return this
        },
        setXY: function(a, b) {
            this.x.set__(a);
            this.y.set__(b);
            return this
        },
        setAlpha: function(a) {
            this.alpha.set__(a);
            return this
        },
        setRotation: function(a) {
            this.rotation.set__(a);
            return this
        },
        setScale: function(a) {
            this.scaleX.set__(a);
            this.scaleY.set__(a);
            return this
        },
        disablePointer: function() {
            this.set_pointerEnabled(!1);
            return this
        },
        onAdded: function() {
            0 != (this._flags & 64) && this.connectHover()
        },
        onRemoved: function() {
            null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection = null)
        },
        onUpdate: function(a) {
            this.x.update(a);
            this.y.update(a);
            this.rotation.update(a);
            this.scaleX.update(a);
            this.scaleY.update(a);
            this.alpha.update(a);
            this.anchorX.update(a);
            this.anchorY.update(a)
        },
        draw: function() {},
        isViewMatrixDirty: function() {
            if (0 != (this._flags & 16)) return !0;
            var a = this.getParentSprite();
            return null == a ? !1 : this._parentViewMatrixUpdateCount != a._viewMatrixUpdateCount || a.isViewMatrixDirty()
        },
        getParentSprite: function() {
            if (null == this.owner) return null;
            for (var a = this.owner.parent; null != a;) {
                var b = a._compMap.Sprite_12;
                if (null != b) return b;
                a = a.parent
            }
            return null
        },
        get_pointerDown: function() {
            null == this._pointerDown && (this._pointerDown = new B);
            return this._pointerDown
        },
        get_pointerMove: function() {
            null ==
                this._pointerMove && (this._pointerMove = new B);
            return this._pointerMove
        },
        get_pointerUp: function() {
            null == this._pointerUp && (this._pointerUp = new B);
            return this._pointerUp
        },
        get_pointerOut: function() {
            null == this._pointerOut && (this._pointerOut = new B);
            return this._pointerOut
        },
        connectHover: function() {
            var a = this;
            null == this._hoverConnection && (this._hoverConnection = l._platform.getPointer().move.connect(function(b) {
                for (var c = b.hit; null != c;) {
                    if (c == a) return;
                    c = c.getParentSprite()
                }
                null != a._pointerOut && 0 != (a._flags &
                    64) && a._pointerOut.emit(b);
                a._flags &= -65;
                a._hoverConnection.dispose();
                a._hoverConnection = null
            }))
        },
        set_visible: function(a) {
            this._flags = oc.set(this._flags, 2, a);
            return a
        },
        set_pointerEnabled: function(a) {
            this._flags = oc.set(this._flags, 4, a);
            return a
        },
        onPointerDown: function(a) {
            this.onHover(a);
            null != this._pointerDown && this._pointerDown.emit(a)
        },
        onPointerMove: function(a) {
            this.onHover(a);
            null != this._pointerMove && this._pointerMove.emit(a)
        },
        onHover: function(a) {
            if (0 == (this._flags & 64) && (this._flags |= 64, null != this._pointerIn ||
                    null != this._pointerOut)) null != this._pointerIn && this._pointerIn.emit(a), this.connectHover()
        },
        onPointerUp: function(a) {
            switch (a.source[1]) {
                case 1:
                    null != this._pointerOut && 0 != (this._flags & 64) && this._pointerOut.emit(a), this._flags &= -65, null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection = null)
            }
            null != this._pointerUp && this._pointerUp.emit(a)
        },
        __class__: v
    });
    var ab = function(a, b, c) {
        v.call(this);
        this.color = a;
        this.width = new E(b);
        this.height = new E(c)
    };
    e["flambe.display.FillSprite"] =
        ab;
    ab.__name__ = ["flambe", "display", "FillSprite"];
    ab.__super__ = v;
    ab.prototype = s(v.prototype, {
        draw: function(a) {
            a.fillRect(this.color, 0, 0, this.width._value, this.height._value)
        },
        getNaturalWidth: function() {
            return this.width._value
        },
        getNaturalHeight: function() {
            return this.height._value
        },
        onUpdate: function(a) {
            v.prototype.onUpdate.call(this, a);
            this.width.update(a);
            this.height.update(a)
        },
        __class__: ab
    });
    var yb = function(a) {
        this._kernings = null;
        this.xOffset = this.yOffset = this.xAdvance = 0;
        this.page = null;
        this.x = this.y =
            this.width = this.height = 0;
        this.charCode = a
    };
    e["flambe.display.Glyph"] = yb;
    yb.__name__ = ["flambe", "display", "Glyph"];
    yb.prototype = {
        draw: function(a, b, c) {
            0 < this.width && a.drawSubTexture(this.page, b + this.xOffset, c + this.yOffset, this.x, this.y, this.width, this.height)
        },
        getKerning: function(a) {
            return null != this._kernings ? r["int"](this._kernings.get(a)) : 0
        },
        setKerning: function(a, b) {
            null == this._kernings && (this._kernings = new ia);
            this._kernings.set(a, b)
        },
        __class__: yb
    };
    var Fa = function(a, b) {
        this.name = b;
        this._pack = a;
        this._file =
            a.getFile(b + ".fnt");
        this.reload()
    };
    e["flambe.display.Font"] = Fa;
    Fa.__name__ = ["flambe", "display", "Font"];
    Fa.prototype = {
        layoutText: function(a, b, c, d, f) {
            null == f && (f = 0);
            null == d && (d = 0);
            null == c && (c = 0);
            null == b && (b = Q.Left);
            return new Ga(this, a, b, c, d, f)
        },
        reload: function() {
            this._glyphs = new ia;
            this._glyphs.set(Fa.NEWLINE.charCode, Fa.NEWLINE);
            for (var a = new Pa(this._file.toString()), b = new ia, c = this.name.lastIndexOf("/"), c = 0 <= c ? y.substr(this.name, 0, c + 1) : "", d = a.keywords(); d.hasNext();) switch (d.next()) {
                case "info":
                    for (var f =
                            a.pairs(); f.hasNext();) {
                        var i = f.next();
                        switch (i.key) {
                            case "size":
                                this.size = i.getInt()
                        }
                    }
                    break;
                case "common":
                    for (f = a.pairs(); f.hasNext();) switch (i = f.next(), i.key) {
                        case "lineHeight":
                            this.lineHeight = i.getInt()
                    }
                    break;
                case "page":
                    for (var f = 0, i = null, e = a.pairs(); e.hasNext();) {
                        var g = e.next();
                        switch (g.key) {
                            case "id":
                                f = g.getInt();
                                break;
                            case "file":
                                i = g.getString()
                        }
                    }
                    i = this._pack.getTexture(c + U.removeFileExtension(i));
                    b.set(f, i);
                    break;
                case "char":
                    f = null;
                    for (i = a.pairs(); i.hasNext();) switch (e = i.next(), e.key) {
                        case "id":
                            f =
                                new yb(e.getInt());
                            break;
                        case "x":
                            f.x = e.getInt();
                            break;
                        case "y":
                            f.y = e.getInt();
                            break;
                        case "width":
                            f.width = e.getInt();
                            break;
                        case "height":
                            f.height = e.getInt();
                            break;
                        case "page":
                            e = e.getInt();
                            f.page = b.get(e);
                            break;
                        case "xoffset":
                            f.xOffset = e.getInt();
                            break;
                        case "yoffset":
                            f.yOffset = e.getInt();
                            break;
                        case "xadvance":
                            f.xAdvance = e.getInt()
                    }
                    this._glyphs.set(f.charCode, f);
                    break;
                case "kerning":
                    f = null;
                    e = i = 0;
                    for (g = a.pairs(); g.hasNext();) {
                        var n = g.next();
                        switch (n.key) {
                            case "first":
                                f = this._glyphs.get(n.getInt());
                                break;
                            case "second":
                                i = n.getInt();
                                break;
                            case "amount":
                                e = n.getInt()
                        }
                    }
                    null != f && 0 != e && f.setKerning(i, e)
            }
        },
        __class__: Fa
    };
    var Q = e["flambe.display.TextAlign"] = {
        __ename__: ["flambe", "display", "TextAlign"],
        __constructs__: ["Left", "Center", "Right"]
    };
    Q.Left = ["Left", 0];
    Q.Left.toString = k;
    Q.Left.__enum__ = Q;
    Q.Center = ["Center", 1];
    Q.Center.toString = k;
    Q.Center.__enum__ = Q;
    Q.Right = ["Right", 2];
    Q.Right.toString = k;
    Q.Right.__enum__ = Q;
    var Ga = function(a, b, c, d, f, i) {
        this.lines = 0;
        var e = this;
        this._font = a;
        this._glyphs = [];
        this._offsets = [];
        this._lineOffset = Math.round(a.lineHeight + i);
        this.bounds = new pc;
        for (var g = [], i = b.length, n = 0; n < i;) {
            var h = n++,
                h = b.charCodeAt(h),
                h = a._glyphs.get(h);
            null != h ? this._glyphs.push(h) : null
        }
        for (var b = -1, j = 0, k = 0, a = a._glyphs.get(10), i = function() {
                e.bounds.width = Qa.max(e.bounds.width, j);
                e.bounds.height += k;
                g[e.lines] = j;
                k = j = 0;
                ++e.lines
            }, n = 0; n < this._glyphs.length;) {
            h = this._glyphs[n];
            this._offsets[n] = Math.round(j);
            var l = 0 < d && j + h.width > d;
            l || h == a ? (l && (0 <= b ? (this._glyphs[b] = a, j = this._offsets[b], n = b) : this._glyphs.splice(n,
                0, a)), b = -1, k = this._lineOffset, i()) : (32 == h.charCode && (b = n), j += h.xAdvance + f, k = Qa.max(k, h.height + h.yOffset), n + 1 < this._glyphs.length && (j += h.getKerning(this._glyphs[n + 1].charCode)));
            ++n
        }
        i();
        f = 0;
        a = Ga.getAlignOffset(c, g[0], d);
        b = 1.79769313486231E308;
        i = -1.79769313486231E308;
        h = n = 0;
        for (l = this._glyphs.length; h < l;) {
            var m = this._glyphs[h];
            10 == m.charCode && (f += this._lineOffset, ++n, a = Ga.getAlignOffset(c, g[n], d));
            this._offsets[h] += a;
            var o = f + m.yOffset;
            b < o || (b = o);
            i = Qa.max(i, o + m.height);
            ++h
        }
        this.bounds.x = Ga.getAlignOffset(c,
            this.bounds.width, d);
        this.bounds.y = b;
        this.bounds.height = i - b
    };
    e["flambe.display.TextLayout"] = Ga;
    Ga.__name__ = ["flambe", "display", "TextLayout"];
    Ga.getAlignOffset = function(a, b, c) {
        switch (a[1]) {
            case 0:
                return 0;
            case 2:
                return c - b;
            case 1:
                return Math.round((c - b) / 2)
        }
    };
    Ga.prototype = {
        draw: function(a) {
            for (var b = 0, c = 0, d = this._glyphs.length; c < d;) {
                var f = this._glyphs[c];
                10 == f.charCode ? b += this._lineOffset : f.draw(a, this._offsets[c], b);
                ++c
            }
        },
        __class__: Ga
    };
    var Pa = function(a) {
        this._configText = a;
        this._keywordPattern = new Ba("([A-Za-z]+)(.*)",
            "");
        this._pairPattern = new Ba('([A-Za-z]+)=("[^"]*"|[^\\s]+)', "")
    };
    e["flambe.display._Font.ConfigParser"] = Pa;
    Pa.__name__ = ["flambe", "display", "_Font", "ConfigParser"];
    Pa.advance = function(a, b) {
        var c = b.matchedPos();
        return y.substr(a, c.pos + c.len, a.length)
    };
    Pa.prototype = {
        keywords: function() {
            var a = this,
                b = this._configText;
            return {
                next: function() {
                    b = Pa.advance(b, a._keywordPattern);
                    a._pairText = a._keywordPattern.matched(2);
                    return a._keywordPattern.matched(1)
                },
                hasNext: function() {
                    return a._keywordPattern.match(b)
                }
            }
        },
        pairs: function() {
            var a = this,
                b = this._pairText;
            return {
                next: function() {
                    b = Pa.advance(b, a._pairPattern);
                    return new qc(a._pairPattern.matched(1), a._pairPattern.matched(2))
                },
                hasNext: function() {
                    return a._pairPattern.match(b)
                }
            }
        },
        __class__: Pa
    };
    var qc = function(a, b) {
        this.key = a;
        this._value = b
    };
    e["flambe.display._Font.ConfigPair"] = qc;
    qc.__name__ = ["flambe", "display", "_Font", "ConfigPair"];
    qc.prototype = {
        getInt: function() {
            return r.parseInt(this._value)
        },
        getString: function() {
            return 34 != this._value.charCodeAt(0) ? null :
                y.substr(this._value, 1, this._value.length - 2)
        },
        __class__: qc
    };
    var rc = function() {};
    e["flambe.display.Graphics"] = rc;
    rc.__name__ = ["flambe", "display", "Graphics"];
    rc.prototype = {
        __class__: rc
    };
    var w = function(a) {
        v.call(this);
        this.texture = a
    };
    e["flambe.display.ImageSprite"] = w;
    w.__name__ = ["flambe", "display", "ImageSprite"];
    w.__super__ = v;
    w.prototype = s(v.prototype, {
        draw: function(a) {
            null != this.texture && a.drawTexture(this.texture, 0, 0)
        },
        getNaturalWidth: function() {
            return null != this.texture ? this.texture.get_width() : 0
        },
        getNaturalHeight: function() {
            return null != this.texture ? this.texture.get_height() : 0
        },
        __class__: w
    });
    var ja = e["flambe.display.Orientation"] = {
        __ename__: ["flambe", "display", "Orientation"],
        __constructs__: ["Portrait", "Landscape"]
    };
    ja.Portrait = ["Portrait", 0];
    ja.Portrait.toString = k;
    ja.Portrait.__enum__ = ja;
    ja.Landscape = ["Landscape", 1];
    ja.Landscape.toString = k;
    ja.Landscape.__enum__ = ja;
    var bb = function(a, b, c) {
        null == c && (c = -1);
        null == b && (b = -1);
        v.call(this);
        this.texture = a;
        0 > b && (b = null != a ? a.get_width() : 0);
        this.width =
            new E(b);
        0 > c && (c = null != a ? a.get_height() : 0);
        this.height = new E(c)
    };
    e["flambe.display.PatternSprite"] = bb;
    bb.__name__ = ["flambe", "display", "PatternSprite"];
    bb.__super__ = v;
    bb.prototype = s(v.prototype, {
        draw: function(a) {
            null != this.texture && a.drawPattern(this.texture, 0, 0, this.width._value, this.height._value)
        },
        getNaturalWidth: function() {
            return this.width._value
        },
        getNaturalHeight: function() {
            return this.height._value
        },
        onUpdate: function(a) {
            v.prototype.onUpdate.call(this, a);
            this.width.update(a);
            this.height.update(a)
        },
        __class__: bb
    });
    var zb = function() {};
    e["flambe.display.Texture"] = zb;
    zb.__name__ = ["flambe", "display", "Texture"];
    zb.__interfaces__ = [Da];
    zb.prototype = {
        __class__: zb
    };
    var Vc = function() {};
    e["flambe.display.SubTexture"] = Vc;
    Vc.__name__ = ["flambe", "display", "SubTexture"];
    Vc.__interfaces__ = [zb];
    var da = function(a, b) {
        null == b && (b = "");
        this._layout = null;
        var c = this;
        v.call(this);
        this._font = a;
        this._text = b;
        this._align = Q.Left;
        this._flags |= 128;
        var d = function() {
            c._flags |= 128
        };
        this.wrapWidth = new E(0, d);
        this.letterSpacing =
            new E(0, d);
        this.lineSpacing = new E(0, d)
    };
    e["flambe.display.TextSprite"] = da;
    da.__name__ = ["flambe", "display", "TextSprite"];
    da.__super__ = v;
    da.prototype = s(v.prototype, {
        draw: function(a) {
            this.updateLayout();
            this._layout.draw(a)
        },
        getNaturalWidth: function() {
            this.updateLayout();
            return 0 < this.wrapWidth._value ? this.wrapWidth._value : this._layout.bounds.width
        },
        getNaturalHeight: function() {
            this.updateLayout();
            var a = this._layout.lines * (this._font.lineHeight + this.lineSpacing._value),
                b = this._layout.bounds.height;
            return a >
                b ? a : b
        },
        containsLocal: function(a, b) {
            this.updateLayout();
            return this._layout.bounds.contains(a, b)
        },
        setWrapWidth: function(a) {
            this.wrapWidth.set__(a);
            return this
        },
        setAlign: function(a) {
            this.set_align(a);
            return this
        },
        set_text: function(a) {
            a != this._text && (this._text = a, this._flags |= 128);
            return a
        },
        set_align: function(a) {
            a != this._align && (this._align = a, this._flags |= 128);
            return a
        },
        updateLayout: function() {
            0 != (this._flags & 128) && (this._flags &= -129, this._layout = this._font.layoutText(this._text, this._align, this.wrapWidth._value,
                this.letterSpacing._value, this.lineSpacing._value))
        },
        onUpdate: function(a) {
            v.prototype.onUpdate.call(this, a);
            this.wrapWidth.update(a);
            this.letterSpacing.update(a);
            this.lineSpacing.update(a)
        },
        __class__: da
    });
    var R = e["flambe.input.MouseButton"] = {
        __ename__: ["flambe", "input", "MouseButton"],
        __constructs__: ["Left", "Middle", "Right", "Unknown"]
    };
    R.Left = ["Left", 0];
    R.Left.toString = k;
    R.Left.__enum__ = R;
    R.Middle = ["Middle", 1];
    R.Middle.toString = k;
    R.Middle.__enum__ = R;
    R.Right = ["Right", 2];
    R.Right.toString = k;
    R.Right.__enum__ =
        R;
    R.Unknown = function(a) {
        a = ["Unknown", 3, a];
        a.__enum__ = R;
        a.toString = k;
        return a
    };
    var ka = e["flambe.input.MouseCursor"] = {
        __ename__: ["flambe", "input", "MouseCursor"],
        __constructs__: ["Default", "Button", "None"]
    };
    ka.Default = ["Default", 0];
    ka.Default.toString = k;
    ka.Default.__enum__ = ka;
    ka.Button = ["Button", 1];
    ka.Button.toString = k;
    ka.Button.__enum__ = ka;
    ka.None = ["None", 2];
    ka.None.toString = k;
    ka.None.__enum__ = ka;
    var sc = function() {
        this.init(0, 0, 0, null)
    };
    e["flambe.input.MouseEvent"] = sc;
    sc.__name__ = ["flambe", "input", "MouseEvent"];
    sc.prototype = {
        init: function(a, b, c, d) {
            this.id = a;
            this.viewX = b;
            this.viewY = c;
            this.button = d
        },
        __class__: sc
    };
    var Ab = e["flambe.input.EventSource"] = {
        __ename__: ["flambe", "input", "EventSource"],
        __constructs__: ["Mouse", "Touch"]
    };
    Ab.Mouse = function(a) {
        a = ["Mouse", 0, a];
        a.__enum__ = Ab;
        a.toString = k;
        return a
    };
    Ab.Touch = function(a) {
        a = ["Touch", 1, a];
        a.__enum__ = Ab;
        a.toString = k;
        return a
    };
    var tc = function() {
        this.init(0, 0, 0, null, null)
    };
    e["flambe.input.PointerEvent"] = tc;
    tc.__name__ = ["flambe", "input", "PointerEvent"];
    tc.prototype = {
        init: function(a, b, c, d, f) {
            this.id = a;
            this.viewX = b;
            this.viewY = c;
            this.hit = d;
            this.source = f;
            this._stopped = !1
        },
        __class__: tc
    };
    var uc = function(a) {
        this.id = a;
        this._source = Ab.Touch(this)
    };
    e["flambe.input.TouchPoint"] = uc;
    uc.__name__ = ["flambe", "input", "TouchPoint"];
    uc.prototype = {
        init: function(a, b) {
            this.viewX = a;
            this.viewY = b
        },
        __class__: uc
    };
    var Qa = function() {};
    e["flambe.math.FMath"] = Qa;
    Qa.__name__ = ["flambe", "math", "FMath"];
    Qa.max = function(a, b) {
        return a > b ? a : b
    };
    Qa.min = function(a, b) {
        return a < b ? a : b
    };
    var Ea = function() {
        this.identity()
    };
    e["flambe.math.Matrix"] = Ea;
    Ea.__name__ = ["flambe", "math", "Matrix"];
    Ea.multiply = function(a, b, c) {
        null == c && (c = new Ea);
        var d = a.m00 * b.m00 + a.m01 * b.m10,
            f = a.m00 * b.m01 + a.m01 * b.m11,
            i = a.m00 * b.m02 + a.m01 * b.m12 + a.m02;
        c.m00 = d;
        c.m01 = f;
        c.m02 = i;
        d = a.m10 * b.m00 + a.m11 * b.m10;
        f = a.m10 * b.m01 + a.m11 * b.m11;
        i = a.m10 * b.m02 + a.m11 * b.m12 + a.m12;
        c.m10 = d;
        c.m11 = f;
        c.m12 = i;
        return c
    };
    Ea.prototype = {
        set: function(a, b, c, d, f, i) {
            this.m00 = a;
            this.m01 = c;
            this.m02 = f;
            this.m10 = b;
            this.m11 = d;
            this.m12 = i
        },
        identity: function() {
            this.set(1, 0, 0, 1, 0, 0)
        },
        compose: function(a,
            b, c, d, f) {
            var i = Math.sin(f),
                f = Math.cos(f);
            this.set(f * c, i * c, -i * d, f * d, a, b)
        },
        translate: function(a, b) {
            this.m02 += this.m00 * a + this.m01 * b;
            this.m12 += this.m11 * b + this.m10 * a
        },
        determinant: function() {
            return this.m00 * this.m11 - this.m01 * this.m10
        },
        inverseTransform: function(a, b, c) {
            var d = this.determinant();
            if (0 == d) return !1;
            a -= this.m02;
            b -= this.m12;
            c.x = (a * this.m11 - b * this.m01) / d;
            c.y = (b * this.m00 - a * this.m10) / d;
            return !0
        },
        clone: function(a) {
            null == a && (a = new Ea);
            a.set(this.m00, this.m10, this.m01, this.m11, this.m02, this.m12);
            return a
        },
        __class__: Ea
    };
    var pc = function(a, b, c, d) {
        null == d && (d = 0);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.set(a, b, c, d)
    };
    e["flambe.math.Rectangle"] = pc;
    pc.__name__ = ["flambe", "math", "Rectangle"];
    pc.prototype = {
        set: function(a, b, c, d) {
            this.x = a;
            this.y = b;
            this.width = c;
            this.height = d
        },
        contains: function(a, b) {
            a -= this.x;
            if (0 <= this.width) {
                if (0 > a || a > this.width) return !1
            } else if (0 < a || a < this.width) return !1;
            b -= this.y;
            if (0 <= this.height) {
                if (0 > b || b > this.height) return !1
            } else if (0 < b || b < this.height) return !1;
            return !0
        },
        __class__: pc
    };
    var $ = function() {
        this._disposed = !1
    };
    e["flambe.platform.BasicAsset"] = $;
    $.__name__ = ["flambe", "platform", "BasicAsset"];
    $.__interfaces__ = [Da];
    $.prototype = {
        dispose: function() {
            this._disposed || (this._disposed = !0, this.onDisposed())
        },
        onDisposed: function() {
            null
        },
        __class__: $
    };
    var Ha = function(a, b) {
        var c = this;
        this.manifest = b;
        this._platform = a;
        this.promise = new cb;
        this._bytesLoaded = new S;
        this._pack = new Bb(b, this);
        var d = wa.array(b);
        if (0 == d.length) this.handleSuccess();
        else {
            for (var f = new S, i = 0; i < d.length;) {
                var e = d[i];
                ++i;
                var g = f.get(e.name);
                null == g && (g = [], f.set(e.name, g));
                g.push(e)
            }
            this._assetsRemaining = wa.count(f);
            for (d = f.iterator(); d.hasNext();) f = [d.next()], this.pickBestEntry(f[0], function(a) {
                return function(d) {
                    if (null != d) {
                        var f = b.getFullURL(d);
                        try {
                            c.loadEntry(f, d)
                        } catch (i) {
                            c.handleError(d, "Unexpected error: " + r.string(i))
                        }
                        f = c.promise;
                        f.set_total(f._total + d.bytes)
                    } else d = a[0][0], Ha.isAudio(d.format) ? c.handleLoad(d, ea.getInstance()) : c.handleError(d, "Could not find a supported format to load")
                }
            }(f))
        }
    };
    e["flambe.platform.BasicAssetPackLoader"] =
        Ha;
    Ha.__name__ = ["flambe", "platform", "BasicAssetPackLoader"];
    Ha.isAudio = function(a) {
        switch (a[1]) {
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                return !0;
            default:
                return !1
        }
    };
    Ha.prototype = {
        onDisposed: function() {},
        pickBestEntry: function(a, b) {
            this.getAssetFormats(function(c) {
                for (var d = 0; d < c.length;) {
                    var f = c[d];
                    ++d;
                    for (var i = 0; i < a.length;) {
                        var e = a[i];
                        ++i;
                        if (e.format == f) {
                            b(e);
                            return
                        }
                    }
                }
                b(null)
            })
        },
        loadEntry: function() {
            null
        },
        getAssetFormats: function() {
            null
        },
        handleLoad: function(a, b) {
            if (!this._pack.disposed) {
                this.handleProgress(a,
                    a.bytes);
                var c;
                switch (a.format[1]) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        c = this._pack.textures;
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        c = this._pack.sounds;
                        break;
                    case 13:
                        c = this._pack.files
                }
                c.set(a.name, b);
                this._assetsRemaining -= 1;
                0 == this._assetsRemaining && this.handleSuccess()
            }
        },
        handleProgress: function(a, b) {
            this._bytesLoaded.set(a.name, b);
            for (var c = 0, d = this._bytesLoaded.iterator(); d.hasNext();) var f = d.next(),
                c = c + f;
            this.promise.set_progress(c)
        },
        handleSuccess: function() {
            this.promise.set_result(this._pack)
        },
        handleError: function(a, b) {
            this.promise.error.emit(U.withFields(b, ["url", a.url]))
        },
        handleTextureError: function(a) {
            this.handleError(a, "Failed to create texture. Is the GPU context unavailable?")
        },
        __class__: Ha
    };
    var Bb = function(a, b) {
        this.disposed = !1;
        this._manifest = a;
        this.loader = b;
        this.textures = new S;
        this.sounds = new S;
        this.files = new S
    };
    e["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = Bb;
    Bb.__name__ = ["flambe", "platform", "_BasicAssetPackLoader", "BasicAssetPack"];
    Bb.__interfaces__ = [$a];
    Bb.prototype = {
        getTexture: function(a, b) {
            null == b && (b = !0);
            var c = this.textures.get(a);
            if (null == c && b) throw U.withFields("Missing texture", ["name", a]);
            return c
        },
        getSound: function(a, b) {
            null == b && (b = !0);
            var c = this.sounds.get(a);
            if (null == c && b) throw U.withFields("Missing sound", ["name", a]);
            return c
        },
        getFile: function(a, b) {
            null == b && (b = !0);
            var c = this.files.get(a);
            if (null == c && b) throw U.withFields("Missing file", ["name", a]);
            return c
        },
        dispose: function() {
            if (!this.disposed) {
                this.disposed = !0;
                for (var a = this.textures.iterator(); a.hasNext();) a.next().dispose();
                this.textures = null;
                for (a = this.sounds.iterator(); a.hasNext();) a.next().dispose();
                this.sounds = null;
                for (a = this.files.iterator(); a.hasNext();) a.next().dispose();
                this.files = null;
                this.loader.onDisposed()
            }
        },
        __class__: Bb
    };
    var db = function(a) {
        this._disposed = !1;
        this._content = a
    };
    e["flambe.platform.BasicFile"] = db;
    db.__name__ = ["flambe", "platform", "BasicFile"];
    db.__interfaces__ = [xb];
    db.__super__ = $;
    db.prototype = s($.prototype, {
        toString: function() {
            return this._content
        },
        onDisposed: function() {
            this._content = null
        },
        __class__: db
    });
    var bd = function() {};
    e["flambe.subsystem.MouseSystem"] = bd;
    bd.__name__ = ["flambe", "subsystem", "MouseSystem"];
    var aa = function(a) {
        this._pointer = a;
        this._source = Ab.Mouse(aa._sharedEvent);
        this.down = new B;
        this.move = new B;
        this.up = new B;
        this.scroll = new B;
        this._y = this._x = 0;
        this._cursor = ka.Default;
        this._buttonStates = new ia
    };
    e["flambe.platform.BasicMouse"] = aa;
    aa.__name__ = ["flambe", "platform", "BasicMouse"];
    aa.__interfaces__ = [bd];
    aa.prototype = {
        submitDown: function(a, b, c) {
            this._buttonStates.exists(c) || (this._buttonStates.set(c, !0), this.prepare(a, b, vc.toButton(c)), this._pointer.submitDown(a, b, this._source), this.down.emit(aa._sharedEvent))
        },
        submitMove: function(a, b) {
            this.prepare(a, b, null);
            this._pointer.submitMove(a, b, this._source);
            this.move.emit(aa._sharedEvent)
        },
        submitUp: function(a, b, c) {
            this._buttonStates.exists(c) && (this._buttonStates.remove(c), this.prepare(a, b, vc.toButton(c)), this._pointer.submitUp(a, b, this._source), this.up.emit(aa._sharedEvent))
        },
        submitScroll: function(a, b, c) {
            this._x = a;
            this._y = b;
            if (null == this.scroll._head) return !1;
            this.scroll.emit(c);
            return !0
        },
        prepare: function(a, b, c) {
            this._x = a;
            this._y = b;
            aa._sharedEvent.init(aa._sharedEvent.id + 1, a, b, c)
        },
        __class__: aa
    };
    var wc = function() {};
    e["flambe.subsystem.PointerSystem"] = wc;
    wc.__name__ = ["flambe", "subsystem", "PointerSystem"];
    wc.prototype = {
        __class__: wc
    };
    var P = function(a, b, c) {
        null == c && (c = !1);
        null == b && (b = 0);
        null == a && (a = 0);
        this.down = new B;
        this.move = new B;
        this.up = new B;
        this._x = a;
        this._y = b;
        this._isDown = c
    };
    e["flambe.platform.BasicPointer"] = P;
    P.__name__ = ["flambe", "platform", "BasicPointer"];
    P.__interfaces__ = [wc];
    P.prototype = {
        submitDown: function(a, b, c) {
            if (!this._isDown) {
                this.submitMove(a, b, c);
                this._isDown = !0;
                var d = [],
                    f = v.hitTest(l.root, a, b);
                if (null != f) {
                    var i = f.owner;
                    do {
                        var e = i._compMap.Sprite_12;
                        null != e && d.push(e);
                        i = i.parent
                    } while (null != i)
                }
                this.prepare(a, b, f, c);
                for (a = 0; a < d.length;)
                    if (b = d[a], ++a, b.onPointerDown(P._sharedEvent), P._sharedEvent._stopped) return;
                this.down.emit(P._sharedEvent)
            }
        },
        submitMove: function(a, b, c) {
            if (!(a == this._x && b == this._y)) {
                var d = [],
                    f = v.hitTest(l.root, a, b);
                if (null !=
                    f) {
                    var i = f.owner;
                    do {
                        var e = i._compMap.Sprite_12;
                        null != e && d.push(e);
                        i = i.parent
                    } while (null != i)
                }
                this.prepare(a, b, f, c);
                for (a = 0; a < d.length;)
                    if (b = d[a], ++a, b.onPointerMove(P._sharedEvent), P._sharedEvent._stopped) return;
                this.move.emit(P._sharedEvent)
            }
        },
        submitUp: function(a, b, c) {
            if (this._isDown) {
                this.submitMove(a, b, c);
                this._isDown = !1;
                var d = [],
                    f = v.hitTest(l.root, a, b);
                if (null != f) {
                    var i = f.owner;
                    do {
                        var e = i._compMap.Sprite_12;
                        null != e && d.push(e);
                        i = i.parent
                    } while (null != i)
                }
                this.prepare(a, b, f, c);
                for (a = 0; a < d.length;)
                    if (b =
                        d[a], ++a, b.onPointerUp(P._sharedEvent), P._sharedEvent._stopped) return;
                this.up.emit(P._sharedEvent)
            }
        },
        prepare: function(a, b, c, d) {
            this._x = a;
            this._y = b;
            P._sharedEvent.init(P._sharedEvent.id + 1, a, b, c, d)
        },
        __class__: P
    };
    var Ia = function(a, b, c) {
        this._x = this._y = 0;
        this._parent = null;
        this.rootX = this.rootY = 0;
        this._disposed = !1;
        this.root = a;
        this._width = b;
        this._height = c
    };
    e["flambe.platform.BasicTexture"] = Ia;
    Ia.__name__ = ["flambe", "platform", "BasicTexture"];
    Ia.__interfaces__ = [Vc];
    Ia.__super__ = $;
    Ia.prototype = s($.prototype, {
        subTexture: function(a, b, c, d) {
            c = this.root.createTexture(c, d);
            c._parent = this;
            c._x = a;
            c._y = b;
            c.rootX = this.rootX + a;
            c.rootY = this.rootY + b;
            return c
        },
        split: function(a, b) {
            null == b && (b = 1);
            for (var c = [], d = this._width / a | 0, f = this._height / b | 0, i = 0; i < b;)
                for (var e = i++, g = 0; g < a;) {
                    var n = g++;
                    c.push(this.subTexture(n * d, e * f, d, f))
                }
            return c
        },
        onDisposed: function() {
            null == this._parent && this.root.dispose()
        },
        get_width: function() {
            return this._width
        },
        get_height: function() {
            return this._height
        },
        __class__: Ia
    });
    var Wc = function() {};
    e["flambe.subsystem.TouchSystem"] =
        Wc;
    Wc.__name__ = ["flambe", "subsystem", "TouchSystem"];
    var rb = function(a, b) {
        null == b && (b = 4);
        this._pointer = a;
        this._maxPoints = b;
        this._pointMap = new ia;
        this._points = [];
        this.down = new B;
        this.move = new B;
        this.up = new B
    };
    e["flambe.platform.BasicTouch"] = rb;
    rb.__name__ = ["flambe", "platform", "BasicTouch"];
    rb.__interfaces__ = [Wc];
    rb.prototype = {
        submitDown: function(a, b, c) {
            if (!this._pointMap.exists(a)) {
                var d = new uc(a);
                d.init(b, c);
                this._pointMap.set(a, d);
                this._points.push(d);
                null == this._pointerTouch && (this._pointerTouch =
                    d, this._pointer.submitDown(b, c, d._source));
                this.down.emit(d)
            }
        },
        submitMove: function(a, b, c) {
            a = this._pointMap.get(a);
            null != a && (a.init(b, c), this._pointerTouch == a && this._pointer.submitMove(b, c, a._source), this.move.emit(a))
        },
        submitUp: function(a, b, c) {
            var d = this._pointMap.get(a);
            null != d && (d.init(b, c), this._pointMap.remove(a), y.remove(this._points, d), this._pointerTouch == d && (this._pointerTouch = null, this._pointer.submitUp(b, c, d._source)), this.up.emit(d))
        },
        __class__: rb
    };
    var eb = function() {};
    e["flambe.sound.Sound"] =
        eb;
    eb.__name__ = ["flambe", "sound", "Sound"];
    eb.__interfaces__ = [Da];
    eb.prototype = {
        __class__: eb
    };
    var ea = function() {
        this._disposed = !1;
        this._playback = new Cb(this)
    };
    e["flambe.platform.DummySound"] = ea;
    ea.__name__ = ["flambe", "platform", "DummySound"];
    ea.__interfaces__ = [eb];
    ea.getInstance = function() {
        null == ea._instance && (ea._instance = new ea);
        return ea._instance
    };
    ea.__super__ = $;
    ea.prototype = s($.prototype, {
        play: function() {
            return this._playback
        },
        loop: function() {
            return this._playback
        },
        get_duration: function() {
            return 0
        },
        onDisposed: function() {},
        __class__: ea
    });
    var xc = function() {};
    e["flambe.sound.Playback"] = xc;
    xc.__name__ = ["flambe", "sound", "Playback"];
    xc.__interfaces__ = [pa];
    var Cb = function(a) {
        this._sound = a;
        this.volume = new E(0);
        this._complete = new X(!0)
    };
    e["flambe.platform.DummyPlayback"] = Cb;
    Cb.__name__ = ["flambe", "platform", "DummyPlayback"];
    Cb.__interfaces__ = [xc];
    Cb.prototype = {
        dispose: function() {},
        __class__: Cb
    };
    var Db = function() {};
    e["flambe.subsystem.StorageSystem"] = Db;
    Db.__name__ = ["flambe", "subsystem", "StorageSystem"];
    Db.prototype = {
        __class__: Db
    };
    var ub = function() {
        this.clear()
    };
    e["flambe.platform.DummyStorage"] = ub;
    ub.__name__ = ["flambe", "platform", "DummyStorage"];
    ub.__interfaces__ = [Db];
    ub.prototype = {
        set: function(a, b) {
            this._hash.set(a, b);
            return !0
        },
        get: function(a, b) {
            return this._hash.exists(a) ? this._hash.get(a) : b
        },
        clear: function() {
            this._hash = new S
        },
        __class__: ub
    };
    var sb = function() {
        this.down = new B;
        this.move = new B;
        this.up = new B
    };
    e["flambe.platform.DummyTouch"] = sb;
    sb.__name__ = ["flambe", "platform", "DummyTouch"];
    sb.__interfaces__ = [Wc];
    sb.prototype = {
        __class__: sb
    };
    var Eb = function() {
        this._entries = []
    };
    e["flambe.platform.EventGroup"] = Eb;
    Eb.__name__ = ["flambe", "platform", "EventGroup"];
    Eb.__interfaces__ = [pa];
    Eb.prototype = {
        addListener: function(a, b, c) {
            a.addEventListener(b, c, !1);
            this._entries.push(new yc(a, b, c))
        },
        addDisposingListener: function(a, b, c) {
            var d = this;
            this.addListener(a, b, function(a) {
                d.dispose();
                c(a)
            })
        },
        dispose: function() {
            for (var a = 0, b = this._entries; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispatcher.removeEventListener(c.type, c.listener, !1)
            }
            this._entries = []
        },
        __class__: Eb
    };
    var yc = function(a, b, c) {
        this.dispatcher = a;
        this.type = b;
        this.listener = c
    };
    e["flambe.platform._EventGroup.Entry"] = yc;
    yc.__name__ = ["flambe", "platform", "_EventGroup", "Entry"];
    yc.prototype = {
        __class__: yc
    };
    var Fb = function() {};
    e["flambe.platform.InternalGraphics"] = Fb;
    Fb.__name__ = ["flambe", "platform", "InternalGraphics"];
    Fb.__interfaces__ = [rc];
    Fb.prototype = {
        __class__: Fb
    };
    var zc = function() {};
    e["flambe.subsystem.RendererSystem"] = zc;
    zc.__name__ = ["flambe", "subsystem", "RendererSystem"];
    zc.prototype = {
        __class__: zc
    };
    var Gb = function() {};
    e["flambe.platform.InternalRenderer"] = Gb;
    Gb.__name__ = ["flambe", "platform", "InternalRenderer"];
    Gb.__interfaces__ = [zc];
    Gb.prototype = {
        __class__: Gb
    };
    var La = function() {
        this._tickables = []
    };
    e["flambe.platform.MainLoop"] = La;
    La.__name__ = ["flambe", "platform", "MainLoop"];
    La.updateEntity = function(a, b) {
        var c = a._compMap.SpeedAdjuster_14;
        if (null != c && (c._realDt = b, b *= c.scale._value, 0 >= b)) {
            c.onUpdate(b);
            return
        }
        for (c = a.firstComponent; null != c;) {
            var d = c.next;
            0 == (c._flags &
                1) && (c._flags |= 1, c.onStart());
            c.onUpdate(b);
            c = d
        }
        for (c = a.firstChild; null != c;) d = c.next, La.updateEntity(c, b), c = d
    };
    La.prototype = {
        update: function(a) {
            if (!(0 >= a)) {
                0.25 < a && (a = 0.25);
                for (var b = 0; b < this._tickables.length;) {
                    var c = this._tickables[b];
                    null == c || c.update(a) ? this._tickables.splice(b, 1) : ++b
                }
                l.volume.update(a);
                La.updateEntity(l.root, a)
            }
        },
        render: function(a) {
            var b = a.graphics;
            null != b && (a.willRender(), v.render(l.root, b), a.didRender())
        },
        addTickable: function(a) {
            this._tickables.push(a)
        },
        __class__: La
    };
    var vc =
        function() {};
    e["flambe.platform.MouseCodes"] = vc;
    vc.__name__ = ["flambe", "platform", "MouseCodes"];
    vc.toButton = function(a) {
        switch (a) {
            case 0:
                return R.Left;
            case 1:
                return R.Middle;
            case 2:
                return R.Right
        }
        return R.Unknown(a)
    };
    var Ac = function() {};
    e["flambe.platform.TextureRoot"] = Ac;
    Ac.__name__ = ["flambe", "platform", "TextureRoot"];
    Ac.prototype = {
        __class__: Ac
    };
    var Bc = function() {};
    e["flambe.platform.Tickable"] = Bc;
    Bc.__name__ = ["flambe", "platform", "Tickable"];
    Bc.prototype = {
        __class__: Bc
    };
    var Hb = function(a, b) {
        this._firstDraw = !1;
        this._canvasCtx = a.getContext("2d", {
            alpha: b
        })
    };
    e["flambe.platform.html.CanvasGraphics"] = Hb;
    Hb.__name__ = ["flambe", "platform", "html", "CanvasGraphics"];
    Hb.__interfaces__ = [Fb];
    Hb.prototype = {
        save: function() {
            this._canvasCtx.save()
        },
        transform: function(a, b, c, d, f, i) {
            this._canvasCtx.transform(a, b, c, d, f, i)
        },
        restore: function() {
            this._canvasCtx.restore()
        },
        drawTexture: function(a, b, c) {
            this.drawSubTexture(a, b, c, 0, 0, a.get_width(), a.get_height())
        },
        drawSubTexture: function(a, b, c, d, f, i, e) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawSubTexture(a, b, c, d, f, i, e), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.root.image, a.rootX + d | 0, a.rootY + f | 0, i | 0, e | 0, b | 0, c | 0, i | 0, e | 0)
        },
        drawPattern: function(a, b, c, d, f) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawPattern(a, b, c, d, f), this._canvasCtx.globalCompositeOperation = "source-over") : (this._canvasCtx.fillStyle = a.getPattern(), this._canvasCtx.fillRect(b | 0,
                c | 0, d | 0, f | 0))
        },
        fillRect: function(a, b, c, d, f) {
            if (this._firstDraw) this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.fillRect(a, b, c, d, f), this._canvasCtx.globalCompositeOperation = "source-over";
            else {
                for (a = (16777215 & a).toString(16); 6 > a.length;) a = "0" + r.string(a);
                this._canvasCtx.fillStyle = "#" + r.string(a);
                this._canvasCtx.fillRect(b | 0, c | 0, d | 0, f | 0)
            }
        },
        multiplyAlpha: function(a) {
            this._canvasCtx.globalAlpha *= a
        },
        setBlendMode: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "source-over";
                    break;
                case 1:
                    b =
                        "lighter";
                    break;
                case 2:
                    b = "multiply";
                    break;
                case 3:
                    b = "screen";
                    break;
                case 4:
                    b = "destination-in";
                    break;
                case 5:
                    b = "copy"
            }
            this._canvasCtx.globalCompositeOperation = b
        },
        applyScissor: function(a, b, c, d) {
            this._canvasCtx.beginPath();
            this._canvasCtx.rect(a | 0, b | 0, c | 0, d | 0);
            this._canvasCtx.clip()
        },
        willRender: function() {
            this._firstDraw = !0
        },
        didRender: function() {},
        __class__: Hb
    };
    var Ma = function(a) {
        this.graphics = new Hb(a, !1);
        this._hasGPU = new X(!0)
    };
    e["flambe.platform.html.CanvasRenderer"] = Ma;
    Ma.__name__ = ["flambe", "platform",
        "html", "CanvasRenderer"
    ];
    Ma.__interfaces__ = [Gb];
    Ma.prototype = {
        get_type: function() {
            return la.Canvas
        },
        createTextureFromImage: function(a) {
            a = new fb(Ma.CANVAS_TEXTURES ? p.createCanvas(a) : a);
            return a.createTexture(a.width, a.height)
        },
        getCompressedTextureFormats: function() {
            return []
        },
        createCompressedTexture: function() {
            return null
        },
        willRender: function() {
            this.graphics.willRender()
        },
        didRender: function() {
            this.graphics.didRender()
        },
        __class__: Ma
    };
    var Ib = function(a, b, c) {
        this._rootUpdateCount = 0;
        this._pattern = null;
        Ia.call(this, a, b, c)
    };
    e["flambe.platform.html.CanvasTexture"] = Ib;
    Ib.__name__ = ["flambe", "platform", "html", "CanvasTexture"];
    Ib.__super__ = Ia;
    Ib.prototype = s(Ia.prototype, {
        getPattern: function() {
            if (this._rootUpdateCount != this.root.updateCount || null == this._pattern) this._rootUpdateCount = this.root.updateCount, this._pattern = this.root.createPattern(this.rootX, this.rootY, this._width, this._height);
            return this._pattern
        },
        __class__: Ib
    });
    var fb = function(a) {
        this._graphics = null;
        this.updateCount = 0;
        this._disposed = !1;
        this.image =
            a;
        this.width = a.width;
        this.height = a.height
    };
    e["flambe.platform.html.CanvasTextureRoot"] = fb;
    fb.__name__ = ["flambe", "platform", "html", "CanvasTextureRoot"];
    fb.__interfaces__ = [Ac];
    fb.__super__ = $;
    fb.prototype = s($.prototype, {
        createTexture: function(a, b) {
            return new Ib(this, a, b)
        },
        createPattern: function(a, b, c, d) {
            var f = this.getContext2d(),
                i = this.image;
            if (0 != a || 0 != b || c != this.width || d != this.height) i = p.createEmptyCanvas(c, d), c = i.getContext("2d"), c.globalCompositeOperation = "copy", c.drawImage(this.image, -a, -b);
            return f.createPattern(i,
                "repeat")
        },
        getContext2d: function() {
            O.__instanceof(this.image, HTMLCanvasElement) || (this.image = p.createCanvas(this.image));
            return this.image.getContext("2d")
        },
        onDisposed: function() {
            this._graphics = this.image = null
        },
        __class__: fb
    });
    var D = function(a, b) {
        Ha.call(this, a, b)
    };
    e["flambe.platform.html.HtmlAssetPackLoader"] = D;
    D.__name__ = ["flambe", "platform", "html", "HtmlAssetPackLoader"];
    D.detectImageFormats = function(a) {
        var b = [h.PNG, h.JPG, h.GIF],
            c = 2,
            d;
        d = window.document.createElement("img");
        d.onload = d.onerror = function() {
            1 ==
                d.width && b.unshift(h.WEBP);
            --c;
            0 == c && a(b)
        };
        d.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
        var f;
        f = window.document.createElement("img");
        f.onload = f.onerror = function() {
            1 == f.width && b.unshift(h.JXR);
            --c;
            0 == c && a(b)
        };
        f.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA=="
    };
    D.detectAudioFormats = function() {
        var a;
        a = window.document.createElement("audio");
        if (null == a || null == q(a, a.canPlayType)) return [];
        z.get_supported();
        for (var b = [{
                format: h.M4A,
                mimeType: "audio/mp4; codecs=mp4a"
            }, {
                format: h.MP3,
                mimeType: "audio/mpeg"
            }, {
                format: h.OPUS,
                mimeType: "audio/ogg; codecs=opus"
            }, {
                format: h.OGG,
                mimeType: "audio/ogg; codecs=vorbis"
            }, {
                format: h.WAV,
                mimeType: "audio/wav"
            }], c = [], d = 0; d < b.length;) {
            var f = b[d];
            ++d;
            var i = "";
            try {
                i = a.canPlayType(f.mimeType)
            } catch (e) {}
            "" != i && c.push(f.format)
        }
        return c
    };
    D.supportsBlob = function() {
        if (D._detectBlobSupport) {
            D._detectBlobSupport = !1;
            if ((new Ba("\\bSilk\\b",
                    "")).match(window.navigator.userAgent) || null == window.Blob) return !1;
            var a = new XMLHttpRequest;
            a.open("GET", ".", !0);
            if ("" != a.responseType) return !1;
            a.responseType = "blob";
            if ("blob" != a.responseType) return !1;
            D._URL = p.loadExtension("URL").value
        }
        return null != D._URL && null != D._URL.createObjectURL
    };
    D.__super__ = Ha;
    D.prototype = s(Ha.prototype, {
        loadEntry: function(a, b) {
            var c = this;
            switch (b.format[1]) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    var d;
                    d = window.document.createElement("img");
                    var f = new Eb;
                    f.addDisposingListener(d,
                        "load",
                        function() {
                            D.supportsBlob() && D._URL.revokeObjectURL(d.src);
                            var a = c._platform.getRenderer().createTextureFromImage(d);
                            null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
                        });
                    f.addDisposingListener(d, "error", function() {
                        c.handleError(b, "Failed to load image")
                    });
                    D.supportsBlob() ? this.download(a, b, "blob", function(a) {
                        d.src = D._URL.createObjectURL(a)
                    }) : d.src = a;
                    break;
                case 5:
                case 6:
                case 7:
                    this.download(a, b, "arraybuffer", function() {
                        var a = c._platform.getRenderer().createCompressedTexture(b.format, null);
                        null !=
                            a ? c.handleLoad(b, a) : c.handleTextureError(b)
                    });
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    z.get_supported() ? this.download(a, b, "arraybuffer", function(a) {
                        z.ctx.decodeAudioData(a, function(a) {
                            c.handleLoad(b, new z(a))
                        }, function() {
                            c.handleLoad(b, ea.getInstance())
                        })
                    }) : this.handleLoad(b, ea.getInstance());
                    break;
                case 13:
                    this.download(a, b, "text", function(a) {
                        c.handleLoad(b, new db(a))
                    })
            }
        },
        getAssetFormats: function(a) {
            var b = this;
            null == D._supportedFormats && (D._supportedFormats = new cb, D.detectImageFormats(function(a) {
                D._supportedFormats.set_result(b._platform.getRenderer().getCompressedTextureFormats().concat(a).concat(D.detectAudioFormats()).concat([h.Data]))
            }));
            D._supportedFormats.get(a)
        },
        download: function(a, b, c, d) {
            var f = this,
                i = null,
                e = null,
                g = 0,
                n = !1,
                h = function() {
                    n && (n = !1, window.clearInterval(g))
                },
                j = 3,
                k = function() {
                    --j;
                    return 0 <= j ? (e(), !0) : !1
                },
                e = function() {
                    h();
                    null != i && i.abort();
                    i = new XMLHttpRequest;
                    i.open("GET", a, !0);
                    i.responseType = c;
                    var e = 0;
                    i.onprogress = function(a) {
                        n || (n = !0, g = window.setInterval(function() {
                            4 != i.readyState && 5E3 < Date.now() - e && !k() && (h(), f.handleError(b, "Download stalled"))
                        }, 1E3));
                        e = Date.now();
                        f.handleProgress(b, a.loaded)
                    };
                    i.onerror = function() {
                        if (0 !=
                            i.status || !k()) h(), f.handleError(b, "HTTP error " + i.status)
                    };
                    i.onload = function() {
                        var a = i.response;
                        null == a && (a = i.responseText);
                        h();
                        d(a)
                    };
                    i.send()
                };
            e()
        },
        __class__: D
    });
    var qb = function(a, b) {
        aa.call(this, a);
        this._canvas = b
    };
    e["flambe.platform.html.HtmlMouse"] = qb;
    qb.__name__ = ["flambe", "platform", "html", "HtmlMouse"];
    qb.__super__ = aa;
    qb.prototype = s(aa.prototype, {
        __class__: qb
    });
    var Cc = function() {};
    e["flambe.subsystem.StageSystem"] = Cc;
    Cc.__name__ = ["flambe", "subsystem", "StageSystem"];
    Cc.prototype = {
        __class__: Cc
    };
    var Ka = function(a) {
        var b = this;
        this._canvas = a;
        this.resize = new gb;
        this.scaleFactor = Ka.computeScaleFactor();
        1 != this.scaleFactor && (p.setVendorStyle(this._canvas, "transform-origin", "top left"), p.setVendorStyle(this._canvas, "transform", "scale(" + 1 / this.scaleFactor + ")"));
        p.SHOULD_HIDE_MOBILE_BROWSER && (window.addEventListener("orientationchange", function() {
            p.callLater(q(b, b.hideMobileBrowser), 200)
        }, !1), this.hideMobileBrowser());
        window.addEventListener("resize", q(this, this.onWindowResize), !1);
        this.onWindowResize(null);
        this.orientation = new X(null);
        null != window.orientation && (window.addEventListener("orientationchange", q(this, this.onOrientationChange), !1), this.onOrientationChange(null));
        this.fullscreen = new X(!1);
        p.addVendorListener(window.document, "fullscreenchange", function() {
            b.updateFullscreen()
        }, !1);
        this.updateFullscreen()
    };
    e["flambe.platform.html.HtmlStage"] = Ka;
    Ka.__name__ = ["flambe", "platform", "html", "HtmlStage"];
    Ka.__interfaces__ = [Cc];
    Ka.computeScaleFactor = function() {
        var a = window.devicePixelRatio;
        null == a && (a =
            1);
        var b = window.document.createElement("canvas").getContext("2d"),
            b = p.loadExtension("backingStorePixelRatio", b).value;
        null == b && (b = 1);
        a /= b;
        b = window.screen.height;
        return 1136 < a * window.screen.width || 1136 < a * b ? 1 : a
    };
    Ka.prototype = {
        get_width: function() {
            return this._canvas.width
        },
        get_height: function() {
            return this._canvas.height
        },
        get_fullscreenSupported: function() {
            return !0 == p.loadFirstExtension(["fullscreenEnabled", "fullScreenEnabled"], window.document).value
        },
        lockOrientation: function(a) {
            try {
                var b = p.loadExtension("lockOrientation",
                    window.screen).value;
                if (null != b) {
                    var c;
                    switch (a[1]) {
                        case 0:
                            c = "portrait";
                            break;
                        case 1:
                            c = "landscape"
                    }
                    b.apply(window.screen, [c]) || null
                }
            } catch (d) {
                null
            }
        },
        requestFullscreen: function(a) {
            null == a && (a = !0);
            if (a) {
                var a = window.document.documentElement,
                    b = p.loadFirstExtension(["requestFullscreen", "requestFullScreen"], a).value;
                null != b && b.apply(a, [])
            } else a = p.loadFirstExtension(["cancelFullscreen", "cancelFullScreen"], window.document).value, null != a && A.callMethod(window.document, a, [])
        },
        onWindowResize: function() {
            var a =
                this._canvas.parentElement.getBoundingClientRect();
            this.resizeCanvas(a.width, a.height)
        },
        resizeCanvas: function(a, b) {
            var c = this.scaleFactor * a,
                d = this.scaleFactor * b;
            if (this._canvas.width == c && this._canvas.height == d) return !1;
            this._canvas.width = c | 0;
            this._canvas.height = d | 0;
            this.resize.emit();
            return !0
        },
        hideMobileBrowser: function() {
            var a = this,
                b = window.document.documentElement.style;
            b.height = window.innerHeight + 100 + "px";
            b.width = window.innerWidth + "px";
            b.overflow = "visible";
            p.callLater(function() {
                p.hideMobileBrowser();
                p.callLater(function() {
                    b.height = window.innerHeight + "px";
                    a.onWindowResize(null)
                }, 100)
            })
        },
        onOrientationChange: function() {
            this.orientation.set__(p.orientation(window.orientation))
        },
        updateFullscreen: function() {
            this.fullscreen.set__(!0 == p.loadFirstExtension(["fullscreen", "fullScreen", "isFullScreen"], window.document).value)
        },
        __class__: Ka
    };
    var tb = function(a) {
        this._storage = a
    };
    e["flambe.platform.html.HtmlStorage"] = tb;
    tb.__name__ = ["flambe", "platform", "html", "HtmlStorage"];
    tb.__interfaces__ = [Db];
    tb.prototype = {
        set: function(a, b) {
            var c;
            try {
                var d = new ua;
                d.useCache = !0;
                d.useEnumIndex = !1;
                d.serialize(b);
                c = d.toString()
            } catch (f) {
                return !1
            }
            try {
                this._storage.setItem("flambe:" + a, c)
            } catch (i) {
                return !1
            }
            return !0
        },
        get: function(a, b) {
            var c = null;
            try {
                c = this._storage.getItem("flambe:" + a)
            } catch (d) {
                null
            }
            if (null != c) try {
                return V.run(c)
            } catch (f) {
                null
            }
            return b
        },
        __class__: tb
    };
    var p = function() {};
    e["flambe.platform.html.HtmlUtil"] = p;
    p.__name__ = ["flambe", "platform", "html", "HtmlUtil"];
    p.callLater = function(a, b) {
        null == b && (b = 0);
        window.setTimeout(a,
            b)
    };
    p.hideMobileBrowser = function() {
        window.scrollTo(1, 0)
    };
    p.loadExtension = function(a, b) {
        null == b && (b = window);
        var c = A.field(b, a);
        if (null != c) return {
            prefix: "",
            field: a,
            value: c
        };
        for (var c = a.charAt(0).toUpperCase() + y.substr(a, 1, null), d = 0, f = p.VENDOR_PREFIXES; d < f.length;) {
            var i = f[d];
            ++d;
            var e = i + c,
                g = A.field(b, e);
            if (null != g) return {
                prefix: i,
                field: e,
                value: g
            }
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    p.loadFirstExtension = function(a, b) {
        for (var c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            d = p.loadExtension(d, b);
            if (null != d.field) return d
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    p.polyfill = function(a, b) {
        null == b && (b = window);
        var c = p.loadExtension(a, b).value;
        if (null == c) return !1;
        b[a] = c;
        return !0
    };
    p.setVendorStyle = function(a, b, c) {
        for (var a = a.style, d = 0, f = p.VENDOR_PREFIXES; d < f.length;) {
            var i = f[d];
            ++d;
            a.setProperty("-" + i + "-" + b, c)
        }
        a.setProperty(b, c)
    };
    p.addVendorListener = function(a, b, c, d) {
        for (var f = 0, i = p.VENDOR_PREFIXES; f < i.length;) {
            var e = i[f];
            ++f;
            a.addEventListener(e + b, c, d)
        }
        a.addEventListener(b, c, d)
    };
    p.orientation = function(a) {
        switch (a) {
            case -90:
            case 90:
                return ja.Landscape;
            default:
                return ja.Portrait
        }
    };
    p.createEmptyCanvas = function(a, b) {
        var c;
        c = window.document.createElement("canvas");
        c.width = a;
        c.height = b;
        return c
    };
    p.createCanvas = function(a) {
        var b = p.createEmptyCanvas(a.width, a.height),
            c = b.getContext("2d");
        c.save();
        c.globalCompositeOperation = "copy";
        c.drawImage(a, 0, 0);
        c.restore();
        return b
    };
    p.fixAndroidMath = function() {
        if (0 <= window.navigator.userAgent.indexOf("Linux; U; Android 4")) {
            var a = Math.sin,
                b = Math.cos;
            Math.sin = function(b) {
                return 0 == b ? 0 : a(b)
            };
            Math.cos = function(a) {
                return 0 ==
                    a ? 1 : b(a)
            }
        }
    };
    var Dc = function() {};
    e["flambe.subsystem.WebSystem"] = Dc;
    Dc.__name__ = ["flambe", "subsystem", "WebSystem"];
    Dc.prototype = {
        __class__: Dc
    };
    var vb = function(a) {
        this._container = a
    };
    e["flambe.platform.html.HtmlWeb"] = vb;
    vb.__name__ = ["flambe", "platform", "html", "HtmlWeb"];
    vb.__interfaces__ = [Dc];
    vb.prototype = {
        openBrowser: function(a) {
            window.open(a, "_blank")
        },
        __class__: vb
    };
    var z = function(a) {
        this._disposed = !1;
        this.buffer = a
    };
    e["flambe.platform.html.WebAudioSound"] = z;
    z.__name__ = ["flambe", "platform", "html", "WebAudioSound"];
    z.__interfaces__ = [eb];
    z.get_supported = function() {
        if (z._detectSupport) {
            z._detectSupport = !1;
            var a = p.loadExtension("AudioContext").value;
            null != a && (z.ctx = new a, z.gain = z.createGain(), z.gain.connect(z.ctx.destination), l.volume.watch(function(a) {
                z.gain.gain.value = a
            }))
        }
        return null != z.ctx
    };
    z.createGain = function() {
        return null != z.ctx.createGain ? z.ctx.createGain() : z.ctx.createGainNode()
    };
    z.start = function(a, b) {
        null != a.start ? a.start(b) : a.noteOn(b)
    };
    z.__super__ = $;
    z.prototype = s($.prototype, {
        play: function(a) {
            null ==
                a && (a = 1);
            return new hb(this, a, !1)
        },
        loop: function(a) {
            null == a && (a = 1);
            return new hb(this, a, !0)
        },
        get_duration: function() {
            return this.buffer.duration
        },
        onDisposed: function() {
            this.buffer = null
        },
        __class__: z
    });
    var hb = function(a, b, c) {
        var d = this;
        this._sound = a;
        this._head = z.gain;
        this._complete = new X(!1);
        this._sourceNode = z.ctx.createBufferSource();
        this._sourceNode.buffer = a.buffer;
        this._sourceNode.loop = c;
        this._sourceNode.onended = function() {
            d._complete.set__(!0)
        };
        z.start(this._sourceNode, 0);
        this.playAudio();
        this.volume =
            new E(b, function(a) {
                d.setVolume(a)
            });
        1 != b && this.setVolume(b);
        l.hidden._value && this.set_paused(!0)
    };
    e["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = hb;
    hb.__name__ = ["flambe", "platform", "html", "_WebAudioSound", "WebAudioPlayback"];
    hb.__interfaces__ = [Bc, xc];
    hb.prototype = {
        set_paused: function(a) {
            a != 0 <= this._pausedAt && (a ? (this._sourceNode.disconnect(), this._pausedAt = this.get_position()) : this.playAudio());
            return a
        },
        get_position: function() {
            return this._complete._value ? this._sound.get_duration() : 0 <=
                this._pausedAt ? this._pausedAt : (z.ctx.currentTime - this._startedAt) % this._sound.get_duration()
        },
        update: function(a) {
            this.volume.update(a);
            3 == this._sourceNode.playbackState && this._complete.set__(!0);
            return this._complete._value || 0 <= this._pausedAt ? (this._tickableAdded = !1, this._hideBinding.dispose(), !0) : !1
        },
        dispose: function() {
            this.set_paused(!0);
            this._complete.set__(!0)
        },
        setVolume: function(a) {
            null == this._gainNode && (this._gainNode = z.createGain(), this.insertNode(this._gainNode));
            this._gainNode.gain.value =
                a
        },
        insertNode: function(a) {
            0 <= this._pausedAt || (this._sourceNode.disconnect(), this._sourceNode.connect(a));
            a.connect(this._head);
            this._head = a
        },
        playAudio: function() {
            var a = this;
            this._sourceNode.connect(this._head);
            this._startedAt = z.ctx.currentTime;
            this._pausedAt = -1;
            this._tickableAdded || (Ca.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._hideBinding = l.hidden.get_changed().connect(function(b) {
                b ? (a._wasPaused = 0 <= a._pausedAt, a.set_paused(!0)) : a.set_paused(a._wasPaused)
            }))
        },
        __class__: hb
    };
    var Jb = function() {
        this._width = this._height = -1;
        this._transitor = null;
        g.call(this);
        this.scenes = [];
        this.occludedScenes = [];
        this._root = new o
    };
    e["flambe.scene.Director"] = Jb;
    Jb.__name__ = ["flambe", "scene", "Director"];
    Jb.__super__ = g;
    Jb.prototype = s(g.prototype, {
        get_name: function() {
            return "Director_13"
        },
        setSize: function(a, b) {
            this._width = a;
            this._height = b;
            return this
        },
        pushScene: function(a, b) {
            var c = this;
            this.completeTransition();
            var d = this.get_topScene();
            null != d ? this.playTransition(d, a, b, function() {
                c.hide(d)
            }) : (this.add(a),
                this.invalidateVisibility())
        },
        popScene: function(a) {
            var b = this;
            this.completeTransition();
            var c = this.get_topScene();
            if (null != c) {
                this.scenes.pop();
                var d = this.get_topScene();
                null != d ? this.playTransition(c, d, a, function() {
                    b.hideAndDispose(c)
                }) : (this.hideAndDispose(c), this.invalidateVisibility())
            }
        },
        unwindToScene: function(a, b) {
            var c = this;
            this.completeTransition();
            var d = this.get_topScene();
            if (null != d) {
                if (d != a) {
                    for (this.scenes.pop(); 0 < this.scenes.length && this.scenes[this.scenes.length - 1] != a;) this.scenes.pop().dispose();
                    this.playTransition(d, a, b, function() {
                        c.hideAndDispose(d)
                    })
                }
            } else this.pushScene(a, b)
        },
        onAdded: function() {
            this.owner.addChild(this._root)
        },
        onRemoved: function() {
            this.completeTransition();
            for (var a = 0, b = this.scenes; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispose()
            }
            this.scenes = [];
            this.occludedScenes = [];
            this._root.dispose()
        },
        onUpdate: function(a) {
            null != this._transitor && this._transitor.update(a) && this.completeTransition()
        },
        get_topScene: function() {
            var a = this.scenes.length;
            return 0 < a ? this.scenes[a - 1] : null
        },
        add: function(a) {
            var b =
                this.get_topScene();
            null != b && this._root.removeChild(b);
            y.remove(this.scenes, a);
            this.scenes.push(a);
            this._root.addChild(a)
        },
        hide: function(a) {
            a = a._compMap.Scene_15;
            null != a && a.hidden.emit()
        },
        hideAndDispose: function(a) {
            this.hide(a);
            a.dispose()
        },
        show: function(a) {
            a = a._compMap.Scene_15;
            null != a && a.shown.emit()
        },
        invalidateVisibility: function() {
            for (var a = this.scenes.length; 0 < a;) {
                var b = this.scenes[--a]._compMap.Scene_15;
                if (null == b || b.opaque) break
            }
            this.occludedScenes = 0 < this.scenes.length ? this.scenes.slice(a,
                this.scenes.length - 1) : [];
            a = this.get_topScene();
            null != a && this.show(a)
        },
        completeTransition: function() {
            null != this._transitor && (this._transitor.complete(), this._transitor = null, this.invalidateVisibility())
        },
        playTransition: function(a, b, c, d) {
            this.completeTransition();
            this.add(b);
            null != c ? (this.occludedScenes.push(a), this._transitor = new Ec(a, b, c, d), this._transitor.init(this)) : (d(), this.invalidateVisibility())
        },
        get_width: function() {
            return 0 > this._width ? l._platform.getStage().get_width() : this._width
        },
        get_height: function() {
            return 0 >
                this._height ? l._platform.getStage().get_height() : this._height
        },
        __class__: Jb
    });
    var Ec = function(a, b, c, d) {
        this._from = a;
        this._to = b;
        this._transition = c;
        this._onComplete = d
    };
    e["flambe.scene._Director.Transitor"] = Ec;
    Ec.__name__ = ["flambe", "scene", "_Director", "Transitor"];
    Ec.prototype = {
        init: function(a) {
            this._transition.init(a, this._from, this._to)
        },
        update: function(a) {
            return this._transition.update(a)
        },
        complete: function() {
            this._transition.complete();
            this._onComplete()
        },
        __class__: Ec
    };
    var ib = function() {};
    e["flambe.scene.Transition"] =
        ib;
    ib.__name__ = ["flambe", "scene", "Transition"];
    ib.prototype = {
        init: function(a, b, c) {
            this._director = a;
            this._from = b;
            this._to = c
        },
        update: function() {
            return !0
        },
        complete: function() {},
        __class__: ib
    };
    var za = function(a, b) {
        this._duration = a;
        this._ease = null != b ? b : t.linear
    };
    e["flambe.scene.TweenTransition"] = za;
    za.__name__ = ["flambe", "scene", "TweenTransition"];
    za.__super__ = ib;
    za.prototype = s(ib.prototype, {
        init: function(a, b, c) {
            ib.prototype.init.call(this, a, b, c);
            this._elapsed = 0
        },
        update: function(a) {
            this._elapsed += a;
            return this._elapsed >=
                this._duration
        },
        interp: function(a, b) {
            return a + (b - a) * this._ease(this._elapsed / this._duration)
        },
        __class__: za
    });
    var Fc = function() {};
    e["flambe.scene.Scene"] = Fc;
    Fc.__name__ = ["flambe", "scene", "Scene"];
    Fc.__super__ = g;
    Fc.prototype = s(g.prototype, {
        get_name: function() {
            return "Scene_15"
        },
        __class__: Fc
    });
    var Kb = function(a, b) {
        this._direction = 2;
        za.call(this, a, b)
    };
    e["flambe.scene.SlideTransition"] = Kb;
    Kb.__name__ = ["flambe", "scene", "SlideTransition"];
    Kb.__super__ = za;
    Kb.prototype = s(za.prototype, {
        up: function() {
            this._direction =
                0;
            return this
        },
        down: function() {
            this._direction = 1;
            return this
        },
        init: function(a, b, c) {
            za.prototype.init.call(this, a, b, c);
            switch (this._direction) {
                case 0:
                    this._x = 0;
                    this._y = -this._director.get_height();
                    break;
                case 1:
                    this._x = 0;
                    this._y = this._director.get_height();
                    break;
                case 2:
                    this._x = -this._director.get_width();
                    this._y = 0;
                    break;
                case 3:
                    this._x = this._director.get_width(), this._y = 0
            }
            a = this._from._compMap.Sprite_12;
            null == a && this._from.add(a = new v);
            a.setXY(0, 0);
            a = this._to._compMap.Sprite_12;
            null == a && this._to.add(a =
                new v);
            a.setXY(-this._x, -this._y)
        },
        update: function(a) {
            a = za.prototype.update.call(this, a);
            this._from._compMap.Sprite_12.setXY(this.interp(0, this._x), this.interp(0, this._y));
            this._to._compMap.Sprite_12.setXY(this.interp(-this._x, 0), this.interp(-this._y, 0));
            return a
        },
        complete: function() {
            this._from._compMap.Sprite_12.setXY(0, 0);
            this._to._compMap.Sprite_12.setXY(0, 0)
        },
        __class__: Kb
    });
    var va = function() {};
    e["flambe.script.Action"] = va;
    va.__name__ = ["flambe", "script", "Action"];
    va.prototype = {
        __class__: va
    };
    var fa =
        function(a, b, c, d) {
            this._value = a;
            this._by = b;
            this._seconds = c;
            this._easing = d
        };
    e["flambe.script.AnimateBy"] = fa;
    fa.__name__ = ["flambe", "script", "AnimateBy"];
    fa.__interfaces__ = [va];
    fa.prototype = {
        update: function(a) {
            null == this._tween && (this._tween = new Oa(this._value._value, this._value._value + this._by, this._seconds, this._easing), this._value.set_behavior(this._tween), this._value.update(a));
            if (this._value._behavior != this._tween) {
                var b = this._tween.elapsed - this._seconds;
                this._tween = null;
                return 0 < b ? Math.max(0, a -
                    b) : 0
            }
            return -1
        },
        __class__: fa
    };
    var ma = function(a, b, c, d) {
        this._value = a;
        this._to = b;
        this._seconds = c;
        this._easing = d
    };
    e["flambe.script.AnimateTo"] = ma;
    ma.__name__ = ["flambe", "script", "AnimateTo"];
    ma.__interfaces__ = [va];
    ma.prototype = {
        update: function(a) {
            null == this._tween && (this._tween = new Oa(this._value._value, this._to, this._seconds, this._easing), this._value.set_behavior(this._tween), this._value.update(a));
            if (this._value._behavior != this._tween) {
                var b = this._tween.elapsed - this._seconds;
                this._tween = null;
                return 0 <
                    b ? Math.max(0, a - b) : 0
            }
            return -1
        },
        __class__: ma
    };
    var Ja = function(a) {
        this._fn = a
    };
    e["flambe.script.CallFunction"] = Ja;
    Ja.__name__ = ["flambe", "script", "CallFunction"];
    Ja.__interfaces__ = [va];
    Ja.prototype = {
        update: function() {
            this._fn();
            return 0
        },
        __class__: Ja
    };
    var Lb = function(a) {
        this._duration = a;
        this._elapsed = 0
    };
    e["flambe.script.Delay"] = Lb;
    Lb.__name__ = ["flambe", "script", "Delay"];
    Lb.__interfaces__ = [va];
    Lb.prototype = {
        update: function(a) {
            this._elapsed += a;
            if (this._elapsed >= this._duration) {
                var b = this._elapsed - this._duration;
                this._elapsed = 0;
                return a - b
            }
            return -1
        },
        __class__: Lb
    };
    var Ra = function(a) {
        this._completedActions = [];
        this._runningActions = null != a ? a.slice() : []
    };
    e["flambe.script.Parallel"] = Ra;
    Ra.__name__ = ["flambe", "script", "Parallel"];
    Ra.__interfaces__ = [va];
    Ra.prototype = {
        update: function(a, b) {
            for (var c = !0, d = 0, f = 0, i = this._runningActions.length; f < i;) {
                var e = f++,
                    g = this._runningActions[e];
                if (null != g) {
                    var h = g.update(a, b);
                    0 <= h ? (this._runningActions[e] = null, this._completedActions.push(g), h > d && (d = h)) : c = !1
                }
            }
            return c ? (this._runningActions =
                this._completedActions, this._completedActions = [], d) : -1
        },
        __class__: Ra
    };
    var Mb = function(a, b) {
        null == b && (b = -1);
        this._action = a;
        this._remaining = this._count = b
    };
    e["flambe.script.Repeat"] = Mb;
    Mb.__name__ = ["flambe", "script", "Repeat"];
    Mb.__interfaces__ = [va];
    Mb.prototype = {
        update: function(a, b) {
            if (0 == this._count) return 0;
            var c = this._action.update(a, b);
            return 0 < this._count && 0 <= c && 0 == --this._remaining ? (this._remaining = this._count, c) : -1
        },
        __class__: Mb
    };
    var Aa = function() {
        g.call(this);
        this.stopAll()
    };
    e["flambe.script.Script"] =
        Aa;
    Aa.__name__ = ["flambe", "script", "Script"];
    Aa.__super__ = g;
    Aa.prototype = s(g.prototype, {
        get_name: function() {
            return "Script_11"
        },
        run: function(a) {
            a = new Nb(a);
            this._handles.push(a);
            return a
        },
        stopAll: function() {
            this._handles = []
        },
        onUpdate: function(a) {
            for (var b = 0; b < this._handles.length;) {
                var c = this._handles[b];
                c.removed || 0 <= c.action.update(a, this.owner) ? this._handles.splice(b, 1) : ++b
            }
        },
        __class__: Aa
    });
    var Nb = function(a) {
        this.removed = !1;
        this.action = a
    };
    e["flambe.script._Script.Handle"] = Nb;
    Nb.__name__ = ["flambe",
        "script", "_Script", "Handle"
    ];
    Nb.__interfaces__ = [pa];
    Nb.prototype = {
        dispose: function() {
            this.removed = !0;
            this.action = null
        },
        __class__: Nb
    };
    var qa = function(a) {
        this._idx = 0;
        this._runningActions = null != a ? a.slice() : []
    };
    e["flambe.script.Sequence"] = qa;
    qa.__name__ = ["flambe", "script", "Sequence"];
    qa.__interfaces__ = [va];
    qa.prototype = {
        update: function(a, b) {
            for (var c = 0;;) {
                var d = this._runningActions[this._idx];
                if (null != d)
                    if (d = d.update(a - c, b), 0 <= d) c += d;
                    else return -1;
                ++this._idx;
                if (this._idx >= this._runningActions.length) {
                    this._idx =
                        0;
                    break
                } else if (c > a) return -1
            }
            return c
        },
        __class__: qa
    };
    var la = e["flambe.subsystem.RendererType"] = {
        __ename__: ["flambe", "subsystem", "RendererType"],
        __constructs__: ["Stage3D", "WebGL", "Canvas"]
    };
    la.Stage3D = ["Stage3D", 0];
    la.Stage3D.toString = k;
    la.Stage3D.__enum__ = la;
    la.WebGL = ["WebGL", 1];
    la.WebGL.toString = k;
    la.WebGL.__enum__ = la;
    la.Canvas = ["Canvas", 2];
    la.Canvas.toString = k;
    la.Canvas.__enum__ = la;
    var Uc = function() {};
    e["flambe.util.Assert"] = Uc;
    Uc.__name__ = ["flambe", "util", "Assert"];
    Uc.that = function() {};
    var oc =
        function() {};
    e["flambe.util.BitSets"] = oc;
    oc.__name__ = ["flambe", "util", "BitSets"];
    oc.set = function(a, b, c) {
        return c ? a | b : a & ~b
    };
    var cb = function() {
        this.success = new B;
        this.error = new B;
        this.progressChanged = new gb;
        this.hasResult = !1;
        this._total = this._progress = 0
    };
    e["flambe.util.Promise"] = cb;
    cb.__name__ = ["flambe", "util", "Promise"];
    cb.prototype = {
        set_result: function(a) {
            if (this.hasResult) throw "Promise result already assigned";
            this._result = a;
            this.hasResult = !0;
            this.success.emit(a);
            return a
        },
        get: function(a) {
            return this.hasResult ?
                (a(this._result), null) : this.success.connect(a).once()
        },
        set_progress: function(a) {
            this._progress != a && (this._progress = a, this.progressChanged.emit());
            return a
        },
        set_total: function(a) {
            this._total != a && (this._total = a, this.progressChanged.emit());
            return a
        },
        __class__: cb
    };
    var gb = function(a) {
        M.call(this, a)
    };
    e["flambe.util.Signal0"] = gb;
    gb.__name__ = ["flambe", "util", "Signal0"];
    gb.__super__ = M;
    gb.prototype = s(M.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function() {
            var a = this;
            this._head == M.DISPATCHING_SENTINEL ? this.defer(function() {
                a.emitImpl()
            }) : this.emitImpl()
        },
        emitImpl: function() {
            for (var a = this.willEmit(), b = a; null != b;) b._listener(), b.stayInList || b.dispose(), b = b._next;
            this.didEmit(a)
        },
        __class__: gb
    });
    var lc = function(a) {
        this.next = null;
        this.fn = a
    };
    e["flambe.util._SignalBase.Task"] = lc;
    lc.__name__ = ["flambe", "util", "_SignalBase", "Task"];
    lc.prototype = {
        __class__: lc
    };
    var U = function() {};
    e["flambe.util.Strings"] = U;
    U.__name__ = ["flambe", "util", "Strings"];
    U.getFileExtension = function(a) {
        var b =
            a.lastIndexOf(".");
        return 0 < b ? y.substr(a, b + 1, null) : null
    };
    U.removeFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? y.substr(a, 0, b) : a
    };
    U.getUrlExtension = function(a) {
        var b = a.lastIndexOf("?");
        0 <= b && (a = y.substr(a, 0, b));
        b = a.lastIndexOf("/");
        0 <= b && (a = y.substr(a, b + 1, null));
        return U.getFileExtension(a)
    };
    U.joinPath = function(a, b) {
        0 < a.length && 47 != a.charCodeAt(a.length - 1) && (a += "/");
        return a + b
    };
    U.withFields = function(a, b) {
        var c = b.length;
        if (0 < c) {
            for (var a = 0 < a.length ? a + " [" : a + "[", d = 0; d < c;) {
                0 < d && (a += ", ");
                var f = b[d],
                    i = b[d + 1];
                if (r.is(i, Error)) {
                    var e = i.stack;
                    null != e && (i = e)
                }
                a += f + "=" + r.string(i);
                d += 2
            }
            a += "]"
        }
        return a
    };
    var Sa = function() {
        this.myAnimations = new S;
        g.call(this)
    };
    e["game.Animator"] = Sa;
    Sa.__name__ = ["game", "Animator"];
    Sa.__super__ = g;
    Sa.prototype = s(g.prototype, {
        get_name: function() {
            return "Animator_10"
        },
        Play: function(a, b, c) {
            this.myAnimations.exists(a) || this.myAnimations.set(a, []);
            var d = this.myAnimations.get(a),
                b = [new Gc(b, c)];
            this.myAnimations.set(a, b);
            for (a = 0; a < d.length;) b = d[a], ++a, b.myAnimation.Cancel(),
                null != b.myCb && b.myCb()
        },
        onUpdate: function(a) {
            for (var b = this.myAnimations.iterator(); b.hasNext();) {
                var c = b.next();
                0 != c.length && c[0].myAnimation.Update(a) && (c = c.shift().myCb, null != c && c())
            }
        },
        __class__: Sa
    });
    var Ta = function() {};
    e["game.Collider"] = Ta;
    Ta.__name__ = ["game", "Collider"];
    var Ua = function() {};
    e["game.Animation"] = Ua;
    Ua.__name__ = ["game", "Animation"];
    Ua.prototype = {
        __class__: Ua
    };
    var Ob = function(a, b, c, d, f) {
        this.myIsCancelled = !1;
        this.mySprite = a;
        this.myYVel = b;
        this.myXVel = c;
        this.myYAcc = d;
        this.myFloorLevel =
            f
    };
    e["game.GravityAnimation"] = Ob;
    Ob.__name__ = ["game", "GravityAnimation"];
    Ob.__interfaces__ = [Ua];
    Ob.prototype = {
        Update: function(a) {
            if (this.myIsCancelled || this.mySprite.y._value >= this.myFloorLevel) return !0;
            var b = this.mySprite.getNaturalWidth() / 2;
            0 > this.myXVel && this.mySprite.x._value < Ta.LEFT_WALL_POS + b && (this.myXVel = -this.myXVel);
            0 < this.myXVel && this.mySprite.x._value > Ta.RIGHT_WALL_POS - b && (this.myXVel = -this.myXVel);
            0 > this.myYVel && this.mySprite.y._value < 65 + b && (this.myYVel = -this.myYVel);
            b = this.mySprite.y;
            b.set__(b._value + this.myYVel * a);
            b = this.mySprite.x;
            b.set__(b._value + this.myXVel * a);
            this.myYVel += this.myYAcc * a;
            return !1
        },
        Cancel: function() {
            this.myIsCancelled = !0
        },
        __class__: Ob
    };
    var na = function(a) {
        this.myAnimations = a
    };
    e["game.AnimationGroup"] = na;
    na.__name__ = ["game", "AnimationGroup"];
    na.__interfaces__ = [Ua];
    na.prototype = {
        Update: function(a) {
            for (var b = !0, c = 0, d = this.myAnimations; c < d.length;) {
                var f = d[c];
                ++c;
                f.Update(a) || (b = !1)
            }
            return b
        },
        Cancel: function() {
            for (var a = 0, b = this.myAnimations; a < b.length;) {
                var c = b[a];
                ++a;
                c.Cancel()
            }
        },
        __class__: na
    };
    var Pb = function(a) {
        this.myCurrent = 0;
        this.myAnimations = a
    };
    e["game.AnimationSequence"] = Pb;
    Pb.__name__ = ["game", "AnimationSequence"];
    Pb.__interfaces__ = [Ua];
    Pb.prototype = {
        Update: function(a) {
            if (this.myCurrent == this.myAnimations.length) return !0;
            this.myAnimations[this.myCurrent].Update(a) && (this.myCurrent += 1);
            return this.myCurrent == this.myAnimations.length
        },
        Cancel: function() {
            for (; this.myCurrent < this.myAnimations.length;) this.myAnimations[this.myCurrent].Cancel(), this.myCurrent +=
                1
        },
        __class__: Pb
    };
    var F = function(a, b, c) {
        this.myElapsed = 0;
        this.myVariable = a;
        this.myDuration = b;
        this.myFunc = c
    };
    e["game.VarAnimation"] = F;
    F.__name__ = ["game", "VarAnimation"];
    F.__interfaces__ = [Ua];
    F.Wobble = function(a, b, c, d) {
        return a + c * Math.sin(b + 18 * d) * (1 - d) * (1 - d)
    };
    F.ExpIn = function(a, b, c) {
        return a + b * c * c
    };
    F.Linear = function(a, b, c) {
        return a + b * c
    };
    F.prototype = {
        Update: function(a) {
            var b = !1;
            this.myElapsed += a;
            this.myElapsed >= this.myDuration && (this.myElapsed = this.myDuration, b = !0);
            this.myVariable.set__(this.myFunc(this.myElapsed /
                this.myDuration));
            return b
        },
        Cancel: function() {
            this.myVariable.set__(this.myFunc(1))
        },
        __class__: F
    };
    var ra = function(a, b, c, d, f) {
        null == f && (f = t.linear);
        var i = c - b;
        F.call(this, a, d, function(a) {
            return b + i * f(a)
        })
    };
    e["game.VarAnimationFromTo"] = ra;
    ra.__name__ = ["game", "VarAnimationFromTo"];
    ra.__super__ = F;
    ra.prototype = s(F.prototype, {
        __class__: ra
    });
    var oa = function() {};
    e["game.AnimationHelpers"] = oa;
    oa.__name__ = ["game", "AnimationHelpers"];
    oa.CreateWobbleSpriteAnim = function(a, b, c, d) {
        null == d && (d = 1);
        null == c && (c = 0.2);
        null == b && (b = 1.3);
        return new na([new F(a.scaleX, b, function(a, b, c, d) {
            return function(e) {
                return a(b, c, d, e)
            }
        }(F.Wobble, d, 0, c)), new F(a.scaleY, b, function(a, b, c, d) {
            return function(e) {
                return a(b, c, d, e)
            }
        }(F.Wobble, d, 0, -c))])
    };
    oa.ChangeScale = function(a, b, c) {
        return new na([new F(a.scaleX, b, function(a, b, c) {
            return function(e) {
                return a(b, c, e)
            }
        }(F.ExpIn, a.scaleX._value, c)), new F(a.scaleY, b, function(a, b, c) {
            return function(e) {
                return a(b, c, e)
            }
        }(F.ExpIn, a.scaleY._value, c))])
    };
    oa.MoveFromTo = function(a, b, c, d, f, i) {
        return new na([new F(a.x,
            b,
            function(a, b, c) {
                return function(d) {
                    return a(b, c, d)
                }
            }(F.Linear, c, f - c)), new F(a.y, b, function(a, b, c) {
            return function(d) {
                return a(b, c, d)
            }
        }(F.Linear, d, i - d))])
    };
    var Gc = function(a, b) {
        this.myAnimation = a;
        this.myCb = b
    };
    e["game.AnimationWithCompletionCallback"] = Gc;
    Gc.__name__ = ["game", "AnimationWithCompletionCallback"];
    Gc.prototype = {
        __class__: Gc
    };
    var Qb = function(a) {
        this.myTextures = new S;
        this.myInnerPack = a
    };
    e["game.AtlasAssetPackExtender"] = Qb;
    Qb.__name__ = ["game", "AtlasAssetPackExtender"];
    Qb.__interfaces__ = [$a];
    Qb.prototype = {
        addAtlas: function(a, b) {
            for (var c = this.myInnerPack.getTexture(a).split(b.length), d = 0, f = 0; f < b.length;) {
                var i = b[f];
                ++f;
                var e = c[d];
                this.myTextures.set(i, e);
                e;
                d++
            }
        },
        getTexture: function(a, b) {
            null == b && (b = !0);
            var c = this.myTextures.get(a);
            return null != c ? c : this.myInnerPack.getTexture(a, b)
        },
        getSound: function(a, b) {
            null == b && (b = !0);
            return this.myInnerPack.getSound(a, b)
        },
        getFile: function(a, b) {
            null == b && (b = !0);
            return this.myInnerPack.getFile(a, b)
        },
        dispose: function() {
            for (var a = this.myTextures.iterator(); a.hasNext();) a.next().dispose();
            this.myInnerPack.dispose()
        },
        __class__: Qb
    };
    var Hc = function(a) {
        this.myFont = a.Normal
    };
    e["game.BonusFloaterFactory"] = Hc;
    Hc.__name__ = ["game", "BonusFloaterFactory"];
    Hc.prototype = {
        Create: function(a, b, c) {
            var d = new o,
                a = (new da(this.myFont, a)).setXY(750, c);
            a.setScale(2);
            c = a.y;
            c.set__(c._value - a.scaleY._value * a.getNaturalHeight() / 2);
            a.x.set__(b - a.scaleX._value * a.getNaturalWidth() / 2);
            d.add(a);
            b = new Aa;
            d.add(b);
            b.run(new qa([new ma(a.alpha, 1, 0.1, t.circIn), new Lb(0.5), new ma(a.alpha, 0, 0.3, t.circOut), new Ja(q(d,
                d.dispose))]));
            return d
        },
        __class__: Hc
    };
    var m = e["game.BubbleType"] = {
        __ename__: ["game", "BubbleType"],
        __constructs__: "GREEN,YELLOW,RED,BLUE,PURPLE,S_ORANGE,BLACK".split(",")
    };
    m.GREEN = ["GREEN", 0];
    m.GREEN.toString = k;
    m.GREEN.__enum__ = m;
    m.YELLOW = ["YELLOW", 1];
    m.YELLOW.toString = k;
    m.YELLOW.__enum__ = m;
    m.RED = ["RED", 2];
    m.RED.toString = k;
    m.RED.__enum__ = m;
    m.BLUE = ["BLUE", 3];
    m.BLUE.toString = k;
    m.BLUE.__enum__ = m;
    m.PURPLE = ["PURPLE", 4];
    m.PURPLE.toString = k;
    m.PURPLE.__enum__ = m;
    m.S_ORANGE = ["S_ORANGE", 5];
    m.S_ORANGE.toString =
        k;
    m.S_ORANGE.__enum__ = m;
    m.BLACK = ["BLACK", 6];
    m.BLACK.toString = k;
    m.BLACK.__enum__ = m;
    var C = e["game.State"] = {
        __ename__: ["game", "State"],
        __constructs__: ["Initial", "Spawning", "Falling", "FallCompleted", "Stationary"]
    };
    C.Initial = ["Initial", 0];
    C.Initial.toString = k;
    C.Initial.__enum__ = C;
    C.Spawning = ["Spawning", 1];
    C.Spawning.toString = k;
    C.Spawning.__enum__ = C;
    C.Falling = ["Falling", 2];
    C.Falling.toString = k;
    C.Falling.__enum__ = C;
    C.FallCompleted = ["FallCompleted", 3];
    C.FallCompleted.toString = k;
    C.FallCompleted.__enum__ = C;
    C.Stationary = ["Stationary", 4];
    C.Stationary.toString = k;
    C.Stationary.__enum__ = C;
    var Rb = function(a, b) {
        this.myDelayedFuncDelay = -1;
        this.myAnchorPosition = null;
        this.mySpawnTimer = 0;
        this.myState = C.Initial;
        this.myDisposalEnqueued = !1;
        this.rotationSpeed = 7;
        g.call(this);
        this.myType = a;
        this.myPack = b
    };
    e["game.BubbleLogic"] = Rb;
    Rb.__name__ = ["game", "BubbleLogic"];
    Rb.__super__ = g;
    Rb.prototype = s(g.prototype, {
        get_name: function() {
            return "BubbleLogic_2"
        },
        MakeStationary: function(a, b, c) {
            null == c && (c = !1);
            c && this.owner._compMap.Animator_10.Play("",
                oa.CreateWobbleSpriteAnim(this.owner._compMap.Sprite_12, 1.4, 0.3));
            this.myState = C.Stationary;
            this.myAnchorPosition = a;
            this.owner._compMap.Sprite_12.setXY(a.x, a.y)
        },
        MakeFalling: function(a) {
            J.Assert(null != this.owner);
            this.myAnchorPosition = null;
            var b;
            this.myType == m.S_ORANGE ? (b = this.myPack.getSound("sfx/completed", !1), null != b && 0 < b.get_duration() && b.play(1), b = this.PopAnimationOrange(), this.owner.parent.addChild(this.owner), this.myEmitter = new Sb(this.owner.parent), this.myEmitter.mySpawnX = this.owner._compMap.Sprite_12.x._value,
                this.myEmitter.mySpawnY = this.owner._compMap.Sprite_12.y._value, this.myEmitter.myVelX = 6, this.myEmitter.myVelY = -20, this.myEmitter.myTexture = this.myPack.getTexture("gfx/particle1"), this.myEmitter.mySpawnInterval = 0.1, this.myEmitter.myParticleTtl = 0.6, this.myEmitter.myMaxParticles = 10, this.myEmitter.Start(), this.owner.add(this.myEmitter)) : b = this.FallAnimation();
            this.owner._compMap.Animator_10.Play("", b, function(a, b) {
                return function() {
                    return a(b)
                }
            }(q(this, this.OnPopCompleted), a));
            this.myState = C.Falling
        },
        StartPopAnim: function(a, b) {
            this.myAnchorPosition = null;
            var c;
            this.myType == m.S_ORANGE ? (c = this.PopAnimationOrange(), this.owner.parent.addChild(this.owner)) : c = this.PopAnimation();
            this.myState = C.Falling;
            c = function(a, b, c, e) {
                return function() {
                    return a(b, c, e)
                }
            }((ba = this.owner._compMap.Animator_10, q(ba, ba.Play)), "", c, function(a, b) {
                return function() {
                    return a(b)
                }
            }(q(this, this.OnPopCompleted), b));
            0 != a ? (this.myDelayedFuncDelay = a, this.myDelayedFunc = c) : c()
        },
        AnimateShot: function(a, b) {
            for (var c = null, d = [], f = 0; f < a.length;) {
                var i =
                    a[f];
                ++f;
                if (null == c) c = i.clone();
                else {
                    var e = (new ca(i.x - c.x, i.y - c.y)).magnitude(),
                        e = oa.MoveFromTo(this.owner._compMap.Sprite_12, e / 2300, c.x, c.y, i.x, i.y),
                        c = i.clone();
                    d.push(e)
                }
            }
            this.owner._compMap.Animator_10.Play("", new Pb(d), b)
        },
        PopAnimation: function() {
            return oa.ChangeScale(this.owner._compMap.Sprite_12, 0.19 + 0.03 * Math.random(), 0.6)
        },
        RotationX: function(a) {
            return 350 * (1 - a * a * a * a) * Math.sin(3.5 + a * -this.rotationSpeed) + 130 * (1 - a)
        },
        RotationY: function(a) {
            return 350 * (1 - a * a * a * a) * Math.cos(3.5 + a * -this.rotationSpeed)
        },
        Smooth: function(a, b) {
            for (var c = a(Math.min(1, Math.max(0, b))), d = 1, f = 1, i = 0; 5 > i;) var e = i++,
                f = 0.75 * f,
                c = c + a(Math.min(1, Math.max(0, b - 0.04 * e))) * f,
                c = c + a(Math.min(1, Math.max(0, b + 0.04 * e))) * f,
                d = d + 2 * f;
            return c / d
        },
        Interpolate3: function(a, b, c, d, f, e) {
            if (e < b) return f = e / b, f *= f, a(e) * (1 - f) + c(e) * f;
            if (e < d) return c(e);
            a = (e - d) / (1 - d);
            a *= a;
            return c(e) * (1 - a) + f(e) * a
        },
        CompositeX: function(a, b) {
            var c = this;
            return this.Smooth(function(a, b, c, e, g, h) {
                return function(j) {
                    return a(b, c, e, g, h, j)
                }
            }(q(this, this.Interpolate3), function() {
                    return a
                },
                0.4,
                function(a) {
                    return 350 + c.RotationX(a)
                }, 0.85,
                function() {
                    return 2E3
                }), b)
        },
        CompositeY: function(a, b) {
            var c = this;
            return this.Smooth(function(a, b, c, e, g, h) {
                return function(j) {
                    return a(b, c, e, g, h, j)
                }
            }(q(this, this.Interpolate3), function() {
                return a
            }, 0.4, function(a) {
                return 550 + c.RotationY(a)
            }, 0.85, function() {
                return -170
            }), b)
        },
        PopAnimationOrange: function() {
            return new na([oa.ChangeScale(this.owner._compMap.Sprite_12, 1.2, 4), new F(this.owner._compMap.Sprite_12.x, 1.2, function(a, b) {
                return function(c) {
                    return a(b,
                        c)
                }
            }(q(this, this.CompositeX), this.owner._compMap.Sprite_12.x._value)), new F(this.owner._compMap.Sprite_12.y, 1.2, function(a, b) {
                return function(c) {
                    return a(b, c)
                }
            }(q(this, this.CompositeY), this.owner._compMap.Sprite_12.y._value))])
        },
        FallAnimation: function() {
            return new Ob(this.owner._compMap.Sprite_12, -600 + -400 * Math.random(), 1200 * (Math.random() - 0.5), 3300, x.TargetHeight - 200)
        },
        OnPopCompleted: function(a) {
            this.myState = C.FallCompleted;
            this.myType != m.S_ORANGE && (0.7 > Math.random() ? this.myPack.getSound("sfx/pop").play() :
                this.myPack.getSound("sfx/pop2").play(0.8), this.PlayExplosionEffect(this.owner._compMap.Sprite_12.x._value, this.owner._compMap.Sprite_12.y._value));
            a()
        },
        MakeSpawning: function(a, b, c) {
            null == c && (c = -1);
            this.owner._compMap.Sprite_12.setXY(a.x, a.y);
            this.mySpawnTimer = 0;
            this.myState = C.Spawning;
            a = this.owner._compMap.Sprite_12;
            a.setScale(0);
            b = function(a, b, c, e) {
                return function() {
                    return a(b, c, e)
                }
            }((ba = this.owner._compMap.Animator_10, q(ba, ba.Play)), "", oa.ChangeScale(a, 0.4, 1), function(a, b) {
                return function() {
                    return a(b)
                }
            }(q(this,
                this.SpawnCompleted), b));
            0 < c ? (this.myDelayedFuncDelay = c, this.myDelayedFunc = b) : b()
        },
        SpawnCompleted: function(a) {
            this.myState = C.Stationary;
            a()
        },
        StartCollisionAnim: function() {
            this.owner._compMap.Animator_10.Play("", oa.CreateWobbleSpriteAnim(this.owner._compMap.Sprite_12, 1 + 0.2 * Math.random(), 0.1))
        },
        GetType: function() {
            return this.myType
        },
        onUpdate: function(a) {
            0 <= this.myDelayedFuncDelay && (this.myDelayedFuncDelay -= a, 0 >= this.myDelayedFuncDelay && this.myDelayedFunc());
            null != this.myEmitter && (a = this.owner._compMap.Sprite_12,
                this.myEmitter.mySpawnX = a.x._value, this.myEmitter.mySpawnY = a.y._value, this.myEmitter.mySpawnScale = a.scaleX._value, this.owner.parent.addChild(this.owner));
            this.myDisposalEnqueued && this.owner.dispose()
        },
        dispose: function() {
            null != this.myEmitter && (this.myEmitter.dispose(), this.myEmitter = null);
            g.prototype.dispose.call(this)
        },
        EnqueueDisposal: function() {
            this.myDisposalEnqueued = !0
        },
        PlayExplosionEffect: function(a, b) {
            var c = (new o).add((new w(this.myPack.getTexture("gfx/pop_circle"))).setXY(a, b).setScale(0.5).centerAnchor()).add(new Aa);
            c._compMap.Script_11.run(new qa([new Ra([new ma(c._compMap.Sprite_12.scaleX, 2, 0.3, t.expoOut), new ma(c._compMap.Sprite_12.scaleY, 2, 0.3, t.expoOut), new ma(c._compMap.Sprite_12.alpha, 0, 0.3, t.expoOut)]), new Ja(function() {
                c.dispose()
            })]));
            null != this.owner && null != this.owner.parent && this.owner.parent.addChild(c)
        },
        __class__: Rb
    });
    var T = function(a, b) {
        g.call(this);
        this.myPack = a;
        this.myWallCollisionCb = b
    };
    e["game.BubbleFactory"] = T;
    T.__name__ = ["game", "BubbleFactory"];
    T.RandomBubbleType = function(a) {
        var b = [m.BLUE,
            m.RED, m.YELLOW, m.GREEN, m.PURPLE
        ];
        J.Assert(0 < a);
        J.Assert(a <= b.length);
        return b[r.random(a)]
    };
    T.GetTextureForType = function(a, b) {
        var c = T.myTextureCache.get(b);
        if (null != c) return c;
        b == m.GREEN ? c = a.getTexture("gfx/bubble_green") : b == m.RED ? c = a.getTexture("gfx/bubble_red") : b == m.YELLOW ? c = a.getTexture("gfx/bubble_yellow") : b == m.BLUE ? c = a.getTexture("gfx/bubble_blue") : b == m.PURPLE ? c = a.getTexture("gfx/bubble_purple") : b == m.S_ORANGE ? c = a.getTexture("gfx/orange") : b == m.BLACK && (c = a.getTexture("gfx/bubble_black"));
        J.Assert(null !=
            c);
        T.myTextureCache.set(b, c);
        return c
    };
    T.GetImageForType = function(a, b) {
        return (new w(T.GetTextureForType(a, b))).centerAnchor()
    };
    T.__super__ = g;
    T.prototype = s(g.prototype, {
        get_name: function() {
            return "BubbleFactory_1"
        },
        Spawn: function(a) {
            return (new o).add(T.GetImageForType(this.myPack, a)).add(new Rb(a, this.myPack)).add(new Sa)
        },
        __class__: T
    });
    var G = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.myX = a;
        this.myY = b
    };
    e["game.GridCoord"] = G;
    G.__name__ = ["game", "GridCoord"];
    G.equals = function(a, b) {
        return a.myX ==
            b.myX && a.myY == b.myY
    };
    G.prototype = {
        __class__: G
    };
    var N = e["game.UpdateResult"] = {
        __ename__: ["game", "UpdateResult"],
        __constructs__: ["None", "LevelCompleted", "LevelLost"]
    };
    N.None = ["None", 0];
    N.None.toString = k;
    N.None.__enum__ = N;
    N.LevelCompleted = ["LevelCompleted", 1];
    N.LevelCompleted.toString = k;
    N.LevelCompleted.__enum__ = N;
    N.LevelLost = ["LevelLost", 2];
    N.LevelLost.toString = k;
    N.LevelLost.__enum__ = N;
    var I = function(a, b, c, d, f) {
        this.myBubbleTypes = new hc;
        this.myAnimatingBubblesCounter = new Tb;
        this.myPostAnimationActions = [];
        this.myNeedsFallingBubbleCheck = !1;
        this.BubbleCollisionRadiusWhenResolving = 39;
        this.BubbleCollisionRadius = 25;
        this.myScoreManager = c;
        this.myBubbleFactory = f;
        this.myRoot = new o;
        a.addChild(this.myRoot);
        this.myVerticalScreenShakeFunc = b;
        this.myMissHandler = d;
        this.myGrid = [];
        this.myGridWidth = 9;
        this.myGridHeight = 13;
        this.myGridGameOverLevel = 11;
        a = 0;
        for (b = this.myGridWidth * this.myGridHeight; a < b;) a++, this.myGrid.push(null)
    };
    e["game.BubbleManager"] = I;
    I.__name__ = ["game", "BubbleManager"];
    I.IsExcluded = function(a, b) {
        return wa.exists(a,
            function(a) {
                return G.equals(a, b)
            })
    };
    I.prototype = {
        IsNeighbour: function(a, b) {
            for (var c = this.GetNeighbourCoords(a), d = 0; d < c.length;) {
                var f = c[d];
                ++d;
                if (G.equals(f, b)) return !0
            }
            return !1
        },
        IsValidPosForBlackBubble: function(a, b, c) {
            if (0 == a.myY || G.equals(a, b)) return !1;
            for (var d = 0; d < c.length;) {
                var f = c[d];
                ++d;
                if (G.equals(f, a) || this.IsNeighbour(f, a)) return !1
            }
            return this.IsNeighbour(a, b) ? !1 : !0
        },
        GenerateBlackBubbleCoords: function(a, b, c) {
            for (var d = []; d.length < a;) {
                var f = new G(r.random(this.myGridWidth), 1 + r.random(c -
                    1));
                this.IsValidPosForBlackBubble(f, b, d) && (d.push(f), null)
            }
            return d
        },
        InitLevel: function(a, b, c, d) {
            this.myColorCount = b;
            for (var d = d ? new G(r.random(this.myGridWidth), 1) : new G(1 + r.random(this.myGridWidth - 2), 1), c = this.GenerateBlackBubbleCoords(c, d, a), f = 0, a = this.myGridWidth * a; f < a;) {
                for (var e = f++, g = T.RandomBubbleType(b), h = this.GridCoordFromIndex(e), n = 0; n < c.length;) {
                    var j = c[n];
                    ++n;
                    if (G.equals(h, j)) {
                        g = m.BLACK;
                        break
                    }
                }
                G.equals(h, d) && (g = m.S_ORANGE);
                g = this.myBubbleFactory.Spawn(g);
                h = e / this.myGridWidth | 0;
                n = [this.myAnimatingBubblesCounter.CreateToken()];
                g._compMap.BubbleLogic_2.MakeSpawning(this.GridToWorldCoords(e % this.myGridWidth, h), function(a) {
                    return function() {
                        a[0].Dispose()
                    }
                }(n), 0.5 + 0.1 * h);
                J.Assert(null == this.myGrid[e]);
                this.myGrid[e] = g;
                this.myRoot.addChild(g)
            }
            this.RefreshBubbleTypes()
        },
        InitLevelWithData: function(a) {
            for (var b = 0, c = a.length; b < c;)
                for (var d = b++, f = a[d], e = 0, g = f.length; e < g;) {
                    var h = e++,
                        n = f.charAt(h);
                    if (" " != n) {
                        var j;
                        if ("1" == n) j = m.BLUE;
                        else if ("2" == n) j = m.RED;
                        else if ("3" == n) j = m.YELLOW;
                        else if ("o" == n) j = m.S_ORANGE;
                        else continue;
                        n = this.GridCoordToIndex(new G(h,
                            d));
                        j = this.myBubbleFactory.Spawn(j);
                        j._compMap.BubbleLogic_2.MakeStationary(this.GridToWorldCoords(h, d), !1);
                        this.myGrid[n] = j;
                        this.myRoot.addChild(j)
                    }
                }
            this.RefreshBubbleTypes()
        },
        RefreshBubbleTypes: function() {
            this.myBubbleTypes.clear();
            for (var a = 0, b = this.myGrid; a < b.length;) {
                var c = b[a];
                ++a;
                null != c && (c = c._compMap.BubbleLogic_2.GetType(), c == m.S_ORANGE || c == m.BLACK || this.myBubbleTypes.insert(c))
            }
        },
        SpawnRegrowth: function() {
            for (var a = 0, b = this.myGridWidth; a < b;)
                for (var c = a++, d = J.NegIter(this.myGridHeight - 1,
                        0); d.hasNext();) {
                    var f = d.next();
                    if (0 == f || null != this.GetBubbleAt(new G(c, f - 1))) {
                        J.Assert(null == this.myGrid[this.GridCoordToIndex(new G(c, f))]);
                        d = this.myBubbleFactory.Spawn(this.RandomAvailableBubbleType());
                        this.myGrid[this.GridCoordToIndex(new G(c, f))] = d;
                        c = this.GridToWorldCoords(c, f);
                        d._compMap.BubbleLogic_2.MakeSpawning(c, function(a, b) {
                            return function() {
                                return a(b)
                            }
                        }(q(this, this.BubbleSpawnCompleted), this.myAnimatingBubblesCounter.CreateToken()));
                        this.myRoot.addChild(d);
                        break
                    }
                }
        },
        BubbleSpawnCompleted: function(a) {
            a.Dispose()
        },
        RegisterActive: function(a, b) {
            this.myRoot.addChild(a);
            a._compMap.BubbleLogic_2.AnimateShot(b, function(a, b, f, e) {
                return function() {
                    return a(b, f, e)
                }
            }(q(this, this.ShotAnimationCompleted), a, b[b.length - 1], this.myAnimatingBubblesCounter.CreateToken()))
        },
        ShotAnimationCompleted: function(a, b, c) {
            var d = this;
            c.Dispose();
            c = this.WorldToGridCoords(b.x, b.y);
            b = this.GridCoordToIndex(c);
            J.Assert(null == this.myGrid[b]);
            this.myGrid[b] = a;
            this.myVerticalScreenShakeFunc();
            a._compMap.BubbleLogic_2.MakeStationary(this.GridToWorldCoords(c.myX,
                c.myY), !1, !0);
            [].push(a);
            this.AddPushAnimToNeighbours(c);
            a = !0;
            b = [];
            if (this.FindGroup(c, b, !0) && 3 <= b.length) {
                a = !1;
                this.myNeedsFallingBubbleCheck = !0;
                for (var f = c = 0, e = 0; e < b.length;) {
                    var g = b[e];
                    ++e;
                    f += g.myX;
                    c += g.myY
                }
                f /= b.length;
                c /= b.length;
                c = this.GridToWorldCoords(Math.round(f), Math.round(c));
                20 <= b.length ? this.myScoreManager.AddScore(120, Z.Enabled, c.x, c.y, "OH MY GOD.") : 10 <= b.length ? this.myScoreManager.AddScore(60, Z.Enabled, c.x, c.y, "GOOD JOB!") : 5 <= b.length && this.myScoreManager.AddScore(25, Z.Enabled, c.x,
                    c.y, "BONUS");
                this.myPostAnimationActions.push((ba = this.myScoreManager, q(ba, ba.IncrementMultiplier)));
                for (c = 0; c < b.length;) f = [b[c]], ++c, this.GridToWorldCoords(f[0].myX, f[0].myY), e = [this.GetBubbleAt(f[0])], J.Assert(null != e[0]), g = [this.myAnimatingBubblesCounter.CreateToken()], e[0]._compMap.BubbleLogic_2.StartPopAnim(0, function(a, b, c) {
                    return function() {
                        a[0].Dispose();
                        var f = b[0]._compMap.Sprite_12;
                        d.myScoreManager.AddScore(5, Z.Enabled, f.x._value, f.y._value, null);
                        d.myGrid[d.GridCoordToIndex(c[0])] = null;
                        d.myNeedsFallingBubbleCheck = !0;
                        d.AddPushAnimToNeighbours(c[0]);
                        b[0]._compMap.BubbleLogic_2.EnqueueDisposal()
                    }
                }(g, e, f))
            } else this.myScoreManager.ResetMultiplier();
            a && this.myMissHandler()
        },
        Clear: function() {
            this.myRoot.disposeChildren();
            this.myAnimatingBubblesCounter = new Tb;
            for (var a = 0, b = this.myGrid.length; a < b;) this.myGrid[a++] = null
        },
        GetCollisionDistLeftWall: function(a, b, c) {
            if (0 <= b.x) return Math.POSITIVE_INFINITY;
            a = (c + this.BubbleCollisionRadius - a.x) / b.x;
            return 0 > a ? Math.POSITIVE_INFINITY : a * b.magnitude()
        },
        GetCollisionDistRightWall: function(a, b, c) {
            if (0 >= b.x) return Math.POSITIVE_INFINITY;
            a = (c - this.BubbleCollisionRadius - a.x) / b.x;
            return 0 > a ? Math.POSITIVE_INFINITY : a * b.magnitude()
        },
        GetCollisionDistCeil: function(a, b, c) {
            if (0 == b.y) return Math.POSITIVE_INFINITY;
            a = (c - a.y) / b.y;
            return 0 > a ? Math.POSITIVE_INFINITY : a * b.magnitude()
        },
        GetCollisionDistBubble: function(a, b, c, d) {
            c = this.GridToWorldCoords(c, d);
            d = ya.GetTForClosestPointOnLine(new ya(a.x, a.y), new ya(b.x, b.y), c);
            if ((new ca(a.x + b.x * d, a.y + b.y * d)).distanceTo(c.x,
                    c.y) > 2 * this.BubbleCollisionRadius) return Math.POSITIVE_INFINITY;
            for (var f = 0, e = 0; 1E3 > e && !(e++, f += 0.2, (new ca(a.x + b.x * (d - f), a.y + b.y * (d - f))).distanceTo(c.x, c.y) > 2 * this.BubbleCollisionRadiusWhenResolving););
            return (d - f) * b.magnitude()
        },
        GetPathForBubbleShot: function(a, b) {
            var c = b.clone();
            c.normalize();
            J.Assert(0 > c.y);
            var d = [],
                f = a.clone();
            d.push(a.clone());
            for (var e = Math.POSITIVE_INFINITY, g = !1, h = 0; 100 > h;) {
                h++;
                var j = this.GetCollisionDistCeil(f, c, I.myGridYOffset);
                j < e && (e = j, g = !0);
                j = this.GetCollisionDistLeftWall(f,
                    c, Ta.LEFT_WALL_POS);
                j < e && (e = j, g = !1);
                j = this.GetCollisionDistRightWall(f, c, Ta.RIGHT_WALL_POS);
                j < e && (e = j, g = !1);
                for (var j = 0, k = this.myGridHeight; j < k;)
                    for (var l = j++, m = 0, o = this.myGridWidth; m < o;) {
                        var p = m++;
                        null != this.GetBubbleAt(new G(p, l)) && (p = this.GetCollisionDistBubble(f, c, p, l), p < e && (e = p, g = !0))
                    }
                f.set(f.x + c.x * e, f.y + c.y * e);
                d.push(f.clone());
                if (g) return this.BacktrackPathToFreeSlot(d), d;
                c.x = -c.x;
                e = Math.POSITIVE_INFINITY
            }
            this.BacktrackPathToFreeSlot(d);
            return d
        },
        BacktrackPathToFreeSlot: function(a) {
            J.Assert(2 <=
                a.length);
            for (var b = a[a.length - 1], c = a[a.length - 2]; !this.IsWorldPosEmpty(b.x, b.y);) {
                var d = Qc.sub(b.clone(), c),
                    f = d.magnitude();
                5 > f ? (a.pop(), J.Assert(2 <= a.length), b = a[a.length - 1], c = a[a.length - 2]) : (b.x -= 5 * d.x / f, b.y -= 5 * d.y / f)
            }
            J.Assert(2 <= a.length)
        },
        IsWorldPosEmpty: function(a, b) {
            return null == this.myGrid[this.GridCoordToIndex(this.WorldToGridCoords(a, b))]
        },
        IsAnimating: function() {
            return 0 != this.myAnimatingBubblesCounter.GetCount() ? !0 : !1
        },
        GetType: function(a) {
            return a._compMap.BubbleLogic_2.GetType()
        },
        Update: function() {
            var a =
                this,
                b = this.myNeedsFallingBubbleCheck || !1;
            this.myNeedsFallingBubbleCheck = !1;
            if (b) {
                for (var b = new ia, c = 0, d = this.myGridHeight; c < d;)
                    for (var f = c++, e = 0, g = this.myGridWidth; e < g;) {
                        var h = e++,
                            h = [new G(h, f)],
                            j = [this.GetBubbleAt(h[0])];
                        if (null != j[0] && this.ShouldFall(h[0], b)) {
                            if (j[0]._compMap.BubbleLogic_2.GetType() == m.S_ORANGE) {
                                var k = j[0]._compMap.Sprite_12;
                                this.myScoreManager.AddScore(1E3, Z.Enabled, k.x._value, k.y._value, "")
                            }
                            k = [this.myAnimatingBubblesCounter.CreateToken()];
                            this.myGrid[this.GridCoordToIndex(h[0])] =
                                null;
                            j[0]._compMap.BubbleLogic_2.MakeFalling(function(b, c, d) {
                                return function() {
                                    b[0].Dispose();
                                    var f = c[0]._compMap.Sprite_12;
                                    c[0]._compMap.BubbleLogic_2.GetType() != m.S_ORANGE && a.myScoreManager.AddScore(5, Z.Enabled, f.x._value, f.y._value, null);
                                    a.AddPushAnimToNeighbours(d[0]);
                                    c[0]._compMap.BubbleLogic_2.EnqueueDisposal()
                                }
                            }(k, j, h));
                            j[0]._compMap.BubbleLogic_2.GetType() == m.S_ORANGE && this.StartEndLevelPopFest()
                        }
                    }
                this.RefreshBubbleTypes()
            }
            if (!this.IsAnimating() && 0 != this.myPostAnimationActions.length) {
                b = 0;
                for (c = this.myPostAnimationActions; b < c.length;) d = c[b], ++b, d();
                this.myPostAnimationActions = []
            }
            b = this.myGridGameOverLevel;
            for (c = this.myGridHeight; b < c;) {
                d = b++;
                f = 0;
                for (e = this.myGridWidth; f < e;)
                    if (g = f++, null != this.myGrid[this.GridCoordToIndex(new G(g, d))]) return N.LevelLost
            }
            b = !1;
            c = 0;
            for (d = this.myGrid; c < d.length;)
                if (f = d[c], ++c, null != f && this.GetType(f) == m.S_ORANGE) {
                    b = !0;
                    break
                }
            return !b ? N.LevelCompleted : N.None
        },
        StartEndLevelPopFest: function() {
            for (var a = this, b = 0, c = this.myGridWidth; b < c;) {
                var d = [b++],
                    f = [this.myGrid[d[0]]];
                if (null != f[0]) {
                    var e = [this.myAnimatingBubblesCounter.CreateToken()];
                    f[0]._compMap.BubbleLogic_2.StartPopAnim(0.8 + 0.06 * d[0], function(b, c, d) {
                        return function() {
                            b[0].Dispose();
                            var f = c[0]._compMap.Sprite_12;
                            a.myScoreManager.AddScore(5, Z.Enabled, f.x._value, f.y._value, null);
                            a.myRoot.removeChild(c[0]);
                            c[0]._compMap.BubbleLogic_2.EnqueueDisposal();
                            a.myGrid[d[0]] = null;
                            a.myNeedsFallingBubbleCheck = !0
                        }
                    }(e, f, d))
                }
            }
        },
        ShouldFall: function(a, b) {
            if (0 == a.myY) return !1;
            var c;
            c = this.GridCoordToIndex(a);
            c = b.get(c);
            if (null !=
                c) return c;
            c = [];
            this.FindGroup(a, c, !1);
            for (var d = 0; d < c.length;) {
                var f = c[d];
                ++d;
                if (0 == f.myY) {
                    for (d = 0; d < c.length;) f = c[d], ++d, f = this.GridCoordToIndex(f), b.set(f, !1);
                    return !1
                }
            }
            for (d = 0; d < c.length;) f = c[d], ++d, f = this.GridCoordToIndex(f), b.set(f, !0);
            return !0
        },
        GetBubbleAt: function(a) {
            a = this.GridCoordToIndex(a);
            return -1 == a ? null : this.myGrid[a]
        },
        FindGroup: function(a, b, c, d) {
            null == c && (c = !1);
            null == d && (d = [], d.push(a));
            b.push(a);
            this.GridCoordToIndex(a);
            var f = this.GetBubbleAt(a);
            J.Assert(null != f);
            f._compMap.BubbleLogic_2.GetType();
            for (var a = this.GetNeighbourCoords(a), e = 0; e < a.length;) {
                var g = a[e];
                ++e;
                var h = this.GetBubbleAt(g);
                if (!(null == h || c && this.GetType(h) != this.GetType(f)) && !I.IsExcluded(d, g)) d.push(g), this.FindGroup(g, b, c, d)
            }
            return 1 < b.length
        },
        AddPushAnimToNeighbours: function(a) {
            for (var b = this.GridToWorldCoords(a.myX, a.myY), a = this.GetNeighbourCoords(a), c = 0; c < a.length;) {
                var d = a[c];
                ++c;
                var f = this.GetBubbleAt(d);
                null != f && (d = this.GridToWorldCoords(d.myX, d.myY), d.x -= b.x, d.y -= b.y, d.x *= 0.04, d.y *= 0.04, null, f._compMap.BubbleLogic_2.StartCollisionAnim(d.x,
                    d.y))
            }
        },
        GetNeighbourCoords: function(a) {
            var b = [0, 1, -1, 1, 0, 1];
            0 == a.myY % 2 && (b = [-1, 0, -1, 1, -1, 0]);
            for (var c = [-1, -1, 0, 0, 1, 1], d = [], f = 0; 6 > f;) {
                var e = f++,
                    g = a.myX + b[e],
                    e = a.myY + c[e];
                0 > g || g >= this.myGridWidth || 0 > e || e >= this.myGridHeight || d.push(new G(g, e))
            }
            return d
        },
        GridToWorldCoords: function(a, b) {
            return new ya(0.5 * (b % 2) * I.myBubbleGridXDist + I.myGridXOffset + a * I.myBubbleGridXDist, I.myGridYOffset + b * I.myBubbleGridYDist)
        },
        WorldToGridCoords: function(a, b) {
            var c = (b - I.myGridYOffset) / I.myBubbleGridYDist + 0.5 | 0,
                d = (a - I.myGridXOffset -
                    0.5 * (c % 2) * I.myBubbleGridXDist) / I.myBubbleGridXDist + 0.5 | 0,
                c = J.LimitI(c, 0, this.myGridHeight - 1),
                d = J.LimitI(d, 0, this.myGridWidth - 1);
            return new G(d, c)
        },
        GridCoordToIndex: function(a) {
            return 0 > a.myX || a.myX >= this.myGridWidth || 0 > a.myY || a.myY >= this.myGridHeight ? -1 : a.myY * this.myGridWidth + a.myX
        },
        GridCoordFromIndex: function(a) {
            return 0 > a || a >= this.myGrid.length ? null : new G(a % this.myGridWidth, a / this.myGridWidth | 0)
        },
        GetAvailableBubbleTypes: function() {
            return this.myBubbleTypes
        },
        RandomAvailableBubbleType: function() {
            var a =
                wa.array(this.myBubbleTypes);
            return 0 == a.length ? T.RandomBubbleType(this.myColorCount) : a[r.random(a.length)]
        },
        GetLineCount: function() {
            for (var a = new G(0, 0), b = 0, c = this.myGridGameOverLevel + 1; b < c;) {
                for (var d = b++, f = !0, e = 0, g = this.myGridWidth; e < g;) {
                    var h = e++;
                    a.myX = h;
                    a.myY = d;
                    if (null != this.myGrid[this.GridCoordToIndex(a)]) {
                        f = !1;
                        break
                    }
                }
                if (f) return d
            }
            return this.myGridGameOverLevel + 1
        },
        GetMaxLineCount: function() {
            return this.myGridGameOverLevel
        },
        GetDeathLineYPos: function() {
            return I.myGridYOffset + I.myBubbleGridYDist *
                (this.GetMaxLineCount() - 0.6)
        },
        __class__: I
    };
    var ga = function() {};
    e["game.Button"] = ga;
    ga.__name__ = ["game", "Button"];
    ga.CreateImageBtn = function(a, b, c, d, f, e) {
        a = a.getTexture(b);
        c = (new w(a)).setXY(c, d).centerAnchor();
        f = (new o).add(c).add(new jb(f, a, a));
        e && (e = f._compMap.Sprite_12, e.scaleX.set_behavior(new Za(0.95, 1.05)), e.scaleY.set_behavior(new Za(1.05, 0.95)));
        return f
    };
    ga.CreateToggleBtn = function(a, b, c, d, f, e) {
        var g = a.getTexture(b),
            h = a.getTexture(c),
            a = e._value ? g : h,
            j = new w(a);
        j.setXY(d, f).centerAnchor();
        var k = new o;
        k.add(j);
        k.add(new jb(function() {
            e.set__(!e._value)
        }, a, a));
        k.add(new Ub(e, function(a) {
            a = a ? g : h;
            j.texture = a;
            k._compMap.ButtonLogic_16.UpdateTextures(a, a)
        }));
        return k
    };
    var Ub = function(a, b) {
        g.call(this);
        this.mySignalConnection = a.get_changed().connect(b)
    };
    e["game.ToggleHelper"] = Ub;
    Ub.__name__ = ["game", "ToggleHelper"];
    Ub.__super__ = g;
    Ub.prototype = s(g.prototype, {
        get_name: function() {
            return "ToggleHelper_17"
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.mySignalConnection.dispose()
        },
        __class__: Ub
    });
    var jb = function(a, b, c) {
        this.myIsPressed = !1;
        g.call(this);
        this.myAction = a;
        this.myNormalTexture = b;
        this.myPressedTexture = c
    };
    e["game.ButtonLogic"] = jb;
    jb.__name__ = ["game", "ButtonLogic"];
    jb.__super__ = g;
    jb.prototype = s(g.prototype, {
        get_name: function() {
            return "ButtonLogic_16"
        },
        UpdateTextures: function(a, b) {
            this.myNormalTexture = a;
            this.myPressedTexture = b
        },
        onAdded: function() {
            var a = this.owner._compMap.Sprite_12;
            this.myPointerDownConnection = a.get_pointerDown().connect(q(this, this.OnPointerDown));
            this.myPointerUpConnection =
                a.get_pointerUp().connect(q(this, this.OnPointerUp));
            this.myPointerOutConnection = a.get_pointerOut().connect(q(this, this.OnPointerUp));
            this.myPointerMoveConnection = a.get_pointerMove().connect(q(this, this.OnPointerMoved))
        },
        onRemoved: function() {
            this.myPointerDownConnection.dispose();
            this.myPointerDownConnection = null;
            this.myPointerUpConnection.dispose();
            this.myPointerUpConnection = null
        },
        OnPointerDown: function(a) {
            this.myIsPressed = a._stopped = !0;
            this.SetTexture(this.myPressedTexture)
        },
        OnPointerUp: function(a) {
            a._stopped = !0;
            this.myIsPressed && (this.myIsPressed = !1, this.SetTexture(this.myNormalTexture), null != this.myAction && this.myAction())
        },
        OnPointerMoved: function(a) {
            a._stopped = !0
        },
        SetTexture: function(a) {
            r.instance(this.owner._compMap.Sprite_12, w).texture = a
        },
        __class__: jb
    });
    var K = e["game.AnimType"] = {
        __ename__: ["game", "AnimType"],
        __constructs__: ["PushForward", "Replace2", "ReplaceBoth"]
    };
    K.PushForward = ["PushForward", 0];
    K.PushForward.toString = k;
    K.PushForward.__enum__ = K;
    K.Replace2 = ["Replace2", 1];
    K.Replace2.toString = k;
    K.Replace2.__enum__ =
        K;
    K.ReplaceBoth = ["ReplaceBoth", 2];
    K.ReplaceBoth.toString = k;
    K.ReplaceBoth.__enum__ = K;
    var Vb = function() {
        this.a = new S;
        g.call(this);
        this.a.set("spottheorange", "1");
        "1"
    };
    e["game.SpotTheOrange"] = Vb;
    Vb.__name__ = ["game", "SpotTheOrange"];
    Vb.__super__ = g;
    Vb.prototype = s(g.prototype, {
        get_name: function() {
            return "SpotTheOrange_19"
        },
        __class__: Vb
    });
    var Va = function(a) {
        this.mySpotTheOrange = new Vb;
        this.myIsAnimating = !1;
        this.myEnqueuedAnimationType = null;
        this.myBubbleQueue = [];
        g.call(this);
        this.myPack = a
    };
    e["game.CannonController"] =
        Va;
    Va.__name__ = ["game", "CannonController"];
    Va.CreateCannon = function(a, b, c) {
        return (new o).add((new v).setXY(a, b)).add(new Va(c))
    };
    Va.__super__ = g;
    Va.prototype = s(g.prototype, {
        get_name: function() {
            return "CannonController_18"
        },
        onAdded: function() {
            this.myCannon = new o;
            this.myCannon.add((new w(this.myPack.getTexture("gfx/cannon"))).setAnchor(57.5, 184));
            this.myNextBubbleIcon1 = (new o).add((new w(null)).setXY(0, 0)).add(new Sa);
            this.myNextBubbleIcon2 = (new o).add((new w(null)).setXY(0, 70).setScale(0.5)).add(new Sa);
            this.HideSprite1();
            this.HideSprite2();
            this.owner.addChild(this.myNextBubbleIcon2);
            this.owner.addChild(this.myCannon);
            this.owner.addChild(this.myNextBubbleIcon1)
        },
        FilterBubbleQueue: function(a) {
            1 <= this.myBubbleQueue.length && !a.exists(this.myBubbleQueue[0]) && (this.myBubbleQueue.shift(), this.myEnqueuedAnimationType = K.PushForward);
            2 <= this.myBubbleQueue.length && !a.exists(this.myBubbleQueue[1]) && (this.myBubbleQueue.splice(1, 1), this.myEnqueuedAnimationType = this.myEnqueuedAnimationType == K.PushForward ? K.ReplaceBoth :
                K.Replace2)
        },
        PopFromBubbleQueue: function() {
            this.myBubbleQueue.shift();
            null == this.myEnqueuedAnimationType && (this.myEnqueuedAnimationType = K.PushForward, this.HideSprite1())
        },
        ClearBubbleQueue: function() {
            for (; 0 < this.myBubbleQueue.length;) this.myBubbleQueue.shift();
            this.myEnqueuedAnimationType = K.ReplaceBoth
        },
        PushBubbleQueue: function(a) {
            J.Assert(null != a);
            if (2 == this.myBubbleQueue.length) return !0;
            null == this.myEnqueuedAnimationType && (this.myEnqueuedAnimationType = 0 == this.myBubbleQueue.length ? K.ReplaceBoth : K.PushForward);
            this.myBubbleQueue.push(a);
            return 2 == this.myBubbleQueue.length ? !0 : !1
        },
        SetAimDir: function(a, b) {
            this.myCannon._compMap.Sprite_12.rotation.set__(180 * (Math.atan2(b, a) + 0.5 * Math.PI) / Math.PI)
        },
        GetNextBubbleType: function() {
            return this.myBubbleQueue[0]
        },
        UpdateAnimation: function() {
            var a = this;
            null == this.myEnqueuedAnimationType || this.myIsAnimating || (this.myEnqueuedAnimationType == K.Replace2 ? (this.UpdateSprite2(), this.AnimBubble2IntoPlace(this.myNextBubbleIcon2), this.myIsAnimating = !1, this.myEnqueuedAnimationType =
                null) : this.myEnqueuedAnimationType == K.PushForward ? (this.myIsAnimating = !0, this.UpdateSprite1(), this.AnimBubble1IntoPlace(this.myNextBubbleIcon1, function() {
                a.myIsAnimating = !1
            }), this.UpdateSprite2(), this.AnimBubble2IntoPlace(this.myNextBubbleIcon2), this.myEnqueuedAnimationType = null) : this.myEnqueuedAnimationType == K.ReplaceBoth && (this.myIsAnimating = !0, this.UpdateSprite1(), this.UpdateSprite2(), this.AnimBubble1IntoPlaceFrom3(this.myNextBubbleIcon1, function() {
                    a.myIsAnimating = !1
                }), this.AnimBubble2IntoPlace(this.myNextBubbleIcon2),
                this.myEnqueuedAnimationType = null))
        },
        IsAnimating: function() {
            return null != this.myEnqueuedAnimationType || this.myIsAnimating
        },
        UpdateSprite1: function() {
            this.myNextBubbleIcon1._compMap.Sprite_12.set_visible(!0);
            r.instance(this.myNextBubbleIcon1._compMap.Sprite_12, w).texture = T.GetTextureForType(this.myPack, this.myBubbleQueue[0]);
            r.instance(this.myNextBubbleIcon1._compMap.Sprite_12, w).centerAnchor()
        },
        UpdateSprite2: function() {
            this.myNextBubbleIcon2._compMap.Sprite_12.set_visible(!0);
            r.instance(this.myNextBubbleIcon2._compMap.Sprite_12,
                w).texture = T.GetTextureForType(this.myPack, this.myBubbleQueue[1]);
            r.instance(this.myNextBubbleIcon2._compMap.Sprite_12, w).centerAnchor()
        },
        HideSprite1: function() {
            this.myNextBubbleIcon1._compMap.Sprite_12.set_visible(!1)
        },
        HideSprite2: function() {
            this.myNextBubbleIcon2._compMap.Sprite_12.set_visible(!1)
        },
        AnimBubble1IntoPlace: function(a, b) {
            a._compMap.Animator_10.Play("", new na([new ra(r.instance(a._compMap.Sprite_12, w).y, 70, 0, 0.3, t.expoInOut), new na([new ra(r.instance(a._compMap.Sprite_12, w).scaleX, 0.5,
                1, 0.2, t.expoInOut), new ra(r.instance(a._compMap.Sprite_12, w).scaleY, 0.5, 1, 0.2, t.expoInOut)])]), function() {
                a._compMap.Animator_10.Play("", oa.CreateWobbleSpriteAnim(r.instance(a._compMap.Sprite_12, w), 1.3, 0.2, 1));
                b()
            })
        },
        AnimBubble1IntoPlaceFrom3: function(a, b) {
            a._compMap.Animator_10.Play("", new na([new ra(r.instance(a._compMap.Sprite_12, w).y, 140, 0, 0.5, t.expoInOut), new na([new ra(r.instance(a._compMap.Sprite_12, w).scaleX, 0.4, 1, 0.2, t.expoInOut), new ra(r.instance(a._compMap.Sprite_12, w).scaleY, 0.4, 1, 0.2,
                t.expoInOut)])]), function() {
                a._compMap.Animator_10.Play("", oa.CreateWobbleSpriteAnim(r.instance(a._compMap.Sprite_12, w), 1.3, 0.2, 1));
                b()
            })
        },
        AnimBubble2IntoPlace: function(a, b) {
            a._compMap.Sprite_12.setScale(0.5);
            a._compMap.Animator_10.Play("", new ra(a._compMap.Sprite_12.y, 120, 70, 0.5, t.expoInOut), b)
        },
        StartShootAnim: function() {
            var a = 18 * Math.cos(Math.PI / 180 * (this.myCannon._compMap.Sprite_12.rotation._value + 90)),
                b = 18 * Math.sin(Math.PI / 180 * (this.myCannon._compMap.Sprite_12.rotation._value + 90)),
                c = new Aa,
                a =
                new qa([new Ra([new qa([new fa(this.myCannon._compMap.Sprite_12.x, a, 0.06, t.bounceOut), new fa(this.myCannon._compMap.Sprite_12.x, -a, 0.06, t.bounceIn), new fa(this.myCannon._compMap.Sprite_12.x, -0.15 * a, 0.06, t.bounceOut), new fa(this.myCannon._compMap.Sprite_12.x, 0.15 * a, 0.06, t.bounceIn)]), new qa([new fa(this.myCannon._compMap.Sprite_12.y, b, 0.06, t.bounceOut), new fa(this.myCannon._compMap.Sprite_12.y, -b, 0.06, t.bounceIn), new fa(this.myCannon._compMap.Sprite_12.y, -0.15 * b, 0.06, t.bounceOut), new fa(this.myCannon._compMap.Sprite_12.y,
                    0.15 * b, 0.06, t.bounceIn)])]), new Ja(q(c, c.dispose))]);
            c.run(a);
            null == this.myCannon._compMap.Script_11 && this.myCannon.add(c)
        },
        dispose: function() {
            this.mySpotTheOrange.dispose();
            g.prototype.dispose.call(this)
        },
        __class__: Va
    });
    var Ic = function(a) {
        this.myDisposeHandler = a
    };
    e["game.ConcurrencyToken"] = Ic;
    Ic.__name__ = ["game", "ConcurrencyToken"];
    Ic.prototype = {
        Dispose: function() {
            null != this.myDisposeHandler && this.myDisposeHandler();
            this.myDisposeHandler = null
        },
        __class__: Ic
    };
    var Tb = function() {
        this.myCount = 0
    };
    e["game.ConcurrencyCounter"] =
        Tb;
    Tb.__name__ = ["game", "ConcurrencyCounter"];
    Tb.prototype = {
        CreateToken: function() {
            this.myCount += 1;
            return new Ic(q(this, this.DecrementCount))
        },
        GetCount: function() {
            return this.myCount
        },
        DecrementCount: function() {
            this.myCount -= 1
        },
        __class__: Tb
    };
    var Wb = function(a, b, c) {
        this.myFullActivationEnabled = !1;
        this.myMaxAlpha = 0.6;
        this.myMinAlpha = 0.1;
        g.call(this);
        this.myPack = a;
        this.myBubbleManager = c;
        this.myRoot = (new o).add((new w(a.getTexture("gfx/deathline"))).setXY(b, c.GetDeathLineYPos() + 15).centerAnchor().setAlpha(this.myMinAlpha))
    };
    e["game.DeathLineWidget"] = Wb;
    Wb.__name__ = ["game", "DeathLineWidget"];
    Wb.__super__ = g;
    Wb.prototype = s(g.prototype, {
        get_name: function() {
            return "DeathLineWidget_6"
        },
        onAdded: function() {
            this.owner.addChild(this.myRoot)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        onUpdate: function() {
            var a;
            a = this.myBubbleManager.GetLineCount();
            a = 6 > a ? 0 : (a - 6) / (this.myBubbleManager.GetMaxLineCount() - 6);
            this.myFullActivationEnabled && (a = 1);
            var b = this.myMinAlpha + a * (this.myMaxAlpha - this.myMinAlpha);
            0.9 <
                a && (b = 0.6 + 0.4 * Math.sin(6 * xa.stamp()));
            r.instance(this.myRoot._compMap.Sprite_12, w).setAlpha(b)
        },
        SetFullActivation: function(a) {
            this.myFullActivationEnabled = a
        },
        __class__: Wb
    });
    var Jc = function() {};
    e["game.Fonts"] = Jc;
    Jc.__name__ = ["game", "Fonts"];
    Jc.prototype = {
        __class__: Jc
    };
    var Xb = function(a, b, c, d, f, e, h) {
        g.call(this);
        this.myTryAgainFunc = e;
        this.myBg = new w(a.getTexture("gfx/menu_overlay"));
        this.myBg.centerAnchor().setXY(c, d);
        this.myBg.alpha.animate(0, 1, 0.4, t.expoIn);
        this.myRoot = (new o).add(this.myBg);
        this.myRoot.addChild((new o).add((new da(b.Normal,
            h.GetI("GAME_OVER", f))).setAlign(Q.Center).setXY(this.myBg.getNaturalWidth() / 2, 15)));
        this.myRoot.addChild(ga.CreateImageBtn(a, "gfx/button_play_small", this.myBg.getNaturalWidth() / 2, 345, q(this, this.TryAgain), !0))
    };
    e["game.GameOverWidget"] = Xb;
    Xb.__name__ = ["game", "GameOverWidget"];
    Xb.__super__ = g;
    Xb.prototype = s(g.prototype, {
        get_name: function() {
            return "GameOverWidget_5"
        },
        onAdded: function() {
            this.owner.addChild(this.myRoot)
        },
        onRemoved: function() {
            this.myRoot.parent.removeChild(this.myRoot)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        TryAgain: function() {
            0.9 > this.myBg.alpha._value || (this.dispose(), this.myTryAgainFunc())
        },
        __class__: Xb
    });
    var Xc = function() {};
    e["game.GameSceneEntity"] = Xc;
    Xc.__name__ = ["game", "GameSceneEntity"];
    Xc.CreateGameScene = function(a, b, c, d, f) {
        return (new o).add(new v).add(new x(a, b, c, d, f))
    };
    var x = function(a, b, c, d, f) {
        this.myScoreManager = new Kc;
        this.myInputEnabled = !1;
        g.call(this);
        this.myPack = a;
        this.myLocalization = b;
        this.myFonts = c;
        this.mySoundEnabled = d;
        this.myReturnToMenuFunc = f;
        this.myLevel =
            1
    };
    e["game.GameSceneController"] = x;
    x.__name__ = ["game", "GameSceneController"];
    x.__super__ = g;
    x.prototype = s(g.prototype, {
        get_name: function() {
            return "GameSceneController_4"
        },
        onStart: function() {
            var a = new w(this.myPack.getTexture("gfx/bg"));
            this.myBackgroundEnt = new o;
            this.myBackgroundEnt.add(a);
            var b = (new o).add((new ab(0, 50, a.getNaturalHeight())).setXY(-50, 0).setAlpha(-0.01)),
                a = (new o).add((new ab(0, 50, a.getNaturalHeight())).setXY(a.getNaturalWidth(), 0).setAlpha(-0.01));
            this.owner.addChild(this.myBackgroundEnt);
            this.owner.addChild(b);
            this.owner.addChild(a);
            this.myScoreFloaterFactory = new Lc(this.myFonts);
            this.myBonusFloaterFactory = new Hc(this.myFonts);
            this.owner.add(new T(this.myPack, null));
            this.myBubbleManager = new I(this.owner, q(this, this.StartVerticalScreenShake), this.myScoreManager, q(this, this.onMiss), this.owner._compMap.BubbleFactory_1);
            this.owner.add(new Yb(this.myPack, 20, 1062));
            this.owner.add(new Zb(this.myScoreManager, this.myFonts, x.TargetWidth - 20, 4, this.myLocalization));
            this.myDeathLineWidget = new Wb(this.myPack,
                x.TargetWidth / 2, this.myBubbleManager);
            this.owner.add(this.myDeathLineWidget);
            this.myScoreManager.OnScoreIncrement.connect(q(this, this.OnScoreMsg));
            this.myOrangeCounterText = new da(this.myFonts.Normal, this.myLocalization.GetI("ORANGES", 0));
            this.myOrangeCounterText.setXY(20, 4);
            this.myOrangeCounterText.set_align(Q.Left);
            this.owner.addChild((new o).add(this.myOrangeCounterText));
            this.myCannon = Va.CreateCannon(x.TargetWidth / 2, x.TargetHeight - 100, this.myPack);
            this.owner.addChild(this.myCannon);
            this.owner._compMap.Sprite_12.get_pointerDown().connect(q(this,
                this.onPointerDown));
            this.owner._compMap.Sprite_12.get_pointerUp().connect(q(this, this.onPointerUp));
            this.owner._compMap.Sprite_12.get_pointerMove().connect(q(this, this.onPointerMoved));
            this.myPauseButton = ga.CreateImageBtn(this.myPack, "gfx/button_pause", x.TargetWidth - 65, x.TargetHeight - 65, q(this, this.OnPauseButtonClicked), !1);
            this.owner.addChild(this.myPauseButton);
            this.InitFirstLevelOrTutorial()
        },
        OnPauseButtonClicked: function() {
            null == this.owner._compMap.PauseMenuWidget_20 ? this.myInputEnabled && this.owner.add(new $b(this.myPack,
                this.myFonts, this.myLocalization, this.myReturnToMenuFunc, this.mySoundEnabled)) : this.owner._compMap.PauseMenuWidget_20.dispose()
        },
        InitFirstLevelOrTutorial: function() {
            this.myExtraOrangeCount = 0;
            this.myLevel = !1 == l._platform.getStorage().get("tutorialCompleted", !1) ? 0 : 1;
            this.LoadLevel(this.myLevel)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            null
        },
        SetTutorialCompleted: function() {
            l._platform.getStorage().set("tutorialCompleted", !0)
        },
        OnScoreMsg: function(a) {
            null == a.bonusTag ? this.owner.addChild(this.myScoreFloaterFactory.Create(a.score,
                a.x, a.y)) : this.owner.addChild(this.myBonusFloaterFactory.Create("" + a.score, a.x, a.y))
        },
        StartVerticalScreenShake: function() {},
        NewGame: function() {
            this.myGameOverWidget = null;
            this.myScoreManager.Reset();
            this.InitFirstLevelOrTutorial();
            this.myOrangeCounterText.set_text(this.myLocalization.GetI("ORANGES", 0))
        },
        LoadLevel: function(a) {
            this.myBubbleManager.Clear();
            this.myRegrowthInterval = this.myRegrowthMaxInterval = 6;
            var b = this.myColorCount = 3,
                c = 0,
                d = !1;
            (function() {
                var b = 0 > a;
                return !1 != b ? b : 9 < a
            })(this) ? (this.myRegrowthInterval =
                this.myRegrowthMaxInterval = 4, b = 8, this.myColorCount = 5, c = 6, d = !0) : function() {
                var b = 0 > a;
                return !1 != b ? b : 7 < a
            }(this) ? (this.myRegrowthInterval = this.myRegrowthMaxInterval = 4, b = 7, this.myColorCount = 5, c = 4, d = !0) : function() {
                var b = 0 > a;
                return !1 != b ? b : 5 < a
            }(this) ? (this.myRegrowthInterval = this.myRegrowthMaxInterval = 4, b = 6, this.myColorCount = 5, c = 1, d = !0) : function() {
                var b = 0 > a;
                return !1 != b ? b : 3 < a
            }(this) ? (this.myColorCount = b = this.myRegrowthInterval = this.myRegrowthMaxInterval = 5, d = !0) : function() {
                var b = 0 > a;
                return !1 != b ? b : 1 < a
            }(this) &&
            (b = this.myRegrowthInterval = this.myRegrowthMaxInterval = 5, this.myColorCount = 4);
            this.myCannon._compMap.CannonController_18.ClearBubbleQueue();
            0 == (0 > a ? 4294967296 + a : a + 0) ? (this.myBubbleManager.InitLevelWithData(["22   111", "2     o"]), this.myCannon._compMap.CannonController_18.PushBubbleQueue(m.RED), this.myCannon._compMap.CannonController_18.PushBubbleQueue(m.BLUE), b = [new kb(x.TargetWidth / 2, x.TargetHeight / 2, this.myLocalization.Get("T1")), new kb(x.TargetWidth / 2 - 30, x.TargetHeight / 2 + 20, this.myLocalization.Get("T2"),
                new ac(633, 283, -75)), new kb(x.TargetWidth / 2 + 65, x.TargetHeight / 2, this.myLocalization.Get("T3"), new ac(87, 727, 155), function(a, b) {
                return function() {
                    return a(b)
                }
            }((ba = this.myDeathLineWidget, q(ba, ba.SetFullActivation)), !0), function(a, b) {
                return function() {
                    return a(b)
                }
            }((ba = this.myDeathLineWidget, q(ba, ba.SetFullActivation)), !1))], this.myTutorialWidget = Yc.Create(this.myPack, this.myFonts, b, q(this, this.OnTutorialWidgetClose)), this.owner.addChild(this.myTutorialWidget)) : this.myBubbleManager.InitLevel(b, this.myColorCount,
                c, d);
            this.myRegrowthCounter = this.myRegrowthMaxInterval;
            this.owner._compMap.RegrowthCounterWidget_8.SetCounterValue(this.myRegrowthCounter, this.myRegrowthMaxInterval)
        },
        OnTutorialWidgetClose: function() {
            this.myTutorialWidget = null
        },
        onPointerDown: function(a) {
            a._stopped = !0;
            if (this.myInputEnabled) {
                var b = this.owner._compMap.Sprite_12,
                    c = a.viewX,
                    a = a.viewY,
                    d = new ca;
                b.getViewMatrix().inverseTransform(c, a, d);
                c = d.x;
                a = d.y;
                b = a - this.myCannon._compMap.Sprite_12.y._value; - 0.4 < b || this.myCannon._compMap.CannonController_18.SetAimDir(c -
                    this.myCannon._compMap.Sprite_12.x._value, b)
            }
        },
        onPointerMoved: function(a) {
            a._stopped = !0;
            if (this.myInputEnabled) {
                var b = this.owner._compMap.Sprite_12,
                    c = a.viewX,
                    a = a.viewY,
                    d = new ca;
                b.getViewMatrix().inverseTransform(c, a, d);
                c = d.x;
                a = d.y;
                b = a - this.myCannon._compMap.Sprite_12.y._value; - 0.4 < b || this.myCannon._compMap.CannonController_18.SetAimDir(c - this.myCannon._compMap.Sprite_12.x._value, b)
            }
        },
        onPointerUp: function(a) {
            a._stopped = !0;
            if (this.myInputEnabled) {
                var b = this.owner._compMap.BubbleFactory_1.Spawn(this.myCannon._compMap.CannonController_18.GetNextBubbleType());
                b._compMap.Sprite_12.x.set__(this.myCannon._compMap.Sprite_12.x._value);
                b._compMap.Sprite_12.y.set__(this.myCannon._compMap.Sprite_12.y._value);
                var c = this.owner._compMap.Sprite_12,
                    d = a.viewX,
                    a = a.viewY,
                    f = new ca;
                c.getViewMatrix().inverseTransform(d, a, f);
                d = f.x;
                a = f.y;
                c = d - this.myCannon._compMap.Sprite_12.x._value;
                d = a - this.myCannon._compMap.Sprite_12.y._value; - 0.4 < d || (this.myCannon._compMap.CannonController_18.SetAimDir(c, d), this.myCannon._compMap.CannonController_18.PopFromBubbleQueue(), this.myCannon._compMap.CannonController_18.StartShootAnim(),
                    this.updateBubbleQueue(), c = this.myBubbleManager.GetPathForBubbleShot(new ca(this.myCannon._compMap.Sprite_12.x._value, this.myCannon._compMap.Sprite_12.y._value), new ca(c, d)), this.myBubbleManager.RegisterActive(b, c))
            }
        },
        onMiss: function() {
            this.myRegrowthCounter--;
            this.owner._compMap.RegrowthCounterWidget_8.SetCounterValue(this.myRegrowthCounter, this.myRegrowthMaxInterval)
        },
        onUpdate: function() {
            var a = this;
            this.myInputEnabled = !1;
            var b = this.myBubbleManager.Update();
            !this.myBubbleManager.IsAnimating() && b ==
                N.LevelCompleted && (0 == this.myLevel && (this.SetTutorialCompleted(), this.myExtraOrangeCount = 1), null == this.owner._compMap.NextLevelMenuWidget_21 && (this.myLevel++, this.myOrangeCounterText.set_text(this.myLocalization.GetI("ORANGES", this.myLevel - 1 + this.myExtraOrangeCount)), this.owner.add(new bc(this.myPack, this.myFonts, x.TargetWidth / 2, x.TargetHeight / 2, function() {
                        a.LoadLevel(a.myLevel);
                        a.myScoreManager.ResetMultiplier();
                        a.owner._compMap.RegrowthCounterWidget_8.SetCounterValue(a.myRegrowthCounter, a.myRegrowthMaxInterval)
                    },
                    this.myLocalization))));
            b != N.LevelCompleted && b != N.LevelLost && (this.updateBubbleQueue(), this.myCannon._compMap.CannonController_18.UpdateAnimation());
            !this.myBubbleManager.IsAnimating() && null == this.owner._compMap.NextLevelMenuWidget_21 && null == this.myTutorialWidget && null == this.owner._compMap.PauseMenuWidget_20 && (b == N.LevelLost ? null == this.myGameOverWidget && (b = this.myPack.getSound("sfx/game_over", !1), null != b && 0 < b.get_duration() && b.play(), this.myGameOverWidget = new Xb(this.myPack, this.myFonts, x.TargetWidth /
                    2, x.TargetHeight / 2, this.myScoreManager.myScore, q(this, this.NewGame), this.myLocalization), this.owner.add(this.myGameOverWidget)) : 0 >= this.myRegrowthCounter ? (this.myRegrowthInterval -= 1, 0 >= this.myRegrowthInterval && (this.myRegrowthInterval = this.myRegrowthMaxInterval), this.myRegrowthCounter = this.myRegrowthInterval, this.owner._compMap.RegrowthCounterWidget_8.SetCounterValue(this.myRegrowthCounter, this.myRegrowthMaxInterval), this.myBubbleManager.SpawnRegrowth()) : this.myCannon._compMap.CannonController_18.IsAnimating() ||
                (this.myInputEnabled = !0))
        },
        updateBubbleQueue: function() {
            var a = this.myBubbleManager.GetAvailableBubbleTypes(),
                b = wa.array(a),
                c = b.length;
            this.myCannon._compMap.CannonController_18.FilterBubbleQueue(a);
            if (0 < c)
                for (; !1 == this.myCannon._compMap.CannonController_18.PushBubbleQueue(b[r.random(c)]););
        },
        __class__: x
    });
    var Mc = function(a, b) {
        var c = a.getFile("loc/loc.json"),
            d;
        try {
            d = JSON.parse(c.toString())
        } catch (f) {
            return
        }
        c = A.field(d, b);
        d = A.fields(c);
        this.myLocalizationTable = new S;
        for (var e = 0; e < d.length;) {
            var g = d[e];
            ++e;
            var h = A.field(c, g);
            this.myLocalizationTable.set(g, h);
            h
        }
    };
    e["game.Localization"] = Mc;
    Mc.__name__ = ["game", "Localization"];
    Mc.prototype = {
        Get: function(a) {
            if (null == this.myLocalizationTable) throw "Localization table not loaded";
            if (!this.myLocalizationTable.exists(a)) throw "Localization key missing: " + a;
            return this.myLocalizationTable.get(a)
        },
        GetI: function(a, b) {
            var c = this.Get(a),
                d = c.indexOf("__i__");
            return -1 == d ? c : y.substr(c, 0, d) + b + y.substr(c, d + 5, null)
        },
        __class__: Mc
    };
    var j = function() {};
    e["game.Main"] = j;
    j.__name__ = ["game", "Main"];
    j.main = function() {
        l.init();
        lb.Init();
        var a = Y.fromAssets("preloader");
        l._platform.loadAssetPack(a).get(j.onSuccess);
        l.root.add(new v).add((new Jb).setSize(x.TargetWidth, x.TargetHeight));
        l._platform.getStage().resize.connect(j.onResize);
        l._platform.getStage().get_fullscreenSupported() && l._platform.getStage().requestFullscreen();
        l._platform.getStage().lockOrientation(ja.Portrait);
        l._platform.getStage().orientation.watch(j.OnOrientationChange);
        j.onResize()
    };
    j.OnOrientationChange =
        function(a) {
            a == ja.Landscape && null;
            j.ShowRotateDeviceImageIfNeeded()
        };
    j.ShowRotateDeviceImageIfNeeded = function() {
        if (null != j.myBootstrapAssets) {
            if (null == l._platform.getStage().orientation._value || l._platform.getStage().orientation._value == ja.Portrait) {
                if (null != j.myRotateDeviceScene) {
                    j.myRotateDeviceScene = null;
                    l.root._compMap.Director_13.popScene();
                    j.onResize();
                    j.RefreshScissor();
                    return
                }
            } else null == j.myRotateDeviceScene && (j.myRotateDeviceScene = Zc.Create(j.myBootstrapAssets), l.root._compMap.Director_13.pushScene(j.myRotateDeviceScene),
                j.RefreshScissor());
            j.onResize()
        }
    };
    j.onSuccess = function(a) {
        l.root.add(new cc(a.getTexture("bg")));
        j.myPreloader = (new o).add(new dc(a, j.OnPreloaderCompleted));
        j.ShowScene(j.myPreloader, !1)
    };
    j.OnPreloaderCompleted = function(a) {
        var b = new Qb(a);
        b.addAtlas("gfx/bubble_types", "gfx/bubble_black,gfx/bubble_blue,gfx/bubble_green,gfx/bubble_purple,gfx/bubble_red,gfx/bubble_yellow,gfx/orange".split(","));
        b.addAtlas("gfx/bubble_icons", ["gfx/bubble_icon", "gfx/bubble_icon_crossed"]);
        b.addAtlas("gfx/buttons", "gfx/button_back,gfx/button_gamepad,gfx/button_home,gfx/button_play_small,gfx/button_sound_off,gfx/button_sound_on".split(","));
        j.myBootstrapAssets = b;
        j.mySoundEnabled = new X(l._platform.getStorage().get("soundEnabled", !0));
        j.mySoundEnabled.get_changed().connect(j.SoundEnabledChanged);
        j.InternalSetSoundEnabled(j.mySoundEnabled._value);
        j.myLocalization = new Mc(a, "en");
        j.myFonts = new Jc;
        j.myFonts.Normal = new Fa(a, "fonts/ubuntu");
        j.myFonts.Small = new Fa(a, "fonts/ubuntu_small");
        j.LoadMainMenu();
        j.ShowRotateDeviceImageIfNeeded()
    };
    j.InternalSetSoundEnabled = function(a) {
        l.volume.set__(a ? 1 : 0)
    };
    j.SoundEnabledChanged = function(a) {
        l._platform.getStorage().set("soundEnabled",
            a);
        j.InternalSetSoundEnabled(a);
        j.StartBgMusicIfNeeded()
    };
    j.ShowScene = function(a, b) {
        var c = new Kb(0.7, t.circInOut);
        c.up();
        b && c.down();
        l.root._compMap.Director_13.unwindToScene(a, c);
        j.RefreshScissor(null != a._compMap.GameSceneController_4)
    };
    j.StartBgMusicIfNeeded = function() {
        if (null == j.myBgMusicPlayback) {
            var a = j.myBootstrapAssets.getSound("sfx/happy_uplifting_piano", !1);
            null != a && 0 < a.get_duration() && (j.myBgMusicPlayback = a.loop(0.5))
        }
    };
    j.OnMainMenuAction = function(a) {
        if (a == sa.Start) {
            j.StartBgMusicIfNeeded();
            var b = Xc.CreateGameScene(j.myBootstrapAssets, j.myLocalization, j.myFonts, j.mySoundEnabled, j.LoadMainMenu);
            j.ShowScene(b, !1)
        }
        a == sa.MoreGames && l._platform.getWeb().openBrowser("https://codecanyon.net/user/darkmitra/portfolio")
    };
    j.LoadMainMenu = function() {
        var a = (new o).add(new ec(j.myBootstrapAssets, j.myFonts, j.OnMainMenuAction, j.mySoundEnabled)).add(new v);
        j.ShowScene(a, !j.firstMainMenuLoad);
        j.firstMainMenuLoad = !1
    };
    j.onResize = function() {
        var a = x.TargetWidth,
            b = x.TargetHeight;
        null != j.myRotateDeviceScene && l.root._compMap.Director_13.get_topScene() ==
            j.myRotateDeviceScene && (b = x.TargetWidth, a = x.TargetHeight, null);
        var c = Qa.min(l._platform.getStage().get_width() / a, l._platform.getStage().get_height() / b);
        l.root._compMap.Sprite_12.setScale(c).setXY((l._platform.getStage().get_width() - a * c) / 2, (l._platform.getStage().get_height() - b * c) / 2);
        a = l.root._compMap.ResponsiveBackground_22;
        null != a && a.Refresh()
    };
    j.RefreshScissor = function() {
        null != j.myRotateDeviceScene && l.root._compMap.Director_13.get_topScene()
    };
    var sa = e["game.MainMenuAction"] = {
        __ename__: ["game", "MainMenuAction"],
        __constructs__: ["Start", "MoreGames"]
    };
    sa.Start = ["Start", 0];
    sa.Start.toString = k;
    sa.Start.__enum__ = sa;
    sa.MoreGames = ["MoreGames", 1];
    sa.MoreGames.toString = k;
    sa.MoreGames.__enum__ = sa;
    var ec = function(a, b, c, d) {
        g.call(this);
        this.myPack = a;
        this.myActionCallback = c;
        this.myRoot = (new o).add(new v);
        this.myBg = (new o).add(new w(this.myPack.getTexture("gfx/mainmenu")));
        this.myRoot.addChild(this.myBg);
        this.myRoot.addChild(ga.CreateImageBtn(a, "gfx/button_play", x.TargetWidth / 2, x.TargetHeight / 2 + 100, function(a, b) {
            return function() {
                return a(b)
            }
        }(c,
            sa.Start), !0));
        this.myRoot.addChild(ga.CreateImageBtn(a, "gfx/button_gamepad", 100, x.TargetHeight - 100, function(a, b) {
            return function() {
                return a(b)
            }
        }(c, sa.MoreGames), !1));
        lb.isSupported && this.myRoot.addChild(ga.CreateToggleBtn(a, "gfx/button_sound_on", "gfx/button_sound_off", x.TargetWidth - 100, x.TargetHeight - 100, d))
    };
    e["game.MainMenuWidget"] = ec;
    ec.__name__ = ["game", "MainMenuWidget"];
    ec.__super__ = g;
    ec.prototype = s(g.prototype, {
        get_name: function() {
            return "MainMenuWidget_0"
        },
        onAdded: function() {
            this.owner.addChild(this.myRoot)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        __class__: ec
    });
    var bc = function(a, b, c, d, f, e) {
        g.call(this);
        this.myLoadNextLevelFunc = f;
        this.myBg = new w(a.getTexture("gfx/menu_overlay"));
        this.myBg.centerAnchor().setXY(c, d);
        this.myBg.alpha.animate(0, 1, 0.3, t.expoIn);
        this.myRoot = (new o).add(this.myBg);
        this.myRoot.addChild((new o).add((new da(b.Normal, e.Get("LEVEL_COMPLETED"))).setAlign(Q.Center).setWrapWidth(this.myBg.getNaturalWidth() - 24).setXY(12, 50)));
        this.myRoot.addChild(ga.CreateImageBtn(a,
            "gfx/button_play_small", this.myBg.getNaturalWidth() / 2, this.myBg.getNaturalHeight() - 130, q(this, this.LoadNext), !0))
    };
    e["game.NextLevelMenuWidget"] = bc;
    bc.__name__ = ["game", "NextLevelMenuWidget"];
    bc.__super__ = g;
    bc.prototype = s(g.prototype, {
        get_name: function() {
            return "NextLevelMenuWidget_21"
        },
        onAdded: function() {
            this.owner.addChild(this.myRoot)
        },
        onRemoved: function() {
            this.myRoot.parent.removeChild(this.myRoot)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        LoadNext: function() {
            0.9 >
                this.myBg.alpha._value || (this.dispose(), this.myLoadNextLevelFunc())
        },
        __class__: bc
    });
    var $b = function(a, b, c, d, f) {
        g.call(this);
        this.myEndGameFunc = d;
        this.myBg = new w(a.getTexture("gfx/menu_pause"));
        this.myBg.centerAnchor().setXY(x.TargetWidth / 2, x.TargetHeight / 2);
        this.myBg.alpha.animate(0, 1, 0.3, t.expoIn);
        this.myRoot = (new o).add(this.myBg);
        lb.isSupported && this.myRoot.addChild(ga.CreateToggleBtn(a, "gfx/button_sound_on", "gfx/button_sound_off", this.myBg.getNaturalWidth() / 2 + 177, this.myBg.getNaturalHeight() /
            2, f));
        this.myRoot.addChild(ga.CreateImageBtn(a, "gfx/button_home", this.myBg.getNaturalWidth() / 2, this.myBg.getNaturalHeight() / 2, q(this, this.HomeClicked), !1));
        this.myRoot.addChild(ga.CreateImageBtn(a, "gfx/button_back", this.myBg.getNaturalWidth() / 2 - 147 - 30, this.myBg.getNaturalHeight() / 2, q(this, this.BackClicked), !1))
    };
    e["game.PauseMenuWidget"] = $b;
    $b.__name__ = ["game", "PauseMenuWidget"];
    $b.__super__ = g;
    $b.prototype = s(g.prototype, {
        get_name: function() {
            return "PauseMenuWidget_20"
        },
        onAdded: function() {
            this.owner.addChild(this.myRoot)
        },
        onRemoved: function() {
            this.myRoot.parent.removeChild(this.myRoot)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        HomeClicked: function() {
            this.myEndGameFunc();
            this.dispose()
        },
        BackClicked: function() {
            this.dispose()
        },
        __class__: $b
    });
    var dc = function(a, b) {
        this.myFakeSlowDownload = !1;
        g.call(this);
        this.myPreloaderPack = a;
        this.myLoadCompletedCallback = b;
        !0 == this.myFakeSlowDownload ? this.StartFakeDownload() : this.StartRealDownload()
    };
    e["game.PreloaderWidget"] = dc;
    dc.__name__ = ["game", "PreloaderWidget"];
    dc.__super__ = g;
    dc.prototype = s(g.prototype, {
        get_name: function() {
            return "PreloaderWidget_23"
        },
        StartRealDownload: function() {
            this.myLoader = l.loadAssetPack(Y.fromAssets("bootstrap"));
            this.myLoader.progressChanged.connect(q(this, this.OnProgressChanged));
            this.myLoader.success.connect(q(this, this.OnLoadCompleted))
        },
        StartFakeDownload: function() {
            this.myLoader = new cb;
            this.myLoader.set_total(4E3);
            xa.delay(function(a, b) {
                return function() {
                    return a(b)
                }
            }(q(this, this.ContinueFakeDownload), 1), 20);
            this.myLoader.progressChanged.connect(q(this,
                this.OnProgressChanged));
            this.myLoader.success.connect(q(this, this.OnLoadCompleted))
        },
        ContinueFakeDownload: function(a) {
            var b = this;
            this.myLoader.set_progress(a / 30 * this.myLoader._total);
            30 == a ? l.loadAssetPack(Y.fromAssets("bootstrap")).success.connect(function(a) {
                b.myLoader.set_result(a)
            }) : xa.delay(function(a, b) {
                return function() {
                    return a(b)
                }
            }(q(this, this.ContinueFakeDownload), a + 1), 20)
        },
        onAdded: function() {
            this.myRoot = new o;
            this.myRoot.add(new w(this.myPreloaderPack.getTexture("preloaderbg")));
            this.myProgressBar =
                (new o).add((new w(this.myPreloaderPack.getTexture("progress").subTexture(0, 0, 1, 64))).setXY(86, 724));
            this.myRoot.addChild(this.myProgressBar);
            this.owner.addChild(this.myRoot);
            this.OnProgressChanged()
        },
        onRemoved: function() {
            this.owner.removeChild(this.myRoot)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        OnProgressChanged: function() {
            if (null != this.myProgressBar) {
                var a = this.myPreloaderPack.getTexture("progress"),
                    b = Math.max(1, this.myLoader._progress / this.myLoader._total * a.get_width());
                r.instance(this.myProgressBar._compMap.Sprite_12, w).texture = a.subTexture(0, 0, Math.floor(Math.min(b, a.get_width())), a.get_height())
            }
        },
        OnLoadCompleted: function(a) {
            this.myLoadCompletedCallback(a)
        },
        __class__: dc
    });
    var Yb = function(a, b, c) {
        this.myCrossedIcons = [];
        this.myIcons = [];
        this.IconXSpacing = 32;
        this.IconScale = 1;
        g.call(this);
        this.myPack = a;
        this.myRoot = (new o).add((new v).setXY(b, c))
    };
    e["game.RegrowthCounterWidget"] = Yb;
    Yb.__name__ = ["game", "RegrowthCounterWidget"];
    Yb.__super__ = g;
    Yb.prototype = s(g.prototype, {
        get_name: function() {
            return "RegrowthCounterWidget_8"
        },
        onAdded: function() {
            this.owner.addChild(this.myRoot)
        },
        onRemoved: function() {
            this.myRoot.parent.removeChild(this.myRoot)
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        createBubbleIcon: function(a, b) {
            return (new o).add((new w(this.myPack.getTexture("gfx/bubble_icon"))).setXY(a, b).setScale(this.IconScale))
        },
        createCrossedBubbleIcon: function(a, b) {
            return (new o).add((new w(this.myPack.getTexture("gfx/bubble_icon_crossed"))).setXY(a,
                b).setScale(this.IconScale))
        },
        SetCounterValue: function(a, b) {
            for (; this.myIcons.length < b;) {
                var c = this.myIcons.length * this.IconXSpacing,
                    d = this.createBubbleIcon(c, 0);
                this.myRoot.addChild(d);
                this.myIcons.push(d);
                c = this.createCrossedBubbleIcon(c, 0);
                this.myRoot.addChild(c);
                this.myCrossedIcons.push(c)
            }
            c = this.myIcons.length;
            for (d = 0; d < c;) {
                var f = d++;
                f < a - 1 ? (this.myCrossedIcons[f]._compMap.Sprite_12.set_visible(!1), this.myIcons[f]._compMap.Sprite_12.set_visible(!0)) : (f < b - 1 ? this.myCrossedIcons[f]._compMap.Sprite_12.set_visible(!0) :
                    this.myCrossedIcons[f]._compMap.Sprite_12.set_visible(!1), this.myIcons[f]._compMap.Sprite_12.set_visible(!1))
            }
        },
        __class__: Yb
    });
    var cc = function(a) {
        g.call(this);
        this.mySprite1 = new bb(a);
        this.mySprite1.disablePointer();
        this.mySprite2 = new bb(a);
        this.mySprite2.disablePointer();
        this.myRoot = new o;
        this.myRoot.addChild((new o).add(this.mySprite1));
        this.myRoot.addChild((new o).add(this.mySprite2))
    };
    e["game.ResponsiveBackground"] = cc;
    cc.__name__ = ["game", "ResponsiveBackground"];
    cc.__super__ = g;
    cc.prototype = s(g.prototype, {
        get_name: function() {
            return "ResponsiveBackground_22"
        },
        Refresh: function() {
            var a = this.owner._compMap.Sprite_12,
                b = a.x._value / a.scaleX._value + 1,
                c = a.y._value / a.scaleY._value;
            b > c ? (this.mySprite1.x.set__(-a.x._value / a.scaleX._value), this.mySprite1.y.set__(-a.y._value / a.scaleY._value), this.mySprite1.width.set__(b), this.mySprite1.height.set__(l._platform.getStage().get_height() / a.scaleY._value), this.mySprite2.x.set__((l._platform.getStage().get_width() - a.x._value) / a.scaleX._value - b), this.mySprite2.y.set__(a.y._value /
                a.scaleY._value), this.mySprite2.width.set__(b), this.mySprite2.height.set__(l._platform.getStage().get_height() / a.scaleY._value)) : (this.mySprite1.x.set__(-a.x._value / a.scaleX._value), this.mySprite1.y.set__(-a.y._value / a.scaleY._value), this.mySprite1.width.set__(l._platform.getStage().get_width() / a.scaleX._value), this.mySprite1.height.set__(c), this.mySprite2.x.set__(-a.x._value / a.scaleX._value), this.mySprite2.y.set__((l._platform.getStage().get_height() - a.y._value) / a.scaleY._value - c), this.mySprite2.width.set__(l._platform.getStage().get_width() /
                a.scaleX._value), this.mySprite2.height.set__(c))
        },
        onAdded: function() {
            g.prototype.onAdded.call(this);
            this.owner.addChild(this.myRoot, !1);
            this.Refresh()
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        __class__: cc
    });
    var Zc = function() {};
    e["game.RotateDeviceScene"] = Zc;
    Zc.__name__ = ["game", "RotateDeviceScene"];
    Zc.Create = function(a) {
        return (new o).addChild((new o).add((new w(a.getTexture("gfx/rotate_device"))).centerAnchor().setXY(x.TargetHeight / 2, x.TargetWidth / 2)))
    };
    var Lc = function(a) {
        this.myFont =
            a.Small
    };
    e["game.ScoreFloaterFactory"] = Lc;
    Lc.__name__ = ["game", "ScoreFloaterFactory"];
    Lc.prototype = {
        Create: function(a, b, c) {
            var d = new o,
                a = (new da(this.myFont, "" + a)).setXY(b, c);
            d.add(a);
            b = new Aa;
            d.add(b);
            b.run(new qa([new Ra([new fa(a.y, -40, 2.5, t.backOut), new ma(a.alpha, 0, 2.5, t.backOut)]), new Ja(q(d, d.dispose))]));
            return d
        },
        __class__: Lc
    };
    var Z = e["game.MultiplierConfig"] = {
        __ename__: ["game", "MultiplierConfig"],
        __constructs__: ["Enabled", "Disabled"]
    };
    Z.Enabled = ["Enabled", 0];
    Z.Enabled.toString = k;
    Z.Enabled.__enum__ =
        Z;
    Z.Disabled = ["Disabled", 1];
    Z.Disabled.toString = k;
    Z.Disabled.__enum__ = Z;
    var Nc = function(a, b, c, d, f) {
        this.score = a;
        this.currentMultiplier = b;
        this.x = c;
        this.y = d;
        this.bonusTag = f
    };
    e["game.ScoreIncrementMsg"] = Nc;
    Nc.__name__ = ["game", "ScoreIncrementMsg"];
    Nc.prototype = {
        __class__: Nc
    };
    var Kc = function() {
        this.OnScoreUpdated = new B;
        this.OnScoreIncrement = new B;
        this.MultiplierMax = 21;
        this.Reset()
    };
    e["game.ScoreManager"] = Kc;
    Kc.__name__ = ["game", "ScoreManager"];
    Kc.prototype = {
        Reset: function() {
            this.myScore = 0;
            this.OnScoreUpdated.emit(this.myScore);
            this.ResetMultiplier()
        },
        IncrementMultiplier: function() {
            this.myMultiplier >= this.MultiplierMax || (this.myMultiplier += 1)
        },
        ResetMultiplier: function() {
            this.myMultiplier = 1
        },
        AddScore: function(a, b, c, d, f) {
            a = b == Z.Enabled ? a * this.myMultiplier : a;
            this.myScore += a;
            this.OnScoreIncrement.emit(new Nc(a, this.myMultiplier, c, d, f));
            this.OnScoreUpdated.emit(this.myScore)
        },
        __class__: Kc
    };
    var Zb = function(a, b, c, d, f) {
        this.myLastDisplayedScore = 0;
        g.call(this);
        this.myLocalization = f;
        this.myDisplayEntity = (new o).add((new da(b.Normal,
            this.myLocalization.GetI("SCORE", 0))).setXY(c, d));
        this.myScoreAnimator = new E(0);
        this.SetAnchorTopRight();
        a.OnScoreUpdated.connect(q(this, this.OnScoreUpdated))
    };
    e["game.ScoreWidget"] = Zb;
    Zb.__name__ = ["game", "ScoreWidget"];
    Zb.__super__ = g;
    Zb.prototype = s(g.prototype, {
        get_name: function() {
            return "ScoreWidget_7"
        },
        onStart: function() {
            this.owner.addChild(this.myDisplayEntity)
        },
        onRemoved: function() {
            this.owner.addChild(this.myDisplayEntity)
        },
        onUpdate: function(a) {
            g.prototype.onUpdate.call(this, a);
            this.myScoreAnimator.update(a);
            a = Math.round(this.myScoreAnimator._value);
            this.myLastDisplayedScore != a && (this.myLastDisplayedScore = a, r.instance(this.myDisplayEntity._compMap.Sprite_12, da).set_text(this.myLocalization.GetI("SCORE", a)), this.SetAnchorTopRight())
        },
        SetAnchorTopRight: function() {
            var a = r.instance(this.myDisplayEntity._compMap.Sprite_12, da);
            a.setAnchor(a.getNaturalWidth(), 0)
        },
        OnScoreUpdated: function(a) {
            0 == a ? this.myScoreAnimator.set__(0) : this.myScoreAnimator.animateTo(a, 0.4, t.expoInOut)
        },
        __class__: Zb
    });
    var Sb = function(a) {
        this.myParticles = [];
        this.mySpawnTimer = 0;
        this.myEnabled = !1;
        this.mySpawnScale = 1;
        this.mySpawnInterval = 0.15;
        this.myMaxParticles = 10;
        this.myParticleTtl = 0.3;
        this.mySpawnX = this.mySpawnY = this.myVelX = this.myVelY = 0;
        g.call(this);
        this.myRoot = new o;
        a.addChild(this.myRoot)
    };
    e["game.SimpleParticleEffect"] = Sb;
    Sb.__name__ = ["game", "SimpleParticleEffect"];
    Sb.__super__ = g;
    Sb.prototype = s(g.prototype, {
        get_name: function() {
            return "SimpleParticleEffect_3"
        },
        Start: function() {
            this.myEnabled = !0
        },
        onUpdate: function(a) {
            if (this.myParticles.length < this.myMaxParticles) {
                var b =
                    new Oc;
                b.ttl = -1;
                var c = new o;
                b.sprite = new w(this.myTexture);
                b.sprite.set_visible(!1);
                b.sprite.centerAnchor();
                c.add(b.sprite);
                this.myRoot.addChild(c);
                this.myParticles.push(b)
            }
            b = 0;
            for (c = this.myParticles; b < c.length;) {
                var d = c[b];
                ++b;
                if (!(0 > d.ttl)) {
                    var f = d.sprite;
                    d.ttl -= a;
                    if (0 > d.ttl) f.set_visible(!1);
                    else {
                        f.alpha.set__(d.ttl / d.initialTtl);
                        var e = f.x;
                        e.set__(e._value + d.velX * a);
                        f = f.y;
                        f.set__(f._value + d.velY * a)
                    }
                }
            }
            this.myEnabled && (this.mySpawnTimer -= a, 0 > this.mySpawnTimer && (this.mySpawnTimer = this.mySpawnInterval,
                this.EmittOne()))
        },
        EmittOne: function() {
            for (var a = 0, b = this.myParticles; a < b.length;) {
                var c = b[a];
                ++a;
                if (0 > c.ttl) {
                    c.sprite.set_visible(!0);
                    c.sprite.alpha.set__(1);
                    c.sprite.setScale(this.mySpawnScale);
                    c.sprite.x.set__(this.mySpawnX);
                    c.sprite.y.set__(this.mySpawnY);
                    c.ttl = c.initialTtl = this.myParticleTtl;
                    c.velX = this.myVelX;
                    c.velY = this.myVelY;
                    break
                }
            }
        },
        dispose: function() {
            g.prototype.dispose.call(this);
            this.myRoot.dispose()
        },
        __class__: Sb
    });
    var Oc = function() {
        this.velX = this.velY = this.ttl = this.initialTtl = 0
    };
    e["game.Particle"] =
        Oc;
    Oc.__name__ = ["game", "Particle"];
    Oc.prototype = {
        __class__: Oc
    };
    var lb = function() {};
    e["game.SoundSupport"] = lb;
    lb.__name__ = ["game", "SoundSupport"];
    lb.Init = function() {
        lb.isSupported = z.get_supported()
    };
    var Yc = function() {};
    e["game.TutorialWidget"] = Yc;
    Yc.__name__ = ["game", "TutorialWidget"];
    Yc.Create = function(a, b, c, d) {
        return (new o).add(new fc(a, b, c, d))
    };
    var ac = function(a, b, c) {
        this.x = a;
        this.y = b;
        this.rot = c
    };
    e["game.PointerDetails"] = ac;
    ac.__name__ = ["game", "PointerDetails"];
    ac.prototype = {
        __class__: ac
    };
    var kb =
        function(a, b, c, d, f, e) {
            this.x = a;
            this.y = b;
            this.text = c;
            this.pointer = d;
            this.enterCb = f;
            this.leaveCb = e
        };
    e["game.TutorialStep"] = kb;
    kb.__name__ = ["game", "TutorialStep"];
    kb.prototype = {
        __class__: kb
    };
    var fc = function(a, b, c, d) {
        this.myCurrentStep = 0;
        g.call(this);
        this.myAssets = a;
        this.mySteps = c;
        this.myCompletionHandler = d;
        this.myFonts = b
    };
    e["game.TutorialController"] = fc;
    fc.__name__ = ["game", "TutorialController"];
    fc.__super__ = g;
    fc.prototype = s(g.prototype, {
        get_name: function() {
            return "TutorialController_9"
        },
        onAdded: function() {
            this.LoadStep(this.mySteps[this.myCurrentStep])
        },
        LoadStep: function(a) {
            this.owner.disposeChildren();
            var b = new w(this.myAssets.getTexture("gfx/menu_overlay"));
            b.centerAnchor();
            b.setXY(a.x, a.y);
            var c = new da(this.myFonts.Normal, a.text);
            c.setWrapWidth(b.getNaturalWidth() - 10);
            c.setAlign(Q.Center);
            c.setXY(5, (b.getNaturalHeight() - 150) / 2 - c.getNaturalHeight() / 2);
            this.owner.addChild((new o).add(b).addChild((new o).add(c)).addChild(ga.CreateImageBtn(this.myAssets, "gfx/button_play_small", b.getNaturalWidth() / 2, b.getNaturalHeight() - 90, q(this, this.OnContinuePressed), !0)));
            null != a.pointer && (b = (new w(this.myAssets.getTexture("gfx/arrow"))).setXY(a.pointer.x, a.pointer.y).setRotation(a.pointer.rot - 1.5).centerAnchor(), c = (new o).add(b).add(new Aa), c._compMap.Script_11.run(new Mb(new qa([new ma(b.rotation, a.pointer.rot + 3, 0.8, t.sineInOut), new ma(b.rotation, a.pointer.rot - 3, 0.8, t.sineInOut)]))), this.owner.addChild(c));
            null != a.enterCb && a.enterCb()
        },
        OnContinuePressed: function() {
            null != this.mySteps[this.myCurrentStep].leaveCb && this.mySteps[this.myCurrentStep].leaveCb();
            this.myCurrentStep +=
                1;
            this.myCurrentStep == this.mySteps.length ? (this.myCompletionHandler(), this.owner.dispose()) : this.LoadStep(this.mySteps[this.myCurrentStep])
        },
        __class__: fc
    });
    var ua = function() {
        this.buf = new pb;
        this.cache = [];
        this.useCache = ua.USE_CACHE;
        this.useEnumIndex = ua.USE_ENUM_INDEX;
        this.shash = new S;
        this.scount = 0
    };
    e["haxe.Serializer"] = ua;
    ua.__name__ = ["haxe", "Serializer"];
    ua.prototype = {
        toString: function() {
            return this.buf.b
        },
        serializeString: function(a) {
            var b = this.shash.get(a);
            null != b ? (this.buf.b += "R", this.buf.b = null ==
                b ? this.buf.b + "null" : this.buf.b + ("" + b)) : (this.shash.set(a, this.scount++), this.buf.b += "y", a = encodeURIComponent(a), this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length), this.buf.b += ":", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a))
        },
        serializeRef: function(a) {
            for (var b = typeof a, c = 0, d = this.cache.length; c < d;) {
                var f = c++,
                    e = this.cache[f];
                if (typeof e == b && e == a) return this.buf.b += "r", this.buf.b = null == f ? this.buf.b + "null" : this.buf.b + ("" + f), !0
            }
            this.cache.push(a);
            return !1
        },
        serializeFields: function(a) {
            for (var b =
                    0, c = A.fields(a); b < c.length;) {
                var d = c[b];
                ++b;
                this.serializeString(d);
                this.serialize(A.field(a, d))
            }
            this.buf.b += "g"
        },
        serialize: function(a) {
            var b = L["typeof"](a);
            switch (b[1]) {
                case 0:
                    this.buf.b += "n";
                    break;
                case 1:
                    if (0 == a) {
                        this.buf.b += "z";
                        break
                    }
                    this.buf.b += "i";
                    this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a);
                    break;
                case 2:
                    Math.isNaN(a) ? this.buf.b += "k" : Math.isFinite(a) ? (this.buf.b += "d", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a)) : this.buf.b = 0 > a ? this.buf.b + "m" : this.buf.b + "p";
                    break;
                case 3:
                    this.buf.b =
                        a ? this.buf.b + "t" : this.buf.b + "f";
                    break;
                case 6:
                    b = b[2];
                    if (b == String) {
                        this.serializeString(a);
                        break
                    }
                    if (this.useCache && this.serializeRef(a)) break;
                    switch (b) {
                        case Array:
                            b = 0;
                            this.buf.b += "a";
                            for (var c = a.length, d = 0; d < c;) {
                                var f = d++;
                                null == a[f] ? b++ : (0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)), b = 0), this.serialize(a[f]))
                            }
                            0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)));
                            this.buf.b += "h";
                            break;
                        case nb:
                            this.buf.b +=
                                "l";
                            for (a = a.iterator(); a.hasNext();) this.serialize(a.next());
                            this.buf.b += "h";
                            break;
                        case Date:
                            this.buf.b += "v";
                            this.buf.add(y.dateStr(a));
                            break;
                        case S:
                            this.buf.b += "b";
                            for (b = a.keys(); b.hasNext();) c = b.next(), this.serializeString(c), this.serialize(a.get(c));
                            this.buf.b += "h";
                            break;
                        case ia:
                            this.buf.b += "q";
                            for (b = a.keys(); b.hasNext();) c = b.next(), this.buf.b += ":", this.buf.b = null == c ? this.buf.b + "null" : this.buf.b + ("" + c), this.serialize(a.get(c));
                            this.buf.b += "h";
                            break;
                        case ta:
                            this.buf.b += "M";
                            for (b = a.keys(); b.hasNext();) c =
                                b.next(), d = A.field(c, "__id__"), A.deleteField(c, "__id__"), this.serialize(c), c.__id__ = d, this.serialize(a.h[c.__id__]);
                            this.buf.b += "h";
                            break;
                        case Wa:
                            d = 0;
                            f = a.length - 2;
                            b = new pb;
                            for (c = ua.BASE64; d < f;) {
                                var e = a.get(d++),
                                    g = a.get(d++),
                                    h = a.get(d++);
                                b.add(c.charAt(e >> 2));
                                b.add(c.charAt((e << 4 | g >> 4) & 63));
                                b.add(c.charAt((g << 2 | h >> 6) & 63));
                                b.add(c.charAt(h & 63))
                            }
                            d == f ? (f = a.get(d++), a = a.get(d++), b.add(c.charAt(f >> 2)), b.add(c.charAt((f << 4 | a >> 4) & 63)), b.add(c.charAt(a << 2 & 63))) : d == f + 1 && (a = a.get(d++), b.add(c.charAt(a >> 2)),
                                b.add(c.charAt(a << 4 & 63)));
                            a = b.b;
                            this.buf.b += "s";
                            this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length);
                            this.buf.b += ":";
                            this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a);
                            break;
                        default:
                            this.useCache && this.cache.pop(), null != a.hxSerialize ? (this.buf.b += "C", this.serializeString(L.getClassName(b)), this.useCache && this.cache.push(a), a.hxSerialize(this), this.buf.b += "g") : (this.buf.b += "c", this.serializeString(L.getClassName(b)), this.useCache && this.cache.push(a), this.serializeFields(a))
                    }
                    break;
                case 4:
                    if (this.useCache && this.serializeRef(a)) break;
                    this.buf.b += "o";
                    this.serializeFields(a);
                    break;
                case 7:
                    b = b[2];
                    if (this.useCache) {
                        if (this.serializeRef(a)) break;
                        this.cache.pop()
                    }
                    this.buf.b = this.useEnumIndex ? this.buf.b + "j" : this.buf.b + "w";
                    this.serializeString(L.getEnumName(b));
                    this.useEnumIndex ? (this.buf.b += ":", this.buf.b += r.string(a[1])) : this.serializeString(a[0]);
                    this.buf.b += ":";
                    b = a.length;
                    this.buf.b += r.string(b - 2);
                    for (c = 2; c < b;) d = c++, this.serialize(a[d]);
                    this.useCache && this.cache.push(a);
                    break;
                case 5:
                    throw "Cannot serialize function";
                default:
                    throw "Cannot serialize " + r.string(a);
            }
        },
        __class__: ua
    };
    var V = function(a) {
        this.buf = a;
        this.length = a.length;
        this.pos = 0;
        this.scache = [];
        this.cache = [];
        a = V.DEFAULT_RESOLVER;
        null == a && (a = L, V.DEFAULT_RESOLVER = a);
        this.setResolver(a)
    };
    e["haxe.Unserializer"] = V;
    V.__name__ = ["haxe", "Unserializer"];
    V.initCodes = function() {
        for (var a = [], b = 0, c = V.BASE64.length; b < c;) {
            var d = b++;
            a[V.BASE64.charCodeAt(d)] = d
        }
        return a
    };
    V.run = function(a) {
        return (new V(a)).unserialize()
    };
    V.prototype = {
        setResolver: function(a) {
            this.resolver =
                null == a ? {
                    resolveClass: function() {
                        return null
                    },
                    resolveEnum: function() {
                        return null
                    }
                } : a
        },
        get: function(a) {
            return this.buf.charCodeAt(a)
        },
        readDigits: function() {
            for (var a = 0, b = !1, c = this.pos;;) {
                var d = this.buf.charCodeAt(this.pos);
                if (d != d) break;
                if (45 == d) {
                    if (this.pos != c) break;
                    b = !0
                } else {
                    if (48 > d || 57 < d) break;
                    a = 10 * a + (d - 48)
                }
                this.pos++
            }
            b && (a *= -1);
            return a
        },
        unserializeObject: function(a) {
            for (;;) {
                if (this.pos >= this.length) throw "Invalid object";
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var b = this.unserialize();
                if ("string" !=
                    typeof b) throw "Invalid object key";
                var c = this.unserialize();
                a[b] = c
            }
            this.pos++
        },
        unserializeEnum: function(a, b) {
            if (58 != this.get(this.pos++)) throw "Invalid enum format";
            var c = this.readDigits();
            if (0 == c) return L.createEnum(a, b);
            for (var d = []; 0 < c--;) d.push(this.unserialize());
            return L.createEnum(a, b, d)
        },
        unserialize: function() {
            switch (this.get(this.pos++)) {
                case 110:
                    return null;
                case 116:
                    return !0;
                case 102:
                    return !1;
                case 122:
                    return 0;
                case 105:
                    return this.readDigits();
                case 100:
                    for (var a = this.pos;;) {
                        var b = this.buf.charCodeAt(this.pos);
                        if (43 <= b && 58 > b || 101 == b || 69 == b) this.pos++;
                        else break
                    }
                    return r.parseFloat(y.substr(this.buf, a, this.pos - a));
                case 121:
                    a = this.readDigits();
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw "Invalid string length";
                    b = y.substr(this.buf, this.pos, a);
                    this.pos += a;
                    b = decodeURIComponent(b.split("+").join(" "));
                    this.scache.push(b);
                    return b;
                case 107:
                    return Math.NaN;
                case 109:
                    return Math.NEGATIVE_INFINITY;
                case 112:
                    return Math.POSITIVE_INFINITY;
                case 97:
                    a = [];
                    for (this.cache.push(a);;) {
                        b = this.buf.charCodeAt(this.pos);
                        if (104 == b) {
                            this.pos++;
                            break
                        }
                        117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] = null) : a.push(this.unserialize())
                    }
                    return a;
                case 111:
                    return a = {}, this.cache.push(a), this.unserializeObject(a), a;
                case 114:
                    a = this.readDigits();
                    if (0 > a || a >= this.cache.length) throw "Invalid reference";
                    return this.cache[a];
                case 82:
                    a = this.readDigits();
                    if (0 > a || a >= this.scache.length) throw "Invalid string reference";
                    return this.scache[a];
                case 120:
                    throw this.unserialize();
                case 99:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw "Class not found " + a;
                    a = L.createEmptyInstance(b);
                    this.cache.push(a);
                    this.unserializeObject(a);
                    return a;
                case 119:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw "Enum not found " + a;
                    a = this.unserializeEnum(b, this.unserialize());
                    this.cache.push(a);
                    return a;
                case 106:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw "Enum not found " + a;
                    this.pos++;
                    var c = this.readDigits(),
                        d = L.getEnumConstructs(b)[c];
                    if (null == d) throw "Unknown enum index " + a + "@" + c;
                    a = this.unserializeEnum(b,
                        d);
                    this.cache.push(a);
                    return a;
                case 108:
                    a = new nb;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) a.add(this.unserialize());
                    this.pos++;
                    return a;
                case 98:
                    a = new S;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 113:
                    a = new ia;
                    this.cache.push(a);
                    for (b = this.get(this.pos++); 58 == b;) b = this.readDigits(), a.set(b, this.unserialize()), b = this.get(this.pos++);
                    if (104 != b) throw "Invalid IntMap format";
                    return a;
                case 77:
                    a = new ta;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 118:
                    return a = y.substr(this.buf, this.pos, 19), a = y.strDate(a), this.cache.push(a), this.pos += 19, a;
                case 115:
                    a = this.readDigits();
                    d = this.buf;
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw "Invalid bytes length";
                    var f = V.CODES;
                    null == f && (f = V.initCodes(), V.CODES = f);
                    for (var e = this.pos, g = a & 3, h = e + (a - g), b = Wa.alloc(3 * (a >> 2) + (2 <= g ? g - 1 : 0)), c = 0; e < h;) {
                        var j = f[ha.fastCodeAt(d, e++)],
                            k = f[ha.fastCodeAt(d, e++)];
                        b.set(c++, j << 2 | k >> 4);
                        j = f[ha.fastCodeAt(d, e++)];
                        b.set(c++, k << 4 | j >> 2);
                        k = f[ha.fastCodeAt(d, e++)];
                        b.set(c++, j << 6 | k)
                    }
                    2 <= g && (k = f[ha.fastCodeAt(d, e++)], h = f[ha.fastCodeAt(d, e++)], b.set(c++, k << 2 | h >> 4), 3 == g && (d = f[ha.fastCodeAt(d, e++)], b.set(c++, h << 4 | d >> 2)));
                    this.pos += a;
                    this.cache.push(b);
                    return b;
                case 67:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw "Class not found " + a;
                    a = L.createEmptyInstance(b);
                    this.cache.push(a);
                    a.hxUnserialize(this);
                    if (103 != this.get(this.pos++)) throw "Invalid custom data";
                    return a
            }
            this.pos--;
            throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
        },
        __class__: V
    };
    var gc = function() {};
    e["haxe.ds.BalancedTree"] = gc;
    gc.__name__ = ["haxe", "ds", "BalancedTree"];
    gc.prototype = {
        set: function(a, b) {
            this.root = this.setLoop(a, b, this.root)
        },
        get: function(a) {
            for (var b = this.root; null != b;) {
                var c = this.compare(a, b.key);
                if (0 == c) return b.value;
                b = 0 > c ? b.left : b.right
            }
            return null
        },
        setLoop: function(a, b, c) {
            if (null == c) return new W(null, a, b, null);
            var d = this.compare(a, c.key);
            if (0 == d) return new W(c.left,
                a, b, c.right, null == c ? 0 : c._height);
            if (0 > d) return this.balance(this.setLoop(a, b, c.left), c.key, c.value, c.right);
            a = this.setLoop(a, b, c.right);
            return this.balance(c.left, c.key, c.value, a)
        },
        balance: function(a, b, c, d) {
            var f;
            f = null == a ? 0 : a._height;
            var e;
            e = null == d ? 0 : d._height;
            return f > e + 2 ? function() {
                var b = a.left;
                return null == b ? 0 : b._height
            }(this) >= function() {
                var b = a.right;
                return null == b ? 0 : b._height
            }(this) ? new W(a.left, a.key, a.value, new W(a.right, b, c, d)) : new W(new W(a.left, a.key, a.value, a.right.left), a.right.key,
                a.right.value, new W(a.right.right, b, c, d)) : e > f + 2 ? function() {
                var a = d.right;
                return null == a ? 0 : a._height
            }(this) > function() {
                var a = d.left;
                return null == a ? 0 : a._height
            }(this) ? new W(new W(a, b, c, d.left), d.key, d.value, d.right) : new W(new W(a, b, c, d.left.left), d.left.key, d.left.value, new W(d.left.right, d.key, d.value, d.right)) : new W(a, b, c, d, (f > e ? f : e) + 1)
        },
        compare: function(a, b) {
            return A.compare(a, b)
        },
        __class__: gc
    };
    var W = function(a, b, c, d, f) {
        null == f && (f = -1);
        this.left = a;
        this.key = b;
        this.value = c;
        this.right = d;
        this._height = -1 == f ? (function(a) {
            a = a.left;
            return null == a ? 0 : a._height
        }(this) > function(a) {
            a = a.right;
            return null == a ? 0 : a._height
        }(this) ? function(a) {
            a = a.left;
            return null == a ? 0 : a._height
        }(this) : function(a) {
            a = a.right;
            return null == a ? 0 : a._height
        }(this)) + 1 : f
    };
    e["haxe.ds.TreeNode"] = W;
    W.__name__ = ["haxe", "ds", "TreeNode"];
    W.prototype = {
        __class__: W
    };
    var mb = function() {};
    e["haxe.ds.EnumValueMap"] = mb;
    mb.__name__ = ["haxe", "ds", "EnumValueMap"];
    mb.__interfaces__ = [ob];
    mb.__super__ = gc;
    mb.prototype = s(gc.prototype, {
        compare: function(a, b) {
            var c =
                a[1] - b[1];
            if (0 != c) return c;
            var c = a.slice(2),
                d = b.slice(2);
            return 0 == c.length && 0 == d.length ? 0 : this.compareArgs(c, d)
        },
        compareArgs: function(a, b) {
            var c = a.length - b.length;
            if (0 != c) return c;
            for (var c = 0, d = a.length; c < d;) {
                var f = c++,
                    f = this.compareArg(a[f], b[f]);
                if (0 != f) return f
            }
            return 0
        },
        compareArg: function(a, b) {
            return A.isEnumValue(a) && A.isEnumValue(b) ? this.compare(a, b) : a instanceof Array && null == a.__enum__ && b instanceof Array && null == b.__enum__ ? this.compareArgs(a, b) : A.compare(a, b)
        },
        __class__: mb
    });
    var ia = function() {
        this.h = {}
    };
    e["haxe.ds.IntMap"] = ia;
    ia.__name__ = ["haxe", "ds", "IntMap"];
    ia.__interfaces__ = [ob];
    ia.prototype = {
        set: function(a, b) {
            this.h[a] = b
        },
        get: function(a) {
            return this.h[a]
        },
        exists: function(a) {
            return this.h.hasOwnProperty(a)
        },
        remove: function(a) {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b | 0);
            return y.iter(a)
        },
        __class__: ia
    };
    var ta = function() {
        this.h = {};
        this.h.__keys__ = {}
    };
    e["haxe.ds.ObjectMap"] = ta;
    ta.__name__ = ["haxe",
        "ds", "ObjectMap"
    ];
    ta.__interfaces__ = [ob];
    ta.prototype = {
        set: function(a, b) {
            var c = a.__id__ || (a.__id__ = ++ta.count);
            this.h[c] = b;
            this.h.__keys__[c] = a
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h.__keys__) this.h.hasOwnProperty(b) && a.push(this.h.__keys__[b]);
            return y.iter(a)
        },
        __class__: ta
    };
    var S = function() {
        this.h = {}
    };
    e["haxe.ds.StringMap"] = S;
    S.__name__ = ["haxe", "ds", "StringMap"];
    S.__interfaces__ = [ob];
    S.prototype = {
        set: function(a, b) {
            this.h["$" + a] = b
        },
        get: function(a) {
            return this.h["$" + a]
        },
        exists: function(a) {
            return this.h.hasOwnProperty("$" +
                a)
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b.substr(1));
            return y.iter(a)
        },
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext()
                },
                next: function() {
                    return this.ref["$" + this.it.next()]
                }
            }
        },
        __class__: S
    };
    var Wa = function(a, b) {
        this.length = a;
        this.b = b
    };
    e["haxe.io.Bytes"] = Wa;
    Wa.__name__ = ["haxe", "io", "Bytes"];
    Wa.alloc = function(a) {
        for (var b = [], c = 0; c < a;) c++, b.push(0);
        return new Wa(a, b)
    };
    Wa.prototype = {
        get: function(a) {
            return this.b[a]
        },
        set: function(a, b) {
            this.b[a] = b & 255
        },
        __class__: Wa
    };
    var $c = function() {};
    e["haxe.io.Eof"] = $c;
    $c.__name__ = ["haxe", "io", "Eof"];
    $c.prototype = {
        toString: function() {
            return "Eof"
        },
        __class__: $c
    };
    var Tc = function() {};
    e["haxe.rtti.Meta"] = Tc;
    Tc.__name__ = ["haxe", "rtti", "Meta"];
    Tc.getType = function(a) {
        a = a.__meta__;
        return null == a || null == a.obj ? {} : a.obj
    };
    var O = function() {};
    e["js.Boot"] = O;
    O.__name__ = ["js", "Boot"];
    O.getClass = function(a) {
        return a instanceof Array && null == a.__enum__ ? Array : a.__class__
    };
    O.__string_rec = function(a,
        b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var c = typeof a;
        if ("function" == c && (a.__name__ || a.__ename__)) c = "object";
        switch (c) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        for (var c = a[0] + "(", b = b + "\t", d = 2, f = a.length; d < f;) var e = d++,
                            c = 2 != e ? c + ("," + O.__string_rec(a[e], b)) : c + O.__string_rec(a[e], b);
                        return c + ")"
                    }
                    c = a.length;
                    d = "[";
                    b += "\t";
                    for (f = 0; f < c;) e = f++, d += (0 < e ? "," : "") + O.__string_rec(a[e], b);
                    return d + "]"
                }
                try {
                    d = a.toString
                } catch (g) {
                    return "???"
                }
                if (null != d && d != Object.toString &&
                    (c = a.toString(), "[object Object]" != c)) return c;
                c = null;
                d = "{\n";
                b += "\t";
                f = null != a.hasOwnProperty;
                for (c in a)
                    if (!f || a.hasOwnProperty(c)) "prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c || (2 != d.length && (d += ", \n"), d += b + c + " : " + O.__string_rec(a[c], b));
                b = b.substring(1);
                return d + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return "" + a
        }
    };
    O.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var c = a.__interfaces__;
        if (null !=
            c)
            for (var d = 0, e = c.length; d < e;) {
                var g = d++,
                    g = c[g];
                if (g == b || O.__interfLoop(g, b)) return !0
            }
        return O.__interfLoop(a.__super__, b)
    };
    O.__instanceof = function(a, b) {
        if (null == b) return !1;
        switch (b) {
            case fd:
                return (a | 0) === a;
            case cd:
                return "number" == typeof a;
            case dd:
                return "boolean" == typeof a;
            case String:
                return "string" == typeof a;
            case Array:
                return a instanceof Array && null == a.__enum__;
            case gd:
                return !0;
            default:
                if (null != a) {
                    if ("function" == typeof b && (a instanceof b || O.__interfLoop(O.getClass(a), b))) return !0
                } else return !1;
                return b == hd && null != a.__name__ || b == id && null != a.__ename__ ? !0 : a.__enum__ == b
        }
    };
    var Sc = function() {};
    e["js.Browser"] = Sc;
    Sc.__name__ = ["js", "Browser"];
    Sc.getLocalStorage = function() {
        try {
            var a = window.localStorage;
            a.getItem("");
            return a
        } catch (b) {
            return null
        }
    };
    var ba, ed = 0;
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    e.Math = Math;
    Math.isFinite = function(a) {
        return isFinite(a)
    };
    Math.isNaN = function(a) {
        return isNaN(a)
    };
    String.prototype.__class__ =
        e.String = String;
    String.__name__ = ["String"];
    e.Array = Array;
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = e.Date = Date;
    Date.__name__ = ["Date"];
    var fd = e.Int = {
            __name__: ["Int"]
        },
        gd = e.Dynamic = {
            __name__: ["Dynamic"]
        },
        cd = e.Float = Number;
    cd.__name__ = ["Float"];
    var dd = e.Bool = Boolean;
    dd.__ename__ = ["Bool"];
    var hd = e.Class = {
            __name__: ["Class"]
        },
        id = {};
    Ca.instance = new Ca;
    M.DISPATCHING_SENTINEL = new Na(null, null);
    l.root = new o;
    l.uncaughtError = new B;
    l.hidden = new X(!1);
    l.volume = new E(1);
    l._platform = Ca.instance;
    l._calledInit = !1;
    Y.__meta__ = {
        obj: {
            assets: [{
                preloader: [{
                    bytes: 1860,
                    md5: "4324b9aa39932f4be712b73673e499ff",
                    name: "bg.png"
                }, {
                    bytes: 387625,
                    md5: "4e0bbb2039b0673a26f602a712915a7e",
                    name: "preloaderbg.png"
                }, {
                    bytes: 3269,
                    md5: "6293667fcdcdd142254fa78b8835f11f",
                    name: "progress.png"
                }],
                bootstrap: [{
                        bytes: 69811,
                        md5: "7a790422ee9862750f4dd08659224ad6",
                        name: "fonts/ubuntu.fnt"
                    }, {
                        bytes: 36191,
                        md5: "e3a184b72257a06e0b507a97844b0cf9",
                        name: "fonts/ubuntu_0.png"
                    }, {
                        bytes: 35244,
                        md5: "d62fd86b1a22e30741d7303466169d85",
                        name: "fonts/ubuntu_1.png"
                    },
                    {
                        bytes: 41280,
                        md5: "f110be701fdb631e828c582eea1f482a",
                        name: "fonts/ubuntu_2.png"
                    }, {
                        bytes: 32656,
                        md5: "1a05118deac077a49f5a8fbf9ae7c559",
                        name: "fonts/ubuntu_3.png"
                    }, {
                        bytes: 69761,
                        md5: "f2086745885c28753a131a3d19caf637",
                        name: "fonts/ubuntu_small.fnt"
                    }, {
                        bytes: 50229,
                        md5: "e4875eaf9ab16c3508c55e350cb06181",
                        name: "fonts/ubuntu_small_0.png"
                    }, {
                        bytes: 12326,
                        md5: "9ecf71716902f65b2055329f3a8806cb",
                        name: "fonts/ubuntu_small_1.png"
                    }, {
                        bytes: 8682,
                        md5: "c16951e1e381e2063297fd5ed080ffa6",
                        name: "gfx/arrow.png"
                    }, {
                        bytes: 178810,
                        md5: "ac1c50dcf887a6766fda5a5b525d2310",
                        name: "gfx/bg.png"
                    }, {
                        bytes: 4187,
                        md5: "cc2b4afc4a634ac5db3e2f560d9d7de4",
                        name: "gfx/bubble_icons.png"
                    }, {
                        bytes: 43242,
                        md5: "625e376b3adcded01d63338c369b0cd9",
                        name: "gfx/bubble_types.png"
                    }, {
                        bytes: 42310,
                        md5: "0ff500aaa377fa1665c36dee0385da1d",
                        name: "gfx/buttons.png"
                    }, {
                        bytes: 8695,
                        md5: "f574fb08caabafbd8ccca398cfdcf195",
                        name: "gfx/button_pause.png"
                    }, {
                        bytes: 30324,
                        md5: "3a919bfca3d34dc59b8a8151a6d8e0de",
                        name: "gfx/button_play.png"
                    }, {
                        bytes: 8967,
                        md5: "dd4253a0f13a989283d57dc52183b228",
                        name: "gfx/cannon.png"
                    }, {
                        bytes: 193,
                        md5: "80e4dec7ec22b24da5cfdf891d6307ee",
                        name: "gfx/deathline.png"
                    }, {
                        bytes: 387076,
                        md5: "fc509deec70f3e869c76732df69ae544",
                        name: "gfx/mainmenu.png"
                    }, {
                        bytes: 8195,
                        md5: "7f2c43ccc74f9151f5bb917fcff8f5b3",
                        name: "gfx/menu_overlay.png"
                    }, {
                        bytes: 6015,
                        md5: "fc9289d5074caf2f118028481d548006",
                        name: "gfx/menu_pause.png"
                    }, {
                        bytes: 2115,
                        md5: "27852b10cd727a038688b66826b22fff",
                        name: "gfx/particle1.png"
                    }, {
                        bytes: 6962,
                        md5: "b00d1837ed2ac1b66961914cb2afa34e",
                        name: "gfx/pop_circle.png"
                    }, {
                        bytes: 39299,
                        md5: "87114bed0141d25aac149d46febee312",
                        name: "gfx/rotate_device.png"
                    }, {
                        bytes: 373,
                        md5: "682108c381a102897fee4c4adaa1f201",
                        name: "loc/loc.json"
                    }, {
                        bytes: 50730,
                        md5: "fcaab1bc2ceac788dca30b4ded7c98dc",
                        name: "sfx/completed.m4a"
                    }, {
                        bytes: 27794,
                        md5: "21f570f4a3c17da925940a30e8f974f3",
                        name: "sfx/completed.ogg"
                    }, {
                        bytes: 41930,
                        md5: "81d8135ddff398190d313e03b36f65a4",
                        name: "sfx/game_over.m4a"
                    }, {
                        bytes: 20352,
                        md5: "ec9aca8ef5b58eb799987803c169d074",
                        name: "sfx/game_over.ogg"
                    }, {
                        bytes: 253160,
                        md5: "6106dac9d83ca654fc1fe773129e4060",
                        name: "sfx/happy_uplifting_piano.m4a"
                    },
                    {
                        bytes: 430855,
                        md5: "08f6cd6bf156e4fb083e60d11396b116",
                        name: "sfx/happy_uplifting_piano.ogg"
                    }, {
                        bytes: 5404,
                        md5: "6995efc1c2f52bb0d5a3c98c3d32934e",
                        name: "sfx/pop.m4a"
                    }, {
                        bytes: 5450,
                        md5: "159f9c0c14d13d4bcf35834fd9a0378c",
                        name: "sfx/pop.ogg"
                    }, {
                        bytes: 5179,
                        md5: "c1c7d005e6d010641216a0be5cb5481c",
                        name: "sfx/pop2.m4a"
                    }, {
                        bytes: 5565,
                        md5: "78e80dcbc03b9fadec7f25ce071b96a9",
                        name: "sfx/pop2.ogg"
                    }
                ]
            }]
        }
    };
    Y._supportsCrossOrigin = function() {
        var a;
        a = 0 <= window.navigator.userAgent.indexOf("Linux; U; Android") ? !1 : null != (new XMLHttpRequest).withCredentials;
        a || null;
        return a
    }();
    v._scratchPoint = new ca;
    Fa.NEWLINE = new yb(10);
    aa._sharedEvent = new sc;
    P._sharedEvent = new tc;
    Ma.CANVAS_TEXTURES = (new Ba("(iPhone|iPod|iPad)", "")).match(window.navigator.userAgent);
    D._detectBlobSupport = !0;
    p.VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
    p.SHOULD_HIDE_MOBILE_BROWSER = window.top == window && (new Ba("Mobile(/.*)? Safari", "")).match(window.navigator.userAgent);
    z._detectSupport = !0;
    Ta.LEFT_WALL_POS = 0;
    Ta.RIGHT_WALL_POS = 750;
    T.myTextureCache = new mb;
    I.myGridXOffset = 47;
    I.myGridYOffset =
        105;
    I.myBubbleGridXDist = 77;
    I.myBubbleGridYDist = 67;
    x.TargetWidth = 750;
    x.TargetHeight = 1100;
    j.firstMainMenuLoad = !0;
    ua.USE_CACHE = !1;
    ua.USE_ENUM_INDEX = !1;
    ua.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    V.DEFAULT_RESOLVER = L;
    V.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    ta.count = 0;
    j.main()
})();