(function() {
    ! function($) {
        return $.stackgrid = function(i, t, n) {
            var o, c, e, s, r, d, a;
            $.extend($.stackgrid.config, n), c = $(window), o = $(document), a = {
                height: c.height(),
                width: c.width(),
                is_resizing: !1,
                resizing: void 0
            }, a.update = function() {
                a.height = c.height(), a.width = c.width()
            }, r = {
                $container: void 0,
                $items: void 0,
                container: {
                    height: 0,
                    width: 0
                },
                column: {
                    index: 0,
                    stacks: {
                        ordinal: [],
                        optimized: []
                    }
                },
                items: [],
                number_of_columns: 0,
                plot: {
                    optimized: {},
                    ordinal: {}
                }
            },
            r.ordinal = {
                setup: function() {
                    var i;
                    for (i = 0, r.column.stacks.ordinal = []; i < r.number_of_columns;) r.column.stacks.ordinal[i] = 0, i++;
                    r.container.height = 0, r.column.index = 0
                },
                plot: function(i) {
                    r.items[i][2] = $.stackgrid.config.gutter + ($.stackgrid.config.column_width + $.stackgrid.config.gutter) * r.column.index, r.items[i][3] = $.stackgrid.config.gutter + r.column.stacks.ordinal[r.column.index], r.column.stacks.ordinal[r.column.index] += r.items[i][1] + $.stackgrid.config.gutter, r.column.stacks.ordinal[r.column.index] > r.container.height && (r.container.height = r.column.stacks.ordinal[r.column.index]), r.column.index++, r.column.index >= r.number_of_columns && (r.column.index = 0)
                },
                loop: function() {
                    var i;
                    for (i = 0; i < r.items.length;) r.ordinal.plot(i), i++
                }
            },
            r.optimized = {
                setup: function() {
                    var i;
                    for (r.column.stacks.optimized = [], i = 0; i < r.number_of_columns;) r.column.stacks.optimized[i] = [i, 0], i++;
                    r.container.height = 0, r.column.index = 0
                },
                plot: function(i) {
                    r.items[i][2] = $.stackgrid.config.gutter + ($.stackgrid.config.column_width + $.stackgrid.config.gutter) * r.column.stacks.optimized[0][0], r.items[i][3] = $.stackgrid.config.gutter + r.column.stacks.optimized[0][1], r.column.stacks.optimized[0][1] += r.items[i][1] + $.stackgrid.config.gutter, r.column.stacks.optimized[0][1] > r.container.height && (r.container.height = r.column.stacks.optimized[0][1]), r.column.stacks.optimized.sort(function(i, t) {
                        return i[1] - t[1]
                    }), r.column.index++, r.column.index >= r.number_of_columns && (r.column.index = 0)
                },
                loop: function() {
                    var i;
                    for (i = 0; i < r.items.length;) r.optimized.plot(i), i++
                }
            },
            r.initialize = function() {
                return $.stackgrid.config.container_selector = i, $.stackgrid.config.item_selector = t
            },
            r.setup = function() {
                var i, t, n, o, c, e, s;
                for ($.stackgrid.reset(), r.$container = $($.stackgrid.config.container_selector), r.$items = $(r.$container.find($.stackgrid.config.item_selector)), s = r.$items, n = c = 0, e = s.length; e > c; n = ++c) o = s[n], i = $(o), i.width($.stackgrid.config.column_width), t = i.outerHeight(), r.items[n] = [i, t, 0, 0]
            },
            r.container.scale = function(i) {
                var t, n;
                r.container.width = r.items.length < r.number_of_columns ? ($.stackgrid.config.column_width + $.stackgrid.config.gutter) * r.items.length : ($.stackgrid.config.column_width + $.stackgrid.config.gutter) * r.number_of_columns, t = r.container.height + $.stackgrid.config.gutter, n = r.container.width + $.stackgrid.config.gutter, $.stackgrid.config.scale(r.$container, t, n, i)
            },
            r.paint = function() {
                r.container.scale(function() {
                    var i, t, n, o, c, e, s;
                    for (e = r.items, s = [], t = o = 0, c = e.length; c > o; t = ++o) n = e[t], i = function() {}, s.push($.stackgrid.config.move(n[0], n[2], n[3], i));
                    return s
                })
            },
            r.stack = function() {
                r.number_of_columns = $.stackgrid.config.is_fluid ? Math.floor((a.width - $.stackgrid.config.gutter) / ($.stackgrid.config.column_width + $.stackgrid.config.gutter)) : $.stackgrid.config.number_of_columns, $.stackgrid.config.is_optimized ? (r.optimized.setup(), r.optimized.loop()) : (r.ordinal.setup(), r.ordinal.loop()), r.paint()
            },
            $.stackgrid.reset = function() {
                r.column.stacks.optimized = [], r.column.stacks.ordinal = [], r.$items = [], r.items = []
            },
            $.stackgrid.restack = function() {
                r.setup(), r.stack()
            },
            $.stackgrid.append = function(i, t) {
                var n, o, c;
                n = $(i), c = r.items.length, n.width($.stackgrid.config.column_width), o = n.outerHeight(), r.items[c] = [n, o, 0, 0], $.stackgrid.config.is_optimized ? r.optimized.plot(c) : r.ordinal.plot(c), r.container.scale(function() {
                    return $.stackgrid.config.move(r.items[c][0], r.items[c][2], r.items[c][3], t)
                })
            },
            d = {
                handler: function() {
                    a.update()
                },
                complete: function() {
                    r.stack()
                }
            },
            s = void 0, e = function(i, t) {
                clearTimeout(s), s = window.setTimeout(i, t)
            },
            c.on("resize", function() {
                d.handler(), e(d.complete, $.stackgrid.config.resize_delay)
            }),
            r.initialize()
            r.setup()
            r.stack()
        },

        $.stackgrid.config = {
            container_selector: void 0,
            item_selector: void 0,
            column_width: 320,
            gutter: 20,
            is_fluid: !0,
            is_optimized: !0,
            number_of_columns: 4,
            resize_delay: 100,
            move: function(i, t, n, o) {
                i.css({
                    left: t,
                    top: n
                }), o()
            },
            scale: function(i, t, n, o) {
                i.css({
                    height: t,
                    width: n
                }), o()
            }
        }
    }(jQuery)
}).call(this);