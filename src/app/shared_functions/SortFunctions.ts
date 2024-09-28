export class SortFunctions {

    private _cleanUpRegex: RegExp = /^.*\s|\]{1}$/g;

    sort(obj: any, key1: string, isAscending: boolean) : void {
        try {
            if(obj != undefined) {                
                obj.sort((a: any, b: any) => {
                    const variable_01 = a[key1] != undefined ? this.getValue(a[key1]) : "";
                    const variable_02 = b[key1] != undefined ? this.getValue(b[key1]) : "";

                    if (variable_01 < variable_02) {
                        return -1;
                    } else if(variable_01 > variable_02) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                if(!isAscending) {
                    obj.reverse();
                }
            }
        } catch(err) {
            console.log("An error occurred while sorting." + err);
        }
    }

    private getValue(value: any): string | number | boolean {
        const type: string = Object.prototype.toString.call(value).replace(this._cleanUpRegex, '');

        switch(type) {
            case 'String':
                return value.toLowerCase();
            case 'Number':
                return parseInt(value);
            case 'Boolean':
                return value;
        }

        return '';
    }

}