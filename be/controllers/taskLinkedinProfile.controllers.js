const prisma = require('../libs/prisma.libs');

module.exports = {
  createTaskLinkedinProfile: async (req, res, next) => {
    try {
      const { categoryId, description } = req.body;
      const taskLinkedinProfile = await prisma.taskLinkedinProfile.create({
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      res.status(201).json({
        status: true,
        message: 'Created',
        data: taskLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },

  taskLinkedinProfiles: async (req, res, next) => {
    try {
      let { categoryId } = req.query;
      let where = {};
      if (categoryId) {
        where.categoryId = Number(categoryId);
      }

      let taskLinkedinProfile = await prisma.taskLinkedinProfile.findMany({
        where,
        include: {
          categoryLinkedinProfile: true,
        },
        orderBy: {
          categoryId: 'asc',
        },
      });

      res.status(200).json({
        status: true,
        message: 'Get All Task Linkedin Profile Successfull',
        data: taskLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },

  taskLinkedinProfileDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      let taskLinkedinProfile = await prisma.taskLinkedinProfile.findUnique({
        where: { id: Number(id) },
        include: {
          categoryLinkedinProfile: true,
        },
      });

      if (!taskLinkedinProfile) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Get Task Linkedin Profile Successfull',
        data: taskLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },

  updateTaskLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { categoryId, description } = req.body;

      const existTaskLinkedinProfile = await prisma.taskLinkedinProfile.findUnique({
        where: { id: Number(id) },
      });

      if (!existTaskLinkedinProfile) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      let taskLinkedinProfile = await prisma.taskLinkedinProfile.update({
        where: { id: Number(id) },
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      if (!taskLinkedinProfile) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Update Task Linkedin Profile Sucessfull',
        data: taskLinkedinProfile,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
        data: null,
      });
      // next(err);
    }
  },

  deleteTaskLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;

      const existTaskLinkedinProfile = await prisma.taskLinkedinProfile.findUnique({
        where: { id: Number(id) },
      });

      if (!existTaskLinkedinProfile) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      await prisma.taskLinkedinProfile.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({
        status: true,
        message: 'Deleted',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
