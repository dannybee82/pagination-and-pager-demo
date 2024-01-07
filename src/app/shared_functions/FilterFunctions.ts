export class FilterFunctions {

    filterObject(object: any, filterAt: string) : any | undefined {        
        if(object != undefined) {   
            let filtered: any[] = [];
          
            for(let i = 0; i < object.length; i++) {                
                let values: string[] | null = this.getValues(object[i]); 

                let found: number = this.searchInArray(filterAt.toLowerCase(), values); 

                if(found > -1) {                    
                    filtered.push(object[i]);
                }
            }

            return filtered;
        }

        return undefined;
    }

    private getValues(object: any) : string[] | null {
        if(object != undefined) {
            let values: string[] = [];

            let data: any[] = Object.values(object);
            data.forEach(item => {
                let type: string = Object.prototype.toString.call(item);

                if(item != null) {
                    if(type !== '[object Object]' && type !== '[object Array]') {
                        values.push(item.toString().toLowerCase()) 
                    } else if(type === '[object Object]') {
                        let innerObj: any = item;
                        let innerData: string[] = Object.values(innerObj);

                        innerData.forEach(el => {
                            if(el != null) {
                                values.push(el.toString().toLowerCase()) 
                            }
                        });
                    } else if(type === '[object Array]') {
                        let innerObj: any[] = item;

                        for(let i = 0; i < innerObj.length; i++) {
                            let innerData: string[] = Object.values(innerObj[i]);

                            innerData.forEach(el => {
                                if(el != null) {
                                    values.push(el.toString().toLowerCase()) 
                                }
                            });
                        }
                    }
                }
            }); 
            
            return values;
        }
  
        return null;
    }

    private searchInArray(searchFor: string, arr: string[] | null) : number {
        if(arr != null) {
            for(let i = 0; i < arr.length; i++) {
                if(arr[i].indexOf(searchFor) > -1 && searchFor !== '') {
                    return i;
                }
            }
        }

        return -1;
    }

}