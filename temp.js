
var mainCode = function(classRoom){
    //declare these as varaibles to make it easier to fine tune them.
        var screen = {width:400, height : 500}
        var margins = {top:10, right : 50, bottom : 50, left:50}
    //sets up the svg, scales, and axes
        var setup = function (array2D)
        {
            d3.select("svg")
                .attr("width", screen.width)
                .attr("height", screen. height)
                .append("g")
                .attr("id", "graph")
                .attr("transform", "translate ("+margins.left+","+margins.top+") ");
                        
        //only use the width and height after the margins
            var width = screen.width - margins.left - margins.right;
            var height = screen.height - margins.top - margins.bottom;
              
            var xScale =d3.scaleLinear()
                            .domain([0,9])//only use min/max if you don't know dataset
                            .range([0,width ])
            
            console.log("y",d3.min(array2D[0].arr),d3.max(array2D[0].arr))
            
            console.log("x",0,(array2D[0].arr.length)-1)
            //console.log("dd",array2D[0].arr)
            
            var yScale = d3.scaleLinear()
                            .domain([0,10])
                            .range([height, 0])
      
            //other colors? https://github . com/d3/d3 -scale-chromatic
            var cScale = d3.scaleOrdinal (d3 . schemeTableau10)
        
            //plug in the axs
            var xAxis = d3.axisBottom(xScale)
            var yAxis = d3.axisLeft(yScale)
            
            d3.select("svg")
                .append("g")
                .classed("axis" , true) ;
            
            d3.select(".axis ")
                .append("g")
                .attr("id", "XAxis")
                .attr("transform", "translate ( " +margins . left+", "+(margins.top+height)+")").call(xAxis)
      
            d3.select(".axis ")
                .append("g")
                .attr("id", "yAxis")
                .attr("transform", "translate ( 25, "+margins.top+") ")
                .call(yAxis)
            
            drawLegend(array2D,cScale);
            drawArray(array2D,xScale,yScale,cScale) ;
        }
        
        var drawLegend = function(array2D, cScale)
        {
            d3.select("svg")
                .append("g").attr("id", "legend")
                .attr("transform", "translate (" +
                        (screen.width-margins . right)
                        +"," +(margins.top)+")");
            
            var gs = d3.select("#legend")
                .selectAll ("g")
                .data(array2D)
                .enter()
                .append("g")
                .attr ("fill",function(arr)
                    {return cScale(arr.name);})
                .attr("transform", function (arr,i)
                    {return "translate (0, "+(i*14) +") ";})
             
                gs.append("rect").attr("width",10).attr("height", 10) ;
            
                gs.append("text")
                    .text(function(arr){return arr.name})
                    .attr("x", 15)
                    .attr("y", 10)
                    .attr("fill", "black")
        }
        var drawArray = function(array2D, xScale, yScale, cScale)
        {
            var arrays = d3.select ("#graph")
                            .selectAll("g")
                            .data (array2D)
                            .enter()
                            .append("g")
            //do color stuff here where we have the full dataset,
            //harder once you set paths
                            .attr("fill","none")
                            .attr("stroke", function (arr){return cScale (arr.name);})
            //need to add the stroke back
            //removes horrible fill error
                            .attr("stroke-width", 3)
                            .on("click",function()
                            { 
                               console.log("clicked")
                            })
            
            //what about a curved line?-pick one
            //https://cemrajc.github.io/d3-curve-comparison/
            
            var lineGenerator = d3.line()
                .x(function (num,index) {return xScale(index)})
                .y(function (num) {return yScale (num)})
                .curve(d3.curveBasis)
            
            //uses the bound data to find the array to attach
            arrays.datum(function (obj ) {console.log(obj.arr);return obj.arr})
                .append('path')
                .attr("id","sss")
                .attr("d",lineGenerator)
        }
  
            
        var data = [
            {name:"Fred", arr: [3,5,7,9,1,2,4,6,8,10] },
            {name:"Jeff", arr: [9,8,8,6,6,4,4,2,1,0] },
            {name:"mala", arr: [10,8,4,6,6,5,4,7,1,1] },
        ]
        
        console.log(data)
        setup(data); //start it all off

    
}

var mainStartPromise = function(){                    
    var dataPromise = d3.json("classData.json")
        dataPromise.then(
            function(classRoom){
                    console.log(classRoom)
                    mainCode(classRoom)
            },function(err){
                    console.log("fail")
            })
}



//Start
mainStartPromise()