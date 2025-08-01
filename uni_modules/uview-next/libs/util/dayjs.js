'undefined' != typeof globalThis
	? globalThis
	: 'undefined' != typeof window
	? window
	: 'undefined' != typeof global
	? global
	: 'undefined' != typeof self && self;
var t = { exports: {} },
	e = (t.exports = (function () {
		var t = 1e3,
			e = 6e4,
			n = 36e5,
			r = 'millisecond',
			s = 'second',
			i = 'minute',
			u = 'hour',
			a = 'day',
			o = 'week',
			c = 'month',
			f = 'quarter',
			h = 'year',
			d = 'date',
			l = 'Invalid Date',
			$ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
			y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
			M = {
				name: 'en',
				weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
				months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
				ordinal: function (t) {
					var e = ['th', 'st', 'nd', 'rd'],
						n = t % 100;
					return '[' + t + (e[(n - 20) % 10] || e[n] || e[0]) + ']';
				}
			},
			g = function (t, e, n) {
				var r = String(t);
				return !r || r.length >= e ? t : '' + Array(e + 1 - r.length).join(n) + t;
			},
			v = {
				s: g,
				z: function (t) {
					var e = -t.utcOffset(),
						n = Math.abs(e),
						r = Math.floor(n / 60),
						s = n % 60;
					return (e <= 0 ? '+' : '-') + g(r, 2, '0') + ':' + g(s, 2, '0');
				},
				m: function t(e, n) {
					if (e.date() < n.date()) return -t(n, e);
					var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
						s = e.clone().add(r, c),
						i = n - s < 0,
						u = e.clone().add(r + (i ? -1 : 1), c);
					return +(-(r + (n - s) / (i ? s - u : u - s)) || 0);
				},
				a: function (t) {
					return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
				},
				p: function (t) {
					return (
						{ M: c, y: h, w: o, d: a, D: d, h: u, m: i, s: s, ms: r, Q: f }[t] ||
						String(t || '')
							.toLowerCase()
							.replace(/s$/, '')
					);
				},
				u: function (t) {
					return void 0 === t;
				}
			},
			m = 'en',
			D = {};
		D[m] = M;
		var p = '$isDayjsObject',
			S = function (t) {
				return t instanceof _ || !(!t || !t[p]);
			},
			w = function t(e, n, r) {
				var s;
				if (!e) return m;
				if ('string' == typeof e) {
					var i = e.toLowerCase();
					D[i] && (s = i), n && ((D[i] = n), (s = i));
					var u = e.split('-');
					if (!s && u.length > 1) return t(u[0]);
				} else {
					var a = e.name;
					(D[a] = e), (s = a);
				}
				return !r && s && (m = s), s || (!r && m);
			},
			b = function (t, e) {
				if (S(t)) return t.clone();
				var n = 'object' == typeof e ? e : {};
				return (n.date = t), (n.args = arguments), new _(n);
			},
			O = v;
		(O.l = w),
			(O.i = S),
			(O.w = function (t, e) {
				return b(t, { locale: e.$L, utc: e.$u, x: e.$x, $offset: e.$offset });
			});
		var _ = (function () {
				function M(t) {
					(this.$L = w(t.locale, null, !0)), this.parse(t), (this.$x = this.$x || t.x || {}), (this[p] = !0);
				}
				var g = M.prototype;
				return (
					(g.parse = function (t) {
						(this.$d = (function (t) {
							var e = t.date,
								n = t.utc;
							if (null === e) return new Date(NaN);
							if (O.u(e)) return new Date();
							if (e instanceof Date) return new Date(e);
							if ('string' == typeof e && !/Z$/i.test(e)) {
								var r = e.match($);
								if (r) {
									var s = r[2] - 1 || 0,
										i = (r[7] || '0').substring(0, 3);
									return n
										? new Date(Date.UTC(r[1], s, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i))
										: new Date(r[1], s, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i);
								}
							}
							return new Date(e);
						})(t)),
							this.init();
					}),
					(g.init = function () {
						var t = this.$d;
						(this.$y = t.getFullYear()),
							(this.$M = t.getMonth()),
							(this.$D = t.getDate()),
							(this.$W = t.getDay()),
							(this.$H = t.getHours()),
							(this.$m = t.getMinutes()),
							(this.$s = t.getSeconds()),
							(this.$ms = t.getMilliseconds());
					}),
					(g.$utils = function () {
						return O;
					}),
					(g.isValid = function () {
						return !(this.$d.toString() === l);
					}),
					(g.isSame = function (t, e) {
						var n = b(t);
						return this.startOf(e) <= n && n <= this.endOf(e);
					}),
					(g.isAfter = function (t, e) {
						return b(t) < this.startOf(e);
					}),
					(g.isBefore = function (t, e) {
						return this.endOf(e) < b(t);
					}),
					(g.$g = function (t, e, n) {
						return O.u(t) ? this[e] : this.set(n, t);
					}),
					(g.unix = function () {
						return Math.floor(this.valueOf() / 1e3);
					}),
					(g.valueOf = function () {
						return this.$d.getTime();
					}),
					(g.startOf = function (t, e) {
						var n = this,
							r = !!O.u(e) || e,
							f = O.p(t),
							l = function (t, e) {
								var s = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
								return r ? s : s.endOf(a);
							},
							$ = function (t, e) {
								return O.w(n.toDate()[t].apply(n.toDate('s'), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);
							},
							y = this.$W,
							M = this.$M,
							g = this.$D,
							v = 'set' + (this.$u ? 'UTC' : '');
						switch (f) {
							case h:
								return r ? l(1, 0) : l(31, 11);
							case c:
								return r ? l(1, M) : l(0, M + 1);
							case o:
								var m = this.$locale().weekStart || 0,
									D = (y < m ? y + 7 : y) - m;
								return l(r ? g - D : g + (6 - D), M);
							case a:
							case d:
								return $(v + 'Hours', 0);
							case u:
								return $(v + 'Minutes', 1);
							case i:
								return $(v + 'Seconds', 2);
							case s:
								return $(v + 'Milliseconds', 3);
							default:
								return this.clone();
						}
					}),
					(g.endOf = function (t) {
						return this.startOf(t, !1);
					}),
					(g.$set = function (t, e) {
						var n,
							o = O.p(t),
							f = 'set' + (this.$u ? 'UTC' : ''),
							l = ((n = {}),
							(n[a] = f + 'Date'),
							(n[d] = f + 'Date'),
							(n[c] = f + 'Month'),
							(n[h] = f + 'FullYear'),
							(n[u] = f + 'Hours'),
							(n[i] = f + 'Minutes'),
							(n[s] = f + 'Seconds'),
							(n[r] = f + 'Milliseconds'),
							n)[o],
							$ = o === a ? this.$D + (e - this.$W) : e;
						if (o === c || o === h) {
							var y = this.clone().set(d, 1);
							y.$d[l]($), y.init(), (this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d);
						} else l && this.$d[l]($);
						return this.init(), this;
					}),
					(g.set = function (t, e) {
						return this.clone().$set(t, e);
					}),
					(g.get = function (t) {
						return this[O.p(t)]();
					}),
					(g.add = function (r, f) {
						var d,
							l = this;
						r = Number(r);
						var $ = O.p(f),
							y = function (t) {
								var e = b(l);
								return O.w(e.date(e.date() + Math.round(t * r)), l);
							};
						if ($ === c) return this.set(c, this.$M + r);
						if ($ === h) return this.set(h, this.$y + r);
						if ($ === a) return y(1);
						if ($ === o) return y(7);
						var M = ((d = {}), (d[i] = e), (d[u] = n), (d[s] = t), d)[$] || 1,
							g = this.$d.getTime() + r * M;
						return O.w(g, this);
					}),
					(g.subtract = function (t, e) {
						return this.add(-1 * t, e);
					}),
					(g.format = function (t) {
						var e = this,
							n = this.$locale();
						if (!this.isValid()) return n.invalidDate || l;
						var r = t || 'YYYY-MM-DDTHH:mm:ssZ',
							s = O.z(this),
							i = this.$H,
							u = this.$m,
							a = this.$M,
							o = n.weekdays,
							c = n.months,
							f = n.meridiem,
							h = function (t, n, s, i) {
								return (t && (t[n] || t(e, r))) || s[n].slice(0, i);
							},
							d = function (t) {
								return O.s(i % 12 || 12, t, '0');
							},
							$ =
								f ||
								function (t, e, n) {
									var r = t < 12 ? 'AM' : 'PM';
									return n ? r.toLowerCase() : r;
								};
						return r.replace(y, function (t, r) {
							return (
								r ||
								(function (t) {
									switch (t) {
										case 'YY':
											return String(e.$y).slice(-2);
										case 'YYYY':
											return O.s(e.$y, 4, '0');
										case 'M':
											return a + 1;
										case 'MM':
											return O.s(a + 1, 2, '0');
										case 'MMM':
											return h(n.monthsShort, a, c, 3);
										case 'MMMM':
											return h(c, a);
										case 'D':
											return e.$D;
										case 'DD':
											return O.s(e.$D, 2, '0');
										case 'd':
											return String(e.$W);
										case 'dd':
											return h(n.weekdaysMin, e.$W, o, 2);
										case 'ddd':
											return h(n.weekdaysShort, e.$W, o, 3);
										case 'dddd':
											return o[e.$W];
										case 'H':
											return String(i);
										case 'HH':
											return O.s(i, 2, '0');
										case 'h':
											return d(1);
										case 'hh':
											return d(2);
										case 'a':
											return $(i, u, !0);
										case 'A':
											return $(i, u, !1);
										case 'm':
											return String(u);
										case 'mm':
											return O.s(u, 2, '0');
										case 's':
											return String(e.$s);
										case 'ss':
											return O.s(e.$s, 2, '0');
										case 'SSS':
											return O.s(e.$ms, 3, '0');
										case 'Z':
											return s;
									}
									return null;
								})(t) ||
								s.replace(':', '')
							);
						});
					}),
					(g.utcOffset = function () {
						return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
					}),
					(g.diff = function (r, d, l) {
						var $,
							y = this,
							M = O.p(d),
							g = b(r),
							v = (g.utcOffset() - this.utcOffset()) * e,
							m = this - g,
							D = function () {
								return O.m(y, g);
							};
						switch (M) {
							case h:
								$ = D() / 12;
								break;
							case c:
								$ = D();
								break;
							case f:
								$ = D() / 3;
								break;
							case o:
								$ = (m - v) / 6048e5;
								break;
							case a:
								$ = (m - v) / 864e5;
								break;
							case u:
								$ = m / n;
								break;
							case i:
								$ = m / e;
								break;
							case s:
								$ = m / t;
								break;
							default:
								$ = m;
						}
						return l ? $ : O.a($);
					}),
					(g.daysInMonth = function () {
						return this.endOf(c).$D;
					}),
					(g.$locale = function () {
						return D[this.$L];
					}),
					(g.locale = function (t, e) {
						if (!t) return this.$L;
						var n = this.clone(),
							r = w(t, e, !0);
						return r && (n.$L = r), n;
					}),
					(g.clone = function () {
						return O.w(this.$d, this);
					}),
					(g.toDate = function () {
						return new Date(this.valueOf());
					}),
					(g.toJSON = function () {
						return this.isValid() ? this.toISOString() : null;
					}),
					(g.toISOString = function () {
						return this.$d.toISOString();
					}),
					(g.toString = function () {
						return this.$d.toUTCString();
					}),
					M
				);
			})(),
			k = _.prototype;
		return (
			(b.prototype = k),
			[
				['$ms', r],
				['$s', s],
				['$m', i],
				['$H', u],
				['$W', a],
				['$M', c],
				['$y', h],
				['$D', d]
			].forEach(function (t) {
				k[t[1]] = function (e) {
					return this.$g(e, t[0], t[1]);
				};
			}),
			(b.extend = function (t, e) {
				return t.$i || (t(e, _, b), (t.$i = !0)), b;
			}),
			(b.locale = w),
			(b.isDayjs = S),
			(b.unix = function (t) {
				return b(1e3 * t);
			}),
			(b.en = D[m]),
			(b.Ls = D),
			(b.p = {}),
			b
		);
	})());
export { e as default };
