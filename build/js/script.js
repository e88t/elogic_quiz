var i=$("#priority"),r=$("#form"),s=$("#createGridButton"),e=$(".grid-2"),d=$(".form-select"),t="",a=[];i.on("input",function(i){2<this.value.length&&(this.value=this.value.slice(0,2)),this.value<0&&(this.value=0)}),i.on("focus",function(i){this.value=""}),d.on("hover",function(i){d.trigger("click")}),r.on("submit",function(i){i.preventDefault();var r=$(".form-select").val(),s=$("#priority").val(),e=$(".list-group-horizontal");t+="<li class='list-group-item me-2'>"+r+"</li>",e.html(t);var d={size:r,priority:s,width:r.charAt(0),height:r.charAt(2)};a.push(d),console.log(a),s.value="0"}),s.on("click",function(){var r="";a.sort(function(i,r){return r.width-i.width}).sort(function(i,r){return r.priority-i.priority}).forEach(function(i){switch(i.size){case"1х1":r+="<div class='grid-item'><div class='one'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"1х2":r+="<div class='grid-item'><div class='one-two'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"1х3":r+="<div class='grid-item'><div class='one-three'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"2х1":r+="<div class='grid-item'><div class='two-one'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"2х2":r+="<div class='grid-item'><div class='two'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"2х3":r+="<div class='grid-item'><div class='two-three'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"3х1":r+="<div class='grid-item'><div class='three-one'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"3х2":r+="<div class='grid-item'><div class='three-two'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"3х3":r+="<div class='grid-item'><div class='three'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;case"4х1":r+="<div class='grid-item'><div class='four-one'><div class='grid-item-descr'>size "+i.size+"<br> pr."+i.priority+"</div></div></div>";break;default:console.log("createGridButton, unknown size of element")}}),e.html(r),new Muuri(".grid-2",{layout:{fillGaps:!0,alignBottom:!0}}).refreshItems().layout(),console.log(a)});