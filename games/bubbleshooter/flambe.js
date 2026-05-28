/** Cooked with Flambe, https://getflambe.com */
var flambe = {};
flambe.embed = function(d, f) {
    "string" == typeof d && (d = [d + "-html.js"]);
    var g = document.getElementById(f);
    if (null == g) throw Error("Could not find element [id=" + f + "]");
    for (var c = {}, e = window.location.search.substr(1).split("&"), b = 0; b < e.length; ++b) {
        var a = e[b].split("=");
        c[unescape(a[0])] = 1 < a.length ? unescape(a[1]) : null
    }
    e = c.flambe;
    for (b = 0; b < d.length; ++b) switch (c = d[b], (a = c.match(/\.(\w+)(\?|$)/)) && (a = a[1].toLowerCase()), a) {
        case "js":
            if (null == e || "html" == e)
                if (a = document.createElement("canvas"), "getContext" in a) return a.id =
                    f + "-canvas", g.appendChild(a), flambe.canvas = a, b = document.createElement("script"), b.onload = function() {
                        flambe.canvas = null
                    }, b.src = c, g.appendChild(b), !0;
            break;
        default:
            throw Error("Don't know how to embed [url=" + c + "]");
    }
    return !1
};