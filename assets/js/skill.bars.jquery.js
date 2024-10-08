(function ($) {
  $.fn.skillBars = function (options) {
    var settings = $.extend(
      {
        from: 0,
        to: false,
        speed: 1000,
        interval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null,

        classes: {
          skillBarBar: ".skillbar-bar",
          skillBarPercent: ".skill-bar-percent",
        },
      },
      options
    );

    return this.each(function () {
      var obj = $(this),
        to =
          settings.to != false
            ? settings.to
            : parseInt(obj.attr("data-percent"));
      if (to > 100) {
        to = 100;
      }
      var from = settings.from,
        loops = Math.ceil(settings.speed / settings.interval),
        increment = (to - from) / loops,
        loopCount = 0,
        interval = setInterval(updateValue, settings.interval);

      obj.find(settings.classes.skillBarBar).animate(
        {
          width: parseInt(obj.attr("data-percent")) + "%",
        },
        settings.speed
      );

      function updateValue() {
        from += increment;
        loopCount++;
        $(obj)
          .find(settings.classes.skillBarPercent)
          .text(from.toFixed(settings.decimals) + "%");

        if (typeof settings.onUpdate == "function") {
          settings.onUpdate.call(obj, from);
        }

        if (loopCount >= loops) {
          clearInterval(interval);
          from = to;

          if (typeof settings.onComplete == "function") {
            settings.onComplete.call(obj, from);
          }
        }
      }
    });
  };
})(jQuery);
