const prisma = require('./prisma.libs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const taskLandingJobs = await prisma.taskLandingJob.findMany();
        const taskLinkedinProfiles = await prisma.taskLinkedinProfile.findMany();
        // const existUser = await prisma.users.findUnique({ where: { email: profile.emails[0].value } });
        // const existBooking = await prisma.booking.findFirst({ where: { email: profile.emails[0].value } });

        // if (existUser || existBooking) {
        let user = await prisma.users.upsert({
          where: { email: profile.emails[0].value },
          update: { name: profile.displayName, profilePicture: profile.photos[0].value, googleId: profile.id },
          create: {
            name: profile.displayName,
            profilePicture: profile.photos[0].value,
            email: profile.emails[0].value,
            googleId: profile.id,
          },
        });

        const existSelfCheckLandingJob = await prisma.selfCheckLandingJob.findMany({
          where: {
            userId: user.id,
          },
        });

        const existingTaskLandingJobIds = new Set(existSelfCheckLandingJob.map((data) => data.taskId));
        const newTaskLandingJobToInsert = taskLandingJobs
          .filter((task) => !existingTaskLandingJobIds.has(task.id))
          .map((task) => ({
            userId: user.id,
            taskId: task.id,
            status: false,
          }));

        if (newTaskLandingJobToInsert.length > 0) {
          await prisma.selfCheckLandingJob.createMany({
            data: newTaskLandingJobToInsert,
          });
        }

        const existSelfCheckLinkedinProfile = await prisma.selfCheckLinkedinProfile.findMany({
          where: {
            userId: user.id,
          },
        });

        const existingTaskLinkedinProfileIds = new Set(existSelfCheckLinkedinProfile.map((data) => data.taskId));
        const newTaskLinkedinProfileToInsert = taskLinkedinProfiles
          .filter((task) => !existingTaskLinkedinProfileIds.has(task.id))
          .map((task) => ({
            userId: user.id,
            taskId: task.id,
            status: false,
          }));

        if (newTaskLinkedinProfileToInsert.length > 0) {
          await prisma.selfCheckLinkedinProfile.createMany({
            data: newTaskLinkedinProfileToInsert,
          });
        }

        done(null, user);
        // } else {
        //   done(null, false, { message: 'No matching user or booking found' });
        // }
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
