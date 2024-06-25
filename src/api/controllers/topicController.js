const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Atgriež visus topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await prisma.topics.findMany();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atgriež vienu topic ar ID
exports.getTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await prisma.topics.findUnique({ where: { id } });
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Izveido jaunu topicu
exports.createTopic = async (req, res) => {
  const { name } = req.body;
  try {
    const newTopic = await prisma.topics.create({ data: { name } });
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atjaunina specifisku topic izmantojot ID
exports.updateTopic = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTopic = await prisma.topics.update({
      where: { id },
      data: { name },
    });
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Izdzēš topic izmantojot ID
exports.deleteTopic = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.topics.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
