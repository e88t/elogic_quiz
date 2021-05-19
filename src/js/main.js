
var priority = $("#priority"),
    form = $("#form"),
    createGridButton = $("#createGridButton"),
    grid2 = $('.grid-2'),
    formSelect = $('.form-select'),
    htmlContent = '',
    blocksArray = [];

priority.on( "input", function(e) {
  if (this.value.length > 2) {
      this.value = this.value.slice(0,2); 
  }
  if (this.value < 0) {
    this.value = 0; 
  }
});
priority.on( "focus", function(e) {
  this.value = '';
});
formSelect.on("hover", function(e) {
  formSelect.trigger('click'); 
})

form.on( "submit", function(e) {
  e.preventDefault();
  var boxSize = $('.form-select').val();
  var priority = $('#priority').val();
  var listGroup = $('.list-group-horizontal');
  htmlContent += "<li class='list-group-item me-2'>" +boxSize+ "</li>";
  listGroup.html(htmlContent);
  var tempObj = {
    size: boxSize,
    priority: priority,
    width: boxSize.charAt(0),
    height: boxSize.charAt(2)
  }
  blocksArray.push(tempObj);
  console.log(blocksArray);
  priority.value = '0';
});

createGridButton.on("click", function() {
  var temp = "";
  blocksArray.sort(function (a, b) { return b.width - a.width })
  .sort(function (a, b) { return b.priority - a.priority })
  .forEach(function( elem ) {
    switch (elem.size) {
      case "1х1":
        temp += "<div class='grid-item'><div class='one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "1х2":
        temp += "<div class='grid-item'><div class='one-two'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "1х3":
        temp += "<div class='grid-item'><div class='one-three'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "2х1":
        temp += "<div class='grid-item'><div class='two-one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "2х2":
        temp += "<div class='grid-item'><div class='two'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "2х3":
        temp += "<div class='grid-item'><div class='two-three'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "3х1":
        temp += "<div class='grid-item'><div class='three-one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "3х2":
        temp += "<div class='grid-item'><div class='three-two'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "3х3":
        temp += "<div class='grid-item'><div class='three'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      case "4х1":
        temp += "<div class='grid-item'><div class='four-one'><div class='grid-item-descr'>size "+elem.size +'<br> pr.'+ elem.priority+ "</div></div></div>";
        break;
      default:
      console.log('createGridButton, unknown size of element')
    }

  });
  grid2.html(temp);
  createGrid ();

  console.log(blocksArray);
});

function createGrid () {
  var grid = new Muuri('.grid-2', {
    layout: {
        fillGaps: true,
        alignBottom: true
      }
  });
  grid.refreshItems().layout();
}
