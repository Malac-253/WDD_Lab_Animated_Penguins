
var mainCode = function(classRoom){
    //declare these as varaibles to make it easier to fine tune them.
        var screen = {width:800, height : 700}
        var margins = {top:10, right : 200, bottom : 50, left:50}
    //sets up the svg, scales, and axes
        var setup = function (array2D,array3D)
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
                            .domain([d3.min(array3D[0].qzDay),d3.max(array3D[0].qzDay)])//only use min/max if you don't know dataset
                            .range([0,width ])
            
            
            //console.log("x",d3.min(array3D[0].qzDay),d3.max(array3D[0].qzDay))
            
            //console.log("x",0,(array2D[0].arr.length)-1)
            //console.log("dd",array2D[0].arr)
            
            var yScale = d3.scaleLinear()
                            .domain([0,10])
                            .range([height, 0])
            
            //console.log("y",d3.min(array3D[0].qzGrade),d3.max(array3D[0].qzGrade))
      
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
            
            drawLegend(array3D,cScale);
            drawArray(array3D,xScale,yScale,cScale) ;
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
                    {return cScale(arr.picture);})
                .attr("transform", function (arr,i)
                    {return "translate (0, "+(i*14) +") ";})
             
                gs.append("rect").attr("width",10).attr("height", 10) ;
            
                gs.append("text")
                    .text(function(arr){return arr.picture})
                    .attr("x", 15)
                    .attr("y", 10)
                    .attr("fill", "black")
        }
        var drawArray = function(array3D, xScale, yScale, cScale)
        {
            var arrays = d3.select ("#graph")
                            .selectAll("g")
                            .data (array3D)
                            .enter()
                            .append("g")
            //do color stuff here where we have the full dataset,
            //harder once you set paths
                            .attr("fill","none")
                            .attr("stroke", function (arr){return cScale (arr.picture);})
            //need to add the stroke back
            //removes horrible fill error
                            .attr("stroke-width", 3)
                            .attr("class", "pathing")
                            .attr("id", function (arr){return ("iii"+arr.picture);})


                
            
            //what about a curved line?-pick one
            //https://cemrajc.github.io/d3-curve-comparison/
            
            var lineGenerator = d3.line()
                .x(function (num,index) {return xScale(index)})
                .y(function (num) {return yScale (num)})
                .curve(d3.curveBasis)
            
            //uses the bound data to find the array to attach
            arrays.datum(function (obj ) {;return obj.qzGrade})
                .append('path')
                .attr("class","sss")
                .attr("d",lineGenerator)
                .on("mouseover",function(d)
                            { 
                                //console.log(d)
                                array3D.forEach(function(element){
                                    if(JSON.stringify(d)==JSON.stringify(element.qzGrade)) {
                                       mouseoveradd(element.picture)
                                
                                    }   
                                })
                                    
                            })
            //Otherstuff
            array3D.forEach(function(element){
              d3.select ("#"+element.picture)
                .on("mouseover",function(element2){
                  console.log(element2.picture)
                  
              })
                
                
            })
        }
        
        var mouseoveradd = function(pic)
        {
            d3.select ("#tables *").remove()
            
            d3.select ("#tables")
                .append("div")
                .attr("class","info")
                .attr("id","ii"+pic)
                .append("img")
                .attr("src",pic)
            
            
            d3.select ("#iii"+pic)
                .attr("stroke-width", 60)
            
            
        }
        
        var convertClass = function(classRoom)
        {
            var Cdata = []
            classRoom.forEach(function(element){
                var person = {}
                /*
                    person.final = element.final
                
                        var hwDay = []
                        var hwGrade = []
                        var hwMax = 00
                        element.homework.forEach(function(element2){
                            hwDay.push(element2.day)
                            hwGrade.push(element2.grade)
                            hwMax = element2.max
                        })
                    person.hwDay = hwDay
                    person.hwGrade = hwGrade
                    person.hwMax = hwMax
                */
                    person.picture = element.picture
                
                        var qzDay = []
                        var qzGrade = []
                        var qzMax = 00
                        element.quizes.forEach(function(element2){
                            qzDay.push(element2.day)
                            qzGrade.push(element2.grade)
                            qzMax = element2.max
                        })
                    person.qzDay = qzDay
                    person.qzGrade = qzGrade
                    person.qzMax = qzMax
                /*
                        var ttDay = []
                        var ttGrade = []
                        var ttMax = 00
                        element.test.forEach(function(element2){
                            ttDay.push(element2.day)
                            ttGrade.push(element2.grade)
                            ttMax = element2.max
                        })
                    person.ttDay = ttDay
                    person.ttGrade = ttGrade
                    person.ttMax = ttMax
            */
            Cdata.push(person)
            })
            console.log("-->",Cdata)
            return Cdata
        }
            
        var data = [
            {name:"Fred", arr: [3,5,7,9,1,2,4,6,8,10] },
            {name:"Jeff", arr: [9,8,8,6,6,4,4,2,1,0] },
            {name:"mala", arr: [10,8,4,6,6,5,4,7,1,1] },
        ]
            
            //console.log("y",d3.min(classRoom[0].quizes),d3.max(classRoom[0].quizes))
            //console.log("x",0,(array2D[0].arr.length)-1)
        classRoom = convertClass(classRoom)
        setup(data,classRoom); //start it all off

    
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