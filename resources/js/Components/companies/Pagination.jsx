import { Link } from '@inertiajs/react';

const Pagination = ({ links, current, total }) => {
    // Si moins de 8 éléments (1 page seulement), ne pas afficher la pagination
    if (total <= 1) return null;

    // Create page numbers array
    const pageNumbers = [];
    for (let i = 1; i <= total; i++) {
        pageNumbers.push(i);
    }

    // Limit displayed page numbers for better UI
    let displayedPageNumbers = [];
    if (total <= 7) {
        // If less than 7 pages, show all
        displayedPageNumbers = pageNumbers;
    } else {
        // Always include first and last page
        if (current <= 3) {
            // Near the start
            displayedPageNumbers = [1, 2, 3, 4, 5, '...', total];
        } else if (current >= total - 2) {
            // Near the end
            displayedPageNumbers = [1, '...', total-4, total-3, total-2, total-1, total];
        } else {
            // In the middle
            displayedPageNumbers = [
                1, 
                '...', 
                current-1, 
                current, 
                current+1, 
                '...', 
                total
            ];
        }
    }

    // Création d'un objet URLSearchParams pour maintenir les filtres actuels dans les liens de pagination
    const preserveParams = () => {
        const params = new URLSearchParams(window.location.search);
        
        // Supprimer le paramètre page car il sera ajouté automatiquement par le lien
        params.delete('page');
        
        const paramString = params.toString();
        return paramString ? `&${paramString}` : '';
    };

    return (
        <div className="flex items-center gap-1">
            {/* Previous button */}
            {current > 1 && (
                <Link 
                    href={`?page=${current-1}${preserveParams()}`}
                    className="px-3 py-1 rounded-md border hover:bg-gray-100 flex items-center text-gray-700"
                    preserveScroll={false}
                >
                    <span className="sr-only">Previous</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>
            )}
            
            {/* Page numbers */}
            {displayedPageNumbers.map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                ) : (
                    <Link 
                        key={page}
                        href={`?page=${page}${preserveParams()}`}
                        className={`px-3 py-1 rounded-md ${
                            current === page 
                                ? 'bg-red-500 text-white' 
                                : 'border hover:bg-gray-100 text-gray-700'
                        }`}
                        preserveScroll={false}
                    >
                        {page}
                    </Link>
                )
            ))}
            
            {/* Next button */}
            {current < total && (
                <Link 
                    href={`?page=${current+1}${preserveParams()}`}
                    className="px-3 py-1 rounded-md border hover:bg-gray-100 flex items-center text-gray-700"
                    preserveScroll={false}
                >
                    <span className="sr-only">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>
            )}
        </div>
    );
};

export default Pagination;