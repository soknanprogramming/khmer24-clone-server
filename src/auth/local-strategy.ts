import passport from "passport";
import { Strategy } from "passport-local";
import { usersTable } from "../db/usersTable";
import { drizzle } from "drizzle-orm/mysql2";
import { eq, or } from "drizzle-orm";
import "dotenv/config";


const db = drizzle(process.env.DATABASE_URL!);

passport.serializeUser((user: any , done) => {
  done(null, user.ID);
})

passport.deserializeUser(async (id: number, done) => {
  try{
    const findUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.ID, id))
    done(null, findUser) // findUser is an array of objects, so we need to find the object with the ID that matches the id that we passed int
  } catch (err) {
    done(err, null)
  }
})

export default passport.use(
  new Strategy({
    usernameField: "phoneNumber", // 👈 Tell Passport to use phoneNumber
    passwordField: "password",
  },
    async (phoneNumber, password, done) => {
    try {
      const findUser = await db
        .select()
        .from(usersTable)
        .where(or(eq(usersTable.PhoneNumber, phoneNumber),
                  eq(usersTable.PhoneNumber2, phoneNumber),
                  eq(usersTable.PhoneNumber3, phoneNumber),
                  ))
        if(!findUser) throw new Error("User not found")
        if(findUser[0].Password !== password) throw new Error("Password is incorrect")
        done(null, findUser)
    } catch (err) {
      done(err, false)
    }
  }) 
)
