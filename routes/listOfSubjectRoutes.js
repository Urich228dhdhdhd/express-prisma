const express = require('express');
const router = express.Router();
const { getlistOfSubject, getlistOfSubjectById, createLostOfSubject, deletelistofSubById, updateListOfSub } = require('../controllers/listOfSubjectController');
// Получение всех листов 
router.get('/', async (request, response) => {
    try {
        const listofSub = await getlistOfSubject();
        response.status(200).json(listofSub);
    } catch (error) {
        console.error('Ошибка при получении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при получении listOfSubject' });

    }

});
router.get('/:id', async (request, response) => {
    try {
        const listofSub = await getlistOfSubjectById(Number(request.params.id));
        response.status(200).json(listofSub);


    } catch (error) {
        console.error('Ошибка при получении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при получении listOfSubject' });

    }

})
router.post('/', async (request, response) => {
    const { subject_id, group_id, semester_number } = request.body
    try {
        const listofSub = await createLostOfSubject(subject_id, group_id, semester_number);
        response.status(201).json(listofSub);
    } catch (error) {
        console.error('Ошибка при создании listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при создании listOfSubject' });

    }


});
router.delete("/:id", async (request, response) => {
    try {
        await deletelistofSubById(Number(request.params.id));
        response.status(204).send(); // Успешное удаление, но без контента
    } catch (error) {
        console.error('Ошибка при удалении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при удалении listOfSubject' });

    }
})
router.put('/:id', async (request, response) => {
    const { subject_id, group_id, semester_number } = request.body;
    try {
        const listofSub = await updateListOfSub(Number(request.params.id), subject_id, group_id, semester_number);
        response.status(200).json(listofSub);
    } catch (error) {
        console.error('Ошибка при обнавлении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при обнавлении listOfSubject' });

    }


})



module.exports = router;
