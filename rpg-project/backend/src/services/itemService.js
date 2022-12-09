class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
}

const itemService = new ItemService(itemRepository);
export default itemService;
