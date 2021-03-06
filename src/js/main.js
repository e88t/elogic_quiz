(function (ko) {
  var gridContainer = $('.grid'),
      form = $("#form"),
      formSelect = $('.form-select'),
      priority = $("#priority")

  var BlocksViewModel = function (blocksList) {
    this.blockList = blockList;
    this.blocks = ko.observable(false);
    this.renderedGrid = ko.observable(false);
    this.isDisabled = ko.observable(false);
    var self = this;

    priority.on( "input", function() {
      if (this.value.length > 2) {
        this.value = this.value.slice(0,2);
      } else if (this.value < 10) {
        this.value = this.value.slice(0,1);
      } else if (this.value < 0) {
        this.value = 0;
      }
    });
    priority.on( "focus", function(e) {
      if ($(this).val() == false) {
        $(this).val("");
      }
    });
    priority.on( "blur", function(e) {
      if ($(this).val() == false) {
        $(this).val("0");
      }
    });
    priority.on( "keypress", function(e) {
      var keyCode = (e.which ? e.which : e.keyCode);
      if (keyCode !== 13) {
        return
      } else {
        e.preventDefault();
        form.submit();
      }
    })

    this.addBlock = function () {
      self.blockList.addBlock();
      self.blocks(this.blockList.blocks);
    }
    this.createGrid = function () {
      self.blockList.createGrid();
      self.renderedGrid (true);
      self.isDisabled (true);
      setTimeout(function(){
        window.scrollTo(0,document.body.scrollHeight)
      }, 1500)
    }
    this.removeBlock = function (blockObject, event) {
      self.blockList.removeBlock(blockObject.id);
      self.blocks(self.blockList.blocks)
    }
    this.resetGrid = function () {
      self.blockList.resetGrid();
      self.blocks(false);
      self.renderedGrid (false);
      self.isDisabled (false);
      gridContainer.empty();
      new Muuri('.grid').destroy();
    }
  }

  var BlockList = function () {
    this.blocks = [];

    this.addBlock = function () {
      var boxSize = formSelect.val();
      this.blocks.push({
        id: this.blocks.length,
        size: boxSize,
        priority: priority.val() ? priority.val() : 0,
        width: boxSize.charAt(0),
        height: boxSize.charAt(2),
        square: Number(boxSize.charAt(0)) * Number(boxSize.charAt(2))
      })
      priority.val("0");
    }

    this.removeBlock = function (id) {
      var blockIndex = this.getIndexById(id, this.blocks);
      if (typeof blockIndex !== 'undefined') {
        this.blocks.splice(blockIndex, 1);
      }
    }

    this.getIndexById = function (id, blocks) {
      var index;
      for (var i=0, max = blocks.length; i < max; i++) {
        if (blocks[i].id === id) {
          index = i;
          break
        }
      }
      return index
    }

    this.createGrid = function () {
      var temp = "",
          grid,
          blockForGrid = [].concat(this.blocks);

      blockForGrid.sort(function (a, b) { return b.square - a.square || b.width - a.width;})
          .sort(function (a, b) { return b.priority - a.priority })
          .forEach(function( elem ) {
            switch (elem.size) {
              case "1??1":
                temp += "<div class='grid-item'><div class='one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "1??2":
                temp += "<div class='grid-item'><div class='one-two'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "1??3":
                temp += "<div class='grid-item'><div class='one-three'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "2??1":
                temp += "<div class='grid-item'><div class='two-one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "2??2":
                temp += "<div class='grid-item'><div class='two'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "2??3":
                temp += "<div class='grid-item'><div class='two-three'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "3??1":
                temp += "<div class='grid-item'><div class='three-one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "3??2":
                temp += "<div class='grid-item'><div class='three-two'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "3??3":
                temp += "<div class='grid-item'><div class='three'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              case "4??1":
                temp += "<div class='grid-item'><div class='four-one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
                break;
              default:
                console.log('createGridButton, unknown size of element')
            }
          });
      gridContainer.html(temp);
      grid = new Muuri('.grid', {
        layout: {
          fillGaps: true,
          alignBottom: true
        }
      });
      grid.refreshItems().layout();
      temp = "";
    }
    this.resetGrid = function () {
      this.blocks = [];
    }
  }

  var blockList = new BlockList();

  ko.applyBindings(new BlocksViewModel(blockList))
})(ko)