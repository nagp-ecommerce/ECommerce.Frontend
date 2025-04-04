/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=4550f087b3c337382a87)
 * Config saved to config.json and https://gist.github.com/4550f087b3c337382a87
 */
if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var i = t(this)
                , s = i.data("bs.alert");
            s || i.data("bs.alert", s = new o(this)),
                "string" == typeof e && s[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]'
        , o = function (e) {
            t(e).on("click", i, this.close)
        };
    o.VERSION = "3.2.0",
        o.prototype.close = function (e) {
            function i() {
                n.detach().trigger("closed.bs.alert").remove()
            }
            var o = t(this)
                , s = o.attr("data-target");
            s || (s = o.attr("href"),
                s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
            var n = t(s);
            e && e.preventDefault(),
                n.length || (n = o.hasClass("alert") ? o : o.parent()),
                n.trigger(e = t.Event("close.bs.alert")),
                e.isDefaultPrevented() || (n.removeClass("in"),
                    t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", i).emulateTransitionEnd(150) : i())
        }
        ;
    var s = t.fn.alert;
    t.fn.alert = e,
        t.fn.alert.Constructor = o,
        t.fn.alert.noConflict = function () {
            return t.fn.alert = s,
                this
        }
        ,
        t(document).on("click.bs.alert.data-api", i, o.prototype.close)
}(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.button")
                    , n = "object" == typeof e && e;
                s || o.data("bs.button", s = new i(this, n)),
                    "toggle" == e ? s.toggle() : e && s.setState(e)
            })
        }
        var i = function (e, o) {
            this.$element = t(e),
                this.options = t.extend({}, i.DEFAULTS, o),
                this.isLoading = !1
        };
        i.VERSION = "3.2.0",
            i.DEFAULTS = {
                loadingText: "loading..."
            },
            i.prototype.setState = function (e) {
                var i = "disabled"
                    , o = this.$element
                    , s = o.is("input") ? "val" : "html"
                    , n = o.data();
                e += "Text",
                    null == n.resetText && o.data("resetText", o[s]()),
                    o[s](null == n[e] ? this.options[e] : n[e]),
                    setTimeout(t.proxy(function () {
                        "loadingText" == e ? (this.isLoading = !0,
                            o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1,
                                o.removeClass(i).removeAttr(i))
                    }, this), 0)
            }
            ,
            i.prototype.toggle = function () {
                var t = !0
                    , e = this.$element.closest('[data-toggle="buttons"]');
                if (e.length) {
                    var i = this.$element.find("input");
                    "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")),
                        t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
                }
                t && this.$element.toggleClass("active")
            }
            ;
        var o = t.fn.button;
        t.fn.button = e,
            t.fn.button.Constructor = i,
            t.fn.button.noConflict = function () {
                return t.fn.button = o,
                    this
            }
            ,
            t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
                var o = t(i.target);
                o.hasClass("btn") || (o = o.closest(".btn")),
                    e.call(o, "toggle"),
                    i.preventDefault()
            })
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.carousel")
                    , n = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e)
                    , r = "string" == typeof e ? e : n.slide;
                s || o.data("bs.carousel", s = new i(this, n)),
                    "number" == typeof e ? s.to(e) : r ? s[r]() : n.interval && s.pause().cycle()
            })
        }
        var i = function (e, i) {
            this.$element = t(e).on("keydown.bs.carousel", t.proxy(this.keydown, this)),
                this.$indicators = this.$element.find(".carousel-indicators"),
                this.options = i,
                this.paused = this.sliding = this.interval = this.$active = this.$items = null,
                "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        i.VERSION = "3.2.0",
            i.DEFAULTS = {
                interval: 5e3,
                pause: "hover",
                wrap: !0
            },
            i.prototype.keydown = function (t) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
            ,
            i.prototype.cycle = function (e) {
                return e || (this.paused = !1),
                    this.interval && clearInterval(this.interval),
                    this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
                    this
            }
            ,
            i.prototype.getItemIndex = function (t) {
                return this.$items = t.parent().children(".item"),
                    this.$items.index(t || this.$active)
            }
            ,
            i.prototype.to = function (e) {
                var i = this
                    , o = this.getItemIndex(this.$active = this.$element.find(".item.active"));
                return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
                    i.to(e)
                }) : o == e ? this.pause().cycle() : this.slide(e > o ? "next" : "prev", t(this.$items[e]))
            }
            ,
            i.prototype.pause = function (e) {
                return e || (this.paused = !0),
                    this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end),
                        this.cycle(!0)),
                    this.interval = clearInterval(this.interval),
                    this
            }
            ,
            i.prototype.next = function () {
                return this.sliding ? void 0 : this.slide("next")
            }
            ,
            i.prototype.prev = function () {
                return this.sliding ? void 0 : this.slide("prev")
            }
            ,
            i.prototype.slide = function (e, i) {
                var o = this.$element.find(".item.active")
                    , s = i || o[e]()
                    , n = this.interval
                    , r = "next" == e ? "left" : "right"
                    , a = "next" == e ? "first" : "last"
                    , l = this;
                if (!s.length) {
                    if (!this.options.wrap)
                        return;
                    s = this.$element.find(".item")[a]()
                }
                if (s.hasClass("active"))
                    return this.sliding = !1;
                var h = s[0]
                    , p = t.Event("slide.bs.carousel", {
                        relatedTarget: h,
                        direction: r
                    });
                if (this.$element.trigger(p),
                    !p.isDefaultPrevented()) {
                    if (this.sliding = !0,
                        n && this.pause(),
                        this.$indicators.length) {
                        this.$indicators.find(".active").removeClass("active");
                        var c = t(this.$indicators.children()[this.getItemIndex(s)]);
                        c && c.addClass("active")
                    }
                    var d = t.Event("slid.bs.carousel", {
                        relatedTarget: h,
                        direction: r
                    });
                    return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e),
                        s[0].offsetWidth,
                        o.addClass(r),
                        s.addClass(r),
                        o.one("bsTransitionEnd", function () {
                            s.removeClass([e, r].join(" ")).addClass("active"),
                                o.removeClass(["active", r].join(" ")),
                                l.sliding = !1,
                                setTimeout(function () {
                                    l.$element.trigger(d)
                                }, 0)
                        }).emulateTransitionEnd(1e3 * o.css("transition-duration").slice(0, -1))) : (o.removeClass("active"),
                            s.addClass("active"),
                            this.sliding = !1,
                            this.$element.trigger(d)),
                        n && this.cycle(),
                        this
                }
            }
            ;
        var o = t.fn.carousel;
        t.fn.carousel = e,
            t.fn.carousel.Constructor = i,
            t.fn.carousel.noConflict = function () {
                return t.fn.carousel = o,
                    this
            }
            ,
            t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (i) {
                var o, s = t(this), n = t(s.attr("data-target") || (o = s.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
                if (n.hasClass("carousel")) {
                    var r = t.extend({}, n.data(), s.data())
                        , a = s.attr("data-slide-to");
                    a && (r.interval = !1),
                        e.call(n, r),
                        a && n.data("bs.carousel").to(a),
                        i.preventDefault()
                }
            }),
            t(window).on("load", function () {
                t('[data-ride="carousel"]').each(function () {
                    var i = t(this);
                    e.call(i, i.data())
                })
            })
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            e && 3 === e.which || (t(s).remove(),
                t(n).each(function () {
                    var o = i(t(this))
                        , s = {
                            relatedTarget: this
                        };
                    o.hasClass("open") && (o.trigger(e = t.Event("hide.bs.dropdown", s)),
                        e.isDefaultPrevented() || o.removeClass("open").trigger("hidden.bs.dropdown", s))
                }))
        }
        function i(e) {
            var i = e.attr("data-target");
            i || (i = e.attr("href"),
                i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
            var o = i && t(i);
            return o && o.length ? o : e.parent()
        }
        function o(e) {
            return this.each(function () {
                var i = t(this)
                    , o = i.data("bs.dropdown");
                o || i.data("bs.dropdown", o = new r(this)),
                    "string" == typeof e && o[e].call(i)
            })
        }
        var s = ".dropdown-backdrop"
            , n = '[data-toggle="dropdown"]'
            , r = function (e) {
                t(e).on("click.bs.dropdown", this.toggle)
            };
        r.VERSION = "3.2.0",
            r.prototype.toggle = function (o) {
                var s = t(this);
                if (!s.is(".disabled, :disabled")) {
                    var n = i(s)
                        , r = n.hasClass("open");
                    if (e(),
                        !r) {
                        "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                        var a = {
                            relatedTarget: this
                        };
                        if (n.trigger(o = t.Event("show.bs.dropdown", a)),
                            o.isDefaultPrevented())
                            return;
                        s.trigger("focus"),
                            n.toggleClass("open").trigger("shown.bs.dropdown", a)
                    }
                    return !1
                }
            }
            ,
            r.prototype.keydown = function (e) {
                if (/(38|40|27)/.test(e.keyCode)) {
                    var o = t(this);
                    if (e.preventDefault(),
                        e.stopPropagation(),
                        !o.is(".disabled, :disabled")) {
                        var s = i(o)
                            , r = s.hasClass("open");
                        if (!r || r && 27 == e.keyCode)
                            return 27 == e.which && s.find(n).trigger("focus"),
                                o.trigger("click");
                        var a = " li:not(.divider):visible a"
                            , l = s.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                        if (l.length) {
                            var h = l.index(l.filter(":focus"));
                            38 == e.keyCode && h > 0 && h--,
                                40 == e.keyCode && h < l.length - 1 && h++,
                                ~h || (h = 0),
                                l.eq(h).trigger("focus")
                        }
                    }
                }
            }
            ;
        var a = t.fn.dropdown;
        t.fn.dropdown = o,
            t.fn.dropdown.Constructor = r,
            t.fn.dropdown.noConflict = function () {
                return t.fn.dropdown = a,
                    this
            }
            ,
            t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
                t.stopPropagation()
            }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n + ', [role="menu"], [role="listbox"]', r.prototype.keydown)
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e, o) {
            return this.each(function () {
                var s = t(this)
                    , n = s.data("bs.modal")
                    , r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
                n || s.data("bs.modal", n = new i(this, r)),
                    "string" == typeof e ? n[e](o) : r.show && n.show(o)
            })
        }
        var i = function (e, i) {
            this.options = i,
                this.$body = t(document.body),
                this.$element = t(e),
                this.$backdrop = this.isShown = null,
                this.scrollbarWidth = 0,
                this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
                    this.$element.trigger("loaded.bs.modal")
                }, this))
        };
        i.VERSION = "3.2.0",
            i.DEFAULTS = {
                backdrop: !0,
                keyboard: !0,
                show: !0
            },
            i.prototype.toggle = function (t) {
                return this.isShown ? this.hide() : this.show(t)
            }
            ,
            i.prototype.show = function (e) {
                var i = this
                    , o = t.Event("show.bs.modal", {
                        relatedTarget: e
                    });
                this.$element.trigger(o),
                    this.isShown || o.isDefaultPrevented() || (this.isShown = !0,
                        this.checkScrollbar(),
                        this.$body.addClass("modal-open"),
                        this.setScrollbar(),
                        this.escape(),
                        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)),
                        this.backdrop(function () {
                            var o = t.support.transition && i.$element.hasClass("fade");
                            i.$element.parent().length || i.$element.appendTo(i.$body),
                                i.$element.show().scrollTop(0),
                                o && i.$element[0].offsetWidth,
                                i.$element.addClass("in").attr("aria-hidden", !1),
                                i.enforceFocus();
                            var s = t.Event("shown.bs.modal", {
                                relatedTarget: e
                            });
                            o ? i.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                                i.$element.trigger("focus").trigger(s)
                            }).emulateTransitionEnd(300) : i.$element.trigger("focus").trigger(s)
                        }))
            }
            ,
            i.prototype.hide = function (e) {
                e && e.preventDefault(),
                    e = t.Event("hide.bs.modal"),
                    this.$element.trigger(e),
                    this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
                        this.$body.removeClass("modal-open"),
                        this.resetScrollbar(),
                        this.escape(),
                        t(document).off("focusin.bs.modal"),
                        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
                        t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
            }
            ,
            i.prototype.enforceFocus = function () {
                t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
                    this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
                }, this))
            }
            ,
            i.prototype.escape = function () {
                this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function (t) {
                    27 == t.which && this.hide()
                }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
            }
            ,
            i.prototype.hideModal = function () {
                var t = this;
                this.$element.hide(),
                    this.backdrop(function () {
                        t.$element.trigger("hidden.bs.modal")
                    })
            }
            ,
            i.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(),
                    this.$backdrop = null
            }
            ,
            i.prototype.backdrop = function (e) {
                var i = this
                    , o = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var s = t.support.transition && o;
                    if (this.$backdrop = t('<div class="modal-backdrop ' + o + '" />').appendTo(this.$body),
                        this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                            t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                        }, this)),
                        s && this.$backdrop[0].offsetWidth,
                        this.$backdrop.addClass("in"),
                        !e)
                        return;
                    s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e()
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    var n = function () {
                        i.removeBackdrop(),
                            e && e()
                    };
                    t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", n).emulateTransitionEnd(150) : n()
                } else
                    e && e()
            }
            ,
            i.prototype.checkScrollbar = function () {
                document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
            }
            ,
            i.prototype.setScrollbar = function () {
                var t = parseInt(this.$body.css("padding-right") || 0, 10);
                this.scrollbarWidth && this.$body.css("padding-right", t + this.scrollbarWidth)
            }
            ,
            i.prototype.resetScrollbar = function () {
                this.$body.css("padding-right", "")
            }
            ,
            i.prototype.measureScrollbar = function () {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure",
                    this.$body.append(t);
                var e = t.offsetWidth - t.clientWidth;
                return this.$body[0].removeChild(t),
                    e
            }
            ;
        var o = t.fn.modal;
        t.fn.modal = e,
            t.fn.modal.Constructor = i,
            t.fn.modal.noConflict = function () {
                return t.fn.modal = o,
                    this
            }
            ,
            t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
                var o = t(this)
                    , s = o.attr("href")
                    , n = t(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, ""))
                    , r = n.data("bs.modal") ? "toggle" : t.extend({
                        remote: !/#/.test(s) && s
                    }, n.data(), o.data());
                o.is("a") && i.preventDefault(),
                    n.one("show.bs.modal", function (t) {
                        t.isDefaultPrevented() || n.one("hidden.bs.modal", function () {
                            o.is(":visible") && o.trigger("focus")
                        })
                    }),
                    e.call(n, r, this)
            })
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.tooltip")
                    , n = "object" == typeof e && e;
                (s || "destroy" != e) && (s || o.data("bs.tooltip", s = new i(this, n)),
                    "string" == typeof e && s[e]())
            })
        }
        var i = function (t, e) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
                this.init("tooltip", t, e)
        };
        i.VERSION = "3.2.0",
            i.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: {
                    selector: "body",
                    padding: 0
                }
            },
            i.prototype.init = function (e, i, o) {
                this.enabled = !0,
                    this.type = e,
                    this.$element = t(i),
                    this.options = this.getOptions(o),
                    this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
                for (var s = this.options.trigger.split(" "), n = s.length; n--;) {
                    var r = s[n];
                    if ("click" == r)
                        this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                    else if ("manual" != r) {
                        var a = "hover" == r ? "mouseenter" : "focusin"
                            , l = "hover" == r ? "mouseleave" : "focusout";
                        this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)),
                            this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                    }
                }
                this.options.selector ? this._options = t.extend({}, this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
            }
            ,
            i.prototype.getDefaults = function () {
                return i.DEFAULTS
            }
            ,
            i.prototype.getOptions = function (e) {
                return e = t.extend({}, this.getDefaults(), this.$element.data(), e),
                    e.delay && "number" == typeof e.delay && (e.delay = {
                        show: e.delay,
                        hide: e.delay
                    }),
                    e
            }
            ,
            i.prototype.getDelegateOptions = function () {
                var e = {}
                    , i = this.getDefaults();
                return this._options && t.each(this._options, function (t, o) {
                    i[t] != o && (e[t] = o)
                }),
                    e
            }
            ,
            i.prototype.enter = function (e) {
                var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
                return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()),
                    t(e.currentTarget).data("bs." + this.type, i)),
                    clearTimeout(i.timeout),
                    i.hoverState = "in",
                    i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function () {
                        "in" == i.hoverState && i.show()
                    }, i.options.delay.show)) : i.show()
            }
            ,
            i.prototype.leave = function (e) {
                var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
                return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()),
                    t(e.currentTarget).data("bs." + this.type, i)),
                    clearTimeout(i.timeout),
                    i.hoverState = "out",
                    i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function () {
                        "out" == i.hoverState && i.hide()
                    }, i.options.delay.hide)) : i.hide()
            }
            ,
            i.prototype.show = function () {
                var e = t.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    this.$element.trigger(e);
                    var i = t.contains(document.documentElement, this.$element[0]);
                    if (e.isDefaultPrevented() || !i)
                        return;
                    var o = this
                        , s = this.tip()
                        , n = this.getUID(this.type);
                    this.setContent(),
                        s.attr("id", n),
                        this.$element.attr("aria-describedby", n),
                        this.options.animation && s.addClass("fade");
                    var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement
                        , a = /\s?auto?\s?/i
                        , l = a.test(r);
                    l && (r = r.replace(a, "") || "top"),
                        s.detach().css({
                            top: 0,
                            left: 0,
                            display: "block"
                        }).addClass(r).data("bs." + this.type, this),
                        this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element);
                    var h = this.getPosition()
                        , p = s[0].offsetWidth
                        , c = s[0].offsetHeight;
                    if (l) {
                        var d = r
                            , f = this.$element.parent()
                            , u = this.getPosition(f);
                        r = "bottom" == r && h.top + h.height + c - u.scroll > u.height ? "top" : "top" == r && h.top - u.scroll - c < 0 ? "bottom" : "right" == r && h.right + p > u.width ? "left" : "left" == r && h.left - p < u.left ? "right" : r,
                            s.removeClass(d).addClass(r)
                    }
                    var g = this.getCalculatedOffset(r, h, p, c);
                    this.applyPlacement(g, r);
                    var v = function () {
                        o.$element.trigger("shown.bs." + o.type),
                            o.hoverState = null
                    };
                    t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(150) : v()
                }
            }
            ,
            i.prototype.applyPlacement = function (e, i) {
                var o = this.tip()
                    , s = o[0].offsetWidth
                    , n = o[0].offsetHeight
                    , r = parseInt(o.css("margin-top"), 10)
                    , a = parseInt(o.css("margin-left"), 10);
                isNaN(r) && (r = 0),
                    isNaN(a) && (a = 0),
                    e.top = e.top + r,
                    e.left = e.left + a,
                    t.offset.setOffset(o[0], t.extend({
                        using: function (t) {
                            o.css({
                                top: Math.round(t.top),
                                left: Math.round(t.left)
                            })
                        }
                    }, e), 0),
                    o.addClass("in");
                var l = o[0].offsetWidth
                    , h = o[0].offsetHeight;
                "top" == i && h != n && (e.top = e.top + n - h);
                var p = this.getViewportAdjustedDelta(i, e, l, h);
                p.left ? e.left += p.left : e.top += p.top;
                var c = p.left ? 2 * p.left - s + l : 2 * p.top - n + h
                    , d = p.left ? "left" : "top"
                    , f = p.left ? "offsetWidth" : "offsetHeight";
                o.offset(e),
                    this.replaceArrow(c, o[0][f], d)
            }
            ,
            i.prototype.replaceArrow = function (t, e, i) {
                this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
            }
            ,
            i.prototype.setContent = function () {
                var t = this.tip()
                    , e = this.getTitle();
                t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
                    t.removeClass("fade in top bottom left right")
            }
            ,
            i.prototype.hide = function () {
                function e() {
                    "in" != i.hoverState && o.detach(),
                        i.$element.trigger("hidden.bs." + i.type)
                }
                var i = this
                    , o = this.tip()
                    , s = t.Event("hide.bs." + this.type);
                return this.$element.removeAttr("aria-describedby"),
                    this.$element.trigger(s),
                    s.isDefaultPrevented() ? void 0 : (o.removeClass("in"),
                        t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(),
                        this.hoverState = null,
                        this)
            }
            ,
            i.prototype.fixTitle = function () {
                var t = this.$element;
                (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
            }
            ,
            i.prototype.hasContent = function () {
                return this.getTitle()
            }
            ,
            i.prototype.getPosition = function (e) {
                e = e || this.$element;
                var i = e[0]
                    , o = "BODY" == i.tagName;
                return t.extend({}, "function" == typeof i.getBoundingClientRect ? i.getBoundingClientRect() : null, {
                    scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop(),
                    width: o ? t(window).width() : e.outerWidth(),
                    height: o ? t(window).height() : e.outerHeight()
                }, o ? {
                    top: 0,
                    left: 0
                } : e.offset())
            }
            ,
            i.prototype.getCalculatedOffset = function (t, e, i, o) {
                return "bottom" == t ? {
                    top: e.top + e.height,
                    left: e.left + e.width / 2 - i / 2
                } : "top" == t ? {
                    top: e.top - o,
                    left: e.left + e.width / 2 - i / 2
                } : "left" == t ? {
                    top: e.top + e.height / 2 - o / 2,
                    left: e.left - i
                } : {
                    top: e.top + e.height / 2 - o / 2,
                    left: e.left + e.width
                }
            }
            ,
            i.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
                var s = {
                    top: 0,
                    left: 0
                };
                if (!this.$viewport)
                    return s;
                var n = this.options.viewport && this.options.viewport.padding || 0
                    , r = this.getPosition(this.$viewport);
                if (/right|left/.test(t)) {
                    var a = e.top - n - r.scroll
                        , l = e.top + n - r.scroll + o;
                    a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
                } else {
                    var h = e.left - n
                        , p = e.left + n + i;
                    h < r.left ? s.left = r.left - h : p > r.width && (s.left = r.left + r.width - p)
                }
                return s
            }
            ,
            i.prototype.getTitle = function () {
                var t, e = this.$element, i = this.options;
                return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
            }
            ,
            i.prototype.getUID = function (t) {
                do
                    t += ~~(1e6 * Math.random());
                while (document.getElementById(t));
                return t
            }
            ,
            i.prototype.tip = function () {
                return this.$tip = this.$tip || t(this.options.template)
            }
            ,
            i.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
            }
            ,
            i.prototype.validate = function () {
                this.$element[0].parentNode || (this.hide(),
                    this.$element = null,
                    this.options = null)
            }
            ,
            i.prototype.enable = function () {
                this.enabled = !0
            }
            ,
            i.prototype.disable = function () {
                this.enabled = !1
            }
            ,
            i.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled
            }
            ,
            i.prototype.toggle = function (e) {
                var i = this;
                e && (i = t(e.currentTarget).data("bs." + this.type),
                    i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()),
                        t(e.currentTarget).data("bs." + this.type, i))),
                    i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
            }
            ,
            i.prototype.destroy = function () {
                clearTimeout(this.timeout),
                    this.hide().$element.off("." + this.type).removeData("bs." + this.type)
            }
            ;
        var o = t.fn.tooltip;
        t.fn.tooltip = e,
            t.fn.tooltip.Constructor = i,
            t.fn.tooltip.noConflict = function () {
                return t.fn.tooltip = o,
                    this
            }
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.popover")
                    , n = "object" == typeof e && e;
                (s || "destroy" != e) && (s || o.data("bs.popover", s = new i(this, n)),
                    "string" == typeof e && s[e]())
            })
        }
        var i = function (t, e) {
            this.init("popover", t, e)
        };
        if (!t.fn.tooltip)
            throw new Error("Popover requires tooltip.js");
        i.VERSION = "3.2.0",
            i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }),
            i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype),
            i.prototype.constructor = i,
            i.prototype.getDefaults = function () {
                return i.DEFAULTS
            }
            ,
            i.prototype.setContent = function () {
                var t = this.tip()
                    , e = this.getTitle()
                    , i = this.getContent();
                t.find(".popover-title")[this.options.html ? "html" : "text"](e),
                    t.find(".popover-content").empty()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i),
                    t.removeClass("fade top bottom left right in"),
                    t.find(".popover-title").html() || t.find(".popover-title").hide()
            }
            ,
            i.prototype.hasContent = function () {
                return this.getTitle() || this.getContent()
            }
            ,
            i.prototype.getContent = function () {
                var t = this.$element
                    , e = this.options;
                return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
            }
            ,
            i.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".arrow")
            }
            ,
            i.prototype.tip = function () {
                return this.$tip || (this.$tip = t(this.options.template)),
                    this.$tip
            }
            ;
        var o = t.fn.popover;
        t.fn.popover = e,
            t.fn.popover.Constructor = i,
            t.fn.popover.noConflict = function () {
                return t.fn.popover = o,
                    this
            }
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.tab");
                s || o.data("bs.tab", s = new i(this)),
                    "string" == typeof e && s[e]()
            })
        }
        var i = function (e) {
            this.element = t(e)
        };
        i.VERSION = "3.2.0",
            i.prototype.show = function () {
                var e = this.element
                    , i = e.closest("ul:not(.dropdown-menu)")
                    , o = e.data("target");
                if (o || (o = e.attr("href"),
                    o = o && o.replace(/.*(?=#[^\s]*$)/, "")),
                    !e.parent("li").hasClass("active")) {
                    var s = i.find(".active:last a")[0]
                        , n = t.Event("show.bs.tab", {
                            relatedTarget: s
                        });
                    if (e.trigger(n),
                        !n.isDefaultPrevented()) {
                        var r = t(o);
                        this.activate(e.closest("li"), i),
                            this.activate(r, r.parent(), function () {
                                e.trigger({
                                    type: "shown.bs.tab",
                                    relatedTarget: s
                                })
                            })
                    }
                }
            }
            ,
            i.prototype.activate = function (e, i, o) {
                function s() {
                    n.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
                        e.addClass("active"),
                        r ? (e[0].offsetWidth,
                            e.addClass("in")) : e.removeClass("fade"),
                        e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"),
                        o && o()
                }
                var n = i.find("> .active")
                    , r = o && t.support.transition && n.hasClass("fade");
                r ? n.one("bsTransitionEnd", s).emulateTransitionEnd(150) : s(),
                    n.removeClass("in")
            }
            ;
        var o = t.fn.tab;
        t.fn.tab = e,
            t.fn.tab.Constructor = i,
            t.fn.tab.noConflict = function () {
                return t.fn.tab = o,
                    this
            }
            ,
            t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (i) {
                i.preventDefault(),
                    e.call(t(this), "show")
            })
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.affix")
                    , n = "object" == typeof e && e;
                s || o.data("bs.affix", s = new i(this, n)),
                    "string" == typeof e && s[e]()
            })
        }
        var i = function (e, o) {
            this.options = t.extend({}, i.DEFAULTS, o),
                this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)),
                this.$element = t(e),
                this.affixed = this.unpin = this.pinnedOffset = null,
                this.checkPosition()
        };
        i.VERSION = "3.2.0",
            i.RESET = "affix affix-top affix-bottom",
            i.DEFAULTS = {
                offset: 0,
                target: window
            },
            i.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset)
                    return this.pinnedOffset;
                this.$element.removeClass(i.RESET).addClass("affix");
                var t = this.$target.scrollTop()
                    , e = this.$element.offset();
                return this.pinnedOffset = e.top - t
            }
            ,
            i.prototype.checkPositionWithEventLoop = function () {
                setTimeout(t.proxy(this.checkPosition, this), 1)
            }
            ,
            i.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                    var e = t(document).height()
                        , o = this.$target.scrollTop()
                        , s = this.$element.offset()
                        , n = this.options.offset
                        , r = n.top
                        , a = n.bottom;
                    "object" != typeof n && (a = r = n),
                        "function" == typeof r && (r = n.top(this.$element)),
                        "function" == typeof a && (a = n.bottom(this.$element));
                    var l = null != this.unpin && o + this.unpin <= s.top ? !1 : null != a && s.top + this.$element.height() >= e - a ? "bottom" : null != r && r >= o ? "top" : !1;
                    if (this.affixed !== l) {
                        null != this.unpin && this.$element.css("top", "");
                        var h = "affix" + (l ? "-" + l : "")
                            , p = t.Event(h + ".bs.affix");
                        this.$element.trigger(p),
                            p.isDefaultPrevented() || (this.affixed = l,
                                this.unpin = "bottom" == l ? this.getPinnedOffset() : null,
                                this.$element.removeClass(i.RESET).addClass(h).trigger(t.Event(h.replace("affix", "affixed"))),
                                "bottom" == l && this.$element.offset({
                                    top: e - this.$element.height() - a
                                }))
                    }
                }
            }
            ;
        var o = t.fn.affix;
        t.fn.affix = e,
            t.fn.affix.Constructor = i,
            t.fn.affix.noConflict = function () {
                return t.fn.affix = o,
                    this
            }
            ,
            t(window).on("load", function () {
                t('[data-spy="affix"]').each(function () {
                    var i = t(this)
                        , o = i.data();
                    o.offset = o.offset || {},
                        o.offsetBottom && (o.offset.bottom = o.offsetBottom),
                        o.offsetTop && (o.offset.top = o.offsetTop),
                        e.call(i, o)
                })
            })
    }(jQuery),
    +function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.collapse")
                    , n = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e);
                !s && n.toggle && "show" == e && (e = !e),
                    s || o.data("bs.collapse", s = new i(this, n)),
                    "string" == typeof e && s[e]()
            })
        }
        var i = function (e, o) {
            this.$element = t(e),
                this.options = t.extend({}, i.DEFAULTS, o),
                this.transitioning = null,
                this.options.parent && (this.$parent = t(this.options.parent)),
                this.options.toggle && this.toggle()
        };
        i.VERSION = "3.2.0",
            i.DEFAULTS = {
                toggle: !0
            },
            i.prototype.dimension = function () {
                var t = this.$element.hasClass("width");
                return t ? "width" : "height"
            }
            ,
            i.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var i = t.Event("show.bs.collapse");
                    if (this.$element.trigger(i),
                        !i.isDefaultPrevented()) {
                        var o = this.$parent && this.$parent.find("> .panel > .in");
                        if (o && o.length) {
                            var s = o.data("bs.collapse");
                            if (s && s.transitioning)
                                return;
                            e.call(o, "hide"),
                                s || o.data("bs.collapse", null)
                        }
                        var n = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[n](0),
                            this.transitioning = 1;
                        var r = function () {
                            this.$element.removeClass("collapsing").addClass("collapse in")[n](""),
                                this.transitioning = 0,
                                this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition)
                            return r.call(this);
                        var a = t.camelCase(["scroll", n].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(350)[n](this.$element[0][a])
                    }
                }
            }
            ,
            i.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var e = t.Event("hide.bs.collapse");
                    if (this.$element.trigger(e),
                        !e.isDefaultPrevented()) {
                        var i = this.dimension();
                        this.$element[i](this.$element[i]())[0].offsetHeight,
                            this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                            this.transitioning = 1;
                        var o = function () {
                            this.transitioning = 0,
                                this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                        };
                        return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(350) : o.call(this)
                    }
                }
            }
            ,
            i.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
            }
            ;
        var o = t.fn.collapse;
        t.fn.collapse = e,
            t.fn.collapse.Constructor = i,
            t.fn.collapse.noConflict = function () {
                return t.fn.collapse = o,
                    this
            }
            ,
            t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (i) {
                var o, s = t(this), n = s.attr("data-target") || i.preventDefault() || (o = s.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""), r = t(n), a = r.data("bs.collapse"), l = a ? "toggle" : s.data(), h = s.attr("data-parent"), p = h && t(h);
                a && a.transitioning || (p && p.find('[data-toggle="collapse"][data-parent="' + h + '"]').not(s).addClass("collapsed"),
                    s[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
                    e.call(r, l)
            })
    }(jQuery),
    +function (t) {
        "use strict";
        function e(i, o) {
            var s = t.proxy(this.process, this);
            this.$body = t("body"),
                this.$scrollElement = t(t(i).is("body") ? window : i),
                this.options = t.extend({}, e.DEFAULTS, o),
                this.selector = (this.options.target || "") + " .nav li > a",
                this.offsets = [],
                this.targets = [],
                this.activeTarget = null,
                this.scrollHeight = 0,
                this.$scrollElement.on("scroll.bs.scrollspy", s),
                this.refresh(),
                this.process()
        }
        function i(i) {
            return this.each(function () {
                var o = t(this)
                    , s = o.data("bs.scrollspy")
                    , n = "object" == typeof i && i;
                s || o.data("bs.scrollspy", s = new e(this, n)),
                    "string" == typeof i && s[i]()
            })
        }
        e.VERSION = "3.2.0",
            e.DEFAULTS = {
                offset: 10
            },
            e.prototype.getScrollHeight = function () {
                return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
            }
            ,
            e.prototype.refresh = function () {
                var e = "offset"
                    , i = 0;
                t.isWindow(this.$scrollElement[0]) || (e = "position",
                    i = this.$scrollElement.scrollTop()),
                    this.offsets = [],
                    this.targets = [],
                    this.scrollHeight = this.getScrollHeight();
                var o = this;
                this.$body.find(this.selector).map(function () {
                    var o = t(this)
                        , s = o.data("target") || o.attr("href")
                        , n = /^#./.test(s) && t(s);
                    return n && n.length && n.is(":visible") && [[n[e]().top + i, s]] || null
                }).sort(function (t, e) {
                    return t[0] - e[0]
                }).each(function () {
                    o.offsets.push(this[0]),
                        o.targets.push(this[1])
                })
            }
            ,
            e.prototype.process = function () {
                var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), s = this.offsets, n = this.targets, r = this.activeTarget;
                if (this.scrollHeight != i && this.refresh(),
                    e >= o)
                    return r != (t = n[n.length - 1]) && this.activate(t);
                if (r && e <= s[0])
                    return r != (t = n[0]) && this.activate(t);
                for (t = s.length; t--;)
                    r != n[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(n[t])
            }
            ,
            e.prototype.activate = function (e) {
                this.activeTarget = e,
                    t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
                var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]'
                    , o = t(i).parents("li").addClass("active");
                o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")),
                    o.trigger("activate.bs.scrollspy")
            }
            ;
        var o = t.fn.scrollspy;
        t.fn.scrollspy = i,
            t.fn.scrollspy.Constructor = e,
            t.fn.scrollspy.noConflict = function () {
                return t.fn.scrollspy = o,
                    this
            }
            ,
            t(window).on("load.bs.scrollspy.data-api", function () {
                t('[data-spy="scroll"]').each(function () {
                    var e = t(this);
                    i.call(e, e.data())
                })
            })
    }(jQuery),
    +function (t) {
        "use strict";
        function e() {
            var t = document.createElement("bootstrap")
                , e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var i in e)
                if (void 0 !== t.style[i])
                    return {
                        end: e[i]
                    };
            return !1
        }
        t.fn.emulateTransitionEnd = function (e) {
            var i = !1
                , o = this;
            t(this).one("bsTransitionEnd", function () {
                i = !0
            });
            var s = function () {
                i || t(o).trigger(t.support.transition.end)
            };
            return setTimeout(s, e),
                this
        }
            ,
            t(function () {
                t.support.transition = e(),
                    t.support.transition && (t.event.special.bsTransitionEnd = {
                        bindType: t.support.transition.end,
                        delegateType: t.support.transition.end,
                        handle: function (e) {
                            return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
                        }
                    })
            })
    }(jQuery);
