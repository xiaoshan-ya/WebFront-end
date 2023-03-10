var url = document.location.toString(); // 得到网页的URL
var imgUrl = url.slice(url.indexOf('?') + 1); // 得到问号后的内容,即图片地址

window.onload = function () { // 必须等到页面加载完成后才能getElement，否则得到null

    var imgElement1 = document.getElementById("SVG");
    imgElement1.src = imgUrl;

    var canvas = document.getElementById('Fourier');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = imgUrl;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0);
    }


    if (writeMsgToCanvas("Fourier","201250190 张嵩","1",0) === true) {
        const textarea = document.getElementById("text");
        textarea.value = readMsgFromCanvas("Fourier", "1", 0);
        console.log("success");
    }

}


/* 引入外部js部分 */


/* CryptoStego @ Jeffery / GNU AGPL v3.0 or later */
function t(t, r, n) {
    return [.299 * t + .587 * r + .114 * n, 128 - .168736 * t - .331264 * r + .5 * n, 128 + .5 * t - .418688 * r - .081312 * n]
}

function r(t, r, n) {
    return [t + 1.402 * (n - 128), t - .344136 * (r - 128) - .714136 * (n - 128), t + 1.772 * (r - 128)]
}

function n(t, r) {
    var n, i, e = Array.from(Array(r).keys()), o = [], a = y.SHA512(t).words.reduce(function (t, r) {
        return t + Math.abs(r)
    }, 0), h = new b(a);
    for (i = r; i > 0; i--) n = h.genrand_int32() % i, o.push(e[n]), e[n] = e[i - 1];
    return o
}

function i(t) {
    var r, n, i, e, o, a, h, s = Array(64).fill(0);
    for (e = 0; e < 8; e++) for (o = 0; o < 8; o++) {
        for (r = 0 == e ? 1 / Math.sqrt(2) : 1, n = 0 == o ? 1 / Math.sqrt(2) : 1, i = 0, a = 0; a < 8; a++) for (h = 0; h < 8; h++) i += t[8 * a + h] * Math.cos((2 * a + 1) * e * Math.PI / 16) * Math.cos((2 * h + 1) * o * Math.PI / 16);
        s[8 * e + o] = .25 * r * n * i
    }
    return s
}

function e(t) {
    var r, n, i, e, o;
    for (result = Array(64).fill(0), n = 0; n < 8; n++) for (i = 0; i < 8; i++) {
        for (r = 0, e = 0; e < 8; e++) for (o = 0; o < 8; o++) r += (0 == e ? 1 / Math.sqrt(2) : 1) * (0 == o ? 1 / Math.sqrt(2) : 1) * t[8 * e + o] * Math.cos((2 * n + 1) * e * Math.PI / 16) * Math.cos((2 * i + 1) * o * Math.PI / 16);
        result[8 * n + i] = .25 * r
    }
    return result
}

function o(t) {
    var r,
        n = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
    for (r = 0; r < 64; r++) n[r] *= t;
    return n
}

function a(t, r, n, i) {
    var e, a, h, s, u, f;
    if (r.length != i.length) throw"LOC and ENCODE_BITS have different sizes! This is a bug in code!";
    for (e = o(t), a = Array(64).fill(0), f = 0; f < r.length; f++) h = n[r[f]] / e[r[f]], s = Math.floor(h), Math.abs(s % 2) != i[f] && (s -= 1), u = Math.ceil(h), Math.abs(u % 2) != i[f] && (u += 1), h - s > u - h && (s = u), a[r[f]] = s * e[r[f]] - n[r[f]];
    return a
}

function h(t, r, n) {
    var i, e = o(t), a = [];
    for (i = 0; i < r.length; i++) a.push(Math.abs(Math.round(n[r[i]] / e[r[i]]) % 2));
    return a
}

function s(t) {
    var r, n, i = Array(64);
    for (r = 0; r < 8; r++) for (n = 0; n < 8; n++) i[8 * r + n] = (t[2 * r * 8 + 2 * n] + t[8 * (2 * r + 1) + 2 * n] + t[2 * r * 8 + 2 * n + 1] + t[8 * (2 * r + 1) + 2 * n + 1]) / 4;
    return i
}

function u(t) {
    var r, n, i = Array(256);
    for (r = 0; r < 16; r++) for (n = 0; n < 16; n++) i[16 * r + n] = t[8 * Math.floor(r / 2) + Math.floor(n / 2)];
    return i
}

function f(t) {
    return (t = (t = Math.round(t)) > 255 ? 255 : t) < 0 ? 0 : t
}

function c(t, r, n, i, e) {
    var o, a, h = Array(r * r);
    for (o = 0; o < r; o++) for (a = 0; a < r; a++) h[o * r + a] = t[(n + o) * e + i + a];
    return h
}

function l(t, r, n, i, e, o) {
    var a, h;
    for (a = 0; a < r; a++) for (h = 0; h < r; h++) t[(n + a) * e + i + h] = o[a * r + h]
}

function d(t, r, n, o, h, s) {
    var u, f, d, g, p, m, w = Math.floor(n / 8), y = Math.floor(r / 8), v = s.length;
    if (v * (w * y - 1) != o.length) throw"Image size does not match data size (Y channel)";
    for (f = 0; f < w; f++) for (d = 0; d < y; d++) g = i(c(t, 8, 8 * f, 8 * d, r)), 0 != f || 0 != d ? (p = g.map(function (t, r) {
        return t - u[r]
    }), m = a(h, s, p, o.slice(v * (f * y + d - 1), v * (f * y + d))), l(t, 8, 8 * f, 8 * d, r, e(g = g.map(function (t, r) {
        return t + m[r]
    })))) : u = g
}

function g(t, r, n, o, h, f) {
    var d, g, p, m, w, y, v, M, _, A, S = Math.floor(n / 16), B = Math.floor(r / 16), I = f.length;
    if (I * (S * B - 1) != o.length) throw"Image size does not match data size (CbCr channel)";
    for (g = 0; g < S; g++) for (p = 0; p < B; p++) m = c(t, 16, 16 * g, 16 * p, r), y = i(w = s(m)), 0 != g || 0 != p ? (v = y.map(function (t, r) {
        return t - d[r]
    }), M = a(h, f, v, o.slice(I * (g * B + p - 1), I * (g * B + p))), _ = e(y = y.map(function (t, r) {
        return t + M[r]
    })), A = u(A = _.map(function (t, r) {
        return t - w[r]
    })), l(t, 16, 16 * g, 16 * p, r, m = m.map(function (t, r) {
        return t + A[r]
    }))) : d = y
}

function p(t, r, n, i, e) {
    var o = e ? 16 : 8;
    return [i ? (Math.floor(r / 8) * Math.floor(t / 8) - 1) * n.length : 0, (Math.floor(r / o) * Math.floor(t / o) - 1) * n.length]
}

function writeMsgToCanvas_base(i, e, o, a, h, s, u, c, l) {
    var m, w, y, v, M, _;
    a = void 0 !== a && a, o = void 0 === o ? "" : o, h = void 0 === h ? 5 : h, s = void 0 === s ? 30 : s, u = void 0 === u ? [1, 2, 8, 9, 10, 16, 17] : u, c = void 0 === c || c, l = void 0 === l || l;
    try {
        return y = (w = (m = document.getElementById(i)).getContext("2d")).getImageData(0, 0, m.width, m.height), v = 3 * Math.floor(y.data.length / 4), a && (v = (M = p(m.width, m.height, u, c, l))[0] + 2 * M[1]), _ = function (t, r, i) {
            var e, o, a, h = t.length;
            if (t.length > i) throw"Can not hold this many data!";
            for (e = Array(i), o = 0; o < i; o++) e[o] = Math.floor(2 * Math.random());
            for (a = n(r, i), o = 0; o < h; o++) e[a[o]] = t[o];
            return e
        }(_ = function (t, r) {
            var n, i, o, a = function (t) {
                var r, n, i = [], e = 0;
                for (r = (t = encodeURI(t)).length; e < r;) n = t[e], e += 1, "%" !== n ? i.push(n.charCodeAt(0)) : (n = t[e] + t[e + 1], i.push(parseInt(n, 16)), e += 2);
                return i
            }(e), h = Array(), s = a.length;
            for (n = 0; n < s; n++) for (i = 128; i > 0; i = Math.floor(i / 2)) if (Math.floor(a[n] / i)) {
                for (o = 0; o < r; o++) h.push(1);
                a[n] -= i
            } else for (o = 0; o < r; o++) h.push(0);
            for (i = 0; i < 24; i++) for (n = 0; n < r; n++) h.push(1);
            return h
        }(0, h), o, v), a ? function (n, i, e, o, a, h, s, u) {
            var c, l, m, w, y, v = p(i, e, h, s, u), M = v[0], _ = v[1], A = Array(), S = Array(), B = Array();
            for (c = 0; c < n.data.length; c += 4) l = t(n.data[c], n.data[c + 1], n.data[c + 2]), A.push(l[0]), S.push(l[1]), B.push(l[2]);
            for (s && d(A, i, e, o.slice(0, M), a, h), (m = u ? g : d)(S, i, e, o.slice(M, M + _), a, h), m(B, i, e, o.slice(M + _, M + _ + _), a, h), w = 0, c = 0; c < n.data.length; c += 4) y = r(A[w], S[w], B[w]), n.data[c] = f(y[0]), n.data[c + 1] = f(y[1]), n.data[c + 2] = f(y[2]), w += 1
        }(y, m.width, m.height, _, s, u, c, l) : function (t, r) {
            function n(t) {
                return t % 2 == 1 ? t - 1 : t
            }

            function i(t) {
                return t % 2 == 1 ? t : t + 1
            }

            var e, o = 0;
            for (e = 0; e < t.data.length; e += 4) t.data[e] = r[o] ? i(t.data[e]) : n(t.data[e]), t.data[e + 1] = r[o + 1] ? i(t.data[e + 1]) : n(t.data[e + 1]), t.data[e + 2] = r[o + 2] ? i(t.data[e + 2]) : n(t.data[e + 2]), t.data[e + 3] = 255, o += 3
        }(y, _), w.putImageData(y, 0, 0), !0
    } catch (t) {
        return t
    }
}

function m(t, r, n, e, o) {
    var a, s, u, f, l = Math.floor(n / 8), d = Math.floor(r / 8), g = (o.length, Array());
    for (s = 0; s < l; s++) for (u = 0; u < d; u++) f = i(c(t, 8, 8 * s, 8 * u, r)), 0 != s || 0 != u ? g.push(h(e, o, f.map(function (t, r) {
        return t - a[r]
    }))) : a = f;
    return [].concat.apply([], g)
}

function w(t, r, n, e, o) {
    var a, u, f, l, d = Math.floor(n / 16), g = Math.floor(r / 16), p = (o.length, Array());
    for (u = 0; u < d; u++) for (f = 0; f < g; f++) l = i(s(c(t, 16, 16 * u, 16 * f, r))), 0 != u || 0 != f ? p.push(h(e, o, l.map(function (t, r) {
        return t - a[r]
    }))) : a = l;
    return [].concat.apply([], p)
}

function readMsgFromCanvas_base(r, i, e, o, a, h, s, u) {
    var f, c, l;
    e = void 0 !== e && e, i = void 0 === i ? "" : i, o = void 0 === o ? 5 : o, a = void 0 === a ? 30 : a, h = void 0 === h ? [1, 2, 8, 9, 10, 16, 17] : h, s = void 0 === s || s, u = void 0 === u || u;
    try {
        c = (f = document.getElementById(r)).getContext("2d").getImageData(0, 0, f.width, f.height)
    } catch (t) {
        return [!1, t]
    }
    try {
        return null == (l = function (t, r) {
            function n(t) {
                var r, n = t.length, i = 0;
                for (r = 0; r < n; r++) i += t[r];
                return Math.round(i / n)
            }

            var i, e, o, a, h = Array(), s = Math.floor(Math.floor(t.length / r) / 8);
            for (o = 0; o < s; o++) {
                for (i = 0, e = 128, a = 0; a < 8; a++) i += n(t.slice((8 * o + a) * r, (8 * o + a + 1) * r)) * e, e = Math.floor(e / 2);
                if (255 == i) break;
                h.push(i)
            }
            return function (t) {
                for (var r, n, i, e = [], o = 0, a = t.length; o < a;) r = t[o], n = t[o + 1], i = t[o + 2], 128 > r ? (e.push(String.fromCharCode(r)), o += 1) : 191 < r && r < 224 ? (e.push(String.fromCharCode((31 & r) << 6 | 63 & n)), o += 2) : (e.push(String.fromCharCode((15 & r) << 12 | (63 & n) << 6 | 63 & i)), o += 3);
                return e.join("")
            }(h)
        }(function (t, r) {
            var i, e = t.length, o = Array(e), a = n(r, e);
            for (i = 0; i < e; i++) o[i] = t[a[i]];
            return o
        }(e ? function (r, n, i, e, o, a, h) {
            var s, u, f, c = Array(), l = Array(), d = Array(), g = Array();
            for (s = 0; s < r.data.length; s += 4) u = t(r.data[s], r.data[s + 1], r.data[s + 2]), c.push(u[0]), l.push(u[1]), d.push(u[2]);
            return a && g.push(m(c, n, i, e, o)), f = h ? w : m, g.push(f(l, n, i, e, o)), g.push(f(d, n, i, e, o)), [].concat.apply([], g)
        }(c, f.width, f.height, a, h, s, u) : function (t) {
            var r, n = Array();
            for (r = 0; r < t.data.length; r += 4) n.push(t.data[r] % 2 == 1 ? 1 : 0), n.push(t.data[r + 1] % 2 == 1 ? 1 : 0), n.push(t.data[r + 2] % 2 == 1 ? 1 : 0);
            return n
        }(c), i), o)) ? [!1, "Message does not decrypt. Maybe due to (1) wrong password / enc method. (2) corrupted file"] : [!0, l]
    } catch (t) {
        return [!1, "Message does not decrypt. Maybe due to (1) wrong password / enc method. (2) corrupted file"]
    }
}

function writeMsgToCanvas(t, r, n, i) {
    var e = writeMsgToCanvas_base;
    switch (i = void 0 === i ? 0 : parseInt(i)) {
        case 1:
            return e(t, r, n, !0, 23, 2, [2, 9, 16], !0, !1);
        case 2:
            return e(t, r, n, !0, 17, 3, [1, 8], !0, !1);
        case 3:
            return e(t, r, n, !0, 17, 5, [1, 8], !0, !1);
        case 4:
            return e(t, r, n, !0, 5, 5, [0], !0, !1);
        case 5:
            return e(t, r, n, !0, 5, 6, [0], !0, !0);
        case 0:
        default:
            return e(t, r, n, !1, 1)
    }
}

function readMsgFromCanvas(t, r, n) {
    var i = readMsgFromCanvas_base;
    switch (n = void 0 === n ? 0 : parseInt(n)) {
        case 1:
            return i(t, r, !0, 23, 2, [2, 9, 16], !0, !1)[1];
        case 2:
            return i(t, r, !0, 17, 3, [1, 8], !0, !1)[1];
        case 3:
            return i(t, r, !0, 17, 5, [1, 8], !0, !1)[1];
        case 4:
            return i(t, r, !0, 5, 5, [0], !0, !1)[1];
        case 5:
            return i(t, r, !0, 5, 6, [0], !0, !0)[1];
        case 0:
        default:
            return i(t, r, !1, 1)[1]
    }
}

function loadIMGtoCanvas(t, r, n, i) {
    var e, o, a;
    if (i = void 0 === i ? 0 : i, !(e = document.getElementById(t)).files || !e.files[0]) return alert("NO IMG FILE SELECTED"), "ERROR PROCESSING IMAGE!";
    o = e.files[0], (a = new FileReader).onload = function (t) {
        var e = t.target.result, o = new Image;
        o.onload = function () {
            var t, e = o.width, a = o.height;
            i > 0 && (e > i && (a *= i / e, e = i), a > i && (e *= i / a, a = i), e = Math.floor(e), a = Math.floor(a)), (t = document.createElement("canvas")).id = r, t.width = e, t.height = a, t.style.display = "none", document.getElementsByTagName("body")[0].appendChild(t), t.getContext("2d").drawImage(o, 0, 0, o.width, o.height, 0, 0, e, a), n(), document.body.removeChild(t)
        }, o.src = e
    }, a.readAsDataURL(o)
}

var y, v, M, _, A, S, B, I, C, E, N, R, x, b = function (t) {
    null == t && (t = (new Date).getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(t)
};
b.prototype.init_genrand = function (t) {
    for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) t = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (1812433253 * ((4294901760 & t) >>> 16) << 16) + 1812433253 * (65535 & t) + this.mti, this.mt[this.mti] >>>= 0
}, b.prototype.init_by_array = function (t, r) {
    var n, i, e, o;
    for (this.init_genrand(19650218), n = 1, i = 0, e = this.N > r ? this.N : r; e; e--) o = this.mt[n - 1] ^ this.mt[n - 1] >>> 30, this.mt[n] = (this.mt[n] ^ (1664525 * ((4294901760 & o) >>> 16) << 16) + 1664525 * (65535 & o)) + t[i] + i, this.mt[n] >>>= 0, i++, ++n >= this.N && (this.mt[0] = this.mt[this.N - 1], n = 1), i >= r && (i = 0);
    for (e = this.N - 1; e; e--) o = this.mt[n - 1] ^ this.mt[n - 1] >>> 30, this.mt[n] = (this.mt[n] ^ (1566083941 * ((4294901760 & o) >>> 16) << 16) + 1566083941 * (65535 & o)) - n, this.mt[n] >>>= 0, ++n >= this.N && (this.mt[0] = this.mt[this.N - 1], n = 1);
    this.mt[0] = 2147483648
}, b.prototype.genrand_int32 = function () {
    var t, r, n = new Array(0, this.MATRIX_A);
    if (this.mti >= this.N) {
        for (this.mti == this.N + 1 && this.init_genrand(5489), r = 0; r < this.N - this.M; r++) t = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + this.M] ^ t >>> 1 ^ n[1 & t];
        for (; r < this.N - 1; r++) t = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + (this.M - this.N)] ^ t >>> 1 ^ n[1 & t];
        t = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ t >>> 1 ^ n[1 & t], this.mti = 0
    }
    return t = this.mt[this.mti++], t ^= t >>> 11, t ^= t << 7 & 2636928640, t ^= t << 15 & 4022730752, (t ^= t >>> 18) >>> 0
}, y = y || (v = Math, A = (_ = {}).lib = {}, S = function () {
}, B = A.Base = {
    extend: function (t) {
        S.prototype = this;
        var r = new S;
        return t && r.mixIn(t), r.hasOwnProperty("init") || (r.init = function () {
            r.$super.init.apply(this, arguments)
        }), r.init.prototype = r, r.$super = this, r
    }, create: function () {
        var t = this.extend();
        return t.init.apply(t, arguments), t
    }, init: function () {
    }, mixIn: function (t) {
        for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r]);
        t.hasOwnProperty("toString") && (this.toString = t.toString)
    }, clone: function () {
        return this.init.prototype.extend(this)
    }
}, I = A.WordArray = B.extend({
    init: function (t, r) {
        t = this.words = t || [], this.sigBytes = null != r ? r : 4 * t.length
    }, toString: function (t) {
        return (t || E).stringify(this)
    }, concat: function (t) {
        var r, n = this.words, i = t.words, e = this.sigBytes;
        if (t = t.sigBytes, this.clamp(), e % 4) for (r = 0; r < t; r++) n[e + r >>> 2] |= (i[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 24 - (e + r) % 4 * 8; else if (65535 < i.length) for (r = 0; r < t; r += 4) n[e + r >>> 2] = i[r >>> 2]; else n.push.apply(n, i);
        return this.sigBytes += t, this
    }, clamp: function () {
        var t = this.words, r = this.sigBytes;
        t[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, t.length = v.ceil(r / 4)
    }, clone: function () {
        var t = B.clone.call(this);
        return t.words = this.words.slice(0), t
    }, random: function (t) {
        for (var r = [], n = 0; n < t; n += 4) r.push(4294967296 * v.random() | 0);
        return new I.init(r, t)
    }
}), C = _.enc = {}, E = C.Hex = {
    stringify: function (t) {
        var r, n, i, e = t.words;
        for (t = t.sigBytes, r = [], n = 0; n < t; n++) i = e[n >>> 2] >>> 24 - n % 4 * 8 & 255, r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16));
        return r.join("")
    }, parse: function (t) {
        for (var r = t.length, n = [], i = 0; i < r; i += 2) n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
        return new I.init(n, r / 2)
    }
}, N = C.Latin1 = {
    stringify: function (t) {
        var r, n, i = t.words;
        for (t = t.sigBytes, r = [], n = 0; n < t; n++) r.push(String.fromCharCode(i[n >>> 2] >>> 24 - n % 4 * 8 & 255));
        return r.join("")
    }, parse: function (t) {
        for (var r = t.length, n = [], i = 0; i < r; i++) n[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
        return new I.init(n, r)
    }
}, R = C.Utf8 = {
    stringify: function (t) {
        try {
            return decodeURIComponent(escape(N.stringify(t)))
        } catch (t) {
            throw Error("Malformed UTF-8 data")
        }
    }, parse: function (t) {
        return N.parse(unescape(encodeURIComponent(t)))
    }
}, x = A.BufferedBlockAlgorithm = B.extend({
    reset: function () {
        this._data = new I.init, this._nDataBytes = 0
    }, _append: function (t) {
        "string" == typeof t && (t = R.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
    }, _process: function (t) {
        var r, n = this._data, i = n.words, e = n.sigBytes, o = this.blockSize, a = e / (4 * o);
        if (t = (a = t ? v.ceil(a) : v.max((0 | a) - this._minBufferSize, 0)) * o, e = v.min(4 * t, e), t) {
            for (r = 0; r < t; r += o) this._doProcessBlock(i, r);
            r = i.splice(0, t), n.sigBytes -= e
        }
        return new I.init(r, e)
    }, clone: function () {
        var t = B.clone.call(this);
        return t._data = this._data.clone(), t
    }, _minBufferSize: 0
}), A.Hasher = x.extend({
    cfg: B.extend(), init: function (t) {
        this.cfg = this.cfg.extend(t), this.reset()
    }, reset: function () {
        x.reset.call(this), this._doReset()
    }, update: function (t) {
        return this._append(t), this._process(), this
    }, finalize: function (t) {
        return t && this._append(t), this._doFinalize()
    }, blockSize: 16, _createHelper: function (t) {
        return function (r, n) {
            return new t.init(n).finalize(r)
        }
    }, _createHmacHelper: function (t) {
        return function (r, n) {
            return new M.HMAC.init(t, n).finalize(r)
        }
    }
}), M = _.algo = {}, _), function (t) {
    var r, n = (r = y).lib, i = n.Base, e = n.WordArray;
    (r = r.x64 = {}).Word = i.extend({
        init: function (t, r) {
            this.high = t, this.low = r
        }
    }), r.WordArray = i.extend({
        init: function (t, r) {
            t = this.words = t || [], this.sigBytes = null != r ? r : 8 * t.length
        }, toX32: function () {
            var t, r, n, i, o;
            for (r = (t = this.words).length, n = [], i = 0; i < r; i++) o = t[i], n.push(o.high), n.push(o.low);
            return e.create(n, this.sigBytes)
        }, clone: function () {
            for (var t = i.clone.call(this), r = t.words = this.words.slice(0), n = r.length, e = 0; e < n; e++) r[e] = r[e].clone();
            return t
        }
    })
}(), function () {
    function t() {
        return i.create.apply(i, arguments)
    }

    for (var r = y, n = r.lib.Hasher, i = (o = r.x64).Word, e = o.WordArray, o = r.algo, a = [t(1116352408, 3609767458), t(1899447441, 602891725), t(3049323471, 3964484399), t(3921009573, 2173295548), t(961987163, 4081628472), t(1508970993, 3053834265), t(2453635748, 2937671579), t(2870763221, 3664609560), t(3624381080, 2734883394), t(310598401, 1164996542), t(607225278, 1323610764), t(1426881987, 3590304994), t(1925078388, 4068182383), t(2162078206, 991336113), t(2614888103, 633803317), t(3248222580, 3479774868), t(3835390401, 2666613458), t(4022224774, 944711139), t(264347078, 2341262773), t(604807628, 2007800933), t(770255983, 1495990901), t(1249150122, 1856431235), t(1555081692, 3175218132), t(1996064986, 2198950837), t(2554220882, 3999719339), t(2821834349, 766784016), t(2952996808, 2566594879), t(3210313671, 3203337956), t(3336571891, 1034457026), t(3584528711, 2466948901), t(113926993, 3758326383), t(338241895, 168717936), t(666307205, 1188179964), t(773529912, 1546045734), t(1294757372, 1522805485), t(1396182291, 2643833823), t(1695183700, 2343527390), t(1986661051, 1014477480), t(2177026350, 1206759142), t(2456956037, 344077627), t(2730485921, 1290863460), t(2820302411, 3158454273), t(3259730800, 3505952657), t(3345764771, 106217008), t(3516065817, 3606008344), t(3600352804, 1432725776), t(4094571909, 1467031594), t(275423344, 851169720), t(430227734, 3100823752), t(506948616, 1363258195), t(659060556, 3750685593), t(883997877, 3785050280), t(958139571, 3318307427), t(1322822218, 3812723403), t(1537002063, 2003034995), t(1747873779, 3602036899), t(1955562222, 1575990012), t(2024104815, 1125592928), t(2227730452, 2716904306), t(2361852424, 442776044), t(2428436474, 593698344), t(2756734187, 3733110249), t(3204031479, 2999351573), t(3329325298, 3815920427), t(3391569614, 3928383900), t(3515267271, 566280711), t(3940187606, 3454069534), t(4118630271, 4000239992), t(116418474, 1914138554), t(174292421, 2731055270), t(289380356, 3203993006), t(460393269, 320620315), t(685471733, 587496836), t(852142971, 1086792851), t(1017036298, 365543100), t(1126000580, 2618297676), t(1288033470, 3409855158), t(1501505948, 4234509866), t(1607167915, 987167468), t(1816402316, 1246189591)], h = [], s = 0; 80 > s; s++) h[s] = t();
    o = o.SHA512 = n.extend({
        _doReset: function () {
            this._hash = new e.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)])
        }, _doProcessBlock: function (t, r) {
            var n, i, e, o, s, u, f, c, l, d, g, p, m, w, y, v, M, _, A, S, B, I, C, E, N, R, x, b, P, z, H, O, D, U, W,
                L, k, K, T, F, q, X, j, G, $, Y, J, Q, V, Z, tt, rt, nt;
            for (i = (n = this._hash.words)[0], e = n[1], o = n[2], s = n[3], u = n[4], f = n[5], c = n[6], n = n[7], N = l = i.high, R = d = i.low, x = g = e.high, b = p = e.low, P = m = o.high, z = w = o.low, H = y = s.high, O = v = s.low, D = M = u.high, U = _ = u.low, W = A = f.high, L = S = f.low, k = B = c.high, K = I = c.low, T = C = n.high, F = E = n.low, q = 0; 80 > q; q++) X = h[q], 16 > q ? (j = X.high = 0 | t[r + 2 * q], G = X.low = 0 | t[r + 2 * q + 1]) : (j = ((G = (j = h[q - 15]).high) >>> 1 | ($ = j.low) << 31) ^ (G >>> 8 | $ << 24) ^ G >>> 7, $ = ($ >>> 1 | G << 31) ^ ($ >>> 8 | G << 24) ^ ($ >>> 7 | G << 25), Y = ((G = (Y = h[q - 2]).high) >>> 19 | (J = Y.low) << 13) ^ (G << 3 | J >>> 29) ^ G >>> 6, J = (J >>> 19 | G << 13) ^ (J << 3 | G >>> 29) ^ (J >>> 6 | G << 26), Q = (G = h[q - 7]).high, Z = (V = h[q - 16]).high, V = V.low, j = (j = (j = j + Q + ((G = $ + G.low) >>> 0 < $ >>> 0 ? 1 : 0)) + Y + ((G += J) >>> 0 < J >>> 0 ? 1 : 0)) + Z + ((G += V) >>> 0 < V >>> 0 ? 1 : 0), X.high = j, X.low = G), Q = D & W ^ ~D & k, V = U & L ^ ~U & K, X = N & x ^ N & P ^ x & P, tt = R & b ^ R & z ^ b & z, $ = (N >>> 28 | R << 4) ^ (N << 30 | R >>> 2) ^ (N << 25 | R >>> 7), Y = (R >>> 28 | N << 4) ^ (R << 30 | N >>> 2) ^ (R << 25 | N >>> 7), rt = (J = a[q]).high, nt = J.low, Z = T + ((D >>> 14 | U << 18) ^ (D >>> 18 | U << 14) ^ (D << 23 | U >>> 9)) + ((J = F + ((U >>> 14 | D << 18) ^ (U >>> 18 | D << 14) ^ (U << 23 | D >>> 9))) >>> 0 < F >>> 0 ? 1 : 0), T = k, F = K, k = W, K = L, W = D, L = U, D = H + (Z = (Z = (Z = Z + Q + ((J += V) >>> 0 < V >>> 0 ? 1 : 0)) + rt + ((J += nt) >>> 0 < nt >>> 0 ? 1 : 0)) + j + ((J += G) >>> 0 < G >>> 0 ? 1 : 0)) + ((U = O + J | 0) >>> 0 < O >>> 0 ? 1 : 0) | 0, H = P, O = z, P = x, z = b, x = N, b = R, N = Z + (X = $ + X + ((G = Y + tt) >>> 0 < Y >>> 0 ? 1 : 0)) + ((R = J + G | 0) >>> 0 < J >>> 0 ? 1 : 0) | 0;
            d = i.low = d + R, i.high = l + N + (d >>> 0 < R >>> 0 ? 1 : 0), p = e.low = p + b, e.high = g + x + (p >>> 0 < b >>> 0 ? 1 : 0), w = o.low = w + z, o.high = m + P + (w >>> 0 < z >>> 0 ? 1 : 0), v = s.low = v + O, s.high = y + H + (v >>> 0 < O >>> 0 ? 1 : 0), _ = u.low = _ + U, u.high = M + D + (_ >>> 0 < U >>> 0 ? 1 : 0), S = f.low = S + L, f.high = A + W + (S >>> 0 < L >>> 0 ? 1 : 0), I = c.low = I + K, c.high = B + k + (I >>> 0 < K >>> 0 ? 1 : 0), E = n.low = E + F, n.high = C + T + (E >>> 0 < F >>> 0 ? 1 : 0)
        }, _doFinalize: function () {
            var t = this._data, r = t.words, n = 8 * this._nDataBytes, i = 8 * t.sigBytes;
            return r[i >>> 5] |= 128 << 24 - i % 32, r[30 + (i + 128 >>> 10 << 5)] = Math.floor(n / 4294967296), r[31 + (i + 128 >>> 10 << 5)] = n, t.sigBytes = 4 * r.length, this._process(), this._hash.toX32()
        }, clone: function () {
            var t = n.clone.call(this);
            return t._hash = this._hash.clone(), t
        }, blockSize: 32
    }), r.SHA512 = n._createHelper(o), r.HmacSHA512 = n._createHmacHelper(o)
}();