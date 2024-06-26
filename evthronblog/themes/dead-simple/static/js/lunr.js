! function() {
    var e, t, r, i, n, s, o, a, u, l, c, h, d, f, p, y, m, g, x, v, w, Q, k, S, E, L, b, P, T, O, I, R, F = function(e) {
        var t = new F.Builder;
        return t.pipeline.add(F.trimmer, F.stopWordFilter, F.stemmer), t.searchPipeline.add(F.stemmer), e.call(t, t), t.build()
    };
    F.version = "2.3.9", F.utils = {}, F.utils.warn = (e = this, function(t) {
        e.console && console.warn && console.warn(t)
    }), F.utils.asString = function(e) {
        return null == e ? "" : e.toString()
    }, F.utils.clone = function(e) {
        if (null == e) return e;
        for (var t = Object.create(null), r = Object.keys(e), i = 0; i < r.length; i++) {
            var n = r[i],
                s = e[n];
            if (Array.isArray(s)) t[n] = s.slice();
            else {
                if ("string" != typeof s && "number" != typeof s && "boolean" != typeof s) throw new TypeError("clone is not deep and does not support nested objects");
                t[n] = s
            }
        }
        return t
    }, F.FieldRef = function(e, t, r) {
        this.docRef = e, this.fieldName = t, this._stringValue = r
    }, F.FieldRef.joiner = "/", F.FieldRef.fromString = function(e) {
        var t = e.indexOf(F.FieldRef.joiner);
        if (-1 === t) throw "malformed field ref string";
        var r = e.slice(0, t),
            i = e.slice(t + 1);
        return new F.FieldRef(i, r, e)
    }, F.FieldRef.prototype.toString = function() {
        return null == this._stringValue && (this._stringValue = this.fieldName + F.FieldRef.joiner + this.docRef), this._stringValue
    }, F.Set = function(e) {
        if (this.elements = Object.create(null), e) {
            this.length = e.length;
            for (var t = 0; t < this.length; t++) this.elements[e[t]] = !0
        } else this.length = 0
    }, F.Set.complete = {
        intersect: function(e) {
            return e
        },
        union: function() {
            return this
        },
        contains: function() {
            return !0
        }
    }, F.Set.empty = {
        intersect: function() {
            return this
        },
        union: function(e) {
            return e
        },
        contains: function() {
            return !1
        }
    }, F.Set.prototype.contains = function(e) {
        return !!this.elements[e]
    }, F.Set.prototype.intersect = function(e) {
        var t, r, i, n = [];
        if (e === F.Set.complete) return this;
        if (e === F.Set.empty) return e;
        this.length < e.length ? (t = this, r = e) : (t = e, r = this), i = Object.keys(t.elements);
        for (var s = 0; s < i.length; s++) {
            var o = i[s];
            o in r.elements && n.push(o)
        }
        return new F.Set(n)
    }, F.Set.prototype.union = function(e) {
        return e === F.Set.complete ? F.Set.complete : e === F.Set.empty ? this : new F.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))
    }, F.idf = function(e, t) {
        var r = 0;
        for (var i in e) "_index" != i && (r += Object.keys(e[i]).length);
        var n = (t - r + .5) / (r + .5);
        return Math.log(1 + Math.abs(n))
    }, F.Token = function(e, t) {
        this.str = e || "", this.metadata = t || {}
    }, F.Token.prototype.toString = function() {
        return this.str
    }, F.Token.prototype.update = function(e) {
        return this.str = e(this.str, this.metadata), this
    }, F.Token.prototype.clone = function(e) {
        return e = e || function(e) {
            return e
        }, new F.Token(e(this.str, this.metadata), this.metadata)
    }, F.tokenizer = function(e, t) {
        if (null == e || null == e) return [];
        if (Array.isArray(e)) return e.map((function(e) {
            return new F.Token(F.utils.asString(e).toLowerCase(), F.utils.clone(t))
        }));
        for (var r = e.toString().toLowerCase(), i = r.length, n = [], s = 0, o = 0; s <= i; s++) {
            var a = s - o;
            if (r.charAt(s).match(F.tokenizer.separator) || s == i) {
                if (a > 0) {
                    var u = F.utils.clone(t) || {};
                    u.position = [o, a], u.index = n.length, n.push(new F.Token(r.slice(o, s), u))
                }
                o = s + 1
            }
        }
        return n
    }, F.tokenizer.separator = /[\s\-]+/, F.Pipeline = function() {
        this._stack = []
    }, F.Pipeline.registeredFunctions = Object.create(null), F.Pipeline.registerFunction = function(e, t) {
        t in this.registeredFunctions && F.utils.warn("Overwriting existing registered function: " + t), e.label = t, F.Pipeline.registeredFunctions[e.label] = e
    }, F.Pipeline.warnIfFunctionNotRegistered = function(e) {
        e.label && e.label in this.registeredFunctions || F.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", e)
    }, F.Pipeline.load = function(e) {
        var t = new F.Pipeline;
        return e.forEach((function(e) {
            var r = F.Pipeline.registeredFunctions[e];
            if (!r) throw new Error("Cannot load unregistered function: " + e);
            t.add(r)
        })), t
    }, F.Pipeline.prototype.add = function() {
        Array.prototype.slice.call(arguments).forEach((function(e) {
            F.Pipeline.warnIfFunctionNotRegistered(e), this._stack.push(e)
        }), this)
    }, F.Pipeline.prototype.after = function(e, t) {
        F.Pipeline.warnIfFunctionNotRegistered(t);
        var r = this._stack.indexOf(e);
        if (-1 == r) throw new Error("Cannot find existingFn");
        r += 1, this._stack.splice(r, 0, t)
    }, F.Pipeline.prototype.before = function(e, t) {
        F.Pipeline.warnIfFunctionNotRegistered(t);
        var r = this._stack.indexOf(e);
        if (-1 == r) throw new Error("Cannot find existingFn");
        this._stack.splice(r, 0, t)
    }, F.Pipeline.prototype.remove = function(e) {
        var t = this._stack.indexOf(e); - 1 != t && this._stack.splice(t, 1)
    }, F.Pipeline.prototype.run = function(e) {
        for (var t = this._stack.length, r = 0; r < t; r++) {
            for (var i = this._stack[r], n = [], s = 0; s < e.length; s++) {
                var o = i(e[s], s, e);
                if (null != o && "" !== o)
                    if (Array.isArray(o))
                        for (var a = 0; a < o.length; a++) n.push(o[a]);
                    else n.push(o)
            }
            e = n
        }
        return e
    }, F.Pipeline.prototype.runString = function(e, t) {
        var r = new F.Token(e, t);
        return this.run([r]).map((function(e) {
            return e.toString()
        }))
    }, F.Pipeline.prototype.reset = function() {
        this._stack = []
    }, F.Pipeline.prototype.toJSON = function() {
        return this._stack.map((function(e) {
            return F.Pipeline.warnIfFunctionNotRegistered(e), e.label
        }))
    }, F.Vector = function(e) {
        this._magnitude = 0, this.elements = e || []
    }, F.Vector.prototype.positionForIndex = function(e) {
        if (0 == this.elements.length) return 0;
        for (var t = 0, r = this.elements.length / 2, i = r - t, n = Math.floor(i / 2), s = this.elements[2 * n]; i > 1 && (s < e && (t = n), s > e && (r = n), s != e);) i = r - t, n = t + Math.floor(i / 2), s = this.elements[2 * n];
        return s == e || s > e ? 2 * n : s < e ? 2 * (n + 1) : void 0
    }, F.Vector.prototype.insert = function(e, t) {
        this.upsert(e, t, (function() {
            throw "duplicate index"
        }))
    }, F.Vector.prototype.upsert = function(e, t, r) {
        this._magnitude = 0;
        var i = this.positionForIndex(e);
        this.elements[i] == e ? this.elements[i + 1] = r(this.elements[i + 1], t) : this.elements.splice(i, 0, e, t)
    }, F.Vector.prototype.magnitude = function() {
        if (this._magnitude) return this._magnitude;
        for (var e = 0, t = this.elements.length, r = 1; r < t; r += 2) {
            var i = this.elements[r];
            e += i * i
        }
        return this._magnitude = Math.sqrt(e)
    }, F.Vector.prototype.dot = function(e) {
        for (var t = 0, r = this.elements, i = e.elements, n = r.length, s = i.length, o = 0, a = 0, u = 0, l = 0; u < n && l < s;)(o = r[u]) < (a = i[l]) ? u += 2 : o > a ? l += 2 : o == a && (t += r[u + 1] * i[l + 1], u += 2, l += 2);
        return t
    }, F.Vector.prototype.similarity = function(e) {
        return this.dot(e) / this.magnitude() || 0
    }, F.Vector.prototype.toArray = function() {
        for (var e = new Array(this.elements.length / 2), t = 1, r = 0; t < this.elements.length; t += 2, r++) e[r] = this.elements[t];
        return e
    }, F.Vector.prototype.toJSON = function() {
        return this.elements
    }, F.stemmer = (t = {
        ational: "ate",
        tional: "tion",
        enci: "ence",
        anci: "ance",
        izer: "ize",
        bli: "ble",
        alli: "al",
        entli: "ent",
        eli: "e",
        ousli: "ous",
        ization: "ize",
        ation: "ate",
        ator: "ate",
        alism: "al",
        iveness: "ive",
        fulness: "ful",
        ousness: "ous",
        aliti: "al",
        iviti: "ive",
        biliti: "ble",
        logi: "log"
    }, r = {
        icate: "ic",
        ative: "",
        alize: "al",
        iciti: "ic",
        ical: "ic",
        ful: "",
        ness: ""
    }, o = "^(" + (n = "[^aeiou][^aeiouy]*") + ")?" + (s = (i = "[aeiouy]") + "[aeiou]*") + n + "(" + s + ")?$", a = "^(" + n + ")?" + s + n + s + n, u = "^(" + n + ")?" + i, l = new RegExp("^(" + n + ")?" + s + n), c = new RegExp(a), h = new RegExp(o), d = new RegExp(u), f = /^(.+?)(ss|i)es$/, p = /^(.+?)([^s])s$/, y = /^(.+?)eed$/, m = /^(.+?)(ed|ing)$/, g = /.$/, x = /(at|bl|iz)$/, v = new RegExp("([^aeiouylsz])\\1$"), w = new RegExp("^" + n + i + "[^aeiouwxy]$"), Q = /^(.+?[^aeiou])y$/, k = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/, S = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/, E = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, L = /^(.+?)(s|t)(ion)$/, b = /^(.+?)e$/, P = /ll$/, T = new RegExp("^" + n + i + "[^aeiouwxy]$"), O = function(e) {
        var i, n, s, o, a, u, O;
        if (e.length < 3) return e;
        if ("y" == (s = e.substr(0, 1)) && (e = s.toUpperCase() + e.substr(1)), a = p, (o = f).test(e) ? e = e.replace(o, "$1$2") : a.test(e) && (e = e.replace(a, "$1$2")), a = m, (o = y).test(e)) {
            var I = o.exec(e);
            (o = l).test(I[1]) && (o = g, e = e.replace(o, ""))
        } else a.test(e) && (i = (I = a.exec(e))[1], (a = d).test(i) && (u = v, O = w, (a = x).test(e = i) ? e += "e" : u.test(e) ? (o = g, e = e.replace(o, "")) : O.test(e) && (e += "e")));
        return (o = Q).test(e) && (e = (i = (I = o.exec(e))[1]) + "i"), (o = k).test(e) && (i = (I = o.exec(e))[1], n = I[2], (o = l).test(i) && (e = i + t[n])), (o = S).test(e) && (i = (I = o.exec(e))[1], n = I[2], (o = l).test(i) && (e = i + r[n])), a = L, (o = E).test(e) ? (i = (I = o.exec(e))[1], (o = c).test(i) && (e = i)) : a.test(e) && (i = (I = a.exec(e))[1] + I[2], (a = c).test(i) && (e = i)), (o = b).test(e) && (i = (I = o.exec(e))[1], a = h, u = T, ((o = c).test(i) || a.test(i) && !u.test(i)) && (e = i)), a = c, (o = P).test(e) && a.test(e) && (o = g, e = e.replace(o, "")), "y" == s && (e = s.toLowerCase() + e.substr(1)), e
    }, function(e) {
        return e.update(O)
    }), F.Pipeline.registerFunction(F.stemmer, "stemmer"), F.generateStopWordFilter = function(e) {
        var t = e.reduce((function(e, t) {
            return e[t] = t, e
        }), {});
        return function(e) {
            if (e && t[e.toString()] !== e.toString()) return e
        }
    }, F.stopWordFilter = F.generateStopWordFilter(["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"]), F.Pipeline.registerFunction(F.stopWordFilter, "stopWordFilter"), F.trimmer = function(e) {
        return e.update((function(e) {
            return e.replace(/^\W+/, "").replace(/\W+$/, "")
        }))
    }, F.Pipeline.registerFunction(F.trimmer, "trimmer"), F.TokenSet = function() {
        this.final = !1, this.edges = {}, this.id = F.TokenSet._nextId, F.TokenSet._nextId += 1
    }, F.TokenSet._nextId = 1, F.TokenSet.fromArray = function(e) {
        for (var t = new F.TokenSet.Builder, r = 0, i = e.length; r < i; r++) t.insert(e[r]);
        return t.finish(), t.root
    }, F.TokenSet.fromClause = function(e) {
        return "editDistance" in e ? F.TokenSet.fromFuzzyString(e.term, e.editDistance) : F.TokenSet.fromString(e.term)
    }, F.TokenSet.fromFuzzyString = function(e, t) {
        for (var r = new F.TokenSet, i = [{
                node: r,
                editsRemaining: t,
                str: e
            }]; i.length;) {
            var n = i.pop();
            if (n.str.length > 0) {
                var s, o = n.str.charAt(0);
                o in n.node.edges ? s = n.node.edges[o] : (s = new F.TokenSet, n.node.edges[o] = s), 1 == n.str.length && (s.final = !0), i.push({
                    node: s,
                    editsRemaining: n.editsRemaining,
                    str: n.str.slice(1)
                })
            }
            if (0 != n.editsRemaining) {
                if ("*" in n.node.edges) var a = n.node.edges["*"];
                else {
                    a = new F.TokenSet;
                    n.node.edges["*"] = a
                }
                if (0 == n.str.length && (a.final = !0), i.push({
                        node: a,
                        editsRemaining: n.editsRemaining - 1,
                        str: n.str
                    }), n.str.length > 1 && i.push({
                        node: n.node,
                        editsRemaining: n.editsRemaining - 1,
                        str: n.str.slice(1)
                    }), 1 == n.str.length && (n.node.final = !0), n.str.length >= 1) {
                    if ("*" in n.node.edges) var u = n.node.edges["*"];
                    else {
                        u = new F.TokenSet;
                        n.node.edges["*"] = u
                    }
                    1 == n.str.length && (u.final = !0), i.push({
                        node: u,
                        editsRemaining: n.editsRemaining - 1,
                        str: n.str.slice(1)
                    })
                }
                if (n.str.length > 1) {
                    var l, c = n.str.charAt(0),
                        h = n.str.charAt(1);
                    h in n.node.edges ? l = n.node.edges[h] : (l = new F.TokenSet, n.node.edges[h] = l), 1 == n.str.length && (l.final = !0), i.push({
                        node: l,
                        editsRemaining: n.editsRemaining - 1,
                        str: c + n.str.slice(2)
                    })
                }
            }
        }
        return r
    }, F.TokenSet.fromString = function(e) {
        for (var t = new F.TokenSet, r = t, i = 0, n = e.length; i < n; i++) {
            var s = e[i],
                o = i == n - 1;
            if ("*" == s) t.edges[s] = t, t.final = o;
            else {
                var a = new F.TokenSet;
                a.final = o, t.edges[s] = a, t = a
            }
        }
        return r
    }, F.TokenSet.prototype.toArray = function() {
        for (var e = [], t = [{
                prefix: "",
                node: this
            }]; t.length;) {
            var r = t.pop(),
                i = Object.keys(r.node.edges),
                n = i.length;
            r.node.final && (r.prefix.charAt(0), e.push(r.prefix));
            for (var s = 0; s < n; s++) {
                var o = i[s];
                t.push({
                    prefix: r.prefix.concat(o),
                    node: r.node.edges[o]
                })
            }
        }
        return e
    }, F.TokenSet.prototype.toString = function() {
        if (this._str) return this._str;
        for (var e = this.final ? "1" : "0", t = Object.keys(this.edges).sort(), r = t.length, i = 0; i < r; i++) {
            var n = t[i];
            e = e + n + this.edges[n].id
        }
        return e
    }, F.TokenSet.prototype.intersect = function(e) {
        for (var t = new F.TokenSet, r = void 0, i = [{
                qNode: e,
                output: t,
                node: this
            }]; i.length;) {
            r = i.pop();
            for (var n = Object.keys(r.qNode.edges), s = n.length, o = Object.keys(r.node.edges), a = o.length, u = 0; u < s; u++)
                for (var l = n[u], c = 0; c < a; c++) {
                    var h = o[c];
                    if (h == l || "*" == l) {
                        var d = r.node.edges[h],
                            f = r.qNode.edges[l],
                            p = d.final && f.final,
                            y = void 0;
                        h in r.output.edges ? (y = r.output.edges[h]).final = y.final || p : ((y = new F.TokenSet).final = p, r.output.edges[h] = y), i.push({
                            qNode: f,
                            output: y,
                            node: d
                        })
                    }
                }
        }
        return t
    }, F.TokenSet.Builder = function() {
        this.previousWord = "", this.root = new F.TokenSet, this.uncheckedNodes = [], this.minimizedNodes = {}
    }, F.TokenSet.Builder.prototype.insert = function(e) {
        var t, r = 0;
        if (e < this.previousWord) throw new Error("Out of order word insertion");
        for (var i = 0; i < e.length && i < this.previousWord.length && e[i] == this.previousWord[i]; i++) r++;
        this.minimize(r), t = 0 == this.uncheckedNodes.length ? this.root : this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
        for (i = r; i < e.length; i++) {
            var n = new F.TokenSet,
                s = e[i];
            t.edges[s] = n, this.uncheckedNodes.push({
                parent: t,
                char: s,
                child: n
            }), t = n
        }
        t.final = !0, this.previousWord = e
    }, F.TokenSet.Builder.prototype.finish = function() {
        this.minimize(0)
    }, F.TokenSet.Builder.prototype.minimize = function(e) {
        for (var t = this.uncheckedNodes.length - 1; t >= e; t--) {
            var r = this.uncheckedNodes[t],
                i = r.child.toString();
            i in this.minimizedNodes ? r.parent.edges[r.char] = this.minimizedNodes[i] : (r.child._str = i, this.minimizedNodes[i] = r.child), this.uncheckedNodes.pop()
        }
    }, F.Index = function(e) {
        this.invertedIndex = e.invertedIndex, this.fieldVectors = e.fieldVectors, this.tokenSet = e.tokenSet, this.fields = e.fields, this.pipeline = e.pipeline
    }, F.Index.prototype.search = function(e) {
        return this.query((function(t) {
            new F.QueryParser(e, t).parse()
        }))
    }, F.Index.prototype.query = function(e) {
        for (var t = new F.Query(this.fields), r = Object.create(null), i = Object.create(null), n = Object.create(null), s = Object.create(null), o = Object.create(null), a = 0; a < this.fields.length; a++) i[this.fields[a]] = new F.Vector;
        e.call(t, t);
        for (a = 0; a < t.clauses.length; a++) {
            var u = t.clauses[a],
                l = null,
                c = F.Set.empty;
            l = u.usePipeline ? this.pipeline.runString(u.term, {
                fields: u.fields
            }) : [u.term];
            for (var h = 0; h < l.length; h++) {
                var d = l[h];
                u.term = d;
                var f = F.TokenSet.fromClause(u),
                    p = this.tokenSet.intersect(f).toArray();
                if (0 === p.length && u.presence === F.Query.presence.REQUIRED) {
                    for (var y = 0; y < u.fields.length; y++) {
                        s[R = u.fields[y]] = F.Set.empty
                    }
                    break
                }
                for (var m = 0; m < p.length; m++) {
                    var g = p[m],
                        x = this.invertedIndex[g],
                        v = x._index;
                    for (y = 0; y < u.fields.length; y++) {
                        var w = x[R = u.fields[y]],
                            Q = Object.keys(w),
                            k = g + "/" + R,
                            S = new F.Set(Q);
                        if (u.presence == F.Query.presence.REQUIRED && (c = c.union(S), void 0 === s[R] && (s[R] = F.Set.complete)), u.presence != F.Query.presence.PROHIBITED) {
                            if (i[R].upsert(v, u.boost, (function(e, t) {
                                    return e + t
                                })), !n[k]) {
                                for (var E = 0; E < Q.length; E++) {
                                    var L, b = Q[E],
                                        P = new F.FieldRef(b, R),
                                        T = w[b];
                                    void 0 === (L = r[P]) ? r[P] = new F.MatchData(g, R, T) : L.add(g, R, T)
                                }
                                n[k] = !0
                            }
                        } else void 0 === o[R] && (o[R] = F.Set.empty), o[R] = o[R].union(S)
                    }
                }
            }
            if (u.presence === F.Query.presence.REQUIRED)
                for (y = 0; y < u.fields.length; y++) {
                    s[R = u.fields[y]] = s[R].intersect(c)
                }
        }
        var O = F.Set.complete,
            I = F.Set.empty;
        for (a = 0; a < this.fields.length; a++) {
            var R;
            s[R = this.fields[a]] && (O = O.intersect(s[R])), o[R] && (I = I.union(o[R]))
        }
        var C = Object.keys(r),
            N = [],
            j = Object.create(null);
        if (t.isNegated()) {
            C = Object.keys(this.fieldVectors);
            for (a = 0; a < C.length; a++) {
                P = C[a];
                var _ = F.FieldRef.fromString(P);
                r[P] = new F.MatchData
            }
        }
        for (a = 0; a < C.length; a++) {
            var D = (_ = F.FieldRef.fromString(C[a])).docRef;
            if (O.contains(D) && !I.contains(D)) {
                var A, B = this.fieldVectors[_],
                    V = i[_.fieldName].similarity(B);
                if (void 0 !== (A = j[D])) A.score += V, A.matchData.combine(r[_]);
                else {
                    var z = {
                        ref: D,
                        score: V,
                        matchData: r[_]
                    };
                    j[D] = z, N.push(z)
                }
            }
        }
        return N.sort((function(e, t) {
            return t.score - e.score
        }))
    }, F.Index.prototype.toJSON = function() {
        var e = Object.keys(this.invertedIndex).sort().map((function(e) {
                return [e, this.invertedIndex[e]]
            }), this),
            t = Object.keys(this.fieldVectors).map((function(e) {
                return [e, this.fieldVectors[e].toJSON()]
            }), this);
        return {
            version: F.version,
            fields: this.fields,
            fieldVectors: t,
            invertedIndex: e,
            pipeline: this.pipeline.toJSON()
        }
    }, F.Index.load = function(e) {
        var t = {},
            r = {},
            i = e.fieldVectors,
            n = Object.create(null),
            s = e.invertedIndex,
            o = new F.TokenSet.Builder,
            a = F.Pipeline.load(e.pipeline);
        e.version != F.version && F.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + F.version + "' does not match serialized index '" + e.version + "'");
        for (var u = 0; u < i.length; u++) {
            var l = (h = i[u])[0],
                c = h[1];
            r[l] = new F.Vector(c)
        }
        for (u = 0; u < s.length; u++) {
            var h, d = (h = s[u])[0],
                f = h[1];
            o.insert(d), n[d] = f
        }
        return o.finish(), t.fields = e.fields, t.fieldVectors = r, t.invertedIndex = n, t.tokenSet = o.root, t.pipeline = a, new F.Index(t)
    }, F.Builder = function() {
        this._ref = "id", this._fields = Object.create(null), this._documents = Object.create(null), this.invertedIndex = Object.create(null), this.fieldTermFrequencies = {}, this.fieldLengths = {}, this.tokenizer = F.tokenizer, this.pipeline = new F.Pipeline, this.searchPipeline = new F.Pipeline, this.documentCount = 0, this._b = .75, this._k1 = 1.2, this.termIndex = 0, this.metadataWhitelist = []
    }, F.Builder.prototype.ref = function(e) {
        this._ref = e
    }, F.Builder.prototype.field = function(e, t) {
        if (/\//.test(e)) throw new RangeError("Field '" + e + "' contains illegal character '/'");
        this._fields[e] = t || {}
    }, F.Builder.prototype.b = function(e) {
        this._b = e < 0 ? 0 : e > 1 ? 1 : e
    }, F.Builder.prototype.k1 = function(e) {
        this._k1 = e
    }, F.Builder.prototype.add = function(e, t) {
        var r = e[this._ref],
            i = Object.keys(this._fields);
        this._documents[r] = t || {}, this.documentCount += 1;
        for (var n = 0; n < i.length; n++) {
            var s = i[n],
                o = this._fields[s].extractor,
                a = o ? o(e) : e[s],
                u = this.tokenizer(a, {
                    fields: [s]
                }),
                l = this.pipeline.run(u),
                c = new F.FieldRef(r, s),
                h = Object.create(null);
            this.fieldTermFrequencies[c] = h, this.fieldLengths[c] = 0, this.fieldLengths[c] += l.length;
            for (var d = 0; d < l.length; d++) {
                var f = l[d];
                if (null == h[f] && (h[f] = 0), h[f] += 1, null == this.invertedIndex[f]) {
                    var p = Object.create(null);
                    p._index = this.termIndex, this.termIndex += 1;
                    for (var y = 0; y < i.length; y++) p[i[y]] = Object.create(null);
                    this.invertedIndex[f] = p
                }
                null == this.invertedIndex[f][s][r] && (this.invertedIndex[f][s][r] = Object.create(null));
                for (var m = 0; m < this.metadataWhitelist.length; m++) {
                    var g = this.metadataWhitelist[m],
                        x = f.metadata[g];
                    null == this.invertedIndex[f][s][r][g] && (this.invertedIndex[f][s][r][g] = []), this.invertedIndex[f][s][r][g].push(x)
                }
            }
        }
    }, F.Builder.prototype.calculateAverageFieldLengths = function() {
        for (var e = Object.keys(this.fieldLengths), t = e.length, r = {}, i = {}, n = 0; n < t; n++) {
            var s = F.FieldRef.fromString(e[n]),
                o = s.fieldName;
            i[o] || (i[o] = 0), i[o] += 1, r[o] || (r[o] = 0), r[o] += this.fieldLengths[s]
        }
        var a = Object.keys(this._fields);
        for (n = 0; n < a.length; n++) {
            var u = a[n];
            r[u] = r[u] / i[u]
        }
        this.averageFieldLength = r
    }, F.Builder.prototype.createFieldVectors = function() {
        for (var e = {}, t = Object.keys(this.fieldTermFrequencies), r = t.length, i = Object.create(null), n = 0; n < r; n++) {
            for (var s = F.FieldRef.fromString(t[n]), o = s.fieldName, a = this.fieldLengths[s], u = new F.Vector, l = this.fieldTermFrequencies[s], c = Object.keys(l), h = c.length, d = this._fields[o].boost || 1, f = this._documents[s.docRef].boost || 1, p = 0; p < h; p++) {
                var y, m, g, x = c[p],
                    v = l[x],
                    w = this.invertedIndex[x]._index;
                void 0 === i[x] ? (y = F.idf(this.invertedIndex[x], this.documentCount), i[x] = y) : y = i[x], m = y * ((this._k1 + 1) * v) / (this._k1 * (1 - this._b + this._b * (a / this.averageFieldLength[o])) + v), m *= d, m *= f, g = Math.round(1e3 * m) / 1e3, u.insert(w, g)
            }
            e[s] = u
        }
        this.fieldVectors = e
    }, F.Builder.prototype.createTokenSet = function() {
        this.tokenSet = F.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())
    }, F.Builder.prototype.build = function() {
        return this.calculateAverageFieldLengths(), this.createFieldVectors(), this.createTokenSet(), new F.Index({
            invertedIndex: this.invertedIndex,
            fieldVectors: this.fieldVectors,
            tokenSet: this.tokenSet,
            fields: Object.keys(this._fields),
            pipeline: this.searchPipeline
        })
    }, F.Builder.prototype.use = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        t.unshift(this), e.apply(this, t)
    }, F.MatchData = function(e, t, r) {
        for (var i = Object.create(null), n = Object.keys(r || {}), s = 0; s < n.length; s++) {
            var o = n[s];
            i[o] = r[o].slice()
        }
        this.metadata = Object.create(null), void 0 !== e && (this.metadata[e] = Object.create(null), this.metadata[e][t] = i)
    }, F.MatchData.prototype.combine = function(e) {
        for (var t = Object.keys(e.metadata), r = 0; r < t.length; r++) {
            var i = t[r],
                n = Object.keys(e.metadata[i]);
            null == this.metadata[i] && (this.metadata[i] = Object.create(null));
            for (var s = 0; s < n.length; s++) {
                var o = n[s],
                    a = Object.keys(e.metadata[i][o]);
                null == this.metadata[i][o] && (this.metadata[i][o] = Object.create(null));
                for (var u = 0; u < a.length; u++) {
                    var l = a[u];
                    null == this.metadata[i][o][l] ? this.metadata[i][o][l] = e.metadata[i][o][l] : this.metadata[i][o][l] = this.metadata[i][o][l].concat(e.metadata[i][o][l])
                }
            }
        }
    }, F.MatchData.prototype.add = function(e, t, r) {
        if (!(e in this.metadata)) return this.metadata[e] = Object.create(null), void(this.metadata[e][t] = r);
        if (t in this.metadata[e])
            for (var i = Object.keys(r), n = 0; n < i.length; n++) {
                var s = i[n];
                s in this.metadata[e][t] ? this.metadata[e][t][s] = this.metadata[e][t][s].concat(r[s]) : this.metadata[e][t][s] = r[s]
            } else this.metadata[e][t] = r
    }, F.Query = function(e) {
        this.clauses = [], this.allFields = e
    }, F.Query.wildcard = new String("*"), F.Query.wildcard.NONE = 0, F.Query.wildcard.LEADING = 1, F.Query.wildcard.TRAILING = 2, F.Query.presence = {
        OPTIONAL: 1,
        REQUIRED: 2,
        PROHIBITED: 3
    }, F.Query.prototype.clause = function(e) {
        return "fields" in e || (e.fields = this.allFields), "boost" in e || (e.boost = 1), "usePipeline" in e || (e.usePipeline = !0), "wildcard" in e || (e.wildcard = F.Query.wildcard.NONE), e.wildcard & F.Query.wildcard.LEADING && e.term.charAt(0) != F.Query.wildcard && (e.term = "*" + e.term), e.wildcard & F.Query.wildcard.TRAILING && e.term.slice(-1) != F.Query.wildcard && (e.term = e.term + "*"), "presence" in e || (e.presence = F.Query.presence.OPTIONAL), this.clauses.push(e), this
    }, F.Query.prototype.isNegated = function() {
        for (var e = 0; e < this.clauses.length; e++)
            if (this.clauses[e].presence != F.Query.presence.PROHIBITED) return !1;
        return !0
    }, F.Query.prototype.term = function(e, t) {
        if (Array.isArray(e)) return e.forEach((function(e) {
            this.term(e, F.utils.clone(t))
        }), this), this;
        var r = t || {};
        return r.term = e.toString(), this.clause(r), this
    }, F.QueryParseError = function(e, t, r) {
        this.name = "QueryParseError", this.message = e, this.start = t, this.end = r
    }, F.QueryParseError.prototype = new Error, F.QueryLexer = function(e) {
        this.lexemes = [], this.str = e, this.length = e.length, this.pos = 0, this.start = 0, this.escapeCharPositions = []
    }, F.QueryLexer.prototype.run = function() {
        for (var e = F.QueryLexer.lexText; e;) e = e(this)
    }, F.QueryLexer.prototype.sliceString = function() {
        for (var e = [], t = this.start, r = this.pos, i = 0; i < this.escapeCharPositions.length; i++) r = this.escapeCharPositions[i], e.push(this.str.slice(t, r)), t = r + 1;
        return e.push(this.str.slice(t, this.pos)), this.escapeCharPositions.length = 0, e.join("")
    }, F.QueryLexer.prototype.emit = function(e) {
        this.lexemes.push({
            type: e,
            str: this.sliceString(),
            start: this.start,
            end: this.pos
        }), this.start = this.pos
    }, F.QueryLexer.prototype.escapeCharacter = function() {
        this.escapeCharPositions.push(this.pos - 1), this.pos += 1
    }, F.QueryLexer.prototype.next = function() {
        if (this.pos >= this.length) return F.QueryLexer.EOS;
        var e = this.str.charAt(this.pos);
        return this.pos += 1, e
    }, F.QueryLexer.prototype.width = function() {
        return this.pos - this.start
    }, F.QueryLexer.prototype.ignore = function() {
        this.start == this.pos && (this.pos += 1), this.start = this.pos
    }, F.QueryLexer.prototype.backup = function() {
        this.pos -= 1
    }, F.QueryLexer.prototype.acceptDigitRun = function() {
        var e, t;
        do {
            t = (e = this.next()).charCodeAt(0)
        } while (t > 47 && t < 58);
        e != F.QueryLexer.EOS && this.backup()
    }, F.QueryLexer.prototype.more = function() {
        return this.pos < this.length
    }, F.QueryLexer.EOS = "EOS", F.QueryLexer.FIELD = "FIELD", F.QueryLexer.TERM = "TERM", F.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE", F.QueryLexer.BOOST = "BOOST", F.QueryLexer.PRESENCE = "PRESENCE", F.QueryLexer.lexField = function(e) {
        return e.backup(), e.emit(F.QueryLexer.FIELD), e.ignore(), F.QueryLexer.lexText
    }, F.QueryLexer.lexTerm = function(e) {
        if (e.width() > 1 && (e.backup(), e.emit(F.QueryLexer.TERM)), e.ignore(), e.more()) return F.QueryLexer.lexText
    }, F.QueryLexer.lexEditDistance = function(e) {
        return e.ignore(), e.acceptDigitRun(), e.emit(F.QueryLexer.EDIT_DISTANCE), F.QueryLexer.lexText
    }, F.QueryLexer.lexBoost = function(e) {
        return e.ignore(), e.acceptDigitRun(), e.emit(F.QueryLexer.BOOST), F.QueryLexer.lexText
    }, F.QueryLexer.lexEOS = function(e) {
        e.width() > 0 && e.emit(F.QueryLexer.TERM)
    }, F.QueryLexer.termSeparator = F.tokenizer.separator, F.QueryLexer.lexText = function(e) {
        for (;;) {
            var t = e.next();
            if (t == F.QueryLexer.EOS) return F.QueryLexer.lexEOS;
            if (92 != t.charCodeAt(0)) {
                if (":" == t) return F.QueryLexer.lexField;
                if ("~" == t) return e.backup(), e.width() > 0 && e.emit(F.QueryLexer.TERM), F.QueryLexer.lexEditDistance;
                if ("^" == t) return e.backup(), e.width() > 0 && e.emit(F.QueryLexer.TERM), F.QueryLexer.lexBoost;
                if ("+" == t && 1 === e.width()) return e.emit(F.QueryLexer.PRESENCE), F.QueryLexer.lexText;
                if ("-" == t && 1 === e.width()) return e.emit(F.QueryLexer.PRESENCE), F.QueryLexer.lexText;
                if (t.match(F.QueryLexer.termSeparator)) return F.QueryLexer.lexTerm
            } else e.escapeCharacter()
        }
    }, F.QueryParser = function(e, t) {
        this.lexer = new F.QueryLexer(e), this.query = t, this.currentClause = {}, this.lexemeIdx = 0
    }, F.QueryParser.prototype.parse = function() {
        this.lexer.run(), this.lexemes = this.lexer.lexemes;
        for (var e = F.QueryParser.parseClause; e;) e = e(this);
        return this.query
    }, F.QueryParser.prototype.peekLexeme = function() {
        return this.lexemes[this.lexemeIdx]
    }, F.QueryParser.prototype.consumeLexeme = function() {
        var e = this.peekLexeme();
        return this.lexemeIdx += 1, e
    }, F.QueryParser.prototype.nextClause = function() {
        var e = this.currentClause;
        this.query.clause(e), this.currentClause = {}
    }, F.QueryParser.parseClause = function(e) {
        var t = e.peekLexeme();
        if (null != t) switch (t.type) {
            case F.QueryLexer.PRESENCE:
                return F.QueryParser.parsePresence;
            case F.QueryLexer.FIELD:
                return F.QueryParser.parseField;
            case F.QueryLexer.TERM:
                return F.QueryParser.parseTerm;
            default:
                var r = "expected either a field or a term, found " + t.type;
                throw t.str.length >= 1 && (r += " with value '" + t.str + "'"), new F.QueryParseError(r, t.start, t.end)
        }
    }, F.QueryParser.parsePresence = function(e) {
        var t = e.consumeLexeme();
        if (null != t) {
            switch (t.str) {
                case "-":
                    e.currentClause.presence = F.Query.presence.PROHIBITED;
                    break;
                case "+":
                    e.currentClause.presence = F.Query.presence.REQUIRED;
                    break;
                default:
                    var r = "unrecognised presence operator'" + t.str + "'";
                    throw new F.QueryParseError(r, t.start, t.end)
            }
            var i = e.peekLexeme();
            if (null == i) {
                r = "expecting term or field, found nothing";
                throw new F.QueryParseError(r, t.start, t.end)
            }
            switch (i.type) {
                case F.QueryLexer.FIELD:
                    return F.QueryParser.parseField;
                case F.QueryLexer.TERM:
                    return F.QueryParser.parseTerm;
                default:
                    r = "expecting term or field, found '" + i.type + "'";
                    throw new F.QueryParseError(r, i.start, i.end)
            }
        }
    }, F.QueryParser.parseField = function(e) {
        var t = e.consumeLexeme();
        if (null != t) {
            if (-1 == e.query.allFields.indexOf(t.str)) {
                var r = e.query.allFields.map((function(e) {
                        return "'" + e + "'"
                    })).join(", "),
                    i = "unrecognised field '" + t.str + "', possible fields: " + r;
                throw new F.QueryParseError(i, t.start, t.end)
            }
            e.currentClause.fields = [t.str];
            var n = e.peekLexeme();
            if (null == n) {
                i = "expecting term, found nothing";
                throw new F.QueryParseError(i, t.start, t.end)
            }
            if (n.type === F.QueryLexer.TERM) return F.QueryParser.parseTerm;
            i = "expecting term, found '" + n.type + "'";
            throw new F.QueryParseError(i, n.start, n.end)
        }
    }, F.QueryParser.parseTerm = function(e) {
        var t = e.consumeLexeme();
        if (null != t) {
            e.currentClause.term = t.str.toLowerCase(), -1 != t.str.indexOf("*") && (e.currentClause.usePipeline = !1);
            var r = e.peekLexeme();
            if (null != r) switch (r.type) {
                case F.QueryLexer.TERM:
                    return e.nextClause(), F.QueryParser.parseTerm;
                case F.QueryLexer.FIELD:
                    return e.nextClause(), F.QueryParser.parseField;
                case F.QueryLexer.EDIT_DISTANCE:
                    return F.QueryParser.parseEditDistance;
                case F.QueryLexer.BOOST:
                    return F.QueryParser.parseBoost;
                case F.QueryLexer.PRESENCE:
                    return e.nextClause(), F.QueryParser.parsePresence;
                default:
                    var i = "Unexpected lexeme type '" + r.type + "'";
                    throw new F.QueryParseError(i, r.start, r.end)
            } else e.nextClause()
        }
    }, F.QueryParser.parseEditDistance = function(e) {
        var t = e.consumeLexeme();
        if (null != t) {
            var r = parseInt(t.str, 10);
            if (isNaN(r)) {
                var i = "edit distance must be numeric";
                throw new F.QueryParseError(i, t.start, t.end)
            }
            e.currentClause.editDistance = r;
            var n = e.peekLexeme();
            if (null != n) switch (n.type) {
                case F.QueryLexer.TERM:
                    return e.nextClause(), F.QueryParser.parseTerm;
                case F.QueryLexer.FIELD:
                    return e.nextClause(), F.QueryParser.parseField;
                case F.QueryLexer.EDIT_DISTANCE:
                    return F.QueryParser.parseEditDistance;
                case F.QueryLexer.BOOST:
                    return F.QueryParser.parseBoost;
                case F.QueryLexer.PRESENCE:
                    return e.nextClause(), F.QueryParser.parsePresence;
                default:
                    i = "Unexpected lexeme type '" + n.type + "'";
                    throw new F.QueryParseError(i, n.start, n.end)
            } else e.nextClause()
        }
    }, F.QueryParser.parseBoost = function(e) {
        var t = e.consumeLexeme();
        if (null != t) {
            var r = parseInt(t.str, 10);
            if (isNaN(r)) {
                var i = "boost must be numeric";
                throw new F.QueryParseError(i, t.start, t.end)
            }
            e.currentClause.boost = r;
            var n = e.peekLexeme();
            if (null != n) switch (n.type) {
                case F.QueryLexer.TERM:
                    return e.nextClause(), F.QueryParser.parseTerm;
                case F.QueryLexer.FIELD:
                    return e.nextClause(), F.QueryParser.parseField;
                case F.QueryLexer.EDIT_DISTANCE:
                    return F.QueryParser.parseEditDistance;
                case F.QueryLexer.BOOST:
                    return F.QueryParser.parseBoost;
                case F.QueryLexer.PRESENCE:
                    return e.nextClause(), F.QueryParser.parsePresence;
                default:
                    i = "Unexpected lexeme type '" + n.type + "'";
                    throw new F.QueryParseError(i, n.start, n.end)
            } else e.nextClause()
        }
    }, I = this, R = function() {
        return F
    }, "function" == typeof define && define.amd ? define(R) : "object" == typeof exports ? module.exports = R() : I.lunr = R()
}();