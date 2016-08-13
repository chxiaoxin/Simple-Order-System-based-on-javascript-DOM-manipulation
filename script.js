(function (window, document) {

  /* Sets a random integer quantity in range [1, 20] for each flavor. */
	"use strict";
	function setQuantities() {
		var node = document.getElementsByClassName('price');
		var name_val=document.getElementsByTagName('h2');
		for (var i=0;i<node.length;i++){
			var pnode=node[i].parentNode;
			var newNode = document.createElement('span');
			newNode.setAttribute('class','quantity');
			newNode.setAttribute('id',name_val[i].innerHTML);
			newNode.innerHTML=Math.floor(1+20*Math.random());
			pnode.insertBefore(newNode,pnode.firstChild);
		}
	}
  /* Extracts and returns an array of flavor objects based on data in the DOM. Each
   * flavor object should contain five properties:
   *
   * element: the HTMLElement that corresponds to the .flavor div in the DOM
   * name: the name of the flavor
   * description: the description of the flavor
   * price: how much the flavor costs
   * quantity: how many cups of the flavor are available
   */
	function extractFlavors() {
		var flavors=[];
		var tagNameNode=document.getElementsByTagName('h2');
		var descripNode=document.getElementsByTagName('p');
		var priceNode=document.getElementsByClassName('price');
		var quantityNode=document.getElementsByClassName('quantity');
		for(var i=0;i<tagNameNode.length;i++){
			var tmp=new flavor(tagNameNode[i].innerHTML,descripNode[i].innerHTML,priceNode[i].innerHTML,quantityNode[i].innerHTML);
			flavors.push(tmp);
		}
		return flavors;
	}

  /* Calculates and returns the average price of the given set of flavors. The
   * average should be rounded to two decimal places. */
  
	function calculateAveragePrice(flavors) {
		var totalPrice=0;
		var totalNumber=0;
		function averagePrice(element,index, array){
			totalNumber=parseInt(element.quantity)+totalNumber;
			totalPrice=totalPrice+parseInt(element.quantity)*parseInt(element.price.slice(1,element.price.length));
		}
		flavors.forEach(averagePrice);
		var average=(totalPrice/totalNumber).toFixed(2);
		return average;
	}

  /* Finds flavors that have prices below the given threshold. Returns an array
   * of strings, each of the form "[flavor] costs $[price]". There should be
   * one string for each cheap flavor. */
  
	function findCheapFlavors(flavors, threshold) {
    	var filtered=flavors.filter(function isBelowThre(element){return parseInt(element.price.slice(1,element.price.length))<=threshold;});
		var cheapflavors_map=filtered.map(function map(element){return element.name+'costs'+element.price;})
		return cheapflavors_map;
	}

  /* Populates the select dropdown with options. There should be one option tag
   * for each of the given flavors. */
  
	function populateOptions(flavors) {
    	var node=document.getElementsByTagName('select')[0];
		for(var i=0;i<flavors.length;i++){
			var tmp=document.createElement('option');
			tmp.innerHTML=flavors[i].name;
			node.appendChild(tmp);
		}
	}

  /* Processes orders for the given set of flavors. When a valid order is made,
   * decrements the quantity of the associated flavor. */
  
	function processOrders(flavors) {
		var hashtable={};
		for(var i=0;i<flavors.length;i++){
			hashtable[flavors[i].name]=flavors[i].quantity;
		}
		var submit=document.getElementsByTagName('input');
		function process(){
			event.preventDefault();
			var order_num=submit[0].value;
			var sel_value=document.getElementsByTagName('select')[0].value;
			console.log(order_num);
			console.log(hashtable[sel_value]);
			if(order_num>0&&order_num<=parseInt(hashtable[sel_value])){
				var target=document.getElementById(sel_value);
				target.innerHTML=parseInt(target.innerHTML)-order_num;
				console.log(target.innerHTML);
			}
			submit[0].value=0;
		}
		submit[1].addEventListener('click',process,false);
	}
    function flavor(name,description,price,quantity){
		this.name=name;
		this.description=description;
		this.price=price;
		this.quantity=quantity;
	}
  /***************************************************************************/
  /*                                                                         */
  /* Please do not modify code below this line, but feel free to examine it. */
  /*                                                                         */
  /***************************************************************************/
	
	var CHEAP_PRICE_THRESHOLD = 1.50;
  // setting quantities can modify the size of flavor divs, so apply the grid
  // layout *after* quantities have been set.
	setQuantities();
	var container = document.getElementById('container');
	new Masonry(container, { itemSelector: '.flavor' });
  // calculate statistics about flavors
	var flavors = extractFlavors();
	var averagePrice = calculateAveragePrice(flavors);
	console.log('Average price:', averagePrice);
	var cheapFlavors = findCheapFlavors(flavors, CHEAP_PRICE_THRESHOLD);
	console.log('Cheap flavors:', cheapFlavors);
  // handle flavor orders and highlighting
	populateOptions(flavors);
	processOrders(flavors);
})(window, document);