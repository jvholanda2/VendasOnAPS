import { Ad } from "../entity/ad.js"
export class AdRepository {
    constructor(prisma) {
        this.prisma = prisma
    }
  
    async save(ad) {
        try {
            const myad = await this.prisma.ad.create({
                data: {
                  product: ad.product,
                  price: ad.price,
                  description: ad.description,
                  image: ad.image,
                  userId: ad.userId 
                },
            });
            return myad
        } catch (error) {

        }
    }
  
    async findById(id) {
      try {
        const ad = await this.prisma.ad.findUnique({
          where: {
            id: id,
          },
        });
        //return ad
        return new Ad(ad.id, ad.product, ad.price, ad.description, ad.image, ad.userId);
      } catch (error) {
          console.log(error)
          return null  
      }

  
      //if (!ad) return undefined;
     
      
    }

    async findAll() {
      try {
        const ads = await this.prisma.ad.findMany();
        return ads.map((ad) => new Ad(ad.id, ad.product, ad.price, ad.description, ad.image, ad.userId));
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    async findByUserId(userId) {
      try {
        const ads = await this.prisma.ad.findMany({
          where: {
            userId: userId,
          },
        });
        return ads.map((ad) => new Ad(ad.id, ad.product, ad.price, ad.description, ad.image, ad.userId));
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    // async delete(id) {
    //   try {
    //     const ads = await this.prisma.ad.delete({
    //       where: {
    //         userId: id,
    //       },
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     return null;
    //   }
    // }
    async deleteById(id) {
      try {
        const ad = await this.prisma.ad.delete({
          where: {
            id: id,
          },
        });
        return ad;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    
    async update(id, product, price, description, image) {
      try {
        const updatedAd = await this.prisma.ad.update({
          where: {
            id: id,
          },
          data: {
            product: product,
            price: price,
            description: description,
            image: image,
          },
        });
        return updatedAd;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    
    
  }