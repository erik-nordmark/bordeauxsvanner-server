import { Wine } from './../../models/wine/wine.schema';
import { Request, Response } from "express";
import { IWine } from "../../models/wine/wine.interface";
import * as csv from "fast-csv";

export class Wines {

    public routes(app): void {


        app.route('/test').get(async (req: Request, res: Response) => {
            res.send(200);
        })


        app.route('/post/wines').post(async (req: Request, res: Response) => {

            try {
    
                await Wine.deleteMany({}, function (err) {
                    console.log('db cleaned')
                });
                

                var string = JSON.stringify(req.body.data);

                csv
                    .fromString(string)
                    .on("data", async function (data) {
                        let wineArray = data[0].split('\\r\\n');
                        const headers = wineArray.shift();
                        await Wines.readWines(wineArray);
                    })
                    .on("end", function () {
                        console.log("done");
                    });


            } catch (err) {
                console.log('Stream failed', err);
            }
        })

        app.route('/get/wines').get((req: Request, res: Response) => {
            Wine.find({}, function(err, wines) {
                if (err) {
                    res.send(401);
                }

                res.send(wines);
            })
        })
    }


    private static async readWines(wines: any): Promise<void> {
        wines.forEach(w => {
            let wineArrray = w.split(';');
            const wine: IWine = {
                name: wineArrray[0],
                year: wineArrray[1],
                country: wineArrray[2],
                district: wineArrray[3],
                producer: wineArrray[4],
                type: wineArrray[5],
                quantity: wineArrray[6],
                before: wineArrray[7],
                from: wineArrray[8],
            }

            const model = new Wine(wine);

            model.save(function (err) {
                if (err)
                    console.log(err);
            });
        });
    }
}

